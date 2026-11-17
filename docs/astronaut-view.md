# First-person spacecraft viewpoint

The satellite camera is now a fixed-position first-person observer. It no longer uses the earlier 140° nadir view or flies through intermediate camera positions on entry.

## Camera geometry

- The camera origin is the SGP4 Earth-fixed spacecraft position, scaled by the Earth's equatorial radius.
- The local up direction is geocentric radial. Forward follows Earth-relative velocity, obtained by rotating inertial velocity and subtracting the Earth's rotation contribution. This is a hypothetical observer's travel frame, not measured spacecraft attitude.
- Default gaze is depressed below the local horizontal by `acos(R / r)`. Its center ray is tangent to the rendered Earth sphere. This makes the horizon appear ahead, rather than presenting the whole planet as a globe.
- A 62° vertical field of view replaces the distorted 140° lens. Users can choose 35–85°, drag or use arrow keys to turn their head, and look directly down or toward space. Changing gaze cannot change camera position.
- First-person camera entry is immediate at the actual calculated position. Orbit overview retains smooth camera transitions. Position updates occur at 5 Hz; orbital data freshness and model limitations still apply.

The Earth remains spherical (6378.137 km radius), not a detailed terrain/ellipsoid model. No spacecraft interior, actual window geometry, actual instrument pointing, binocular vision, or human visual adaptation is claimed.

## Rendering

The surface is NASA Earth Observatory's July 2004 Blue Marble Next Generation natural-color composite, downloaded through GIBS at 4096×2048, with a derived 2048×1024 startup version. This replaces the earlier map with shaded bathymetry; underwater relief is not shown as visible terrain.

An optional NASA Terra MODIS daily true-color composite supplies dated observed cloud patterns. It is a texture, not volumetric/current weather. Black composite gaps use the static basemap, explicitly labelled in the interface. This request uses a fixed NASA host/layer with validated dates and a daily cache; failed requests leave the static surface selected.

There is no artificial blue night-side fill. Surface brightness depends on solar incidence with a very small constant numerical floor. A single-scattering Rayleigh approximation integrates view and Sun-path density through an exponential atmosphere, with Earth shadow and ground occlusion. Aerosols, ozone absorption, multiple scattering, terrain shadows, current atmospheric profiles, and instrument/eye response are not modelled. Rendering is an approximation, not radiometrically calibrated imagery.

The Sun disc subtends approximately 0.53° and follows the calculated Sun direction. Decorative stars are hidden in first-person mode rather than suggesting bright naked-eye stars alongside a daylight Earth exposure. Screenshots include a simulation label and source note.

A daylight-preview control searches forward in time for a sunlit ground point and explicitly pauses at that selected future time. It does not introduce light into a nighttime scene. The current-time control returns to the actual clock.

## Checks

Tests verify a fixed camera origin under gaze changes; orthonormal view/up vectors; horizon-ray tangency at multiple orbit radii; down/space ray behavior; Earth-rotation velocity against finite-difference positions; lens bounds; and invalid imagery dates. Browser checks inspect the actual WebGL camera position/direction, shader compilation, gaze controls, lens, screenshots, selected-time daylight preview, and mobile layout.

Primary documentation:

- https://science.nasa.gov/earth/earth-observatory/blue-marble-next-generation/
- https://threejs.org/docs/#api/en/cameras/PerspectiveCamera
- https://nasa-gibs.github.io/gibs-api-docs/access-basics/
