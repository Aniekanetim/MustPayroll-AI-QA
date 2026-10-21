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

## Prepare a manual browser reproduction

The application must already be running at port 4275. This setup creates disposable records and, for failure cases, arms a one-shot local failure. It does not execute payroll. Subsequent test actions take place in the browser.

| Case | testDataPreset | failureType (omit the failure request if none) |
| --- | --- | --- |
| TC01 | employeesOnly | none; record and review earnings in the browser |
| TC02 | payPeriodBoundaryEarnings | none |
| TC05 | oneApprovedEarning | paymentRecording |
| TC06, TC07 | oneApprovedEarning | notificationDelivery |
| TC08 | oneApprovedEarning | none |

For **TC07**, run this in PowerShell, then open the printed normal web address:

```powershell
$baseUrl = 'http://127.0.0.1:4275'
$records = Invoke-RestMethod -Method Post -Uri "$baseUrl/api/payroll-datasets" -ContentType 'application/json' -Body '{"testDataPreset":"oneApprovedEarning"}'
$datasetId = $records.payrollDatasetId
Invoke-RestMethod -Method Post -Uri "$baseUrl/api/payroll-datasets/$datasetId/test-controls/next-failure" -ContentType 'application/json' -Body '{"failureType":"notificationDelivery"}' | Out-Null
Write-Output "$baseUrl/pay-runs?payrollDatasetId=$datasetId"
```

Choose **Pay on Tuesday 09:00 UTC**, confirm, then **Retry pay run** and confirm. The precondition is one Paid payment with failed delivery; the faulty behavior is the second payment. To prepare a different case, use the preset/failure in the table and follow that case's browser steps. Do not arm failure after a notification has already been sent.
