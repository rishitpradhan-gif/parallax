# Parallax 2: Earth from a satellite

The product opens on a photographic 3D Earth rather than a slogan-led editorial page. Its main journey is spacecraft selection, camera entry, and dated imagery. Current orbital estimates update once per second. Camera transitions ease smoothly and support explicit motion pause and the system reduced-motion setting. Rendering pauses offscreen and in hidden tabs.

## References actually consulted

- Awwwards: https://www.awwwards.com/sites/solar-journey — reviewed the listed planet interaction, navigation, and transition examples. A browser visit to https://solar-journey.webflow.io/ showed its loading/intro state; this was used as a limited visual reference, not a full usability review.
- NASA EPIC: https://epic.gsfc.nasa.gov/about/api — actual metadata and imagery retrieved. The tested latest upstream collection contained 13 photographs, most recent capture November 14, 2026 at 22:17:35 UTC.
- NASA GIBS: https://nasa-gibs.github.io/gibs-api-docs/access-basics/ — public WMS imagery. The Earth basemap is the official BlueMarble_ShadedRelief_Bathymetry layer at 2048×1024, with an 8192×4096 version loaded on entry to the close satellite camera and downsampled for narrower screens/hardware. Regional imagery is MODIS Terra or Aqua true color.
- Three.js: https://threejs.org/docs/ — renderer and camera implementation. This does not imply design consultation with the authors or an award.

The request explicitly superseded the earlier no-animation preference. No third-party design assets or screenshots were copied into the product. The Earth surface and EPIC photograph are downloaded from NASA sources and recorded in image-provenance.json.

## Rendering geometry

The frame module propagates OMM elements with SGP4, converts TEME to Earth-fixed coordinates using GMST, and maps axes into Three.js. Scene +x is Greenwich, +y north, and -z east. The Earth is a sphere of equatorial radius 6378.137 km. The nadir camera is placed at the propagated spacecraft position and looks at Earth’s center, north-up except near the poles. It uses a wide virtual lens, not the spacecraft’s actual instrument optics. Solar direction is approximate; ambient light intentionally makes the night side inspectable. The halo is illustrative.

The displayed orbit is an Earth-fixed ground-relative path over approximately one period. Decorative stars are a generated background, not an astronomical star catalog.

## Source boundaries in the UI

- “Current orbital estimate” means current-time propagation of dated elements, not spacecraft telemetry.
- “Rendered nadir view” uses a static NASA composite, not current cloud cover or a live camera.
- MODIS Terra/Aqua panels identify platform, date, and geographic bounds. For another spacecraft, the panel explicitly labels Terra context imagery. A daily composite has no single capture time.
- EPIC photographs identify DSCOVR and their actual capture timestamp. No LEO spacecraft is credited with those images.
- Invalid/stale positions block telemetry. Photographs remain available as separately dated imagery.
- Other spacecraft can be imported as validated 1–100-record OMM JSON. Import does not authenticate the records.

## Preserved functionality

The original pass engine and scientific tests remain available. The advanced pass planner now lives at /passes.html. Existing results and limitations are retained; the redesigned camera does not upgrade scientific validation.
