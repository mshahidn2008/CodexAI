# Repository Guidelines

## Project Structure & Module Organization

This repository contains a Playwright end-to-end test suite written in TypeScript. Browser tests live in `tests/` and use the `*.spec.ts` naming pattern. `playwright.config.ts` defines the test directory, browser projects, retries, and reporting. `.github/workflows/` contains the CI workflow. `playwright-report/` and `test-results/` are generated artifacts; do not treat them as source files.

## Build, Test, and Development Commands

- `npm install` installs dependencies; use `npm ci` for a clean CI-style install.
- `npx playwright install` installs browsers required by the configured projects.
- `npm run typecheck` checks the TypeScript project without emitting files.
- `npm test` runs the suite in Chromium, Firefox, and WebKit.
- `npx playwright test tests/login.spec.ts --project=chromium` runs one spec in one browser.
- `npm run test:headed` and `npm run test:ui` run the suite in headed and interactive modes.
- `npm run report` opens the latest HTML report.

## Coding Style & Naming Conventions

Use TypeScript with strict checking, two-space indentation, single quotes, and semicolons, matching the existing files. Name specs for the user flow or feature, for example `samsung-note-8-form.spec.ts`. Use Playwright locators and web-first assertions (`expect(locator).toBeVisible()`); scope selectors when a page contains duplicate fields.

## Testing Guidelines

Add each independent user journey as a separate `*.spec.ts` file under `tests/`. Tests should describe observable behavior and validate both key interactions and outcomes. Run `npm run typecheck` and the relevant Playwright spec before submitting. Full CI runs typechecking and all three browser projects; tests need access to any external sites they visit.

## Commit & Pull Request Guidelines

Recent commits use short imperative summaries such as `Add Playwright CI workflow and tests`. Follow that pattern. A pull request should explain the covered flow, list commands run, and include the Playwright report or screenshots when they help explain a failure or visual change. Keep each change focused on the tests or configuration it needs.

## Security & Configuration

Do not commit passwords, API keys, or other secrets. Supply login values through `LOGIN_USERNAME` and `LOGIN_PASSWORD` environment variables when needed. If a spec needs authentication and either variable is unset or empty, fail the test immediately with an error naming the missing variable; do not fall back to hardcoded or placeholder credentials. Keep generated reports and local browser downloads out of commits.
