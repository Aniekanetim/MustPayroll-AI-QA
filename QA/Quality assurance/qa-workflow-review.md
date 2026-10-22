# QA workflow standards review

**Standards review: 21 October 2026. Execution status updated: 22 October 2026.** Recommendations were authorized and incorporated into the workflow and RUN-002 packet v2. G1/G2 were approved after the case briefing, G3 findings were accepted, and G4 fixed execution was separately authorized and completed. Buggy: 7 Pass / 1 Fail; fixed: 8 Pass / 0 Fail. Human correction confirmation, defect disposition and the G5 handoff decision remain Pending.

## Conclusion

The proposed AI-led, human-reviewed approach has a credible industry basis. Our five gates are a project approval policy; they are not the standard test process itself. The revised workflow maps them to recognized testing activities and strengthens preparation, ongoing control and completion before RUN-002 execution.

## Authoritative references and review limits

| Reference | What it establishes | Material reviewed |
| --- | --- | --- |
| [ISTQB CTFL v4.0.1](https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf) | Testing activities, roles and supporting practices | Relevant sections 1.2.2, 1.4, 2.1, 5.1 and 5.3–5.5 |
| [ISO/IEC/IEEE 29119-2:2021](https://www.iso.org/standard/79428.html) | A general test-process standard applicable across development lifecycles | Public scope/abstract; not a full normative-text conformity audit |
| [ISO/IEC/IEEE 29119-3:2021](https://www.iso.org/standard/79429.html) | Documentation supporting those test processes | Public scope/abstract; no claim that every template has been implemented |
| [ISO/IEC 25010:2023](https://www.iso.org/standard/78176.html) | A product-quality model for specifying and evaluating quality objectives | Public scope/abstract; supports choosing measurable quality criteria |
| [ISTQB Testing with Generative AI v1.1](https://isqi.org/media/b9/8c/34/1777291646/ISTQB-CT-GenAI%20-%20Syllabus%20v1.1.pdf) | Agent-supported testing, output evaluation and human oversight | Relevant sections 2.2–2.3, 3.1, 4.1.3 and 5.2.3; [official publication page](https://istqb.org/certifications/gen-ai/) |

The ISO process and documentation standards describe approaches applicable to different organizations and lifecycles. They support tailoring rather than establishing our specific gate names. We can describe a tailored, standards-aligned approach; this review does not establish formal ISO conformance.

## Recognized test-process activities

ISTQB describes seven activity groups. They can overlap and repeat as the product and risks change. Monitoring/control operates throughout. QA also includes preventive process improvement; product testing is one quality-control activity. Source: CTFL §§1.2.2 and 1.4.1.

| Activity | Practical purpose |
| --- | --- |
| Test planning | Agree objectives, approach and constraints |
| Test monitoring and control | Track progress and adjust work |
| Test analysis | Identify and prioritize what needs checking |
| Test design | Define checks and expected behavior |
| Test implementation | Prepare scripts, data and a usable environment |
| Test execution | Perform checks and record outcomes |
| Test completion | Evaluate the work and preserve its handoff |

Entry/exit decisions, traceability, versioned records, anomaly handling and learning from the work support this process. They must remain visible when activities are combined. Source: CTFL §§1.4.3–1.4.4 and chapter 5.

## How AI and human review fit

The GenAI syllabus describes agents that can act through tools across testing activities. Section 4.1.3 distinguishes autonomy levels, including agent execution with human oversight. Section 5.2.3 describes testers guiding and checking AI-produced work. Sections 2.3 and 3.1 address evaluating that work and detecting misleading output.

**Our proposed application:** the agent performs the technical work; the QA engineer reviews its assumptions, coverage, evidence and conclusions. Reviews can verify evidence and assertions without repeating every action manually. Record the actual review method and decision. Agent execution, QA review and product release authority remain distinct responsibilities.

## Gaps identified in the initial draft

These findings describe the draft before the revision. They are project improvements informed by the references, not additional universal requirements imposed by a standard. The corresponding corrections are now incorporated into [the workflow](qa-workflow.md).

| Current draft | Proposed correction |
| --- | --- |
| Five review gates dominate the process description | Show the testing activities underneath the gates; label gate names as our governance choice |
| Requirement/risk analysis is folded into scope and design | Show the selected sources, unresolved rules, risk priorities and coverage rationale before approving cases |
| G2 moves from design approval into execution without a clear preparation review | Verify the generated scripts, test records, build identity and environment before running |
| Progress tracking and change control are implicit | Keep a concise ongoing account of coverage, blockers, anomalies, changed risks and decisions |
| Completion emphasizes results and the release recommendation | Evaluate agreed completion criteria; retain open risks, reusable checks and a concrete improvement action |
| An agent recommendation can be read as clearance | Label the recommendation and the human QA decision separately, with the evidence reviewed |

## Recommended adaptation for this project

Keep one adaptive workflow. Start with the objective and relevant testing types, examine the requirements and risks, design the checks, prepare the tools/data/environment, execute and investigate, then confirm corrections and complete the handoff. Track progress and changed risks across all of those activities.

Retain our existing review gates with clearer review content:

| Project gate | Recommended review packet |
| --- | --- |
| G1 | Objective, sources, open questions, selected risks, coverage intent and measurable criteria |
| G2 | Cases plus prepared scripts/data/environment; evidence that execution prerequisites are met |
| G3 | Observations, anomalies, defect classification, supported cause and proposed response |
| G4 | Identified correction, original failure, confirmation checks and adjacent regression |
| G5 | Completion against criteria, remaining risk, handoff, retained checks and lessons learned |

The gate count and approval frequency are project decisions. Approval can cover a bounded set of activities; changes return to the affected review point. These are not compulsory waterfall stages.

For the current payroll cycle, require agreed BR01–BR06 expectations, reviewed assertions, isolated data and a verified build before execution. At completion, every planned case needs an observed status or an explicit blocker, defects need an actionable disposition, and the fixed-reference decision needs retained before/after evidence. Eight cases are an assessment minimum, not a general definition of adequate QA.

The same approach adapts to another testing objective. API and browser identify interaction channels; either can support functional or non-functional checks. For a performance segment, agree workload and measurable thresholds. For usability, distinguish expert inspection from evidence collected with representative users. For security/accessibility, identify the specific criteria and the limits of the selected method. ISO/IEC 25010 provides the broader quality-model reference; the particular method remains a scoped project decision.

## Implementation and next decision

After the research, Aniekan authorized implementation of these recommendations. [The revised workflow and packet v2](qa-workflow.md#run-002-scope-and-test-design-packet-v2) now expose the seven activities, requirement/risk analysis, preparation evidence, continuous control and completion review. Source/build integrity, both test projects' TypeScript checks and exported API inputs were checked without executing the application cases.

G1/G2 approval followed the conversational case briefing, with a requirement to prevent blind approval. The workflow now requires an informed briefing and scoped decision record at every gate and testing type. The eight buggy cases executed: 7 Pass / 1 Fail. Aniekan accepted the G3 findings and separately authorized G4 fixed retesting on 22 October 2026. All eight fixed cases passed. Actual human confirmation checks were not supplied and are not inferred from acceptance. The [completion review and focused confirmation guide](qa-workflow.md#run-002-completion-review-and-human-correction-confirmation) now support the G5 decision.

The research/workflow revision did not change product code or test implementation. Subsequent RUN-002 results are recorded separately from RUN-001, whose evidence and Pending human-review status remain intact. The standards research informs the process; the execution records establish the product outcomes.
