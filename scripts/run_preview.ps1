param(
  [string]$Url
)

$ErrorActionPreference = 'Stop'

Write-Host "[run_preview] 启动 PySide6 预览..." -ForegroundColor Cyan

# 优先使用 Houdini hython（如果有 HFS 环境变量）
$pythonExe = $null
if ($env:HFS) {
  $candidate = Join-Path $env:HFS 'bin/hython.exe'
  if (Test-Path $candidate) { $pythonExe = $candidate }
}
if (-not $pythonExe) { $pythonExe = 'python' }

if ($PSBoundParameters.ContainsKey('Url')) {
  & $pythonExe .\scripts\run_preview.py "$Url"
} else {
  & $pythonExe .\scripts\run_preview.py
}


