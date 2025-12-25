# PowerShell 脚本：设置中心化配置文件路径环境变量
# 使用方法：右键 -> 使用 PowerShell 运行

$configPath = Join-Path $PSScriptRoot "resources\centralized-config.json"

Write-Host "========================================" -ForegroundColor Green
Write-Host "设置中心化配置文件路径" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "配置文件路径: $configPath" -ForegroundColor Yellow
Write-Host ""

# 检查文件是否存在
if (Test-Path $configPath) {
    Write-Host "✓ 配置文件存在" -ForegroundColor Green
} else {
    Write-Host "✗ 警告：配置文件不存在！" -ForegroundColor Red
    Write-Host "  请确认路径是否正确：$configPath" -ForegroundColor Red
}

Write-Host ""
Write-Host "选择设置范围：" -ForegroundColor Cyan
Write-Host "1. 仅当前会话（临时）"
Write-Host "2. 当前用户（永久）"
Write-Host "3. 系统全局（需要管理员权限）"
Write-Host ""

$choice = Read-Host "请输入选项 (1/2/3)"

switch ($choice) {
    "1" {
        # 仅当前会话
        $env:CHERRY_STUDIO_CENTRALIZED_CONFIG_PATH = $configPath
        Write-Host ""
        Write-Host "✓ 已设置当前会话的环境变量" -ForegroundColor Green
        Write-Host "  在此 PowerShell 窗口中启动应用即可生效" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "启动开发环境命令：" -ForegroundColor Cyan
        Write-Host "  cd web" -ForegroundColor White
        Write-Host "  npm run dev" -ForegroundColor White
    }
    "2" {
        # 当前用户
        [System.Environment]::SetEnvironmentVariable(
            "CHERRY_STUDIO_CENTRALIZED_CONFIG_PATH",
            $configPath,
            [System.EnvironmentVariableTarget]::User
        )
        Write-Host ""
        Write-Host "✓ 已设置当前用户的环境变量（永久生效）" -ForegroundColor Green
        Write-Host "  需要重新启动应用或终端才能生效" -ForegroundColor Yellow
    }
    "3" {
        # 系统全局（需要管理员权限）
        try {
            [System.Environment]::SetEnvironmentVariable(
                "CHERRY_STUDIO_CENTRALIZED_CONFIG_PATH",
                $configPath,
                [System.EnvironmentVariableTarget]::Machine
            )
            Write-Host ""
            Write-Host "✓ 已设置系统全局环境变量（永久生效）" -ForegroundColor Green
            Write-Host "  需要重新启动应用或终端才能生效" -ForegroundColor Yellow
        } catch {
            Write-Host ""
            Write-Host "✗ 设置失败：需要管理员权限" -ForegroundColor Red
            Write-Host "  请右键选择'以管理员身份运行'" -ForegroundColor Yellow
        }
    }
    default {
        Write-Host ""
        Write-Host "✗ 无效的选项" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "当前环境变量值：" -ForegroundColor Cyan
Write-Host "  $env:CHERRY_STUDIO_CENTRALIZED_CONFIG_PATH" -ForegroundColor White
Write-Host ""
Write-Host "按任意键退出..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

