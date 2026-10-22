# MustPayroll design reference

**Owner:** design/product role, coordinated by the project owner until assigned. **State:** functional inventory; approved visual design source unavailable. **Updated:** 22 October 2026. **Applies to:** current 0.3.0 local-demo screens.

## Design source and access

No Figma file, approved frame set, design handoff/version or design export has been supplied in this repository. This is [CTX-GAP-002](../README.md#known-context-gaps). Do not invent a Figma URL, visual approval, spacing value or interaction requirement from the current application.

When a design is supplied, record its file link, relevant page/frame links, approved handoff/version/date, owner and access requirements here. Any supporting export must identify the same source revision. Tickets should reference that applicable design, rather than silently comparing a historical build with a changing latest design.

## Existing functional screen inventory

This inventory was inspected in [App.tsx](../../MustPayroll/MustPayroll_fixed/src/App.tsx). It describes implemented navigation, not an approved visual specification. Use the normal browser base URL from the environment reference.

| Screen / browser path | Current purpose |
| --- | --- |
| Overview — `/overview` | Review selected-period payroll totals and employee breakdown |
| Employees — `/employees` | Add employees and inspect their masked payment destinations/history |
| Earnings — `/earnings` | Record earnings and approve or reject records |
| Pay runs — `/pay-runs` | Select the Tuesday pay date, process payroll and retry outstanding work |
| Payments — `/payments` | Inspect recorded payments and open receipts |
| Notifications — `/notifications` | Inspect payment-linked delivery states and retry pending delivery |
| Settings — `/settings` | Reset disposable records for a selected pay period |

The established functional journey is record/review earnings → select pay run → process → inspect payment and notification → recover outstanding work. Observable acceptance belongs to the [PRD](../product/PRD.md); the visual layout is not a substitute for its business expectations.

## When a ticket needs a design answer

If the ticket requires an approved visual comparison or an unspecified interaction state, comment on that ticket using the context clarification procedure. Identify the screen/state, what was checked and the design/decision needed. Keep the dependent check waiting; continue independent approved functional checks where possible. The developer can route the question to the responsible product/design owner.
