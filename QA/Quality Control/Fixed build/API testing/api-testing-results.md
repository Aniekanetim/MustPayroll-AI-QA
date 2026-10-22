# Fixed build: API results

Latest approved-scope execution: [RUN-002](#run-002). RUN-001 remains preserved below as a separate execution.

## RUN-001

**Executed:** 2026-10-21T20:18:35.685581+00:00 → 2026-10-21T20:18:36.273655+00:00 · **Build:** `mustpayroll-0.3.0-fixed-ca7ffbea67ec` · **Result:** 2 passed / 0 failed.

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
  "payrollDatasetId": "68c6ccb4-8238-462f-85e5-60495d4db63f",
  "recordedPaymentTotalCents": 10000,
  "paymentId": "f363d468-d219-418a-b89f-a415c45c2a4e",
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
  "payrollDatasetId": "62a1cb39-1be9-4b72-a0ba-292e85b61f94",
  "recordedPaymentTotalCents": 150000,
  "paymentId": "ce4471b0-9a55-4791-9788-d4b8b05ae285",
  "earningIds": [
    "duplicate-earning"
  ],
  "paymentCount": 1,
  "earningCount": 1
}
```

## RUN-002

**Authorization:** G4 packet v1 authorized by Aniekan on **22 October 2026**. **Executor:** Codex. **Local execution date:** 22 October 2026, Africa/Lagos (UTC+01:00).

**UTC interval:** 2026-10-21T23:30:53.147727+00:00 → 2026-10-21T23:30:53.998099+00:00 · **Build:** `mustpayroll-0.3.0-fixed-ca7ffbea67ec` · **Result:** 2 passed / 0 failed.

**Method:** Python 3.14.0 urllib HTTP using exported Postman request bodies; Postman itself was not executed. Each case used a fresh dataset. Create returned 201; import, processing and saved-state reads returned 200. The [API suite](api-test-suite.md) and [collection](postman/MustPayroll.postman_collection.json) retain exact methods/endpoints/payloads for reproduction.

| TC ID | Scenario | Test case | Preconditions | Test data | Steps | Expected result | Actual result | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TC03 | Timezone conversion | Normalize offset timestamps before the opening cut-off | Running fixed build; new employeesOnly records | before-opening $200 at 00:30+01:00; at-opening $100 at 01:00+01:00, 5 Oct 2026. Pay run: 13 Oct 09:00 UTC. | 1. Create records. 2. Import both earnings. 3. Process payroll. | $100 paid once; before-opening earning excluded. | $100 recorded in one payment; only at-opening selected; before-opening excluded. | PASSED |
| TC04 | Duplicate import | Count the same earning ID once | Running fixed build; new employeesOnly records | duplicate-earning, Amara, 150000 cents; 8 Oct 2026 12:00 UTC. Identical ID and body on both imports. | 1. Create records. 2. Import earning twice. 3. Process payroll. | One earning; one $1,500 payment. | Both imports retained one earning; payroll recorded one $1,500 payment. | PASSED |

### Observed saved-state evidence

**TC03**

~~~json
{
  "payrollDatasetId": "63fd68c6-c389-429e-9094-76b327aafce5",
  "recordedPaymentTotalCents": 10000,
  "paymentId": "8e985161-7d6e-4eb5-96c2-fcf7319531b3",
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
  "payrollDatasetId": "05942628-fda0-435b-89d6-74265173a296",
  "recordedPaymentTotalCents": 150000,
  "paymentId": "38681dd5-9aa9-4d25-ab26-5361ea49eee1",
  "earningIds": [
    "duplicate-earning"
  ],
  "paymentCount": 1,
  "earningCount": 1
}
~~~

Collection SHA-256: `ce85376fe65d99a30851908ab2840dfa855f82420724a7e4000682baa8576827`. Supporting setup/probes do not add cases. Human results review and final handoff approval remain separate.
