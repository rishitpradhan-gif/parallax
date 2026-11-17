# Parallax 2 deployment verification

Production: https://rp-parallax.vercel.app

Vercel deployment: dpl_D61upy9uB26vyEjCBMte6NTup1s9
Verified source state: 53e061b (runtime redesign d4f12d8 plus the committed image host/MIME configuration).

Anonymous requests returned the exact local hashes for index.html, app.js, experience.css, the 2048/8192 NASA Blue Marble textures, the saved EPIC photograph, passes.html, and passes.js. The returned CSP permits only the two named NASA image hosts in addition to local/data/blob images. The EPIC endpoint returned HTTP 200 with 13 photographs, latest capture 2026-11-14T22:17:35Z.

All eight experience browser checks and all four imagery checks passed on the public deployment. The tests exercised real WebGL with software rendering, live/pause time, both camera modes, PNG export, stale position rejection, OMM import, three viewport widths, reduced motion, actual NASA image loading, and simulated upstream image failure. See the two browser result JSON files for timestamps and limits. Fifteen numerical/input tests passed locally. The original advanced planner also passed its browser regression suite at /passes.html.

The virtual camera is an explanatory rendering, not actual sensor telemetry. The image capture dates remain separate from the current-time orbital estimate. No user study, independent accessibility audit, or physical-device validation is claimed.

Vercel publication used the existing CLI workflow; future GitHub pushes still require deployment. No account permissions were changed. Documentation-only verification updates follow the runtime deployment.

## Version 2.1 — first-person astronaut viewpoint

Deployment: dpl_6VRnx4UykbeRByFoXQBoGZY68iyU
Runtime source: 9bc4f40

The public release passed seven first-person browser checks, including the fixed camera and 62° horizon geometry in an isolated WebGL harness, normal production head-look controls, explicit future-time daylight selection, labelled PNG export, actual dated Terra imagery on the Earth, and phone layout. The harness runs in a separate blank test document; no scripts are injected into the CSP-protected production page.

The public index, bundle, stylesheet, and both NASA natural-surface textures matched local bytes. `/api/surface?date=2026-11-15` returned HTTP 200 with image/jpeg, the requested imagery-date header, and 1,949,597 actual NASA image bytes. The renderer uses a dated composite, not live cloud telemetry. Twenty-two core, geometry, and input tests passed locally. See astronaut-view.md and astronaut-browser-results.json for the active model and limits.
