# threadbindstudios.com

The ThreadBind Studios website: a static Astro site in the "stitched sampler" style.
Weave's page uses the game's Cozy theme colours.

## Everyday commands

| Do this | Command |
| --- | --- |
| Start the local preview (runs in the background) | `npx astro dev --background`, then open http://localhost:4321 |
| Stop it | `npx astro dev stop` |
| Build the site for upload | `npm run build` (output goes to `dist/`) |
| Check the build (titles, descriptions, Google tag, alt text…) | `node tools/audit-dist.mjs` |

## Publishing

Every push to `main` runs `.github/workflows/deploy.yml`: it builds the site, checks every page with `tools/audit-dist.mjs`, and publishes `dist/` to the `gh-pages` branch. GitHub Pages serves that branch at https://threadbindstudios.com (the domain is set by `public/CNAME`). Pull requests run the same build and checks without publishing.

## Things you'll want to change

All in **`src/site.config.ts`**:

- `email`: the contact address shown across the site.
- `forms`: the waitlist (Google Form), contact and feedback (Jira) links.
- `socials`: paste a profile URL into `href` and that link appears in the footer. An empty `href` shows "soon".

Other places:

- Page words live in `src/pages/*.astro` (one file per page).
- Weave facts (pouches, example run, screenshots and their alt text) live in `src/data/weave.ts`.
- New page? Add it to `src/pages/` and to the list in `src/pages/sitemap.xml.ts`.
- Cookie consent: `src/components/CookieBanner.astro` (banner) and the Consent Mode line in the Google tag in `src/layouts/BaseLayout.astro`. Analytics cookies are only set after a visitor clicks Accept; "Cookie settings" in the footer reopens the choice.
- Privacy policy: `src/pages/privacy.astro`. Update it before Weave launches to describe what the game collects.

## Regenerating assets

- Favicons, app icons and press logos (including the stitched logo): `node tools/brand-assets.mjs`
- Open Graph share images (needs the local preview running): `node tools/og.mjs`
- The demo loom's word list (after changing `src/data/loom.mjs`): `node tools/solve-loom.mjs ../Weave/data/words.gd > src/data/loom-words.json`
- Screens: copy new `@2x` renders from `Weave/data/themes/cozy/png/screens/` into `src/assets/screens/` and `public/press/`.

## Design notes

`PRODUCT.md` holds the product facts, `DESIGN.md` the visual system, and `.impeccable/surfaces/` the direction brief.
The design skills used to build the site (Impeccable, Taste, Emil Kowalski's skills) live in `.claude/skills/` locally and are not committed. Reinstall them from https://github.com/pbakaus/impeccable, https://github.com/leonxlnx/taste-skill and https://github.com/emilkowalski/skills.
