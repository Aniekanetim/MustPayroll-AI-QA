# MustPayroll system and API reference

**Owner:** developer/technical role, coordinated by the project owner until assigned. **State:** source-inspected implementation reference. **Updated:** 22 October 2026. **Applies to:** the existing 0.3.0 builds; source baseline `fb96cef4e1f1930a3557aeaf7548a70f670c0372`.

## Components and expectations

The React/TypeScript browser application calls a local Node HTTP service. Each independent build stores records in its own SQLite database. Payment recording is a local ledger operation; notification delivery is a stub. A payroll dataset isolates a set of test records and is not a user-facing workspace.

The [environment reference](environments-and-builds.md) identifies the ports, build IDs and setup. The [business rules](../business/business-rules.md) and [PRD](../product/PRD.md) define expected behavior. This route/data inventory describes implementation; an HTTP success response alone does not prove business correctness, particularly in the deliberately buggy build.

Sources: [HTTP routes](../../MustPayroll/MustPayroll_fixed/server/index.mjs), [service and data mapping](../../MustPayroll/MustPayroll_fixed/server/payroll.mjs), [browser data types](../../MustPayroll/MustPayroll_fixed/src/payroll.tsx). Both builds expose the same route vocabulary.

## Browser and API addresses

Normal browser example: `http://127.0.0.1:4276/pay-runs?payrollDatasetId=<returned-id>`. API example: `http://127.0.0.1:4276/api/payroll-datasets/<returned-id>`. Use port 4275 for buggy. Replace `<returned-id>` with the actual `payrollDatasetId` from creation; the same ID belongs only to the build that created it.

API requests with a body use `Content-Type: application/json`. Paths below are appended to the chosen application's base URL. `{payrollDatasetId}` and `{earningId}` are returned record IDs, not literal request text.

| Method and path | Request / purpose | Successful response |
| --- | --- | --- |
| GET `/api/health` | Identify application, storage/schema and build | 200; includes `build.id` and `build.sourceSha256` |
| POST `/api/payroll-datasets` | Create isolated synthetic records; body contains `testDataPreset` | 201; payroll state including new `payrollDatasetId` |
| GET `/api/payroll-datasets/{payrollDatasetId}` | Read state; optional query `scheduledPayRunAt` selects period totals | 200; payroll state |
| POST `/api/payroll-datasets/{payrollDatasetId}/employees` | Add `name`, `role`, `department`, `bank`, `accountEnding` | 201; updated state |
| POST `/api/payroll-datasets/{payrollDatasetId}/earnings` | Import an `earnings` array | 200; updated state |
| POST `/api/payroll-datasets/{payrollDatasetId}/earnings/{earningId}/approve` | Approve an eligible record; body `{}` | 200; updated state |
| POST `/api/payroll-datasets/{payrollDatasetId}/earnings/{earningId}/reject` | Reject an eligible record; body `{}` | 200; updated state |
| POST `/api/payroll-datasets/{payrollDatasetId}/pay-runs` | Process or retry with `scheduledPayRunAt` and matching `simulatedProcessingAt` | 200; state for that pay run |
| POST `/api/payroll-datasets/{payrollDatasetId}/notifications/retry-pending` | Retry existing pending notifications across this dataset; body `{}` | 200; updated state |
| POST `/api/payroll-datasets/{payrollDatasetId}/test-controls/next-failure` | Test preparation only: arm `notificationDelivery` or `paymentRecording` through `failureType` | 200; updated state |
| POST `/api/payroll-datasets/{payrollDatasetId}/pay-periods/reset` | Remove disposable records for the period identified by `scheduledPayRunAt` | 200; updated state |

Known presets are `standardPayroll`, `oneApprovedEarning`, `payPeriodBoundaryEarnings` and `employeesOnly`. Controlled failures are single-use; arm them before the relevant payment/delivery attempt. They are technical fixture preparation, not an operator-facing feature or an additional product test.

### Request examples

Create a one-earning fixture with POST `/api/payroll-datasets`:

```json
{
  "testDataPreset": "oneApprovedEarning"
}
```

For POST `.../pay-runs`, the selected and simulated instants must match. Example request, not an execution record:

```json
{
  "scheduledPayRunAt": "2026-10-13T09:00:00.000Z",
  "simulatedProcessingAt": "2026-10-13T09:00:00.000Z"
}
```

Use the existing [fixed API suite](../../QA/Quality%20Control/Fixed%20build/API%20testing/api-test-suite.md) or [buggy API suite](../../QA/Quality%20Control/Buggy%20build/API%20testing/api-test-suite.md) for full reproducible requests and exported Postman collections. They remain QA execution/reproduction material rather than a second product contract.

## Data meanings

| Field / relationship | Meaning |
| --- | --- |
| `payrollDatasetId` | Isolated record set used for all subsequent requests in that example |
| Earning: `earningId`, `employeeId`, `description`, `amountCents`, `earnedAt`, `approvalStatus` | An employee earning; source-normalized UTC instant and current approval state |
| `amountCents`, `approvedTotalCents`, `recordedPaymentTotalCents` | Integer USD cents; interpret according to BR03 |
| `payPeriod.start`, `payPeriod.end`, `payPeriod.scheduledPayRunAt` | Selected period boundaries and simulated scheduled pay instant |
| Payment: `paymentId`, `employeeId`, `payPeriodStartsAt`, `amountCents`, `bank`, `accountEnding`, `earningIds` | Recorded financial identity, period, amount, masked destination and included earnings |
| Notification: `notificationId`, `paymentId`, `deliveryStatus`, `deliveryAttemptCount`, `lastDeliveryError` | Delivery work linked to a payment; current states are `pending` and `sent` |
| `isPayPeriodLocked` | Whether a pay run has been recorded for the selected period |
| `employeePayrollSummaries` | Selected-period employee totals and payment counts |
| `payments`, `notifications` | Dataset-wide records; match `payPeriodStartsAt` when comparing one period |
| `pendingNotificationCount` | Pending notifications across the dataset's periods |
| `auditEvents` | Saved local events with `eventType`, employee, details and creation time |

Expected period, eligibility, identity and recovery semantics remain in BR01–BR06. A test result records its actual observed fields separately.

## Controlled difference and contract limits

The [buggy policy](../../MustPayroll/MustPayroll_buggy/server/payment-policy.mjs) treats Sent notification state as payment completion. The [fixed policy](../../MustPayroll/MustPayroll_fixed/server/payment-policy.mjs) checks the committed payment; fixed storage also enforces employee-period uniqueness. Both save payment/notification work together. The retained [PAY-001 report](../../QA/Quality%20Control/bug_report/duplicate-payment-after-notification-failure.md) contains the causal investigation and verification.

The source returns JSON error bodies through `error`; validation/status behavior can be inspected in the service/routes. No separate approved external API specification, bank integration or delivery-provider contract was supplied. A new guarantee, error-message contract or provider behavior requested by a ticket needs its own agreed test basis; see CTX-GAP-004 in the context index. Do not infer a requirement from current code alone.
