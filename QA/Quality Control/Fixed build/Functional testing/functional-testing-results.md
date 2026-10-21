# Fixed build: UI functional results

**Executed:** 2026-10-21T20:19:39.637Z → 2026-10-21T20:21:09.469Z · **Build:** `mustpayroll-0.3.0-fixed-ca7ffbea67ec` · **Result:** 6 passed / 0 failed.

**Method:** Codex executed `npm run verify`: TypeScript checks, independent application rebuild and six Chromium page-object tests. Payroll and recovery actions used browser controls; technical setup and saved-record reads used HTTP. No retries or skipped cases. The two [API results](../API%20testing/api-testing-results.md) are separate; this command did not execute Postman.

**Environment:** Node v22.21.0, win32, Chromium 156.0.8078.4.

| TC ID | Scenario | Test case | Preconditions | Test data | Steps | Expected result | Actual result | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TC01 | Approved payroll | Pay approved earnings only | Fresh employees; no earnings or payments | Amara $1,200 + $300 Approved, $500 Pending, $250 Rejected; Daniel $2,000 Approved; Zara $850 Approved and next-period $850 Pending. Dates: 8–10 Oct; next-period 12 Oct 08:00 UTC. | 1. Record the seven earnings. 2. Approve the four qualifying records; reject the claim. 3. Process 13 Oct. 4. Inspect payments and receipts. | $4,350: Amara $1,500; Daniel $2,000; Zara $850. Pending/rejected and next-period earnings remain unpaid. | $4,350 recorded across three payments: Amara $1,500, Daniel $2,000, Zara $850. Pending/rejected records excluded; Overview matched. | PASSED |
| TC02 | Weekly cut-off | Include opening Monday; exclude following Monday | Fresh payPeriodBoundaryEarnings records | Approved Amara: $200 at 5 Oct 00:30 +01:00; $100 at 5 Oct 00:00Z; $300 at 11 Oct 23:59:59Z; $400 at 12 Oct 00:00Z. | 1. Process 13 Oct. 2. Inspect receipt. 3. Select 20 Oct and process. 4. Inspect next receipt. | 13 Oct pays $400 ($100+$300). 20 Oct pays the excluded closing $400 once. The $200 is before opening. | $400 paid for each adjacent period. First receipt contained opening + pre-closing; next receipt contained closing-boundary earning only. Future period labels matched. | PASSED |
| TC05 | Payment failure | Retry an unpaid employee without premature notification | Fresh oneApprovedEarning records; next payment recording fails once | Amara $1,500; pay date 13 Oct 2026, 09:00 UTC. | 1. Process payroll. 2. Inspect Payments and Notifications. 3. Retry the same pay run. | First attempt: no payment or notification. Retry: one Paid $1,500 payment. | First attempt: zero payments and notifications. Retry recorded one Paid $1,500 payment. | PASSED |
| TC06 | Notification recovery | Retry delivery without changing the payment | Fresh oneApprovedEarning records; next delivery fails once | Amara $1,500; pay date 13 Oct 2026, 09:00 UTC. | 1. Process payroll. 2. Inspect Paid receipt and Pending notification. 3. Open Notifications and retry pending notifications. | Payment remains $1,500 with its original ID. The same notification changes Pending → Sent. | Paid $1,500 remained after delivery failed. Notification-only retry changed the same notification Pending → Sent; payment and notification IDs were preserved. | PASSED |
| TC07 | Payroll retry | Preserve payment identity after delivery failure | Fresh oneApprovedEarning records; next delivery fails once | Amara $1,500; pay date 13 Oct 2026, 09:00 UTC. | 1. Process payroll. 2. Note payment ID and Pending notification. 3. Retry the same pay run. 4. Compare totals, references and notification records. | One $1,500 payment; original payment and notification IDs unchanged; notification Sent. No second payment. | Payroll retry retained one $1,500 payment and its original ID; original notification ID retained and status changed to Sent. | PASSED |
| TC08 | Successful delivery | Create linked notification after payment | Fresh oneApprovedEarning records; no failure armed | Amara $1,500; pay date 13 Oct 2026, 09:00 UTC. | 1. Process payroll. 2. Open the payment receipt. 3. Inspect Notifications. | One Paid $1,500 payment and one linked Sent notification. Payment commits before delivery is attempted. | One Paid $1,500 payment and one linked Sent notification. Payment-commit event preceded delivery-attempt event. | PASSED |

## Payment-identity regression: TC07

Selected fields below are from the actual browser-run saved-record checkpoints. New executions generate new IDs.

```json
{
  "first": {
    "payrollDatasetId": "b86ba959-7deb-4071-976b-cc0ffaa965c2",
    "recordedPaymentTotalCents": 150000,
    "payments": [
      {
        "paymentId": "3c9ae25e-107e-4cb9-a5ce-b334777702f2",
        "employeeId": "emp-001",
        "employeeName": "Amara Okafor",
        "amountCents": 150000,
        "payPeriodStartsAt": "2026-10-05T00:00:00.000Z"
      }
    ],
    "notifications": [
      {
        "notificationId": "409eb24b-2ff7-4960-9841-cbdf86486820",
        "paymentId": "3c9ae25e-107e-4cb9-a5ce-b334777702f2",
        "deliveryStatus": "pending"
      }
    ]
  },
  "after": {
    "payrollDatasetId": "b86ba959-7deb-4071-976b-cc0ffaa965c2",
    "recordedPaymentTotalCents": 150000,
    "payments": [
      {
        "paymentId": "3c9ae25e-107e-4cb9-a5ce-b334777702f2",
        "employeeId": "emp-001",
        "employeeName": "Amara Okafor",
        "amountCents": 150000,
        "payPeriodStartsAt": "2026-10-05T00:00:00.000Z"
      }
    ],
    "notifications": [
      {
        "notificationId": "409eb24b-2ff7-4960-9841-cbdf86486820",
        "paymentId": "3c9ae25e-107e-4cb9-a5ce-b334777702f2",
        "deliveryStatus": "sent"
      }
    ]
  }
}
```

**Business assertion passed:** one $1,500 payment remained after payroll retry, with the original payment and notification identities. All six UI cases passed on this corrected reference.

## Run identity and reproduction

- Application source fingerprint: `ca7ffbea67ece56e137c63349f31ef33b615b0cb75fcd5a3ac59454532561c13`.
- QA tooling fingerprint: `821605df009554c4f2ca983b792d37c14919d795266e9b104fbbb120eb887fa7`.
- Common browser-spec SHA-256: `9b1cd9e74466834e4c9c3a20dcb2e73b6c9b24359284903fae694eee3e7d3293`. The spec is byte-identical in both execution projects.
- [Re-run instructions](executed_functional_test_cases/README.md). Local diagnostics are ignored by Git; the selected observations above preserve the submitted result.

The first migrated run had corrupted expected punctuation in the test file. It is invalid harness evidence and is excluded from these totals. This complete rerun followed the encoding correction and retained the original business expectations.
