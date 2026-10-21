# AI-led investigation record

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
