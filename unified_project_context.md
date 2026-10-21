# MustPayroll AI-led QA: shared context

## Purpose and current state

This second assessment attempt uses a local payroll demo and an AI-led workflow with human QA review. The original [MustPayroll submission](https://github.com/Aniekanetim/MustPayroll) is preserved. Vettify supplies workflow principles, not payroll requirements or employer evidence.

**RUN-001:** both-build investigation/eight-case verification complete; human review Pending. **RUN-002:** G1/G2 Approved after the eight-case briefing; buggy execution Done, 7 Pass / 1 Fail (TC07). G3 findings review and G4 fixed-retest authorization Pending. No fixed cases have executed for RUN-002; no handoff/release approval is recorded.

The application and POM are reused. Results from the previous submitted repository do not count as new evidence. The new controlled buggy policy contains only the payment-completion error; approval filtering and notification creation match the fixed reference.

## Operating model and informed approval

Aniekan confirmed that the agent performs the standard QA workflow while the QA engineer reviews and approves decisions. Human review can inspect reasoning, records, scripts and assertions without replaying every agent action. Record the actual method; do not represent agent execution as human manual work.

The workflow uses planning, analysis, design, test implementation/preparation, execution, completion and continuous monitoring/control. Our five review gates are project governance: G1 scope/analysis; G2 design/readiness; G3 findings; G4 fix/retest; G5 completion/handoff. Activities can overlap or repeat. Product-code implementation requires separate authorization.

Aniekan identified blind approval as a serious process gap when the agent supplied a packet link without explaining the test selection. Codex then briefed him in conversation on the risk, eight cases, expected outcomes, selection rationale, UI/API channels and coverage gaps. His reply was: “Approved, but update the workflow to prevent blind approval.”

The condition was implemented before execution. **Every gate and testing type now requires a self-contained conversational briefing:** proposal and objective, rationale/alternatives, evidence and uncertainty, expected outcome or acceptance criteria, limits and exact next authorization. Supporting links cannot replace the briefing. Material questions must be addressed before seeking a decision; silence/questions are not approval. Record the actual reply, scope, revision/build, review method and conditions. Routine work inside an approved scope remains autonomous.

For RUN-002, the human approved the eight-case buggy scope and expected behavior after the briefing. No separate manual script inspection or test replay is claimed. That approval does not authorize fixed retest, production release or retroactive approval of RUN-001.

## Research, preparation and execution

The standards review used ISTQB CTFL v4.0.1, Testing with Generative AI v1.1 and public descriptions of ISO/IEC/IEEE 29119-2/-3:2021 and ISO/IEC 25010:2023. Full paid ISO normative texts were not audited; no formal conformance claim is made. Seven activities, readiness, ongoing control and completion/learning were made explicit beneath the review gates.

Before RUN-002, build/source/runtime hashes matched, both test projects type-checked, seven helper/POM/spec files matched between builds and both API suites' four JSON bodies matched their Postman exports. Execution reconfirmed the buggy served identity. RUN-001 local diagnostics were archived separately before the new run.

Codex executed the six Chromium POM cases once with one worker, no runner retries or skipped cases. UI result: 5 Pass / 1 Fail (TC07), no runner errors. Python HTTP executed TC03/TC04 using the exported Postman payloads; both passed. Postman itself was not executed. Each case used fresh synthetic records. Supporting setup/probes do not add cases.

TC07 began with one Paid $1,500 payment and a Pending notification. Payroll retry added a distinct second $1,500 payment while approved pay stayed $1,500. The UI assertion failed on expected $1,500 versus received $3,000; saved records corroborate it. The outer verification wrapper succeeded by recognizing that defect signature; TC07 remains Fail.

A fresh delivery-first control preserved one payment after notification recovery and payroll retry. Read-only SQL at its Paid/Pending checkpoint found payment identity but no Sent-notification match, supporting the source-confirmed completion error. The initial supporting probe used a default database path rather than the configured file and could not open it; it provided no causal evidence. A corrected fresh probe verified dataset identity before querying the configured database. This setup issue is outside the eight-case product results and is retained in ignored diagnostics.

## Current findings and next review

[The workflow findings/retest proposal](QA/Quality%20assurance/qa-workflow.md#run-002-findings-and-fixed-retest-proposal), [RUN-002 UI evidence](QA/Quality%20Control/Buggy%20build/Functional%20testing/functional-testing-results.md#run-002), [API evidence](QA/Quality%20Control/Buggy%20build/API%20testing/api-testing-results.md#run-002) and [PAY-001](QA/Quality%20Control/bug_report/duplicate-payment-after-notification-failure.md#run-002-findings-review) contain the recorded details.

The proposed disposition is one P1 defect, PAY-001 Open, buggy flow Not ready. The existing fixed reference checks payment identity and adds employee-period uniqueness. G4 proposes the same eight cases with unchanged expectations; TC07 must preserve original identities and $1,500 while delivery recovers. Findings acceptance and fixed execution are Pending human decisions. Prior fixed passes are RUN-001 evidence only.

The agent must brief these findings, cause/evidence/confidence, proposed correction/retest, acceptance criteria and limits before requesting G3/G4 approval. No product code, test implementation or business oracle changed. Only buggy result records were extended; RUN-001 evidence and fixed results remain intact. Runtime identities/versions and fingerprints are recorded with the results; raw diagnostics remain ignored.

Continue with the same adaptive cycle if the testing objective changes. Preserve progress and evidence, revise affected methods/criteria, and return to the affected review gate. At completion account for all planned outcomes, remaining defects/risks, recovery, reusable checks and process improvements. Explicit UTF-8 handling from RUN-001 and informed human briefing from RUN-002 are recorded improvements.

Update detailed evidence/review first, then this shared context and ignored assistant continuity. Essential team facts must not depend on personal notes.

## Product and rules

One operator records and approves weekly USD earnings. A pay run on Tuesday 09:00 UTC covers the prior Monday 00:00 UTC inclusive through the following Monday 00:00 UTC exclusive. Only approved earnings qualify. Earning IDs are unique within a payroll dataset. One employee receives one payment per period. Failed payment creates no notification; failed notification preserves payment and leaves recoverable notification work. Repeating payroll must not pay again.

Both independent builds contain the same screens and rules. The buggy build uses notification success as proof of payment completion; the fixed build uses the saved payment identity and a database uniqueness constraint. They run on separate ports and SQLite files. A payroll dataset is an isolated set of test records, not a user-facing workspace.

## Investigation and evidence

Codex operated the real browser on 21 October 2026. On buggy build `mustpayroll-0.3.0-faulty-eb7f01eeae99`, a one-shot notification failure left one Paid $1,500 payment and a Pending notification. A payroll retry created a second payment and raised recorded pay to $3,000. In a fresh control, sending the existing notification before repeating payroll retained one $1,500 payment. On fixed build `mustpayroll-0.3.0-fixed-ca7ffbea67ec`, payroll retry retained the original payment and notification identities and completed delivery.

The saved-record probe confirmed the cause: the Sent-notification query returned no row for an existing Paid/Pending pair; the payment-identity query returned one row. The fixed variant uses payment identity and an employee-period uniqueness constraint. Both variants save payment and notification work in one transaction.

TC03 and TC04 passed on both builds through direct Python HTTP calls using the exported Postman payloads. Postman itself was not executed. The first automation run was invalid because test-copy text encoding corrupted punctuation. It was retained locally as harness diagnostics, corrected without changing business expectations, and a new complete run finished. Detailed observations and references are in [the investigation](QA/investigation.md).

Six browser cases and two API cases cover happy path, approval, cut-off, timezone, duplicate input, payment failure, notification failure and payroll retry. API setup supporting a browser case is not counted as a separate API test. The exported Postman collections provide reviewer reproduction; actual direct-HTTP execution is identified in the results.

## Ownership and outstanding work

Aniekan selected the fresh-repository strategy and authorized the root-cause/proposed-fix requirement. Codex completed the local investigation and verification. Candidate review of the new script, observations and release decision is not yet recorded. The new Loom recording and confirmation that another application is accepted remain outstanding. No rejection reason or score was supplied.

## Source priority

The supplied MUST role page is the assessment authority. `Quest Expectation - Full Transcript.txt` explains the AI-led interpretation; it does not override the role page. Vettify supplies workflow discipline, not payroll requirements or test evidence. The previous submission supplies reusable code, not proof of this attempt's outcomes.

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
