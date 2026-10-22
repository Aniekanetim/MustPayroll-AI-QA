# directive.md

## Objective

Demonstrate that recovering from notification delivery failure cannot pay an employee twice. Use one controlled payroll failure to show an AI-led investigation, an actionable root-cause report and a regression that fails before correction and passes afterward.

## Scope

Two independent local builds contain the same UI, data rules and test expectations. The buggy build deliberately confuses notification delivery with payment completion. The fixed build checks the saved employee-period payment and protects uniqueness. Neither sends real funds or messages. The previously submitted repository remains unchanged.

## QA operating model

Use the [AI-led QA workflow](Quality%20assurance/qa-workflow.md). The agent establishes the testing objective, analyzes requirements and risks, designs the checks, and prepares scripts, data and the environment. After QA approval it executes, investigates, confirms an approved correction and completes the handoff. Monitoring/control runs throughout. The QA engineer reviews the evidence and owns the scoped decisions. These activities adapt to functional and non-functional objectives through API, browser or other appropriate methods; our five approval gates are project governance.

RUN-001 below is completed agent execution awaiting human review. For RUN-002, the QA engineer selected payroll regression across UI and API, requested standards research, then authorized implementing its recommendations. [Packet v2](Quality%20assurance/qa-workflow.md#run-002-scope-and-test-design-packet-v2) now records the test basis, eight cases, readiness evidence, execution bounds, monitoring and completion criteria. Aniekan approved the packet after the conversational briefing, requiring a safeguard against blind approval. That safeguard now applies to every gate and testing type. All eight buggy cases executed: 7 Pass / 1 Fail. G3 findings were accepted; G4 was separately authorized on 22 October 2026 and all eight fixed cases passed. Human correction confirmation, defect disposition and G5 handoff remain outstanding. This update adds no other testing category or product change.

## Requirements and completion criteria

The [business rules](Quality%20assurance/business_rules.md) define BR01–BR06 and account/admin assumptions. The [intent](Quality%20assurance/intent.md) ranks three possible failures and selects duplicate payment after notification failure.

Completion requires a fresh browser reproduction; confirmed root cause and proposed fix; the same automated TC07 failure and successful fixed retest; eight documented cases/results; a final release decision and recovery handoff. Producing these files does not itself prove execution.

## RUN-001 final run and recommendation

On 21 October 2026, Codex executed the same eight cases against both builds. Buggy: **7 passed / 1 failed (TC07)**. Fixed: **8 passed / 0 failed**. Six cases per build used Chromium page objects; two used direct HTTP requests matching the Postman collection. Postman itself was not executed.

TC07 reproduced $1,500 becoming $3,000 on buggy retry. The fixed reference retained one payment and the original identities. The browser investigation and saved-record predicate probe confirmed the notification-dependent completion error. The agent recommends **Ready with known limitations** for the fixed local flow and **Not ready** for the buggy build. Human release approval is pending. Candidate review and the new Loom still block completing the second submission.

## RUN-002 final comparison and human review

Codex executed the approved buggy scope: five of six UI cases passed and both API cases passed. TC07 failed because payroll retry added a second $1,500 payment after notification failure, bringing recorded pay to $3,000. A fresh delivery-first control and read-only predicate comparison support the source-confirmed cause.

Aniekan accepted the findings, then authorized the itemized G4 plan on 22 October 2026. Codex executed the unchanged six browser and two direct-HTTP cases against the pinned fixed reference: **8 passed / 0 failed**. TC07 retained its original $1,500 payment, destination and linked notification identity while delivery recovered.

The agent recommends Ready with known limitations for the fixed sequential local flow and Not ready for the buggy control. PAY-001 has passed automated correction verification and remains Open pending human confirmation/disposition. [The completion-review packet](Quality%20assurance/qa-workflow.md#run-002-completion-review-and-human-correction-confirmation) includes all eight comparisons, limits, recovery and [focused human confirmation steps](Quality%20assurance/qa-workflow.md#qa-confirmation-guide-corrected-payroll-retry). No human manual result, defect closure or handoff approval is claimed.

## Results / handoff appendix

| Deliverable | Link | Current state |
| --- | --- | --- |
| Runnable local builds | [Buggy](../MustPayroll/MustPayroll_buggy/README.md) · [Fixed](../MustPayroll/MustPayroll_fixed/README.md) | Built and served independently |
| Automated regression | [Buggy](Quality%20Control/Buggy%20build/Functional%20testing/executed_functional_test_cases/README.md) · [Fixed](Quality%20Control/Fixed%20build/Functional%20testing/executed_functional_test_cases/README.md) | RUN-002 buggy: 5 UI passed / 1 failed; fixed: 6 UI passed |
| Six UI cases / build | [Buggy suite](Quality%20Control/Buggy%20build/Functional%20testing/functional-test-suite.md) · [Fixed suite](Quality%20Control/Fixed%20build/Functional%20testing/functional-test-suite.md) | Defined with unchanged expectations |
| Two API cases / build | [Buggy suite](Quality%20Control/Buggy%20build/API%20testing/api-test-suite.md) · [Fixed suite](Quality%20Control/Fixed%20build/API%20testing/api-test-suite.md) | RUN-002: both passed on both builds by direct HTTP. Postman reproduction supplied |
| UI results | [Buggy](Quality%20Control/Buggy%20build/Functional%20testing/functional-testing-results.md) · [Fixed](Quality%20Control/Fixed%20build/Functional%20testing/functional-testing-results.md) | Recorded with observed outcomes |
| API results | [Buggy](Quality%20Control/Buggy%20build/API%20testing/api-testing-results.md) · [Fixed](Quality%20Control/Fixed%20build/API%20testing/api-testing-results.md) | Recorded with observed outcomes |
| Actionable defect / cause / fix | [Duplicate payment after notification failure](Quality%20Control/bug_report/duplicate-payment-after-notification-failure.md) | Confirmed cause, proposed fix and retest evidence |
| QA workflow and review | [Findings and retest proposal](Quality%20assurance/qa-workflow.md#run-002-findings-and-fixed-retest-proposal) | RUN-002 G1/G2 Approved, G3 Accepted, G4 Authorized/completed; G5 human review Pending |
| AI observations | [Investigation](investigation.md) | Browser and causal investigation recorded |
| Release decision | [Release-readiness checklist](Quality%20assurance/release_readiness.md) | RUN-002 fixed 8/8 passed within local limits; human confirmation/handoff outstanding |
| Loom | No new recording supplied | Outstanding; record ≤5 minutes |

## Recovery handoff

If payment exists and notification is Pending, use Notifications → Retry pending notifications and preserve the payment reference. If payment failed, retry the original pay run. If there is a duplicate payment, stop the affected period and reconcile its references and amounts; do not keep retrying. The demo's Settings reset removes disposable test-period records and is not a production reconciliation method.

## AI assistance and ownership

Aniekan selected the payroll context and confirmed the operating model: AI performs the QA workflow, with the QA engineer reviewing scope, expected behavior, evidence, findings, retest and the final handoff. Codex performed RUN-001 analysis, browser operation, supporting HTTP checks, causal investigation, fixture/test adaptation and documentation. Its human review remains Pending. For RUN-002, Aniekan approved scope/design, accepted G3 findings and separately authorized fixed execution; Codex executed both builds and recorded the comparison. Specific human confirmation observations and G5 handoff/defect disposition are outstanding. No agent action is represented as personal manual execution.

## Remaining limits

No new professional portfolio or Loom is claimed complete. Only the supplied brief is available; the weighted rubric and reason for rejection were not supplied. Local testing does not establish production safety, multi-browser support, real bank behavior or notification receipt.
