# MustPayroll AI-led QA: shared context

## Purpose and current state

This second assessment attempt uses a local payroll demo. The existing submission at https://github.com/Aniekanetim/MustPayroll is preserved. The new investigation follows the Vettify workflow: establish rules, let AI operate the product, compare observations with those rules, investigate the cause, then verify a correction under unchanged expectations.

**State: initial investigation in progress.** No execution from the submitted repository counts as a new result. The application and page objects are reused; the new buggy policy contains only the payment-completion error. Approval selection and notification creation now match the corrected reference so they cannot obscure this failure.

## Product and rules

One operator records and approves weekly USD earnings. A pay run on Tuesday 09:00 UTC covers the prior Monday 00:00 UTC inclusive through the following Monday 00:00 UTC exclusive. Only approved earnings qualify. Earning IDs are unique within a payroll dataset. One employee receives one payment per period. Failed payment creates no notification; failed notification preserves payment and leaves recoverable notification work. Repeating payroll must not pay again.

Both independent builds contain the same screens and rules. The buggy build uses notification success as proof of payment completion; the fixed build uses the saved payment identity and a database uniqueness constraint. They run on separate ports and SQLite files. A payroll dataset is an isolated set of test records, not a user-facing workspace.

## Investigation and evidence

AI will operate a real browser before the deterministic regression. A local one-shot notification fault creates a Paid payment with a Pending notification. Repeating payroll should preserve that payment. Proposed causal test: retry before notification recovery versus recover the notification first, holding earnings and date constant. Evidence and results will be recorded after execution, not prefilled as passing.

Six browser cases and two API cases cover happy path, approval, cut-off, timezone, duplicate input, payment failure, notification failure and payroll retry. API setup supporting a browser case is not counted as a separate API test. The API reproduction will be available in Postman; any direct HTTP execution will be identified accurately.

## Ownership and outstanding work

Aniekan selected the fresh-repository strategy and authorized the root-cause/proposed-fix requirement. Codex is preparing and executing the local investigation. Candidate review of the new script, observations and release decision is not yet recorded. The new Loom recording and confirmation that another application is accepted remain outstanding. No rejection reason or score was supplied.

## Source priority

The supplied MUST role page is the assessment authority. `Quest Expectation - Full Transcript.txt` explains the AI-led interpretation; it does not override the role page. Vettify supplies workflow discipline, not payroll requirements or test evidence. The previous submission supplies reusable code, not proof of this attempt's outcomes.
