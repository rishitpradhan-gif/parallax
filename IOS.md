# Parallax for iPhone

A Capacitor 8 iOS application with the Earth renderer bundled into WKWebView. It does not load the website as its application shell. The Xcode project is `ios/App/App.xcodeproj`.

## Run it

1. On a Mac, install **Xcode 26 or later**, open it once, and install an iOS simulator. Install Node.js 22 or later.
2. In this folder run `npm ci`, then `npm run ios:sync`.
3. Run `npm run ios:open`. In Xcode select **App**, choose an iPhone simulator, and press Run. Deployment target is iOS 16.4.
4. For your own iPhone, connect the phone, select your Apple development team under Signing & Capabilities, choose a unique bundle identifier if necessary, and enable Developer Mode on the phone. No signing credentials are included.

Swift Package Manager resolves Capacitor and the plugins. CocoaPods is not used. Do not add a development server URL to the production configuration.

## Included

- Original Earth-horizon app icon and dark launch screen.
- Portrait and landscape layouts with safe-area spacing and an immersive view.
- Real CelesTrak orbital elements, SGP4 propagation and a first-person spacecraft camera.
- Bundled NASA surface imagery and a dated orbital recording for offline exploration.
- Up to 30 saved views, stored on the device with the original orbital elements, paused time and gaze.
- Native PNG/CSV/JSON share sheets, light haptics, connection status and app lifecycle handling.
- Fixed, read-only HTTPS service endpoints; external links open in the system browser view.
- Privacy manifest and a bundled privacy page. No account, tracking SDK or location permission.

Current positions and new NASA imagery require internet access. Orbital elements older than seven days are excluded for that requested time. The bundled recording explicitly opens at historical time; it is not a current orbital feed. Earth rendering is a simulation, not a live onboard video or a sensor-accurate instrument model. Surface photographs and composites retain their source dates.

## Validation and remaining work

`npm test` checks the orbital engine, geometry, native adapter mocks and saved-view persistence. `node scripts/ios-browser-test.mjs` checks the bundled mobile layout, reload and deletion in desktop Chrome using software WebGL with external network requests blocked. The initial browser run opened the bundled orbit and submitted the save dialog successfully, then timed out reopening the renderer after reload; subsequent Chrome launches timed out. Saved-view restoration and subsequent layout assertions are therefore unverified. Failure details are retained in `docs/ios-validation.json`. This browser script requires Playwright and Chrome in the development environment; they are not runtime dependencies of the app.

The initial preparation environment had Apple Command Line Tools but **no full Xcode**. Project/plist syntax, Swift syntax and web bundles were checked. The native target has **not been compiled, run in an iOS simulator, tested on a physical device, signed or submitted**. Native plugin tests use mocks; they do not prove WKWebView GPU performance or Apple share-sheet behavior.

Before distribution: build on Xcode 26+, test portrait/landscape and safe areas on a current and older iPhone; verify foreground/background recovery, offline launch, saving, NASA image loading, PNG and planner exports; inspect VoiceOver, Dynamic Type/zoom, Reduce Motion, memory and thermal behavior. Confirm the app privacy declarations against the final distribution build and service logging configuration. Archive with your Apple team, then distribute through TestFlight for device testing. An Apple Developer membership is needed for App Store/TestFlight distribution. No IPA or App Store availability is claimed by this source release.

## Rebuild the source download

Run `npm run ios:sync`, then `npm run ios:package`. The archive includes the Xcode project, source and bundled assets, but no dependencies, signing identities, local environment files or website deployment credentials. Run `npm ci` after extraction to restore the pinned native plugin packages before opening Xcode.

Requirements and API references: [Capacitor iOS](https://capacitorjs.com/docs/ios), [Swift Package Manager](https://capacitorjs.com/docs/ios/spm), [Share](https://capacitorjs.com/docs/apis/share), [Filesystem privacy requirements](https://capacitorjs.com/docs/apis/filesystem), [Preferences privacy requirements](https://capacitorjs.com/docs/apis/preferences).
