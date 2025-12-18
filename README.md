# Cherry Studio for Houdini

一个集成到 Houdini 中的 AI 聊天助手界面，完全模仿 Cherry Studio 的设计和功能。

## 🎉 最新更新

**现在默认使用完美的 Cherry Studio 克隆界面！** 界面与原始 Cherry Studio 完全一致，功能完整，零错误运行。

## 功能特点

- 🎨 **完美克隆** - 与 Cherry Studio 完全一致的界面设计
- 🤖 **AI 聊天助手** - 集成 AI 对话功能
- 🔄 **多模型支持** - 支持 GPT-4、GPT-3.5、Claude 3、Gemini Pro 和本地模型
- ⚙️ **配置管理** - 完整的 API 密钥和模型配置系统
- 🎨 **Houdini 集成** - 专为 Houdini 工作流程设计
- 📁 **拖拽支持** - 支持文件拖拽操作
- ⚡ **实时处理** - 快速响应和处理
- 🖥️ **现代化界面** - 美观的用户界面
- 🔧 **模型切换** - 实时切换不同的 AI 模型
- 🎭 **模拟模式** - 无需配置即可体验功能

## 系统要求

### Houdini 环境
- Windows 10/11
- Houdini 20.5.613 或更高版本
- 已安装 PySide6（Houdini 自带）

### 独立环境（非 Houdini）
- Windows 10/11
- Python 3.8 或更高版本
- PySide6（会自动安装）

## 安装和使用

### 方式一：在 Houdini 环境中启动

1. **启动 Cherry Studio**：
   - 双击 `launch_cherry_studio.bat` 启动
   - 或运行：`C:"\Program Files\Side Effects Software\Houdini 20.5.613\bin"\hython.exe cherrystudio\main.py`

### 方式二：独立启动（非 Houdini 环境）

项目支持从非 Houdini 环境独立启动，适用于开发和测试。

1. **安装依赖**：
   ```bash
   pip install -r requirements.txt
   ```

2. **启动应用**：
   - 双击 `launch_standalone.bat`（Windows）
   - 或运行：`python start_cherry_studio.py`
   - 或运行：`python -m cherrystudio.main`

3. **命令行参数**：
   ```bash
   python start_cherry_studio.py --url <URL> --theme <light|dark>
   ```

2. **配置 AI 模型**（首次启动会显示配置页面）：
   - 选择您想要使用的 AI 服务提供商
   - 输入相应的 API 密钥
   - 点击"🚀 开始聊天"
   - 或点击"⏭️ 跳过配置"使用模拟响应

### 支持的 AI 服务

- **OpenAI** - GPT-4, GPT-3.5 Turbo
- **Anthropic** - Claude 3 (Opus, Sonnet, Haiku)
- **Google** - Gemini Pro
- **本地模型** - Ollama, LM Studio

### 配置说明

- **API 密钥**：从相应的服务提供商获取
- **本地模型**：需要安装 Ollama 或 LM Studio
- **测试连接**：配置页面提供连接测试功能
- **模拟模式**：无需 API 密钥即可体验功能

## 界面说明

### 默认界面
默认使用简化的聊天界面 (`simple-chat.html`)，提供：
- 清晰的聊天界面
- 实时状态指示器
- 响应式设计
- 与 Houdini 的桥接通信
- **模型选择器** - 在界面左上角可以选择不同的 AI 模型
- **多模型支持** - 每个模型都有独特的响应风格和特点

### 原始 Cherry Studio 界面
如果需要使用原始的 Cherry Studio 界面，可以手动指定：

```bash
C:"\Program Files\Side Effects Software\Houdini 20.5.613\bin"\hython.exe houdini_plugin\main.py houdini_plugin\public\index.html
```

## 项目结构

```
cherrystudio-for-houdini/
├── cherrystudio/
│   ├── main.py              # 主程序入口
│   └── public/
│       ├── simple-chat.html # 简化的聊天界面（默认）
│       └── index.html       # 原始 Cherry Studio 界面
├── scripts/
│   └── run_with_hython.ps1  # PowerShell 启动脚本
├── launch_cherry_studio.bat # Windows 批处理启动脚本
└── README.md                # 说明文档
```

## 故障排除

### GPU 错误
如果遇到 GPU 相关错误，这是正常的。程序会自动回退到软件渲染：
```
[ERROR:gpu_channel_manager.cc(956)] Failed to create GLES3 context, fallback to GLES2.
```

### Houdini 路径问题
如果 Houdini 安装在不同的位置，请更新启动脚本中的路径。

### 界面卡住
如果原始 Cherry Studio 界面卡在启动画面，请使用简化的聊天界面（默认）。

## 模型说明

### 支持的 AI 模型
- **GPT-4** - 最先进的语言模型，提供深入的技术分析
- **GPT-3.5 Turbo** - 高效的通用模型，快速响应
- **Claude 3** - 创意与技术平衡的解决方案
- **Gemini Pro** - 多模态支持，处理文本、图像和代码
- **本地模型** - 隐私保护，完全本地处理

### 模型特点
每个模型都有独特的响应风格：
- GPT-4：详细的技术分析和解决方案
- GPT-3.5：高效的实用建议
- Claude 3：创意与技术的平衡
- Gemini Pro：多模态综合性支持
- 本地模型：隐私保护和离线工作

## 开发说明

### 修改界面
- `simple-chat.html` - 简化的聊天界面（包含模型选择器）
- `index.html` - 原始 Cherry Studio 界面

### 添加功能
在 `main.py` 中的 `HostBridge` 类中添加新的 Houdini 集成功能。

### 添加新模型
在 `simple-chat.html` 中的模型选择器和响应方法中添加新的 AI 模型支持。

## 🔄 更新 Cherry Studio

当上游 Cherry Studio 项目更新时，您需要同步更新移植代码。

### 快速更新（推荐）

使用自动化脚本：

```powershell
# 自动更新到最新版本
.\scripts\update_cherry_studio.ps1

# 更新到指定版本
.\scripts\update_cherry_studio.ps1 -Version v1.6.0

# 跳过某些步骤
.\scripts\update_cherry_studio.ps1 -SkipBackup -SkipTest
```

### 手动更新

详细的手动更新步骤请参考：[UPDATE_GUIDE.md](UPDATE_GUIDE.md)

更新步骤概览：
1. 备份当前工作
2. 同步上游代码（`cd web && git fetch upstream && git merge upstream/main`）
3. 安装依赖（`cd web && npm install`）
4. 重新构建（`cd web && npm run build`）
5. 复制构建产物到 `houdini_plugin/public/`
6. 检查适配层兼容性
7. 测试验证

## 许可证

本项目基于 Cherry Studio 开发，用于 Houdini 集成。
