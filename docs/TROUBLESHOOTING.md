# SochoYhaPe — Troubleshooting Guide

Common issues, diagnostic procedures, and resolutions for SochoYhaPe developers and operators.

---

## 1. AI & Gemini Integration Issues

### Issue: `GEMINI_API_KEY is not set`
- **Symptom**: AI features (Senior Mentor Chat, Idea Analyzer, Viva Prep, Project Comparison Trade-offs) fail with an API key error banner.
- **Root Cause**: The environment variable `GEMINI_API_KEY` is missing from the server environment or is incorrectly named `VITE_GEMINI_API_KEY`.
- **Resolution**:
  1. Ensure your `.env` file contains `GEMINI_API_KEY=AIzaSy...` (without the `VITE_` prefix).
  2. If using Vercel/Netlify/Docker, add `GEMINI_API_KEY` to your host platform's server environment settings.
  3. Restart the dev server (`npm run dev`).

### Issue: Gemini API Rate Limit Exceeded (HTTP 429)
- **Symptom**: AI generation returns a fallback retry error message.
- **Root Cause**: API quota limit hit on Google AI Studio tier.
- **Resolution**:
  - The application automatically catches API exceptions, displays a graceful error alert to the user, and presents a retry button.
  - Upgrade your Google AI Studio plan or wait 60 seconds before retrying.

---

## 2. Database & Supabase Issues

### Issue: `Permission denied for relation projects / saved_projects`
- **Symptom**: Supabase returns a 403 or empty array response when fetching user data.
- **Root Cause**: Row Level Security (RLS) policy is blocking read/write access.
- **Resolution**:
  1. Ensure `projects` has a `SELECT` policy enabled for public read access:
     ```sql
     CREATE POLICY "Allow public read on projects" ON public.projects FOR SELECT USING (true);
     ```
  2. Verify that authenticated user queries include `auth.uid() = user_id` for personal records (`saved_projects`, `project_progress`).

### Issue: Offline or Database Connection Failure
- **Symptom**: Network disconnect or Supabase endpoint failure.
- **Resolution**:
  - SochoYhaPe includes automatic offline fallback dataset structures (`src/data/mock-projects.ts`).
  - Read functions gracefully fall back to sample blueprints, maintaining UI stability without app crashes.

---

## 3. Build & Compilation Issues

### Issue: TypeScript Error on `exactOptionalPropertyTypes`
- **Symptom**: Build error during `tsc` checking optional properties.
- **Root Cause**: Passing `undefined` explicitly to optional filter params.
- **Resolution**: Clean optional object parameters before passing them to matching functions, e.g.:
  ```ts
  const cleanParams = Object.fromEntries(
    Object.entries(rawParams).filter(([_, v]) => v !== undefined)
  );
  ```

---

## 4. GitHub API Rate Limits

### Issue: `GitHub API rate limit exceeded`
- **Symptom**: GitHub Finder search returns HTTP 403.
- **Root Cause**: GitHub unauthenticated REST API limit (60 requests/hour per IP).
- **Resolution**:
  - SochoYhaPe handles rate limits gracefully by rendering a informative notice and suggesting popular repository topic links.
  - Optional: Add `VITE_GITHUB_TOKEN` to headers in `src/lib/github-api.ts` to increase quota to 5,000 requests/hour.
