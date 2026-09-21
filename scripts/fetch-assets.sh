#!/usr/bin/env bash
#
# Pull the media that still lives on Emergent's CDN into this repository.
#
#   ./scripts/fetch-assets.sh
#
# Run this BEFORE the Emergent project is deleted. Once the job is torn down
# these URLs return 404 and the files are gone — nothing in this repository can
# recover them.
#
# Afterwards, set REACT_APP_ASSET_BASE_URL=/assets (see frontend/.env.example)
# and the site stops depending on Emergent entirely.

set -euo pipefail

BASE="https://customer-assets.emergentagent.com/job_guided-sessions-2/artifacts"
DEST="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/frontend/public/assets"

# Local filenames deliberately match what config/site.js expects, so nothing in
# the application code has to change.
FILES=(
  "z6q4f8xp_00BBF565-6315-4EAC-864A-B5832736105D.jpeg"
  "iqmzyaot_0d9fb4c0-41c8-4c7b-bc02-488dd6b229ca.JPG"
  "1hbxuxty_%D0%94%D0%BD%D0%B5%D0%B2%D0%BD%D0%B8%D0%BA%20%D0%92%D1%80%D0%B5%D0%BC%D0%B5%20%D0%B7%D0%B0%20%D1%81%D0%B5%D0%B1%D0%B5%20%D1%81%D0%B8-1.pdf"
)

mkdir -p "$DEST"

failed=0
for encoded in "${FILES[@]}"; do
  # The stored name keeps the percent-encoding so the URL built by
  # config/site.js resolves to this file unchanged.
  out="$DEST/$encoded"
  printf 'Fetching %s ... ' "${encoded:0:40}"

  if curl -fsSL --retry 3 --retry-delay 2 -o "$out" "$BASE/$encoded"; then
    printf 'ok (%s bytes)\n' "$(wc -c < "$out" | tr -d ' ')"
  else
    printf 'FAILED\n'
    rm -f "$out"
    failed=1
  fi
done

if [ "$failed" -ne 0 ]; then
  cat >&2 <<'MSG'

One or more assets could not be downloaded. If the Emergent project has already
been deleted these files are unrecoverable from here — you will need the
originals (the portraits and the "Дневник: Време за себе си" workbook) and can
drop them into frontend/public/assets/ under the same filenames.
MSG
  exit 1
fi

cat <<'MSG'

Done. All three assets are now in frontend/public/assets/.

Next:
  1. Set REACT_APP_ASSET_BASE_URL=/assets in frontend/.env (and in the Vercel
     project settings for deploys).
  2. Rebuild: make build
  3. Commit the files — they are the brand assets and belong in the repository.

The site no longer depends on Emergent for anything after this.
MSG
