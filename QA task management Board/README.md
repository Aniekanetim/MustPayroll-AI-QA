# QA task management board

This board gives the AI QA agent and developers tickets to work on. Each ticket is a Markdown file; the folder containing it is its current board status. The [QA workflow](../QA/Quality%20assurance/qa-workflow.md) defines how the AI performs the work and obtains human decisions.

[Project Context](../Project%20Context/README.md) supplies shared requirements, acceptance criteria, design references, business rules and technical information. The board records work and conversations; context documents establish the applicable product expectations. Read both before acting on a ticket.

## Where work belongs

| Folder | Who checks it | Purpose |
| --- | --- | --- |
| Ready for QA | AI QA | Build or feature assignments awaiting testing, review or resolution of linked blockers |
| Dev Todo | Developer | Newly reported defects, including new regressions |
| Tested-Ok | Completed work | Tickets that meet their completion criteria and required QA review |
| Retest | AI QA | Existing bug tickets returned with a developer fix or refutation |
| Rework | Developer | Existing bug tickets whose original failure persists after retesting |

The live board starts empty. Completed RUN-001/RUN-002 evidence and PAY-001 remain in their existing locations; they are not new work. `.gitkeep` files retain empty folders in Git and are not tickets. Templates below are reference material, not queued work.

## Create and maintain a ticket

Use a unique ID and a descriptive filename: `QA-001-payroll-recovery.md` for a testing assignment, or `BUG-001-payment-duplicated-on-retry.md` for a bug. Choose the next unused number across all five folders. Preserve the ID and filename through moves. One ticket exists in one folder at a time.

Create assignments in Ready for QA using the build/feature template below. Describe the testing objective and provide the exact target and acceptance criteria. Link the relevant Project Context sources, their Git revision and BR/AC IDs; identify an applicable design handoff or the missing reference. Record the served build separately. Testing types can include UI, API, usability, performance, accessibility or security; the agent selects methods through the existing workflow rather than assuming every assignment is payroll regression.

When the AI finds a defect, it creates a separate ticket in Dev Todo using the bug template. Link the new bug and its parent assignment in both directions. Future bug tickets are the authoritative reports; link their supporting suites and results rather than maintaining duplicate reports elsewhere. Existing reports remain preserved.

Ticket references include stable IDs. When a file moves, keep its ID, contents and dated entries, and update incoming relative navigation links to its new path. Check the destination first; never overwrite another ticket. Record ownership and workflow progress in the ticket. These details do not add board statuses.

## Initial testing and defect reporting

1. Read the complete assignment and Project Context index. Identify the build, testing objective and applicable source revisions/criteria; resolve necessary gaps through the clarification procedure below. Prepare the existing workflow's scope/design/readiness briefing.
2. Execute only the work covered by the recorded human authorization. Keep actual outcomes, inferences and human decisions distinct.
3. Open a new Dev Todo ticket for each distinct defect. Record reproduction, expected/actual behavior, evidence, severity, supported cause or hypothesis, proposed correction and release impact. Link its parent and relevant test case.
4. Keep the parent assignment in Ready for QA while blocking findings or required decisions remain. Record its linked blockers and next action; do not repeatedly run the same tests against an unchanged build.
5. When the assignment meets its completion criteria and required human QA decision, move it to Tested-Ok. Explicitly accepted nonblocking limitations remain recorded.

## Developer response, retesting and regression

Developers check the unanswered-question index below as well as Dev Todo and Rework. They append a fix or refutation, its explanation and the applicable build/commit to the existing bug ticket, then move that ticket to Retest. A refutation cites the relevant requirement or decision; QA compares it with the applicable Project Context sources. Missing or conflicting expectations use the clarification procedure, with product/design questions referred to their responsible owner. Moving the ticket does not establish an accepted requirement change or a passing result.

The AI QA reads the developer response, obtains the existing workflow's retest authorization, checks the original failure and runs relevant regression against the identified build.

| Verification outcome | Action |
| --- | --- |
| Original failure persists | Append the failed retest and evidence; move the same bug ticket to Rework after the required findings review |
| Original failure is resolved | Record verification and the required scoped QA decision; move the bug ticket to Tested-Ok |
| Regression discovers a separate defect | Create a new bug ticket in Dev Todo and classify it as Regression where supported |

A regression ticket identifies the affected behavior, reproduction, expected/actual results, new build, originating fix/ticket and previous passing baseline. If a prior pass or causal link is not established, state that uncertainty instead of inventing it. Avoid duplicate tickets for the same existing finding; append new observations to that ticket.

An original bug can reach Tested-Ok while a separate regression remains open. Link the regression to its parent assignment and originating fix. The parent remains in Ready for QA until blocking findings are resolved and its overall readiness decision is accepted. Do not interpret one fixed bug as approval of the entire build.

## AI check-in procedure

1. Read [AGENTS.md](../AGENTS.md), [shared progress](../unified_project_context.md), the [Project Context index](../Project%20Context/README.md), this board README and the [QA workflow](../QA/Quality%20assurance/qa-workflow.md).
2. Inspect ticket Markdown files directly inside Ready for QA and Retest. Read their ownership, waiting reason, linked blockers, clarification responses and existing decisions before selecting work. Consult the ticket's applicable source revisions/BR/AC IDs, rather than assuming the latest implementation defines expected behavior.
3. Resume eligible unfinished work owned by this QA chat first. Otherwise choose an unclaimed actionable ticket across both queues by priority P0, P1, P2, P3, then oldest creation time, then ticket ID. If priority or essential input is missing, request that information once and record what is needed.
4. Respect another worker's claim. Before claiming, re-read the ticket and record the owner, claim time, workflow checkpoint and next action. Handle one ticket at a time and verify that its ID is not duplicated elsewhere on the board.
5. Follow the workflow from the recorded checkpoint. Reuse an applicable scoped approval; explain any changed scope before seeking a new decision. For a necessary missing/conflicting source, append and index one clarification on the existing ticket, then wait only on affected work. Board placement is not execution authorization.
6. When a human decision is required, prepare the complete conversational briefing, record the requested gate/build/scope and waiting reason, and stop dependent execution. A later check-in does not treat silence as approval or resend the same unanswered request. Resume when an actual response or relevant change is available.
7. Create or move tickets according to the rules above, preserve all prior entries, refresh links and update the parent assignment's blockers and next action. Record completed checks, observed results and actual decisions.
8. Report meaningful findings, movements or decisions needed. If no ticket is actionable, leave all files unchanged and end the check-in. Do not create empty-run commits or invent work.

Ownership, waiting reason and workflow checkpoint describe ongoing work inside a folder. They do not replace the folder's board status. The QA agent does not implement product fixes unless separately authorized; it does not act as the developer merely because Dev Todo contains tickets.

## Clarification comments and developer visibility

If a ticket cannot be answered from its linked sources and [Project Context](../Project%20Context/README.md), leave a dated comment on that existing ticket for the developer. Give each question a stable ticket-local ID, such as Q-001. Link the exact source section/revision checked, the gap or conflict, the affected check and the answer or responsible owner needed. Use this structure:

```text
Q-<number>: <short question title>
Raised: <date/time with timezone; actor>
Question: <one concrete question>
Checked: <source link, section/BR/AC ID and Git/design revision>
Gap/conflict: <missing, inaccessible or inconsistent information>
Affected check: <case/criterion and why it cannot be judged>
Needed from developer: <answer, source or referral to its responsible owner>
Next action: <dependent work waiting for the reply>
```

Record the waiting reason and next action in the ticket's fields. Keep it in its current folder; a clarification is neither a new status nor automatically a product defect. Independent work may continue only within its existing authorization. A later check-in reads the original question and any responses; it does not repeat an unanswered request.

### Unanswered developer questions

**Current state: none.** Keep this summary accurate when adding or resolving entries. When raising a question, add a row here linking directly to the original ticket comment. Developers check this index during their routine board visit, including questions on Ready for QA or Retest tickets. A local comment does not send a notification. This index exposes the conversation without duplicating it or requiring another status folder.

| Ticket / question ID | Original comment | Needed from | Affected work | Raised |
| --- | --- | --- | --- | --- |

Append the actual answer to the ticket, retaining the question and earlier responses. Resolve the expectation with the responsible source owner; update the canonical document or link the owner's decision when appropriate. Record the resulting revision, answer and resumption checkpoint on the ticket. Remove its index row only when the question is resolved; the conversation remains on the ticket. Clear only the resolved waiting reason. A changed requirement may require revised cases and approval at the affected workflow gate. Refresh the index link if the ticket moves while its question remains open.

## Build or feature ticket template

Copy this into a new file in Ready for QA and replace the placeholders. Do not record an approval or result before it occurs.

````markdown
# QA-<number>: <build or feature to test>

| Field | Value |
| --- | --- |
| Ticket ID | QA-<number> |
| Type | Build / Feature |
| Created | <ISO date/time with timezone; creator> |
| Updated | <ISO date/time with timezone> |
| Priority | <P0–P3 and business reason> |
| Owner / claimed at | Unassigned |
| Workflow checkpoint | Intake; scope/design not yet approved |
| Next action | Review the testing request |
| Waiting on | None |

## Feature and testing objective
<What is changing, who uses it and what needs verification.>

## Acceptance criteria and test basis
1. <Observable business requirement.>
2. <Observable business requirement.>
<Links to supplied requirements/designs; unresolved questions or assumptions.>
- Context sources and Git revision: <exact links and commit>
- Business rules / acceptance criteria: <BR and AC IDs, or ticket-specific criteria>
- Design reference: <applicable handoff/version, not applicable, or missing>

## Target and setup
- Build/commit: <exact revision>
- Environment: <local or other authorized target>
- Browser URL: <normal web address, if applicable>
- API base URL: <API address, if applicable>
- Setup, access and synthetic test data: <exact instructions or direct supporting links>

## Testing scope and completion criteria
- Testing objective/types: <requested coverage>
- In scope / out of scope: <boundaries>
- Completion criteria: <required outcomes, evidence and human decision>

## Linked bugs
None reported yet. Add each bug's ID, current file link and blocking impact.

## Work and decisions
Append dated entries with actor, build, workflow gate, action/observation,
evidence or suite/result links, actual human reply and next action.
Record pending review requests and their scope so check-ins can resume.

## Comments and clarifications
None yet. Append dated questions/responses with ticket-local Q IDs,
checked sources/revisions, affected checks, needed owner and next action.
Index unanswered developer questions in the board README.

## Completion
Not completed. Record coverage, defect dispositions, remaining limits,
recovery/handoff and the actual scoped QA decision when available.
````

## Bug ticket template

Create a new file in Dev Todo for a newly observed defect. Keep API reproduction specific to methods, full request URLs, headers and payloads; keep UI reproduction specific to browser URLs and user actions. Distinguish technical test-data preparation from the actions that demonstrate the bug.

````markdown
# BUG-<number>: <observable failure and triggering action>

| Field | Value |
| --- | --- |
| Ticket ID | BUG-<number> |
| Type | Bug |
| Classification | New defect / Regression / Regression suspected |
| Parent assignment | <QA ID and current file link> |
| Related fix/ticket | <ID, commit and link where applicable> |
| Reported | <ISO date/time with timezone; reporter> |
| Updated | <ISO date/time with timezone> |
| Severity | <impact and rationale> |
| Priority | <P0–P3 and urgency rationale> |
| Owner / claimed at | Unassigned |
| Workflow checkpoint | Findings; record actual review state |
| Next action | Developer review after the required QA decision |
| Waiting on | <specific input/decision or None> |

## Bug description
<What fails, affected user/business flow and impact.>

## Test case that verified the bug
<Case ID, channel, suite/result link and execution date.>

## Preconditions and affected build
<Exact build/environment, required record state and any controlled failure.>

## Test data
<Exact reproducible synthetic inputs; format request JSON/code in fenced blocks.>

## Steps to reproduce
1. <Specific action or HTTP method plus full URL.>
2. <Specific action/request using the test data.>
3. <Where to observe the failure.>

## Expected result
<Observable result from the acceptance criterion or business rule.>
- Context source/revision and BR/AC IDs: <exact rule/criterion references>
- Applicable design handoff/version: <reference, not applicable, or missing>

## Actual result
<What was observed, with amounts/states/IDs when relevant.>

## Evidence
<Observed result/request/response references, build, date and actual method.>

## Root cause and proposed correction
<Supported cause, or clearly labeled hypothesis and remaining investigation.>
<Actionable correction and the behavior that must remain unchanged.>

## Release impact and regression basis
<Blocking impact; checks that should prevent recurrence. For regression,
identify the prior pass/baseline, new failure and originating fix.
State missing baseline/causal evidence explicitly where necessary.>

## Developer responses
None yet. Append each dated response with actor, Fixed or Refuted,
explanation, applicable build/commit and supporting information.
Retain earlier responses when returning through Rework.

## Comments and clarifications
None yet. Append dated questions/responses with ticket-local Q IDs,
checked sources/revisions, affected checks, needed owner and next action.
Index unanswered developer questions in the board README.

## Retest and relevant regression
Not run. Append each attempt with build/date/executor, the authorized
original-failure check, selected regression, expected/actual results,
evidence, new bug IDs and required human decisions.

## Completion
Not completed. Record the actual scoped disposition and human decision.
````

## Scheduled check-in

**Name:** QA board check-in. **Automation ID:** `qa-board-check-in`. **Cadence:** every hour, confirmed by Aniekan on 22 October 2026. **Timezone:** Africa/Lagos (UTC+1). **State:** ACTIVE; creation and the later context-prompt update were confirmed by the native scheduling tool on 22 October 2026. The same ID, hourly cadence, active state and target chat were preserved; the saved prompt matches the instruction below. No duplicate schedule was created. The first unattended execution has not yet been observed.

Use Codex's existing scheduling feature in this QA chat and the same local repository checkout. The computer, desktop app and local project must remain available for local-file work. See [official scheduling guidance](https://learn.chatgpt.com/docs/automations?surface=app). Developer check-ins are not automated by this configuration.

The following prompt is the reusable check-in instruction:

```text
Work in C:\Users\User\Desktop\Personal\Codex\Must\MustPayroll-AI-QA.
Read AGENTS.md, unified_project_context.md, Project Context/README.md,
QA task management Board/README.md and QA/Quality assurance/qa-workflow.md.
Inspect Ready for QA and Retest under
QA task management Board. Follow the board's AI check-in procedure and existing
human-reviewed QA workflow. Consult relevant context sources and record their
Git/design revisions and rule/acceptance-criteria IDs separately from the build.
For missing or conflicting information, comment on the existing ticket for the
developer, index its unanswered question in the board README and wait only on
affected work. Read responses before resuming; preserve the conversation and
link responsible-owner clarifications or canonical source updates. Do not invent
requirements or repeat unanswered questions. Resume eligible claimed work or select one
actionable unclaimed ticket by priority and age. Open each discovered defect
as a separate linked Dev Todo ticket; retain existing tickets and developer
responses through Retest, Rework and Tested-Ok. Retest the original failure
and run relevant authorized regression; create a new linked regression ticket
in Dev Todo for a separate regression. Preserve human review gates and actual
evidence. Do not fix product code or perform developer work without separate
authorization. Do not treat a folder move, a fix claim or silence as approval.
Avoid duplicate findings, repeated unchanged execution and repeated unanswered
approval requests. If no ticket is actionable, leave files unchanged and keep
the check-in brief. Report meaningful progress, findings, movements or decisions
needed. Update shared context when work materially changes. Commit only the
coherent changes made for an actionable ticket; preserve unrelated local work.
```

## Implementation verification

**Verified on 22 October 2026:** ten routing/procedure walkthroughs passed using clearly labeled disposable files under ignored `output/board-validation/check-da2aeba0`, outside the live queues. These exercises validate ticket handling and the written procedure; they are not product-test results, actual human review decisions or proof of unattended agent behavior.

| Walkthrough | Observed result |
| --- | --- |
| Assignment with no discovered defect | Demonstration assignment reached Tested-Ok |
| Multiple initial defects | Separate Dev Todo tickets retained a linked Ready for QA parent |
| Developer fix or refutation | Both response types reached Retest with their explanations retained |
| Successful original retest | Existing bug reached Tested-Ok and retained its developer response |
| Failed original retest | Existing bug reached Rework and retained the latest response |
| Separate regression | New Dev Todo regression ticket linked the originating fix and parent; original bug remained completed while the parent waited |
| Repeated failed-fix cycle | The same bug ID retained all three responses and retest entries through repeated moves |
| Waiting input/review or another owner | Fixtures remained unchanged during the waiting-condition walkthrough |
| Empty live intake | Manual check-in found zero Ready for QA/Retest tickets and changed no board files |
| Different testing objective | Accessibility assignment retained its explicit objective and G1 checkpoint; no payroll execution was substituted |

All fixture ticket IDs remained unique, earlier entries survived moves and incoming ticket links resolved afterward. The actual board has five status folders and zero live tickets. The first real assignment will exercise the existing QA workflow under its own scope and human decisions. **First unattended scheduled execution:** not yet observed.
