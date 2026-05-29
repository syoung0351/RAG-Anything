# Technology Stack Evaluation Framework

## Evaluation Matrix

Score each option 1–5 across these dimensions:

| Criterion | Weight | Notes |
|---|---|---|
| Team expertise | 30% | How quickly can your team be productive? |
| Community & ecosystem | 20% | Libraries, Stack Overflow answers, hiring market |
| Operational maturity | 20% | Monitoring, deployment tooling, cloud support |
| Performance fit | 15% | Does it meet your specific workload’s requirements? |
| Vendor/lock-in risk | 15% | What does exit cost? |

Calculate weighted score. Use this to structure the conversation, not replace judgment.

## Total Cost of Ownership (TCO)

**One-year TCO = License + Infrastructure + Engineering + Migration**

- **License costs:** SaaS/managed services often have hidden per-seat or per-request pricing at scale. Model at 10x current load.
- **Infrastructure:** Compute, storage, network egress. Run the numbers for current and projected load.
- **Engineering cost:** How many engineer-weeks to implement, maintain, and operate? Apply loaded cost multiplier (1.3–1.5x salary).
- **Migration cost:** If you choose wrong, what does it cost to switch? This is the most underestimated factor.

## Build vs. Buy Decision Tree

1. **Is this core to your competitive differentiation?**
   - Yes → strong signal to build
   - No → strong signal to buy

2. **Does a good enough commercial/OSS option exist?**
   - Yes → buy unless TCO of buying exceeds TCO of building by >2x
   - No → build

3. **What is your team’s capacity?**
   - Building takes 3–5x longer than expected. Be honest about bandwidth.

4. **What is the vendor dependency risk?**
   - Single-vendor SaaS: high lock-in risk
   - OSS with multiple implementations: low lock-in risk
   - Managed OSS (e.g., RDS for Postgres): moderate risk

## Database Selection Guide

| Use case | Recommendation |
|---|---|
| General-purpose OLTP | PostgreSQL |
| Full-text search | PostgreSQL FTS or Elasticsearch |
| High-volume time-series | InfluxDB or TimescaleDB |
| Document store | MongoDB or PostgreSQL JSONB |
| Graph relationships | Neo4j or PostgreSQL with recursive CTEs |
| Cache / session | Redis |
| Analytical queries (OLAP) | BigQuery, Snowflake, or DuckDB |

## Red Flags in Technology Evaluations

- Choosing based on what the architect already knows
- Ignoring operational complexity (deployment, monitoring, on-call)
- No performance testing under realistic load before committing
- Not talking to teams already using the technology at your scale
- “Everyone is using X” as the primary justification
