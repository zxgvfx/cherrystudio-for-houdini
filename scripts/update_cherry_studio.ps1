# Cherry Studio 更新脚本
# 用于自动同步上游 Cherry Studio 代码并重新构建

param(
    [switch]$SkipBackup,
    [switch]$SkipBuild,
    [switch]$SkipTest,
    [string]$Version = "",
    [switch]$Help
)

if ($Help) {
    Write-Host @"
Cherry Studio 更新脚本

用法:
    .\scripts\update_cherry_studio.ps1 [选项]

选项:
    -SkipBackup      跳过备份步骤
    -SkipBuild       跳过构建步骤
    -SkipTest        跳过测试步骤
    -Version <版本>   更新到指定版本/标签（例如: v1.6.0）
    -Help            显示此帮助信息

示例:
    .\scripts\update_cherry_studio.ps1
    .\scripts\update_cherry_studio.ps1 -Version v1.6.0
    .\scripts\update_cherry_studio.ps1 -SkipBackup -SkipTest
"@
    exit 0
}

$ErrorActionPreference = "Stop"
$ProjectRoot = Split-Path -Parent $PSScriptRoot
$WebDir = Join-Path $ProjectRoot "web"
$PublicDir = Join-Path $ProjectRoot "houdini_plugin\public"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Cherry Studio 更新脚本" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 1. 备份（可选）
if (-not $SkipBackup) {
    Write-Host "[1/6] 备份当前工作..." -ForegroundColor Yellow
    Push-Location $ProjectRoot
    try {
        $timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
        $backupBranch = "backup-before-update-$timestamp"
        
        # 检查是否有未提交的更改
        $status = git status --porcelain
        if ($status) {
            Write-Host "  发现未提交的更改，创建备份分支: $backupBranch" -ForegroundColor Yellow
            git branch $backupBranch
            Write-Host "  ✓ 备份分支已创建" -ForegroundColor Green
        } else {
            Write-Host "  ✓ 工作目录干净，无需备份" -ForegroundColor Green
        }
    } catch {
        Write-Host "  ⚠ 备份步骤跳过（可能不是 Git 仓库）" -ForegroundColor Yellow
    }
    Pop-Location
    Write-Host ""
}

# 2. 更新子模块
Write-Host "[2/6] 更新 Cherry Studio 子模块..." -ForegroundColor Yellow
Push-Location $WebDir
try {
    # 检查是否是 Git 仓库
    if (-not (Test-Path ".git")) {
        Write-Host "  ❌ 错误: web 目录不是 Git 仓库" -ForegroundColor Red
        Write-Host "  请确保 web 目录是 Git 子模块" -ForegroundColor Red
        exit 1
    }
    
    # 检查上游远程仓库
    $remotes = git remote -v
    if ($remotes -notmatch "upstream") {
        Write-Host "  ⚠ 未找到 upstream 远程仓库，尝试添加..." -ForegroundColor Yellow
        git remote add upstream https://github.com/CherryHQ/cherry-studio.git
        Write-Host "  ✓ 已添加 upstream 远程仓库" -ForegroundColor Green
    }
    
    # 获取当前分支
    $currentBranch = git rev-parse --abbrev-ref HEAD
    Write-Host "  当前分支: $currentBranch" -ForegroundColor Gray
    
    # 获取上游更新
    Write-Host "  获取上游更新..." -ForegroundColor Gray
    git fetch upstream
    
    if ($Version) {
        # 切换到指定版本
        Write-Host "  切换到版本: $Version" -ForegroundColor Gray
        git checkout $Version
        if ($LASTEXITCODE -ne 0) {
            Write-Host "  ❌ 错误: 无法切换到版本 $Version" -ForegroundColor Red
            Write-Host "  请检查版本标签是否存在" -ForegroundColor Red
            exit 1
        }
    } else {
        # 合并上游更新
        Write-Host "  合并上游更新..." -ForegroundColor Gray
        $upstreamBranch = "upstream/main"
        if ((git branch -r) -notmatch "upstream/main") {
            $upstreamBranch = "upstream/master"
        }
        
        # 检查是否有更新
        $commitsBehind = git rev-list --count HEAD..$upstreamBranch
        if ($commitsBehind -eq 0) {
            Write-Host "  ✓ 已是最新版本" -ForegroundColor Green
        } else {
            Write-Host "  发现 $commitsBehind 个新提交" -ForegroundColor Gray
            git merge $upstreamBranch --no-edit
            if ($LASTEXITCODE -ne 0) {
                Write-Host "  ❌ 合并冲突！请手动解决冲突后继续" -ForegroundColor Red
                Write-Host "  冲突文件:" -ForegroundColor Red
                git diff --name-only --diff-filter=U
                exit 1
            }
            Write-Host "  ✓ 合并完成" -ForegroundColor Green
        }
    }
    
    # 显示当前版本
    $currentVersion = (Get-Content package.json | ConvertFrom-Json).version
    $currentCommit = git rev-parse --short HEAD
    Write-Host "  当前版本: $currentVersion (commit: $currentCommit)" -ForegroundColor Green
} catch {
    Write-Host "  ❌ 错误: $_" -ForegroundColor Red
    Pop-Location
    exit 1
}
Pop-Location
Write-Host ""

# 3. 安装依赖
Write-Host "[3/6] 安装/更新依赖..." -ForegroundColor Yellow
Push-Location $WebDir
try {
    # 检查包管理器
    if (Test-Path "yarn.lock") {
        Write-Host "  使用 Yarn 安装依赖..." -ForegroundColor Gray
        yarn install
    } elseif (Test-Path "pnpm-lock.yaml") {
        Write-Host "  使用 pnpm 安装依赖..." -ForegroundColor Gray
        pnpm install
    } else {
        Write-Host "  使用 npm 安装依赖..." -ForegroundColor Gray
        npm install
    }
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "  ❌ 依赖安装失败" -ForegroundColor Red
        exit 1
    }
    Write-Host "  ✓ 依赖安装完成" -ForegroundColor Green
} catch {
    Write-Host "  ❌ 错误: $_" -ForegroundColor Red
    Pop-Location
    exit 1
}
Pop-Location
Write-Host ""

# 4. 构建 Web 应用
if (-not $SkipBuild) {
    Write-Host "[4/6] 构建 Web 应用..." -ForegroundColor Yellow
    Push-Location $WebDir
    try {
        # 检查是否有 build:web 脚本
        $packageJson = Get-Content package.json | ConvertFrom-Json
        $hasWebBuild = $packageJson.scripts.PSObject.Properties.Name -contains "build:web"
        
        if ($hasWebBuild) {
            Write-Host "  执行 build:web..." -ForegroundColor Gray
            if (Test-Path "yarn.lock") {
                yarn build:web
            } elseif (Test-Path "pnpm-lock.yaml") {
                pnpm build:web
            } else {
                npm run build:web
            }
        } else {
            Write-Host "  执行标准 build..." -ForegroundColor Gray
            if (Test-Path "yarn.lock") {
                yarn build
            } elseif (Test-Path "pnpm-lock.yaml") {
                pnpm build
            } else {
                npm run build
            }
        }
        
        if ($LASTEXITCODE -ne 0) {
            Write-Host "  ❌ 构建失败" -ForegroundColor Red
            exit 1
        }
        Write-Host "  ✓ 构建完成" -ForegroundColor Green
    } catch {
        Write-Host "  ❌ 错误: $_" -ForegroundColor Red
        Pop-Location
        exit 1
    }
    Pop-Location
    Write-Host ""
    
    # 5. 复制构建产物
    Write-Host "[5/6] 复制构建产物..." -ForegroundColor Yellow
    try {
        # 查找构建输出目录
        $buildDirs = @(
            "out\renderer",
            "dist",
            "dist-web",
            "build"
        )
        
        $foundBuildDir = $null
        foreach ($dir in $buildDirs) {
            $fullPath = Join-Path $WebDir $dir
            if (Test-Path $fullPath) {
                $foundBuildDir = $fullPath
                break
            }
        }
        
        if (-not $foundBuildDir) {
            Write-Host "  ❌ 错误: 找不到构建输出目录" -ForegroundColor Red
            Write-Host "  请检查构建是否成功，或手动指定构建输出目录" -ForegroundColor Red
            exit 1
        }
        
        Write-Host "  从 $foundBuildDir 复制到 $PublicDir" -ForegroundColor Gray
        
        # 确保目标目录存在
        if (-not (Test-Path $PublicDir)) {
            New-Item -ItemType Directory -Path $PublicDir -Force | Out-Null
        }
        
        # 复制文件
        Copy-Item -Path "$foundBuildDir\*" -Destination $PublicDir -Recurse -Force
        
        Write-Host "  ✓ 复制完成" -ForegroundColor Green
    } catch {
        Write-Host "  ❌ 错误: $_" -ForegroundColor Red
        exit 1
    }
    Write-Host ""
} else {
    Write-Host "[4/6] 跳过构建步骤" -ForegroundColor Gray
    Write-Host "[5/6] 跳过复制步骤" -ForegroundColor Gray
    Write-Host ""
}

# 6. 测试（可选）
if (-not $SkipTest) {
    Write-Host "[6/6] 测试验证..." -ForegroundColor Yellow
    Write-Host "  请手动启动插件进行测试:" -ForegroundColor Gray
    Write-Host "    .\launch_cherry_studio.bat" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "  或运行:" -ForegroundColor Gray
    $houdiniPath = "C:\Program Files\Side Effects Software\Houdini 20.5.613\bin\hython.exe"
    Write-Host "    `"$houdiniPath`" houdini_plugin\main.py" -ForegroundColor Cyan
    Write-Host ""
} else {
    Write-Host "[6/6] 跳过测试步骤" -ForegroundColor Gray
    Write-Host ""
}

# 完成
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "✓ 更新完成！" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "下一步:" -ForegroundColor Yellow
Write-Host "1. 检查适配层兼容性（electron_injector.py, cherry_studio_api.py）" -ForegroundColor Gray
Write-Host "2. 测试所有功能" -ForegroundColor Gray
Write-Host "3. 如有问题，参考 UPDATE_GUIDE.md" -ForegroundColor Gray
Write-Host ""

