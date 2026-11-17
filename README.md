# Parallax

## First-person spacecraft view — version 2.1

Satellite view now fixes the observer at the spacecraft with a 62° horizon-facing camera, head-look controls, down/space presets, and fullscreen. It follows an Earth-relative travel frame, removes artificial night lighting, and approximates atmospheric Rayleigh scattering. Optional dated Terra cloud imagery and an explicitly time-shifted daylight preview are available. Screenshots identify the view as a simulation. See [camera and rendering details](docs/astronaut-view.md).

## Earth explorer

The main site now opens on a photographic 3D Earth. Choose one of nine spacecraft or import other real OMM records, enter its Earth-facing view, and explore dated NASA imagery. Current orbital estimates update once per second. Time can be paused, scrubbed, or set explicitly in UTC. Orbit view supports dragging and zooming; camera transitions and gradients follow the new motion-enabled design. Reduced-motion and explicit motion pause are supported.

The Earth surface is an official NASA Blue Marble composite. Solar illumination and scattering are approximate. The first-person camera uses calculated position, follows the horizon by default, and supports gaze controls. It is not a live onboard camera or calibrated sensor simulation. MODIS Terra/Aqua regional composites and EPIC/DSCOVR photographs have source and date labels. NASA image endpoints are accessed directly for pixels; the EPIC metadata service is cached.

Design and image provenance: [redesign notes](docs/redesign.md), [image sources](docs/image-provenance.json). The original planner is at `/passes.html`.


A real-data Earth explorer and satellite access planner. Choose a location, spacecraft, and UTC time to calculate the next 24 hours of geometric passes.

- Nine named spacecraft from CelesTrak: ISS, Terra, Aqua, Landsat 8/9, Sentinel-1A and Sentinel-2A/2B/2C.
- SGP4 propagation with satellite.js 6.0.2; 10-second sampling and local peak refinement.
- Static selected ground track in the advanced planner, range, azimuth, elevation, and clipped-window flags.
- CSV ledger and full JSON export containing settings and original orbital records.
- Cached live-data endpoint, dated real-data fallback, and bounded OMM JSON import.
- Seven-day epoch exclusion. No account or tracking libraries required.

Live: https://rp-parallax.vercel.app

## Local

Node 22+: `npm ci`, `npm run build`, `npm start`. Open http://127.0.0.1:4468. The local server and Vercel deployment both serve the fixed orbital and NASA imagery API endpoints, with the dated saved dataset available as fallback. The live endpoint fetches two fixed CelesTrak URLs, caches successful responses for two hours at the CDN, and reports upstream failures. No arbitrary URL proxy is exposed.

`npm test` runs 22 engine, camera, and imagery-input tests. `npm run evaluate` reproduces the saved four-location sampling study. `node scripts/experience-browser-test.mjs` checks the 3D experience; `node scripts/browser-test.mjs` checks the advanced planner. These require Playwright and an installed Chrome browser; run the local server first. Browser tooling is optional and is available in the parent development workspace.

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

## iPhone application

A bundled Capacitor iOS target is prepared in `ios/`. See [IOS.md](IOS.md) for Xcode setup, native features, privacy and the uncompleted native validation steps. Run `npm run ios:sync` and `npm run ios:open` on a Mac with Xcode 26+. This source preparation is not a signed or device-tested release.
