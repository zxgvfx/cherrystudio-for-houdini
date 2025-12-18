@echo off
echo Starting Cherry Studio for Houdini...
echo.

REM Check if Houdini 20.5 is installed
set "HOUDINI_PATH=C:\Program Files\Side Effects Software\Houdini 20.5.613\bin\hython.exe"
if not exist "%HOUDINI_PATH%" (
    echo Error: Houdini 20.5.613 not found at expected location.
    echo Please update the path in this script or install Houdini 20.5.613
    pause
    exit /b 1
)

echo Found Houdini at: %HOUDINI_PATH%
echo.

REM Set environment variables for better stability
set "QTWEBENGINE_CHROMIUM_FLAGS=--disable-gpu --disable-software-rasterizer --no-sandbox"
set "PYTHONPATH=%PYTHONPATH%;%CD%"

echo Launching Cherry Studio...
"%HOUDINI_PATH%" cherrystudio\main.py

echo.
echo Cherry Studio has been closed.
pause
