# MustPayroll AI-led QA: shared context

## Purpose and current state

This second assessment attempt uses a local payroll demo. The existing submission at https://github.com/Aniekanetim/MustPayroll is preserved. The new investigation follows the Vettify workflow: establish rules, let AI operate the product, compare observations with those rules, investigate the cause, then verify a correction under unchanged expectations.

**State: local investigation and eight-case verification complete; candidate review and second-submission material outstanding.** No execution from the submitted repository counts as a new result. The application and page objects are reused; the new buggy policy contains only the payment-completion error. Approval selection and notification creation now match the corrected reference so they cannot obscure this failure.

## Confirmed AI-led QA operating model — 21 October 2026

Aniekan confirmed that the AI agent should carry out the standard QA workflow, with the QA engineer reviewing and approving it end to end across API, UI/functional, usability, performance and other testing types. The QA engineer directs priorities, confirms expected behavior, challenges the evidence and owns the scoped release decision. The agent performs execution, investigation, reporting and retest; the human need not repeat every action manually.

A cycle can combine or switch testing types while retaining its context, progress and evidence. A new cycle begins by establishing the testing type. Ask when it is missing; reuse an explicit choice or scoped approval. G1 reviews scope and the behavior/quality standard; G2 approves the design and bounded execution; G3 reviews evidence and findings; G4 approves targeted retest against an available correction; G5 records the human handoff/release decision. The agent works autonomously within an approved scope, prepares concrete review packets and waits at the affected gate before dependent work. Product-code changes need separate authorization.

**Current work and review state:** RUN-001 execution is Done: buggy 7 Pass / 1 Fail and fixed 8 Pass. Its human review remains Pending. The new workflow does not retroactively approve that run. RUN-002 starts with payroll regression across UI and API, selected by Aniekan on 21 October 2026. He confirmed that the workflow must remain adaptive across all relevant testing types. Scope/design packet v1 proposes the same eight business cases on the buggy build first, followed by findings review and separately approved fixed-build retest. G1/G2 await QA review; G3–G5 have not started. No new tests, fixtures or application changes were made by this workflow update. Read-only environment preflight matched both served build identities to their manifests.

[The workflow and review record](QA/Quality%20assurance/qa-workflow.md) contains the stage packets and decisions. Keep work status, test outcome and human review separate. Preserve failed evidence and record retests independently. Maintain this team-owned context alongside detailed evidence and the assistant's ignored personal continuity notes. No Vettify accounts or private evidence have been copied.

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

## Final coverage, traceability and release decision

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
