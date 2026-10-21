# intent.md

## Business problem

A payroll retry is a recovery action. If an employee has already been paid, a delayed or failed notification must not make that payment eligible again. A duplicate would require reconciliation and could lead an operator to repeat the same harmful recovery action.

## Alternatives and priority

Likelihood describes a plausible trigger, not employer incident frequency. No production incident history or financial-loss figures are claimed.

| Rank | Possible failure | User and operational impact | Likelihood / uncertainty | Investigation effort |
| --- | --- | --- | --- | --- |
| 1 | Payroll retry pays again after notification failure | Duplicate financial effect; reconciliation and employee support | Plausible when delivery fails and an operator retries; production rate unknown | Low–medium: one employee, one pay period, one controlled delivery failure |
| 2 | Wrong Monday cut-off selects an earning twice or omits it | Overpayment or missed pay at the boundary | Recurs at weekly boundaries if comparison is wrong; no incident data | Low: exact timestamps and adjacent periods |
| 3 | Re-imported earning ID increases approved pay | Duplicate input becomes duplicate pay | Plausible with import retries; actual frequency unknown | Low: repeat an identical earning ID before payroll |

## Selected scope

Investigate the first failure deeply. Keep boundary and duplicate-input checks as adjacent regression, rather than introduce several unrelated defects. The buggy build deliberately uses notification success to decide whether payment is complete. The corrected reference uses committed payment identity. This is a controlled local failure, not an alleged production incident.

## How AI is used

Codex reviews the rules, operates the browser, inspects API responses and database behavior, tests causal explanations, adapts the TypeScript page objects and runs the same expectations against both builds. The investigation records those actions and their limits. Candidate review and final release judgment must be recorded separately from agent execution.
