# MustPayroll: AI-led QA investigation

[intent.md](QA/Quality%20assurance/intent.md) · [directive.md](QA/directive.md) · [Defect and root cause](QA/Quality%20Control/bug_report/duplicate-payment-after-notification-failure.md) · [Release-readiness checklist](QA/Quality%20assurance/release_readiness.md)

**Second attempt in progress. A new Loom recording has not been provided.** The original submission is preserved at [MustPayroll](https://github.com/Aniekanetim/MustPayroll).

## What this investigation tests

A payroll operator pays approved weekly earnings. Payment succeeds, but the employee notification fails. Retrying payroll must recover outstanding work without paying the employee again.

Two independent local builds make that rule verifiable. The **buggy build** deliberately mistakes notification success for payment completion. The **fixed build** checks the saved employee-period payment. Their screens, earnings and expected results are the same. Both use synthetic USD amounts, a local payment ledger and simulated notification delivery; no real funds or messages are sent.

This attempt uses AI throughout the QA cycle: requirements review, risk selection, real-browser exploration, API/record inspection, causal investigation, regression execution and handoff. [The investigation record](QA/investigation.md) distinguishes AI actions, observed evidence and candidate review.

## Verified result

**Buggy: 7 passed / 1 failed. Fixed: 8 passed / 0 failed.** These are the same eight cases: six Chromium browser cases and two separately executed HTTP cases. Only TC07 fails in buggy: payroll retry records $3,000 instead of preserving the original $1,500 payment. The same assertion passes in fixed. The Postman collections provide reviewer reproduction; no Postman execution is claimed.

The [defect report](QA/Quality%20Control/bug_report/duplicate-payment-after-notification-failure.md) now includes the confirmed root cause, proposed fix, evidence and release blockers. This local result does not complete the remaining video and candidate-review steps.

## Start the applications

Requires Node.js **22.13 or later**, npm and a terminal. In separate terminals from the repository root:

```powershell
cd MustPayroll/MustPayroll_buggy
npm ci
npm run build
npm start
```

```powershell
cd MustPayroll/MustPayroll_fixed
npm ci
npm run build
npm start
```

Open buggy at **http://127.0.0.1:4275/pay-runs** and fixed at **http://127.0.0.1:4276/pay-runs**. Each has its own sources and SQLite file. The selected Tuesday is simulated at 09:00 UTC, so tests do not depend on today's date. Reset only disposable test records in Settings.

## Review the evidence

Start with the business rule, follow the reproduction, then compare the same case between builds:

| Review item | Location |
| --- | --- |
| Rules, flow and assumptions | [Business rules](QA/Quality%20assurance/business_rules.md) |
| Why this failure was selected | [intent.md](QA/Quality%20assurance/intent.md) |
| AI actions and causal checks | [Investigation](QA/investigation.md) |
| Buggy browser cases and results | [Suite](QA/Quality%20Control/Buggy%20build/Functional%20testing/functional-test-suite.md) · [Results](QA/Quality%20Control/Buggy%20build/Functional%20testing/functional-testing-results.md) |
| Fixed browser cases and results | [Suite](QA/Quality%20Control/Fixed%20build/Functional%20testing/functional-test-suite.md) · [Results](QA/Quality%20Control/Fixed%20build/Functional%20testing/functional-testing-results.md) |
| API cases and Postman reproduction | [Buggy API](QA/Quality%20Control/Buggy%20build/API%20testing/api-test-suite.md) · [Fixed API](QA/Quality%20Control/Fixed%20build/API%20testing/api-test-suite.md) |
| Automated failure and retest | [Buggy command](QA/Quality%20Control/Buggy%20build/Functional%20testing/executed_functional_test_cases/README.md) · [Fixed command](QA/Quality%20Control/Fixed%20build/Functional%20testing/executed_functional_test_cases/README.md) |
| Handoff, gaps and decision | [directive.md](QA/directive.md) |

The application and page objects are adapted from the previous MustPayroll snapshot `d51939b`. Prior results, recordings and professional case claims are not reused as evidence of this attempt. The payroll application originated from an MIT-licensed [banking demo](https://github.com/sahajamit/webmcp-acmebank-demo); this repository documents the QA work on the adapted local fixture.
