# MustPayroll: AI-led QA investigation

[intent.md](QA/Quality%20assurance/intent.md) · [directive.md](QA/directive.md) · [Defect and root cause](QA/Quality%20Control/bug_report/duplicate-payment-after-notification-failure.md) · [Release-readiness checklist](QA/Quality%20assurance/release_readiness.md)

**Second attempt in progress. A new Loom recording has not been provided.** The original submission is preserved at [MustPayroll](https://github.com/Aniekanetim/MustPayroll).

## What this investigation tests

A payroll operator pays approved weekly earnings. Payment succeeds, but the employee notification fails. Retrying payroll must recover outstanding work without paying the employee again.

Two independent local builds make that rule verifiable. The **buggy build** deliberately mistakes notification success for payment completion. The **fixed build** checks the saved employee-period payment. Their screens, earnings and expected results are the same. Both use synthetic USD amounts, a local payment ledger and simulated notification delivery; no real funds or messages are sent.

This attempt uses AI throughout the QA cycle: requirements review, risk selection, real-browser exploration, API/record inspection, causal investigation, regression execution and handoff. [The investigation record](QA/investigation.md) distinguishes AI actions, observed evidence and candidate review.

## How the AI-led QA workflow operates

The AI agent carries out the QA work; the QA engineer directs it, reviews evidence and approves decisions throughout. The cycle supports API, UI/functional, usability, performance, accessibility and other testing types. The current payroll results cover only the six UI and two HTTP cases identified below.

Start by telling the agent what testing is needed; it asks when that choice is missing. It analyzes requirements and risks, designs the checks, and prepares scripts, data and the environment for review. After approval it executes, investigates findings, confirms an approved correction and completes the handoff. Progress and changed risks are tracked throughout. These iterative testing activities sit beneath our five human review gates. Before every approval request, the agent briefs the human on the proposal, rationale, evidence, alternatives, gaps and exact next authorization. A packet link alone is insufficient. Human decisions are recorded separately from test outcomes.

[Workflow and current review record](QA/Quality%20assurance/qa-workflow.md) · [Shared project context](unified_project_context.md)

The starting selection is payroll regression across UI and API. The [standards review](QA/Quality%20assurance/qa-workflow-review.md) informed the revised process. **Aniekan approved [RUN-002 packet v2](QA/Quality%20assurance/qa-workflow.md#run-002-scope-and-test-design-packet-v2) after the case briefing. Buggy execution is complete: 7 passed / 1 failed. [Findings and fixed-retest review](QA/Quality%20assurance/qa-workflow.md#run-002-findings-and-fixed-retest-proposal) are Pending; fixed execution has not begun for RUN-002.** It records the eight-case scope, preparation evidence, stop/resume conditions and completion criteria. The same workflow can adapt to another testing objective while retaining progress. Previous RUN-001 results remain agent-executed evidence awaiting human review.

## RUN-001 verified result

**Buggy: 7 passed / 1 failed. Fixed: 8 passed / 0 failed.** These are the same eight cases: six Chromium browser cases and two separately executed HTTP cases. Only TC07 fails in buggy: payroll retry records $3,000 instead of preserving the original $1,500 payment. The same assertion passes in fixed. The Postman collections provide reviewer reproduction; no Postman execution is claimed.

The [defect report](QA/Quality%20Control/bug_report/duplicate-payment-after-notification-failure.md) now includes the confirmed root cause, proposed fix, evidence and release blockers. This local result does not complete the remaining video and candidate-review steps.

## RUN-002 buggy findings

After approval, Codex executed all eight buggy-build cases on fresh records: six UI cases produced five Pass and TC07 Fail; two separate HTTP cases passed. TC07 preserved the original payment but added another $1,500 payment, raising recorded pay to $3,000. The source and a delivery-first control support the notification-dependent completion error.

[RUN-002 UI results](QA/Quality%20Control/Buggy%20build/Functional%20testing/functional-testing-results.md#run-002) · [RUN-002 API results](QA/Quality%20Control/Buggy%20build/API%20testing/api-testing-results.md#run-002) · [Actionable finding](QA/Quality%20Control/bug_report/duplicate-payment-after-notification-failure.md#run-002-findings-review)

The agent proposes keeping PAY-001 Open and blocking the buggy flow. Review the findings before authorizing the same eight cases on the existing fixed reference. Prior fixed results above remain RUN-001 evidence, not a RUN-002 retest.

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
