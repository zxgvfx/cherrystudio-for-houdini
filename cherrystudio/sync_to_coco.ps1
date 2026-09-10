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
# The packaged Electron runtime (`web\dist\win-unpacked`) is NOT copied into
# `bin\web`. Zip it and publish to the J-drive auto-update share instead:
#   J:\vfxtools\piplineTD\models\packages\Cherry-Studio-<ver>-win-unpacked.zip
# `-IncludeWeb` remains for emergency local unpack copies only; prefer zip on J
# and delete both source and COCO `win-unpacked` folders afterwards.
#
# IMPORTANT — the actual UI the user sees is a SEPARATE build artifact from
# the headless Electron app above: `window_manager.py`'s QWebEngineView never
# talks to the headless Electron process for its own HTML/JS — it loads a
# statically-served copy of the *renderer* bundle, resolved by
# `main.py#_resolve_index_path()` in this preference order:
#   1. <project_root>/web/out/renderer/windows/main/index.html   (dev checkout)
#   2. <project_root>/web/out/renderer/index.html                (old layout)
#   3. cherrystudio/public/windows/main/index.html                (deployed copy) ← COCO uses this
#   4. cherrystudio/public/index.html                             (legacy fallback)
# On a COCO deployment there is no sibling `web/out/renderer` at all (only
# `bin/web/dist*`, the electron-builder *main-process* bundle — completely
# different artifact), so it falls through to `cherrystudio/public/`. This
# script's normal `cherrystudio/` → COCO sync copies `public/` VERBATIM from
# whatever is checked into the source repo — it will happily ship a
# months-old renderer build forever unless something refreshes
# `cherrystudio/public/` from a fresh `web/out/renderer/` first. That is
# exactly what `-RefreshPublic` (mirrored into the main sync below) does; a
# renderer-only source change with no `-RefreshPublic` looks, from the
# outside, exactly like "the fix didn't work" even though every backend/DB
# change landed correctly — the browser is just still running old JS.
#
# Usage:
#   pwsh D:\python\cherrystudio-for-houdini\cherrystudio\sync_to_coco.ps1
#   pwsh D:\python\cherrystudio-for-houdini\cherrystudio\sync_to_coco.ps1 -WhatIf          # preview only, no copy
#   pwsh D:\python\cherrystudio-for-houdini\cherrystudio\sync_to_coco.ps1 -RefreshPublic   # refresh cherrystudio\public\ from web\out\renderer\ first (run `pnpm build` in web\ first)
# Unpack zip belongs on J:\vfxtools\piplineTD\models\packages\, not in bin\web.

param(
    [switch]$WhatIf,
    [switch]$IncludeWeb,
    [switch]$RefreshPublic
)

$ErrorActionPreference = "Stop"

$src = "D:\python\cherrystudio-for-houdini\cherrystudio"
$dstList = @(
    "D:\Development\coco\cocoApplication\bin\cherrystudio"
    "D:\PyCharmProjects\COCO\cocoApplication\bin\cherrystudio"
)
$webRoot = "D:\python\cherrystudio-for-houdini\web"
$webDstRoot = "D:\Development\coco\cocoApplication\bin\web"

if (-not (Test-Path $src)) {
    Write-Host "Source dir does not exist: $src" -ForegroundColor Red
    exit 1
}

if ($RefreshPublic) {
    $rendererSrc = Join-Path $webRoot "out\renderer"
    $publicDst = Join-Path $src "public"
    if (-not (Test-Path $rendererSrc)) {
        Write-Host ""
        Write-Host "[SKIP] $rendererSrc not found. Run 'pnpm build' (or 'pnpm run build:unpack') in web\ first." -ForegroundColor Yellow
    } else {
        Write-Host ""
        Write-Host "Refreshing $publicDst from $rendererSrc (mirror: old/obsolete files removed) ..." -ForegroundColor Cyan
        $publicRobocopyArgs = @(
            $rendererSrc, $publicDst,
            "/MIR",         # this is 100% build output -- safe to mirror (delete stale files too)
            "/NFL", "/NDL", "/NP", "/R:2", "/W:1"
        )
        if ($WhatIf) {
            $publicRobocopyArgs += "/L"
        }
        & robocopy @publicRobocopyArgs
        $publicCode = $LASTEXITCODE
        if ($publicCode -ge 8) {
            Write-Host "robocopy (public refresh) failed, exit code $publicCode" -ForegroundColor Red
            exit $publicCode
        }
        Write-Host "[OK] public\ refreshed from web\out\renderer\" -ForegroundColor Green
    }
}

$xd = @(
    "__pycache__"
    (Join-Path $src "agent-runtime\node_modules")
    (Join-Path $src "services\node_modules")
)
$xf = @("*.pyc", "*.pyo", "main_old_backup.py", "main_temp.txt", "publish_hermes_agent.ps1")

foreach ($dst in $dstList) {
    if (-not (Test-Path $dst)) {
        Write-Host "Destination dir does not exist, creating: $dst" -ForegroundColor Yellow
        New-Item -ItemType Directory -Path $dst -Force | Out-Null
    }

    $robocopyArgs = @(
        $src, $dst,
        "/E",
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
    $code = $LASTEXITCODE
    if ($code -ge 8) {
        Write-Host "robocopy failed, exit code $code" -ForegroundColor Red
        exit $code
    }

    Write-Host ""
    Write-Host "[OK] Sync complete: $dst" -ForegroundColor Green
    Write-Host "Key file check:" -ForegroundColor Yellow
    foreach ($check in @("main.py", "public\windows\main\index.html", "backend\server.py", "core\window_manager.py", "dcc_adapter\__init__.py", "panel_host.py")) {
        $p = Join-Path $dst $check
        $ok = Test-Path $p
        if ($ok) {
            Write-Host ("  [OK]      {0}" -f $check) -ForegroundColor Green
        } else {
            Write-Host ("  [MISSING] {0}" -f $check) -ForegroundColor Red
        }
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
