@echo off
REM 使用 uv 查看包依赖关系的脚本

echo ========================================
echo Cherry Studio 依赖关系分析
echo ========================================
echo.

REM 检查 uv 是否安装
where uv >nul 2>&1
if errorlevel 1 (
    echo [错误] uv 未安装或不在 PATH 中
    echo 请先安装 uv: https://github.com/astral-sh/uv
    pause
    exit /b 1
)

echo [1] 查看 requirements.txt 完整依赖
echo ========================================
uv pip compile requirements.txt --dry-run
echo.

echo [2] 查看已安装的包依赖树
echo ========================================
uv pip tree
echo.

echo [3] 查看 PySide6 详细信息
echo ========================================
uv pip show PySide6
echo.

echo [4] 查看 fastmcp 详细信息
echo ========================================
uv pip show fastmcp
echo.

echo [5] 生成锁定的依赖文件
echo ========================================
echo 是否生成 requirements.lock 文件? (Y/N)
set /p generate_lock=
if /i "%generate_lock%"=="Y" (
    uv pip compile requirements.txt -o requirements.lock
    echo.
    echo ✓ 已生成 requirements.lock
    echo 该文件包含所有依赖及其精确版本
)

echo.
echo 完成！
pause

