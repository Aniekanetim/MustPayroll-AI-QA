# Release-readiness checklist

**Current status: investigation in progress.** This document will record the executed evidence before any Ready decision.

| Gate | Required evidence | Status |
| --- | --- | --- |
| Agreed rules | Explicit scope, cut-off, identity and recovery rules | Defined in business_rules.md |
| Fresh controlled reproduction | Real browser shows first payment, failed delivery and retry outcome | Pending execution |
| Confirmed cause and proposed fix | Evidence distinguishes payment completion from delivery state | Pending causal verification |
| Regression before / after | Same TC07 fails on buggy and passes on fixed | Pending execution |
| Adjacent coverage | Eight cases covering happy path, cut-off, timezone, duplicate, retry and partial failure | Designed; not yet recorded |
| Handoff | Safe recovery instructions, remaining limits and final run | Pending evidence |
| Candidate review | Review script, observations and release judgment; record actual ownership | Pending candidate review |
| Submission | New Loom ≤5 minutes and professional cases appropriate to the application | Not complete |

The local corrected flow may be released for assessment review once its evidence passes. This is not a production-payroll approval. A duplicated payment, changed payment identity or notification preceding a failed payment blocks release.
