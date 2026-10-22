# Buggy build: API results

Latest approved-scope execution: [RUN-002](#run-002). RUN-001 remains preserved below; the two executions are separate.

## RUN-001

**Executed:** 2026-10-21T20:18:34.814058+00:00 → 2026-10-21T20:18:35.454214+00:00 · **Build:** `mustpayroll-0.3.0-faulty-eb7f01eeae99` · **Result:** 2 passed / 0 failed.

**Method:** Python urllib direct HTTP; request bodies loaded from exported Postman collection. Postman was not executed. The [collection](postman/MustPayroll.postman_collection.json) is supplied so a reviewer can repeat these requests in Postman. An exported collection is not a recorded Postman run.

| TC ID | Scenario | Test case | Preconditions | Test data | Steps | Expected result | Actual result | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TC03 | Timezone conversion | Normalize before opening cut-off | Fresh employeesOnly records | before-opening $200 at 00:30+01:00; at-opening $100 at 01:00+01:00, 5 Oct 2026 | 1. Create records. 2. Import both earnings. 3. POST pay-runs for 13 Oct 09:00 UTC. | $100; at-opening only. | $100 recorded; one payment containing at-opening; before-opening excluded. | PASS |
| TC04 | Duplicate input | Count an identical earning ID once | Fresh employeesOnly records | duplicate-earning, Amara, 150000 cents; 8 Oct 2026 12:00 UTC | 1. Create records. 2. Import the same earning twice. 3. POST pay-runs. | One earning; one $1,500 payment. | One earning persisted; one $1,500 payment. | PASS |

### Saved response evidence

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

## RUN-002

**Authorization:** packet v2 approved by Aniekan after the case briefing. **Executor:** Codex. **Executed:** 2026-10-21T21:22:13.209141+00:00 → 2026-10-21T21:22:13.683219+00:00 · **Build:** `mustpayroll-0.3.0-faulty-eb7f01eeae99` · **Result:** 2 passed / 0 failed.

**Method:** Python 3.14.0 urllib HTTP using the exported Postman request bodies. Postman itself was not executed. Each case used a fresh payroll dataset. Create returned 201; imports, processing and the final saved-state read returned 200. Exact methods, endpoints and payloads remain in the [API suite](api-test-suite.md) and [Postman collection](postman/MustPayroll.postman_collection.json).

| TC ID | Scenario | Test case | Preconditions | Test data | Steps | Expected result | Actual result | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TC03 | Timezone conversion | Normalize offset timestamps before the opening cut-off | Running buggy build; new employeesOnly records | Payload below; 13 Oct 09:00 UTC | 1. Create records. 2. Import both earnings. 3. Process payroll. | $100 paid once; before-opening earning excluded. | $100 paid once; only at-opening selected; before-opening excluded. | PASSED |
| TC04 | Duplicate import | Count the same earning ID once | Running buggy build; new employeesOnly records | Payload below; identical ID and body on both imports | 1. Create records. 2. Import earning twice. 3. Process payroll. | One earning; one $1,500 payment. | One identical earning persisted after both imports; one $1,500 payment. | PASSED |

### Observed saved-state evidence

**TC03**

~~~json
{
  "payrollDatasetId": "05243859-d1fd-47ae-abce-da2cc55c6ae2",
  "recordedPaymentTotalCents": 10000,
  "paymentId": "f2e353a4-9cdd-4392-aea9-29772356cd17",
  "earningIds": [
    "at-opening"
  ],
  "paymentCount": 1,
  "earningCount": 2
}
~~~

**TC04**

~~~json
{
  "payrollDatasetId": "6be17ac5-c617-45b9-b656-a9d842a87351",
  "recordedPaymentTotalCents": 150000,
  "paymentId": "06a3ace6-1c77-45b9-a9c8-8363ad74be1a",
  "earningIds": [
    "duplicate-earning"
  ],
  "paymentCount": 1,
  "earningCount": 1
}
~~~

Collection SHA-256: `47b6c49a1c8a13df8ea3ff8d13ff6ca9b9d7df652daaf97f6d17b238ebf5b296`. Supporting requests and causal probes do not add test cases. G3 findings were subsequently accepted. The [separate RUN-002 fixed API retest](../../Fixed%20build/API%20testing/api-testing-results.md#run-002) passed both cases; G5 human review remains Pending.
