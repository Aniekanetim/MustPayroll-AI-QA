# Duplicate payment when payroll is retried after notification failure

**Defect:** PAY-001 · **Proposed severity:** High (duplicate payment record) · **Proposed priority:** P1 / release blocker · **Status:** Open; RUN-002 agent reproduction complete, human confirmation and decision Pending. Fixed-reference verification below is RUN-001 evidence; RUN-002 fixed retest has not started.

## Bug description

Payment completion is decided using notification delivery state. If payment succeeds and delivery fails, repeating the same payroll can insert another payment for the same employee-period. This controlled defect risks overpayment and unsafe operator recovery.

## Test case

**TC07** is the automated browser regression. TC06 checks the safe notification-only recovery path. Both builds use the same BR04/BR06 expectations.

## Human confirmation before the findings decision

Use the [PAY-001 confirmation guide](../../Quality%20assurance/qa-workflow.md#qa-confirmation-guide-pay-001) to reproduce the reported failure with fresh records, check the source/control supporting the cause, assess severity/priority/status separately and review the corrective approach. Return what you checked and an approve, reject, change, further-investigation or blocked decision. This is a focused human check, not replay of the full regression suite. Fixed-source review at this stage does not authorize fixed-build execution.

## Preconditions

The selected local build is running. Use a new oneApprovedEarning dataset for each reproduction; do not reuse a processed period. The test data below is synthetic.

## Test data

Amara Okafor (`emp-001`), one approved earning `earn-001`, $1,500 (`150000` cents), earned 8 October 2026. Scheduled and simulated pay instant: `2026-10-13T09:00:00.000Z`.

## Steps to reproduce in Postman

Import the build's collection: [buggy](../Buggy%20build/API%20testing/postman/MustPayroll.postman_collection.json) or [fixed](../Fixed%20build/API%20testing/postman/MustPayroll.postman_collection.json). Use its **Defect reproduction — TC07** folder. `baseUrl` is `http://127.0.0.1:4275` for buggy or `http://127.0.0.1:4276` for fixed.

1. **POST** `{{baseUrl}}/api/payroll-datasets` with `{"testDataPreset":"oneApprovedEarning"}`. Expect 201. Save response `payrollDatasetId` to the collection variable.
2. **POST** `{{baseUrl}}/api/payroll-datasets/{{payrollDatasetId}}/test-controls/next-failure` with `{"failureType":"notificationDelivery"}`. Expect 200.
3. **POST** `{{baseUrl}}/api/payroll-datasets/{{payrollDatasetId}}/pay-runs` with the JSON below. Expect 200. Retain payment and notification IDs; check one $1,500 payment and one Pending notification.
4. Send the exact payroll request again. Compare `recordedPaymentTotalCents`, `payments` and `notifications` with step 3.

```json
{
  "scheduledPayRunAt": "2026-10-13T09:00:00.000Z",
  "simulatedProcessingAt": "2026-10-13T09:00:00.000Z"
}
```

The same payment and retry actions can be inspected in the browser at `http://127.0.0.1:4275/pay-runs?payrollDatasetId=RETURNED_ID` (fixed: port 4276). Select **Pay on Tuesday 09:00 UTC**, confirm, then **Retry pay run** and confirm. The one-shot delivery control is test setup; it is not a browser feature or an extra test case.

## Expected result

One Paid $1,500 payment remains. Its payment ID, amount and destination are unchanged. The original linked notification becomes Sent. Notification failure never creates a second financial effect.

## Actual result

The first buggy browser attempt recorded one Paid $1,500 payment and a Pending notification. Retrying the same pay run recorded a second $1,500 payment: **$3,000 total**, despite approved pay remaining $1,500. Both notifications then became Sent. Fixed browser retest retained one $1,500 payment and the original reference.

## Evidence

- [Fresh browser investigation and payment references](../../investigation.md): buggy original `a691679c-295e-49bd-84f9-e52c4ac49ffa`, duplicate `3dd4d944-4822-4aec-b10a-6eaeb62caf68`; fixed retained `56dd0dec-bfe3-478a-ad63-42623ee4c1ac`.
- [Buggy UI results](../Buggy%20build/Functional%20testing/functional-testing-results.md) and [fixed UI results](../Fixed%20build/Functional%20testing/functional-testing-results.md): TC07 failed on buggy and passed on fixed. The final totals are buggy 7/8 passed; fixed 8/8 passed, including the separate API cases.
- Saved-record predicate probe: Paid payment + Pending delivery → Sent-notification query returns no row; payment-identity query returns one row.

Browser build IDs: `mustpayroll-0.3.0-faulty-eb7f01eeae99` and `mustpayroll-0.3.0-fixed-ca7ffbea67ec`. No previous submission's evidence is reused.

## Severity rationale

Proposed severity **High** describes the financial-record impact; proposed priority **P1** means the affected payroll behavior should be corrected or blocked before release. **Open** is the defect state while confirmation and accepted correction verification are outstanding. The QA engineer can confirm or revise each classification independently. An ordinary recovery action can duplicate a financial record. The operator cannot safely resolve the delivery failure by repeating payroll; the period needs reconciliation. Impact is demonstrated in a synthetic ledger, not asserted as actual employer loss.

## Root cause

**Confirmed in this local fixture.** The [buggy completion query](../../../MustPayroll/MustPayroll_buggy/server/payment-policy.mjs) requires a linked notification with `state='sent'`. A committed payment with a Pending notification therefore appears incomplete, so `processPayRun` inserts another payment. The faulty variant also does not activate the fixed-only employee-period unique index; storage does not stop the second insert.

The read-only predicate probe confirmed that the saved payment existed while the Sent-notification query returned no row. The browser countercheck then recovered the notification first: a later payroll retry preserved one payment. This distinguishes a delivery-dependent completion error from an earning-total or date-selection error.

The [fixed completion query](../../../MustPayroll/MustPayroll_fixed/server/payment-policy.mjs) uses the saved payment. The [SQLite constraint](../../../MustPayroll/MustPayroll_fixed/server/payroll.mjs) enforces the employee-period identity for the corrected variant. Payment and notification work are saved in one transaction in both builds; the intentional defect in this attempt is the completion decision.

## Proposed fix, implemented reference and release blockers

Use the committed payment identified by dataset, employee and period as the completion fact, independently of delivery state. Enforce that identity in storage, reuse its ID on retry, and retain payment-plus-notification-work transactionality. Retry only pending delivery after preserving payment.

Block release if TC07 creates a second payment or changes its identity. Also require payment-failure isolation (TC05), notification-only recovery (TC06) and linked notification creation (TC08). The fixed source is a local reference correction; production bank idempotency and concurrency remain outside the verified scope.


## RUN-002 findings review

Aniekan approved the eight-case execution after the case briefing. Codex executed the buggy build on 21 October 2026: **7 passed / 1 failed (TC07)**. [UI evidence](../Buggy%20build/Functional%20testing/functional-testing-results.md#run-002) records original payment `e2e76454-6e9c-4203-bec4-a59bfe106b88` and duplicate `9ce922f1-a013-4059-bcd6-e8c962ff3f6e` in dataset `38b2a7f8-cd84-43a2-99d9-b0f94d59a4c2`. Approved pay remained $1,500; recorded pay became $3,000.

The supporting Paid/Pending probe used fresh dataset `791fc3b4-82ed-4643-9c37-ee51ecf43fc1`. The database was opened read-only: the Sent-notification predicate returned no match, while payment identity matched. Delivery-only recovery followed by payroll retry preserved payment `443d1ab3-158d-4c8a-80ff-3bc061db0a41` and the $1,500 total. This supports the same confirmed cause and proposed fix above; it is not another counted test case.

One supporting probe initially targeted the default database path instead of the running service's configured database and could not open it. No SQL conclusion came from that attempt. A fresh probe verified the correct dataset in the configured database before querying. This investigation setup issue did not affect the eight product-case outcomes.

**Disposition proposed:** keep PAY-001 Open and the buggy flow Not ready. Review this evidence at G3, then authorize the [G4 fixed-reference retest](../../Quality%20assurance/qa-workflow.md#run-002-findings-and-fixed-retest-proposal). No new product-code fix or RUN-002 fixed pass is claimed.
