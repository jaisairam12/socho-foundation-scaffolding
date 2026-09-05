# Changelog

## 2026-09-05 — Phase 2: Design system & navigation

- New colour/typography/shadow tokens (black, white, electric blue; Manrope + IBM Plex)
- Logo mark, SiteHeader with mobile menu, SiteFooter
- Button/Badge variants; ProjectCard, MatchScore, EmptyState, skeletons, restyled ErrorState
- ScrollReveal and motion utilities with prefers-reduced-motion support; toasts mounted
- Routes replaced: /how-it-works, /find-project, /analyze-idea, /features, /sign-in, /get-started, /design-system
- Docs added: PROJECT_CONTEXT, PROJECT_REQUIREMENTS, DESIGN_SYSTEM, TODO, DEVELOPMENT_LOG

## 2026-09-05 — Phase 1: Foundation

- Added documentation system under `docs/`
- Added `.env.example`
- Added responsive `AppShell`, `PagePlaceholder`, `LoadingState`, `ErrorState`
- Wired loading and error foundation into router and root route
- Added routes `/`, `/explore`, `/profile`, `/settings` with head metadata
- Replaced default design tokens with SOCHOYHAPE palette and typography
