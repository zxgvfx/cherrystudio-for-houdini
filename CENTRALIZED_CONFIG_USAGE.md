# 中心化配置使用指南

本指南介绍如何使用中心化配置来设置应用的默认模型和其他配置。

## 📋 配置文件位置

配置文件名：`centralized-config.json`

### 开发环境
- 位置：`<项目根目录>/resources/centralized-config.json`
- 修改后：重启应用即可生效

### 生产环境（三种方式）

#### 方式 1：通过环境变量指定（推荐）✨

设置环境变量 `CHERRY_STUDIO_CENTRALIZED_CONFIG_PATH` 指向配置文件：

**临时设置（当前会话）：**
```powershell
# PowerShell
$env:CHERRY_STUDIO_CENTRALIZED_CONFIG_PATH = "D:\config\centralized-config.json"
```

**永久设置（使用辅助脚本）：**
```powershell
# 运行项目根目录下的脚本
.\set_centralized_config.ps1
```

脚本会自动将 `resources/centralized-config.json` 的路径设置为环境变量。

#### 方式 2：放在应用安装目录旁边

将 `centralized-config.json` 放在与 `Cherry Studio.exe` 同级的目录下：

```
C:\Program Files\Cherry Studio\
├── Cherry Studio.exe
└── centralized-config.json  ← 放这里
```

#### 方式 3：放在 resources 目录下

将配置文件打包到应用的 resources 目录（需要修改构建配置）：

1. 编辑 `web/electron-builder.yml`，在 `extraResources` 中添加：
   ```yaml
   extraResources:
     - from: "../resources/centralized-config.json"
       to: "centralized-config.json"
   ```

2. 重新编译应用

## 🎯 配置文件示例

```json
{
  "version": "1.0.0",
  "lastUpdated": "2024-12-25T12:00:00.000Z",
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
    }
  ]
}
```

## 🔧 配置优先级

配置文件的查找顺序（从高到低）：

1. **环境变量 `CHERRY_STUDIO_CENTRALIZED_CONFIG_PATH`** ← 最高优先级
2. 应用安装目录旁边的 `centralized-config.json`
3. `resources/centralized-config.json`（如果打包了）

模型设置的优先级：

1. **用户手动设置的模型** ← 最高优先级
2. 中心化配置的 `defaultModels`
3. 系统默认模型

## 📝 快速开始

### 开发/测试环境

1. 编辑 `<项目根目录>/resources/centralized-config.json`
2. 运行脚本设置环境变量：
   ```powershell
   .\set_centralized_config.ps1
   ```
   选择选项 1（临时）或 2（永久）
3. 在同一终端窗口启动应用：
   ```bash
   cd web
   npm run dev
   ```

### 企业部署

**方案 A：使用环境变量（推荐）**

1. 将 `centralized-config.json` 放在服务器的共享目录
2. 通过组策略或脚本为所有用户设置环境变量：
   ```powershell
   [System.Environment]::SetEnvironmentVariable(
       "CHERRY_STUDIO_CENTRALIZED_CONFIG_PATH",
       "\\server\share\centralized-config.json",
       [System.EnvironmentVariableTarget]::Machine
   )
   ```
3. 重启应用或计算机

**方案 B：放在安装目录旁边**

1. 将 `centralized-config.json` 复制到应用安装目录
2. 通过安装脚本或 GPO 自动部署配置文件

## 🧪 验证配置是否生效

1. **查看启动日志**
   
   应用启动时会输出类似以下日志：
   ```
   [CentralizedConfigManager] Using centralized config from environment variable: D:\config\centralized-config.json
   [CentralizedConfigManager] Centralized config loaded from: D:\config\centralized-config.json
   [useAppInit] Loading centralized providers: [...]
   [useAppInit] Applying centralized default models: {...}
   [useAppInit] Setting centralized default model: GPT-4o (Corp)
   ```

2. **检查模型设置**
   
   打开"设置 → 模型设置"，查看：
   - 默认模型
   - 快速模型
   - 翻译模型
   
   是否为中心化配置中设置的模型

3. **测试用户设置优先级**
   
   手动修改某个模型设置，重启应用，确认：
   - 手动修改的模型保持不变
   - 其他未修改的模型使用中心化配置

## ⚠️ 注意事项

1. **环境变量优先级最高**
   - 如果设置了 `CHERRY_STUDIO_CENTRALIZED_CONFIG_PATH`，应用将只使用该路径
   - 其他位置的配置文件会被忽略

2. **用户设置不会被覆盖**
   - 中心化配置只对初次安装或未修改过的设置生效
   - 用户手动修改的设置始终被保留

3. **配置文件必须是有效的 JSON**
   - 格式错误会导致配置加载失败
   - 建议使用 JSON 验证工具检查

4. **模型 ID 必须匹配**
   - `defaultModels` 中的模型 ID 必须在 `providers` 中存在
   - 否则配置不会生效

## 🔍 故障排除

### 配置没有生效？

1. **检查环境变量是否设置**
   ```powershell
   # PowerShell
   echo $env:CHERRY_STUDIO_CENTRALIZED_CONFIG_PATH
   ```

2. **检查配置文件是否存在**
   ```powershell
   Test-Path "D:\config\centralized-config.json"
   ```

3. **查看应用日志**
   - 搜索关键词：`CentralizedConfigManager`、`centralized`
   - 查看是否有加载错误

4. **验证 JSON 格式**
   - 使用 https://jsonlint.com/ 验证
   - 确保没有语法错误

### 配置加载了但模型没有改变？

1. **清除用户数据**
   - 删除用户数据目录
   - 或使用全新账户测试

2. **检查模型 ID**
   - 确认 `defaultModels` 中的 ID 在 `providers.models` 中存在
   - 注意大小写敏感

3. **查看详细日志**
   - 搜索：`Setting centralized default model`
   - 查看是否有模型设置日志

## 📚 相关文档

- [中心化配置 - 默认模型设置](CENTRALIZED_CONFIG_MODELS.md) - 详细的功能说明
- [中心化配置管理器说明](web/src/main/services/config/README.md) - 技术文档

## 💡 最佳实践

1. **开发环境**：使用临时环境变量，方便快速测试
2. **测试环境**：使用永久环境变量，确保一致性
3. **生产环境**：根据部署方式选择合适的配置方式
   - 集中管理：使用环境变量指向网络共享
   - 独立部署：将配置文件放在安装目录旁边
4. **版本控制**：配置文件应包含版本号，便于追踪和管理
5. **文档记录**：记录配置更改和生效日期

