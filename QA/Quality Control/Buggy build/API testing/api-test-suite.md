# Buggy build: API suite

Import [the Postman collection](postman/MustPayroll.postman_collection.json). Set `baseUrl` to `http://127.0.0.1:4275`. Send **Check build** and retain `build.id`. For each case, send its numbered requests in order. After creating test records, copy response `payrollDatasetId` into the collection variable and Save. No scripts or runner are required.

All requests with a body use **Body → raw → JSON** and `Content-Type: application/json`. `{{payrollDatasetId}}` is the ID returned by the create request. Amounts are integer USD cents.

| TC ID | Scenario | Test case | Preconditions | Test data | Steps | Expected result | Actual result | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TC03 | Timezone conversion | Normalize offset timestamps before the opening cut-off | Running buggy build; new employeesOnly records | Payload below; 13 Oct 09:00 UTC | 1. Create records. 2. Import both earnings. 3. Process payroll. | $100 paid once; before-opening earning excluded. | See execution results | NOT RUN |
| TC04 | Duplicate import | Count the same earning ID once | Running buggy build; new employeesOnly records | Payload below; identical ID and body on both imports | 1. Create records. 2. Import earning twice. 3. Process payroll. | One earning; one $1,500 payment. | See execution results | NOT RUN |

## Shared create and process requests

**POST** `{{baseUrl}}/api/payroll-datasets` → **201 Created**:

```json
{
  "testDataPreset": "employeesOnly"
}
```

For either case, import at **POST** `{{baseUrl}}/api/payroll-datasets/{{payrollDatasetId}}/earnings` → **200 OK** using its payload below. Then process at **POST** `{{baseUrl}}/api/payroll-datasets/{{payrollDatasetId}}/pay-runs` → **200 OK**:

```json
{
  "scheduledPayRunAt": "2026-10-13T09:00:00.000Z",
  "simulatedProcessingAt": "2026-10-13T09:00:00.000Z"
}
```

## TC03: offset timestamps

```json
{
  "earnings": [
    {
      "earningId": "before-opening",
      "employeeId": "emp-001",
      "description": "Weekly project earnings",
      "earnedAt": "2026-10-05T00:30:00+01:00",
      "amountCents": 20000,
      "approvalStatus": "approved"
    },
    {
      "earningId": "at-opening",
      "employeeId": "emp-001",
      "description": "Weekly project earnings",
      "earnedAt": "2026-10-05T01:00:00+01:00",
      "amountCents": 10000,
      "approvalStatus": "approved"
    }
  ]
}
```

`00:30 +01:00` is 4 Oct 23:30 UTC, before opening. `01:00 +01:00` is 5 Oct 00:00 UTC, exactly opening. Confirm response `recordedPaymentTotalCents: 10000` and a single payment containing only `at-opening`.

## TC04: identical earning import

Send this exact body **twice** before processing:

```json
{
  "earnings": [
    {
      "earningId": "duplicate-earning",
      "employeeId": "emp-001",
      "description": "Weekly project earnings",
      "earnedAt": "2026-10-08T12:00:00Z",
      "amountCents": 150000,
      "approvalStatus": "approved"
    }
  ]
}
```

Confirm only one `duplicate-earning` in `earnings`, one payment and `recordedPaymentTotalCents: 150000`. No duplicate can increase the total.

[Executed results](api-testing-results.md) identify the tool actually used. Importing the collection does not establish an executed Pass.
