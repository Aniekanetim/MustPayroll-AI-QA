# Duplicate payment when payroll is retried after notification failure

**Defect:** PAY-001 · **Priority:** P1 / release blocker · **Status:** awaiting fresh reproduction.

## Bug description

Payment completion is decided using notification delivery state. If payment succeeds and delivery fails, repeating the same payroll can insert another payment for the same employee-period. This controlled defect risks overpayment and unsafe operator recovery.

## Test case

**TC07** is the automated browser regression. TC06 checks the safe notification-only recovery path. Both builds use the same BR04/BR06 expectations.

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

Fresh execution pending; the deliberately faulty completion predicate will be tested rather than treated as execution evidence.

## Evidence

Pending fresh browser and regression execution. No old screenshot, result or recording is presented as this attempt's proof.

## Severity rationale

P1: an ordinary recovery action can duplicate a financial record. The operator cannot safely resolve the delivery failure by repeating payroll; the period needs reconciliation. Impact is demonstrated in a synthetic ledger, not asserted as actual employer loss.

## Root cause

Source-supported hypothesis to verify: the buggy `hasCompletedPayment` query requires a linked notification with `state='sent'`. A committed payment with a Pending notification therefore appears incomplete. The faulty variant does not activate the fixed-only employee-period unique index. Causal countercheck: send the existing notification first, then retry payroll without changing earnings.

## Proposed fix and release blockers

Use the committed payment identified by dataset, employee and period as the completion fact, independently of delivery state. Enforce that identity in storage, reuse its ID on retry, and retain payment-plus-notification-work transactionality. Retry only pending delivery after preserving payment.

Block release if TC07 creates a second payment or changes its identity. Also require payment-failure isolation (TC05), notification-only recovery (TC06) and linked notification creation (TC08). The fixed source is a local reference correction; production bank idempotency and concurrency remain outside the verified scope.
