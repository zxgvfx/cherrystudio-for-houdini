# Full sync of the cherrystudio package (source repo) into the COCO deployment copy.
#
# Background: CocoClient actually imports
#   D:\PyCharmProjects\COCO\cocoApplication\bin\cherrystudio\
# which is a *copy*, not this repo's source. That copy used to be assembled by
# hand / per-plugin sync scripts (see plugins\ai-pipeline-bridge\sync_to_coco.ps1),
# which over time drifts and ends up missing files (main.py / public/ / backend/ /
# utils/ ...), causing errors like "FileNotFoundError: index.html not found".
#
# This script does an *additive* sync via robocopy: only copies files that are
# missing or newer in the destination. It never deletes extra files that exist
# only in the destination (e.g. a compiled core\secure_config.*.pyd override that
# is intentionally NOT present in source).
#
# Excluded from sync (dev-only artifacts not needed on the COCO side):
#   - __pycache__ / *.pyc / *.pyo
#   - agent-runtime\node_modules, services\node_modules (Node deps; run npm install
#     on the destination side separately if needed)
#   - main_old_backup.py / main_temp.txt (dev scratch files)
#
# If you really want a mirror (delete extra files in destination too), add /PURGE
# to $robocopyArgs below manually, but run with -WhatIf first to make sure you are
# not about to delete something intentionally placed on the destination side.
#
# Also optionally syncs the packaged headless Electron app
# (web\dist\win-unpacked, produced by `pnpm run build:unpack` in web\) to the
# sibling `web\` folder next to `bin\cherrystudio`. The Python-managed
# HeadlessElectronManager (api\headless_electron_manager.py) looks for this
# self-contained build first; without it you'll see
# "DataApiError: Electron executable not found" in the UI because there is no
# way to run the raw dev web\node_modules tree in a deployed environment.
#
# Usage:
#   pwsh D:\python\cherrystudio-for-houdini\cherrystudio\sync_to_coco.ps1
#   pwsh D:\python\cherrystudio-for-houdini\cherrystudio\sync_to_coco.ps1 -WhatIf        # preview only, no copy
#   pwsh D:\python\cherrystudio-for-houdini\cherrystudio\sync_to_coco.ps1 -IncludeWeb    # also sync web\dist\win-unpacked (~1.2GB, run `pnpm run build:unpack` in web\ first)

param(
    [switch]$WhatIf,
    [switch]$IncludeWeb
)

$ErrorActionPreference = "Stop"

$src = "D:\python\cherrystudio-for-houdini\cherrystudio"
$dst = "D:\Development\coco\cocoApplication\bin\cherrystudio"
$webRoot = "D:\python\cherrystudio-for-houdini\web"
$webDstRoot = "D:\Development\coco\cocoApplication\bin\web"

if (-not (Test-Path $src)) {
    Write-Host "Source dir does not exist: $src" -ForegroundColor Red
    exit 1
}

if (-not (Test-Path $dst)) {
    Write-Host "Destination dir does not exist, creating: $dst" -ForegroundColor Yellow
    New-Item -ItemType Directory -Path $dst -Force | Out-Null
}

$xd = @(
    "__pycache__"
    (Join-Path $src "agent-runtime\node_modules")
    (Join-Path $src "services\node_modules")
)
$xf = @("*.pyc", "*.pyo", "main_old_backup.py", "main_temp.txt")

$robocopyArgs = @(
    $src, $dst,
    "/E",           # recurse, include empty dirs
    "/XD"
) + $xd + @("/XF") + $xf + @(
    "/NFL", "/NDL", "/NP", "/R:2", "/W:1"
)

if ($WhatIf) {
    $robocopyArgs += "/L"
    Write-Host "Preview mode (no files will be changed)" -ForegroundColor Cyan
}

Write-Host "Syncing $src -> $dst ..." -ForegroundColor Cyan
& robocopy @robocopyArgs
# robocopy exit codes 0-7 mean success; >=8 means failure
$code = $LASTEXITCODE
if ($code -ge 8) {
    Write-Host "robocopy failed, exit code $code" -ForegroundColor Red
    exit $code
}

Write-Host ""
Write-Host "[OK] Sync complete" -ForegroundColor Green
Write-Host "Key file check:" -ForegroundColor Yellow
foreach ($check in @("main.py", "public\index.html", "backend\server.py", "core\window_manager.py")) {
    $p = Join-Path $dst $check
    $ok = Test-Path $p
    if ($ok) {
        Write-Host ("  [OK]      {0}" -f $check) -ForegroundColor Green
    } else {
        Write-Host ("  [MISSING] {0}" -f $check) -ForegroundColor Red
    }
}
if ($IncludeWeb) {
    # Sync every "dist" / "dist_*" folder present (headless_electron_manager.py's
    # _find_packaged_app() looks at all of them). A plain "dist_*" alternate is
    # normally only needed when a stale "dist\" from a previous build got stuck
    # locked (AV/indexer) and a rebuild had to target a fresh output dir instead.
    $distDirs = Get-ChildItem -Path $webRoot -Directory -ErrorAction SilentlyContinue |
        Where-Object { $_.Name -eq "dist" -or $_.Name -like "dist_*" }

    if (-not $distDirs) {
        Write-Host ""
        Write-Host "[SKIP] No web\dist* folder found." -ForegroundColor Yellow
        Write-Host "       Run 'pnpm run build:unpack' in web\ first, then re-run with -IncludeWeb." -ForegroundColor Yellow
    } else {
        foreach ($distDir in $distDirs) {
            $webSrc = $distDir.FullName
            $webDst = Join-Path $webDstRoot $distDir.Name
            if (-not (Test-Path $webDst)) {
                New-Item -ItemType Directory -Path $webDst -Force | Out-Null
            }
            Write-Host ""
            Write-Host "Syncing packaged Electron app $webSrc -> $webDst ..." -ForegroundColor Cyan
            Write-Host "(This is ~1.2GB on first sync; robocopy only re-copies changed files afterwards.)" -ForegroundColor Cyan
            $webRobocopyArgs = @(
                $webSrc, $webDst,
                "/E",
                "/NFL", "/NDL", "/NP", "/R:2", "/W:1"
            )
            if ($WhatIf) {
                $webRobocopyArgs += "/L"
            }
            & robocopy @webRobocopyArgs
            $webCode = $LASTEXITCODE
            if ($webCode -ge 8) {
                Write-Host "robocopy ($($distDir.Name)) failed, exit code $webCode" -ForegroundColor Red
                exit $webCode
            }
            Write-Host "[OK] web\$($distDir.Name) sync complete" -ForegroundColor Green
        }
    }
}

Write-Host ""
Write-Host "Now:" -ForegroundColor Yellow
Write-Host "  1. Fully quit CocoClient (check Task Manager, no leftover process)"
Write-Host "  2. Restart CocoClient"
