# Payroll business rules

**Owner:** project owner; product responsibility pending a separately named owner. **State:** existing BR01–BR06 baseline, migrated without changing rule content. **Updated:** 22 October 2026. **Applies to:** the 0.3.0 local payroll demo. Record the applicable context revision and application build on each ticket as described in the [context index](../README.md).

## Context

MustPayroll is a local weekly-payroll demo. An operator records employee earnings, approves or rejects them, then processes a selected pay date. Payment and notification are different operations: delivery failure must not undo or repeat a payment.

The role brief permits an equally concrete alternative to its rewards-service example. This fixture uses approved USD earnings instead of ten test credits per task. The weekly cut-off, deduplication, retry and notification requirements are retained.

## Requirements

| ID | Rule | Verification |
| --- | --- | --- |
| BR01 | Simulate a selected Tuesday at 09:00 UTC. Pay the previous Monday 00:00 inclusive to the next Monday 00:00 exclusive. | TC01, TC02, TC03 |
| BR02 | Sum only approved earnings in that period. Pending and rejected earnings do not block approved pay or contribute money. | TC01 |
| BR03 | Count an earning ID once within its payroll dataset, including a repeated import. Store USD amounts as integer cents; 150000 means $1,500.00. | TC04 |
| BR04 | Record one payment per employee per period. Every payroll retry must preserve the original payment ID, amount and destination. | TC05, TC07 |
| BR05 | Attempt notification only after a successful payment. A failed payment creates neither payment nor notification work. | TC05, TC08 |
| BR06 | Save payment and notification work together. A delivery failure leaves the successful payment and a Pending notification. Retry delivery without another payment. | TC06, TC07, TC08 |

## Flow and recovery

Record earning → approve or reject → select Tuesday → select approved earnings inside the cut-off → freeze employee totals → record payment and notification work → attempt delivery.

If payment fails, retry payroll for the same period and frozen totals. If only notification fails, retry pending notifications. A safe payroll retry must also preserve existing payments. Keep the payment reference when escalating; do not issue a new payment to repair a notification.

## Assumptions and limits

- Three synthetic employees and masked bank destinations are available. Amounts are test USD, not converted historical naira values.
- The operator is trusted. Authentication, authorization and login/account changes are not implemented or verified.
- Destination details and approved totals are frozen when the period is processed. Later corrections belong to a later open period. Tests do not alter bank details mid-run.
- Pay dates use UTC and the selected instant, regardless of the workstation clock. No live scheduler is exercised.
- Notification delivery is a local stub with a one-shot failure control; Sent means the stub accepted delivery, not that a real inbox received it.
- Sequential local retries are in scope. Parallel workers, process crashes, production bank callbacks and real delivery-provider behavior require separate validation.
