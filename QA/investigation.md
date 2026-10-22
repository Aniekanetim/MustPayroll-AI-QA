# AI-led investigation record

**Current status — 22 October 2026:** RUN-002 is complete: buggy 7 Pass / 1 Fail; fixed 8 Pass / 0 Fail after separate G4 authorization. [The latest comparison](#run-002-fixed-execution-and-final-comparison--22-october-2026) records the corrected retry. Aniekan subsequently replied “Verified!” after the G5 briefing: correction confirmed, PAY-001 Verified fixed for the pinned fixed build, and local handoff accepted as Ready with known limitations. The sections below preserve chronological checkpoints; a Pending status in an earlier entry describes that time, not the current state.

## Question and sources

Can a payroll retry recover notification failure without paying an employee again? BR04 and BR06 require one employee-period payment and recoverable notification work. The supplied MUST role brief establishes the assessment requirements. The transcript explains the AI-led workflow; the previous MustPayroll supplies reusable application/page-object code. No previous result counts as evidence of this attempt.

This is a **white-box controlled demonstration**. Codex knows the deliberately faulty policy. It is not a blind discovery or a historical production incident.

## Observed browser investigation — 21 October 2026, UTC

Codex controlled the real in-app browser using fresh isolated records. Technical setup created one approved $1,500 earning for Amara and armed a single notification-delivery failure. Payroll and recovery actions below were clicked in the browser, not substituted with HTTP calls.

| Step | Action | Observed result | Meaning |
| --- | --- | --- | --- |
| 1 | In buggy, process the 13 Oct pay run | $1,500 recorded, one Paid payment; employee notification Pending | Payment succeeded before delivery failed |
| 2 | Retry that same pay run without changing earnings/date | $3,000 recorded; two distinct Paid references, two Sent notifications | The retry repeated the financial effect |
| 3 | In fresh buggy records, repeat step 1, then use Notifications → Retry pending notifications | Same $1,500 payment; existing notification changed to Sent | Delivery-only recovery preserved payment |
| 4 | Retry payroll after step 3 | Still one $1,500 payment with its original reference | Changing delivery state removed the erroneous eligibility |
| 5 | In fixed, repeat steps 1–2 with the same amount, employee and pay instant | One $1,500 payment remained; its original notification became Sent | Corrected recovery did not repeat payment |

Observed build IDs: buggy `mustpayroll-0.3.0-faulty-eb7f01eeae99`; fixed `mustpayroll-0.3.0-fixed-ca7ffbea67ec`. All runs used the Monday 5 Oct 00:00 UTC inclusive → Monday 12 Oct 00:00 UTC exclusive period, paid on 13 Oct 09:00 UTC.

| Browser observation | Test-record ID | Payment evidence |
| --- | --- | --- |
| Buggy failure | `496bfeea-66f1-4a78-847f-b6175c5161a1` | Original `a691679c-295e-49bd-84f9-e52c4ac49ffa`; second `3dd4d944-4822-4aec-b10a-6eaeb62caf68` |
| Buggy delivery-first control | `5fc3478c-ff1f-493d-b17f-57afe8280368` | `122fef4c-e423-492d-8ee2-b06fa1a229b6` remained the only payment |
| Fixed retest | `355bb14e-74d7-48ed-a959-761bbe599649` | `56dd0dec-bfe3-478a-ad63-42623ee4c1ac` remained the only payment |

These IDs identify local synthetic records; recreating the case generates new IDs. The API reads corroborated saved amounts and references after the browser actions. No Postman execution is claimed.

## Root-cause verification

The source hypothesis was that the completion query checked `notification.state = 'sent'` rather than committed payment identity. The delivery-first browser countercheck supports that explanation: with the same earnings and pay instant, successful delivery changes the next payroll retry from duplicate payment to no duplicate.

Codex also inspected a fresh Paid/Pending checkpoint through read-only SQLite queries. In both builds, the Sent-notification predicate returned **no row**, while the saved-payment predicate returned **one row**. The buggy build chooses the first predicate. The fixed build chooses the second and activates the unique employee-period payment constraint. The [defect report](Quality%20Control/bug_report/duplicate-payment-after-notification-failure.md) contains the cause, correction and release gates.

## Automation quality check

The first migrated test run was invalid: a Windows text-encoding conversion corrupted expected punctuation in bank destinations and period arrows. Codex corrected the test-file encoding. Dollar amounts, business expectations and application behavior were unchanged. That attempt is not counted as six application failures or as release evidence. Its local diagnostic report is retained in ignored `data/playwright/initial-harness-error.json` in each execution project. A fresh full run is required after that correction.

## Final executed comparison

After correcting the harness encoding, Codex ran the complete six-case POM suite once per build with no runner retries or skipped cases. Buggy: **5 UI passed / 1 UI failed (TC07)**. Fixed: **6 UI passed / 0 failed**. TC07 failed on expected $1,500 versus actual $3,000, not on a locator or setup error. The browser spec is byte-identical in both projects.

Direct HTTP checks confirmed the separate TC03 and TC04 cases on both builds using the exported Postman request bodies. Combined coverage is **eight cases per build**: buggy **7 passed / 1 failed**, fixed **8 passed / 0 failed**. No collection export or setup request is counted as another executed test.

Final UI run finished: buggy `2026-10-21T20:21:19.484Z`; fixed `2026-10-21T20:21:09.469Z`. [Buggy UI evidence](Quality%20Control/Buggy%20build/Functional%20testing/functional-testing-results.md) and [fixed UI evidence](Quality%20Control/Fixed%20build/Functional%20testing/functional-testing-results.md) retain build IDs, fingerprints, actual results and original/retry payment references. [API evidence](Quality%20Control/Fixed%20build/API%20testing/api-testing-results.md) identifies the direct HTTP execution method; Postman was not executed.

## Ownership and remaining work

Aniekan authorized the strategy and the complete root-cause report. Codex operated the browser, inspected saved records, investigated the cause and prepared/executed the tooling. Candidate review of this new evidence, a new Loom and final submission approval remain unrecorded. No agent action is represented as personal manual execution, and no rejection reason or predicted assessment score is inferred.

## Workflow clarification — 21 October 2026

Historical checkpoint; the later revision section records the current packet status.

Aniekan confirmed that the agent should automate the standard QA workflow with human review and approval end to end, across functional and non-functional testing types. The testing-type intake starts a new cycle when that choice is missing. The [workflow](Quality%20assurance/qa-workflow.md) now defines scope, design/execution, findings, retest and handoff review gates.

The executions above remain RUN-001 historical observations with human review Pending. This clarification approves the operating model, not those results or a release. Aniekan then selected payroll regression across UI and API for RUN-002, while confirming the workflow must adapt to any relevant testing type. Scope/design packet v1 is ready for G1/G2 review. No new test execution or application change is claimed by this documentation update; the only environment preflight read health/build metadata.

## Standards review before RUN-002 — 21 October 2026

Historical checkpoint before authorization to implement the recommendations.

The QA engineer requested industry-workflow research instead of approving the proposed execution packet. Codex reviewed primary ISTQB material and public ISO standard descriptions. [The review](Quality%20assurance/qa-workflow-review.md) supports the human-reviewed AI model and recommends clearer analysis, preparation, ongoing control and completion activities beneath the project gates. These recommendations are not yet a QA-approved process revision. RUN-002 remains on hold; no new application tests, product-code changes or result updates were made.


## Workflow revision and RUN-002 preparation — 21 October 2026

Following the standards research, Aniekan authorized implementing the recommendations. Codex revised the workflow and [RUN-002 packet v2](Quality%20assurance/qa-workflow.md#run-002-scope-and-test-design-packet-v2): seven testing activities beneath five project review gates, explicit risk/requirement analysis, prepared-test entry checks, continuous control, and completion against criteria.

Preparation evidence: both execution projects passed TypeScript no-emit checking; all seven helper/POM/spec files match between builds; both source/runtime manifests have no file mismatches and their health endpoints report the matching build IDs. Both Postman collections parse, and all four JSON bodies in each API suite match exported requests. Source review retained the same $1,500/payment-identity assertions for TC07. These are readiness observations, not application-test outcomes or human assertion review.

RUN-002 remains 0/8 executed with G1/G2 review Pending. RUN-001 outcomes and their pending human-review status are unchanged. The submitted repository remains clean at its original commit. Product code, fixtures, automation and result tables were not modified. The next review concerns v2's scope, oracle, readiness and bounded buggy-build execution; fixed retest and handoff require their later decisions.


## Human review feedback: case-selection briefing — 21 October 2026

Aniekan did not approve execution. He requested a briefing on the proposed cases and why those cases were selected, describing the link-only request as blind approval. Codex added the selection rationale, UI/API channel explanation, alternatives and coverage limits to packet v2, and made an in-conversation briefing mandatory before future review requests. The eight business cases, expected results and RUN-001 evidence are unchanged. RUN-002 remains 0/8 executed with the human decision Pending.


## RUN-002 informed approval and execution start — 21 October 2026

After the eight-case/rationale/expected-outcome briefing, Aniekan approved packet v2 and required the workflow to prevent blind approval. Codex added an informed-approval safeguard for every gate and testing type before starting: self-contained briefing, evidence and uncertainties, alternatives, exact next authorization, opportunity for challenge and a recorded decision. The human review method was the conversational briefing; no manual script inspection or test replay is claimed.

G1/G2 authorize the eight buggy-build cases and bounded investigation. Fixed retesting, product changes and handoff approval remain outside this authorization. Execution begins with build/runtime/data preflight and preservation of RUN-001 local diagnostics.


## RUN-002 buggy execution and findings — 21 October 2026

G1/G2 approval followed the conversational briefing, and the informed-approval safeguard was implemented before execution. The pinned buggy build and source/runtime hashes matched. RUN-001 diagnostics were archived before the new run; its published observations remain separate.

Codex executed the six Chromium POM cases once, one worker and zero runner retries, from 2026-10-21T21:21:47.989Z to 2026-10-21T21:22:38.361Z. Five passed; TC07 failed the $1,500-versus-$3,000 business assertion. No runner error or skipped case occurred. TC07's original payment `e2e76454-6e9c-4203-bec4-a59bfe106b88` remained and duplicate `9ce922f1-a013-4059-bcd6-e8c962ff3f6e` was added. The retained observation precedes the failing assertion, so the saved-state evidence remains available although later assertions did not run.

TC03/TC04 both passed through Python HTTP using exported Postman payloads. Each used a fresh dataset; Postman itself was not executed. **Combined RUN-002 buggy result: 7 Pass / 1 Fail.** [UI records](Quality%20Control/Buggy%20build/Functional%20testing/functional-testing-results.md#run-002) and [API records](Quality%20Control/Buggy%20build/API%20testing/api-testing-results.md#run-002) contain actual data and identities.

A fresh Paid/Pending probe in `791fc3b4-82ed-4643-9c37-ee51ecf43fc1` found the payment but no match for the Sent-notification completion query. Recovering delivery first, then retrying payroll, preserved the original $1,500 payment. This control and the source support the completion-predicate cause. Its first attempt used the default database path instead of the configured database; that path error supplied no causal evidence and was retained as an investigation setup error. The corrected fresh probe checked dataset identity in the configured read-only database before querying.

The agent proposes one P1 defect, PAY-001, remaining Open and blocking the buggy flow. The existing fixed reference should be tested with the same eight expectations after review. G3 findings review and G4 fixed-execution approval are Pending; no RUN-002 fixed case has run. No product code, test implementation or business oracle changed.


## Repeated approval-briefing failure and correction — 21 October 2026

Aniekan returned the combined findings/retest request as blind approval because it did not clearly itemize what he was approving and why. This is a process failure, not a new product defect or test outcome. The earlier written rule had not been applied adequately: essential context was left in progress commentary and the final response was compressed, while an approval prompt combined two decisions.

Codex withdrew the combined request, recorded G3 Changes requested and kept G4 execution unauthorized. The workflow and working contract now require an explicit single decision, itemized claims/actions with evidence or pass criteria and rationale, alternatives/limits, exact authorization and a pre-send completeness check. Findings acceptance and next-stage execution cannot share one approval option. The corrected workflow itemizes G3 and lists all eight fixed cases as a preview; the immediate decision is findings acceptance only. No test execution, application change or result rewrite occurred.


## Human confirmation task requested — 21 October 2026

Aniekan asked for time to confirm the reported defect, supported cause, classification and corrective approach. He required the workflow to provide clear confirmation steps and ask the QA engineer to perform the check, then return with approval, rejection, changes or another supported response.

Codex updated G3 and added the focused PAY-001 guide: fresh-data/controlled-failure preparation, browser reproduction checkpoints, source plus delivery-first control for the cause, severity/priority/status assessment, fixed-source approach review without fixed execution, and concise return notes. High impact severity, P1 urgency and Open status are separated as proposed classifications for review. Human confirmation remains Pending; no findings approval or manual result is inferred. No tests or fixture setup were executed during this update; product code and observed result tables remain unchanged.


## G3 acceptance and separate G4 preparation — 21 October 2026

Aniekan replied “accepted. continue” after the focused confirmation guide. The G3 findings decision is recorded as Accepted. The reply contains no specific confirmation method, observations or references; no personal manual reproduction, source review or control sequence is invented.

Codex prepared G4 execution packet v1 without running fixed cases. Read-only checks matched every fixed source/runtime manifest file and its served identity on 4276: mustpayroll-0.3.0-fixed-ca7ffbea67ec. All seven helper/POM/spec files match across execution projects. The packet itemizes all eight cases, unchanged expected results, selection rationale, tools, isolation and acceptance criteria. Fixed execution requires its separate informed authorization; G5 and defect closure remain unapproved.


## G4 authorization and execution start — 22 October 2026

Aniekan replied “Authorized” to the separate G4 final-response briefing. It listed all eight fixed cases, required outcomes, selection rationale, target build, methods, isolation and exclusions. Codex is authorized to execute that plan and bounded investigation; this does not approve defect closure, release or G5 handoff. G3 acceptance is preserved, but specific human confirmation observations remain unrecorded.

The run starts by preserving RUN-001 fixed diagnostics and checking the approved build before fresh-record execution. No expected results or test code will be changed to match the application.


## RUN-002 fixed execution and final comparison — 22 October 2026

Following the explicit G4 authorization, Codex preserved RUN-001 fixed diagnostics, checked pinned source/runtime hashes and served identity, then executed the unchanged POM cases once. UTC interval 2026-10-21T23:30:43.867Z → 2026-10-21T23:31:21.690Z corresponds to **22 October, Africa/Lagos**. All six UI cases passed with one worker, zero retries/skips and no runner errors. Python HTTP separately passed TC03/TC04 using exported Postman bodies; Postman was not executed.

Fixed TC07 retained payment `c3766df6-d985-4bbe-8c95-a275bb2126d9`, notification `dc047b2e-f08a-489b-872d-e68517951183`, the $1,500 amount and original destination in dataset `59464532-4593-4286-a629-f24a78390da6`. The captured payment array and browser receipt were unchanged apart from notification state Pending to Sent; no second payment-commit event occurred. All subsequent TC07 assertions ran and passed.

**RUN-002 comparison:** buggy 7 Pass / 1 Fail (TC07), fixed 8 Pass / 0 Fail. The source/spec expectations were unchanged; old failures remain separate. Fresh [fixed UI](Quality%20Control/Fixed%20build/Functional%20testing/functional-testing-results.md#run-002) and [API](Quality%20Control/Fixed%20build/API%20testing/api-testing-results.md#run-002) records contain dates, IDs and fingerprints. No product or test code changed.

The agent recommends Ready with known limitations for the fixed sequential local scope, Not ready for the buggy control. The defect report remains Open pending human confirmation/disposition. [The completion packet](Quality%20assurance/qa-workflow.md#run-002-completion-review-and-human-correction-confirmation) provides focused manual steps and an itemized comparison; those guide steps were not executed or claimed as human work. G5/human closure and the new assessment video/application review are outstanding.

## Human correction confirmation and local handoff — 22 October 2026

After the self-contained G5 results, fresh-data confirmation instructions, limits and proposed handoff/disposition, Aniekan replied **“Verified!”** The response confirms the correction and supports recording the proposed local handoff as Ready with known limitations and PAY-001 as Verified fixed for `mustpayroll-0.3.0-fixed-ca7ffbea67ec`. It does not identify his verification method, dataset, payment references or individual observations; none are invented. The earlier Open/Pending entry above is retained as the pre-decision checkpoint.

Codex recorded the decision across the workflow, defect report, readiness checklist, directive and result-review metadata. No product or test code changed, no new tests ran, and the recorded automated outcomes remain buggy 7 Pass / 1 Fail and fixed 8 Pass / 0 Fail. Preserve the intentionally buggy control and its failure. Production release, the new Loom, professional application-material review and acceptance of a second application remain outside this local handoff.
