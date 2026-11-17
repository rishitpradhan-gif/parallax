# Parallax

A still, real-data satellite access planner. Choose a location, spacecraft, and UTC time to calculate the next 24 hours of geometric passes.

- Nine named spacecraft from CelesTrak: ISS, Terra, Aqua, Landsat 8/9, Sentinel-1A and Sentinel-2A/2B/2C.
- SGP4 propagation with satellite.js 6.0.2; 10-second sampling and local peak refinement.
- Static selected ground track, range, azimuth, elevation, clipped-window flags.
- CSV ledger and full JSON export containing settings and original orbital records.
- Cached live-data endpoint, dated real-data fallback, and bounded OMM JSON import.
- Seven-day epoch exclusion. No animations, tracking libraries, or account required.

Live: https://rp-parallax.vercel.app

## Local

Node 22+: `npm ci`, `npm run build`, `npm start`. Open http://127.0.0.1:4468. The local static server uses the saved dataset; the Vercel deployment also serves `/api/orbits`. The live endpoint fetches two fixed CelesTrak URLs, caches successful responses for two hours at the CDN, and reports upstream failures. No arbitrary URL proxy is exposed.

`npm test` runs nine engine tests. `npm run evaluate` reproduces the saved four-location sampling study. `node scripts/browser-test.mjs` requires Playwright and an installed Chrome browser; run the local server first. Browser tooling is optional and is available in the parent development workspace.

## Evidence and limits

The propagator matches five published Vallado verification vectors for NORAD 00005 within 0.1 m position and 1 mm/s velocity tolerances. These verify implementation against reference vectors, not the accuracy of a current spacecraft prediction.

The initial unrefined ten-second peak estimate understated one Berkeley maximum by about 3.7 degrees. That failure led to bounded local peak refinement. The saved regression cohort now agrees with two-second refined sampling within 0.01 degrees for peaks and ten seconds for boundaries. Four locations produce 145 passes; no unmatched passes in that cohort. See `docs/evaluation.json` for retained sampling findings and hashes. This limited cohort does not establish a global error bound.

Geometric access does not establish human visibility, sensor coverage, satellite tasking, or imagery availability. Clouds, spacecraft illumination/attitude, refraction, terrain, and sensor pointing are excluded. The illustrative cover is explicitly labelled and is not a live spacecraft position. The ground track is a longitude/latitude grid, not a sensor footprint.

Snapshots expire under the seven-day rule. A saved snapshot remains downloadable but cannot produce predictions outside its permitted epoch interval. Refresh or import new real elements. The date/time control and all output use UTC. CSV retains the last completed calculation if controls change; JSON also includes its exact settings. Imported orbital files are user supplied, not independently authenticated.

## Primary sources

- https://celestrak.org/NORAD/documentation/gp-data-formats.php
- https://github.com/shashwatak/satellite-js
- https://github.com/brandon-rhodes/python-sgp4/tree/master/sgp4 — verification fixtures `SGP4-VER.TLE` and `tcppver.out` (Vallado verification dataset).

No claims of physical validation, worldwide novelty, or independent security/accessibility certification. Created by Rishit Pradhan.
