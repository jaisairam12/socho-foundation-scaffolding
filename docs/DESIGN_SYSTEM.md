# Design System

Live reference: `/design-system` (renders every component with sample props; `noindex`).
Tokens: `src/styles.css`. Components: `src/components/`.

## Direction
Premium, Apple-inspired restraint with an engineering/university tone and a subtle futuristic edge.
Black, white and one electric blue. Gradients only as hairline accents (project card top edge).

## Colour tokens (oklch, light / dark)
| Token | Use |
| --- | --- |
| `background` / `foreground` | white / near-black ink (inverted in dark) |
| `surface` | footer and quiet section backgrounds |
| `primary` | black buttons / white in dark |
| `electric`, `electric-soft` | the single accent: active nav underline, links, logo core, badges |
| `success`, `warning`, `destructive` | status badges and states |
| `border`, `input`, `ring` | hairlines; focus ring is electric |
Shadows: `shadow-soft`, `shadow-lift` (hover), `shadow-glow` (electric button hover).

## Typography
- Display / headings: **Manrope** 500–800, `-0.02em` tracking, `text-wrap: balance`
- Body: **IBM Plex Sans** 400–600
- Mono: **IBM Plex Mono** (tags, IDs)
Loaded via `<link>` in `__root.tsx`; exposed as `font-display`, `font-sans`, `font-mono`.

## Logo
`src/components/brand/logo.tsx` — "idea node": electric core with three circuit traces to satellite nodes.
Abstract by design; never a robot head or face. `LogoMark` (icon) and `Logo` (mark + wordmark link).

## Components
| Component | File | Notes |
| --- | --- | --- |
| Button | `ui/button.tsx` | pill shape; variants default, electric, outline, secondary, ghost, link, destructive; sizes sm/default/lg/icon; press feedback |
| Badge | `ui/badge.tsx` | default, electric, secondary, success, warning, destructive, outline |
| Card | `ui/card.tsx` | shadcn base |
| ProjectCard | `project-card.tsx` | props-only; hover lift + electric hairline; optional MatchScore |
| MatchScore | `match-score.tsx` | circular meter 0–100, `role="meter"`; presentational only |
| Input / Textarea / Select / Label | `ui/*` | shadcn base with new tokens |
| Progress | `ui/progress.tsx` | shadcn base |
| Dialog | `ui/dialog.tsx` | shadcn base |
| Toasts | `ui/sonner.tsx` | `<Toaster>` mounted in `__root.tsx`; call `toast()` from sonner |
| SiteHeader | `navigation/site-header.tsx` | sticky, blur on scroll, active underline, skip link, mobile Sheet menu |
| SiteFooter | `navigation/site-footer.tsx` | three columns + phase label |
| LoadingState / Spinner / ProjectCardSkeleton | `loading-state.tsx` | router default pending = LoadingState |
| EmptyState | `empty-state.tsx` | icon, title, description, action |
| ErrorState | `error-state.tsx` | root error boundary; `compact` variant |

## Motion
- Utilities in `styles.css`: `reveal` (scroll reveal), `press` (active scale), `circuit-grid` (decorative bg), `ease-out-expo`.
- `ScrollReveal` (`motion/scroll-reveal.tsx`) uses IntersectionObserver; skips under reduced motion.
- Global `prefers-reduced-motion` rule collapses all animations/transitions.
- Existing dependency `tw-animate-css` powers the mobile menu item stagger. No new animation packages added.

## Navigation
Desktop (≥1024px): SOCHOYHAPE · Home · How It Works · Find Project · Analyze Idea · Features · Sign In · Get Started.
Below that: hamburger opens a right-side sheet with the same links and both actions.
