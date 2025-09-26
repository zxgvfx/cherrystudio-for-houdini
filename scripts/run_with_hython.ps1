# PowerShell script to run the project using Houdini's hython
# Using Houdini's hython to run the project

param(
    [string]$HoudiniVersion = "20.5.613",
    [string]$ProjectPath = "houdini_plugin/main.py",
    [string]$Url = $null,
    [string[]]$ExtraArgs = @()
)

$HoudiniPath = "C:\Program Files\Side Effects Software\Houdini $HoudiniVersion"
$HythonPath = "$HoudiniPath\bin\hython.exe"

Write-Host "Running project with Houdini $HoudiniVersion hython..." -ForegroundColor Green
Write-Host "Houdini path: $HoudiniPath" -ForegroundColor Yellow
Write-Host "hython path: $HythonPath" -ForegroundColor Yellow

# Check if hython exists
if (-not (Test-Path $HythonPath)) {
    Write-Host "Error: Cannot find hython.exe at path: $HythonPath" -ForegroundColor Red
    Write-Host "Please check Houdini installation path and version number." -ForegroundColor Yellow
    exit 1
}

# Check if project file exists
if (-not (Test-Path $ProjectPath)) {
    Write-Host "Error: Cannot find project file: $ProjectPath" -ForegroundColor Red
    exit 1
}

# Set environment variables
$env:HOUDINI_PATH = $HoudiniPath
$env:PYTHONPATH = "$HoudiniPath\houdini\python3.11libs;$env:PYTHONPATH"

Write-Host "Environment variables set:" -ForegroundColor Cyan
Write-Host "  HOUDINI_PATH = $env:HOUDINI_PATH" -ForegroundColor Cyan
Write-Host "  PYTHONPATH = $env:PYTHONPATH" -ForegroundColor Cyan

# Build command arguments
$CommandArgs = @($ProjectPath)
if ($Url) {
    $CommandArgs += $Url
}
$CommandArgs += $ExtraArgs

Write-Host "Running command: $HythonPath $($CommandArgs -join ' ')" -ForegroundColor Green
Write-Host "Press Ctrl+C to stop the program..." -ForegroundColor Yellow

# Run the project
try {
    & $HythonPath $CommandArgs
} catch {
    Write-Host "Runtime error: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}