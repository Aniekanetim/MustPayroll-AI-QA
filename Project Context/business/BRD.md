# MustPayroll business requirements

**Owner:** project owner; product responsibility pending a separately named owner. **State:** consolidated existing local-demo baseline. **Updated:** 22 October 2026. **Applies to:** the 0.3.0 payroll demo and its existing approved functional scope.

## Business problem

A payroll operator needs to pay the correct approved weekly earnings and recover incomplete work safely. Payment recording and employee notification are separate outcomes. A delivery problem must not cause an employee to be paid twice or make an existing payment disappear.

## Users and operational context

The operator records earnings, reviews approval states, selects a pay date, processes payroll and checks payment/notification records. Employees are the recipients represented by the synthetic records; this demo does not implement an employee self-service application. QA and developers use isolated test records to investigate behavior and verify corrections.

This local demo records synthetic USD amounts in a local ledger and uses simulated notification delivery. It does not settle real money or send real employee messages. Its two independent builds allow the same expected behavior to be checked before and after the controlled correction.

## Business objectives

| ID | Objective | Success condition / source |
| --- | --- | --- |
| BO-001 | Pay the right approved amount for the right week | The selected records and calculation satisfy BR01–BR03 |
| BO-002 | Make recovery safe for existing financial records | Payroll retry and notification recovery satisfy BR04–BR06 |
| BO-003 | Give the operator enough information to verify the outcome | The PRD's payroll, payment and notification acceptance checks identify the amount, payment reference and delivery state |

The [business rules](business-rules.md) hold the detailed policy. The [PRD](../product/PRD.md) translates that policy into the existing observable acceptance scenarios.

## Scope and boundaries

The established business scope is approved weekly earnings, their pay-period selection, one employee-period payment, notification ordering and safe local recovery. The application also contains employee records, approval/rejection controls, payment receipts and disposable-period reset facilities; their current implementation is indexed in the technical/design references. Additional detailed acceptance requests for those facilities must be grounded in the ticket's supplied requirements.

Real bank settlement, external notification receipt, tax/statutory payroll calculations, a full HR platform, authentication/account changes, concurrent workers and process-crash guarantees are outside the verified scope. No production incident frequency, financial-loss amount or service-level target is asserted.

## Provenance and change

This BRD consolidates the existing [intent and risk selection](../../QA/Quality%20assurance/intent.md), BR01–BR06 and the accepted RUN-002 scope linked from the [context index](../README.md). It is not an externally supplied stakeholder BRD. Changing business objectives or boundaries requires an actual owner decision and corresponding requirement/ticket updates; this consolidation adds no product behavior.
