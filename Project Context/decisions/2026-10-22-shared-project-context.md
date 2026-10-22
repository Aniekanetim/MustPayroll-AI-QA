# DEC-CTX-001: shared project context and ticket clarifications

**Owner:** project owner, Aniekan Etim. **State:** Accepted process decision. **Date:** 22 October 2026. **Applies to:** document organization and QA ticket intake; no new application behavior or product sign-off.

## Context and decision

The team needs shared product knowledge so an AI QA agent can establish a ticket's expected behavior from maintained requirements and references. The user accepted the [researched structure](../../QA/Quality%20assurance/project-context-structure.md), replying: “i completely agree with this implementation plan. proceed with implementation plan”.

Use `Project Context/README.md` as the entry point, with business, product, design, technical and decisions categories. Keep feature acceptance criteria in the PRD and maintain one authoritative source per rule. Record owners, source/review state and applicable context/build revisions. QA process and execution evidence remain in their existing QA locations.

Move the established payroll rules into shared business context without changing BR01–BR06. Consolidate BRD/PRD/setup references from available agreed material. Identify absent external requirements/designs or targets explicitly; do not invent supplied documents, approvals or quality thresholds.

## Clarification and resumption

When the relevant context cannot answer a ticket question, append a specific developer-facing comment on that existing ticket, identify the sources/revisions checked and the affected work, then record what is waiting. Preserve the ticket's current folder. Expose a link in the board's developer-question index so the comment is discoverable without another status or duplicate discussion.

The responsible owner answers and updates the canonical context where applicable. Retain the conversation and decision link on the ticket. Resume the affected workflow activity after the required review; independent authorized work can continue. Missing information does not automatically establish a product defect, and a developer claim does not silently replace an accepted requirement.

## Consequences and scope

AGENTS, ticket templates, workflow instructions, navigation and the existing hourly check-in prompt must read the shared context and follow the clarification loop. Keep the same five board folders and existing human review gates. Preserve completed RUN-001/RUN-002 records, PAY-001's scoped disposition and the original submitted repository. No new product tests, developer automation or application changes are part of this decision.

Later business/design/technical changes need their actual owner decision and applicable revision recorded; this process approval does not pre-approve them.

## Implementation and verification — 22 October 2026

Created the eight-document context structure and moved the existing business-rule document from QA. Its complete rule/assumption body is unchanged. Added AC-PAY-001–AC-PAY-008 as references for the existing TC01–TC08 criteria, without changing historical suites/results. Updated AGENTS, both board templates, the QA workflow, README, directive, release-readiness navigation and shared progress. Unanswered developer questions are indexed in the board README; the live board still has five status folders and zero tickets.

The native scheduling tool updated `qa-board-check-in` in place. A saved-configuration check confirmed the same hourly cadence, ACTIVE state and target chat, one matching automation and an exact match to the board's new context-aware prompt. First unattended execution is not yet observed.

Seven disposable documentation/filesystem walkthroughs passed under ignored `output/context-validation/check-aefae317`: known-rule lookup; missing-design clarification and developer visibility; no duplicate unanswered question; independent preparation while dependent work waits; conflicting-source clarification; response/source-update handling with the affected review checkpoint; and preservation of question links/history through a ticket move. All fixture answers and movements were labeled simulations. They are not product tests, actual owner decisions or proof of autonomous scheduled behavior.

Markdown navigation/anchors, request JSON and source-to-criteria mappings were checked. Application sources, automation scripts and completed execution evidence were unchanged. The previously submitted repository remained clean at `d51939be4849a3790909f699c8800c0f22dac267`; no Vettify files were modified. Supplied Figma, additional quality targets, external contracts and separately assigned document owners remain explicit context gaps rather than invented content.
