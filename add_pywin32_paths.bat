@echo off
REM 为 pywin32 添加必要的子目录到 PYTHONPATH

echo 添加 pywin32 特殊路径...

set "PYWIN32_BASE=\\pss01\Code_Public\packages\pywin32\311\247f3b5108d93bbbcc44654ee6739345e36d27bd\python"

REM 添加主目录
set "PYTHONPATH=%PYWIN32_BASE%;%PYTHONPATH%"

REM 添加 win32/lib (包含 pywintypes.py)
set "PYTHONPATH=%PYWIN32_BASE%\win32\lib;%PYTHONPATH%"

REM 添加 DLL 目录到 PATH
set "PATH=%PYWIN32_BASE%\pywin32_system32;%PATH%"

echo.
echo ✓ pywin32 路径已添加
echo.
echo 现在可以导入 pywintypes 了:
echo   python -c "import pywintypes; print('OK')"

