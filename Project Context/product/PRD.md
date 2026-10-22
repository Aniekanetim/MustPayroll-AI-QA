# MustPayroll product requirements

**Owner:** project owner with QA/development input; no separate product owner has been named. **State:** consolidated existing functional baseline. **Updated:** 22 October 2026. **Applies to:** the 0.3.0 weekly USD payroll scope.

## Product goal and flow

An operator records and reviews earnings, selects the relevant pay date, processes approved payroll and checks payment and notification outcomes. Recovery must complete outstanding work while preserving an already recorded payment.

Record earnings → approve or reject → select the pay period → process payroll → inspect payment and notification → recover outstanding work if needed.

The [BRD](../business/BRD.md) explains the business purpose. [BR01–BR06](../business/business-rules.md#requirements) define policy and remain the authoritative source for calculations, boundaries, identity and recovery.

## Acceptance criteria

These identifiers organize the requirements already used in the accepted eight-case scope; they add no new pass criteria or retrospective test execution. Ticket-specific extensions require an applicable owner decision and workflow review.

| ID | Feature / condition | Required observable outcome | Rule basis | Existing verification |
| --- | --- | --- | --- | --- |
| AC-PAY-001 | Process a selected pay run with approved, pending, rejected and next-period earnings | Only approved in-period records contribute to the employee amounts and recorded total; pending/rejected records stay unpaid without blocking approved pay | BR01, BR02 | TC01, UI |
| AC-PAY-002 | Process earnings at the opening and closing boundaries, then the next period | Opening-boundary earnings belong to the first period; the excluded closing-boundary earning belongs only to the next period | BR01 | TC02, UI |
| AC-PAY-003 | Import timestamp inputs with explicit timezone offsets near the opening boundary | Convert to the applicable UTC instant before selection; the opening earning is included and the earlier earning excluded | BR01 | TC03, API |
| AC-PAY-004 | Import an identical earning ID and body twice before processing | One earning contributes once; repeated input does not increase approved or recorded pay | BR03 | TC04, API |
| AC-PAY-005 | Payment recording fails and the operator retries the same payroll | The failed attempt creates no payment or notification; the retry records the eligible payment once | BR04, BR05 | TC05, UI |
| AC-PAY-006 | Payment succeeds, delivery fails and the operator retries notifications only | Preserve the original payment and linked notification identities; the pending delivery can become Sent without another payment | BR04, BR06 | TC06, UI |
| AC-PAY-007 | Payment succeeds, delivery fails and the operator retries the same pay run | Preserve one employee-period payment, its ID, amount and destination; recover the linked notification without duplicating the financial effect | BR04, BR06 | TC07, UI |
| AC-PAY-008 | Payment processing succeeds without a controlled fault | Record one Paid payment and its linked notification work; attempt delivery after the payment commit and record successful stub acceptance as Sent | BR05, BR06 | TC08, UI |

The [fixed UI suite](../../QA/Quality%20Control/Fixed%20build/Functional%20testing/functional-test-suite.md) and [fixed API suite](../../QA/Quality%20Control/Fixed%20build/API%20testing/api-test-suite.md) provide concrete inputs and steps. The [buggy UI suite](../../QA/Quality%20Control/Buggy%20build/Functional%20testing/functional-test-suite.md) and [buggy API suite](../../QA/Quality%20Control/Buggy%20build/API%20testing/api-test-suite.md) use the same business expectations. Actual outcomes remain in their separate result records.

## Operator-visible outcomes

For the selected period, the operator can compare approved and recorded payroll and inspect employee payment records. A receipt identifies the payment reference, amount and masked destination. Notifications identify the linked payment and delivery state. A Sent state means local stub acceptance, not real inbox receipt; the business-rule assumptions apply.

The existing screens/journeys are indexed in the [design reference](../design/design-reference.md). Current endpoints, test controls and data fields are in the [technical reference](../technical/system-and-api-reference.md). Implementation inventory does not create additional approved acceptance criteria.

## Quality requirements and open scope

The established criteria above cover the selected functional behavior. Agreed performance workloads/thresholds, accessibility targets, usability-study criteria and production security requirements have not been supplied. A ticket requesting one of those testing types must establish its measurable test basis through the existing workflow; do not invent a target or claim coverage from these functional results.

Approved visual comparison, new API/provider guarantees and broader business scope are recorded in the [context-gap register](../README.md#known-context-gaps). Ask on the affected ticket when a gap prevents a valid judgment. Independent authorized checks can continue.

## Provenance and revisions

The acceptance mapping is consolidated from BR01–BR06 and the previously accepted RUN-002 packet, not from the buggy application's response. The [context index](../README.md) links the pre-migration baseline and actual review history. Record the applicable context revision and AC IDs on each ticket; changed requirements return to the affected workflow review point.
