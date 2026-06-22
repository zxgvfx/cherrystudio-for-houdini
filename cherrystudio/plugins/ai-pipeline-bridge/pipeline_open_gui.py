"""ai-pipeline-bridge GUI helper —— 在子进程里弹文件框 + 启 pipeline。

放在子进程里跑的原因：
  - PySide6 QFileDialog 必须有 QApplication，且 QApplication 必须在主线程跑；
  - CherryStudio 的 HTTP route handler 跑在后台线程（HTTPServer worker），
    在那里 new QApplication 会抛 "QApplication must be created in main thread"；
  - 用子进程把 GUI 完全隔离，handler 只 subprocess.run + 收 stdout JSON，干净。

约定：
  - 成功最后一行 stdout 输出 JSON：
      {"path": "<选中的图>", "run_id": "...", "interactive_url": "..."}
  - 失败最后一行：
      {"error": "<原因>"}
  - 调用方按"最后一行 JSON"解析，前面的可以是普通日志（不会污染解析）。
"""

from __future__ import annotations

import argparse
import json
import os
import sys
import time
import urllib.error
import urllib.request

# Windows + Houdini Python 默认 stdout 编码常常是 cp936/gbk，
# 把中文 JSON 写出去会乱码 → 调用方读不出来。强制 utf-8。
try:
    sys.stdout.reconfigure(encoding="utf-8")  # type: ignore[attr-defined]
    sys.stderr.reconfigure(encoding="utf-8")  # type: ignore[attr-defined]
except Exception:
    pass


def _eprint(*args, **kwargs):
    print(*args, file=sys.stderr, **kwargs)


def _pick_image_file() -> str | None:
    """阻塞弹原生文件框，返回绝对路径或 None。"""
    try:
        from PySide6.QtWidgets import QApplication, QFileDialog
    except Exception as exc:
        _eprint(f"[helper] PySide6 import 失败: {exc}")
        return None

    app = QApplication.instance() or QApplication(sys.argv)
    # 让对话框始终置顶在 CherryStudio 前面
    path, _ = QFileDialog.getOpenFileName(
        None,
        "选择图片 → AI Pipeline 自动跑分割",
        os.path.expanduser("~"),
        "Images (*.png *.jpg *.jpeg *.bmp *.webp *.tiff);;All files (*.*)",
    )
    # 不保留 QApplication，子进程退出时一并销毁
    return path or None


def _upload_image_as_asset(
    api_base: str, image_path: str, operator: str | None
) -> dict:
    """先把本地图上传到 ai-pipeline 的 asset 系统，跨机器场景必须这样。

    理由：CherryStudio 和 ai-pipeline 后端常常不在同一台机器上。把本地路径直接
    丢给 io.load-image 节点，远端机器上根本没那个文件 → "文件不存在"。

    上传完拿到 ``image_asset_id``，下游 sam3.segment-web 节点支持双协议输入，
    用 asset_id 就能跨机器拿到图。
    """
    boundary = "----aip-bridge-" + str(int(time.time() * 1000))
    fields = {
        "asset_type": "media/image",
        "produced_by_tool": "cherrystudio:ai-pipeline-bridge",
    }
    if operator:
        fields["operator"] = operator

    file_name = os.path.basename(image_path)
    with open(image_path, "rb") as f:
        file_bytes = f.read()

    # 自己拼 multipart：标准库 urllib 不带 multipart 编码器
    parts: list[bytes] = []
    for k, v in fields.items():
        parts.append(f"--{boundary}\r\n".encode())
        parts.append(f'Content-Disposition: form-data; name="{k}"\r\n\r\n'.encode())
        parts.append(v.encode("utf-8"))
        parts.append(b"\r\n")
    parts.append(f"--{boundary}\r\n".encode())
    parts.append(
        f'Content-Disposition: form-data; name="file"; filename="{file_name}"\r\n'.encode()
    )
    parts.append(b"Content-Type: application/octet-stream\r\n\r\n")
    parts.append(file_bytes)
    parts.append(f"\r\n--{boundary}--\r\n".encode())
    body = b"".join(parts)

    req = urllib.request.Request(
        url=f"{api_base.rstrip('/')}/api/assets/upload",
        data=body,
        headers={
            "Content-Type": f"multipart/form-data; boundary={boundary}",
            "Content-Length": str(len(body)),
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="replace")[:500]
        raise RuntimeError(f"upload HTTP {exc.code} {exc.reason}: {detail}") from exc


def _fetch_workflow_meta(api_base: str, workflow_id: str) -> dict:
    """GET /api/workflows/{id} → workflow 模板（含 inputs / dag.nodes）。

    用来在 bridge 启动前先弄清两件事：
      1. 这条工作流要不要 image_asset_id 作为输入（决定要不要弹文件框）；
      2. 工作流里有哪些 HITL 节点（历史上用于兼容配置覆盖；长期形态不再绕过 /review/）。
    """
    url = f"{api_base.rstrip('/')}/api/workflows/{workflow_id}"
    try:
        with urllib.request.urlopen(url, timeout=10) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="replace")[:300]
        raise RuntimeError(
            f"读取 workflow 元数据失败 HTTP {exc.code}: {detail}（工作流是否已注册？）"
        ) from exc


def _workflow_needs_image(meta: dict) -> bool:
    """工作流的 inputs schema 里是否声明了图片类输入。

    约定：input.name 含 ``image`` 或 input.asset_type 以 ``media/image`` 开头。
    `inputs: []` 的工作流（如 kimodo-web-only）一律返回 False。
    """
    inputs = meta.get("inputs") or []
    if not inputs:
        return False
    for inp in inputs:
        name = str((inp or {}).get("name") or "").lower()
        atype = str((inp or {}).get("asset_type") or "").lower()
        if "image" in name or atype.startswith("media/image"):
            return True
    return False


# 长期形态：审阅壳、完成前 hook、delivery 都收口到 ai-pipeline 的 /review/。
# Cherry 不再强制任何 HITL 节点 wrap_with_review=False；这里保留集合只是兼容
# _build_config_override 的结构，避免旧调试入口绕过框架审阅壳。
_WRAP_FALSE_NODES: set[str] = set()


def _build_config_override(meta: dict, operator: str | None) -> dict:
    """按工作流实际包含的节点拼 config_override。

    长期形态不再对 HITL 节点注入 ``wrap_with_review=False``；operator 仅在
    未来需要节点级审计字段时保留给 sam3.segment-web 使用。
    """
    nodes = ((meta.get("dag") or {}).get("nodes")) or {}
    used_node_ids = {
        str((n or {}).get("node_id") or "") for n in nodes.values()
    }
    cfg: dict = {}
    for node_id in used_node_ids & _WRAP_FALSE_NODES:
        node_cfg: dict = {"wrap_with_review": False}
        if node_id == "sam3.segment-web" and operator:
            node_cfg["operator"] = operator
        cfg[node_id] = node_cfg
    return cfg


def _start_pipeline(
    api_base: str,
    *,
    workflow_id: str,
    image_asset_id: str | None,
    operator: str | None,
    workflow_meta: dict,
) -> dict:
    """POST /api/workflows/{workflow_id}/runs, 返回 ai-pipeline 响应 dict。

    新主入口（参考 ai-pipeline ADR-005 / Workflow 一等公民）：
      bridge 不再硬编码 node_ids，编排完全由后端工作流模板定义。
      bridge 只决定"启动哪个工作流 + 按 schema 传 inputs"。

    inputs 与 config_override 都按 workflow_meta 自适应：
      - 若工作流声明了 image 输入：传 image_asset_id；
      - 若工作流 inputs 为空（如 kimodo-web-only）：传空 inputs；
      - config_override 当前为空；审阅与完成前 hook 由 ai-pipeline /review/ 负责。

    长期形态下 config_override 不再关闭 ai-pipeline /review/，避免 Cherry 复刻
    审阅按钮、完成前 hook、delivery 等框架行为。
    """
    inputs: dict = {}
    if image_asset_id and _workflow_needs_image(workflow_meta):
        inputs["image_asset_id"] = image_asset_id
    body: dict = {"inputs": inputs}
    cfg = _build_config_override(workflow_meta, operator)
    if cfg:
        body["config_override"] = cfg

    req = urllib.request.Request(
        url=f"{api_base.rstrip('/')}/api/workflows/{workflow_id}/runs",
        data=json.dumps(body).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="replace")[:500]
        raise RuntimeError(f"HTTP {exc.code} {exc.reason}: {detail}") from exc


def _wait_for_interactive_url(
    api_base: str,
    run_id: str,
    *,
    timeout_s: float = 60.0,
    interval_s: float = 0.5,
) -> dict:
    """轮询 GET /api/workflows/runs/{run_id} 直到 interactive_url 可用 / run 失败 / 超时。

    POST /api/workflows/{id}/runs 是异步的，立即返回 status='pending' —— 这时
    interactive_url 还没填出来。要等到后台 runner 跑到第一个 AWAITING_HUMAN
    节点（如 sam3.segment-web），interactive_url 才有值。所以这里必须轮询。
    """
    url = f"{api_base.rstrip('/')}/api/workflows/runs/{run_id}"
    deadline = time.monotonic() + timeout_s
    last: dict = {}
    while time.monotonic() < deadline:
        try:
            with urllib.request.urlopen(url, timeout=5) as resp:
                last = json.loads(resp.read().decode("utf-8"))
        except Exception as exc:
            _eprint(f"[helper] 轮询失败（继续重试）: {exc}")
            time.sleep(interval_s)
            continue

        status = last.get("status")
        # awaiting_human → interactive_url 已就绪
        if status == "awaiting_human" and last.get("interactive_url"):
            return last
        # 终态：成功 / 失败 / 取消，没必要再等
        if status in ("success", "failed", "cancelled"):
            return last
        # 其它（pending / running）继续等
        time.sleep(interval_s)
    return last


def _emit(payload: dict) -> None:
    # 必须是最后一行；前面任意 print 都不会影响调用方
    print(json.dumps(payload, ensure_ascii=False))


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--api-base", required=True)
    parser.add_argument("--operator", default=None)
    parser.add_argument(
        "--workflow-id",
        default="sam3-image-segment-only",
        help="要启动的 ai-pipeline 工作流 ID（默认只跑分割；改成 sam3-image-to-3d 跑全链路）",
    )
    args = parser.parse_args()

    _eprint(f"[helper] api_base={args.api_base} workflow={args.workflow_id}")

    # 0) 先拉工作流元数据，决定要不要弹文件框 / 怎么拼 config_override
    try:
        workflow_meta = _fetch_workflow_meta(args.api_base, args.workflow_id)
    except Exception as exc:
        _emit({"error": str(exc)})
        return 0
    needs_image = _workflow_needs_image(workflow_meta)
    _eprint(
        f"[helper] workflow_meta inputs={workflow_meta.get('inputs')!r} "
        f"needs_image={needs_image}"
    )

    image_asset_id: str | None = None
    image_path: str | None = None

    if needs_image:
        # 1) 弹原生文件框选图
        image_path = _pick_image_file()
        if not image_path:
            _emit({"error": "用户取消选择"})
            return 0
        image_path = os.path.abspath(image_path)
        _eprint(f"[helper] 选中图片: {image_path}")

        # 2) 把图上传到 ai-pipeline 的 asset 系统（跨机器场景必须）
        try:
            asset = _upload_image_as_asset(args.api_base, image_path, args.operator)
            image_asset_id = asset.get("id")
            if not image_asset_id:
                _emit({"error": "上传图片失败：响应里没 id", "raw": asset})
                return 0
            _eprint(f"[helper] 图片已上传 asset_id={image_asset_id}")
        except Exception as exc:
            _emit({"error": f"上传图片到 ai-pipeline 失败: {exc}"})
            return 0
    else:
        _eprint("[helper] 工作流无 image 输入，跳过文件选择 / 上传")

    # 3) 启动 workflow run（inputs/config 按 meta 自适应）
    try:
        started = _start_pipeline(
            args.api_base,
            workflow_id=args.workflow_id,
            image_asset_id=image_asset_id,
            operator=args.operator,
            workflow_meta=workflow_meta,
        )
    except Exception as exc:
        _emit({"error": f"调用 ai-pipeline 失败: {exc}"})
        return 0

    run_id = started.get("run_id")
    if not run_id:
        _emit({"error": "ai-pipeline 启动响应里没有 run_id", "raw": started})
        return 0

    _eprint(f"[helper] run 已启动 run_id={run_id} status={started.get('status')}, 等待 interactive_url…")

    # POST 立即返回 pending；要轮询到 awaiting_human 才能拿到 interactive_url
    run = _wait_for_interactive_url(args.api_base, run_id, timeout_s=60.0)
    interactive_url = run.get("interactive_url")

    if not interactive_url:
        _emit({
            "error": (
                f"60s 内 workflow {args.workflow_id!r} 的首个 HITL 节点没进入 awaiting_human。"
                f"run.status={run.get('status')} run.error={run.get('error')!r}; "
                f"常见原因：①工作流未注册（GET /api/workflows 检查列表）；"
                f"②节点 execute 抛异常（看 steps 里的 error_message）"
            ),
            "run": run,
        })
        return 0

    # 透传 workflow_id / trace_id 给 bridge 后端，前端可在多 run 接力时按
    # trace_id 拉同业务族谱（GET /api/workflows/runs?trace_id=...）。
    _emit({
        "path": image_path or "",
        "run_id": run_id,
        "interactive_url": interactive_url,
        "workflow_id": run.get("workflow_id"),
        "workflow_version": run.get("workflow_version"),
        "trace_id": run.get("trace_id"),
    })
    return 0


if __name__ == "__main__":
    sys.exit(main())
