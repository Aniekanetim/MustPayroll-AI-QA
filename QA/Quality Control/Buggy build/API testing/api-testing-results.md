# Buggy build: API results

**Executed:** 2026-10-21T20:18:34.814058+00:00 → 2026-10-21T20:18:35.454214+00:00 · **Build:** `mustpayroll-0.3.0-faulty-eb7f01eeae99` · **Result:** 2 passed / 0 failed.

**Method:** Python urllib direct HTTP; request bodies loaded from exported Postman collection. Postman was not executed. The [collection](postman/MustPayroll.postman_collection.json) is supplied so a reviewer can repeat these requests in Postman. An exported collection is not a recorded Postman run.

| TC ID | Scenario | Test case | Preconditions | Test data | Steps | Expected result | Actual result | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TC03 | Timezone conversion | Normalize before opening cut-off | Fresh employeesOnly records | before-opening $200 at 00:30+01:00; at-opening $100 at 01:00+01:00, 5 Oct 2026 | 1. Create records. 2. Import both earnings. 3. POST pay-runs for 13 Oct 09:00 UTC. | $100; at-opening only. | $100 recorded; one payment containing at-opening; before-opening excluded. | PASS |
| TC04 | Duplicate input | Count an identical earning ID once | Fresh employeesOnly records | duplicate-earning, Amara, 150000 cents; 8 Oct 2026 12:00 UTC | 1. Create records. 2. Import the same earning twice. 3. POST pay-runs. | One earning; one $1,500 payment. | One earning persisted; one $1,500 payment. | PASS |

## Saved response evidence

These selected fields were read from successful HTTP responses; they are observations, not example outputs. New runs produce new IDs. Exact endpoints and request payloads are in the [API suite](api-test-suite.md).

### TC03

```json
{
  "payrollDatasetId": "ce73e1df-2f62-4023-b48a-02c85e0b2095",
  "recordedPaymentTotalCents": 10000,
  "paymentId": "ba046f21-71de-404c-8495-1177fa1399b1",
  "earningIds": [
    "at-opening"
  ],
  "paymentCount": 1,
  "earningCount": 2
}
```

### TC04

```json
{
  "payrollDatasetId": "dbc86f17-6b59-49b0-952f-7124ed40a394",
  "recordedPaymentTotalCents": 150000,
  "paymentId": "8cbd0ec5-671f-4727-81f8-c9e0899e1c25",
  "earningIds": [
    "duplicate-earning"
  ],
  "paymentCount": 1,
  "earningCount": 1
}
```

