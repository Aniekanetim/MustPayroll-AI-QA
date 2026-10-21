# directive.md

## Objective

Demonstrate that recovering from notification delivery failure cannot pay an employee twice. Use one controlled payroll failure to show an AI-led investigation, an actionable root-cause report and a regression that fails before correction and passes afterward.

## Scope

Two independent local builds contain the same UI, data rules and test expectations. The buggy build deliberately confuses notification delivery with payment completion. The fixed build checks the saved employee-period payment and protects uniqueness. Neither sends real funds or messages. The previously submitted repository remains unchanged.

## Requirements and completion criteria

The [business rules](Quality%20assurance/business_rules.md) define BR01–BR06 and account/admin assumptions. The [intent](Quality%20assurance/intent.md) ranks three possible failures and selects duplicate payment after notification failure.

Completion requires a fresh browser reproduction; confirmed root cause and proposed fix; the same automated TC07 failure and successful fixed retest; eight documented cases/results; a final release decision and recovery handoff. Producing these files does not itself prove execution.

## Results / handoff appendix

| Deliverable | Link | Current state |
| --- | --- | --- |
| Runnable local builds | [Buggy](../MustPayroll/MustPayroll_buggy/README.md) · [Fixed](../MustPayroll/MustPayroll_fixed/README.md) | Sources prepared |
| Automated regression | [Buggy](Quality%20Control/Buggy%20build/Functional%20testing/executed_functional_test_cases/README.md) · [Fixed](Quality%20Control/Fixed%20build/Functional%20testing/executed_functional_test_cases/README.md) | New execution pending |
| Six UI cases / build | [Buggy suite](Quality%20Control/Buggy%20build/Functional%20testing/functional-test-suite.md) · [Fixed suite](Quality%20Control/Fixed%20build/Functional%20testing/functional-test-suite.md) | Designed |
| Two API cases / build | [Buggy suite](Quality%20Control/Buggy%20build/API%20testing/api-test-suite.md) · [Fixed suite](Quality%20Control/Fixed%20build/API%20testing/api-test-suite.md) | Designed; Postman reproduction supplied |
| UI results | [Buggy](Quality%20Control/Buggy%20build/Functional%20testing/functional-testing-results.md) · [Fixed](Quality%20Control/Fixed%20build/Functional%20testing/functional-testing-results.md) | Pending execution |
| API results | [Buggy](Quality%20Control/Buggy%20build/API%20testing/api-testing-results.md) · [Fixed](Quality%20Control/Fixed%20build/API%20testing/api-testing-results.md) | Pending execution |
| Actionable defect / cause / fix | [Duplicate payment after notification failure](Quality%20Control/bug_report/duplicate-payment-after-notification-failure.md) | Causal verification pending |
| AI workflow and observations | [Investigation](investigation.md) | In progress |
| Release decision | [Release-readiness checklist](Quality%20assurance/release_readiness.md) | Pending evidence and candidate review |
| Loom | No new recording supplied | Outstanding; record ≤5 minutes |

## Recovery handoff

If payment exists and notification is Pending, use Notifications → Retry pending notifications and preserve the payment reference. If payment failed, retry the original pay run. If there is a duplicate payment, stop the affected period and reconcile its references and amounts; do not keep retrying. The demo's Settings reset removes disposable test-period records and is not a production reconciliation method.

## AI assistance and ownership

Aniekan authorized the new approach and selected the payroll context. Codex performs requirements analysis, browser operation, supporting HTTP checks, causal investigation, fixture/test adaptation and documentation. Candidate review of this new evidence and final sign-off are not yet recorded. No automated action is represented as personal manual execution.

## Remaining limits

No new professional portfolio or Loom is claimed complete. Only the supplied brief is available; the weighted rubric and reason for rejection were not supplied. Local testing does not establish production safety, multi-browser support, real bank behavior or notification receipt.
