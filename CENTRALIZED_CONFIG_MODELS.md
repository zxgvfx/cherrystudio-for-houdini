# 中心化配置 - 默认模型设置

## 功能说明

现在可以在中心化配置文件 `resources/centralized-config.json` 中设置默认的模型配置，包括：
- **默认模型** (`defaultModel`): 用于助手对话的默认模型
- **快速模型** (`quickModel`): 用于快速操作和话题命名的模型
- **翻译模型** (`translateModel`): 用于文本翻译的模型

## 工作原理

1. **优先级**：用户设置 > 中心化配置 > 系统默认值
2. **智能检测**：系统会检测用户是否手动设置过模型，只有在用户没有修改默认值的情况下，才会应用中心化配置
3. **自动匹配**：系统会根据模型 ID 在所有已加载的 providers（包括中心化 providers）中查找对应的模型

## 配置示例

```json
{
  "version": "1.0.0",
  "lastUpdated": "2023-12-23T12:00:00.000Z",
  "defaultModels": {
    "defaultModel": "gpt-4o-corp",
    "quickModel": "deepseek-chat-corp",
    "translateModel": "deepseek-chat-corp"
  },
  "providers": [
    {
      "id": "centralized-openai",
      "name": "Corporate OpenAI",
      "type": "openai",
      "apiHost": "https://api.openai.com",
      "apiKey": "sk-proj-...",
      "models": [
        {
          "id": "gpt-4o-corp",
          "name": "GPT-4o (Corp)",
          "modelId": "gpt-4o",
          "isCentralized": true
        }
      ]
    },
    {
      "id": "centralized-deepseek",
      "name": "DeepSeek Internal",
      "type": "openai",
      "apiHost": "https://api.deepseek.com",
      "apiKey": "sk-...",
      "models": [
        {
          "id": "deepseek-chat-corp",
          "name": "DeepSeek Chat (Corp)",
          "modelId": "deepseek-chat",
          "isCentralized": true
        }
      ]
    }
  ]
}
```

## 配置字段说明

### `defaultModels` 对象

| 字段 | 类型 | 说明 | 必填 |
|------|------|------|------|
| `defaultModel` | string | 默认模型的 ID，必须在 providers 的 models 中存在 | 否 |
| `quickModel` | string | 快速模型的 ID，用于话题重命名等快速操作 | 否 |
| `translateModel` | string | 翻译模型的 ID，用于文本翻译功能 | 否 |

**注意**：
- 如果不需要设置某个模型，可以省略该字段或将整个 `defaultModels` 对象省略
- 模型 ID 必须与 `providers` 中某个模型的 `id` 字段匹配
- 建议将常用的、性能较好的模型设置为 `defaultModel`
- 建议将响应速度快的模型设置为 `quickModel`（如 DeepSeek Chat）

## 实现细节

### 检测逻辑

系统通过以下方式检测用户是否设置了模型：
1. 获取当前用户设置的模型
2. 与系统初始默认模型（`SYSTEM_MODELS.defaultModel[0]` 等）进行比较
3. 如果模型 ID 相同，说明用户未修改，可以应用中心化配置
4. 如果模型 ID 不同，说明用户已修改，保持用户设置

### 加载时机

中心化配置在应用启动时加载，流程如下：
1. 加载中心化的 providers 和 models
2. 等待 Redux store 更新（约 100ms）
3. 检查用户是否修改过默认模型
4. 如果未修改，根据 ID 查找并设置中心化配置的模型

### 相关文件

- **配置文件**：`resources/centralized-config.json`
- **加载逻辑**：`web/src/renderer/src/hooks/useAppInit.ts`
- **Store 定义**：`web/src/renderer/src/store/llm.ts`
- **模型服务**：`web/src/renderer/src/services/AssistantService.ts`

## 使用场景

1. **企业部署**：统一设置所有员工的默认模型，确保使用指定的内部模型
2. **团队协作**：为团队成员设置相同的模型配置，保证一致的使用体验
3. **成本控制**：将默认模型设置为成本较低的模型，避免不必要的开支
4. **性能优化**：根据业务场景设置最合适的模型组合

## 测试方法

1. 编辑 `resources/centralized-config.json`，添加 `defaultModels` 配置
2. 确保 `defaultModels` 中的模型 ID 在 `providers` 中存在
3. 删除用户数据目录（或使用全新安装）以确保没有用户自定义设置
4. 启动应用
5. 打开"设置 → 模型设置"，检查默认模型、快速模型、翻译模型是否为中心化配置中指定的模型
6. 手动修改任意一个模型设置，重启应用，确认该模型设置不会被中心化配置覆盖

## 常见问题

**Q: 为什么我配置了中心化默认模型，但应用中没有生效？**

A: 可能的原因：
1. 用户已经手动设置过模型，系统会保持用户设置
2. 配置的模型 ID 在 providers 中不存在，无法匹配
3. 配置文件格式错误，导致加载失败

**Q: 如何强制所有用户使用中心化配置的模型？**

A: 目前的设计是尊重用户的选择，如果用户手动修改过模型，不会被覆盖。如果需要强制使用，可以：
1. 清除用户的设置数据
2. 或修改代码逻辑，移除用户设置检测

**Q: 快速模型用于哪些场景？**

A: 快速模型主要用于：
- 自动话题重命名
- 文本摘要生成
- 其他需要快速响应的后台任务

建议使用响应速度快、成本较低的模型（如 DeepSeek Chat）作为快速模型。

## 更新日志

- **2024-12-25**：首次实现中心化配置默认模型功能
  - 支持 `defaultModel`、`quickModel`、`translateModel` 配置
  - 智能检测用户是否修改过设置
  - 优先保持用户自定义设置

