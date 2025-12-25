# DefaultModels 功能修复总结

## 🔍 问题诊断

用户反馈中心化配置中的 `defaultModels` 没有生效。经过排查，发现了以下问题：

### 问题 1：Python 后端没有传递 `defaultModels`

**文件**：`cherrystudio/core/config_manager.py`

**问题**：`load()` 方法在返回配置时，没有包含 `defaultModels` 字段，导致前端无法获取到默认模型配置。

```python
# 修复前
self._config = {
    "models": [],
    "mcpServers": centralized.get("mcpServers", []),
    "centralizedProviders": centralized.get("providers", []),
    "centralizedMcpServers": centralized.get("mcpServers", []),
    "userModels": [], 
    "userMcpServers": [],
    "version": "1.0.0",
    "lastUpdated": datetime.datetime.now().isoformat()
}
# ❌ 缺少 defaultModels 字段！
```

**修复**：添加了 `defaultModels` 字段的传递逻辑

```python
# 修复后
# 获取 defaultModels 配置（支持 defaultModels 或 defaultModelSettings 字段名）
default_models = centralized.get("defaultModels") or centralized.get("defaultModelSettings")

self._config = {
    "models": [],
    "mcpServers": centralized.get("mcpServers", []),
    "centralizedProviders": centralized.get("providers", []),
    "centralizedMcpServers": centralized.get("mcpServers", []),
    "defaultModels": default_models,  # ✅ 添加了 defaultModels
    "userModels": [], 
    "userMcpServers": [],
    "version": "1.0.0",
    "lastUpdated": datetime.datetime.now().isoformat()
}

if default_models:
    _log.info(f"Loaded defaultModels from centralized config: {default_models}")
```

### 问题 2：Electron 端配置验证逻辑不完整

**文件**：`web/src/main/services/config/CentralizedConfigManager.ts`

**问题**：`validateAndNormalizeConfig()` 方法只处理 `models` 数组，不支持 `providers` 结构，也不支持 `defaultModels` 字段名。

```typescript
// 修复前
private validateAndNormalizeConfig(config: any): CentralizedConfig {
  const models = (config.models || []).map((m: any) => ({
    ...m,
    isCentralized: true
  }))
  
  const defaultModelSettings = config.defaultModelSettings || {}
  // ❌ 不支持 providers 结构
  // ❌ 不支持 defaultModels 字段名
}
```

**修复**：添加了对 `providers` 结构和 `defaultModels` 字段的支持

```typescript
// 修复后
private validateAndNormalizeConfig(config: any): CentralizedConfig {
  // 处理 providers 结构（新格式）或 models 数组（旧格式）
  let models: any[] = []
  if (config.providers && Array.isArray(config.providers)) {
    // ✅ 从 providers 中提取所有 models
    config.providers.forEach((provider: any) => {
      if (provider.models && Array.isArray(provider.models)) {
        provider.models.forEach((model: any) => {
          models.push({
            ...model,
            provider: provider.id,
            isCentralized: true
          })
        })
      }
    })
  }
  
  // ✅ 支持 defaultModels 或 defaultModelSettings 字段名
  const defaultModelSettings = config.defaultModels || config.defaultModelSettings || {}
}
```

### 问题 3：前端日志不够详细

**文件**：`web/src/renderer/src/hooks/useAppInit.ts`

**问题**：日志信息不够详细，难以调试为什么配置没有生效。

**修复**：添加了详细的调试日志

```typescript
logger.info('Found centralized default models config:', defaultModels)
logger.info(`Current providers count: ${allProviders.length}`)
logger.info(`Looking for models: default=${defaultModels.defaultModel}, quick=${defaultModels.quickModel}, translate=${defaultModels.translateModel}`)
logger.info(`User has set defaultModel: ${hasUserSetDefaultModel}, current: ${currentState.defaultModel?.id}, initial: ${initialDefaultModel?.id}`)

if (centralizedDefaultModel) {
  logger.info('✓ Setting centralized default model:', centralizedDefaultModel.name)
} else {
  logger.warn(`✗ Model not found: ${defaultModels.defaultModel}`)
}
```

## ✅ 修复内容

### 1. Python 后端 (`cherrystudio/core/config_manager.py`)
- ✅ 添加 `defaultModels` 字段的读取和传递
- ✅ 支持 `defaultModels` 和 `defaultModelSettings` 两种字段名
- ✅ 添加日志输出，便于调试

### 2. Electron 后端 (`web/src/main/services/config/CentralizedConfigManager.ts`)
- ✅ 添加对 `providers` 结构的支持（从 providers 中提取 models）
- ✅ 支持 `defaultModels` 和 `defaultModelSettings` 两种字段名
- ✅ 修复 TypeScript 类型检查错误（`configPath` 未初始化）
- ✅ 添加详细的日志输出

### 3. 前端 (`web/src/renderer/src/hooks/useAppInit.ts`)
- ✅ 增加更详细的日志输出，包括：
  - 配置内容
  - Providers 数量
  - 查找的模型 ID
  - 用户是否修改过设置
  - 模型是否找到
  - 设置是否成功
- ✅ 增加等待时间（从 0.1s 到 0.2s），确保 Redux store 更新
- ✅ 添加错误处理和提示信息

## 🧪 测试方法

### 1. 设置环境变量

```powershell
# PowerShell
$env:CHERRY_STUDIO_CENTRALIZED_CONFIG_PATH = "D:\python\cherrystudio-for-houdini\resources\centralized-config.json"
```

或使用辅助脚本：

```powershell
.\set_centralized_config.ps1
```

### 2. 启动应用

```bash
cd web
npm run dev
```

### 3. 查看日志

应用启动后，打开开发者工具（F12），查看控制台日志：

**期望看到的日志：**

```
[CentralizedConfigManager] Using centralized config from environment variable: D:\...\centralized-config.json
[CentralizedConfigManager] Centralized config loaded from: D:\...\centralized-config.json
[CentralizedConfigManager] Normalized centralized config: 2 models, 1 MCP servers
[CentralizedConfigManager] Default model settings: {defaultModel: "gpt-4o-corp", quickModel: "deepseek-chat-corp", translateModel: "deepseek-chat-corp"}

[useAppInit] Loading centralized providers: [...]
[useAppInit] Found centralized default models config: {defaultModel: "gpt-4o-corp", quickModel: "deepseek-chat-corp", translateModel: "deepseek-chat-corp"}
[useAppInit] Current providers count: X
[useAppInit] Looking for models: default=gpt-4o-corp, quick=deepseek-chat-corp, translate=deepseek-chat-corp
[useAppInit] User has set defaultModel: false, current: xxx, initial: xxx
[useAppInit] ✓ Setting centralized default model: GPT-4o (Corp)
[useAppInit] ✓ Setting centralized quick model: DeepSeek Chat (Corp)
[useAppInit] ✓ Setting centralized translate model: DeepSeek Chat (Corp)
```

**如果看到错误：**

```
[useAppInit] ✗ Model not found: gpt-4o-corp
```

说明模型 ID 不匹配，请检查配置文件中的模型 ID 是否正确。

### 4. 验证功能

打开"设置 → 模型设置"，检查：
- **默认模型**：应为 "GPT-4o (Corp)"
- **快速模型**：应为 "DeepSeek Chat (Corp)"
- **翻译模型**：应为 "DeepSeek Chat (Corp)"

### 5. 测试用户设置优先级

1. 手动修改默认模型为其他模型
2. 重启应用
3. 检查默认模型是否保持用户设置（不被中心化配置覆盖）
4. 检查快速模型和翻译模型是否仍使用中心化配置（因为未被用户修改）

## ⚠️ 注意事项

### 1. 配置文件格式

确保配置文件格式正确：

```json
{
  "version": "1.0.0",
  "defaultModels": {
    "defaultModel": "gpt-4o-corp",
    "quickModel": "deepseek-chat-corp",
    "translateModel": "deepseek-chat-corp"
  },
  "providers": [
    {
      "id": "centralized-openai",
      "models": [
        {
          "id": "gpt-4o-corp",
          "name": "GPT-4o (Corp)",
          "modelId": "gpt-4o"
        }
      ]
    }
  ]
}
```

### 2. 模型 ID 必须匹配

`defaultModels` 中的模型 ID（如 `"gpt-4o-corp"`）必须在 `providers[].models[]` 中存在，否则无法找到模型。

### 3. 环境变量

- 开发环境：可以不设置环境变量，会自动读取 `<项目根目录>/resources/centralized-config.json`
- 生产环境：必须设置 `CHERRY_STUDIO_CENTRALIZED_CONFIG_PATH` 环境变量

### 4. 用户设置优先级

- 用户手动修改的设置 **不会被覆盖**
- 只有使用系统默认值的设置才会应用中心化配置
- 这是设计的行为，确保用户自主权

## 📋 文件修改清单

1. ✅ `cherrystudio/core/config_manager.py` - 添加 defaultModels 传递
2. ✅ `web/src/main/services/config/CentralizedConfigManager.ts` - 支持 providers 和 defaultModels
3. ✅ `web/src/renderer/src/hooks/useAppInit.ts` - 增强日志和错误处理
4. ✅ `resources/centralized-config.json` - 添加 defaultModels 配置
5. ✅ `CENTRALIZED_CONFIG_USAGE.md` - 使用指南
6. ✅ `CENTRALIZED_CONFIG_MODELS.md` - 功能说明

## 🎯 下一步

1. **重新编译应用**
   ```bash
   cd web
   npm run build
   ```

2. **设置环境变量**（开发环境已自动支持，可跳过）
   ```powershell
   .\set_centralized_config.ps1
   ```

3. **启动并测试**
   ```bash
   cd web
   npm run dev
   ```

4. **查看日志验证**
   - 打开开发者工具（F12）
   - 查看控制台日志
   - 确认配置加载成功

5. **功能测试**
   - 检查模型设置页面
   - 测试用户设置优先级
   - 验证各种场景

## 📞 故障排除

如果功能仍然不生效，请检查：

1. **日志中是否有 "Found centralized default models config"**
   - 没有 → Python 后端未传递配置，检查 `config_manager.py`
   - 有 → 继续下一步

2. **日志中是否有 "✓ Setting centralized default model"**
   - 没有 → 检查是否显示 "✗ Model not found"
   - 有 → 功能应该正常

3. **如果显示 "✗ Model not found"**
   - 检查配置文件中的模型 ID
   - 检查 providers 是否正确加载
   - 查看 "Current providers count" 日志

4. **如果显示 "User has set XXX: true"**
   - 说明用户已经修改过设置
   - 清除用户数据重新测试
   - 或使用全新用户账号测试

修复完成！🎉

