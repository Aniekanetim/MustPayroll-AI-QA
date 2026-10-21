# MustPayroll fixed build

This independent local application is part of the [AI-led payroll investigation](../../README.md). All employees and money are synthetic; notification delivery is a local stub.

Requires Node.js 22.13 or later and npm. In this folder run:

```powershell
npm ci
npm run build
npm start
```

Open http://127.0.0.1:4276/pay-runs. Use the selected Tuesday at 09:00 UTC simulation; you do not need to wait for the real date. Browser data persists locally in `data/payroll-usd.sqlite`.

The two builds share the same business rules and screens. The buggy build deliberately checks notification success to decide whether a payment already exists. The fixed build checks the committed payment. See the [defect report](../../QA/Quality%20Control/bug_report/duplicate-payment-after-notification-failure.md) for reproduction and cause.
