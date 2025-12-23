# 中心化配置说明文档

## 概述

Cherry Studio 支持中心化配置管理功能，允许管理员统一管理模型提供商（Providers）和 MCP 服务器配置。中心化配置为只读，用户无法修改或删除，但可以查看和使用。

## 配置文件位置

### 默认位置
中心化配置文件默认位于项目根目录的 `resources/centralized-config.json`。

### 自定义位置
可以通过环境变量 `CHERRY_STUDIO_CENTRALIZED_CONFIG_PATH` 指定自定义路径：

```bash
# Windows
set CHERRY_STUDIO_CENTRALIZED_CONFIG_PATH=C:\path\to\your\config.json

# Linux/macOS
export CHERRY_STUDIO_CENTRALIZED_CONFIG_PATH=/path/to/your/config.json
```

## 配置文件格式

### 基本结构

```json
{
  "version": "1.0.0",
  "lastUpdated": "2023-12-23T12:00:00.000Z",
  "providers": [
    {
      "id": "centralized-provider-id",
      "name": "Provider Display Name",
      "type": "openai",
      "apiHost": "https://api.example.com",
      "apiKey": "your-api-key",
      "icon": "base64-or-url",
      "models": [
        {
          "id": "model-id",
          "name": "Model Display Name",
          "modelId": "actual-model-id"
        }
      ]
    }
  ],
  "mcpServers": [
    {
      "id": "mcp-server-id",
      "name": "MCP Server Display Name",
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@package/name"],
      "description": "Server description",
      "isActive": true
    }
  ]
}
```

### Provider 配置说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | string | 是 | Provider 的唯一标识符，建议使用 `centralized-` 前缀 |
| `name` | string | 是 | Provider 的显示名称 |
| `type` | string | 是 | Provider 类型，如 `openai`、`anthropic` 等 |
| `apiHost` | string | 是 | API 服务器地址 |
| `apiKey` | string | 是 | API 密钥 |
| `icon` | string | 否 | Provider 图标（Base64 编码或 URL），留空则使用默认图标 |
| `models` | array | 是 | 该 Provider 下的模型列表 |

### Model 配置说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | string | 是 | 模型的唯一标识符 |
| `name` | string | 是 | 模型的显示名称 |
| `modelId` | string | 是 | 实际的模型 ID（用于 API 调用） |
| `avatar` | string | 否 | 模型图标（Base64 编码或 URL），留空则使用默认图标 |

### MCP Server 配置说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | string | 是 | MCP 服务器的唯一标识符 |
| `name` | string | 是 | MCP 服务器的显示名称 |
| `type` | string | 是 | 服务器类型，通常为 `stdio` |
| `command` | string | 是 | 启动命令，如 `npx`、`python` 等 |
| `args` | array | 否 | 命令参数数组 |
| `env` | object | 否 | 环境变量键值对 |
| `description` | string | 否 | 服务器描述 |
| `isActive` | boolean | 否 | 是否默认激活，默认为 `false` |

## 配置示例

### 示例 1: OpenAI Provider

```json
{
  "version": "1.0.0",
  "providers": [
    {
      "id": "centralized-openai",
      "name": "Corporate OpenAI",
      "type": "openai",
      "apiHost": "https://api.openai.com",
      "apiKey": "sk-proj-...",
      "icon": "",
      "models": [
        {
          "id": "gpt-4o-corp",
          "name": "GPT-4o (Corp)",
          "modelId": "gpt-4o"
        },
        {
          "id": "gpt-4-turbo-corp",
          "name": "GPT-4 Turbo (Corp)",
          "modelId": "gpt-4-turbo"
        }
      ]
    }
  ],
  "mcpServers": []
}
```

### 示例 2: 多个 Provider

```json
{
  "version": "1.0.0",
  "providers": [
    {
      "id": "centralized-openai",
      "name": "Corporate OpenAI",
      "type": "openai",
      "apiHost": "https://api.openai.com",
      "apiKey": "sk-proj-...",
      "icon": "",
      "models": [
        {
          "id": "gpt-4o-corp",
          "name": "GPT-4o (Corp)",
          "modelId": "gpt-4o"
        }
      ]
    },
    {
      "id": "centralized-deepseek",
      "name": "DeepSeek Internal",
      "type": "openai",
      "apiHost": "https://api.deepseek.com",
      "apiKey": "sk-...",
      "icon": "",
      "models": [
        {
          "id": "deepseek-chat-corp",
          "name": "DeepSeek Chat (Corp)",
          "modelId": "deepseek-chat"
        }
      ]
    }
  ],
  "mcpServers": []
}
```

### 示例 3: MCP Server 配置

```json
{
  "version": "1.0.0",
  "providers": [],
  "mcpServers": [
    {
      "id": "corp-filesystem",
      "name": "Corporate Filesystem",
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/shared/docs"],
      "description": "Access to shared documentation folder",
      "isActive": true
    },
    {
      "id": "corp-memory",
      "name": "Corporate Memory",
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"],
      "env": {
        "MEMORY_FILE_PATH": "/shared/memory.json"
      },
      "description": "Shared memory storage",
      "isActive": false
    }
  ]
}
```

## 功能特性

### 1. 只读保护
- 所有中心化配置项在 UI 中标记为只读
- 用户无法修改 Provider 的 API Key 和 API Host
- 用户无法删除中心化模型或 MCP 服务器
- 删除按钮对中心化配置项不显示

### 2. 自动加载
- 应用启动时自动加载中心化配置
- 配置会自动合并到用户界面中
- 中心化配置与用户配置共存，互不干扰

### 3. 数据隔离
- 中心化配置不会保存到用户的 `localStorage.json` 中
- 用户配置和中心化配置完全分离
- 重启应用后，中心化配置会自动重新加载

### 4. 多 Provider 支持
- 支持在同一配置文件中定义多个 Provider
- 每个 Provider 可以有不同的 API Host 和 API Key
- 每个 Provider 可以包含多个模型

## 配置加载流程

1. **启动时检查**：应用启动时，`ConfigManager` 会检查配置文件是否存在
2. **环境变量优先**：如果设置了 `CHERRY_STUDIO_CENTRALIZED_CONFIG_PATH`，优先使用该路径
3. **默认路径回退**：如果没有环境变量，使用项目根目录的 `resources/centralized-config.json`
4. **标记只读**：加载的配置项会被自动标记 `isCentralized: true`
5. **前端合并**：前端通过 `window.api.config.getMergedConfig()` 获取配置并合并到 Redux store

## 用户配置路径

用户配置存储在：
- **路径**：`~/.cherrystudio/localStorage.json`
- **格式**：Redux Persist 格式
- **管理**：由前端直接管理，Python 后端不写入用户配置

## 注意事项

1. **配置文件编码**：配置文件必须使用 UTF-8 编码
2. **JSON 格式**：确保 JSON 格式正确，否则加载会失败
3. **API 密钥安全**：配置文件包含敏感信息，请妥善保管
4. **路径权限**：确保应用有读取配置文件的权限
5. **配置更新**：修改配置文件后需要重启应用才能生效
6. **ID 唯一性**：确保 Provider ID 和 Model ID 在配置文件中唯一

## 故障排查

### 配置未加载
1. 检查配置文件路径是否正确
2. 检查 JSON 格式是否正确（可使用 JSON 验证工具）
3. 查看应用日志中的错误信息
4. 确认文件权限是否允许读取

### 配置显示但无法使用
1. 检查 API Key 和 API Host 是否正确
2. 检查网络连接是否正常
3. 查看浏览器控制台的错误信息

### 配置被误删
- 中心化配置无法被用户删除
- 如果配置消失，检查：
  1. 配置文件是否被移动或删除
  2. 环境变量是否被修改
  3. 应用是否从不同位置启动

## 相关文件

- **配置管理器**：`cherrystudio/core/config_manager.py`
- **API 接口**：`cherrystudio/api/cherry_studio_api.py`
- **前端初始化**：`web/src/renderer/src/hooks/useAppInit.ts`
- **前端 Redux Store**：`web/src/renderer/src/store/llm.ts`、`web/src/renderer/src/store/mcp.ts`

## 更新日志

- **v1.0.0** (2023-12-23)
  - 初始版本
  - 支持多 Provider 配置
  - 支持 MCP 服务器配置
  - 实现只读保护机制
  - 实现数据隔离

