# pywin32 版本不匹配问题解决方案

## 问题根源

```
Python 版本: 3.12.8
pywin32 版本: 311 (为 Python 3.11 编译)
```

**关键**: pywin32 的 `.pyd` 文件是编译的二进制文件，必须与 Python 版本精确匹配！

## 立即解决方案

### 方案1: 使用 pip 安装匹配版本（最简单）

```bash
# 自动安装与当前 Python 版本匹配的 pywin32
pip install pywin32
```

执行后测试：
```bash
python -c "import pywintypes; import win32api; print('✓ pywin32 正常工作')"
```

### 方案2: 从包仓库查找 Python 3.12 版本

检查包仓库是否有 Python 3.12 的 pywin32：

```bash
dir "\\pss01\Code_Public\packages\pywin32\" /S
```

寻找类似这样的目录：
- `pywin32\312\...` (312 = Python 3.12)
- 或 `pywin32\3.12\...`

如果找到，更新 `setup_pythonpath.py` 中的路径。

### 方案3: 在 requirements.lock 中排除 pywin32

编辑 `excluded_packages.json`:

```json
[
  "pywin32"
]
```

然后重新生成环境配置：

```bash
python setup_pythonpath.py
```

让系统使用 pip 安装的 pywin32。

### 方案4: 降级 Python 到 3.11

如果项目必须使用包仓库的 pywin32 311：

```bash
# 安装 Python 3.11
# 然后创建虚拟环境
python3.11 -m venv venv_py311
venv_py311\Scripts\activate
```

## pywin32 版本对照表

| Python 版本 | pywin32 内部版本号 | 包仓库路径 |
|------------|------------------|-----------|
| 3.8.x      | 38               | pywin32/38/... |
| 3.9.x      | 39               | pywin32/39/... |
| 3.10.x     | 310              | pywin32/310/... |
| 3.11.x     | 311              | pywin32/311/... |
| 3.12.x     | 312              | pywin32/312/... |

## 快速检查命令

```bash
# 检查当前 Python 版本
python --version

# 检查已安装的 pywin32
pip show pywin32

# 检查是否能导入
python -c "import sys; print(f'Python {sys.version_info.major}.{sys.version_info.minor}'); import pywintypes"
```

## 推荐的项目配置

### 选项A: 纯 pip 管理

`requirements.txt`:
```
pywin32>=306  # 让 pip 自动选择匹配版本
fastmcp
PySide6>=6.0.0
```

### 选项B: 混合模式

1. **二进制扩展包**（如 pywin32）→ pip 安装
2. **纯 Python 包** → 包仓库

配置 `excluded_packages.json`:
```json
[
  "pywin32",
  "numpy",
  "scipy",
  "opencv-python"
]
```

### 选项C: 完整包仓库

确保包仓库包含所有 Python 版本的二进制包：

```
packages/
├── pywin32/
│   ├── 310/
│   ├── 311/
│   └── 312/  ← 需要这个！
├── numpy/
│   ├── cp310/
│   ├── cp311/
│   └── cp312/
...
```

## 立即行动

**推荐执行**:

```bash
# 1. 用 pip 安装 pywin32
pip install pywin32

# 2. 测试
python -c "import pywintypes; print('OK')"

# 3. 排除 pywin32 避免冲突
echo ["pywin32"] > excluded_packages.json

# 4. 重新生成环境配置
python setup_pythonpath.py
```

这样就能确保使用与 Python 3.12 匹配的 pywin32 版本！

