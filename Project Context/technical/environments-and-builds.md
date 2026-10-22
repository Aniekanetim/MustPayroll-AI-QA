# MustPayroll environments and builds

**Owner:** developer/technical role with QA setup verification; coordinated by the project owner until assigned. **State:** existing setup consolidated from application and test-project instructions. **Updated:** 22 October 2026. **Applies to:** the current 0.3.0 local demo.

## Independent applications

| Build | Source directory from repository root | Normal browser base URL | Recorded build ID |
| --- | --- | --- | --- |
| Buggy | `MustPayroll/MustPayroll_buggy` | `http://127.0.0.1:4275` | `mustpayroll-0.3.0-faulty-eb7f01eeae99` |
| Fixed | `MustPayroll/MustPayroll_fixed` | `http://127.0.0.1:4276` | `mustpayroll-0.3.0-fixed-ca7ffbea67ec` |

Each application has its own sources and SQLite file. Ordinary runs store data in that application's `data/payroll-usd.sqlite`; a service can instead use its configured `PAYROLL_DB`. Do not assume a default database path when a process was launched with an override. Test and manual review records must remain isolated.

## Start from a fresh workstation

Install Node.js 22.13 or later and npm. From the repository root, start buggy in one terminal:

```powershell
cd MustPayroll/MustPayroll_buggy
npm ci
npm run build
npm start
```

In another terminal from the repository root, start fixed:

```powershell
cd MustPayroll/MustPayroll_fixed
npm ci
npm run build
npm start
```

Open `/pay-runs` at the appropriate browser base URL. Use GET `/api/health` to compare the served `build.id` and source fingerprint with the intended build. Builds generate ignored `build-manifest.json` files. A future changed build has a different identity; record that identity rather than attaching an old result to it.

## Fresh records and controlled failures

Create a new payroll dataset per independent example and use its returned ID only with its matching application. The [system/API reference](system-and-api-reference.md) describes presets and one-shot controls. The browser verification READMEs provide exact preparation commands. Record the dataset ID, selected pay date and target build on the ticket/results.

Pay-date selection simulates the chosen Tuesday instant; it does not wait for the workstation calendar to reach that date. Test-record creation and controlled failures are preparation. A UI functional reproduction still performs its payroll/recovery actions in the browser.

Settings resets disposable data for one selected period, including that period's earnings, pay-run/payment/notification records. Retain failed/passing evidence and references before resetting a review example. This facility is not a production reconciliation process.

## Browser automation and API reproduction

The [buggy browser execution project](../../QA/Quality%20Control/Buggy%20build/Functional%20testing/executed_functional_test_cases/README.md) and [fixed browser execution project](../../QA/Quality%20Control/Fixed%20build/Functional%20testing/executed_functional_test_cases/README.md) each install their own dependencies with `npm ci` and Chromium with `npx playwright install chromium`. Their `npm run verify` commands type-check, build and execute the existing POM checks. Follow those READMEs for exact working directories and application dependency setup.

The automated services use ports 4284 for buggy and 4285 for fixed, with independent `data/payroll-playwright.sqlite` files inside the respective execution projects. These are separate from normal application ports 4275/4276. The existing configuration uses Chromium, one worker and zero runner retries.

API suites and their Postman collections use the normal application base URL. The completed RUN-001/RUN-002 API observations were made by direct HTTP using exported request bodies; they are not claimed as Postman executions. A collection import is not an observed test pass.

## Baselines and limits

The context's pre-migration requirements baseline is Git revision `fb96cef4e1f1930a3557aeaf7548a70f670c0372`. New tickets record their own applicable context revision, test-source version and served application build separately. Existing [execution evidence and handoff](../../QA/directive.md#results--handoff-appendix) remain historical observations; this document migration did not rerun them.

These environments provide no real bank transfer, real inbox receipt, production capacity measurement, authorization model or crash/concurrent-worker guarantee. The [context index](../README.md#known-context-gaps) identifies the additional criteria/contracts needed for work beyond the established scope.
