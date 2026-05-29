# Vendor Contract Terms for PMs

## SLA Definitions

**Uptime / Availability**
- 99.9% = ~8.7 hours downtime per year
- 99.95% = ~4.4 hours per year
- 99.99% = ~52 minutes per year

Always ask: what counts as “downtime”? Partial degradation often doesn’t trigger SLA credits.

**Recovery Time Objective (RTO):** How long to restore service after an incident.  
**Recovery Point Objective (RPO):** Maximum acceptable data loss measured in time.

**SLA Credits:** Negotiate the right to terminate for cause if the SLA is breached X times in Y months. A cap on service credit liability prevents real accountability.

## IP Ownership and Work-for-Hire

**Default rule (US):** Work created by an independent contractor belongs to the contractor — unless there is a written work-for-hire agreement.

**What to insist on:**
- All custom work is “work made for hire”
- Vendor retains background IP license; you own foreground IP
- Specify what happens to deliverables if contract is terminated early

**Watch for:** Clauses where vendor retains ownership until full payment. Broad joint ownership clauses (joint IP is nearly unusable without both parties’ consent).

## Limitation of Liability

- Vendors will cap total liability at 12 months of fees — generally acceptable
- Push back on caps below 6 months of fees
- Carve-outs from the cap: willful misconduct, gross negligence, IP indemnification, breach of confidentiality
- Mutual cap: your liability should be capped symmetrically

## MSA vs. SOW Structure

**Master Service Agreement (MSA):** Framework governing all future work. Sets IP, liability, confidentiality, governing law.

**Statement of Work (SOW):** Project-specific. Defines scope, deliverables, timeline, pricing, acceptance criteria.

Negotiate the MSA carefully — you’ll live with it for years.

## T&M vs. Fixed-Fee Trade-offs

| | Time & Materials | Fixed Fee |
|---|---|---|
| Who bears scope risk? | You (the client) | Vendor |
| Vendor incentive | Bill more hours | Cut scope/quality to hit margin |
| Works well when | Scope is uncertain | Scope is well-defined |

## Exit Clauses and Data Portability

- **Termination for convenience:** Right to exit with 30–90 days notice. Vendors often resist — insist.
- **Data portability:** Right to export all your data in a standard, machine-readable format within 30 days of termination
- **Transition assistance:** Vendor must cooperate with your migration to a new vendor
