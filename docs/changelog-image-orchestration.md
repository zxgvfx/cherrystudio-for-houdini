# 图片生成与模型编排功能改动记录

> 日期：2026-03-12  
> 涉及模块：后端 MCP Hub、前端工具结果渲染、输入栏 @mention、上下文 token 保护

---

## 一、图片生成与内联显示

### 1.1 后端：图片作为 MCP image content 返回

**文件**: `cherrystudio/backend/routes/mcp.py`

#### `_get_image_save_dir()`（新增）
- 统一的图片保存目录获取函数
- 路径为 `%TEMP%/cherrystudio/generated_images`（不在项目目录下）
- 自动创建目录

#### `_extract_images_from_text(text, model_id)`（新增）
- 解析文本响应中的 Markdown 图片语法 `![alt](url)`
- 下载图片 → base64 编码 → 保存到磁盘
- 返回 MCP content items：`{"type": "image", "data": "base64...", "mimeType": "image/png"}`
- 失败时保留原始 Markdown 链接

#### `_ask_model_chat()` — 输入图片处理
- **之前**：`images` 参数仅支持本地文件路径（`open(path, "rb")`）
- **现在**：支持三种格式：
  - `https://...` → 直接作为 `image_url` 传递给模型
  - `data:image/...;base64,...` → 直接传递
  - 本地路径 → 读取文件转 base64

#### `_ask_model_chat()` — 输出处理
- **之前**：字符串响应直接作为 `{"type": "text"}` 返回
- **现在**：调用 `_extract_images_from_text()` 提取内联图片

#### `_ask_model_image()` — 图片生成结果
- **之前**：返回文本 `[Image saved]: path` 或 `[Image URL]: url`
- **现在**：返回 `{"type": "image", "data": "base64...", "mimeType": "..."}` 用于前端内联显示

#### `_ASK_MODEL_TOOL` schema
- `images` 字段描述更新为：`"Accepts: HTTP/HTTPS URLs, local file paths, or data URIs"`

### 1.2 前端：工具结果中渲染图片

**文件**: `web/src/renderer/src/pages/home/Messages/Tools/MessageMcpTool.tsx`

#### `ExtractedContent` 接口（新增）
```typescript
interface ExtractedContent {
  text: string
  images: Array<{ data: string; mimeType: string }>
}
```

#### `extractPreviewContent()`
- **之前**：返回 `string`，图片被替换为 `[Image: image/png]`
- **现在**：返回 `ExtractedContent`，图片数据单独提取

#### `ToolResponseContent` 组件
- 新增 `responseImages` state
- 图片通过 `ImageGallery` + `ImageWrapper` 在响应文本上方渲染
- 样式：圆角边框，最大高度 400px，`object-fit: contain`

#### 新增 styled components
- `ImageGallery`：flex 布局的图片网格
- `ImageWrapper`：单张图片容器，带边框和圆角

---

## 二、Base64 图片数据的上下文保护

### 问题
图片的 base64 数据（数 MB）被包含在发送给编排 LLM 的上下文中，导致：
```
Error: Total tokens of image and text exceed max message tokens
```

### 架构原则
```
图片生成 → base64 存储在 rawMcpToolResponse
                    ↓
     ┌──────────────┴───────────────┐
     ↓                              ↓
  前端 UI 渲染                  LLM 上下文
  ImageGallery 用 base64        文本占位符
  显示 <img> 标签               "[Image: image/png, delivered to user]"
```

### 2.1 XML Prompt Tool Use 路径（主要修复）

**文件**: `web/packages/aiCore/src/core/plugins/built-in/toolUsePlugin/ToolExecutor.ts`

> ⚠️ **关键**：这是编排模式（Hub mode）的工具结果格式化路径，**独立于** `mcpToolCallResponseToOpenAI*` 函数。

#### `formatToolResults()`
- **之前**：`JSON.stringify(tr.result)` — 包含完整 base64
- **现在**：调用 `this.summarizeResult(tr.result)` 过滤多模态内容

#### `summarizeResult()`（新增私有方法）
- `{"type": "text"}` → 原文
- `{"type": "image"}` → `[Image: image/png, delivered to user]`
- `{"type": "audio"}` → `[Audio: audio/mp3, delivered to user]`
- 其他类型 → `JSON.stringify`

### 2.2 Function Call / Native 路径

**文件**: `web/src/renderer/src/aiCore/legacy/clients/openai/OpenAIApiClient.ts`

#### `convertMcpToolResponseToSdkMessageParam()` — `toolCallId` 分支
```typescript
// 之前：
content: JSON.stringify(resp.content)
// 现在：
content: hasMultimodalContent(resp) ? mcpResultToTextSummary(resp) : JSON.stringify(resp.content)
```

**文件**: `web/src/renderer/src/aiCore/legacy/clients/openai/OpenAIResponseAPIClient.ts`

#### 同样修复 `function_call_output` 的 `output` 字段

### 2.3 消息格式化函数

**文件**: `web/src/renderer/src/utils/mcp-tools.ts`

以下 5 个函数中 `case 'image':` 分支全部替换为文本占位符：
- `mcpToolCallResponseToOpenAICompatibleMessage`（text-only + multipart 两个路径）
- `mcpToolCallResponseToOpenAIMessage`
- `mcpToolCallResponseToAnthropicMessage`
- `mcpToolCallResponseToGeminiMessage`

### 2.4 已有的保护机制（无需修改）

**文件**: `web/src/renderer/src/aiCore/utils/mcp.ts`

- `hasMultimodalContent()` — 检查是否包含 image/audio/blob
- `mcpResultToTextSummary()` — 将多模态内容转为文本摘要
- `convertMcpToolsToAiSdkTools()` 中的 `toModelOutput()` — AI SDK 原生 tool call 路径已自带保护

---

## 三、@ Mention 模型行为变更

### 问题
旧 Cherry Studio 逻辑：选择模型后显示为输入框上方的蓝色标签，文本框中只剩 `@` 字符。  
不适用于编排场景（如 `@doubao-seed-1-6 请总结这篇文章`）。

### 3.1 模型选择面板

**文件**: `web/src/renderer/src/pages/home/Inputbar/tools/components/useMentionModelsPanel.tsx`

#### `onMentionModel()`
- **之前**：toggle `mentionedModels` state（多选，蓝色标签）
- **现在**：在文本框中插入 `@model-id `（含尾部空格），光标定位到末尾

#### `openQuickPanel()`
- `multiple: false`（单选，选中即关闭）
- 移除 `afterAction`（不再需要 toggle 选中状态）
- `onClose`：ESC/outsideclick 时清理 `@` 字符

#### `modelItems`
- 移除 "清除全部" 选项
- `isSelected` 始终为 `false`
- `filterText` 增加 `model.id`（支持按 ID 搜索）

### 3.2 输入栏

**文件**: `web/src/renderer/src/pages/home/Inputbar/Inputbar.tsx`

- 移除 `MentionModelsInput`（蓝色标签 UI）从 `topContent`
- 移除未使用的 `handleRemoveModel`、`setMentionedModels`

---

## 四、文件变更清单

| 文件 | 类型 | 改动 |
|------|------|------|
| `cherrystudio/backend/routes/mcp.py` | 后端 | 图片处理、URL 图片支持、保存路径 |
| `web/src/renderer/src/pages/home/Messages/Tools/MessageMcpTool.tsx` | 前端 | 图片内联渲染 |
| `web/packages/aiCore/src/core/plugins/built-in/toolUsePlugin/ToolExecutor.ts` | 前端 | base64 过滤（XML tool use） |
| `web/src/renderer/src/aiCore/legacy/clients/openai/OpenAIApiClient.ts` | 前端 | base64 过滤（Function Call） |
| `web/src/renderer/src/aiCore/legacy/clients/openai/OpenAIResponseAPIClient.ts` | 前端 | base64 过滤（Response API） |
| `web/src/renderer/src/utils/mcp-tools.ts` | 前端 | base64 过滤（消息格式化） |
| `web/src/renderer/src/pages/home/Inputbar/tools/components/useMentionModelsPanel.tsx` | 前端 | @mention 行为 |
| `web/src/renderer/src/pages/home/Inputbar/Inputbar.tsx` | 前端 | 移除蓝色标签 |

---

## 五、知识库架构重构：从自动注入到模型工具

> 日期：2026-03-14

### 问题

旧架构中知识库内容在发送请求前**自动搜索并替换用户消息**，模型无法看到原始提问，也无法选择是否使用知识库。此外，知识库 UI 依赖 MCP 模式才可见。

### 5.1 架构变更

```
旧流程：
  用户消息 → injectUserMessageWithKnowledgeSearchPrompt()
           → 搜索知识库 → 替换用户消息为 REFERENCE_PROMPT + results
           → 模型只看到替换后的内容

新流程：
  用户消息（原文保留）→ searchOrchestrationPlugin
           → 注册 builtin_knowledge_search 工具
           → 模型自行决定是否调用
           → 调用时执行 processKnowledgeSearch()
```

### 5.2 文件变更

| 文件 | 改动 |
|------|------|
| `web/src/renderer/src/services/ApiService.ts` | 删除 `injectUserMessageWithKnowledgeSearchPrompt` 调用和 import |
| `web/src/renderer/src/aiCore/plugins/PluginBuilder.ts` | `searchOrchestrationPlugin` 按功能（KB/WebSearch/Memory）注册，不依赖 MCP 模式 |
| `web/src/renderer/src/aiCore/plugins/searchOrchestrationPlugin.ts` | 删除 `knowledgeRecognition` 检查；KB 有配置即始终注册工具（fallback 用用户消息作关键词）；修复参数顺序 bug |
| `web/src/renderer/src/aiCore/tools/KnowledgeSearchTool.ts` | 删除 `knowledgeRecognition` 分支逻辑和未使用的 `userMessage` 参数 |
| `web/src/renderer/src/pages/home/Inputbar/tools/knowledgeBaseTool.tsx` | 删除 `isSupportedToolUse \|\| isPromptToolUse` 条件，KB 按钮始终可见 |

### 5.3 设计要点

1. **工具始终注册**：有 KB 配置 → `builtin_knowledge_search` 始终出现在模型可用工具列表中
2. **意图分析是优化而非门控**：如果 `analyzeSearchIntent()` 提取了关键词，用于工具描述；否则 fallback 到用户原文
3. **模型自主决策**：模型根据用户问题和工具描述自行判断是否调用 KB
4. **与 WebSearch 平级**：KB 和网络搜索是同一层级的并列工具
5. **Citation 处理**：`toolCallbacks.ts` 中已有 `builtin_knowledge_search` 的 citation block 创建逻辑，无需修改
6. **遗留代码**：`knowledgeRecognition` 设置（`AssistantKnowledgeBaseSettings.tsx`）仍存在于 UI 中，但不再影响行为

---

## 六、注意事项

1. **图片保存路径**：`%TEMP%/cherrystudio/generated_images`，不在项目目录下
2. **前端修改需重新编译**：`web/src/` 下的修改需要 `npm run build` 后将产物复制到 `cherrystudio/public/`
3. **三条数据流路径**：工具结果有三条独立的格式化路径，修改时需全部覆盖：
   - XML Prompt Tool Use（`ToolExecutor.formatToolResults`）
   - Function Call / Native（`OpenAIApiClient.convertMcpToolResponseToSdkMessageParam`）
   - AI SDK tools（`toModelOutput` in `aiCore/utils/mcp.ts`，已内置保护）
4. **`mcpResultToTextSummary`** 是 renderer 包的函数，`ToolExecutor` 在 `packages/aiCore` 包中无法直接引用，因此内联实现了 `summarizeResult()`
