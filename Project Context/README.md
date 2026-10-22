# MustPayroll project context

This is the shared entry point for product knowledge used by QA, development and product management. Start here when picking up a ticket, then read its relevant requirements, rules, designs and technical references. The [ticket board](../QA%20task%20management%20Board/README.md) identifies the work; the [QA workflow](../QA/Quality%20assurance/qa-workflow.md) governs how testing and human review proceed.

**Steward:** project owner, Aniekan Etim. **Updated:** 22 October 2026. **Scope:** the existing weekly USD local demo. Named product, design and engineering document owners have not been separately supplied; the project owner coordinates questions until those responsibilities are assigned.

BRD means business requirements document: why the product is needed. PRD means product requirements document: what its features must do, including their acceptance criteria.

## Sources and document ownership

| Document | What it answers | Responsible role | State / source |
| --- | --- | --- | --- |
| [Business requirements](business/BRD.md) | Business problem, users, scope and success conditions | Product/project owner | Consolidated from the established local-demo scope |
| [Business rules](business/business-rules.md) | Eligibility, money, weekly boundaries, payment identity and recovery policy | Product/project owner | Existing BR01–BR06 baseline, moved without changing rule content |
| [Product requirements](product/PRD.md) | Feature behavior and testable acceptance criteria | Product owner with QA/development input | Consolidates existing rules and the accepted eight-case scope; no new product policy |
| [Design reference](design/design-reference.md) | Screens, journeys, design source, version and access | Design/product owner | Functional inventory available; supplied Figma/approved visual baseline unavailable |
| [System and API reference](technical/system-and-api-reference.md) | Components, endpoints, payload meanings and integration limits | Developer/technical owner | Source-inspected reference for the existing 0.3.0 builds |
| [Environments and builds](technical/environments-and-builds.md) | Setup, build identity, isolated data and execution locations | Developer with QA setup verification | Existing application/test setup; not a new execution record |
| [Shared-context decision](decisions/2026-10-22-shared-project-context.md) | Why this structure was accepted and how context/clarifications are managed | Project owner; relevant owner for later decisions | DEC-CTX-001: user-approved process decision |

The BRD and PRD were assembled from the project's existing agreed material; no standalone external BRD or PRD was supplied. Their provenance is the [published pre-migration baseline](https://github.com/Aniekanetim/MustPayroll-AI-QA/tree/fb96cef4e1f1930a3557aeaf7548a70f670c0372) and [accepted RUN-002 scope and review record](../QA/Quality%20assurance/qa-workflow.md#run-002-scope-and-test-design-packet-v2). Consolidation does not claim an additional stakeholder sign-off or new testing.

## Find the answer for a ticket

| Question | Start with |
| --- | --- |
| What business outcome matters, and what is outside the product scope? | BRD |
| What should this feature do, and what proves acceptance? | PRD and its acceptance-criteria IDs |
| Which earnings qualify, which week applies, or what should a retry preserve? | BR01–BR06 in business rules |
| Which screen, interaction state or Figma handoff applies? | Design reference |
| Which endpoint, input field, data meaning or controlled failure is relevant? | System and API reference |
| Which build should run, where should it run and how is fresh data prepared? | Environments and builds |
| Was a requirement clarified or changed? | Applicable decision record and the updated canonical requirement |

### Feature-to-source map

| Feature / risk | Acceptance criteria | Business basis |
| --- | --- | --- |
| Approved weekly payroll and record selection | AC-PAY-001–AC-PAY-004 | BR01–BR03 |
| Failed-payment and failed-delivery recovery | AC-PAY-005–AC-PAY-007 | BR04–BR06 |
| Successful payment and linked notification | AC-PAY-008 | BR05–BR06 |

Acceptance criteria live with their feature in the PRD. There is no second acceptance-criteria register to maintain.

## Versions and authority

For each ticket, record the applicable **context Git revision**, exact document/section and requirement IDs, plus the **application build ID**. These are separate references: a documentation-only commit does not rebuild the application. Record later clarification/decision links as they arise. The environment reference identifies the current application baselines.

Keep business policy in business rules, feature acceptance in the PRD, design references in the design document and implementation details in technical references. Link across them instead of creating competing copies. Source-inspected code describes the implementation; it does not override expected behavior. In particular, the intentionally buggy build must be judged against the same requirements as fixed.

Document states identify an established baseline, source-inspected reference, proposal or superseded material. A newer edit, developer response or design image does not silently replace an accepted requirement. If sources conflict or their applicable revision is unclear, request clarification from the responsible owner and record the actual decision. Preserve earlier requirement baselines through Git and earlier test outcomes through their execution records.

The [shared progress record](../unified_project_context.md) tracks current work and review decisions. Suites/results remain under QA, linked from the directive. Assessment deliverables are governed by the supplied role brief and [directive](../QA/directive.md); this folder governs the demo's product context.

## Known context gaps

| Gap ID | Missing information | When clarification is needed | Responsible role |
| --- | --- | --- | --- |
| CTX-GAP-001 | External stakeholder BRD/PRD beyond the consolidated local-demo scope | A ticket introduces broader business scope or changes the accepted behavior | Product/project owner |
| CTX-GAP-002 | Supplied Figma file, relevant frames and approved visual handoff/version | A ticket requires comparison with an approved design or unspecified interaction detail | Design/product owner |
| CTX-GAP-003 | Agreed performance, accessibility, usability or security targets beyond the current functional scope | A ticket requests that quality objective or a measurable acceptance threshold | Relevant product/technical owner with QA |
| CTX-GAP-004 | Separate approved external API/provider contract and live integration behavior | A ticket depends on a new contract guarantee, bank/provider response or real delivery | Developer/technical owner with product |
| CTX-GAP-005 | Named product, design and engineering document owners | A question needs a decision outside the supplied baseline | Project owner assigns the responsible owner |

These gaps do not change the retained results of the completed local payroll scope. Do not turn them into unrelated bugs or invent answers to clear them.

## Missing or conflicting information

Read the [board clarification procedure](../QA%20task%20management%20Board/README.md#clarification-comments-and-developer-visibility). Put a specific comment on the existing ticket: the question, sources/revisions checked, gap or conflict, affected check, answer/owner needed and next action. Expose a link to that comment in the board's developer-question index.

Keep the ticket in its current folder while the affected work waits. Independent approved work can continue. After the responsible owner answers, retain the response, update the canonical context where applicable, link the change/decision and resume from the affected workflow checkpoint. Record actual approvals; do not infer them from a file move or an unanswered comment.
