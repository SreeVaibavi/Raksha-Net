# RakshaNet

RakshaNet is a local civilian safety reporting prototype with separate Citizen and Admin sign-in portals backed by one Node.js service. A submitted report is written to local storage before the server acknowledges it. Admin sessions receive new reports over a live Server-Sent Events connection; the stored inbox is reloaded after reconnect.

## Start the project

Requirements: Node.js 20 or newer. The API uses Node built-ins; the map interface loads MapLibre GL from a CDN, so imagery and map rendering require internet access.

1. Copy `.env.example` to `.env`.
2. Set `ADMIN_EMAIL`, a unique `ADMIN_PASSWORD`, a Base32 `ADMIN_TOTP_SECRET`, and a random `AADHAAR_PEPPER`.
3. Keep `NODE_ENV=production` and both local test modes set to `false` outside a private development machine. Configure a real email/SMS provider for account verification.
4. From this folder run:

   ```powershell
   node .\server.mjs
   ```

5. Open **http://localhost:5050**. The server listens on `127.0.0.1` only. Set `PORT` to another free port if needed; avoid 3000, 8800, 8880, 8008 and 8088.

The delivered local copy has a preconfigured admin account. Its sign-in details are provided separately and are deliberately excluded from the ZIP. New citizen accounts must confirm both email and mobile before submitting a report.

## Real sources and location choices

- The map requests date-stamped **NASA EOSDIS GIBS Terra MODIS true-color satellite tiles**. This is real satellite imagery, but it is a periodic composite, not live video or person tracking. MapLibre renders the tiles; it is not the imagery source.
- NASA **FIRMS VIIRS active-fire detections** are fetched from NASA only when `FIRMS_MAP_KEY` is configured. Without a key the interface states that the feed is unavailable and shows no sample detections.
- State and district names come from the Survey of India / Esri India administrative-boundary service. The dropdown is limited to Jammu and Kashmir, Ladakh and the eight Northeast states. The bracketed coordinates are approximate district-centre coordinates derived from the published district geometry, not a user’s exact position and not a helipad/facility directory.
- Optional weather is fetched from Open-Meteo for the selected district-centre coordinates.

Provider references: [NASA GIBS map-library documentation](https://nasa-gibs.github.io/gibs-api-docs/map-library-usage/), [NASA FIRMS Area API](https://firms2.modaps.eosdis.nasa.gov/api/area/), and the [Survey of India / Esri India boundary service](https://livingatlas.esri.in/server/rest/services/LivingAtlas/IND_AdminBoundary/MapServer).

The external providers must be reachable from the browser or local server. A connection or provider outage is shown as an error; the project does not substitute invented imagery, detections, districts or reports.

## Account and report behavior

- Citizen and Admin access are separate portal choices. Admin registration is not public; the configured administrator signs in with email, password and an authenticator code.
- The signup form checks an Aadhaar-format checksum, but this is **not UIDAI authentication**. The full number is not saved; the local prototype keeps a keyed digest and last four digits to prevent duplicate registration. Do not use it as proof of identity.
- A report requires a verified citizen account and selected state, district and category. A successful response means the local server saved the report. If the device is offline, the browser queues the submission locally and reports it as queued until a later delivery succeeds.
- The Admin dashboard groups matching reports by category and district over a 15-minute window. A group count is not verification; reports stay unverified until an administrator reviews them.
- Citizen reports, accounts, verification hashes and audit entries are stored in JSON files under `data/`. These files are private local data and are not included in the ZIP. Do not expose this development server to the public internet.

## Delivery and limits

This is a single-machine local prototype. Admin and citizen browsers using the same running service share the same inbox. It does not provide a hosted multi-device deployment, cloud database, high-availability delivery guarantee, production email/SMS by default, or UIDAI verification. Server-saved reports remain available after an admin reconnects; an outage before the server receives a report cannot be guaranteed away. Immediate danger: call **112**.

`migrations/001_initial.sql` is a starter Supabase/Postgres schema with row-level security policies for a hosted follow-up. The current JSON-backed local service does not run that schema or claim database RLS enforcement.

## Optional service configuration

- **Email:** `RESEND_API_KEY` and `RESEND_FROM`.
- **SMS:** `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN` and `TWILIO_FROM_NUMBER`.
- **NASA FIRMS:** `FIRMS_MAP_KEY`; a free key can be requested from the [NASA FIRMS API page](https://firms.modaps.eosdis.nasa.gov/api/).
- **Local-only signup testing:** set `LOCAL_EMAIL_TEST_MODE=true` and/or `LOCAL_SMS_TEST_MODE=true` only when `NODE_ENV=development`. The app labels any returned verification link or OTP as local test delivery. It does not deliver a real email or SMS in that mode.

## Tests

Run the pure logic tests with `node --test`. They cover checksum validation, signup validation, report grouping and review labels. External service availability and real email/SMS delivery are not mocked as if they were live.
