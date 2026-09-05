# Decisions

Append-only. Newest at the bottom.

## D-001 — Foundation first, no feature logic

**Date:** 2026-09-05
**Decision:** Phase 1 ships only the documentation system, environment
template, app shell, loading/error foundation, and placeholder routes.
**Why:** Avoid fake functionality. Real features land only when backed by
real data and real logic.

## D-002 — Placeholder routes are explicit

**Date:** 2026-09-05
**Decision:** `/explore`, `/profile`, `/settings` render a shared
`PagePlaceholder` component that states the page is not built yet.
**Why:** The brief for this phase did not include a final route list. These
three are assumptions and are trivial to rename or remove.

## D-003 — No backend in this phase

**Date:** 2026-09-05
**Decision:** Lovable Cloud is not enabled. `.env.example` reserves the
variable names for when it is.
**Why:** Confirmed with the project owner: shell and docs only.

## D-004 — Visual direction

**Date:** 2026-09-05
**Decision:** Warm off-white background, deep ink foreground, single terracotta
accent, Fraunces (display) + Instrument Sans (body). All colours are semantic
tokens in `src/styles.css`; no hardcoded colours in components.
**Why:** Gives the shell a distinct identity without committing to product
branding that has not been supplied.
