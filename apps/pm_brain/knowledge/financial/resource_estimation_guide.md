# Resource and Effort Estimation Guide

## Three-Point Estimation (PERT)

```
E = (O + 4M + P) / 6

where:
  O = Optimistic (best case, 10% probability)
  M = Most likely (mode)
  P = Pessimistic (worst case, 10% probability)
```

Standard deviation: `σ = (P - O) / 6`  
90% confidence interval: `[E - 1.65σ, E + 1.65σ]`

**Example:** O=3 days, M=7 days, P=20 days
- E = (3 + 28 + 20) / 6 = **8.5 days**
- σ = 2.8 days
- 90% range: 3.9 – 13.1 days

Always aggregate by summing E values. Do NOT sum pessimistic values — that double-counts risk.

## Story Points to Hours: Conversion Ranges

| Points | Junior team | Senior team |
|---|---|---|
| 1 | 4–6 hrs | 2–4 hrs |
| 2 | 6–10 hrs | 4–6 hrs |
| 3 | 1–1.5 days | 0.5–1 day |
| 5 | 2–3 days | 1–2 days |
| 8 | 4–5 days | 3–4 days |
| 13 | 1–2 weeks | 1 week |

Calibrate to your team. Run 4–6 sprints before using velocity for external commitments.

## Velocity Tracking and Sprint Capacity

**Sustainable velocity:** Take last 6 sprints, discard highest and lowest, average the rest.

**Sprint capacity = velocity × capacity factor**
- Full team: factor = 1.0
- Account for holidays, PTO, on-call: typically 0.7–0.85

**Example:** Average velocity = 40 points. One engineer on vacation, 2 days holiday.
- Capacity factor = 0.7
- Sprint plan: 40 × 0.7 = **28 points**

## Planning Poker

**Process:**
1. PM reads story and acceptance criteria
2. Engineers ask clarifying questions
3. All simultaneously reveal estimate (Fibonacci: 1, 2, 3, 5, 8, 13, 21)
4. Highest and lowest explain reasoning
5. Re-estimate (usually 2 rounds max)

**What divergent estimates signal:**
- High variance (2 vs. 13): story is not well understood
- Everyone says 13+: story needs to be split

## Common Estimation Anti-Patterns

- **Optimism bias:** Add 30–50% when the task has no close precedent
- **Student syndrome:** Teams defer work until the deadline. Buffer at project level, not task level.
- **Anchoring to the desired date:** Ask “how long?” before sharing the constraint
- **Ignoring integration and testing:** Development is 60–70% of total effort. Budget for the full cycle.
- **Not accounting for dependencies:** Add 1–3 days buffer per external handoff
