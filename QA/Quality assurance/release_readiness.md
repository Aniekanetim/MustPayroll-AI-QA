# Release-readiness checklist

**RUN-002 agent recommendation: fixed local flow Ready with known limitations; buggy build Not ready. Human correction confirmation, defect disposition and G5 handoff decision: Pending. Assessment submission: not complete.** Aniekan authorized fixed execution on 22 October 2026. All eight fixed cases passed; the buggy run remains 7 Pass / 1 Fail (TC07). The new Loom and professional application-material review remain outstanding. RUN-001 evidence is retained separately in the result records.

| Gate | Evidence | Status |
| --- | --- | --- |
| Explicit rules and scope | BR01–BR06, weekly boundaries, identity and account/admin assumptions in [business rules](business_rules.md) | Met |
| Prioritized failure | Three alternatives ranked by impact, likelihood and effort in [intent.md](intent.md) | Met |
| Fresh browser reproduction | Paid + Pending, then duplicate on payroll retry; delivery-first control isolates dependency | Observed |
| Confirmed root cause and proposed fix | Wrong completion predicate, saved-record probe, corrected payment identity and uniqueness in [report](../Quality%20Control/bug_report/duplicate-payment-after-notification-failure.md) | Met |
| Automated failure / fixed retest | Same TC07 assertion fails $1,500 vs $3,000 in buggy and passes in fixed | Met |
| Eight cases per build | RUN-002: [six fixed UI passes](../Quality%20Control/Fixed%20build/Functional%20testing/functional-testing-results.md#run-002) and [two fixed API passes](../Quality%20Control/Fixed%20build/API%20testing/api-testing-results.md#run-002); buggy 7 Pass / 1 Fail | Met within stated scope |
| Safe operational handoff | Retry notification for delivery failure; preserve payment reference; stop and reconcile duplicates | Documented in directive |
| Human QA review | G1/G2 approved; G3 findings accepted; G4 execution authorized and completed. Confirm the correction using the [focused guide](qa-workflow.md#qa-confirmation-guide-corrected-payroll-retry), then record the evidence reviewed and G5 decision | Correction confirmation, defect disposition and handoff Pending; repeating every case manually is not required |
| Loom and professional application material | New ≤5-minute video; review the professional cases for the second application | Outstanding |

## RUN-002 completion review

[Packet v2](qa-workflow.md#run-002-scope-and-test-design-packet-v2) defines entry checks, execution bounds and completion criteria. G1/G2 were approved after the conversational briefing. Aniekan accepted the G3 findings after the [defect confirmation guide](qa-workflow.md#qa-confirmation-guide-pay-001); specific human checks/observations were not supplied, so no manual confirmation method is claimed. He separately authorized [G4 packet v1](qa-workflow.md#g4-fixed-reference-execution-packet-v1) on 22 October 2026. The earlier combined G3/G4 request remains withdrawn.

Both RUN-002 executions are complete. The buggy build has 7 Pass / 1 Fail; the fixed build has 8 Pass / 0 Fail. All planned cases executed without blocked/skipped cases or runner retries. Six fixed Chromium POM cases and two separate Python HTTP cases passed with unchanged expectations. Postman provides reproducible requests but was not the execution tool. The fixed build is `mustpayroll-0.3.0-fixed-ca7ffbea67ec`.

TC07 retained one $1,500 payment (`c3766df6-d985-4bbe-8c95-a275bb2126d9`) and its destination, while the original notification (`dc047b2e-f08a-489b-872d-e68517951183`) changed from Pending to Sent. The buggy retry had created a second payment and raised recorded pay to $3,000. PAY-001 remains Open pending human correction confirmation and disposition; automated fix verification is Pass. The [completion packet](qa-workflow.md#run-002-completion-review-and-human-correction-confirmation) links the original failure and the separate fixed retest.

All eight planned cases and BR01–BR06 are accounted for. Original failures, RUN-001 records and separate retests are retained. The reusable checks and directive's recovery handoff remain available. Explicit UTF-8 handling and complete, focused human-review briefings are the recorded process improvements. The QA engineer now records the actual correction evidence reviewed, the defect disposition and whether the local handoff is accepted with its limits. Organizational production-release authority remains separate.

## Decision and blockers

The automated evidence supports the fixed local payroll flow with the limits below. Human confirmation and the G5 handoff decision remain Pending. Keep the buggy build available solely for controlled failure demonstration; do not treat its successful verification wrapper as a passing payment test.

Block release if a payroll retry duplicates a payment, changes an existing payment ID/amount/destination, or attempts notification after a failed payment. TC05–TC08 check those adjacent recovery responsibilities.

## Limits and handoff

This is not production-payroll approval. Real bank settlement, external idempotency, concurrent workers, process crashes, authentication/account changes, real notification receipt and additional browsers are not verified. A local unique constraint and successful sequential retry do not establish all of those guarantees.

For a new review, start both independent builds, use fresh test records and run their documented verification commands. Repeat TC03/TC04 with the supplied Postman requests if desired. Keep original failure evidence separate from any later retest. Do not reset the failed period before retaining its references and amounts.
