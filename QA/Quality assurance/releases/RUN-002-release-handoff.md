# RUN-002: release notes, QA sign-off and local handoff

**Fixed local flow: Ready with known limitations. Buggy control: Not ready.** This packet supplies the release notes, explicit sign-off record and owner/action handoff missing from the earlier closure message. It was prepared on **22 October 2026, Africa/Lagos**, after the recorded G5 decision. It does not claim to have been reviewed before that decision or add new testing, signatures or deployment authority.

## 1. Identity and intended use

| Field | Record |
| --- | --- |
| Packet | RUN-002 local handoff, revision 1; documentation supplement |
| Recipient | Aniekan Etim, project owner and human QA reviewer |
| Intended use | Review and demonstrate the local payroll investigation; not production payroll |
| Fixed target | `mustpayroll-0.3.0-fixed-ca7ffbea67ec` |
| Buggy control | `mustpayroll-0.3.0-faulty-eb7f01eeae99` |
| Basis | Existing BR01–BR06 and approved RUN-002 packet v2; later context/AC-ID organization does not change the original basis |
| Existing decision | Aniekan's “Verified!” reply on 22 October 2026 after the G5 briefing; recorded in the [completion review](../qa-workflow.md#run-002-completion-review-and-human-correction-confirmation) and [confirmation commit](https://github.com/Aniekanetim/MustPayroll-AI-QA/commit/263c2315f7c2108fa5aa23fac3a4e0306dfbf5c6) |
| Availability / deployment | Existing fixed reference verified locally; no production deployment performed or authorized |

## 2. Release notes for the fixed reference

When a payment succeeded but its employee notification failed, retrying payroll in the buggy build recorded another $1,500 payment. The operator saw $3,000 recorded against $1,500 approved. The fixed reference determines completion from the saved employee-period payment and protects uniqueness, so retry preserves that payment and recovers the linked notification.

**Operator impact:** retrying the same payroll no longer repeats its financial effect within the verified sequential local flow. Delivery-only retry also preserves the payment. Failed payment recording creates neither a payment nor a premature notification.

**Verified defect:** [PAY-001, duplicate payment after notification failure](../../Quality%20Control/bug_report/duplicate-payment-after-notification-failure.md), Verified fixed for the pinned fixed build. The faulty control intentionally remains available for reproduction. RUN-002 verified an existing correction; it did not implement a new product patch. No new configuration change, migration or external integration was introduced by this QA cycle.

Known limits: local ledger and delivery stub only; no real bank transfer or inbox receipt. Concurrent workers, process crashes, authentication/account changes, other browsers and non-functional testing are outside this run. These are coverage limits, not observed passes.

## 3. Test-completion assessment

Codex executed the approved scope using fresh records. The fixed UI run occurred on 22 October 2026 in Africa/Lagos, corresponding to 21 October 23:30:43.867–23:31:21.690 UTC. The direct-HTTP checks have their own timestamps in the linked results.

| Target / method | Planned | Executed | Pass | Fail | Blocked / skipped | Evidence |
| --- | --- | --- | --- | --- | --- | --- |
| Buggy / Chromium POM | 6 | 6 | 5 | 1, TC07 | 0 | [UI results](../../Quality%20Control/Buggy%20build/Functional%20testing/functional-testing-results.md#run-002) |
| Buggy / Python HTTP | 2 | 2 | 2 | 0 | 0 | [API results](../../Quality%20Control/Buggy%20build/API%20testing/api-testing-results.md#run-002) |
| Fixed / Chromium POM | 6 | 6 | 6 | 0 | 0 | [UI results](../../Quality%20Control/Fixed%20build/Functional%20testing/functional-testing-results.md#run-002) |
| Fixed / Python HTTP | 2 | 2 | 2 | 0 | 0 | [API results](../../Quality%20Control/Fixed%20build/API%20testing/api-testing-results.md#run-002) |

The same eight expectations were used per build. UI execution used one Chromium worker and no runner retries. Postman request exports support independent reproduction; Postman itself was not executed. Preparation/control probes are not extra cases. RUN-001 remains separate historical evidence.

| Completion criterion | Assessment |
| --- | --- |
| Valid original failure and causal investigation | Met: TC07 duplicates the financial record; the delivery-first control, saved-record comparison and source support the completion-predicate cause |
| Original failure fixed with identity preserved | Met: fixed TC07 retains one $1,500 payment, original payment/notification IDs and destination, while Pending delivery becomes Sent |
| Adjacent regression | Met within scope: approval selection, weekly boundaries/timezone conversion, input deduplication, failed-payment recovery and notification ordering/recovery passed |
| Planned scope accounted for | Met: buggy 7 Pass / 1 Fail; fixed 8 Pass / 0 Fail, no blocked/skipped cases |
| Human scoped decision | Recorded: G1/G2 approved, G3 accepted, G4 separately authorized and G5 local handoff accepted; method/detailed observations not supplied |

The fixed TC07 payment is `c3766df6-d985-4bbe-8c95-a275bb2126d9`; notification `dc047b2e-f08a-489b-872d-e68517951183` remains linked to it. A wrapper recognizing the deliberately faulty signature does not turn buggy TC07 into a Pass. No failed fixed case or runner error was observed. An initial supporting investigation probe used the wrong default database path; the corrected probe checked the configured dataset before querying it. That setup issue is retained as a diagnostic, not a product verdict.

## 4. QA sign-off and boundaries

| Decision field | Actual record |
| --- | --- |
| Agent recommendation | Ready with known limitations for the fixed sequential local payroll flow; Not ready for the faulty control |
| Human reviewer / date / reply | Aniekan Etim / 22 October 2026 / “Verified!” |
| Recorded consequence | Correction confirmation; local handoff accepted; PAY-001 Verified fixed for the pinned fixed build |
| Review method | Not supplied. No particular human manual run, source inspection, dataset or payment checkpoint is asserted |
| Authority limit | No production release, deployment, real-money safety or broader assessment-completion approval |
| Coverage-risk acceptance | The recorded local decision is bounded by the listed exclusions; it is not organization-wide acceptance of production risk |
| Invalidation | Changed build, requirements/configuration or new material identity/recovery evidence requires reassessment of the affected scope |

This supplement records the existing decision faithfully. It neither obtains a new approval nor implies that this later document was the original signed packet.

## 5. Operational handoff to Aniekan

| Next action / trigger | Owner or recipient | Instructions and completion boundary |
| --- | --- | --- |
| Review or demonstrate the local fix | Aniekan; any authorized reviewer can use the linked guide | Follow the [fixed confirmation guide](../qa-workflow.md#qa-confirmation-guide-corrected-payroll-retry) with fresh records; use the same selected period and compare original identities/amounts |
| Reproduce the automated evidence when needed | QA executor for the new authorized run | [Buggy execution](../../Quality%20Control/Buggy%20build/Functional%20testing/executed_functional_test_cases/README.md) and [fixed execution](../../Quality%20Control/Fixed%20build/Functional%20testing/executed_functional_test_cases/README.md) supply installation/commands; retain any new run separately |
| Complete the next assessment material | Aniekan, project owner | Record the new Loom and review the professional application material, then update the directive with actual completion; these remain outstanding |
| Unexpected duplicate, changed identity/destination or failed recovery | QA reports to the developer responsible for that change; no named developer was supplied | Stop the affected example, retain IDs/counts/amounts/build and actions, and reopen investigation through the board; do not repeatedly process it |

Use [environment/build setup](../../../Project%20Context/technical/environments-and-builds.md) for normal ports 4275/4276 and separate data stores. Automated browser runs use isolated ports 4284/4285. Confirm the intended build before new execution.

If payment exists and delivery is Pending, use Notifications → Retry pending notifications and preserve the original payment. If payment recording failed, retry the original pay run. Preserve failure evidence before any reset. Settings clears disposable period records; it is not a financial reconciliation tool. Do not use the known faulty build as a production rollback target.

**Production rollout, rollback, release window and on-call monitoring:** not applicable to this local-only handoff; no deployment was performed. A later production request must establish the responsible owners, smoke/health checks, recovery plan and separate authorization. The local recovery instructions above do not claim those production capabilities.

## 6. Delivery, retention and remaining work

This packet is published for the project owner and linked from the project entry point and directive. No email/chat dispatch to another person, developer receipt or new receiver acceptance is claimed. The original QA confirmation remains the recorded scoped decision; acknowledgement of this later supplement has not been recorded.

Keep original failures, fixed results, executable regression and supporting source references. New testing uses fresh records and its own run/build identity. The process improvement is now explicit: prepare release notes, sign-off fields and next-owner actions before G5, then deliver a concise, self-contained handoff after the actual decision.

The fixed local cycle remains accepted with its limits. The new Loom and application-material review remain the next assessment actions; a complete second submission is not claimed.
