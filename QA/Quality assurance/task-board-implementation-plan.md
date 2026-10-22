# QA task management board: implementation plan

**Prepared, authorized and implemented:** 22 October 2026. **Stage:** five-folder board, templates, workflow integration and ten routing walkthroughs complete; native hourly check-in ACTIVE. Aniekan authorized implementation and selected hourly check-ins. The [board README](../../QA%20task%20management%20Board/README.md) is the operating reference and records current verification/scheduling state. The steps below preserve the approved implementation design; the completion record follows them.

## Objective

Give the AI QA agent and developer a persistent queue of tickets. The board identifies what needs attention. The existing [QA workflow](qa-workflow.md) defines how the agent analyzes, prepares, tests, investigates, reports and completes that work with human review.

Each Markdown file is a ticket. Its containing folder is its board status. A build-testing ticket tracks an assignment; each discovered defect receives a separate bug ticket linked to that assignment. Moving a ticket retains its ID, contents, developer responses and testing history.

## 1. Create the board at the repository root

```text
QA task management Board/
├── README.md
├── Ready for QA/
├── Dev Todo/
├── Tested-Ok/
├── Retest/
└── Rework/
```

Create exactly these five status folders. The board README will explain responsibilities, ticket creation, movement and check-in instructions. It will include copyable ticket templates, so the board needs no additional template folder. Empty status folders will contain `.gitkeep` files for Git to retain them; the agent ignores these when looking for tickets.

The AI QA agent checks Ready for QA and Retest. Developers check Dev Todo and Rework. Tested-Ok contains completed tickets. No additional board statuses or separate task-management application are required.

## 2. Define usable tickets

Use unique IDs and descriptive filenames, such as `QA-001-payroll-recovery.md` for an assignment and `BUG-001-duplicate-payment-on-retry.md` for a defect. An ID stays unchanged when the ticket moves. References between tickets include IDs, which remain usable across folder moves. Locate a ticket by ID before opening it, and refresh incoming relative navigation links when its path changes.

| Ticket content | Build or feature testing ticket | Bug ticket |
| --- | --- | --- |
| Identity and assignment | ID, title, author, date, priority and owner | ID, descriptive title, reporting date, severity and priority |
| Test basis | Feature objective, acceptance criteria and available requirement/design links | Violated rule or expected behavior and originating testing ticket |
| Target | Exact build/commit, environment, normal browser URL and/or API base URL, setup instructions and synthetic data | Affected build/environment, relevant test case and concrete test data |
| Work requested | Testing objective/types, scope, exclusions and completion criteria | Description, preconditions, numbered reproduction, expected/actual result and evidence |
| Investigation | Link to the approved scope/design and execution records as work proceeds | Supported root cause or clearly identified hypothesis, proposed fix and release impact |
| Developer response | Relevant changes or delivery notes | Fix claim or refutation, explanation, changed build/commit and supporting references |
| Verification and completion | Linked defects, coverage/results, human decisions and readiness outcome | Original retest, relevant regression results, human decision and final disposition |

Append dated work notes to the same ticket through each cycle. Keep the existing evidence files as evidence and link to them from tickets; do not create a second authoritative copy of a bug report elsewhere. Future findings are reported through the board's bug tickets.

Do not migrate the completed RUN-001/RUN-002 records or PAY-001 into the live queues. Their existing reports, results and decisions remain intact. The new board begins with future work.

## 3. Implement the two connected ticket lifecycles

| Event | Ticket action | Required record |
| --- | --- | --- |
| A build or feature is ready | QA or developer creates a testing ticket in Ready for QA | Scope, target build, acceptance criteria, data/access and testing request |
| AI starts the assignment | Claim the testing ticket and follow the existing QA workflow | Owner, current workflow checkpoint and next action; folder remains Ready for QA |
| Initial testing discovers a bug | Create a new bug ticket in Dev Todo | Complete actionable report; link the bug and parent testing ticket in both directions |
| Initial testing finds no blocking defect | Move the testing ticket to Tested-Ok after its required QA review | Actual results, coverage limits and scoped completion decision |
| Developer fixes or refutes a bug | Update that existing bug ticket and move it from Dev Todo or Rework to Retest | Developer response, fix/refutation explanation and applicable build reference |
| AI picks up Retest | Retest the original failure and run relevant regression through the existing workflow | Actual results against the identified build, original expectation and selected regression scope |
| Original retest fails | Move that bug ticket to Rework | Latest developer response retained, failed verification and evidence appended |
| Original retest passes | Move that bug ticket to Tested-Ok after its required QA review | Correction verification and scoped disposition |
| Regression finds a new defect | Create a new regression bug ticket in Dev Todo | Regression classification, reproduction, evidence, affected build, originating fix/ticket and prior passing baseline where available |
| Linked blocking bugs are resolved | Complete the parent testing ticket's readiness review, then move it to Tested-Ok when accepted | Linked bug dispositions, relevant regression results, remaining limits and human decision |

The original bug can pass its retest while a newly discovered regression remains a separate open ticket. The parent testing ticket stays in Ready for QA with its linked blockers and next action recorded until its completion criteria are met. A check-in reads that record and waits for the dependencies rather than repeatedly testing an unchanged build.

If a claimed regression has no established prior passing baseline, record the observed new defect and the uncertainty about regression classification. Do not invent a historical pass or a proven causal link to the fix.

Developer refutations are recorded and routed to Retest as requested. Additional rules for assessing refutations and a future project-context folder are outside this implementation.

## 4. Connect board intake to the existing workflow

Update `AGENTS.md`, the QA workflow, repository README and shared project context to establish the board as the intake point. Keep the existing G1–G5 review requirements and the adaptive choice of testing types.

At each check-in, the AI agent will:

1. Read the working contract, shared context, board instructions and existing QA workflow.
2. Inspect Ready for QA and Retest for ticket files. Resume its unfinished eligible work first; otherwise select an unclaimed ticket by priority and then creation date.
3. Read the complete ticket and linked records. Establish the target, testing objective, acceptance criteria and current review checkpoint. Identify missing information without inventing requirements.
4. Record ownership and the next action in the ticket. Work on one ticket at a time; respect another owner's claim.
5. Perform the authorized workflow activity. A new ticket does not bypass scope/design review; a retest ticket does not bypass correction/retest authorization. When a human decision is needed, prepare the full conversational briefing and record the waiting checkpoint in the ticket.
6. Execute within the approved scope, retain observations, create new bug tickets as needed and apply the movements in the lifecycle table after the required decisions.
7. Report work completed, ticket movements, findings and decisions needed. If no ticket is actionable, leave the board unchanged and end the check-in. Do not create work or request the same unanswered decision on every check-in.

Folders remain the only board statuses. Ownership, workflow checkpoint, linked blockers and next action are ticket details; they do not introduce another status system. The same ticket is updated and moved, rather than copied into several folders.

## 5. Verify the board behavior before enabling scheduling

Use disposable, clearly labeled demonstration tickets outside the live board under ignored `output/board-validation`. Validate the board instructions and ticket movements without representing demonstration outcomes as real product tests.

| Check | Expected outcome |
| --- | --- |
| New build with no discovered defect | Required workflow/review recorded; build ticket reaches Tested-Ok |
| New build with multiple defects | Separate bug tickets created in Dev Todo; parent links them and waits on blocking findings |
| Developer fix or refutation | Existing bug moves to Retest with the developer response preserved |
| Successful original retest | Original ticket reaches Tested-Ok after required review |
| Failed original retest | Existing ticket reaches Rework with the latest fix claim and failure retained |
| New regression during a successful retest | New regression ticket enters Dev Todo; original bug can complete independently; parent retains the blocker |
| Repeated failed-fix cycle | Rework → Retest repeats with the same ID and complete earlier entries |
| Waiting review, missing input or unchanged blocked parent | Check-in records/resumes the right checkpoint without duplicate execution, new bug copies or invented approval |
| Empty intake queues or tickets owned by another worker | Check-in makes no unauthorized claim or change |
| Different testing objective | Ticket invokes the appropriate existing workflow criteria rather than assuming every task is payroll UI/API regression |

Check that each live ticket ID appears in only one status folder, references resolve after moves, templates are ignored as work, and existing application/test sources and RUN-001/RUN-002 evidence are unchanged. Then perform a manual check-in against the actual empty board. A real product ticket will exercise the full workflow only when its scope and execution are authorized.

## 6. Configure the native Codex check-in

Use the existing Codex scheduling feature to return to this chat and operate on this repository's local board. Prepare and manually check the prompt first; use the native app tool to create or update the schedule, avoiding duplicate automations. Aniekan selected every hour on 22 October 2026, using Africa/Lagos (UTC+1). Record activation only after the native app confirms it.

The scheduled prompt will identify the exact repository and five-folder board, direct the QA agent to inspect only its two intake folders, reference the existing workflow, preserve human review boundaries, and summarize meaningful progress or decisions needed. It will not schedule a developer agent or authorize the QA agent to fix product code. Developers use Dev Todo and Rework through their own routine.

Use the local checkout so each check-in sees the same ticket files. For local-file scheduling, the computer and desktop app need to remain running; the official guidance also supports returning to an existing chat and testing the prompt before scheduling. See [OpenAI scheduled-task documentation](https://learn.chatgpt.com/docs/automations?surface=app).

## Files affected and completion criteria

Implementation creates the board README, five status folders and their Git placeholders. It updates `AGENTS.md`, the existing QA workflow, repository README and shared context with the board entry point and responsibilities. Ticket templates live in the board README. The schedule is managed through Codex, with its name, cadence, timezone and activation state recorded in that README once configured.

The improvement is complete when the five-folder board and ticket templates are usable, the documented lifecycle checks pass, the manual board check-in follows the existing human-reviewed workflow, and the scheduled check-in has its chosen cadence and confirmed activation state. Until activation, report the board as manually usable and scheduling as not enabled.

The future project-context folder, PRD/BRD/Figma ingestion, extra refutation rules, developer automation, application changes and additional product testing are outside this implementation. Existing completed assessment evidence remains unchanged.

## Implementation record — 22 October 2026

Created the board README and exactly five status folders with Git placeholders. The README includes both ticket templates, distinct assignment/defect lifecycles, new regression reporting, developer fix/refutation routing, ownership/waiting rules, movement/link maintenance and the check-in prompt. Updated AGENTS.md, the QA workflow, repository README, directive and shared context with the board entry point. Existing review gates remain in force.

Ten disposable documentation/filesystem walkthroughs passed. They checked routing, repeated rework, preserved history, unique IDs, refreshed links, waiting conditions and an explicit non-payroll objective. A manual check-in found no live intake tickets and changed no board files. These are board-implementation checks, not new product tests or human QA approvals. The board starts empty; completed RUN-001/RUN-002 evidence remains unchanged.

Aniekan selected every hour. After checking for a matching existing automation and verifying the prompt manually, the native Codex tool created **QA board check-in**, ID `qa-board-check-in`, with state **ACTIVE**, returning to this chat. No developer schedule or custom scheduler was created. The first unattended scheduled execution is not yet observed; the first real ticket will use the existing workflow and required human decisions.
