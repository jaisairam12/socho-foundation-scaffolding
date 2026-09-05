# Development Log

## 2026-09-05 — Phase 2: design system & navigation
- Inspected existing shell, routes, shadcn primitives (already installed) and dependencies.
- Replaced warm palette with black/white/electric-blue tokens; added `surface`, `electric`,
  `success`, `warning`, shadow and easing tokens; dark values included.
- Fonts changed to Manrope (display) + IBM Plex Sans (body) + IBM Plex Mono.
- Built logo mark, SiteHeader (desktop nav, scroll-aware blur, active underline, skip link,
  mobile Sheet menu), SiteFooter; AppShell now composes them.
- Restyled Button (pill, `electric` variant, press feedback) and Badge (status variants).
- Added ProjectCard, MatchScore, EmptyState, Spinner/ProjectCardSkeleton, restyled ErrorState.
- Added ScrollReveal + `reveal`, `press`, `circuit-grid` utilities; global reduced-motion rule.
- Mounted sonner `<Toaster>` in root.
- Routes: removed `/explore`, `/profile`, `/settings`; added `/how-it-works`, `/find-project`,
  `/analyze-idea`, `/features`, `/sign-in`, `/get-started` (placeholders) and `/design-system`.
- Verified: typecheck clean; all routes return 200; mobile menu opens and closes; no console errors.
- Created missing docs: PROJECT_CONTEXT, PROJECT_REQUIREMENTS, DESIGN_SYSTEM, TODO, DEVELOPMENT_LOG.

## 2026-09-05 — Phase 1: foundation
- See CHANGELOG.md.
