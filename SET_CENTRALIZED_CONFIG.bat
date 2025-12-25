@echo off
REM 设置中心化配置文件路径环境变量
REM 使用方法：直接双击运行，然后在同一个命令行窗口中启动应用

set CHERRY_STUDIO_CENTRALIZED_CONFIG_PATH=%~dp0resources\centralized-config.json

echo ========================================
echo 环境变量已设置：
echo CHERRY_STUDIO_CENTRALIZED_CONFIG_PATH=%CHERRY_STUDIO_CENTRALIZED_CONFIG_PATH%
echo ========================================
echo.
echo 请在此窗口中启动应用，或者输入以下命令：
echo   cd web
echo   npm run dev
echo.
echo 按任意键继续...
pause >nul

cmd /k

