# Self-hosted assets

These 3 files replace the ones that were served from `customer-assets.emergentagent.com`
(which dies when the Emergent project is torn down). Drop the actual files in here with
these exact names — the code already points at them.

| Save as (in this folder)          | What it is                          | Original Emergent URL |
|-----------------------------------|-------------------------------------|-----------------------|
| `milena.jpg`                      | Milena portrait (hero + OG/social)  | `https://customer-assets.emergentagent.com/job_guided-sessions-2/artifacts/z6q4f8xp_00BBF565-6315-4EAC-864A-B5832736105D.jpeg` |
| `milena-about.jpg`                | "За Милена" about-section photo     | `https://customer-assets.emergentagent.com/job_guided-sessions-2/artifacts/iqmzyaot_0d9fb4c0-41c8-4c7b-bc02-488dd6b229ca.JPG` |
| `dnevnik-vreme-za-sebe-si.pdf`    | "Любов без болка" workbook PDF       | `https://customer-assets.emergentagent.com/job_guided-sessions-2/artifacts/1hbxuxty_Дневник Време за себе си-1.pdf` |

The portrait is used as a 1200×630 OG image, so keep it at least that size.

Do this before the Vercel build (a missing file 404s but won't break the build).
