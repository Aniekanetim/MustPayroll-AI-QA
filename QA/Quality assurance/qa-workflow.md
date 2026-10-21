# AI-led QA workflow with human review

**Current status — 21 October 2026:** the QA engineer authorized the standards-informed workflow revision. RUN-002 packet v2 is ready for scope, design and readiness review. Its application-test execution is not yet approved. RUN-001 remains a separate completed execution awaiting human review.

## Purpose and responsibilities

The agent performs the testing work. The QA engineer directs priorities, checks the reasoning and evidence, and approves the scoped decisions. Human verification can include inspecting requests, records, scripts and assertions; it does not require manually repeating every agent action. Record the review actually performed.

Testing checks product quality. Quality assurance also improves the process that produces those checks, including requirement review, execution controls and lessons learned. Both are needed here.

| Responsibility | AI agent | QA engineer |
| --- | --- | --- |
| Establish the test basis | Read requirements, identify risks and conflicts, propose measurable criteria | Confirm the objective, expected behavior and priorities |
| Prepare and execute | Design checks; prepare scripts, data and environment; operate tools and retain observations | Review coverage, assertions, readiness and execution limits |
| Investigate and report | Reproduce anomalies, distinguish causes from hypotheses, propose a correction and retest | Challenge evidence; approve findings and defect disposition |
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

Then identify the product flow, source requirements, target build/environment, data, risks, measurable criteria and operating limits. Resolve contradictions before judging behavior. Derive expected results from the agreed requirements, independently of the application's current response.

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
| G3 — Findings | Actual outcomes, evidence, reproducible defects, severity, supported cause or marked hypothesis, proposed fix and gaps | Accept findings or authorize targeted investigation; prepare retest |
| G4 — Fix and retest | Identified correction/build, original failure, confirmation checks and adjacent regression | Authorize retest; product-code changes require their own authorization |
| G5 — Completion and handoff | Criteria assessment, before/after evidence, defect disposition, residual risks, recovery and lessons learned | Approve, approve with stated limits, request changes or reject the scoped handoff |

G1 and G2 can be reviewed together when the complete packet is available. Approval identifies the packet revision, build, allowed work, reviewer and date. Silence is not approval. Within an approved scope, the agent performs routine preparation, execution, investigation and documentation autonomously.

## Monitoring, change control and records

During execution, report planned versus completed checks, Pass/Fail/Blocked outcomes, requirement coverage, anomalies and any changed risk. Record unexpected harness or environment errors separately; an error that prevents valid observation is not evidence of a product failure.

Suspend the affected checks if the build differs, data are invalid, the harness cannot test the intended rule, or an action exceeds the approved scope. Preserve the attempt and explain its impact. Repair within the approved preparation scope; obtain a revised decision when requirements, scope, method or risk materially change. Resume only when prerequisites are restored. Record any rerun separately; do not silently retry until green.

Keep these statuses distinct:

- **Work:** not_started, in_progress, blocked, redo, done or canceled.
- **Test outcome:** Not run, Pass, Fail, Partial or Blocked, with evidence. Record an execution error separately when a valid verdict cannot be reached.
- **Human review:** Pending, Approved, Changes requested or Rejected, with actual review method and decision.
- **Defect:** Open until its correction and verification support an accepted disposition; report approval alone does not close it.

Connect requirements, cases, observations, defects and retests by ID and build. Update detailed records, [shared context](../../unified_project_context.md) and ignored assistant continuity after material changes. Shared context must stand alone. A completed execution can contain failed tests, and an approved handoff can retain explicit open risks.

## RUN-002: scope and test-design packet v2

**Decision requested:** approve G1 scope/analysis and G2 design/readiness for the eight buggy-build payroll cases below. This authorizes their execution, bounded investigation and findings report. It does not approve fixed-build retesting, product changes or release.

### Objective, sources and risk analysis

Verify BR01–BR06 in [business rules](business_rules.md), especially one payment per employee-period after notification delivery fails. Use the role brief as assessment authority and the explicit payroll rules as the product oracle. The transcript informs the workflow; previous results and implementation are reference material, not expected-result sources.

[Intent](intent.md) ranks three plausible failures: duplicate payment after failed delivery, incorrect weekly cut-off and duplicate earning import. Duplicate payment is investigated deeply because a recovery action could repeat its financial effect. Boundary and duplicate-input cases provide adjacent protection. Likelihood is a reasoned hypothesis; production frequency is unknown.

The local rules have no unresolved conflict preventing these eight checks. Concurrency, process crashes, real banks/delivery, account changes and authorization remain outside this cycle. Eight cases meet the assessment minimum within this selected scope; they do not establish comprehensive product coverage. This is a controlled white-box demo, not blind discovery of a live incident.

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

| Entry criterion | Preparation evidence | Remaining action |
| --- | --- | --- |
| Known product baseline | All files listed in both local build manifests match their hashes; health endpoints report the matching IDs below | Recheck the target at execution start and retain its identity |
| Inspectable test implementation | Both execution projects pass TypeScript no-emit checking; all seven helper/POM/spec files are byte-identical between builds | QA reviews the [browser spec](../Quality%20Control/Buggy%20build/Functional%20testing/executed_functional_test_cases/test/specs/ui/payroll-ui.spec.ts) and [page objects](../Quality%20Control/Buggy%20build/Functional%20testing/executed_functional_test_cases/test/pages) as part of G2 |
| Requirements-based assertions | Agent source review confirms TC07 expects one $1,500 payment and the original identities in both builds; adjacent checks map to BR01–BR06 above | QA approves the test oracle |
| Reproducible API inputs | Both collections parse; every JSON body in each API suite matches an exported request | Use those exact inputs; record the actual execution tool |
| Isolated data and controlled faults | Helpers create fresh records per case; scripts use separate test databases; one-shot controls distinguish payment failure from delivery failure | Confirm successful setup per case; stop if it fails |
| Usable runtime | Normal services respond on 4275/4276; isolated test services are configured for 4284/4285 | Before execution check runtime/browser availability and test-port availability |
| Human execution authorization | v2 prepared; no application cases run for RUN-002 | G1/G2 decision Pending |

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

**Current RUN-002 progress: 0/8 cases executed. All eight are Not run.** Report completed/planned totals, rule coverage, case outcomes, blockers and changed risks at material checkpoints and before review. Preserve an invalid attempt as a harness/environment issue rather than a product verdict.

G3 is ready when each buggy case has an observed outcome or explicit blocker, evidence identifies its inputs/build, and the primary defect report includes reproduction, expected/actual, severity, cause or a marked hypothesis, proposed fix and release blockers. Unresolved cause or invalid evidence remains an investigation gap.

G4 will identify the fixed build and review the correction against that cause, then authorize confirmation of TC07 plus the seven adjacent cases under the same expectations. Retest results must remain separate from the original failures. A verified correction supports defect closure; a code change alone does not.

G5 evaluates the complete evidence against BR01–BR06. For a Ready recommendation on this local scope, all eight fixed cases must be validly executed and pass, with no unresolved payment-identity or recovery blocker. Record any exceptions as limitations and an explicit human decision, never as an unobserved Pass. Retain before/after references, reusable regression and recovery instructions, then record the QA decision and any open follow-up.

**Process improvement carried forward from RUN-001:** keep source/document handling explicitly UTF-8 and inspect assertion text before execution. The prior encoding error was a harness problem. Any recurrence must be repaired and followed by a separately recorded valid run without changing the business oracle.

This packet excludes performance, usability, accessibility, security and new product-code changes. Those objectives can use the same workflow after their scope and criteria are agreed. Completion of RUN-002 is separate from completing the application: the new Loom and professional application review remain outstanding.

## Review history and current decision

| Date / reviewer | Scope | Decision / state |
| --- | --- | --- |
| 21 Oct 2026 / Aniekan | Operating model and starting testing types | Confirmed AI-led work with human review; start payroll regression through UI + API, retaining adaptability |
| 21 Oct 2026 / Aniekan | RUN-002 packet v1 | Requested industry-workflow research before continuation; execution not approved |
| 21 Oct 2026 / Aniekan | Standards-research follow-up | “Proceed” authorized implementing the recommended workflow and revised packet; it does not record review of the resulting v2 execution packet |
| 21 Oct 2026 / Codex | Revision and preparation | Seven activities mapped, readiness checks recorded and packet v2 prepared; no RUN-002 application cases executed |
| Pending / QA engineer | RUN-002 G1/G2 packet v2 | Scope/design/readiness review and execution decision Pending |
| Not started | RUN-002 G3/G4/G5 | Findings, fixed retest and handoff await the preceding evidence and decisions |

For a decision, record the reviewer/date, packet revision, review method, accepted limits and next authorized work. Copy essential current state into the shared context.

RUN-001 was executed under earlier authorization: buggy 7 Pass / 1 Fail and fixed 8 Pass. Its [investigation](../investigation.md) and result tables remain historical evidence with human review Pending; the workflow revision does not approve or replace them.

## RUN-002: scope and test-design packet v1

**Historical packet; superseded by v2 and never approved for execution.** It proposed these same eight payroll cases, buggy first, then findings review and separately approved fixed retest. The QA engineer requested standards research instead of execution approval. The preserved [v1 record](https://github.com/Aniekanetim/MustPayroll-AI-QA/blob/1d272eca859b24c39c5d1ac9dff0fd36ab662bfd/QA/Quality%20assurance/qa-workflow.md#run-002-scope-and-test-design-packet-v1) contains the original text. Its assumptions and earlier preflight are not new RUN-002 outcomes.
