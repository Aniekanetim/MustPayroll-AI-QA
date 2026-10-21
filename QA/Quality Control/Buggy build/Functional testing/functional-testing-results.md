# Buggy build: UI functional results

**Executed:** 2026-10-21T20:19:39.710Z → 2026-10-21T20:21:19.484Z · **Build:** `mustpayroll-0.3.0-faulty-eb7f01eeae99` · **Result:** 5 passed / 1 failed.

**Method:** Codex executed `npm run verify`: TypeScript checks, independent application rebuild and six Chromium page-object tests. Payroll and recovery actions used browser controls; technical setup and saved-record reads used HTTP. No retries or skipped cases. The two [API results](../API%20testing/api-testing-results.md) are separate; this command did not execute Postman.

**Environment:** Node v22.21.0, win32, Chromium 156.0.8078.4.

| TC ID | Scenario | Test case | Preconditions | Test data | Steps | Expected result | Actual result | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TC01 | Approved payroll | Pay approved earnings only | Fresh employees; no earnings or payments | Amara $1,200 + $300 Approved, $500 Pending, $250 Rejected; Daniel $2,000 Approved; Zara $850 Approved and next-period $850 Pending. Dates: 8–10 Oct; next-period 12 Oct 08:00 UTC. | 1. Record the seven earnings. 2. Approve the four qualifying records; reject the claim. 3. Process 13 Oct. 4. Inspect payments and receipts. | $4,350: Amara $1,500; Daniel $2,000; Zara $850. Pending/rejected and next-period earnings remain unpaid. | $4,350 recorded across three payments: Amara $1,500, Daniel $2,000, Zara $850. Pending/rejected records excluded; Overview matched. | PASSED |
| TC02 | Weekly cut-off | Include opening Monday; exclude following Monday | Fresh payPeriodBoundaryEarnings records | Approved Amara: $200 at 5 Oct 00:30 +01:00; $100 at 5 Oct 00:00Z; $300 at 11 Oct 23:59:59Z; $400 at 12 Oct 00:00Z. | 1. Process 13 Oct. 2. Inspect receipt. 3. Select 20 Oct and process. 4. Inspect next receipt. | 13 Oct pays $400 ($100+$300). 20 Oct pays the excluded closing $400 once. The $200 is before opening. | $400 paid for each adjacent period. First receipt contained opening + pre-closing; next receipt contained closing-boundary earning only. Future period labels matched. | PASSED |
| TC05 | Payment failure | Retry an unpaid employee without premature notification | Fresh oneApprovedEarning records; next payment recording fails once | Amara $1,500; pay date 13 Oct 2026, 09:00 UTC. | 1. Process payroll. 2. Inspect Payments and Notifications. 3. Retry the same pay run. | First attempt: no payment or notification. Retry: one Paid $1,500 payment. | First attempt: zero payments and notifications. Retry recorded one Paid $1,500 payment. | PASSED |
| TC06 | Notification recovery | Retry delivery without changing the payment | Fresh oneApprovedEarning records; next delivery fails once | Amara $1,500; pay date 13 Oct 2026, 09:00 UTC. | 1. Process payroll. 2. Inspect Paid receipt and Pending notification. 3. Open Notifications and retry pending notifications. | Payment remains $1,500 with its original ID. The same notification changes Pending → Sent. | Paid $1,500 remained after delivery failed. Notification-only retry changed the same notification Pending → Sent; payment and notification IDs were preserved. | PASSED |
| TC07 | Payroll retry | Preserve payment identity after delivery failure | Fresh oneApprovedEarning records; next delivery fails once | Amara $1,500; pay date 13 Oct 2026, 09:00 UTC. | 1. Process payroll. 2. Note payment ID and Pending notification. 3. Retry the same pay run. 4. Compare totals, references and notification records. | One $1,500 payment; original payment and notification IDs unchanged; notification Sent. No second payment. | $1,500 with one Pending notification became $3,000 across two distinct Paid payments; both notifications Sent. | FAILED |
| TC08 | Successful delivery | Create linked notification after payment | Fresh oneApprovedEarning records; no failure armed | Amara $1,500; pay date 13 Oct 2026, 09:00 UTC. | 1. Process payroll. 2. Open the payment receipt. 3. Inspect Notifications. | One Paid $1,500 payment and one linked Sent notification. Payment commits before delivery is attempted. | One Paid $1,500 payment and one linked Sent notification. Payment-commit event preceded delivery-attempt event. | PASSED |

## Payment-identity regression: TC07

Selected fields below are from the actual browser-run saved-record checkpoints. New executions generate new IDs.

```json
{
  "first": {
    "payrollDatasetId": "0cc1df59-3950-4694-a317-f3f3378011c3",
    "recordedPaymentTotalCents": 150000,
    "payments": [
      {
        "paymentId": "6fa2e5fc-4795-4dbe-9cc0-443a51577938",
        "employeeId": "emp-001",
        "employeeName": "Amara Okafor",
        "amountCents": 150000,
        "payPeriodStartsAt": "2026-10-05T00:00:00.000Z"
      }
    ],
    "notifications": [
      {
        "notificationId": "ada4264c-a9a6-4d72-bf21-f4f210a7a8db",
        "paymentId": "6fa2e5fc-4795-4dbe-9cc0-443a51577938",
        "deliveryStatus": "pending"
      }
    ]
  },
  "after": {
    "payrollDatasetId": "0cc1df59-3950-4694-a317-f3f3378011c3",
    "recordedPaymentTotalCents": 300000,
    "payments": [
      {
        "paymentId": "7ea0fbf4-b449-49bf-859d-3524a0779a8d",
        "employeeId": "emp-001",
        "employeeName": "Amara Okafor",
        "amountCents": 150000,
        "payPeriodStartsAt": "2026-10-05T00:00:00.000Z"
      },
      {
        "paymentId": "6fa2e5fc-4795-4dbe-9cc0-443a51577938",
        "employeeId": "emp-001",
        "employeeName": "Amara Okafor",
        "amountCents": 150000,
        "payPeriodStartsAt": "2026-10-05T00:00:00.000Z"
      }
    ],
    "notifications": [
      {
        "notificationId": "8413d6aa-dffd-4fb6-84a7-ab3432c1974e",
        "paymentId": "7ea0fbf4-b449-49bf-859d-3524a0779a8d",
        "deliveryStatus": "sent"
      },
      {
        "notificationId": "ada4264c-a9a6-4d72-bf21-f4f210a7a8db",
        "paymentId": "6fa2e5fc-4795-4dbe-9cc0-443a51577938",
        "deliveryStatus": "sent"
      }
    ]
  }
}
```

**Business assertion failed:** expected `$1,500.00`, received `$3,000.00`. `npm run verify` exits successfully only because it confirms this exact known failure signature; TC07 remains Failed and this build remains blocked.

## Run identity and reproduction

- Application source fingerprint: `eb7f01eeae99db36efe3f68cb7aa1af5818946a60fa3e7dfe018caecf30c7e83`.
- QA tooling fingerprint: `9b8b37f691e882c9cd5cb425c8898bfe2d078d39129d8689c89798216e20ce9b`.
- Common browser-spec SHA-256: `9b1cd9e74466834e4c9c3a20dcb2e73b6c9b24359284903fae694eee3e7d3293`. The spec is byte-identical in both execution projects.
- [Re-run instructions](executed_functional_test_cases/README.md). Local diagnostics are ignored by Git; the selected observations above preserve the submitted result.

The first migrated run had corrupted expected punctuation in the test file. It is invalid harness evidence and is excluded from these totals. This complete rerun followed the encoding correction and retained the original business expectations.
