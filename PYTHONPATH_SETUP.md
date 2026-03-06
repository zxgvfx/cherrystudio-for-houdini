# Cherry Studio PYTHONPATH 设置指南

## 概述

本工具用于从 `requirements.lock` 文件解析依赖包，并在企业包仓库中查找对应的包路径，最终生成 PYTHONPATH 环境变量设置脚本。

## 前提条件

- 已有 `requirements.lock` 文件
- 可以访问网络包仓库：`\\pss01\Code_Public\packages`
- 包仓库的目录结构：`{包名}\{版本号}\{hash}\python`

## 快速开始

### 步骤1: 测试包仓库连接

首先测试是否能访问包仓库并找到包：

```bash
python test_package_paths.py
```

这会测试几个示例包，确保路径结构正确。

### 步骤2: 生成 PYTHONPATH 脚本

运行主脚本，自动查找所有包并生成设置脚本：

```bash
python setup_pythonpath.py
```

这会生成以下文件：
- `setup_env.bat` - Windows 批处理脚本
- `setup_env.ps1` - PowerShell 脚本
- `cherrystudio.pth` - Python .pth 文件
- `pythonpath_list.txt` - 所有路径的列表

### 步骤3: 应用 PYTHONPATH

选择以下任一方法：

#### 方法1: 临时设置（推荐用于测试）

**Windows CMD:**
```cmd
setup_env.bat
```

**PowerShell:**
```powershell
.\setup_env.ps1
```

**验证:**
```bash
echo %PYTHONPATH%  # CMD
$env:PYTHONPATH    # PowerShell
```

#### 方法2: 使用 .pth 文件（推荐用于开发）

1. 找到 Python 的 site-packages 目录：
```bash
python -c "import site; print(site.getsitepackages())"
```

2. 将 `cherrystudio.pth` 复制到该目录：
```bash
copy cherrystudio.pth C:\Path\To\site-packages\
```

3. 验证（重启 Python 后）：
```python
import sys
print([p for p in sys.path if 'pss01' in p])
```

#### 方法3: 永久系统环境变量

1. 打开"系统属性" → "环境变量"
2. 在用户变量或系统变量中添加/编辑 `PYTHONPATH`
3. 将 `pythonpath_list.txt` 中的路径添加进去（用分号分隔）
4. 重启命令行窗口

## 配置文件

可以编辑 `pythonpath_config.json` 来自定义：

```json
{
  "packages_root": "\\\\pss01\\Code_Public\\packages",
  "requirements_lock": "requirements.lock",
  "python_subdir": "python",
  "output": {
    "batch_script": "setup_env.bat",
    "powershell_script": "setup_env.ps1",
    "pth_file": "cherrystudio.pth",
    "path_list": "pythonpath_list.txt"
  }
}
```

## 故障排除

### 问题1: 无法访问包仓库

```
✗ 警告: 无法访问包仓库 \\pss01\Code_Public\packages
```

**解决方法:**
- 检查网络连接
- 确保已登录公司 VPN
- 验证路径权限：在文件资源管理器中访问该路径
- 检查防火墙设置

### 问题2: 找不到某些包

```
✗ 未找到: somepackage == 1.0.0
```

**可能原因:**
1. 包仓库中确实没有该版本
2. 包名格式不匹配（大小写、下划线/连字符）
3. 目录结构不符合预期

**解决方法:**
- 手动检查包仓库中是否有该包
- 查看 `pythonpath_list.txt` 了解已找到的包
- 对缺失的包，使用 pip 单独安装到本地

### 问题3: Python 找不到模块

即使设置了 PYTHONPATH，仍然无法导入模块。

**检查步骤:**

1. 验证 PYTHONPATH 是否生效：
```python
import sys
print(sys.path)
```

2. 检查包路径中是否有 `__init__.py` 或模块文件：
```bash
dir \\pss01\Code_Public\packages\somepackage\1.0.0\hash\python
```

3. 尝试直接导入查看错误：
```python
import somepackage
# 查看详细错误信息
```

## 目录结构说明

### 包仓库结构

```
\\pss01\Code_Public\packages\
├── zipp\
│   └── 3.23.0\
│       └── b99a49e4ec48ad4d9833734782ee775813473768\
│           └── python\
│               ├── zipp\
│               │   └── __init__.py
│               └── zipp-3.23.0.dist-info\
├── pyside6\
│   └── 6.10.1\
│       └── {hash}\
│           └── python\
│               ├── PySide6\
│               └── PySide6-6.10.1.dist-info\
└── ...
```

### 生成的文件

```
项目根目录\
├── requirements.lock          # 输入文件
├── pythonpath_config.json     # 配置文件
├── setup_pythonpath.py        # 主脚本
├── test_package_paths.py      # 测试脚本
│
├── setup_env.bat              # 生成的批处理脚本
├── setup_env.ps1              # 生成的 PowerShell 脚本
├── cherrystudio.pth           # 生成的 .pth 文件
└── pythonpath_list.txt        # 生成的路径列表
```

## 在 Cherry Studio 中使用

### 独立启动

```bash
# 设置环境
setup_env.bat

# 启动应用
python start_cherry_studio.py
```

### 在 Houdini 中使用

1. 在 Houdini 启动脚本中设置 PYTHONPATH
2. 或者将 `cherrystudio.pth` 复制到 Houdini 的 Python 库目录

## 自动化

可以将 PYTHONPATH 设置集成到启动脚本中：

### 修改 `launch_standalone.bat`

```batch
@echo off
REM 设置 PYTHONPATH
call setup_env.bat

REM 启动应用
python start_cherry_studio.py %*
```

### 创建新的启动脚本 `launch_with_packages.bat`

```batch
@echo off
echo 正在设置环境...
call setup_env.bat
echo.
echo 启动 Cherry Studio...
python start_cherry_studio.py %*
```

## 性能优化

### 使用 .pth 文件

.pth 文件是最高效的方法，因为：
- 只需设置一次
- Python 启动时自动加载
- 不需要每次运行脚本

### 缓存包路径

如果包路径很少变化，可以：
1. 生成一次路径列表
2. 保存到文件
3. 后续直接使用，不重新扫描

## 维护

### 更新依赖

当 `requirements.txt` 更新后：

```bash
# 1. 重新生成锁定文件
uv pip compile requirements.txt -o requirements.lock

# 2. 重新生成 PYTHONPATH
python setup_pythonpath.py

# 3. 应用新的环境设置
setup_env.bat  # 或其他方法
```

### 清理

删除生成的文件：

```bash
del setup_env.bat setup_env.ps1 cherrystudio.pth pythonpath_list.txt
```

## 相关命令

```bash
# 查看当前 PYTHONPATH
echo %PYTHONPATH%                # CMD
$env:PYTHONPATH                  # PowerShell
python -c "import sys; print(sys.path)"  # Python

# 测试导入
python -c "import PySide6; print(PySide6.__file__)"
python -c "import fastmcp; print(fastmcp.__version__)"

# 列出包仓库
dir \\pss01\Code_Public\packages

# 查找特定包
dir \\pss01\Code_Public\packages\zipp /s
```

## 高级用法

### 只为特定包生成路径

修改 `setup_pythonpath.py`，添加包过滤：

```python
# 只处理这些包
whitelist = ['PySide6', 'fastmcp', 'pydantic']
packages = [(n, v) for n, v in packages if n in whitelist]
```

### 排除特定包

```python
# 排除这些包
blacklist = ['pywin32', 'cryptography']
packages = [(n, v) for n, v in packages if n not in blacklist]
```

## 许可与贡献

此工具是 Cherry Studio for Houdini 项目的一部分。

