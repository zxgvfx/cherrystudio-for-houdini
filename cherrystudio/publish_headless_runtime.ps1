<#
Publishes the packaged headless Electron runtime outside the source checkout.

The runtime is a large (~1.2 GB) generated dependency, not source code. Keep it
in an external artifact store and let client launchers copy it into their local
cache before starting CocoClient.

Examples:
  pwsh .\publish_headless_runtime.ps1
  pwsh .\publish_headless_runtime.ps1 -Source "E:\builds\win-unpacked"
  pwsh .\publish_headless_runtime.ps1 -RuntimeStore "\\server\packages\cherry-headless"
#>

[CmdletBinding()]
param(
    [string]$Source = (Join-Path (Split-Path $PSScriptRoot -Parent) "web\dist\win-unpacked"),
    [string]$RuntimeStore = "C:\coco\headless-runtime",
    [switch]$WhatIf
)

$ErrorActionPreference = "Stop"
$sourceExe = Join-Path $Source "Cherry Studio.exe"
$destination = Join-Path $RuntimeStore "win-unpacked"

if (-not (Test-Path $sourceExe)) {
    throw "Headless Electron executable not found: $sourceExe. Build it first with electron-builder --dir."
}

if (-not (Test-Path $RuntimeStore)) {
    New-Item -ItemType Directory -Path $RuntimeStore -Force | Out-Null
}

$robocopyArgs = @(
    $Source, $destination,
    "/MIR",
    "/FFT",
    "/NFL", "/NDL", "/NP",
    "/R:2", "/W:1"
)
if ($WhatIf) {
    $robocopyArgs += "/L"
}

Write-Host "Publishing headless Electron runtime $Source -> $destination ..." -ForegroundColor Cyan
& robocopy @robocopyArgs
$code = $LASTEXITCODE
if ($code -ge 8) {
    throw "robocopy failed, exit code $code"
}

if ($WhatIf) {
    Write-Host "[WHATIF] Runtime manifest not written." -ForegroundColor Yellow
    return
}

$destinationExe = Join-Path $destination "Cherry Studio.exe"
$asarPath = Join-Path $destination "resources\app.asar"
if (-not (Test-Path $destinationExe) -or -not (Test-Path $asarPath)) {
    throw "Published runtime is incomplete: expected Cherry Studio.exe and resources\app.asar under $destination"
}

$manifest = [ordered]@{
    executable = $destinationExe
    appAsarSha256 = (Get-FileHash $asarPath -Algorithm SHA256).Hash
    publishedAtUtc = (Get-Date).ToUniversalTime().ToString("o")
}
$manifest | ConvertTo-Json | Set-Content -Path (Join-Path $RuntimeStore "runtime.json") -Encoding UTF8

Write-Host "[OK] Headless runtime published outside the source repository." -ForegroundColor Green
Write-Host "     Set CHERRY_ELECTRON_APP_PATH to: $destinationExe" -ForegroundColor Yellow
