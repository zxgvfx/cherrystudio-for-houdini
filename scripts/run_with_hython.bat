@echo off
REM Batch script to run the project using Houdini's hython
REM 使用 Houdini 的 hython 运行项目的批处理脚本

setlocal enabledelayedexpansion

set "HOUDINI_VERSION=20.5.613"
set "PROJECT_PATH=houdini_plugin\main.py"
set "URL=%1"

set "HOUDINI_PATH=C:\Program Files\Side Effects Software\Houdini %HOUDINI_VERSION%"
set "HYTHON_PATH=%HOUDINI_PATH%\bin\hython.exe"

echo 使用 Houdini %HOUDINI_VERSION% 的 hython 运行项目...
echo Houdini 路径: %HOUDINI_PATH%
echo hython 路径: %HYTHON_PATH%

REM 检查 hython 是否存在
if not exist "%HYTHON_PATH%" (
    echo 错误: 找不到 hython.exe 在路径: %HYTHON_PATH%
    echo 请检查 Houdini 安装路径和版本号。
    exit /b 1
)

REM 检查项目文件是否存在
if not exist "%PROJECT_PATH%" (
    echo 错误: 找不到项目文件: %PROJECT_PATH%
    exit /b 1
)

REM 设置环境变量
set "HOUDINI_PATH=%HOUDINI_PATH%"
set "PYTHONPATH=%HOUDINI_PATH%\houdini\python3.11libs;%PYTHONPATH%"

echo 环境变量已设置:
echo   HOUDINI_PATH = %HOUDINI_PATH%
echo   PYTHONPATH = %PYTHONPATH%

REM 构建运行命令
set "COMMAND_ARGS=%PROJECT_PATH%"
if not "%URL%"=="" (
    set "COMMAND_ARGS=%COMMAND_ARGS% %URL%"
)

echo 运行命令: %HYTHON_PATH% %COMMAND_ARGS%
echo 按 Ctrl+C 停止程序...

REM 运行项目
"%HYTHON_PATH%" %COMMAND_ARGS%

if errorlevel 1 (
    echo 运行出错，退出代码: %errorlevel%
    exit /b %errorlevel%
)
