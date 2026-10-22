# Project context: recommended structure

**Researched:** 22 October 2026. **Status:** organization recommended for implementation; the Project Context folder has not yet been created.

## What industry guidance establishes

The reviewed guidance supports maintained requirements, shared references and clear ownership. It does not establish one directory tree that every project must use. The folder layout below is a project recommendation, not a prescribed ISO structure or a conformance claim.

| Primary source | Relevant guidance |
| --- | --- |
| [IEEE publication summary for ISO/IEC/IEEE 29148:2018](https://standards.ieee.org/standard/29148-2018.html) | Requirements processes, requirement characteristics and requirements information items. Only the public summary was reviewed, not the full paid standard. |
| [Atlassian PRD guidance](https://www.atlassian.com/agile/product-management/requirements) | Shared product context, goals, assumptions, stories, design links, questions and scope; adapt the format to the team's needs. |
| [Atlassian acceptance-criteria guidance](https://www.atlassian.com/work-management/project-management/acceptance-criteria) | Observable, clear and testable completion conditions associated with the relevant work. |
| [GitLab handbook usage](https://handbook.gitlab.com/handbook/about/handbook-usage/) | Prefer a maintained authoritative source and cross-links over repeated content; document answers so later work can reuse them. |
| [Figma version-history guidance](https://help.figma.com/hc/en-us/articles/360038006754-View-a-file-s-version-history) | File links normally show the latest design; identify the applicable handoff/version for reproducible review and ensure access is available. |

## Recommended organization

Organize product knowledge by purpose. QA, development and product management share the same references, with an identified owner for each document.

```text
Project Context/
├── README.md
├── business/
│   ├── BRD.md
│   └── business-rules.md
├── product/
│   └── PRD.md
├── design/
│   └── design-reference.md
├── technical/
│   ├── system-and-api-reference.md
│   └── environments-and-builds.md
└── decisions/
    └── <dated-decision>.md
```

This is the target information structure. Create documents and decision records when real material is available; a missing source should be identified in the index, not filled with invented requirements or approvals. Split a large PRD into feature documents only when that improves navigation. Do not create an additional acceptance-criteria folder for a second copy of the same requirements.

| Location | Question it answers | Suggested owner |
| --- | --- | --- |
| README.md | What is the project, where is each authoritative source, which version applies, and what is missing? | Product manager coordinates; all disciplines contribute |
| business/BRD.md | Why does the project exist, which business/user needs matter, and what defines business success and scope? | Product manager or business analyst |
| business/business-rules.md | Which calculations, eligibility rules, boundaries, permissions and operational constraints must hold? | Responsible business/product owner; QA reviews testability |
| product/PRD.md | What should each feature do, including its acceptance criteria, error/recovery behavior and applicable quality requirements? | Product manager with development and QA input |
| design/design-reference.md | Which journeys, Figma screens/components, interaction states and approved design revision apply? | Design owner, or product manager coordinating design |
| technical/system-and-api-reference.md | Which components, interfaces, contracts, data meanings and dependencies affect the feature? | Developer or technical lead |
| technical/environments-and-builds.md | Which build/environment is being tested, how is it prepared and which test-data or integration limits apply? | Developer, with QA verification of setup |
| decisions/ | What was clarified or changed, by whom, why and from which release/revision? | The owner responsible for that decision |

Each feature's acceptance criteria stay with its product requirement and link to cross-cutting business-rule IDs. Technical documents may link to authoritative contract files instead of copying them. A Figma reference records the file, relevant page/frame, approved handoff/version and access; versioned exports can support review when required.

## Entry point, authority and traceability

The context README contains a short project overview, terminology, a source register and navigation by feature. For every source, record its owner, document state, last update, applicable release/revision and location. Identify missing documents and unresolved questions explicitly.

Keep one authoritative location for each rule. A ticket links the applicable requirements/design revision and acceptance-criteria IDs. The agent records those references in its test basis, so later documentation changes do not silently change an earlier result.

Document state distinguishes proposals from accepted requirements and superseded material. Resolve conflicting sources with the responsible owner; do not automatically prefer the newest file, a developer claim, a screenshot or implemented code over an accepted requirement. Record an actual decision and its scope, then update the canonical document. Preserve prior baselines through version control.

The context folder holds product knowledge. The board holds assignments, developer responses and ticket conversations. The QA workflow holds the method and review gates. QA suites/results hold verification evidence. `unified_project_context.md` remains the shared progress/continuity record and links to the context index instead of repeating product requirements.

## Agent behavior when information is missing

1. Read the ticket, context index and relevant feature sources; record their revision and requirement IDs.
2. Use those sources to establish expected behavior. Identify missing, inaccessible, contradictory or unapproved information that affects a check.
3. Append a dated clarification comment to the existing ticket for the developer. State the exact question, sources checked, gap/conflict, affected check and answer or owner needed. Product/design questions can be routed to their responsible owner through that conversation.
4. Record the waiting reason and next action on the ticket. Keep it in its current folder and preserve the five-status board. Continue independent work only within the existing authorization; an untestable expectation is a clarification/blocker, not automatically a product defect.
5. When the answer arrives, retain the response, have the responsible owner update the canonical context where applicable, link that update on the ticket, and resume from the affected workflow checkpoint. Reassess scope/approval when the requirement changes. Do not resend an unchanged question every hourly check-in.

Use a concise comment structure:

```text
Clarification required — <date and actor>
Question: <one concrete question>
Checked: <source, section/requirement ID and revision>
Gap/conflict: <what is missing or inconsistent>
Affected check: <case or acceptance criterion and why it cannot be judged>
Needed from developer: <answer, source link or referral to the responsible owner>
Next action: <specific dependent work waiting for the reply>
```

A plain ticket comment does not by itself notify someone. Because developers currently check Dev Todo/Rework, expose links to unanswered developer questions in the board README's check-in summary, pointing back to the original ticket comment. This is a visibility index, not another ticket status or duplicate conversation.

## Application to this repository

The existing payroll rules are in `QA/Quality assurance/business_rules.md`; they belong in the shared business context when the structure is implemented. Preserve BR01–BR06 and update all navigation references during that move. Existing accepted scope/criteria, setup/build instructions and API references can be indexed or consolidated from their actual sources. Preserve executed results and prior decisions.

The reviewed tracked repository does not contain a standalone BRD, PRD or supplied Figma design. Index those gaps accurately. Consolidation must identify its source and actual review state rather than claim that missing product/design documents or approvals exist.

Implementation should create the context entry point and available content first, update ticket templates/AGENTS/workflow to read it and record clarification comments, and update the existing hourly check-in prompt to include it. Validate references, requirement-to-ticket/test links, a missing-information walkthrough and unchanged historical outcomes. The recommended structure is not yet implemented by this research step.
