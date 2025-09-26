param(
  [string]$Source = "web/out/renderer",
  [string]$Target = "houdini_plugin/public"
)

$ErrorActionPreference = 'Stop'

Write-Host "[copy_web_dist] 拷贝构建产物: $Source -> $Target" -ForegroundColor Cyan

if (-not (Test-Path $Source)) {
  Write-Host "[copy_web_dist] 源不存在：$Source" -ForegroundColor Yellow
  exit 0
}

New-Item -ItemType Directory -Force -Path $Target | Out-Null
Copy-Item -Path (Join-Path $Source '*') -Destination $Target -Recurse -Force
Write-Host "[copy_web_dist] 完成" -ForegroundColor Green


