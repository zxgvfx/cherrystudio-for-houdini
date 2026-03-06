@echo off
REM 正确配置包仓库中的 pywin32

echo ========================================
echo 配置 pywin32 从包仓库
echo ========================================
echo.

set "PYWIN32_BASE=\\pss01\Code_Public\packages\pywin32\311\247f3b5108d93bbbcc44654ee6739345e36d27bd\python"

echo [1] 检查路径是否存在...
if not exist "%PYWIN32_BASE%" (
    echo ✗ 错误: pywin32 路径不存在
    echo    %PYWIN32_BASE%
    pause
    exit /b 1
)
echo ✓ pywin32 路径存在

echo.
echo [2] 设置 PYTHONPATH...
REM 必须按顺序添加这些路径：

REM 1. pywin32 主目录
set "PYTHONPATH=%PYWIN32_BASE%;%PYTHONPATH%"
echo   ✓ 添加主目录

REM 2. win32/lib (包含 pywintypes.py) - 最关键！
set "PYTHONPATH=%PYWIN32_BASE%\win32\lib;%PYTHONPATH%"
echo   ✓ 添加 win32\lib (pywintypes 位置)

REM 3. win32com 相关
set "PYTHONPATH=%PYWIN32_BASE%\win32comext\shell;%PYTHONPATH%"
echo   ✓ 添加 win32comext\shell

echo.
echo [3] 设置 PATH (DLL 搜索路径)...

REM pywin32_system32 包含 DLL 文件
set "PATH=%PYWIN32_BASE%\pywin32_system32;%PATH%"
echo   ✓ 添加 pywin32_system32 (DLL 位置)

REM win32 目录也包含一些 .pyd 文件
set "PATH=%PYWIN32_BASE%\win32;%PATH%"
echo   ✓ 添加 win32 目录

echo.
echo ========================================
echo ✓ pywin32 配置完成
echo ========================================
echo.

echo 测试导入...
python -c "import sys; print('Python 路径数量:', len(sys.path))"
python -c "import pywintypes; print('✓ pywintypes 导入成功')" 2>nul && (
    echo ✓ pywin32 工作正常
) || (
    echo ✗ pywintypes 导入失败
    echo.
    echo 调试信息:
    python -c "import sys; [print(p) for p in sys.path if 'pywin32' in p.lower()]"
    echo.
    echo 尝试手动检查:
    echo   dir "%PYWIN32_BASE%\win32\lib\pywintypes.py"
)

echo.
echo ========================================
echo 使用说明
echo ========================================
echo.
echo 当前会话已配置完成，可以使用 pywin32
echo.
echo 如需永久配置，请将以下内容添加到启动脚本:
echo   call setup_pywin32_manual.bat
echo.

