# Project Budget Modeling for PMs

## OpEx vs. CapEx Classification

**CapEx (Capital Expenditure):** Investment in long-lived assets. Software development that creates a new asset. Depreciated over time.

**OpEx (Operating Expenditure):** Day-to-day costs. Expensed immediately.

For software projects:
- New product development → often CapEx (ASC 350-40 in the US)
- Maintenance and bug fixes → OpEx
- Cloud infrastructure → OpEx (you don’t own it)
- SaaS subscriptions → OpEx

## Loaded Cost Calculation

Never budget for headcount at raw salary. A fully-loaded employee costs 1.3–1.5x their base salary:

| Component | Typical multiplier |
|---|---|
| Base salary | 1.0x |
| Employer payroll taxes | +0.08x |
| Benefits (health, dental, 401k match) | +0.15x |
| Equipment, software licenses | +0.05x |
| Management overhead, recruiting amortization | +0.10x |
| **Total** | **~1.35–1.45x** |

For contractor costs: skip benefits but add agency margin (20–30%).

**Example:** An engineer at $150K base costs ~$200K–$215K fully loaded.

## Budget Line Items for Software Projects

**People:** Engineering, PM, Design, QA, DevOps (FTE or contractor hours)

**Infrastructure:** Compute, storage, network egress (model at projected peak + 20% headroom)

**Software licenses:** Dev tools, CI/CD, monitoring, security, collaboration

**Contingency:**
- 10–15% for low-risk, well-defined projects
- 20–30% for high-uncertainty or novel projects
- Never treat contingency as free money — require a change request to use it

## Budget Presentation to Stakeholders

1. Total ask and duration
2. Three biggest cost drivers (usually headcount)
3. Key assumptions (if they change, the budget changes)
4. Consequences of *not* approving the budget
