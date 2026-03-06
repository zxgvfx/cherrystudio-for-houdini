# pywin32 从网络包仓库加载问题排查指南

## 问题症状

```python
ImportError: No module named '_win32sysloader'
```

即使 Python 版本和 pywin32 版本匹配（Python 3.11 + pywin32 311）仍然报错。

## 根本原因

### 1. **网络路径 DLL 加载限制**

Windows 对从网络路径（UNC 路径如 `\\server\share\`）加载 DLL 有严格的安全限制：

- **默认行为**: Windows 不信任网络路径的 DLL
- **Python 3.8+**: 更严格的 DLL 加载策略
- **pywin32 特点**: 包含大量 `.pyd` 文件（实际上是 DLL）

### 2. **pywin32 特殊的初始化流程**

pywin32 不是普通的 Python 包：

```
pywin32/
├── win32/
│   ├── _win32sysloader.pyd  ← 第一个加载的模块
│   ├── win32api.pyd
│   └── lib/
│       ├── pywintypes.py
│       └── pywin32_bootstrap.py  ← 初始化脚本
├── pywin32_system32/
│   ├── pywintypes311.dll  ← 核心 DLL
│   └── pythoncom311.dll
└── ...
```

**加载顺序**:
1. `_win32sysloader.pyd` - 系统加载器
2. 依赖的 DLL（从 pywin32_system32）
3. 其他 pywin32 模块

### 3. **PATH vs sys.path**

- `sys.path`: Python 模块搜索路径
- `PATH`: Windows DLL 搜索路径
- **pywin32 需要两者都配置！**

## 解决方案

### ✅ 方案1: 本地安装（推荐）

最简单可靠的方法：

```bash
pip install pywin32==311
```

**优点**:
- 自动运行后安装脚本
- 正确注册 DLL
- 无网络路径问题

### ✅ 方案2: 使用系统安装的版本

如果系统已有 pywin32：

```python
# 在 setup_pythonpath.py 中排除 pywin32
excluded_packages = {'pywin32'}
```

重新生成配置：
```bash
python setup_pythonpath.py
```

### ⚠️ 方案3: 修复网络路径加载

如果必须使用包仓库版本：

#### 步骤1: 运行诊断

```bash
python diagnose_pywin32_loading.py
```

#### 步骤2: 应用修复

```bash
python fix_pywin32_network_path.py
```

#### 步骤3: 在代码开始处添加初始化

```python
import sys
import os
from pathlib import Path

# pywin32 基础路径
PYWIN32_BASE = Path(r"\\pss01\Code_Public\packages\pywin32\311\247f3b5108d93bbbcc44654ee6739345e36d27bd\python")

# 1. 添加到 sys.path
sys.path.insert(0, str(PYWIN32_BASE))
sys.path.insert(0, str(PYWIN32_BASE / "win32"))
sys.path.insert(0, str(PYWIN32_BASE / "win32" / "lib"))

# 2. 添加 DLL 目录
dll_dirs = [
    str(PYWIN32_BASE / "pywin32_system32"),
    str(PYWIN32_BASE / "win32"),
]

for dll_dir in dll_dirs:
    os.environ['PATH'] = dll_dir + os.pathsep + os.environ.get('PATH', '')
    
    # Python 3.8+
    if sys.version_info >= (3, 8):
        try:
            os.add_dll_directory(dll_dir)
        except:
            pass

# 3. 预加载关键 DLL (可选但推荐)
if sys.version_info >= (3, 8):
    import ctypes
    try:
        ctypes.WinDLL(str(PYWIN32_BASE / "pywin32_system32" / "pywintypes311.dll"))
        ctypes.WinDLL(str(PYWIN32_BASE / "pywin32_system32" / "pythoncom311.dll"))
    except:
        pass

# 现在可以导入 pywin32
import pywintypes
```

### 🔧 方案4: 复制到本地

将包仓库的 pywin32 复制到本地：

```powershell
# 复制到项目目录
xcopy /E /I "\\pss01\Code_Public\packages\pywin32\311\247f3b5108d93bbbcc44654ee6739345e36d27bd\python" ".\local_packages\pywin32"

# 更新路径配置指向本地副本
```

## 测试方法

### 快速测试

```bash
python -c "import pywintypes; print('OK')"
```

### 详细测试

```bash
python test_pywin32_import.py
```

### 完整诊断

```bash
python diagnose_pywin32_loading.py
```

## 常见错误和解决方法

### 错误1: `ImportError: DLL load failed`

**原因**: DLL 路径未正确配置

**解决**:
```python
import os
dll_dir = r"\\pss01\...\pywin32_system32"
os.environ['PATH'] = dll_dir + os.pathsep + os.environ['PATH']

# Python 3.8+
os.add_dll_directory(dll_dir)
```

### 错误2: `OSError: [WinError 126] 找不到指定的模块`

**原因**: 缺少依赖的 DLL

**解决**:
1. 检查是否安装 Visual C++ Redistributable
2. 预加载 pywintypes311.dll 和 pythoncom311.dll

### 错误3: 版本不匹配

**症状**: `ImportError: Module use of python311.dll conflicts with this version of Python`

**解决**: 确保 Python 版本与 pywin32 版本匹配

| Python 版本 | pywin32 版本 |
|------------|-------------|
| 3.11.x     | 311         |
| 3.12.x     | 306+        |
| 3.10.x     | 305         |

## 最佳实践

### ✅ 推荐做法

1. **优先使用 pip 安装**
   ```bash
   pip install pywin32
   ```

2. **使用虚拟环境**
   ```bash
   python -m venv venv
   venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **如果使用包仓库，排除二进制扩展包**
   ```python
   excluded_packages = {'pywin32', 'numpy', 'opencv-python'}
   ```

### ❌ 不推荐

1. 直接从网络路径加载二进制扩展
2. 手动复制 DLL 到 System32
3. 禁用 Windows DLL 安全检查

## 调试技巧

### 1. 检查 DLL 依赖

使用 `dumpbin`（Visual Studio 工具）：

```cmd
dumpbin /DEPENDENTS _win32sysloader.pyd
```

### 2. 监控 DLL 加载

使用 Process Monitor (ProcMon):
1. 过滤进程为 python.exe
2. 过滤操作为 LoadImage
3. 查看哪些 DLL 加载失败

### 3. Python 调试输出

```python
import sys
sys.path.insert(0, r'...\pywin32\win32')

# 尝试导入并捕获详细错误
try:
    import _win32sysloader
except ImportError as e:
    import traceback
    traceback.print_exc()
    
    # 检查路径
    print("sys.path:", sys.path[:5])
    print("PATH:", os.environ['PATH'][:200])
```

## 企业环境特殊考虑

### 网络包仓库的限制

1. **安全策略**: 企业可能禁止从网络路径加载 DLL
2. **性能**: 网络延迟影响加载速度
3. **依赖**: 需要持续网络连接

### 建议架构

```
方案A: 混合模式
├── 纯 Python 包 → 包仓库
└── 二进制扩展包 → 本地安装/系统级

方案B: 本地缓存
├── 首次使用: 从包仓库复制到本地
└── 后续使用: 使用本地缓存

方案C: 容器化
└── 在 Docker/虚拟环境中预装所有依赖
```

## 相关资源

- [pywin32 GitHub](https://github.com/mhammond/pywin32)
- [Windows DLL 搜索顺序](https://docs.microsoft.com/en-us/windows/win32/dlls/dynamic-link-library-search-order)
- [Python DLL 加载 (PEP 384)](https://www.python.org/dev/peps/pep-0384/)

## 支持

如果问题仍未解决：

1. 运行完整诊断：
   ```bash
   python diagnose_pywin32_loading.py > pywin32_diagnostic.txt
   ```

2. 检查诊断输出

3. 考虑使用本地安装方案

---

最后更新: 2025-01-29

