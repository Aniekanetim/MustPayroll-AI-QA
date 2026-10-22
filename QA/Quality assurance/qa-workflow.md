# AI-led QA workflow with human review

**Current status — 22 October 2026:** RUN-002 is complete: buggy 7 Pass / 1 Fail (TC07), fixed 8 Pass / 0 Fail. Aniekan approved G1/G2 after the case briefing, accepted G3 findings and separately authorized G4 fixed execution. After the self-contained G5 results, confirmation instructions and scoped handoff proposal, he replied “Verified!” The correction is confirmed by the QA engineer; the local handoff is accepted as Ready with known limitations and PAY-001 is Verified fixed for `mustpayroll-0.3.0-fixed-ca7ffbea67ec`. The reply does not identify his verification method, dataset or individual observations; none are invented. The buggy control and original failure remain. RUN-001 is historical evidence; the new Loom and application-material review remain outstanding.

## Purpose and responsibilities

**Ticket intake:** the [QA task management board](../../QA%20task%20management%20Board/README.md) supplies work through five folder statuses at the repository root. The AI QA checks Ready for QA and Retest; developers check Dev Todo and Rework. Build/feature assignments and the separate bug/regression tickets they produce retain their own IDs and records. Tested-Ok contains tickets whose criteria and required human decisions are satisfied. The board selects work; this workflow governs its execution and review.

**Test basis:** start with [Project Context](../../Project%20Context/README.md), then the ticket's applicable business rules, feature acceptance criteria, design reference and technical/setup sources. Record source revisions and BR/AC IDs separately from the target build. The index identifies owners, document states and missing information. For necessary gaps or conflicts, follow the board's [clarification procedure](../../QA%20task%20management%20Board/README.md#clarification-comments-and-developer-visibility): comment on the existing ticket, expose the question to the developer and pause affected checks. Do not infer requirements from the faulty implementation or replace a required human decision with a developer answer.

Apply these same activities and gates from each ticket's recorded checkpoint. Initial testing creates separate linked Dev Todo bug tickets. Developer fixes/refutations return the existing ticket to Retest; a failed original retest goes to Rework, a successful reviewed retest to Tested-Ok, and a newly observed regression gets its own Dev Todo ticket. Keep the parent assignment's blockers and overall completion decision current. Awaiting review or an unchanged dependency does not authorize another run. The [board instructions](../../QA%20task%20management%20Board/README.md#ai-check-in-procedure) define claiming, selection, waiting and check-in reporting; the [implementation plan](task-board-implementation-plan.md) records the approved design.

The agent performs the testing work. The QA engineer directs priorities, checks the reasoning and evidence, and approves the scoped decisions. Human verification can include inspecting requests, records, scripts and assertions; it does not require manually repeating every agent action. Record the review actually performed.

Testing checks product quality. Quality assurance also improves the process that produces those checks, including requirement review, execution controls and lessons learned. Both are needed here.

| Responsibility | AI agent | QA engineer |
| --- | --- | --- |
| Establish the test basis | Read requirements, identify risks and conflicts, propose measurable criteria | Confirm the objective, expected behavior and priorities |
| Prepare and execute | Design checks; prepare scripts, data and environment; operate tools and retain observations | Review coverage, assertions, readiness and execution limits |
| Investigate and report | Reproduce anomalies, distinguish causes from hypotheses, propose a correction and supply focused human confirmation instructions | Confirm the reported defect/cause, review classification and correction, then return observations and a decision |
| Complete the work | Evaluate criteria, record residual risk and propose a handoff | Accept or reject the scoped QA recommendation |

Engineering owns product-code corrections unless implementation is separately delegated. The agent's readiness recommendation and the human QA decision are separate records. A local QA decision does not authorize a production release by an organization.

## Testing activities beneath the review gates

This process is tailored from [the researched ISTQB and ISO references](qa-workflow-review.md). ISTQB describes seven testing activity groups. Our G1–G5 gates are the project's review policy, not prescribed standard stage names or a formal ISO-conformance claim.

| Activity | Work and reviewable output | Review point |
| --- | --- | --- |
| Test planning | Objective, testing types, approach, limits, entry/exit criteria and responsibilities | G1; refine as needed |
| Test analysis | Source requirements, prioritized risks, uncertainties and test conditions | G1 |
| Test design | Cases or exploration tasks, inputs, expected results and coverage links | G2 |
| Test implementation | Prepared scripts, test data, environment, build identity and readiness checks | G2 |
| Test execution | Observed outcomes, reproducible anomalies and retained evidence; correction confirmation and regression when approved | G3; G4 for retest |
| Test monitoring and control | Progress, coverage, blockers, changed risks and corrective decisions | Continuous across all activities |
| Test completion | Criteria assessment, unresolved defects, handoff, reusable checks and an improvement action | G5 |

Activities can overlap and repeat. For example, a failed readiness check returns to preparation, and a new requirement can require analysis and design changes. **Test implementation means preparing tests and their environment; it does not mean implementing the product fix.**

## Start with the testing request

Establish the testing objective and types. If they are missing, ask: **“What kind of testing are we doing?”** Reuse a stated choice or existing approval.

Then identify the product flow, source requirements, target build/environment, data, risks, measurable criteria and operating limits. Consult the context index and record the applicable source revisions. Resolve contradictions before judging behavior; if a necessary answer is missing, record a ticket clarification and waiting checkpoint. Continue independent work only within the existing authorization. Derive expected results from the agreed requirements, independently of the application's current response. After a clarification, preserve the answer/source update and return to the affected gate if scope or criteria changed.

The workflow supports functional and non-functional objectives. API and browser are interaction channels; either can support different quality objectives.

| Selected objective / channel | Suitable execution and evidence | Criteria to agree |
| --- | --- | --- |
| API functional | Requests, responses and saved-state checks | Exact method/endpoint, payload, contract and business outcome |
| UI functional | Browser actions, visible results and corroborating records | User journey, business rule, persistence and recovery |
| Usability | Representative tasks and observed friction | User goal and severity; expert inspection is distinct from research with actual users |
| Performance | Repeatable workload and measured behavior | Environment, workload, metrics and thresholds; local results do not establish production capacity |
| Accessibility | Automated checks plus relevant manual interaction | Named criteria, method and coverage limits; a tool score is insufficient |
| Security | Authorized checks against the agreed target | Threat/risk focus, permitted actions, data boundaries and stop conditions |

A cycle can combine or change testing types. Preserve its current progress and evidence, revise the affected method/criteria, and return to the affected review point. Supporting a type does not mean executing it automatically.

## Project review gates

| Gate | Concrete packet prepared by the agent | Human decision and next authorized work |
| --- | --- | --- |
| G1 — Scope and analysis | Objective, sources, risks, uncertainties, coverage intent and completion criteria | Approve or revise the test basis and scope |
| G2 — Design and readiness | Cases, expected outcomes, scripts/assertions, data, build/environment checks and execution bounds | Approve bounded execution, or request preparation changes |
| G3 — Findings confirmation | Actual outcomes, evidence, defect reproduction instructions, cause-check steps, severity/priority/status rationale, proposed correction and gaps | QA performs the focused confirmation, then approves, rejects, requests changes/investigation or reports blocked confirmation; fixed execution remains separate |
| G4 — Fix and retest | Identified correction/build, original failure, confirmation checks and adjacent regression | Authorize retest; product-code changes require their own authorization |
| G5 — Completion and handoff | Versioned packet: release notes, completion/exit-criteria evidence, defect/risk disposition, scoped sign-off proposal and next-owner/recovery instructions | Approve, approve with stated limits, request changes or reject; then record the actual decision and deliver the handoff. Production authority remains separate |

G1 and G2 can be reviewed together when the complete packet is available. Before asking for a decision, brief the QA engineer in the conversation on the objective, each proposed check and its expected outcome, why those checks were selected over alternatives, gaps and the exact next work. Link the details as supporting material; do not substitute a link or approval button for the briefing. The QA engineer can challenge, replace or expand the checks before authorizing execution. Approval identifies the packet revision, build, allowed work, reviewer and date. Silence is not approval. Within an approved scope, the agent performs routine preparation, execution, investigation and documentation autonomously.

## Informed approval at every gate

An approval request must enable a decision, rather than merely ask for one. Before presenting it, the agent must:

1. Brief the QA engineer in the conversation on the business objective and exact work or finding being reviewed. Identify its packet revision, build and current state; explain unfamiliar terms.
2. Explain the proposed decision and its basis: why this scope or response was chosen, the expected outcome, alternatives, supporting evidence, assumptions and unresolved gaps. At G1/G2, cover each proposed case and selection rationale. At G3, explain failures, impact, evidence and confidence in the cause. At G4, explain the correction and how the retest can disprove it. At G5, explain completion criteria, residual risk and the proposed handoff.
3. State exactly what approval authorizes next and what remains outside it. Supply direct supporting links, but keep the briefing understandable without opening them.
4. Give the QA engineer room to challenge or revise the proposal. If the briefing is missing or a material question is unresolved, complete or correct it before requesting a decision. Do not infer approval from silence, a question or a request for explanation.
5. Record the actual reply, reviewer/date, packet revision, briefing/evidence reviewed, conditions and authorized next work. An approval after a case briefing is not a claim that the reviewer manually read every script or repeated the tests.

This safeguard applies to all testing types and all five gates. A scope change or materially different proposal requires a revised briefing at the affected gate; routine actions within an already approved scope do not need new approval.

### Required approval format and pre-send check

The previous safeguard was not applied adequately: the agent summarized findings and offered a combined findings/retest approval without listing the fixed checks. To prevent repeating that failure, every future request must contain the following in the conversation:

| Required part | What the reviewer must be able to understand |
| --- | --- |
| One decision | The specific finding, plan, action or handoff being accepted or authorized, with its revision/build and current state |
| Itemized review | Each claim or action, its evidence or expected outcome, and why it belongs in this decision. For test execution, list every case with plain-language action, pass criterion and selection rationale |
| Recommendation and alternatives | What the agent recommends, why, what would justify changing it, and any meaningful uncertainty, gap or limit |
| Consequence of approval | The exact next permitted work and the decisions that remain unapproved |
| Evidence access | Direct supporting links, while keeping the decision understandable without opening them |
| Findings confirmation at G3 | Concrete steps for the human to confirm the defect, check the cause/evidence, assess severity/priority/status and review the proposed correction before returning a decision |

Deliver the complete briefing in the final response containing the decision request. Progress commentary, earlier messages and linked documents may be collapsed or unseen; they cannot carry essential approval context. Do not send a separate approval prompt before that self-contained briefing. Before sending a request, verify that every part is present. If the reviewer would need prior conversation context, unexplained case IDs, the phrase “the same eight cases,” or a repository search to discover what is being approved, the briefing is incomplete: correct it before requesting a decision.

Do not combine acceptance of findings with authorization to execute the next stage in one approval option. Present G3 findings for a decision first; after acceptance, present the G4 execution proposal with its own case/action/expected-result/rationale table and request its separate decision. A preview of G4 is not an execution request. G1/G2 can still form one decision on a fully briefed bounded plan.

If the reviewer identifies a missing briefing, record Changes requested for that review. Withdraw the inadequate approval request, supply the missing explanation and wait for an actual decision; do not treat the objection as acceptance. Record only the scope the human explicitly approves.

### G3: human confirmation before a findings decision

At this stage, ask the QA engineer to **confirm the reported finding and return a decision**, rather than only accept the agent's conclusion. The agent prepares the work; the human performs a focused check appropriate to the claim.

For every reported defect, supply the target build/environment, fresh-data preconditions, exact inputs, numbered reproduction steps, expected/actual checkpoints and evidence to retain. Separate technical fixture preparation from the user actions or API requests that demonstrate the defect. Include a cause check using source, logs or a discriminating control; distinguish support for a cause from a proven fix.

Explain severity (impact), priority (urgency) and status (defect state) separately. Identify the project's proposed labels and rationale, and allow the human to change each independently. For the proposed correction, explain which causal dependency must change and which existing behavior must remain. Source/approach review at G3 is not a fixed-build execution or proof of correction.

Ask the QA engineer to return concise notes on: what was reproduced and observed, evidence/build, cause checks and remaining uncertainty, classification assessment, corrective-approach assessment and decision. Allow **Approve**, **Approve with changes**, **Reject**, **Request further investigation**, or **Unable to confirm / Blocked**, with the affected claim and reason. These outcomes need not accept or reject every claim together.

Do not require replaying the entire AI suite. If a step cannot be completed, retain that limitation and request the specific assistance needed; do not turn inability to confirm into a product failure. Record the actual human checks separately from agent execution. If an approval omits confirmation details, do not invent them or mark the finding human-verified; obtain the missing observations/method before recording completed confirmation.

Keep the human confirmation and agent execution as separate records. A different human result does not erase the original failure; investigate build, data or procedure differences and retain both observations. Human confirmation remains Pending until the QA engineer returns. Do not run fixed tests, close the defect, approve release or start another dependent gate while the human is reviewing. Keep G4 execution authorization separate.

## Monitoring, change control and records

During execution, report planned versus completed checks, Pass/Fail/Blocked outcomes, requirement coverage, anomalies and any changed risk. Record unexpected harness or environment errors separately; an error that prevents valid observation is not evidence of a product failure.

Suspend the affected checks if the build differs, data are invalid, the harness cannot test the intended rule, or an action exceeds the approved scope. Preserve the attempt and explain its impact. Repair within the approved preparation scope; obtain a revised decision when requirements, scope, method or risk materially change. Resume only when prerequisites are restored. Record any rerun separately; do not silently retry until green.

Keep these statuses distinct:

- **Work:** not_started, in_progress, blocked, redo, done or canceled.
- **Test outcome:** Not run, Pass, Fail, Partial or Blocked, with evidence. Record an execution error separately when a valid verdict cannot be reached.
- **Human review:** Pending, Approved, Changes requested or Rejected, with actual review method and decision.
- **Defect:** Open until its correction and verification support an accepted disposition; report approval alone does not close it.

Connect requirements, cases, observations, defects and retests by ID and build. Update detailed records, [shared context](../../unified_project_context.md) and ignored assistant continuity after material changes. Shared context must stand alone. A completed execution can contain failed tests, and an approved handoff can retain explicit open risks.

## Release sign-off and operational handoff

Follow the [release sign-off procedure](release-signoff.md) and [packet template](templates/completion-handoff.md). Prepare the packet before G5 review; it must identify changes, intended use/target, actual coverage and exit criteria, open risks, the proposed decision and who does what next. After the actual decision, finalize its reply/scope/limits and deliver a self-contained action handoff through the authorized channel. Record actual delivery/receipt; publication does not prove another owner received or accepted it. Do not mark a parent assignment complete while a required closure item is pending. An individual bug links its scoped disposition and parent packet without claiming full release approval.

The final response must include the target/verdict, changes, evidence, remaining limits, direct packet link and next-owner actions. A commit link or test totals alone cannot close the workflow. Local-only work marks production rollout/rollback/monitoring Not applicable with reasons. A later material change returns to the affected gate; a documentation supplement does not erase or invent the original decision.

## RUN-002: scope and test-design packet v2

**Approved decision:** Aniekan approved G1 scope/analysis and G2 design/readiness after the conversational case briefing, subject to strengthening the workflow against blind approval. The safeguard above is now in place. Approval authorizes the eight buggy-build cases, bounded investigation and findings report. Fixed-build retesting, product changes and release are not authorized by this decision.

### Objective, sources and risk analysis

Verify BR01–BR06 in [business rules](../../Project%20Context/business/business-rules.md), especially one payment per employee-period after notification delivery fails. Use the role brief as assessment authority and the explicit payroll rules as the product oracle. The transcript informs the workflow; previous results and implementation are reference material, not expected-result sources. The rules were moved into shared context after RUN-002; the migration does not change that run's original test basis or assign it new acceptance-criteria IDs.

[Intent](intent.md) ranks three plausible failures: duplicate payment after failed delivery, incorrect weekly cut-off and duplicate earning import. Duplicate payment is investigated deeply because a recovery action could repeat its financial effect. Boundary and duplicate-input cases provide adjacent protection. Likelihood is a reasoned hypothesis; production frequency is unknown.

The local rules have no unresolved conflict preventing these eight checks. Concurrency, process crashes, real banks/delivery, account changes and authorization remain outside this cycle. Eight cases meet the assessment minimum within this selected scope; they do not establish comprehensive product coverage. This is a controlled white-box demo, not blind discovery of a live incident.

### Why these eight cases

The selected financial risk is repeat payment during recovery. The three ranked alternatives in intent.md led to this scope: investigate retry after delivery failure deeply, while checking cut-off selection and duplicate earning imports as adjacent risks. The eight-case minimum alone did not determine the selection.

| Case | Selection rationale |
| --- | --- |
| TC01 | Establish that payroll starts from the correct approved amount. Otherwise later recovery totals would have an unreliable baseline. |
| TC02 | Prevent the same earning falling into two weeks, or neither week, at the Monday boundary; verify the adjacent period too. |
| TC03 | Check that an offset timestamp is converted before applying that boundary. Correct UTC comparisons alone do not establish correct conversion of API inputs. |
| TC04 | Check input deduplication separately from payment retry: repeating one earning import must not inflate approved pay before processing. |
| TC05 | Distinguish failure before payment from failure after payment. An unpaid employee needs a safe payroll retry and must not receive a premature notification. |
| TC06 | Establish the safe delivery-only recovery route after payment succeeds; notification recovery must preserve payment. |
| TC07 | Exercise the selected high-impact risk: an operator retries payroll after delivery fails. The payment must remain unique and unchanged. |
| TC08 | Establish successful payment and linked notification creation/order without a controlled fault. TC01 checks selection/aggregation; this case checks delivery responsibilities. |

**Why six UI and two API cases:** the UI cases exercise operator decisions and recovery controls. TC03 sends explicit timezone offsets that the UTC-only earning form cannot express directly. TC04 repeats a client-supplied earning ID, whereas the form generates a new ID for each earning. API is the direct way to test those input contracts. Supporting API fixture setup in UI cases is not counted as additional API coverage.

**Why other cases are deferred:** concurrency, process crashes, real bank/provider behavior and account changes need different infrastructure or product capabilities. Performance, usability, accessibility and security are available workstreams but have not been selected for this functional payroll cycle. Excluding them limits the recommendation to the stated local flow. Repeated delivery failure, repeated payroll retry and additional input-validation combinations could strengthen later coverage; this packet does not claim them verified.

### Cases, traceability and unchanged expectations

| Case | Channel | Rule | Test condition | Expected result |
| --- | --- | --- | --- | --- |
| TC01 | UI | BR01/BR02 | Process approved current-period earnings alongside excluded records | $4,350: Amara $1,500, Daniel $2,000 and Zara $850; Pending, Rejected and next-period amounts excluded |
| TC02 | UI | BR01 | Opening/closing timestamps and adjacent pay periods | $400 in each relevant week; closing-boundary earning belongs only to the next period |
| TC03 | API | BR01 | Convert offset timestamps before selecting earnings | $100 at opening included; $200 before opening excluded |
| TC04 | API | BR03 | Import the same earning ID twice | One earning and one $1,500 payment |
| TC05 | UI | BR04/BR05 | Payment recording fails, then payroll is retried | First attempt creates no payment or notification; retry creates one $1,500 payment |
| TC06 | UI | BR06 | Notification fails, then delivery alone is retried | Same $1,500 payment and notification IDs; Pending becomes Sent |
| TC07 | UI | BR04/BR06 | Notification fails, then payroll is retried | One $1,500 payment, original payment/notification IDs retained and notification Sent |
| TC08 | UI | BR05/BR06 | Payment and notification succeed | One Paid payment and linked Sent notification; payment commits before delivery attempt |

The [buggy UI suite](../Quality%20Control/Buggy%20build/Functional%20testing/functional-test-suite.md) and [API suite](../Quality%20Control/Buggy%20build/API%20testing/api-test-suite.md) contain the detailed data and steps. Use the same expectations during fixed retest. RUN-001 suggests that TC07 will fail on buggy; record whatever is actually observed and investigate any difference.

### Prepared implementation and entry criteria

Readiness checks below were performed by Codex on 21 October 2026. They are preparation evidence, not RUN-002 application-test results or human approval.

| Entry criterion | Preparation evidence | Execution verification |
| --- | --- | --- |
| Known product baseline | All files listed in both local build manifests match their hashes; health endpoints report the matching IDs below | Rebuild and served identity matched the approved buggy baseline; fingerprints retained |
| Inspectable test implementation | Both execution projects pass TypeScript no-emit checking; all seven helper/POM/spec files are byte-identical between builds | [Browser spec](../Quality%20Control/Buggy%20build/Functional%20testing/executed_functional_test_cases/test/specs/ui/payroll-ui.spec.ts) and [POM](../Quality%20Control/Buggy%20build/Functional%20testing/executed_functional_test_cases/test/pages) remained inspectable and unchanged; human review method was the case briefing, not claimed manual script inspection |
| Requirements-based assertions | Agent source review confirms TC07 expects one $1,500 payment and the original identities in both builds; adjacent checks map to BR01–BR06 above | Aniekan approved the expected behavior after the briefing; assertions were unchanged |
| Reproducible API inputs | Both collections parse; every JSON body in each API suite matches an exported request | Exported inputs used by Python HTTP; actual tool recorded, no Postman run claimed |
| Isolated data and controlled faults | Helpers create fresh records per case; scripts use separate test databases; one-shot controls distinguish payment failure from delivery failure | All eight cases used fresh records and valid setup; controlled faults remained one-shot |
| Usable runtime | Normal services respond on 4275/4276; isolated test services are configured for 4284/4285 | Chromium launched and isolated service 4284 started normally; normal service 4275 matched the pinned build |
| Human execution authorization | Aniekan approved packet v2 after the case-selection briefing and required the informed-approval safeguard | Approved for buggy execution; safeguard implemented before starting |

**Pinned application builds:** buggy `mustpayroll-0.3.0-faulty-eb7f01eeae99`; fixed reference `mustpayroll-0.3.0-fixed-ca7ffbea67ec`. Separate source trees and SQLite files prevent one build's actions from changing the other's evidence. The fixed reference is available for a later G4 review, not part of this first execution authorization.

### Bounded execution plan

1. Recheck entry criteria and record RUN-002, tool versions, target build and the test-source revision/fingerprint. Use fresh synthetic data for each case; never reset RUN-001 evidence.
2. Run the six browser cases through the [TypeScript POM project](../Quality%20Control/Buggy%20build/Functional%20testing/executed_functional_test_cases/README.md) on isolated port 4284. Use Chromium, one worker and no runner retries. API setup supports isolation; browser controls perform payroll and recovery.
3. Execute TC03/TC04 by Python standard-library HTTP using the exported Postman request bodies against the identified buggy service on port 4275. Retain methods, endpoints, inputs, responses and saved-state outcomes. Postman reproduction remains available; do not claim Postman execution.
4. Keep business expectations unchanged. The verification wrapper may succeed when it confirms a known buggy failure signature; TC07 must still be recorded as Fail if its business assertion fails.
5. Investigate anomalies within the selected rules. For TC07, retain the first Paid/Pending state and the retry payment IDs/amounts; compare delivery-only recovery and the completion predicate if needed. Supporting probes do not increase the eight-case count.
6. Present the eight outcomes, traceability, evidence and actionable defect report for G3 review. Do not begin fixed retesting until G4 approval.

The pay instant is simulated Tuesday 13 October 2026, 09:00 UTC. It covers 5 October 00:00 inclusive → 12 October 00:00 exclusive. TC02 also checks the next week paid on 20 October. Amounts are synthetic integer USD cents; 150000 means $1,500.00. No real money or messages move.

### Progress control and completion criteria

**Current RUN-002 progress:** buggy 8/8 executed, 7 Pass / 1 Fail (TC07); fixed 8/8 executed, 8 Pass / 0 Fail. No blocked/skipped cases or runner retries. G3 findings Accepted, G4 execution Authorized/completed, and G5 local handoff accepted following Aniekan's “Verified!” correction confirmation. PAY-001 is Verified fixed for the pinned fixed build. His verification method and detailed observations were not supplied. Report completed/planned totals, rule coverage, case outcomes, blockers and changed risks at material checkpoints and before review. Preserve an invalid attempt as a harness/environment issue rather than a product verdict.

G3 is ready when each buggy case has an observed outcome or explicit blocker, evidence identifies its inputs/build, and the primary defect report includes reproduction, expected/actual, severity, cause or a marked hypothesis, proposed fix and release blockers. Unresolved cause or invalid evidence remains an investigation gap.

G4 will identify the fixed build and review the correction against that cause, then authorize confirmation of TC07 plus the seven adjacent cases under the same expectations. Retest results must remain separate from the original failures. A verified correction supports defect closure; a code change alone does not.

G5 evaluates the complete evidence against BR01–BR06. For a Ready recommendation on this local scope, all eight fixed cases must be validly executed and pass, with no unresolved payment-identity or recovery blocker. Record any exceptions as limitations and an explicit human decision, never as an unobserved Pass. Retain before/after references, reusable regression and recovery instructions, then record the QA decision and any open follow-up.

**Process improvement carried forward from RUN-001:** keep source/document handling explicitly UTF-8 and inspect assertion text before execution. The prior encoding error was a harness problem. Any recurrence must be repaired and followed by a separately recorded valid run without changing the business oracle.

This packet excludes performance, usability, accessibility, security and new product-code changes. Those objectives can use the same workflow after their scope and criteria are agreed. Completion of RUN-002 is separate from completing the application: the new Loom and professional application review remain outstanding.

## RUN-002: findings and fixed-retest proposal

**Current stage: G5 local handoff accepted following correction confirmation; PAY-001 Verified fixed for the pinned fixed build.** At the earlier G3 checkpoint, Aniekan replied “accepted. continue” after the focused guide; its specific checks, observations and payment references were not supplied. The later “Verified!” reply confirms the correction in response to the G5 briefing, without supplying a verification method. Neither reply is represented as a particular manual reproduction or source check. The earlier combined request remains withdrawn; G4 received its separate authorization.

### Decision 1: review the finding and proposed correction

| Item for acceptance | Evidence / explanation | Why it matters |
| --- | --- | --- |
| Execution summary | All eight buggy cases ran on fresh records: TC01, TC02, TC03, TC04, TC05, TC06 and TC08 passed; TC07 failed. Six UI cases used Chromium POM; TC03/TC04 used direct HTTP from exported payloads, not Postman execution | Establishes the actual coverage and prevents setup requests or control probes being counted as extra cases |
| Observed defect | Amara had $1,500 approved. First processing saved one Paid payment and a Pending notification. Retrying payroll retained that payment and added another $1,500 payment, producing $3,000 | Directly violates one employee-period payment, BR04/BR06 |
| Proposed classification | Severity High (duplicate financial record), priority P1/release blocker, status Open; buggy flow Not ready | An operator recovery action can duplicate payment. Existing fixed-reference code does not itself close the defect |
| Confirmed local cause | The buggy completion query requires a Sent notification. At Paid/Pending, read-only SQL found payment identity but no match for that query. Delivery-only recovery followed by payroll retry preserved one payment | Connects the duplicate to notification-dependent completion, rather than wrong earnings or period selection |
| Proposed corrective approach | Reuse the committed employee-period payment independently of delivery state, enforce uniqueness, and recover delivery while preserving the payment and linked notification | Addresses the cause and adds storage protection; an existing fixed reference contains this approach |
| Evidence limits | Synthetic local ledger, simulated delivery, sequential Chromium checks. A supporting probe initially used a wrong database path; no SQL conclusion came from that attempt, and the corrected fresh probe verified the configured dataset | Limits the conclusion to this fixture; does not establish production safety or other testing coverage |

[RUN-002 UI evidence](../Quality%20Control/Buggy%20build/Functional%20testing/functional-testing-results.md#run-002) identifies original payment **e2e76454-6e9c-4203-bec4-a59bfe106b88** and duplicate **9ce922f1-a013-4059-bcd6-e8c962ff3f6e** in dataset **38b2a7f8-cd84-43a2-99d9-b0f94d59a4c2**. The [API evidence](../Quality%20Control/Buggy%20build/API%20testing/api-testing-results.md#run-002) records the two passing cases. The [actionable report](../Quality%20Control/bug_report/duplicate-payment-after-notification-failure.md#run-002-findings-review) contains reproduction, root cause, proposed fix and release blockers.

**Review task:** use the confirmation guide below to check the reported defect and cause, assess the proposed severity/priority/status and review whether the corrective approach addresses that cause. Then return your observations and an approve/reject/change/investigate/blocked decision. Findings approval permits completion of retest planning; it does not authorize fixed execution, product changes, defect closure or release.

### QA confirmation guide: PAY-001

The local buggy application is already running at **http://127.0.0.1:4275**. Target build: **mustpayroll-0.3.0-faulty-eb7f01eeae99**. Use fresh synthetic records for each sequence; do not reset or reuse the agent's failed dataset. The guide does not execute anything by itself, and no human confirmation has been recorded yet.

#### 1. Prepare the controlled precondition

This local demo needs a one-shot notification-delivery failure to reproduce the condition. Run the PowerShell setup below. It checks the build, creates one approved Amara earning and arms that failure. It does **not** process payroll. These calls only prepare test data; the actual reproduction afterward uses browser controls.

~~~powershell
$reviewBaseUrl = 'http://127.0.0.1:4275'
$reviewHealth = Invoke-RestMethod -ErrorAction Stop -Method Get -Uri "$reviewBaseUrl/api/health"
if ($reviewHealth.build.id -ne 'mustpayroll-0.3.0-faulty-eb7f01eeae99') {
    throw 'The running build does not match the reported defect.'
}
$reviewRecords = Invoke-RestMethod -ErrorAction Stop -Method Post -Uri "$reviewBaseUrl/api/payroll-datasets" -ContentType 'application/json' -Body '{"testDataPreset":"oneApprovedEarning"}'
$reviewDatasetId = $reviewRecords.payrollDatasetId
Invoke-RestMethod -ErrorAction Stop -Method Post -Uri "$reviewBaseUrl/api/payroll-datasets/$reviewDatasetId/test-controls/next-failure" -ContentType 'application/json' -Body '{"failureType":"notificationDelivery"}' | Out-Null
Write-Output "$reviewBaseUrl/pay-runs?payrollDatasetId=$reviewDatasetId"
~~~

Fixture: Amara Okafor, one Approved earning of **$1,500**, earned **8 October 2026**. Pay date **13 October 2026, 09:00 UTC**; covered period **5 October 00:00 included → 12 October 00:00 excluded**. The selected date is simulated; waiting until Tuesday is unnecessary.

If the service is unavailable or its build differs, report that prerequisite and do not judge the defect from unrelated records. The [application setup](../../README.md#start-the-applications) is available if a restart is needed.

#### 2. Confirm the defect through the browser

1. Open the **normal web address printed by the setup**, not an API endpoint. In Pay runs, select **13 October 2026**. Confirm Approved pay **$1,500** and Recorded pay **$0**.
2. Select **Pay on Tuesday 09:00 UTC** and confirm. Recorded pay should now be **$1,500**.
3. Open **Payments**, inspect Amara's receipt and record the payment reference. Open **Notifications** and confirm the linked notification is **Pending**. This is the required Paid/Pending checkpoint; if it is absent, do not continue as though the precondition succeeded.
4. Return to **Pay runs**, keep the same pay date, select **Retry pay run** and confirm.
5. Compare Approved pay, Recorded pay and payment records. The rule requires **$1,500 and the original single payment**. The reported faulty result is **$3,000 across two distinct $1,500 payment references**, with Approved pay still **$1,500**. Inspect Payments and Notifications to record what actually happened.
6. Retain your dataset ID, selected date/build, original and second payment references, observed totals and notification states. Short notes are sufficient; a screenshot is optional. If the result differs, report it rather than matching the report by assumption.

This confirms only the selected defect. It is not a manual rerun of all eight regression cases.

#### 3. Check the supported cause

1. Inspect **hasCompletedPayment** in the [buggy payment policy](../../MustPayroll/MustPayroll_buggy/server/payment-policy.mjs). Its query joins payments to notifications and requires **n.state='sent'**.
2. Inspect **processPayRun** in [payroll.mjs](../../MustPayroll/MustPayroll_buggy/server/payroll.mjs): a matching completion result skips payment creation; no match leads to a new payment. Relate this to the Paid/Pending checkpoint above: a saved payment exists, but the Sent condition is false.
3. To check the dependency behaviorally, run the setup again for a **new** dataset and open its printed browser URL. Process **13 October** once and note the Paid $1,500 reference with Pending notification.
4. This time, open **Notifications → Retry pending notifications** first. Confirm delivery becomes Sent. Then return to the same Pay runs date and select **Retry pay run**. The reported control result is still one **$1,500** payment with the **original reference**.
5. Compare the two sequences. Notification state changes whether the faulty completion check recognizes an already saved payment. Record whether the source and control support the reported cause, suggest another cause or leave a specific uncertainty.

The agent's [recorded read-only predicate probe](../Quality%20Control/bug_report/duplicate-payment-after-notification-failure.md#run-002-findings-review) provides supporting evidence. Running SQL is not required for this focused human check. A different result or ambiguous source path should be returned for investigation.

#### 4. Review severity, priority and status

| Field | Agent's proposed assessment | What to confirm or challenge |
| --- | --- | --- |
| Severity / impact | High: duplicate payment record in the core payroll flow, requiring reconciliation | Does the observed duplicate breach the one-payment rule and make operator recovery unsafe? Assess this local financial effect without claiming real funds moved |
| Priority / urgency | P1: fix or block this flow before releasing the intended payroll behavior | Is releasing with this known recovery defect acceptable? If another priority is appropriate, state why |
| Status / defect state | Open: failure reproduced by the agent; accepted correction verification is outstanding | Keep Open while human confirmation/retest is unresolved. Open is not a severity level, and existing fixed source is not closure evidence |

These are proposed project classifications. Record agreement or a replacement assessment for each; do not combine severity, priority and status into one label.

#### 5. Review the proposed corrective approach

1. Compare **hasCompletedPayment** in the [fixed policy](../../MustPayroll/MustPayroll_fixed/server/payment-policy.mjs). It checks the saved payment by dataset, period and employee, without requiring a Sent notification.
2. Inspect the **one_fixed_payment** unique index and its **behavior='fixed'** condition in [the fixed payroll source](../../MustPayroll/MustPayroll_fixed/server/payroll.mjs). Check that it protects one employee-period payment in this reference.
3. Confirm that the approach must reuse the existing payment and retain its amount, destination and linked notification while retrying delivery. It must still permit payroll retry when payment recording genuinely failed.
4. Decide whether the approach addresses the demonstrated cause, or identify a gap/change. This is source/approach review only. **Do not run fixed payroll as part of this G3 check**; the eight-case correction verification remains a separate G4 execution decision. Sequential local evidence does not establish external-bank or concurrent-worker guarantees.

#### 6. Return your observations and decision

Return rough notes in this structure; a formal form is unnecessary:

- **Defect:** reproduced / not reproduced / blocked; what happened, dataset/build/date and payment references.
- **Cause:** supported / alternative explanation / needs investigation; source/control checks performed and any uncertainty.
- **Classification:** severity assessment, P1 priority and Open status confirmed or changed, with reasons.
- **Corrective approach:** adequate / changes needed / uncertain, with the relevant dependency or gap.
- **G3 decision:** approve, approve with specified changes, reject, request further investigation or unable to confirm. State which claims your decision covers.

No result or confirmation is inferred until you return. A findings decision does not authorize fixed execution, closure or release.

### G4 fixed-reference execution packet v1

**Authorized on 22 October 2026:** Aniekan replied “Authorized” after the final-response G4 briefing itemized every case, required result, rationale, method and limits. Scope: the eight fixed-reference cases below and bounded investigation. This is execution authorization, not a human test result, defect closure or G5 approval.

Target: existing fixed build **mustpayroll-0.3.0-fixed-ca7ffbea67ec**. The correction uses saved payment identity and an employee-period uniqueness constraint. No new product-code implementation is proposed.

**Readiness verified on 21 October 2026:** all fixed source/runtime files match the manifest; the normal service on port 4276 reports the same pinned build and source fingerprint. All seven helper/POM/spec files match the buggy project's counterparts. These are read-only preparation checks, not new fixed-case results.

**Execution method:** six Chromium POM cases on isolated port 4285, one worker, zero runner retries; TC03/TC04 use Python HTTP against the identified fixed service on port 4276 with the exported Postman bodies. Use fresh synthetic records per case, preserve RUN-001 fixed and RUN-002 buggy evidence, and record new fixed results separately. Recheck runtime/build and setup at execution start. A case failure or harness error is retained and investigated; expectations are never changed to fit the application.

| Case / channel | Proposed action | Required result | Why this check is needed after correction |
| --- | --- | --- | --- |
| TC01 / UI | Process approved current-period earnings alongside Pending, Rejected and next-period records | $4,350 across Amara $1,500, Daniel $2,000 and Zara $850; excluded records remain unpaid | Check that recovery protection has not changed eligibility or aggregation |
| TC02 / UI | Process the opening/closing boundary fixture for 13 Oct, then 20 Oct | $400 each week; opening included, closing earning paid only next week | Check that employee-period payment identity does not skip the next week's legitimate payment |
| TC03 / API | Import $200 before opening and $100 at opening using explicit timezone offsets, then process | One $100 payment; before-opening earning excluded | Confirm normalized timestamps still select the correct period |
| TC04 / API | Import the identical $1,500 earning ID twice, then process | One earning and one $1,500 payment | Distinguish input deduplication from payment-retry protection |
| TC05 / UI | Fail payment recording once, then retry payroll | Initially no payment or notification; retry records one $1,500 payment | Ensure the new completion check does not mistake a failed payment for a completed one |
| TC06 / UI | Fail notification delivery after payment, then retry notifications only | Original $1,500 payment and notification IDs retained; Pending becomes Sent | Preserve the existing delivery-only recovery route |
| TC07 / UI | Fail notification delivery after payment, then retry payroll | One $1,500 payment; original payment/notification IDs, amount and destination retained; notification Sent | Directly disprove the reproduced duplicate-payment failure |
| TC08 / UI | Process payroll without a controlled fault and inspect payment/notification | One Paid $1,500 payment and one linked Sent notification; payment commits first | Ensure the correction preserves normal notification creation and ordering |

Use fresh records, the same amounts and expected outcomes as buggy, one Chromium worker and no runner retries; execute API cases through Python HTTP using the exported request bodies. Supporting API setup/probes do not add cases. Preserve buggy evidence and record fixed results separately.

This set combines the defect confirmation (TC07) with adjacent regression: eligibility, weekly selection, input duplication, failed-payment recovery and delivery. It does not add concurrency, crash, live-bank/provider, performance, usability, accessibility or security coverage.

**Authorized G4 scope:** these eight fixed-reference cases and bounded investigation only, followed by observed results for human review. All eight must pass validly to support the scoped readiness recommendation; TC07 must preserve the original $1,500 payment, destination and notification identity while recovering delivery. Authorization does not cover product-code changes, production release, automatic defect closure or G5 handoff. G3 has its own recorded acceptance and G4 execution was separately Authorized. The run completed with eight observed fixed passes; the linked RUN-002 records are separate from RUN-001. Complete the G3 confirmation record with whatever human checks/observations are supplied; do not manufacture them from the acceptance.

## RUN-002: completion review and human correction confirmation

**Agent result — 22 October 2026, Africa/Lagos:** buggy **7 Pass / 1 Fail**; fixed **8 Pass / 0 Fail** under the same expectations. Six UI and two direct-HTTP cases ran per build; setup/probes are not extra cases. Postman itself was not executed.

| Case | Buggy | Fixed | Observed comparison |
| --- | --- | --- | --- |
| TC01 | Pass | Pass | Approved-only payroll $4,350; excluded records unpaid |
| TC02 | Pass | Pass | $400 each adjacent week; correct opening/closing allocation |
| TC03 | Pass | Pass | $100 at opening selected after offset conversion; earlier $200 excluded |
| TC04 | Pass | Pass | Earning ID retained once; one $1,500 payment |
| TC05 | Pass | Pass | Failed payment creates no payment/notification; retry pays once |
| TC06 | Pass | Pass | Delivery-only recovery preserves payment and notification |
| TC07 | Fail | Pass | Buggy reaches $3,000; fixed preserves original $1,500 payment and linked notification |
| TC08 | Pass | Pass | One Paid payment and linked Sent notification; payment commits first |

[Fixed UI evidence](../Quality%20Control/Fixed%20build/Functional%20testing/functional-testing-results.md#run-002): dataset `59464532-4593-4286-a629-f24a78390da6`, retained payment `c3766df6-d985-4bbe-8c95-a275bb2126d9`, retained notification `dc047b2e-f08a-489b-872d-e68517951183`, unchanged Meridian Bank · •••• 4821 destination; notification Pending to Sent. [Fixed API evidence](../Quality%20Control/Fixed%20build/API%20testing/api-testing-results.md#run-002) records the two fresh responses.

### Agent recommendation and decision boundary

The fixed sequential local payroll flow meets BR01–BR06 within the eight-case scope: **Ready with known limitations**. The intentionally buggy control remains **Not ready**. PAY-001 passed automated correction verification and is now **Verified fixed** for `mustpayroll-0.3.0-fixed-ca7ffbea67ec` following Aniekan's correction confirmation.

**Recorded G5 decision — Aniekan, 22 October 2026:** “Verified!” in response to the final briefing that proposed accepting the local QA handoff and marking PAY-001 Verified fixed for the pinned fixed build. Correction confirmation and the scoped handoff/disposition are recorded on that basis. The reply contains no verification method, dataset or individual checkpoint observations; no manual run, source inspection or payment reference is attributed to the human. Keep the deliberately buggy build and its failed result as the reproducible control.

The accepted scope permits recording and publishing this local handoff and defect disposition. It does not authorize production release or complete the broader assessment. The confirmation guide below remains available for reproduction; an unexpected payment, changed reference/destination or failed recovery should reopen investigation rather than be aligned with the recorded result by assumption.

**Closure-documentation correction — 22 October 2026:** the earlier closing message did not present release notes, a complete sign-off packet or concrete owner/action handoff. The [RUN-002 release-handoff supplement](releases/RUN-002-release-handoff.md) now consolidates those facts from the existing evidence and decision. It is a later document, not a packet claimed to have been reviewed before the original reply. No new testing, human verification method, deployment or receiver acceptance is inferred. The strengthened G5 procedure above applies to future closures.

Limits: real banks/delivery, concurrent workers, process crashes, authentication/account changes and additional browsers remain unverified. The broader assessment is incomplete: the new Loom and professional-application review are outstanding. The weighted rubric/rejection reason was not supplied. A local QA handoff decision does not complete the entire assessment.

### QA confirmation guide: corrected payroll retry

Use **http://127.0.0.1:4276**, build **mustpayroll-0.3.0-fixed-ca7ffbea67ec**, and fresh records. This focused check does not require replaying all eight cases. Do not reset/reuse the agent's failed or passing datasets.

**Preparation only:** this PowerShell block checks the build, creates Amara Approved earnings of $1,500 and arms one delivery failure. It does not process payroll.

~~~powershell
$reviewBaseUrl = 'http://127.0.0.1:4276'
$reviewHealth = Invoke-RestMethod -ErrorAction Stop -Method Get -Uri "$reviewBaseUrl/api/health"
if ($reviewHealth.build.id -ne 'mustpayroll-0.3.0-fixed-ca7ffbea67ec') {
    throw 'The running build does not match the fixed reference.'
}
$reviewRecords = Invoke-RestMethod -ErrorAction Stop -Method Post -Uri "$reviewBaseUrl/api/payroll-datasets" -ContentType 'application/json' -Body '{"testDataPreset":"oneApprovedEarning"}'
$reviewDatasetId = $reviewRecords.payrollDatasetId
Invoke-RestMethod -ErrorAction Stop -Method Post -Uri "$reviewBaseUrl/api/payroll-datasets/$reviewDatasetId/test-controls/next-failure" -ContentType 'application/json' -Body '{"failureType":"notificationDelivery"}' | Out-Null
Write-Output "$reviewBaseUrl/pay-runs?payrollDatasetId=$reviewDatasetId"
~~~

**Browser confirmation:**

1. Open the printed normal web address. In Pay runs select **13 October 2026**. Confirm Approved pay **$1,500**, Recorded pay **$0**, and period **5 October 00:00 included → 12 October 00:00 excluded**. The Tuesday 09:00 UTC instant is simulated.
2. Select **Pay on Tuesday 09:00 UTC** and confirm. Open Amara's receipt in Payments; note its reference, $1,500 amount and masked destination. In Notifications confirm one linked Pending notification. If this Paid/Pending checkpoint is absent, report it before continuing.
3. Return to Pay runs with the same date. Select **Retry pay run** and confirm.
4. Confirm Recorded pay remains **$1,500**, one Paid payment remains, and the receipt has the same reference, amount and destination. The linked notification should be **Sent**, with no second payment.
5. Compare your observations with the RUN-002 results. A different outcome is an investigation item; do not align it with the report by assumption.

**Optional read-only ID corroboration:** to independently inspect notification IDs, run this GET after step 2 and retain the output. Run it again after the browser retry and compare the original IDs, amount and destination. It does not process/retry anything.

~~~powershell
$reviewStateUrl = "$reviewBaseUrl/api/payroll-datasets/" + $reviewDatasetId + '?scheduledPayRunAt=2026-10-13T09%3A00%3A00.000Z'
$reviewSnapshot = Invoke-RestMethod -ErrorAction Stop -Method Get -Uri $reviewStateUrl
$reviewSnapshot.payments | Select-Object paymentId, amountCents, bank, accountEnding
$reviewSnapshot.notifications | Select-Object notificationId, paymentId, deliveryStatus
~~~

Original payment/notification IDs and destination must remain; only delivery changes from pending to sent. If you inspect the published automated checkpoints instead, record that review method.

**Return notes:** build/dataset/pay date, first/retry totals/payment count/reference, notification outcome, checks/evidence reviewed, uncertainty and local-handoff decision. Explicitly name any defect disposition you authorize for the fixed reference. Screenshots are optional. Specific G3 observations have not been supplied; add them if available rather than having the agent infer them.

**Confirmation received:** Aniekan subsequently replied “Verified!” after the final briefing and these instructions. Retain that reported outcome separately from the agent's executed checkpoints; the human verification method and detailed observations were not supplied. Retain the intentionally faulty build and original failure evidence.

## Review history and current decision

| Date / reviewer | Scope | Decision / state |
| --- | --- | --- |
| 21 Oct 2026 / Aniekan | Operating model and starting testing types | Confirmed AI-led work with human review; start payroll regression through UI + API, retaining adaptability |
| 21 Oct 2026 / Aniekan | RUN-002 packet v1 | Requested industry-workflow research before continuation; execution not approved |
| 21 Oct 2026 / Aniekan | Standards-research follow-up | “Proceed” authorized implementing the recommended workflow and revised packet; it does not record review of the resulting v2 execution packet |
| 21 Oct 2026 / Codex | Revision and preparation | Seven activities mapped, readiness checks recorded and packet v2 prepared; no RUN-002 application cases executed |
| 21 Oct 2026 / Aniekan | RUN-002 G1/G2 approval request | Requested an explanation of the cases and why they were selected; the linked packet alone felt like blind approval. No execution approval given |
| 21 Oct 2026 / Codex | Case-selection briefing | Added per-case rationale, channel choices, alternatives and coverage limits; business cases and expected results unchanged |
| 21 Oct 2026 / Aniekan | RUN-002 G1/G2 packet v2 with briefing | “Approved, but update the workflow to prevent blind approval.” Approved the eight buggy cases and bounded investigation after reviewing the conversational case/rationale/expected-outcome briefing. Condition implemented before execution; no manual script review or test replay claimed |
| 21 Oct 2026 / Codex | RUN-002 buggy execution | Done: UI 5 Pass / 1 Fail, API 2 Pass; TC07 duplicated $1,500 into $3,000. Original records and diagnostics retained |
| 21 Oct 2026 / Aniekan | Combined G3/G4 request | Changes requested: the request again felt blind and did not itemize what was being approved and why; no findings acceptance or execution authorization |
| 21 Oct 2026 / Codex | Approval safeguard correction | Withdrew combined request, added required decision format/pre-send check, itemized G3 claims and G4 case/action/result/rationale preview |
| 21 Oct 2026 / Aniekan | G3 confirmation method | Requested time to personally confirm the defect, cause, classification and proposed correction; required the workflow to provide clear confirmation steps before a decision |
| 21 Oct 2026 / Aniekan | RUN-002 G3 findings decision | “accepted. continue” — findings decision Accepted. Specific confirmation method/observations not supplied; not recorded as personal manual reproduction or source inspection |
| 21 Oct 2026 / Codex | G4 preparation | Pinned fixed source/runtime and served identity verified; seven test/POM/helper files match; no fixed cases executed |
| 22 Oct 2026 / Aniekan | RUN-002 G4 execution packet v1 | “Authorized” following the complete final-response eight-case briefing. Authorizes fixed execution/bounded investigation only; not closure, production release or handoff |
| 22 Oct 2026 / Codex | G4 execution | Done: six UI and two direct-HTTP cases passed once on fresh records; same spec/expectations as buggy; original payment/destination/notification identities retained in TC07 |
| 22 Oct 2026 / Aniekan | RUN-002 G5 correction confirmation and local handoff | “Verified!” following the self-contained results, focused confirmation instructions and proposed handoff/disposition. Correction confirmed; local handoff accepted as Ready with known limitations; PAY-001 Verified fixed for the pinned fixed build. Method/dataset/detailed observations not supplied; no particular human execution or source check claimed. Production release and broader assessment completion remain outside this decision |

For a decision, record the reviewer/date, packet revision, review method, accepted limits and next authorized work. Copy essential current state into the shared context.

RUN-001 was executed under earlier authorization: buggy 7 Pass / 1 Fail and fixed 8 Pass. Its [investigation](../investigation.md) and result tables remain historical evidence with human review Pending; the workflow revision does not approve or replace them.

## RUN-002: scope and test-design packet v1

**Historical packet; superseded by v2 and never approved for execution.** It proposed these same eight payroll cases, buggy first, then findings review and separately approved fixed retest. The QA engineer requested standards research instead of execution approval. The preserved [v1 record](https://github.com/Aniekanetim/MustPayroll-AI-QA/blob/1d272eca859b24c39c5d1ac9dff0fd36ab662bfd/QA/Quality%20assurance/qa-workflow.md#run-002-scope-and-test-design-packet-v1) contains the original text. Its assumptions and earlier preflight are not new RUN-002 outcomes.
