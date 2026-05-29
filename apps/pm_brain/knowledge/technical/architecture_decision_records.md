# Architecture Decision Records (ADRs)

## What Is an ADR?

An Architecture Decision Record captures a significant architectural decision: the context that prompted it, the decision made, and the consequences (positive and negative). Michael Nygard popularized the format in 2011.

ADRs are not design documents. They do not describe how a system works. They explain *why* it works that way.

## When to Write an ADR

Write an ADR when:
- You are choosing between two or more viable technical approaches
- The decision will be hard or expensive to reverse
- Future maintainers will likely wonder “why was this done this way?”
- A new team member would make a different choice without context

Do NOT write an ADR for:
- Implementation details (e.g., which variable naming convention)
- Reversible, low-stakes choices
- Decisions that are self-evident from the codebase

## Nygard Format (Canonical)

```
# ADR-NNN: Title

**Date:** YYYY-MM-DD  
**Status:** Proposed | Accepted | Deprecated | Superseded by ADR-NNN

## Context
What situation prompted this decision? What forces are at play?
Include technical, organizational, and time constraints.

## Decision
What was decided? Use active voice: "We will..." or "We chose..."

## Consequences
What happens as a result? List both positive and negative outcomes.
Include what becomes easier and what becomes harder.
```

## Lightweight Fitness Functions

Fitness functions (from “Building Evolutionary Architectures” by Ford, Parsons, Kua) are automated tests that verify architectural properties:

- **Latency fitness function:** `p99 response time < 200ms` → run in CI
- **Coupling fitness function:** no module in domain A imports from domain B directly → enforced via import linter
- **Security fitness function:** no hardcoded secrets → run via `detect-secrets` in pre-commit

A fitness function makes an ADR enforceable, not just documented.

## Common Architecture Decisions for PMs to Know

### Monolith vs. Microservices
- Monolith: faster to start, easier to debug, harder to scale independently
- Microservices: independent deployability, requires mature CI/CD and observability
- **Default recommendation:** monolith until you have clear team-boundary or scaling reasons to split

### Synchronous vs. Asynchronous Communication
- Sync (REST/gRPC): simpler, easier to debug, creates temporal coupling
- Async (queues/events): decoupled, resilient, harder to trace and test
- **Use async when:** the consumer doesn’t need the result immediately, or the producer and consumer need independent scaling

### SQL vs. NoSQL
- SQL: ACID guarantees, mature tooling, flexible queries, harder to scale horizontally
- NoSQL: horizontal scale, schema flexibility, often weaker consistency guarantees
- **Default recommendation:** PostgreSQL unless you have a specific access pattern SQL cannot serve

### Build vs. Buy
Key questions:
1. Is this core to your competitive advantage?
2. What is the total cost of ownership (TCO) including ops and talent?
3. What is the migration cost if the vendor relationship ends?

## ADR Tooling
- **adr-tools** (CLI): creates and links ADRs from the command line
- **Log4brains** (web UI): browse ADR history in a browser
- **Plain markdown in `/docs/adr/`**: lowest friction, works everywhere
