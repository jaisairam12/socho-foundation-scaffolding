# Project Requirements — SochoYhaPe

## Core Platform Objectives

1. **Intelligent Project Discovery**: Bridge the gap between engineering curriculum requirements and realistic final-year project execution.
2. **Deterministic Matching Engine**: Calculate objective match scores (0–100%) based on domain, skills, budget, duration, and branch compatibility.
3. **Secure Gemini AI Integration**: Provide AI mentorship, proposal analysis, Viva preparation, and trade-off comparisons without exposing API secrets or hallucinating database facts.
4. **End-to-End Student Journey**: Guide students from idea discovery to Viva defense through roadmap tracking, GitHub codebase search, team skill matching, and project bookmarking.

---

## Technical Functional Requirements

### 1. Discovery & Matching
- Search projects by title, tagline, description, and keywords.
- Multi-dimensional filters: Domain, Difficulty (Beginner, Intermediate, Advanced), Maximum Budget (INR), Maximum Duration (Weeks), Engineering Branch.
- Match Engine weighted scoring formula:
  - Branch match: 30%
  - Domain match: 25%
  - Skill overlap: 20%
  - Budget fit: 15%
  - Duration fit: 10%

### 2. Gemini AI Integration
- Must run in isolated TanStack Start server functions (`process.env["GEMINI_API_KEY"]`).
- Zero client-side API key exposure.
- Input payload restricted to top 5 match candidates + student preferences (never dump entire database).
- Structured response formats with fallback handling.

### 3. Productivity Suite
- Saved Projects (Supabase bookmarking).
- Project Matrix Comparison (2–3 projects side-by-side).
- Interactive 8-Stage Roadmap & Progress Tracker.
- Real GitHub Open-Source Repository Search API.
- Team Skill Composition Matcher.
- Viva Examiner Question Generator.

---

## Non-Functional & Security Requirements

- **Design System**: Premium Apple-inspired dark palette (`#0B0F17`, electric blue `#3B82F6`, neon accent `#06B6D4`).
- **Responsive Layout**: Pixel-perfect grid layout across Desktop (1440px+), Tablet (768px–1024px), and Mobile (<768px).
- **Security**: Row Level Security (RLS) active on all private user tables; anon key used for public reads; service role keys kept private.
