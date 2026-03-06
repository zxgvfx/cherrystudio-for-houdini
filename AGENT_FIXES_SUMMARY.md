# Agent 功能修复总结

## 修复的问题

### 1. Agent 选择模型时模型列表为空或重复
**问题描述：**
- 在添加 Agent 时选择模型，下拉菜单中没有模型或模型重复
- 控制台显示网络错误，无法从 API 服务器获取模型列表

**根本原因：**
- `AgentApiClient.getModels()` 尝试从 HTTP API 获取模型列表
- 在 Houdini 环境中，如果 API 服务器未启动，会返回空数组
- 没有实现从本地 Redux store 获取模型的回退机制

**修复方案：**
在 `web/src/renderer/src/api/agent.ts` 中修改 `getModels()` 方法：
1. 当 API 请求失败时，从 `window.store` 获取本地 providers 和 models
2. 过滤掉中心化 providers（已配置的）
3. 过滤掉没有 API Key 的 providers（对于需要 API Key 的）
4. 使用 Set 去重，避免重复的模型 ID
5. 转换为 API 格式返回

**关键代码：**
```typescript
// Filter out centralized providers and only use active providers with valid API keys
const activeProviders = providers.filter((provider: any) => {
  // Skip if it's a centralized provider (already configured)
  if (provider.isCentralized) return false
  
  // Check if provider has API key (for providers that need it)
  const needsApiKey = !['ollama', 'openrouter', 'copilot'].includes(provider.id)
  if (needsApiKey && !provider.apiKey) return false
  
  // Check if provider has models
  return provider.models && provider.models.length > 0
})

// Avoid duplicates
const seenModelIds = new Set<string>()
const apiModels = activeProviders.flatMap((provider: any) => {
  return (provider.models || [])
    .filter((model: any) => {
      if (seenModelIds.has(model.id)) return false
      seenModelIds.add(model.id)
      return true
    })
    .map((model: any) => ({
      id: model.id,
      name: model.name || model.id,
      provider_id: provider.id,
      provider_name: provider.name,
      object: 'model' as const
    }))
})
```

### 2. 选择工作目录失败
**问题描述：**
- 在添加 Agent 时点击"添加目录"按钮选择工作目录失败
- 控制台错误：`TypeError: window.api.file.selectFolder is not a function`

**根本原因：**
- 前端代码调用 `window.api.file.selectFolder()`
- 但 Houdini 版本中没有实现这个方法

**修复方案：**

1. **在 Python API 中添加方法** (`cherrystudio/api/cherry_studio_api.py`)：
```python
@Slot(result=str)
def selectFolder(self) -> str:
    """显示文件夹选择对话框"""
    try:
        from PySide6.QtWidgets import QFileDialog, QApplication
        app = QApplication.instance()
        if not app:
            return ""
        
        folder_path = QFileDialog.getExistingDirectory(
            None,
            "选择文件夹",
            "",
            QFileDialog.ShowDirsOnly | QFileDialog.DontResolveSymlinks
        )
        return folder_path if folder_path else ""
    except Exception as e:
        _log(f"Error in selectFolder: {e}")
        return ""
```

2. **在 JavaScript 桥接层暴露方法** (`cherrystudio/web/electron_injector.py`)：
```javascript
if (!window.api.file.selectFolder) {
    window.api.file.selectFolder = async function() { 
        try { 
            const result = await window.qt?.api?.selectFolder?.()
            return (typeof result==='string' && result) ? result : null
        } catch(e) { 
            console.error('[Houdini] selectFolder error:', e);
            return null 
        } 
    };
}
```

## 测试步骤

1. **重新编译前端代码**：
   ```bash
   cd web
   npm run build
   ```

2. **重新启动应用**：
   ```bash
   python start_cherry_studio.py
   ```

3. **测试模型选择**：
   - 点击"添加 Agent"
   - 在"选择模型"下拉菜单中查看
   - 应该显示你已配置的 providers 中的模型
   - 没有重复的模型
   - 没有未配置 API Key 的 providers 的模型

4. **测试工作目录选择**：
   - 在添加 Agent 界面
   - 点击"添加目录"按钮
   - 应该弹出文件夹选择对话框
   - 选择文件夹后应该添加到列表中

## 相关文件

- `web/src/renderer/src/api/agent.ts` - Agent API 客户端，修改了 getModels 方法
- `cherrystudio/api/cherry_studio_api.py` - Python API，添加了 selectFolder 方法
- `cherrystudio/web/electron_injector.py` - JavaScript 桥接层，暴露了 selectFolder 方法
- `web/src/renderer/src/store/index.ts` - Redux store，已暴露到 window.store

## 注意事项

1. **模型过滤逻辑**：
   - 中心化 providers 被排除（因为它们已经预配置）
   - 需要 API Key 的 providers 如果没有 API Key 会被排除
   - Ollama、OpenRouter、Copilot 不需要 API Key 检查

2. **去重机制**：
   - 使用 Set 跟踪已见过的模型 ID
   - 如果多个 providers 有相同的模型 ID，只保留第一个

3. **API 服务器**：
   - 即使 API 服务器未启动，Agent 功能的模型选择也能正常工作
   - 但要使用 Agent 功能本身，仍需启动 API 服务器

## 修复日期

2025-12-25

