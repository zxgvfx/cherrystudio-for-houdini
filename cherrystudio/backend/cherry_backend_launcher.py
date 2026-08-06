"""
Cherry Studio Backend Launcher
================================
独立进程启动入口，由 CocoClient 以子进程方式调用：

    python cherry_backend_launcher.py --host 127.0.0.1 --port 9876

此文件的职责：
1. 将项目根目录（cherrystudio 包的父目录）插入 sys.path，
   确保 `import cherrystudio.*` 可以正常工作。
2. 解析 --host / --port 命令行参数。
3. 调用 BackendService.run_forever() 阻塞运行，直到进程被终止。
"""

from __future__ import annotations

import os
import sys

# ── 将项目根目录加入 sys.path ──────────────────────────────────────────────────
# 此文件位于 <project_root>/cherrystudio/backend/cherry_backend_launcher.py
# 向上两层即为 <project_root>（cherrystudio 包所在目录的父目录）
_here         = os.path.dirname(os.path.abspath(__file__))   # .../cherrystudio/backend
_project_root = os.path.dirname(os.path.dirname(_here))       # <project_root>

if _project_root not in sys.path:
    sys.path.insert(0, _project_root)

# ── 清除继承的代理环境变量 ────────────────────────────────────────────────────
# 后端进程通过显式 ProxyHandler 配置代理（由 /api/v1/network/set-proxy 接口管理）。
# 继承的系统代理环境变量会导致 fastmcp/httpx 尝试通过已断开的代理连接 MCP 服务器，
# 从而造成连接失败或超时。这里清除这些变量，让后端始终使用直连。
for _var in ('HTTP_PROXY', 'HTTPS_PROXY', 'http_proxy', 'https_proxy',
             'ALL_PROXY', 'all_proxy', 'FTP_PROXY', 'ftp_proxy'):
    os.environ.pop(_var, None)

# 确保 localhost / 127.0.0.1 不会被任何残留 no_proxy 规则意外排除
os.environ['NO_PROXY'] = '127.0.0.1,localhost,::1'
os.environ['no_proxy'] = '127.0.0.1,localhost,::1'

# ── 注入 MCP 工具（uv / bun / npx）的可执行路径到 PATH ────────────────────────
# 后端子进程继承父进程（CocoClient）的 PATH，该 PATH 可能不包含 uv/bun/npx。
# Cherry Studio 的 MCP 服务器（uvx/npx 命令）需要这些工具，必须确保后端能找到它们。
def _inject_mcp_bin_paths() -> None:
    import shutil
    import glob

    candidates: list[str] = []

    # 1. 环境变量显式指定
    env_bin = os.environ.get("CHERRY_STUDIO_BIN_DIR")
    if env_bin:
        candidates.append(env_bin)

    # 2. 用户本地目录 ~/.cherrystudio/bin
    from cherrystudio.core.paths import get_bin_dir
    home_bin = get_bin_dir()
    candidates.append(home_bin)

    # 3. 团队 J 盘公共目录（如果存在）
    j_bin = os.path.join("J:", os.sep, "vfxtools", "piplineTD", "models", "packages", "bin")
    candidates.append(j_bin)

    # 4. Windows 上自动检测 Node.js 安装目录（npx.cmd 所在位置）
    if os.name == "nt":
        node_candidates = [
            # 系统级安装（默认路径）
            r"C:\Program Files\nodejs",
            r"C:\Program Files (x86)\nodejs",
            # 用户级 npm 全局 bin（npm 包安装后 .cmd 文件在这里）
            os.path.join(os.path.expanduser("~"), "AppData", "Roaming", "npm"),
            # nvm-windows 常见路径
            os.path.join(os.path.expanduser("~"), "AppData", "Roaming", "nvm", "*.*."),
            # scoop 安装
            os.path.join(os.path.expanduser("~"), "scoop", "apps", "nodejs", "current"),
        ]
        for nc in node_candidates:
            # 处理 glob 路径（nvm 版本号通配符）
            if "*" in nc:
                matches = sorted(glob.glob(nc), reverse=True)
                candidates.extend(matches)
            elif os.path.isdir(nc):
                candidates.append(nc)

    # 将存在的目录追加到 PATH 最前面
    current_path = os.environ.get("PATH", "")
    extra: list[str] = []
    for d in candidates:
        if os.path.isdir(d) and d not in current_path:
            extra.append(d)

    if extra:
        os.environ["PATH"] = os.pathsep.join(extra) + os.pathsep + current_path
        print(f"[CherryBackend] Injected MCP bin paths into PATH: {extra}", flush=True)

    # 诊断：列出 ~/.cherrystudio/bin 的内容，并验证工具是否可找到
    if os.path.isdir(home_bin):
        try:
            files = os.listdir(home_bin)
            print(f"[CherryBackend] ~/.cherrystudio/bin contents: {files}", flush=True)
        except Exception:
            pass

    # 验证关键工具是否可找到（在注入 PATH 之后）
    tool_status = {}
    for tool in ("uv", "uvx", "npx", "npm", "node", "bun"):
        found = shutil.which(tool)
        tool_status[tool] = found or "NOT FOUND"
    print(f"[CherryBackend] MCP tool paths: {tool_status}", flush=True)

    missing = [t for t, p in tool_status.items() if p == "NOT FOUND" and t in ("uv", "npx")]
    if missing:
        print(
            f"[CherryBackend] WARNING: critical MCP tools not found: {missing}\n"
            "  → 请将 Node.js 和 uv 添加到 PATH，或设置 CHERRY_STUDIO_BIN_DIR 环境变量\n"
            f"  → 当前 PATH（前 500 字符）: {os.environ.get('PATH','')[:500]}",
            flush=True,
        )

_inject_mcp_bin_paths()


def main() -> None:
    import argparse
    from cherrystudio.backend.service_runner import BackendService

    parser = argparse.ArgumentParser(
        description="Cherry Studio Backend Service (standalone launcher)",
    )
    parser.add_argument("--host", default="127.0.0.1", help="监听地址 (默认 127.0.0.1)")
    parser.add_argument("--port", type=int, default=9876,  help="监听端口 (默认 9876)")
    args = parser.parse_args()

    print(f"[CherryBackend] Starting on {args.host}:{args.port} (project_root={_project_root})",
          flush=True)

    svc = BackendService()
    svc.run_forever(host=args.host, port=args.port)


if __name__ == "__main__":
    main()
