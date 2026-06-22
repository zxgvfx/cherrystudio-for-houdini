# ai-pipeline-bridge

CherryStudio 侧 ai-pipeline 通用 workflow 启动器 + 配置/兼容层。长期形态下，
Cherry 只负责列出 ai-pipeline server 上已注册的 workflow，并跳转到 ai-pipeline
自带的 `/launch/` 页面；启动、上传、审阅、完成前 hook、delivery 都由 ai-pipeline
页面接管。

> **⚠️ 部署注意**：本仓库的 `D:\python\cherrystudio-for-houdini\cherrystudio\plugins\` 是**源**；
> CocoClient 实际运行时加载的是 `D:\PyCharmProjects\COCO\cocoApplication\bin\cherrystudio\plugins\` 这个**副本**。
> 改完任何文件（manifest / routes.py / frontend / helper）必须执行：
>
> ```powershell
> pwsh D:\python\cherrystudio-for-houdini\cherrystudio\plugins\ai-pipeline-bridge\sync_to_coco.ps1
> ```
>
> 然后**完全退出再重启** CocoClient（PluginLoader 是进程级缓存，热重载不行）。

## 它干什么

点击 CherryStudio 启动器里的 **AI Pipeline** 后：

1. 插件前端读取 `ai-pipeline-bridge` 配置中的 `api_base`
2. 通过 bridge 后端请求 `GET /api/workflows`，列出所有已注册 workflow
3. 用户选择一个 workflow 后，webview 跳转到 `{api_base}/launch/?workflow_id=<workflow_id>`
4. ai-pipeline 的 `/launch/` 页面读取 workflow schema、上传输入 asset、启动 run
5. run 进入 HITL 时，页面跳转到 ai-pipeline 的 `/review/`
6. `/review/` 负责完成审阅、重试、before approve hook、delivery 等框架逻辑

旧的单 workflow 插件（如 **SAM3 图生 3D** / **Kimodo Motion**）可以继续作为兼容入口，
但新增 workflow 不再需要新增 CherryStudio 插件。

设计参考：[ai-pipeline ADR-005 — Workflow 一等公民](https://github.com/your-org/ai-pipeline-core/blob/main/doc/adr/ADR-005-workflow-as-first-class-citizen.md)。

## 它**不**干什么

- **不做审阅壳**：完成审阅 / 重试 / before approve hook / delivery 都归 ai-pipeline `/review/`
- **不知道任何 node_id**：节点编排完全收口在 ai-pipeline 工作流模板
- 不做 mask 计算（SAM3 Web 工具自己干）
- 不做 3D 生成（ai-pipeline 工作流里的下游节点干）

## 配置

API 地址按以下优先级解析：

1. 环境变量 `PIPELINE_API_BASE`
2. `~/.cherrystudio/ai-pipeline-bridge.json` 里的 `api_base` 字段
3. 兜底默认 `http://192.168.21.225:9331`

示例配置文件：

```json
{
  "api_base": "http://192.168.21.13:9331"
}
```

## HTTP 接口

所有 ai-pipeline 端点都通过 bridge 后端透传（同源调用，绕开 CherryStudio webview
对跨源 fetch 的偶发 CORS 拦截）。

| 方法 | 路径 | 用途 | 透传到 ai-pipeline |
|---|---|---|---|
| `GET`  | `/plugins-ui/ai-pipeline-bridge/` | 通用 workflow 列表；带 `?workflow_id=...` 时兼容旧直接跳转 | — |
| `GET`  | `/api/v1/plugins/ai-pipeline-bridge/health` | 检查后端 ai-pipeline 可达性 | `GET /api/nodes` |
| `GET`  | `/api/v1/plugins/ai-pipeline-bridge/workflows` | 兼容：列工作流目录 | `GET /api/workflows` |
| `POST` | `/api/v1/plugins/ai-pipeline-bridge/open-gui` | 兼容：旧 Cherry 启动流程 | `POST /api/workflows/{id}/runs` |
| `GET`  | `/api/v1/plugins/ai-pipeline-bridge/run?run_id=` | 兼容：查 run 状态 | `GET /api/workflows/runs/{run_id}` |
| `POST` | `/api/v1/plugins/ai-pipeline-bridge/resume` | 兼容：旧 Cherry 审阅壳 resume | `POST /api/workflows/runs/{run_id}/resume` |

`open-gui` 请求体可选字段：

```json
{
  "workflow_id": "sam3-image-to-3d",   // 默认 sam3-image-segment-only
  "operator": "alice",                  // 写进 mask asset 审计字段
  "open_in_browser": false              // true 时同时调 webbrowser.open 兜底
}
```

`continue` 请求体：

```json
{
  "prev_run_id": "<uuid>",
  "workflow_id": "sam3-image-to-3d",
  "version": "1.0.0",                   // 可选，省略 = latest
  "extra_inputs": {}                    // 在 prev.context 之上叠加
}
```

## 排错

**点 launcher 没反应？** 先在 CherryStudio 后端控制台搜：

```
[ai-pipeline-bridge] routes.py loaded
[ai-pipeline-bridge] all routes registered
```

两条都看见 → 插件加载成功，问题在前端 launcher 路由解析。
看不见 → 插件没扫到，检查目录名拼写、`manifest.json` 是否合法 JSON。

**确认后端真的能响应**（把 `<cherry_port>` 换成 CherryStudio HTTP 端口）：

```bash
# 1. 静态 HTML 能不能拉到
curl http://localhost:<cherry_port>/plugins-ui/ai-pipeline-bridge/index.html | head -20

# 2. health 端点
curl http://localhost:<cherry_port>/api/v1/plugins/ai-pipeline-bridge/health

# 3. 直接检查 ai-pipeline launch 页面（把 api_base 换成 health 返回值）
curl http://192.168.21.225:9331/launch/?workflow_id=sam3-image-to-3d
```

**launch 页面提示工作流不存在？**
- ai-pipeline 没启 / 端口不对 → 检查 `health` 端点返回
- ai-pipeline 启了但工作流目录为空 → 重启 ai-pipeline（启动时会 upsert 内置 yaml），
  或调 `POST {api_base}/api/workflows/reload` 手动重新扫描

**SAM3 工具图不加载？** 多半是 SAM3 服务（同机器 9999 端口）有自己的 bug，跟 bridge 无关。
直接浏览器打开 `http://<sam3-host>:9999/web/` 测一下能不能上传本地图。

## 与上一版（v0.2.x）的区别

| 维度 | v0.2.x | v0.5.0（当前） |
|---|---|---|
| 起 run 端点 | `POST /api/pipelines` 硬编码 `node_ids: ["sam3.segment-web"]` | ai-pipeline `/launch/` 调 `POST /api/workflows/{id}/runs` |
| 工作流选择 | 无 | 一个通用 Cherry 入口自动列出 `GET /api/workflows` |
| 审阅按钮 | Cherry bridge 自带 | ai-pipeline `/review/` 自带 |
| before approve hook | Cherry 不支持 | ai-pipeline `/review/` 执行 |
| 状态查询 | `GET /api/pipelines/{run_id}` | ai-pipeline `/review/` 查 `GET /api/workflows/runs/{run_id}` |

bridge 从"插件里写流程/审阅"退化为"配置读取 + 兼容透传"。新增一个 ai-pipeline 工作流
（如客户定制 `client-x-segmentation-pipeline`）= 在 ai-pipeline 那边注册 workflow，
Cherry 侧无需改代码。

## 已知限制

- `/launch/` 的版本选择、复杂输入 UI 仍在 ai-pipeline 侧演进；Cherry 不再维护工作流表单。
- Cherry 仍保留旧 `/open-gui` 等兼容端点，但新插件入口不再使用它们。
