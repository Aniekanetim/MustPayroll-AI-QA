# Release-readiness checklist

**Fixed local flow: Ready with known limitations. Buggy build: Not ready. Assessment submission: not complete.** The corrected reference passed the same eight business cases; the new Loom and candidate review remain outstanding.

| Gate | Evidence | Status |
| --- | --- | --- |
| Explicit rules and scope | BR01–BR06, weekly boundaries, identity and account/admin assumptions in [business rules](business_rules.md) | Met |
| Prioritized failure | Three alternatives ranked by impact, likelihood and effort in [intent.md](intent.md) | Met |
| Fresh browser reproduction | Paid + Pending, then duplicate on payroll retry; delivery-first control isolates dependency | Observed |
| Confirmed root cause and proposed fix | Wrong completion predicate, saved-record probe, corrected payment identity and uniqueness in [report](../Quality%20Control/bug_report/duplicate-payment-after-notification-failure.md) | Met |
| Automated failure / fixed retest | Same TC07 assertion fails $1,500 vs $3,000 in buggy and passes in fixed | Met |
| Eight cases per build | Six UI + two separate API cases; buggy 7 passed / 1 failed, fixed 8 passed | Met within stated scope |
| Safe operational handoff | Retry notification for delivery failure; preserve payment reference; stop and reconcile duplicates | Documented in directive |
| Candidate review | Independently inspect results, script assertions and release judgment | Not yet recorded |
| Loom and professional application material | New ≤5-minute video; review the professional cases for the second application | Outstanding |

## Decision and blockers

The fixed build is suitable for review of the local payroll flow. It preserves payment and notification identity after delivery failure, and the adjacent cases passed. Keep the buggy build available solely for controlled failure demonstration; do not treat its successful verification wrapper as a passing payment test.

Block release if a payroll retry duplicates a payment, changes an existing payment ID/amount/destination, or attempts notification after a failed payment. TC05–TC08 check those adjacent recovery responsibilities.

## Limits and handoff

This is not production-payroll approval. Real bank settlement, external idempotency, concurrent workers, process crashes, authentication/account changes, real notification receipt and additional browsers are not verified. A local unique constraint and successful sequential retry do not establish all of those guarantees.

For a new review, start both independent builds, use fresh test records and run their documented verification commands. Repeat TC03/TC04 with the supplied Postman requests if desired. Keep original failure evidence separate from any later retest. Do not reset the failed period before retaining its references and amounts.
