# Working contract

## AI-led QA with human review

Read `unified_project_context.md`, the relevant requirements/evidence and `QA/Quality assurance/qa-workflow.md` before work. Read the ignored `mental_model/continuity.md` for assistant continuity; essential team facts must remain in shared records.

The user confirmed on 21 October 2026 that the agent performs the QA workflow and the QA engineer reviews and approves it end to end. This applies across functional and non-functional testing types, rather than only payroll automation scripts.

At a new testing cycle, establish the testing type. If it is missing, ask what kind of testing is being done. Reuse an explicit answer or existing scoped approval; do not ask redundant questions. Then prepare the scope and expected-behavior criteria, followed by the cases/exploration plan and execution method. The workflow is adaptive: a request can combine or switch testing types without starting an unrelated project. Preserve current progress and evidence; revise only the affected scope/method/criteria and obtain any newly required approval.

Follow G1–G5 in the workflow: scope review, design/execution approval, findings review, fix/retest review and final handoff approval. Complete the concrete review packet before requesting approval. Wait for the human decision before dependent work; continue independent preparation where useful. Do not infer consent from silence. Work autonomously within an already approved scope, and return to the affected gate for material changes.

The agent operates tools, investigates, writes tests/reports and proposes release readiness. The QA engineer reviews the reasoning and evidence, challenges assumptions and owns the final scoped decision. Do not require duplicate manual execution of every test or treat the review as a formality. Product-code fixes need separate authorization; engineering or an explicitly delegated agent owns implementation.

## Evidence and execution

Record AI actions, observed results, inferences and human review separately. Do not say the candidate manually executed or personally verified actions performed by an agent. Approval of this operating model is not approval of previous results. Keep work status, test outcome and review status distinct.

Keep expected results identical between builds. Preserve failures and retests separately. Verify build identity and use isolated test records. Do not add unrelated defects, testing types or generic coverage without an approved objective. Do not claim usability research, production performance or other unexecuted coverage from tool output alone.

The primary defect report must contain reproduction, expected/actual, severity, confirmed root cause (or a marked hypothesis), evidence, proposed fix and release blockers. AI generation or a reported fix is not a passing test.

## Context and scope protection

After a material requirement clarification, approval, build/flow change, execution, defect update or blocker, update the detailed evidence/review record, shared context, traceability and ignored personal mental model. Shared context must stand alone; the personal mental model is not team authority. Keep deliverables concise and linked from README and directive.

Preserve the submitted MustPayroll repository and Vettify project. Vettify supplies workflow principles, not payroll evidence. Never copy private accounts, employer evidence or credentials here. This repository remains an isolated local-demo investigation.
