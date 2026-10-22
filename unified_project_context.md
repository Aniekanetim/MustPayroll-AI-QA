# MustPayroll AI-led QA: shared context

## Purpose and current state

This second assessment attempt uses a local payroll demo and an AI-led workflow with human QA review. The original [MustPayroll submission](https://github.com/Aniekanetim/MustPayroll) is preserved. Vettify supplies workflow principles, not payroll requirements or employer evidence.

**RUN-001:** historical both-build investigation/eight-case evidence retained separately. **RUN-002:** complete: buggy 7 Pass / 1 Fail (TC07), fixed 8 Pass / 0 Fail. G1/G2 were approved after the case briefing, G3 findings accepted, and G4 separately authorized and executed. On 22 October 2026, Aniekan replied “Verified!” after the self-contained G5 results, confirmation instructions and proposed local handoff/disposition. Correction confirmation is recorded; the local handoff is accepted as Ready with known limitations and PAY-001 is Verified fixed for `mustpayroll-0.3.0-fixed-ca7ffbea67ec`. His verification method, dataset and detailed observations were not supplied and are not invented. The earlier combined request remains withdrawn. Production release and broader assessment completion are outside this decision.

The application and POM are reused. Results from the previous submitted repository do not count as new evidence. The new controlled buggy policy contains only the payment-completion error; approval filtering and notification creation match the fixed reference.

## Operating model and informed approval

### Ticket-board implementation — 22 October 2026

Aniekan authorized the [implementation plan](QA/Quality%20assurance/task-board-implementation-plan.md) with “proceed with implementation,” then selected hourly check-ins. The [board](QA%20task%20management%20Board/README.md) now contains Ready for QA, Dev Todo, Tested-Ok, Retest and Rework, plus its README with inline ticket templates and operating instructions. Each Markdown ticket's containing folder is its status. The AI QA checks Ready for QA/Retest; developers check Dev Todo/Rework. Build/feature assignments and newly discovered bug tickets are separate. Each defect enters Dev Todo; the developer records a fix or refutation and moves it to Retest. The agent retests and runs relevant authorized regression. Failed original retests go to Rework, successful reviewed tickets to Tested-Ok, and new regressions get new linked tickets in Dev Todo. Parent testing tickets track their linked blocking defects.

The existing workflow still governs execution and human review. Ownership, workflow checkpoint, waiting reason and next action are ticket details; no extra board status or scheduler service was added. The board starts empty, and check-ins must not repeatedly execute unchanged work, duplicate bugs or resend unanswered approval requests. Ten disposable routing/procedure walkthroughs passed, and a manual check-in found zero live intake tickets without changing board files. They are implementation checks, not new product tests or human QA approvals. The native Codex tool created **QA board check-in**, ID `qa-board-check-in`, **ACTIVE every hour**, using this local checkout and existing chat. The first unattended execution has not yet been observed; the board README holds its operating prompt and scheduling record. The subsequently authorized Project Context implementation is described below. No developer automation, product changes or new product tests are authorized by board setup. Completed RUN-001/RUN-002 evidence and decisions remain unchanged.

### Shared Project Context — 22 October 2026

Aniekan requested shared product information for QA, development and product management, then approved the [researched implementation proposal](QA/Quality%20assurance/project-context-structure.md): “i completely agree with this implementation plan. proceed with implementation plan”. [Project Context/README.md](Project%20Context/README.md) now indexes business, product, design, technical and decisions documents, their owners, source states and known gaps. [DEC-CTX-001](Project%20Context/decisions/2026-10-22-shared-project-context.md) records this process decision; it is not a new product-requirements approval.

Existing BR01–BR06 moved into the shared business context with their content preserved. The BRD and PRD consolidate the agreed local-demo scope; eight AC-PAY IDs map existing criteria to TC01–TC08 for future traceability. They do not retroactively alter RUN-001/RUN-002 or claim newly supplied employer documents, tests or stakeholder approvals. The design reference identifies the absent Figma baseline. Technical references describe the source-inspected API, independent builds, ports, isolated data and setup. Missing non-functional targets, external integration contracts and separately named role owners remain explicit gaps.

AGENTS, the workflow, board templates and check-in instructions now direct the agent to the index and applicable source revisions/BR/AC IDs, separately from build identity. Necessary missing/conflicting information produces a dated developer-facing comment on the existing ticket, a Waiting on reason and an entry in the board's unanswered-question index. The ticket keeps its current folder; only dependent work waits. Actual responses remain on the ticket, with responsible-owner source updates/decisions linked before resuming. Changed criteria return to the affected review gate. This adds no status folders, developer automation, product changes or new execution claims.

The native tool updated the existing `qa-board-check-in` automation; its saved prompt matches the board instructions and the same ID, ACTIVE hourly cadence and chat were preserved. Seven disposable context/clarification walkthroughs passed, with all fixture answers explicitly simulated; live queues remain empty. Business-rule content, eight-case expectations and historical execution evidence are unchanged. [The implementation record](Project%20Context/decisions/2026-10-22-shared-project-context.md#implementation-and-verification--22-october-2026) records verification limits and remaining source gaps.

### Existing human-review policy

Aniekan confirmed that the agent performs the standard QA workflow while the QA engineer reviews and approves decisions. Human review can inspect reasoning, records, scripts and assertions without replaying every agent action. Record the actual method; do not represent agent execution as human manual work.

The workflow uses planning, analysis, design, test implementation/preparation, execution, completion and continuous monitoring/control. Our five review gates are project governance: G1 scope/analysis; G2 design/readiness; G3 findings; G4 fix/retest; G5 completion/handoff. Activities can overlap or repeat. Product-code implementation requires separate authorization.

Aniekan identified blind approval as a serious process gap when the agent supplied a packet link without explaining the test selection. Codex then briefed him in conversation on the risk, eight cases, expected outcomes, selection rationale, UI/API channels and coverage gaps. His reply was: “Approved, but update the workflow to prevent blind approval.”

The condition was implemented before execution. **Every gate and testing type now requires a self-contained conversational briefing:** proposal and objective, rationale/alternatives, evidence and uncertainty, expected outcome or acceptance criteria, limits and exact next authorization. Supporting links cannot replace the briefing. Material questions must be addressed before seeking a decision; silence/questions are not approval. Record the actual reply, scope, revision/build, review method and conditions. Routine work inside an approved scope remains autonomous.

For RUN-002, the human approved the eight-case buggy scope and expected behavior after the briefing. No separate manual script inspection or test replay is claimed. That approval does not authorize fixed retest, production release or retroactive approval of RUN-001.

### Release sign-off and handoff improvement — 22 October 2026

Aniekan requested research and correction after the closing message failed to provide release notes, an explicit sign-off packet and concrete owner/action handoff. The [researched G5 procedure](QA/Quality%20assurance/release-signoff.md) now requires one versioned packet before review: release changes, completion/exit-criteria evidence, risks, scoped QA decision proposal and next-owner/recovery instructions. After an actual decision, record its reply/scope/method, deliver the packet/action summary through the authorized channel and record actual receipt. Required sign-off/delivery/recipient acceptance blocks parent completion while pending. Production go/no-go and deployment remain separate.

The [RUN-002 release-handoff supplement](QA/Quality%20assurance/releases/RUN-002-release-handoff.md) records the existing accepted local scope and next actions for Aniekan. It is dated as a later supplement, not a packet represented as reviewed before the original “Verified!” reply. No new verification method, receiver acknowledgement, product test or production approval is invented. The reusable AI agent Software QA package receives the same procedure/template and closure safeguards, without copying this run's evidence or approval. Application/test sources, existing results and the native schedule remain unchanged.

## Research, preparation and execution

The standards review used ISTQB CTFL v4.0.1, Testing with Generative AI v1.1 and public descriptions of ISO/IEC/IEEE 29119-2/-3:2021 and ISO/IEC 25010:2023. Full paid ISO normative texts were not audited; no formal conformance claim is made. Seven activities, readiness, ongoing control and completion/learning were made explicit beneath the review gates.

Before RUN-002, build/source/runtime hashes matched, both test projects type-checked, seven helper/POM/spec files matched between builds and both API suites' four JSON bodies matched their Postman exports. Execution reconfirmed the buggy served identity. RUN-001 local diagnostics were archived separately before the new run.

Codex executed the six Chromium POM cases once with one worker, no runner retries or skipped cases. UI result: 5 Pass / 1 Fail (TC07), no runner errors. Python HTTP executed TC03/TC04 using the exported Postman payloads; both passed. Postman itself was not executed. Each case used fresh synthetic records. Supporting setup/probes do not add cases.

TC07 began with one Paid $1,500 payment and a Pending notification. Payroll retry added a distinct second $1,500 payment while approved pay stayed $1,500. The UI assertion failed on expected $1,500 versus received $3,000; saved records corroborate it. The outer verification wrapper succeeded by recognizing that defect signature; TC07 remains Fail.

A fresh delivery-first control preserved one payment after notification recovery and payroll retry. Read-only SQL at its Paid/Pending checkpoint found payment identity but no Sent-notification match, supporting the source-confirmed completion error. The initial supporting probe used a default database path rather than the configured file and could not open it; it provided no causal evidence. A corrected fresh probe verified dataset identity before querying the configured database. This setup issue is outside the eight-case product results and is retained in ignored diagnostics.

## Current findings and next review

[The workflow findings/retest proposal](QA/Quality%20assurance/qa-workflow.md#run-002-findings-and-fixed-retest-proposal), [RUN-002 UI evidence](QA/Quality%20Control/Buggy%20build/Functional%20testing/functional-testing-results.md#run-002), [API evidence](QA/Quality%20Control/Buggy%20build/API%20testing/api-testing-results.md#run-002) and [PAY-001](QA/Quality%20Control/bug_report/duplicate-payment-after-notification-failure.md#run-002-findings-review) contain the recorded details.

G3 findings acceptance was recorded with PAY-001 Open, High-impact/P1 and buggy Not ready. The existing fixed reference checks payment identity and adds employee-period uniqueness. G4 was separately authorized on 22 October 2026 and the same eight cases passed with unchanged expectations. TC07 preserved the original identities and $1,500 while delivery recovered. Following Aniekan's later “Verified!” correction confirmation, PAY-001 is Verified fixed for the pinned fixed build and the G5 local handoff is accepted with its limits. The deliberately buggy control still fails. RUN-001 and RUN-002 fixed results are retained separately.

The first informed-approval rule was not applied adequately: Aniekan again returned the combined findings/execution request as blind approval. The corrected safeguard requires one explicit decision, an itemized claim/action/evidence-or-expected-result/rationale table, alternatives/limits, exact consequences and direct evidence. Missing any part prevents sending the request. Essential approval context must appear in the final response containing the decision; progress commentary and prior messages cannot substitute, and an approval prompt must not be sent ahead of the full briefing. For execution, repeat the concrete cases even when they were listed earlier; “same eight” is insufficient. Do not bundle G3 findings acceptance with G4 execution authorization.

The combined request is withdrawn. The workflow now itemizes the G3 finding, cause, severity, proposed correction and evidence limits, and itemizes every G4 case/action/pass criterion/rationale separately. G3 confirmation instructions were supplied before Aniekan returned his findings acceptance. The user required G3 to ask the human to confirm, not merely agree. The workflow now provides a focused confirmation guide: fresh synthetic setup and normal browser URLs, steps/checkpoints to reproduce the duplicate, source and delivery-first control to assess the cause, separate severity/priority/status criteria, and source review of the correction without fixed execution. Rough notes with observed references, review method and approve/reject/change/investigate/blocked outcome are sufficient. No manual replay of the full eight-case suite is required; no human confirmation is inferred from silence or an unsupported approval. Aniekan has now returned with “accepted. continue”; G3 acceptance is recorded, while specific confirmation checks/observations remain unrecorded because they were not provided.

G4's separate full eight-case execution packet v1 received explicit authorization after its final-response briefing. Fixed manifest files and the served build on 4276 matched; seven helper/POM/spec files match across test projects. Six Chromium POM cases executed on isolated port 4285, and two Python HTTP cases executed on fixed port 4276, with one worker, no runner retries, fresh records and unchanged expectations. All eight passed, with no blocked/skipped cases or runner errors. Postman was not executed. No product code, test implementation or business oracle changed. RUN-001 evidence remains intact beneath its own headings, and RUN-002 fixed results were appended. Raw diagnostics remain ignored.

The fixed UI run started at `2026-10-21T23:30:43.867Z` and finished at `2026-10-21T23:31:21.690Z`: 22 October 2026 in Africa/Lagos. Build `mustpayroll-0.3.0-fixed-ca7ffbea67ec` retained the expected source fingerprint. In fresh dataset `59464532-4593-4286-a629-f24a78390da6`, TC07 kept payment `c3766df6-d985-4bbe-8c95-a275bb2126d9`, $1,500 and Meridian Bank ending 4821 unchanged; notification `dc047b2e-f08a-489b-872d-e68517951183` changed Pending to Sent. All assertions after the original buggy failure point executed and passed. TC03 and TC04 also passed using the exported Postman payloads through direct HTTP.

The [completion record](QA/Quality%20assurance/qa-workflow.md#run-002-completion-review-and-human-correction-confirmation) gives the eight-case comparison, fresh-data confirmation instructions and actual G5 reply. Aniekan's “Verified!” confirms the correction following the scoped handoff/disposition proposal. Record the accepted local handoff as Ready with known limitations and PAY-001 Verified fixed for the pinned fixed build. His method and individual observations remain unspecified; do not claim he replayed a test, inspected source, used a particular dataset or observed the agent's payment references. No further tests ran for this decision update. Preserve the buggy control, original failure and sequential/local limits. No production release or assessment-completion decision is recorded.

Continue with the same adaptive cycle if the testing objective changes. Preserve progress and evidence, revise affected methods/criteria, and return to the affected review gate. At completion account for all planned outcomes, remaining defects/risks, recovery, reusable checks and process improvements. Explicit UTF-8 handling from RUN-001 and informed human briefing from RUN-002 are recorded improvements.

Update detailed evidence/review first, then this shared context and ignored assistant continuity. Essential team facts must not depend on personal notes.

## Product and rules

Use the [Project Context index](Project%20Context/README.md) for the product overview and source register, the [BRD](Project%20Context/business/BRD.md) for business goals/scope, the [PRD](Project%20Context/product/PRD.md) for feature acceptance criteria and the [business rules](Project%20Context/business/business-rules.md) for canonical BR01–BR06 and assumptions. This progress record links those sources rather than maintaining another requirements copy.

The [system/API reference](Project%20Context/technical/system-and-api-reference.md) explains implementation and data terminology. [Environments and builds](Project%20Context/technical/environments-and-builds.md) identifies the two independent targets and setup. Prior executions retain their original baselines and outcomes below; new work records its own source revision.

## RUN-001 investigation and evidence

Codex operated the real browser on 21 October 2026. On buggy build `mustpayroll-0.3.0-faulty-eb7f01eeae99`, a one-shot notification failure left one Paid $1,500 payment and a Pending notification. A payroll retry created a second payment and raised recorded pay to $3,000. In a fresh control, sending the existing notification before repeating payroll retained one $1,500 payment. On fixed build `mustpayroll-0.3.0-fixed-ca7ffbea67ec`, payroll retry retained the original payment and notification identities and completed delivery.

The saved-record probe confirmed the cause: the Sent-notification query returned no row for an existing Paid/Pending pair; the payment-identity query returned one row. The fixed variant uses payment identity and an employee-period uniqueness constraint. Both variants save payment and notification work in one transaction.

TC03 and TC04 passed on both builds through direct Python HTTP calls using the exported Postman payloads. Postman itself was not executed. The first automation run was invalid because test-copy text encoding corrupted punctuation. It was retained locally as harness diagnostics, corrected without changing business expectations, and a new complete run finished. Detailed observations and references are in [the investigation](QA/investigation.md).

Six browser cases and two API cases cover happy path, approval, cut-off, timezone, duplicate input, payment failure, notification failure and payroll retry. API setup supporting a browser case is not counted as a separate API test. The exported Postman collections provide reviewer reproduction; actual direct-HTTP execution is identified in the results.

## Ownership and outstanding work

Aniekan selected the fresh-repository strategy, authorized the root-cause/proposed-fix requirement, approved RUN-002 scope/design, accepted G3 findings, authorized fixed execution and reported correction confirmation with “Verified!” after the G5 briefing. Codex performed the investigation and automated verification, then recorded the scoped local handoff and defect disposition. The human verification method and detailed observations were not supplied. The new Loom, professional application-material review and confirmation that another application is accepted remain outstanding. No rejection reason or score was supplied.

## Source priority

The supplied MUST role page is the assessment authority. `Quest Expectation - Full Transcript.txt` explains the AI-led interpretation; it does not override the role page. Vettify supplies workflow discipline, not payroll requirements or test evidence. The previous submission supplies reusable code, not proof of this attempt's outcomes.

For product expectations, follow the source states and applicable revisions in Project Context. The working contract/QA workflow governs the testing process; tickets record assignments and decisions; suites/results retain observations. Conflicts go to the responsible owner through the ticket clarification procedure. Neither the latest implementation nor an unreviewed document silently overrides an accepted requirement.

## RUN-001 coverage, traceability and release recommendation

| Case | Business coverage | Buggy | Fixed |
| --- | --- | --- | --- |
| TC01 (UI) | BR01/BR02: approved-only Tuesday payroll, exclusions | Pass | Pass |
| TC02 (UI) | BR01: opening inclusion, closing exclusion, adjacent weeks | Pass | Pass |
| TC03 (HTTP) | BR01: offset timestamp conversion | Pass | Pass |
| TC04 (HTTP) | BR03: duplicate earning ID | Pass | Pass |
| TC05 (UI) | BR04/BR05: failed payment and safe retry | Pass | Pass |
| TC06 (UI) | BR06: failed notification and delivery-only retry | Pass | Pass |
| TC07 (UI) | BR04/BR06: payroll retry preserves payment identity | Fail: $3,000 instead of $1,500 | Pass: original payment retained |
| TC08 (UI) | BR05/BR06: linked notification after successful payment | Pass | Pass |

Totals: buggy 7 passed / 1 failed; fixed 8 passed. Six UI cases used Chromium with TypeScript POM and no runner retries. Two API cases were executed with Python HTTP using the exported Postman bodies; Postman was not executed. The same browser spec bytes were used for both builds. Actual result records identify run dates, served build IDs, source fingerprints and payment references.

Agent release recommendation: corrected local flow Ready with known limitations; buggy Not ready. Production concurrency, crashes, real banks/delivery, account changes, authorization and other browsers remain unverified. Candidate sign-off is not recorded. The new Loom, review of professional application cases and confirmation that a second application is accepted remain outstanding. See directive for the concise handoff and deliverable links.
