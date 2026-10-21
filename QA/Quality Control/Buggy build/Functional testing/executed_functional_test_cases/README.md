# Buggy build: browser regression

Requires Node.js 22.13 or later and npm. The test project is self-contained; run these commands in this directory:

```powershell
npm ci
npx playwright install chromium
```

Install application dependencies once in `../../../../../MustPayroll/MustPayroll_buggy` with `npm ci`, then return to this test directory:

```powershell
npm run verify
```

`verify` type-checks the TypeScript page objects, rebuilds this application's sources, starts its own isolated local service and executes six Chromium UI cases once. API setup creates fresh records and arms one-shot failures. Payroll and recovery actions use the browser. Saved-record reads corroborate what the screen shows; these are not additional API test cases.

The buggy build should fail **TC07 only** on expected $1,500 versus actual $3,000. A successful verification command confirms that known failure signature; the business test remains Failed. The fixed build must pass all six. `npm test` runs Playwright directly and exits nonzero for the buggy failure. No skipped cases or retries are accepted.

Local diagnostic JSON is ignored by Git. Publish concise observed results in [functional-testing-results.md](../functional-testing-results.md); never inherit a previous run's status. TC03 and TC04 have separate Postman instructions under API testing.
