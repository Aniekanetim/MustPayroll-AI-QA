# AI-led QA workflow with human review

## Purpose and ownership

The agent carries out the QA work. The QA engineer directs that work, reviews its evidence and approves decisions throughout the cycle. This workflow applies to API, UI/functional, usability, performance, accessibility and other testing types. MustPayroll is the current test application; the workflow can be applied to another product.

| Responsibility | AI agent | QA engineer |
| --- | --- | --- |
| Understand the product | Review sources, connect the flow, identify conflicts and propose scope | Confirm the business objective, requirements and priorities |
| Plan and design | Propose risks, cases or exploratory tasks, test data, tools and acceptance criteria | Challenge assumptions; approve or revise the plan and expected behavior |
| Execute and investigate | Operate tools, inspect responses/records, reproduce failures and gather evidence | Review representative evidence and investigate weak or disputed conclusions with the agent |
| Report and retest | Produce actionable reports, confirm causes, propose fixes and verify an available correction | Approve findings, retest scope and defect disposition |
| Release and handoff | Summarize results, limits, residual risk and a readiness recommendation | Make the final scoped QA decision and accept or reject the handoff |

Approval is an evidence-based QA decision. It does not require the QA engineer to repeat every agent action manually, and it does not turn unverified claims into facts. Engineering owns product-code corrections unless implementation is separately delegated to an agent.

## Start with the testing request

If the testing type has not been stated, ask: **“What kind of testing are we doing?”** Offer relevant options or let the QA engineer describe a combined scope. Do not ask again when the request or an existing approval already answers it.

Then establish the product flow, target build/environment, data or account, objective, expected-behavior sources, completion criteria and operating limits. Propose sensible defaults for review; ask only about missing decisions that affect validity. A request for performance testing, for example, needs an agreed workload and thresholds before a passing result can be judged.

The workflow is adaptive. A cycle may combine several testing types or change type as the QA engineer redirects the work. Keep the same product context, relevant requirements and recorded progress. Add or revise only the affected method, acceptance criteria and approval scope; preserve completed results and record any unfinished checks. Selecting UI/API now does not prevent a usability or performance segment later.

## Review and execution cycle

| Gate | What the agent prepares | What the QA engineer decides | What follows approval |
| --- | --- | --- | --- |
| G1 — Scope | Testing type, business risk, flow, source requirements, environment/build, data, assumptions and exclusions | Approve scope and the behavior/quality standard being tested | Agent completes the test design |
| G2 — Test design | Cases or exploration tasks, inputs, expected outcomes, traceability, tools/scripts, run limits and evidence format | Approve the design and authorize the bounded execution | Agent executes, captures actual outcomes and investigates failures |
| G3 — Findings | Results and evidence, reproducible defects, severity, confirmed cause or clearly marked hypothesis, proposed correction and gaps | Approve findings or request further investigation | Agent prepares targeted retest and recovery checks |
| G4 — Retest | Available fix/build, retest cases, adjacent regression and the original failure to preserve | Approve retest scope; code changes need separate authorization | Agent retests the correction and records a separate result |
| G5 — Release/handoff | Before/after evidence, completion against approved criteria, residual risks and a readiness recommendation | Approve, approve within stated limits, or reject the scoped handoff | Agent records the decision, closes the work item or queues follow-up |

Prepare a concrete review packet before asking for approval: summarize the decision, link the exact work/build and evidence, explain unresolved risks, and state what approval authorizes next. A concise human instruction can approve a clearly identified packet. Record what it actually covers; silence and elapsed time are not approval.

The agent works autonomously inside the approved scope. Routine navigation, isolated test setup, investigation and report preparation do not need repeated permission. A new testing type, changed requirement, materially expanded run or newly consequential action returns to the affected gate. An approved retest on a new fixed build does not require restarting unrelated gates.

## Adapt execution to the testing type

| Testing type | Agent execution | Review criteria |
| --- | --- | --- |
| API | Send requests; inspect status, payloads, saved state and error/recovery behavior | Exact endpoint, method, data, expected contract and observed response |
| UI/functional | Operate real browser controls; inspect visible outcomes and corroborating records | User journey, business rule, persisted result and recovery |
| Usability | Walk through representative tasks and report friction with context | User goal, severity rationale and evidence; expert inspection is distinct from research with actual users |
| Performance | Run an approved repeatable workload and measure behavior | Environment, load model, metrics, thresholds and limitations; local measurements do not establish production performance |
| Accessibility or another type | Propose the relevant method, tools and evidence first | Agreed criteria and coverage limits; a tool score alone does not prove full conformance |

Support for a testing type does not mean it has been executed. Select the types needed for the approved objective; this Quest does not require adding every category.

## Records and status

Read the team-owned [shared context](../../unified_project_context.md) before a cycle. Keep requirements, cases, findings, evidence and fix/retest records connected by their IDs. Preserve the original failure when a fix becomes available. Update detailed records, shared context and the ignored assistant mental model after material changes.

Track **work status**, **test outcome** and **human review** separately:

- Work: `not_started`, `in_progress`, `blocked`, `redo`, `done` or `canceled`.
- Test: `Not run`, `Pass`, `Fail`, `Partial` or `Blocked`, supported by observed evidence.
- Human review: `Pending`, `Approved`, `Changes requested` or `Rejected`, with the reviewer, date, exact scope and decision.

A completed execution may contain failed cases. Approving a defect report does not close the defect. An AI readiness recommendation is not human release approval. Incomplete or blocked validation remains visible even if the handoff is approved with limits.

## Current review record

**Operating model:** confirmed by Aniekan on 21 October 2026: automate the standard QA workflow with the human reviewing and approving it end to end, beginning with the testing-type intake when needed.

**Previous run — RUN-001:** already executed under the earlier authorization. Six browser cases and two direct-HTTP cases per build produced buggy 7 Pass / 1 Fail and fixed 8 Pass. Those observations remain valid records; staged human approval was not recorded. They are available for review and are not retroactively marked approved by the workflow clarification.

**Current cycle — RUN-002:** Aniekan selected payroll regression across UI and API on 21 October 2026. He also confirmed that the workflow must adapt to usability, performance, accessibility, security or another testing type when required. Scope/design packet v1 below is ready for review; the type selection is not yet execution approval.

| Item | Current state | Evidence / decision |
| --- | --- | --- |
| RUN-001 execution | Done; human review Pending | [Investigation](../investigation.md) and linked results |
| RUN-002 testing types | Confirmed: payroll regression, UI + API | User selected this starting scope; other types remain available within the adaptive workflow |
| RUN-002 G1 scope | Pending QA review | Scope/design packet v1 below |
| RUN-002 G2 design / execution | Pending QA review | Eight-case design ready; buggy execution awaits approval |
| RUN-002 G3 findings | Not started | Requires approved execution and observations |
| RUN-002 G4 retest | Not started | Required if a correction/retest is in scope |
| RUN-002 G5 handoff | Not started | Requires the reviewed evidence and QA decision |

For each decision, append the reviewer/date, gate, approved packet revision or build, and requested changes here. Copy the essential current decision into the shared context. Approval applies only to that identified scope; do not infer approval for later work.

## RUN-002: scope and test-design packet v1

**Decision requested:** approve G1 scope and G2 design, authorizing the agent to execute the eight cases on the buggy build. The agent will then present observed findings for G3 review. Fixed-build retesting is planned for G4 after review of the findings and correction.

### Objective and oracle

Verify weekly payroll selection, payment identity and notification recovery against BR01–BR06 in [business rules](business_rules.md). The main risk is duplicate employee-period payment when delivery fails and payroll is retried. The established rule remains one payment, regardless of notification state. Prior RUN-001 results are reference evidence, not a substitute for the new execution.

### Environment and data

- Buggy source: `mustpayroll-0.3.0-faulty-eb7f01eeae99`; fixed reference for later retest: `mustpayroll-0.3.0-fixed-ca7ffbea67ec`.
- Both served build identities matched their local manifests in the read-only environment preflight on 21 October 2026.
- Browser application ports: 4275 / 4276. The isolated Playwright services use 4284 / 4285 and separate test databases.
- Use a new payroll dataset per case. Amounts are synthetic USD cents. Default pay instant: 13 Oct 2026, 09:00 UTC; covered period: 5 Oct 00:00 inclusive → 12 Oct 00:00 exclusive. TC02 also verifies the adjacent period paid on 20 Oct.
- Fault controls are one-shot payment-recording or notification-delivery failures. They set a precondition; the browser still performs payroll and recovery actions.

### Cases and acceptance criteria

| Case | Type | Test objective | Expected result |
| --- | --- | --- | --- |
| TC01 | UI/functional | Pay approved current-period earnings; exclude Pending, Rejected and next-period records | $4,350 across Amara $1,500, Daniel $2,000 and Zara $850; excluded records do not contribute |
| TC02 | UI/functional | Verify inclusive opening, exclusive closing and adjacent pay periods | $400 in each relevant week; the closing-boundary earning is paid only in the next period |
| TC03 | API | Convert offset timestamps before selecting earnings | $100 at the opening boundary is paid; the $200 before opening is excluded |
| TC04 | API | Repeat an identical earning import | One earning ID and one $1,500 payment |
| TC05 | UI/functional | Fail payment recording and retry payroll | First attempt creates no payment or notification; retry records one $1,500 payment |
| TC06 | UI/functional | Recover a failed notification through delivery-only retry | Original $1,500 payment and notification IDs retained; notification Pending → Sent |
| TC07 | UI/functional | Retry payroll after payment succeeds and delivery fails | One $1,500 payment; original payment/notification IDs retained; notification Sent |
| TC08 | UI/functional | Process payroll with successful notification delivery | One Paid payment and one linked Sent notification; payment commits before delivery attempt |

Detailed inputs and steps: [buggy UI suite](../Quality%20Control/Buggy%20build/Functional%20testing/functional-test-suite.md) and [buggy API suite](../Quality%20Control/Buggy%20build/API%20testing/api-test-suite.md). Their expected results remain unchanged for the fixed retest.

### Execution and review limits

Use the existing TypeScript POM project for the six browser cases and the exported Postman request definitions for the two API cases. Record the tool actually used for API execution; a collection export is not proof of a Postman run. Supporting API setup does not add cases to the count.

Execute each case once on fresh records, retain unexpected failures and investigate them rather than change expectations to match the application. A successful verification wrapper can confirm a known buggy failure signature while TC07 remains Failed. Preserve RUN-001 and record RUN-002 separately with build, date, inputs, actual outcomes, evidence and agent identity.

This packet covers local functional regression. It does not add load, security, accessibility or usability execution. Those types use the same workflow when selected, with their own valid criteria. The current product-code fixture is reused; a newly needed product correction requires a separate implementation decision.

**Completion for G2:** eight recorded buggy-build outcomes, reproduced failure evidence and an actionable report including severity, root cause or a marked unresolved hypothesis, proposed fix and release blockers. Present that packet for G3 review before fixed-build retesting. G5 remains the QA engineer's release/handoff decision.
