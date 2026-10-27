# Playwright TypeScript framework

## Setup

```powershell
npm install
npx playwright install
```

## Run tests

```powershell
npm test
npm run test:headed
npm run test:ui
npm run report
npm run typecheck
```

The example test checks the Playwright website. Replace it with tests for your application. To set your application URL for a PowerShell session, run `$env:BASE_URL = "http://localhost:3000"` and update the example assertion to match your application. Tests run in Chromium, Firefox, and WebKit by default; use `npx playwright test --project=chromium` to run one browser.
