# 同步本插件源（D:\python\cherrystudio-for-houdini\...）到 COCO 实际加载目录。
#
# 背景：COCO 客户端启动的是 D:\Development\coco\cocoApplication\bin\cherrystudio\
# 这个**副本**，不是仓库里的源。改完 manifest/routes/frontend 必须同步过去再重启 COCO，
# 否则 PluginLoader 看不到改动。
#
# 注：现在推荐直接用 cherrystudio/sync_to_coco.ps1 做整包同步（增量、不清空目标），
# 这个脚本只同步单个插件、且会先删再拷（Remove-Item + Copy-Item），仅保留用于旧流程兼容。
#
# 用法：
#   pwsh D:\python\cherrystudio-for-houdini\cherrystudio\plugins\ai-pipeline-bridge\sync_to_coco.ps1

$ErrorActionPreference = "Stop"

$src = "D:\python\cherrystudio-for-houdini\cherrystudio\plugins\ai-pipeline-bridge"
$dst = "D:\Development\coco\cocoApplication\bin\cherrystudio\plugins\ai-pipeline-bridge"

if (-not (Test-Path $src)) {
    Write-Host "源目录不存在: $src" -ForegroundColor Red
    exit 1
}

if (Test-Path $dst) {
    Write-Host "清理旧副本: $dst"
    Remove-Item -Recurse -Force $dst
}

Copy-Item -Recurse $src (Split-Path $dst -Parent)

Write-Host "✓ 已同步到 $dst" -ForegroundColor Green
Write-Host ""
Write-Host "现在请：" -ForegroundColor Yellow
Write-Host "  1. 完全退出 CocoClient（任务管理器确认进程没了）"
Write-Host "  2. 重新启动 CocoClient"
Write-Host "  3. 在控制台搜 [ai-pipeline-bridge] 看路由是否注册成功"
Write-Host ""
Write-Host "目录内容："
Get-ChildItem -Recurse $dst | Select-Object Name, Length, LastWriteTime | Format-Table -AutoSize
