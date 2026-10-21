# MustPayroll AI-led QA: shared context

## Purpose and current state

This second assessment attempt uses a local payroll demo and an AI-led workflow with human QA review. The original [MustPayroll submission](https://github.com/Aniekanetim/MustPayroll) is preserved. The Vettify project supplies workflow principles, not payroll requirements or employer evidence.

**RUN-001:** local investigation and eight-case verification complete; human review Pending. **RUN-002:** payroll regression across UI + API selected; standards-informed workflow revision implemented; packet v2 ready for G1/G2 review. Execution is not approved and 0/8 application cases have run for RUN-002.

The application and page objects are reused; prior submission results do not count as this attempt's evidence. The new controlled buggy policy contains only the payment-completion error. Approval filtering and notification creation match the fixed reference so they cannot obscure it.

## Confirmed operating model — 21 October 2026

Aniekan confirmed that the agent performs the standard QA workflow and the QA engineer reviews and approves it end to end. The human confirms expected behavior, challenges assumptions, verifies evidence and owns the scoped QA decision. Verification can use records, scripts and assertions; manually repeating every agent action is not required. Record the actual human review separately from agent execution.

Establish the testing objective/type at intake; ask only when it is missing. Retain one adaptive cycle when the objective combines or switches functional, usability, performance, accessibility, security or another type. Revise affected criteria/methods and approvals while preserving progress and evidence. Supporting a type does not claim it was executed.

The process uses seven iterative activities: planning, analysis, design, test implementation/preparation, execution, completion and continuous monitoring/control. Our five gates are project governance: G1 scope/analysis; G2 design/readiness and bounded execution authorization; G3 findings; G4 fix/retest; G5 completion/handoff. Prepare concrete evidence before requesting a decision. Work autonomously within its approved scope; product-code changes require separate authorization.

## Standards review and revision

Aniekan requested industry-workflow research instead of approving RUN-002 packet v1. The review used ISTQB CTFL v4.0.1, Testing with Generative AI v1.1, and public descriptions of ISO/IEC/IEEE 29119-2/-3:2021 and ISO/IEC 25010:2023. Full paid ISO normative texts were not audited; no formal conformance claim is made.

The research supported the operating model and exposed missing process detail: requirement/risk analysis, prepared-script/data/environment readiness, ongoing progress/change control, and completion with residual risk and learning. Aniekan then said “Proceed,” authorizing implementation of these recommendations. That authorizes the process/packet revision, not an unrecorded review of the finished v2 execution packet.

The [standards review](QA/Quality%20assurance/qa-workflow-review.md) and [revised workflow](QA/Quality%20assurance/qa-workflow.md) record the sources, adaptation and decision history. Test implementation means preparing tests, not coding the product fix. The agent recommends readiness; the QA engineer records the scoped QA decision; production-release authority is separate.

## RUN-002 current packet and preparation

[Packet v2](QA/Quality%20assurance/qa-workflow.md#run-002-scope-and-test-design-packet-v2) requests G1/G2 approval for eight buggy-build cases and bounded investigation. The same six UI and two API cases map to BR01–BR06. After execution, G3 reviews findings before G4 separately authorizes the identified fixed-reference retest. G5 then evaluates criteria, residual risk and handoff. G1/G2 are Pending; G3–G5 are Not started.

Codex performed preparation checks on 21 October 2026: both test projects passed TypeScript no-emit checking; all seven helper/POM/spec files are byte-identical; both build manifests match every listed source/runtime file and both normal health endpoints return matching IDs. Both Postman collections parse, and each suite's four JSON request bodies match the export. Agent source review retained the common $1,500/payment-identity oracle. Human assertion review remains Pending.

These checks are not new application-test results. Runtime/browser and test-port availability, served identity and fresh data must be confirmed at execution start. The plan uses Chromium POM on isolated port 4284 and Python HTTP for TC03/TC04 against the identified buggy service on 4275; no Postman execution is promised. A fresh dataset isolates each case. Fixed reference port 4276 and isolated test port 4285 remain for later retest.

Monitor completed/planned counts, case outcomes, rule coverage, anomalies, blockers and changed risks. Suspend affected checks when evidence is invalid or scope changes, retain attempts and restore prerequisites before resuming. Preserve failures and separate retests. RUN-001's encoding error supplies one concrete process improvement: explicit UTF-8 handling and assertion-text inspection without changing expected business behavior.

Completion requires valid outcomes or explicit blockers for all planned cases, actionable findings with cause/proposed fix, separate correction evidence, recovery handoff and reusable checks. A Ready recommendation for the fixed local scope requires all eight valid passes and no unresolved payment-identity/recovery blocker; exceptions remain explicit for human review. Work status, test outcome, defect disposition and review decision are distinct.

No application, fixture, script or result table changed during the standards-informed revision. Preserve the earlier RUN-001 evidence and pending review; do not replace it with RUN-002 statuses. Update detailed records first, then this team-owned context and the ignored assistant continuity notes. Essential team facts must not depend on those personal notes.

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
