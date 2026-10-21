# Buggy build: UI functional results

Latest approved-scope execution: [RUN-002](#run-002). RUN-001 remains preserved below; the two executions are separate.

## RUN-001

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

### Payment-identity regression: TC07

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

### Run identity and reproduction

- Application source fingerprint: `eb7f01eeae99db36efe3f68cb7aa1af5818946a60fa3e7dfe018caecf30c7e83`.
- QA tooling fingerprint: `9b8b37f691e882c9cd5cb425c8898bfe2d078d39129d8689c89798216e20ce9b`.
- Common browser-spec SHA-256: `9b1cd9e74466834e4c9c3a20dcb2e73b6c9b24359284903fae694eee3e7d3293`. The spec is byte-identical in both execution projects.
- [Re-run instructions](executed_functional_test_cases/README.md). Local diagnostics are ignored by Git; the selected observations above preserve the submitted result.

The first migrated run had corrupted expected punctuation in the test file. It is invalid harness evidence and is excluded from these totals. This complete rerun followed the encoding correction and retained the original business expectations.

## RUN-002

**Authorization:** Aniekan approved packet v2 after the case/rationale/expected-outcome briefing, with the informed-approval safeguard implemented before execution. **Executor:** Codex. Human findings review remains Pending.

**Executed:** 2026-10-21T21:21:47.989Z → 2026-10-21T21:22:38.361Z · **Build:** `mustpayroll-0.3.0-faulty-eb7f01eeae99` · **Result:** 5 passed / 1 failed (TC07).

**Method:** the unchanged TypeScript POM project ran once through `npm run verify`, Chromium, one worker and zero runner retries. Browser controls processed payroll and recovery; HTTP supported data setup and saved-state checks. All six cases ran; there were no runner errors or skipped cases. The Playwright run exited 1 for TC07; the outer verifier exited 0 because it confirmed the exact known defect signature. TC07 remains Failed.

| TC ID | Scenario | Test case | Preconditions | Test data | Steps | Expected result | Actual result | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TC01 | Approved payroll | Pay approved earnings only | Fresh employees; no earnings or payments | Amara $1,200 + $300 Approved, $500 Pending, $250 Rejected; Daniel $2,000 Approved; Zara $850 Approved and next-period $850 Pending. Dates: 8–10 Oct; next-period 12 Oct 08:00 UTC. | 1. Record the seven earnings. 2. Approve the four qualifying records; reject the claim. 3. Process 13 Oct. 4. Inspect payments and receipts. | $4,350: Amara $1,500; Daniel $2,000; Zara $850. Pending/rejected and next-period earnings remain unpaid. | $4,350 across three Paid payments: Amara $1,500, Daniel $2,000, Zara $850. Excluded earnings contributed nothing; receipts and Overview matched. | PASSED |
| TC02 | Weekly cut-off | Include opening Monday; exclude following Monday | Fresh payPeriodBoundaryEarnings records | Approved Amara: $200 at 5 Oct 00:30 +01:00; $100 at 5 Oct 00:00Z; $300 at 11 Oct 23:59:59Z; $400 at 12 Oct 00:00Z. | 1. Process 13 Oct. 2. Inspect receipt. 3. Select 20 Oct and process. 4. Inspect next receipt. | 13 Oct pays $400 ($100+$300). 20 Oct pays the excluded closing $400 once. The $200 is before opening. | $400 in each adjacent period; closing-boundary earning paid only in the next period. Future period labels matched. | PASSED |
| TC05 | Payment failure | Retry an unpaid employee without premature notification | Fresh oneApprovedEarning records; next payment recording fails once | Amara $1,500; pay date 13 Oct 2026, 09:00 UTC. | 1. Process payroll. 2. Inspect Payments and Notifications. 3. Retry the same pay run. | First attempt: no payment or notification. Retry: one Paid $1,500 payment. | First attempt recorded no payment or notification. Payroll retry recorded one Paid $1,500 payment. | PASSED |
| TC06 | Notification recovery | Retry delivery without changing the payment | Fresh oneApprovedEarning records; next delivery fails once | Amara $1,500; pay date 13 Oct 2026, 09:00 UTC. | 1. Process payroll. 2. Inspect Paid receipt and Pending notification. 3. Open Notifications and retry pending notifications. | Payment remains $1,500 with its original ID. The same notification changes Pending → Sent. | Delivery-only retry preserved the original $1,500 payment and notification IDs; notification changed Pending to Sent. | PASSED |
| TC07 | Payroll retry | Preserve payment identity after delivery failure | Fresh oneApprovedEarning records; next delivery fails once | Amara $1,500; pay date 13 Oct 2026, 09:00 UTC. | 1. Process payroll. 2. Note payment ID and Pending notification. 3. Retry the same pay run. 4. Compare totals, references and notification records. | One $1,500 payment; original payment and notification IDs unchanged; notification Sent. No second payment. | Recorded pay increased from $1,500 to $3,000 across two distinct Paid payments; approved pay stayed $1,500. Both notifications became Sent. | FAILED |
| TC08 | Successful delivery | Create linked notification after payment | Fresh oneApprovedEarning records; no failure armed | Amara $1,500; pay date 13 Oct 2026, 09:00 UTC. | 1. Process payroll. 2. Open the payment receipt. 3. Inspect Notifications. | One Paid $1,500 payment and one linked Sent notification. Payment commits before delivery is attempted. | One Paid $1,500 payment and linked Sent notification; payment-commit event preceded delivery attempt. | PASSED |

### TC07: observed payment and notification identities

Dataset: `38b2a7f8-cd84-43a2-99d9-b0f94d59a4c2`. Pay date: 13 October 2026 at 09:00 UTC; period: 5 October 00:00 inclusive to 12 October 00:00 exclusive.

| Checkpoint | Approved / recorded | Payment records | Notification records |
| --- | --- | --- | --- |
| First attempt | $1,500 / $1,500 | Original `e2e76454-6e9c-4203-bec4-a59bfe106b88` | `97f23293-4d18-4a7f-97de-493bb8640644` Pending |
| Same payroll retried | $1,500 / $3,000 | Original retained; second payment `9ce922f1-a013-4059-bcd6-e8c962ff3f6e` added | Original `97f23293-4d18-4a7f-97de-493bb8640644` and second `7f49e80a-519a-4596-9af4-c80ac566d927` both Sent |

The expected displayed total was **$1,500.00**; the observed total was **$3,000.00**. Saved records corroborate the UI: a second $1,500 payment was inserted. The failed assertion was the business amount, not a missing locator or setup failure. Assertions after that failing line did not execute; the captured checkpoints separately preserve the observed records.

### Run identity and evidence limits

- Node v22.21.0, win32, Chromium 156.0.8078.4.
- Application source fingerprint: `eb7f01eeae99db36efe3f68cb7aa1af5818946a60fa3e7dfe018caecf30c7e83`.
- QA tooling fingerprint: `9b8b37f691e882c9cd5cb425c8898bfe2d078d39129d8689c89798216e20ce9b`.
- Browser spec SHA-256: `9b1cd9e74466834e4c9c3a20dcb2e73b6c9b24359284903fae694eee3e7d3293`.
- Test-source baseline: commit `556f55e0cade1d6f98bd700b66a51a0c546f21a0`; execution-time edits affected workflow/context documentation only.
- RUN-001 and RUN-002 diagnostics are archived separately in ignored local data. Published observations above are from RUN-002.
- [Separate API results](../API%20testing/api-testing-results.md#run-002): TC03/TC04 both passed. Combined buggy result: **7 passed / 1 failed**.
- No fixed-build cases were executed for RUN-002. [Findings review](../../../Quality%20assurance/qa-workflow.md#run-002-findings-and-fixed-retest-proposal) precedes fixed retest.
