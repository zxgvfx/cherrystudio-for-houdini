@echo off
REM Cherry Studio 依赖安装脚本
REM 支持多种安装方式

echo Installing Cherry Studio Dependencies...
echo.

REM 检查是否使用 uv
where uv >nul 2>&1
if %errorlevel% equ 0 (
    echo Using uv package manager...
    echo.
    echo Increasing timeout and retrying...
    set UV_HTTP_TIMEOUT=300
    uv pip install PySide6
    if errorlevel 1 (
        echo.
        echo uv installation failed. Trying with pip instead...
        echo.
        python -m pip install --upgrade pip
        python -m pip install PySide6
    )
) else (
    echo Using pip package manager...
    echo.
    python -m pip install --upgrade pip
    python -m pip install PySide6
)

if errorlevel 1 (
    echo.
    echo ========================================
    echo Installation failed!
    echo ========================================
    echo.
    echo Possible solutions:
    echo 1. Check your internet connection
    echo 2. Try using a different package manager:
    echo    - pip: python -m pip install PySide6
    echo    - conda: conda install -c conda-forge pyside6
    echo 3. Increase timeout for uv:
    echo    - set UV_HTTP_TIMEOUT=300
    echo    - uv pip install PySide6
    echo 4. Use a mirror (for pip):
    echo    - pip install -i https://pypi.tuna.tsinghua.edu.cn/simple PySide6
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo Dependencies installed successfully!
echo ========================================
echo.
pause

