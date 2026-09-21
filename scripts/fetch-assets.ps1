# Pull the media that still lives on Emergent's CDN into this repository.
#
#   .\scripts\fetch-assets.ps1
#
# PowerShell equivalent of fetch-assets.sh, so this does not need Git Bash or
# WSL. Run it BEFORE the Emergent project is deleted: once the job is torn down
# these URLs return 404 and the files are gone. Nothing in this repository can
# recover them.
#
# Afterwards set REACT_APP_ASSET_BASE_URL=/assets in frontend\.env and the site
# no longer depends on Emergent at all.
#
# If PowerShell refuses to run this ("running scripts is disabled"), either:
#   powershell -ExecutionPolicy Bypass -File .\scripts\fetch-assets.ps1
# or unblock it for your user:
#   Set-ExecutionPolicy -Scope CurrentUser RemoteSigned

$ErrorActionPreference = 'Stop'

$Base = 'https://customer-assets.emergentagent.com/job_guided-sessions-2/artifacts'
$Dest = Join-Path (Split-Path -Parent $PSScriptRoot) 'frontend\public\assets'

# Names deliberately match what frontend/src/config/site.js builds, so no
# application code has to change.
$Files = @(
  'z6q4f8xp_00BBF565-6315-4EAC-864A-B5832736105D.jpeg'
  'iqmzyaot_0d9fb4c0-41c8-4c7b-bc02-488dd6b229ca.JPG'
  '1hbxuxty_%D0%94%D0%BD%D0%B5%D0%B2%D0%BD%D0%B8%D0%BA%20%D0%92%D1%80%D0%B5%D0%BC%D0%B5%20%D0%B7%D0%B0%20%D1%81%D0%B5%D0%B1%D0%B5%20%D1%81%D0%B8-1.pdf'
)

New-Item -ItemType Directory -Force -Path $Dest | Out-Null

$failed = @()
foreach ($name in $Files) {
  $shortName = if ($name.Length -gt 40) { $name.Substring(0, 40) } else { $name }
  Write-Host "Fetching $shortName ... " -NoNewline

  $out = Join-Path $Dest $name
  try {
    # -UseBasicParsing keeps this working on older PowerShell without IE engine.
    Invoke-WebRequest -Uri "$Base/$name" -OutFile $out -UseBasicParsing
    $size = (Get-Item $out).Length
    Write-Host "ok ($size bytes)" -ForegroundColor Green
  }
  catch {
    Write-Host 'FAILED' -ForegroundColor Red
    if (Test-Path $out) { Remove-Item $out -Force }
    $failed += $name
  }
}

if ($failed.Count -gt 0) {
  Write-Host ''
  Write-Warning @'
One or more assets could not be downloaded. If the Emergent project has already
been deleted these files are unrecoverable from here - you will need the
originals (the two portraits and the "Дневник: Време за себе си" workbook) and
can drop them into frontend\public\assets\ under the same filenames.
'@
  exit 1
}

Write-Host ''
Write-Host 'Done. All three assets are now in frontend\public\assets\.' -ForegroundColor Green
Write-Host @'

Next:
  1. Set REACT_APP_ASSET_BASE_URL=/assets in frontend\.env
     (and in the Vercel project settings for deploys).
  2. Rebuild:  docker compose build frontend
  3. Commit the files - they are the brand assets and belong in the repository.

The site no longer depends on Emergent for anything after this.
'@
