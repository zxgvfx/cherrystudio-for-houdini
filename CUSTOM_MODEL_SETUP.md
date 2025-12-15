# Cherry Studio for Houdini - 自定义模型配置指南

## 问题说明

自定义模型运营商点击管理获取不到模型的问题已经解决！现在Cherry Studio for Houdini插件完全支持自定义模型，但需要正确配置API密钥。

## 解决方案

### 1. 本地模型（Ollama）- 无需配置
- ✅ **自动工作** - Ollama本地服务会自动显示模型
- ✅ **无需API密钥** - 直接连接本地服务
- ✅ **已测试** - 当前找到2个模型：qwen3:latest, bge-m3:567m

### 2. 外部API模型 - 需要配置API密钥

#### 步骤1：进入设置
1. 打开Cherry Studio界面
2. 点击左下角设置图标 ⚙️
3. 选择"模型提供商"

#### 步骤2：添加提供商
1. 点击"添加提供商"按钮
2. 选择要使用的API提供商（如OpenAI、Anthropic、Google等）
3. 输入API密钥
4. 输入API主机地址（如果需要）

#### 步骤3：配置API密钥
- **OpenAI**: 在 https://platform.openai.com/account/api-keys 获取
- **Anthropic**: 在 https://console.anthropic.com/ 获取
- **Google**: 在 https://console.cloud.google.com/ 获取
- **其他提供商**: 查看相应文档

#### 步骤4：测试连接
1. 配置完成后，点击"管理"按钮
2. 系统会自动获取模型列表
3. 如果配置正确，会显示可用的模型

## 技术实现

### 网络API增强
- ✅ 支持多种认证方式（Bearer、x-api-key、x-goog-api-key）
- ✅ 自动根据URL选择正确的认证方式
- ✅ 支持多路径回退机制

### Cherry Studio集成
- ✅ 所有Provider在Houdini环境中都通过我们的网络API获取模型
- ✅ 自动传递Provider的API密钥
- ✅ 支持Ollama和外部API提供商

## 故障排除

### 问题1：外部API返回401错误
**原因**: API密钥无效或未配置
**解决**: 检查API密钥是否正确，确保在提供商设置中正确配置

### 问题2：模型列表为空
**原因**: API密钥未配置或网络连接问题
**解决**: 
1. 检查API密钥配置
2. 检查网络连接
3. 查看控制台错误信息

### 问题3：Ollama模型不显示
**原因**: Ollama服务未运行
**解决**: 启动Ollama服务：`ollama serve`

## 测试验证

当前已测试的功能：
- ✅ 页面正常显示
- ✅ Ollama模型自动获取（2个模型）
- ✅ 外部API请求拦截
- ✅ API密钥认证
- ✅ 错误处理

## 总结

自定义模型功能现在完全正常工作！用户只需要：
1. 对于本地模型：无需配置，自动工作
2. 对于外部API：在设置中配置API密钥即可

所有技术问题已解决，Cherry Studio for Houdini插件现在完全支持自定义模型管理！











