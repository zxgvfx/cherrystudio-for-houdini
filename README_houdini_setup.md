# Houdini Python 环境设置说明

## 概述

本项目已配置为使用 Houdini 自带的 Python 环境 (hython.exe)，无需创建独立的 conda 环境。

## 环境信息

- **Houdini 版本**: 20.5.613
- **Python 版本**: 3.11.7
- **Python 解释器**: `C:\Program Files\Side Effects Software\Houdini 20.5.613\bin\hython.exe`
- **已安装包**: PySide6 6.9.2

## 快速开始

### 方法 1: 直接使用 hython 运行

```powershell
# 运行主程序
C:"\Program Files\Side Effects Software\Houdini 20.5.613\bin"\hython.exe houdini_plugin\main.py

# 运行并指定 URL
C:"\Program Files\Side Effects Software\Houdini 20.5.613\bin"\hython.exe houdini_plugin\main.py "https://example.com"
```

### 方法 2: 使用提供的脚本

#### PowerShell 脚本
```powershell
.\scripts\run_with_hython.ps1
```

#### 批处理脚本
```cmd
scripts\run_with_hython.bat
```

### 方法 3: 测试环境配置
```powershell
C:"\Program Files\Side Effects Software\Houdini 20.5.613\bin"\hython.exe scripts\test_hython_setup.py
```

## 环境变量

以下环境变量会自动设置：

- `HOUDINI_PATH`: Houdini 安装路径
- `PYTHONPATH`: Houdini Python 库路径

## 安装额外包

如果需要安装额外的 Python 包，使用 hython 的 pip：

```powershell
C:"\Program Files\Side Effects Software\Houdini 20.5.613\bin"\hython.exe -m pip install package_name
```

## 项目结构

```
cherrystudio-for-houdini/
├── houdini_plugin/
│   ├── main.py              # 主程序
│   └── public/
│       └── index.html       # Web 界面
├── scripts/
│   ├── run_with_hython.ps1  # PowerShell 运行脚本
│   ├── run_with_hython.bat  # 批处理运行脚本
│   └── test_hython_setup.py # 环境测试脚本
├── houdini_environment.yml  # 环境配置文件
└── README_houdini_setup.md  # 本文件
```

## 故障排除

### 1. hython 路径问题
如果 Houdini 安装在不同的位置，请修改脚本中的路径：
- `scripts/run_with_hython.ps1`
- `scripts/run_with_hython.bat`

### 2. PySide6 导入错误
如果遇到 PySide6 导入错误，重新安装：
```powershell
C:"\Program Files\Side Effects Software\Houdini 20.5.613\bin"\hython.exe -m pip install --force-reinstall PySide6
```

### 3. 权限问题
如果遇到权限问题，以管理员身份运行 PowerShell 或命令提示符。

## 优势

使用 Houdini 自带的 Python 环境的优势：

1. **无需额外配置**: 直接使用 Houdini 的 Python 环境
2. **版本兼容**: 确保与 Houdini 的 Python 版本完全兼容
3. **Houdini API 访问**: 可以直接访问 Houdini 的 Python API (hou 模块)
4. **简化部署**: 不需要管理多个 Python 环境

## 注意事项

- 确保 Houdini 20.5.613 已正确安装
- 如果使用不同版本的 Houdini，请相应调整路径
- 项目代码中的 `is_running_inside_houdini()` 函数会检测是否在 Houdini 内运行
