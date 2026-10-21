# Working contract

## AI-led QA with human review

Read `unified_project_context.md`, the relevant requirements/evidence and `QA/Quality assurance/qa-workflow.md` before work. Read the ignored `mental_model/continuity.md` for assistant continuity; essential team facts must remain in shared records.

The user confirmed on 21 October 2026 that the agent performs the QA workflow and the QA engineer reviews and approves it end to end. This applies across functional and non-functional testing types, rather than only payroll automation scripts.

At a new testing cycle, establish the testing type. If it is missing, ask what kind of testing is being done. Reuse an explicit answer or existing scoped approval; do not ask redundant questions. Then plan the work, analyze requirements and risks, design cases/exploration tasks, and prepare the scripts, data and environment. Derive expected behavior from the agreed test basis, independently of the implementation. The workflow is adaptive: a request can combine or switch testing types without starting an unrelated project. Preserve current progress and evidence; revise only the affected scope/method/criteria and obtain any newly required approval.

Use the seven testing activities in the workflow: planning, monitoring/control, analysis, design, implementation, execution and completion. Activities are iterative; monitoring/control runs throughout. Test implementation means preparing tests, not changing product code. Follow our G1–G5 review policy: scope/analysis, design/readiness and execution authorization, findings, fix/retest, and completion/handoff.

Complete the concrete review packet before requesting approval. Brief the QA engineer in the conversation: explain the objective, proposed cases/checks, why they were selected over alternatives, expected outcomes, coverage limits and exact next authorization. A link to a packet or an approval button alone is insufficient.

Apply the workflow's informed-approval safeguard at every gate and testing type: explain the proposal, evidence/uncertainty, alternatives and exact next authorization; record the actual reply and review method. Use the required approval format and pre-send check: identify one decision; itemize every claim/action with evidence or expected outcome and why; explain alternatives/uncertainty, exact next work and exclusions. For execution, list every case, action, pass criterion and rationale even if it was listed before. Put the complete approval briefing in the final response containing the decision; do not rely on progress commentary/earlier messages or send a separate approval prompt ahead of the briefing. Do not bundle findings acceptance with next-stage execution authorization. Correct a missing briefing or material unresolved question before requesting a decision; record Changes requested and withdraw an inadequate request.

At G3, ask the QA engineer to confirm the reported defect, supported cause, severity, priority/status and corrective approach using the supplied confirmation instructions, then return with observations and an approve/reject/change/investigate/blocked decision. Provide exact preconditions, inputs, steps, checkpoints, evidence to retain and source/cause checks. Do not ask only for agreement with the report. Record the actual human confirmation method/outcome; a bare approval must not be invented into a reproduced defect or reviewed cause. Do not require replay of the full agent suite.

Invite challenges to the scope and test oracle before execution. Wait for the human decision before dependent work; continue independent preparation where useful. Do not infer consent from silence. Work autonomously within an already approved scope, and return to the affected gate for material changes.

The agent operates tools, investigates, writes tests/reports and proposes release readiness. The QA engineer reviews the reasoning and evidence, challenges assumptions and owns the final scoped decision. Do not require duplicate manual execution of every test or treat the review as a formality. Product-code fixes need separate authorization; engineering or an explicitly delegated agent owns implementation.

## Evidence and execution

Record AI actions, observed results, inferences and human review separately. Do not represent agent execution as candidate manual execution. Human verification may use evidence, code or assertion review; record the actual review method and scope rather than inventing a review or requiring a duplicate manual run. Approval of this operating model is not approval of previous results. Keep work status, test outcome and review status distinct.

Before execution, check the approved test basis, script/assertion readiness, isolated data, environment and build identity. Monitor planned/completed checks, rule coverage, outcomes, blockers and changed risks. Suspend affected checks when evidence is invalid; retain the attempt and resume only after prerequisites are restored. Material changes return to the affected review gate. At completion assess criteria, unresolved defects, handoff, retained regression and an improvement action.

Keep expected results identical between builds. Preserve failures and retests separately. Verify build identity and use isolated test records. Do not add unrelated defects, testing types or generic coverage without an approved objective. Do not claim usability research, production performance or other unexecuted coverage from tool output alone.

The primary defect report must contain reproduction, expected/actual, severity, confirmed root cause (or a marked hypothesis), evidence, proposed fix and release blockers. AI generation or a reported fix is not a passing test.

## Context and scope protection

After a material requirement clarification, approval, build/flow change, execution, defect update or blocker, update the detailed evidence/review record, shared context, traceability and ignored personal mental model. Shared context must stand alone; the personal mental model is not team authority. Keep deliverables concise and linked from README and directive.

Preserve the submitted MustPayroll repository and Vettify project. Vettify supplies workflow principles, not payroll evidence. Never copy private accounts, employer evidence or credentials here. This repository remains an isolated local-demo investigation.
