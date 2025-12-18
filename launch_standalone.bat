@echo off
REM Cherry Studio 独立启动脚本（非 Houdini 环境）
REM 使用系统 Python 环境启动

echo Starting Cherry Studio (Standalone Mode)...
echo.

REM 检查 Python 是否可用
python --version >nul 2>&1
if errorlevel 1 (
    echo Error: Python not found in PATH.
    echo Please install Python 3.8+ and add it to PATH, or use a virtual environment.
    pause
    exit /b 1
)

echo Found Python:
python --version
echo.

REM 检查是否安装了 PySide6
python -c "import PySide6" >nul 2>&1
if errorlevel 1 (
    echo PySide6 not found. Installing dependencies...
    echo.
    python -m pip install -r requirements.txt
    if errorlevel 1 (
        echo.
        echo Error: Failed to install dependencies.
        echo Please install PySide6 manually: pip install PySide6
        pause
        exit /b 1
    )
    echo.
    echo Dependencies installed successfully.
    echo.
)

REM 设置环境变量
set "QTWEBENGINE_CHROMIUM_FLAGS=--disable-gpu --disable-software-rasterizer --no-sandbox"
set "PYTHONPATH=%PYTHONPATH%;%CD%"

echo Launching Cherry Studio...
echo.

REM 启动应用
python start_cherry_studio.py %*

echo.
echo Cherry Studio has been closed.
pause

