<#
Build and publish the headless Electron runtime without creating web\dist in
the source checkout. The resulting win-unpacked folder is staged under TEMP,
then mirrored to the external runtime store used by CocoClient launchers.

Examples:
  pwsh .\build_headless_runtime.ps1
  pwsh .\build_headless_runtime.ps1 -RuntimeStore "\\server\packages\cherry-headless"
#>

[CmdletBinding()]
param(
    [string]$RuntimeStore = "C:\coco\headless-runtime",
    [string]$GitRuntimeSource = $(if ($env:CHERRY_GIT_RUNTIME_SOURCE) {
        $env:CHERRY_GIT_RUNTIME_SOURCE
    } else {
        Join-Path $env:ProgramFiles "Git"
    })
)

$ErrorActionPreference = "Stop"
$repoRoot = Split-Path $PSScriptRoot -Parent
$webRoot = Join-Path $repoRoot "web"
$stagingRoot = Join-Path ([System.IO.Path]::GetTempPath()) ("cherry-headless-build-" + [guid]::NewGuid().ToString("N"))

if (-not (Test-Path $webRoot)) {
    throw "Web source directory does not exist: $webRoot"
}

New-Item -ItemType Directory -Path $stagingRoot -Force | Out-Null

try {
    Push-Location $webRoot

    & pnpm run rebuild:electron
    if ($LASTEXITCODE -ne 0) {
        throw "pnpm run rebuild:electron failed with exit code $LASTEXITCODE"
    }

    & pnpm exec dotenv pnpm run build
    if ($LASTEXITCODE -ne 0) {
        throw "pnpm build failed with exit code $LASTEXITCODE"
    }

    # electron-builder accepts a nested config override. Staging outside web\
    # is deliberate: no generated win-unpacked runtime belongs in the repo.
    & pnpm exec electron-builder --dir "--config.directories.output=$stagingRoot"
    if ($LASTEXITCODE -ne 0) {
        throw "electron-builder --dir failed with exit code $LASTEXITCODE"
    }
} finally {
    Pop-Location -ErrorAction SilentlyContinue
}

try {
    $unpacked = Get-ChildItem -Path $stagingRoot -Directory |
        Where-Object { $_.Name -like "*-unpacked" } |
        Select-Object -First 1
    if (-not $unpacked) {
        throw "No *-unpacked output found in $stagingRoot"
    }

    # Claude Code requires Git Bash on Windows before it sends the first model
    # request. Render nodes commonly have no system Git installation, so ship
    # the build machine's Git for Windows runtime with the headless package.
    $gitBash = Join-Path $GitRuntimeSource "bin\bash.exe"
    if (-not (Test-Path $gitBash)) {
        throw "Git Bash runtime not found: $gitBash. Install Git for Windows or set CHERRY_GIT_RUNTIME_SOURCE."
    }
    $gitDestination = Join-Path $unpacked.FullName "resources\git-runtime"
    & robocopy $GitRuntimeSource $gitDestination /MIR /COPY:DAT /DCOPY:DAT /NFL /NDL /NP /R:2 /W:1
    $gitCopyCode = $LASTEXITCODE
    if ($gitCopyCode -ge 8) {
        throw "Failed to bundle Git Bash runtime, robocopy exit code $gitCopyCode"
    }

    & (Join-Path $PSScriptRoot "publish_headless_runtime.ps1") -Source $unpacked.FullName -RuntimeStore $RuntimeStore
    # publish_headless_runtime.ps1 owns robocopy's 0-7 success-code handling
    # and throws on real failures (>= 8). Do not inspect $LASTEXITCODE here:
    # robocopy commonly leaves it at 1 when files were copied successfully.
} finally {
    Remove-Item -LiteralPath $stagingRoot -Recurse -Force -ErrorAction SilentlyContinue
}
