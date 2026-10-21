# AI-led investigation record

## Question and starting evidence

Can a payroll retry safely recover notification failure after an employee has already been paid? BR04 and BR06 require one employee-period payment and recoverable notification work.

This is a white-box controlled demonstration. Codex knows the deliberately faulty policy; it is not a blind discovery or a historical production incident. Two code copies and the existing page objects were adapted from MustPayroll. No prior execution status was imported.

## Planned checks

1. In a fresh browser dataset, fail one notification delivery, process payroll and record the payment and Pending notification.
2. Retry the same payroll without changing earnings or date. Compare payment count, amounts and identities.
3. Countercheck on the buggy build: recover only the notification before repeating payroll. If notification state drives the completion check, that sequence should avoid the duplicate.
4. Inspect the predicate and database constraint, then run the same business assertion on the corrected reference.
5. Execute adjacent approval, boundary, timezone, deduplication and recovery checks. Preserve first failure separately from fixed results.

**Execution status: pending.** Actual browser actions, causal results and regression outcomes will be added after they occur.

## Ownership

Aniekan authorized this approach and the complete root-cause report. Codex prepared the fixture and tests. New candidate review or manual execution has not been recorded.
