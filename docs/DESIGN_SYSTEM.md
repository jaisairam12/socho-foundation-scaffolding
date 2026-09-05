# Design System — SochoYhaPe

## Visual Philosophy

SochoYhaPe uses a **Premium Apple-Inspired Dark Minimalist Design** tailored for modern software and hardware engineering students.

---

## Color Palette & Tokens

The color architecture relies on CSS Custom Properties (`src/styles/app.css`):

| Token Name | Hex Code / HSL | Semantic Usage |
| :--- | :--- | :--- |
| `--background` | `hsl(222 47% 4%)` / `#06090E` | Main application backdrop |
| `--card` | `hsl(222 47% 7%)` / `#0B0F19` | Surface background for cards & panels |
| `--popover` | `hsl(222 47% 7%)` / `#0B0F19` | Dropdowns and floating modals |
| `--primary` | `hsl(217 91% 60%)` / `#3B82F6` | Primary action buttons, badges, highlights |
| `--accent` | `hsl(187 92% 53%)` / `#06B6D4` | AI badge indicators, live status glows |
| `--foreground` | `hsl(210 40% 98%)` / `#F8FAFC` | Primary text headings |
| `--muted-foreground` | `hsl(215 20.2% 65.1%)` / `#94A3B8` | Body copy and secondary text |
| `--border` | `hsl(217 33% 14%)` / `#1E293B` | Subtle card dividers and inputs |

---

## Typography

- **Headings & Primary UI**: Inter / Manrope sans-serif font stack.
- **Code, Architecture & Tech Badges**: IBM Plex Mono / Fira Code monospace font stack.

---

## Iconography & Component Primitives

- Icons sourced from `lucide-react`.
- Glassmorphism effects applied using `backdrop-blur-md` and `bg-slate-900/60`.
- Micro-interactions: Subtle scale transforms (`hover:scale-[1.02]`), electric blue borders (`hover:border-primary/50`), and glowing pill badges.
