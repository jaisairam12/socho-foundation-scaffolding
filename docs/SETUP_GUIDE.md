# SochoYhaPe — Setup & Deployment Guide

This guide walks through setting up the **SochoYhaPe** application locally and deploying to production.

---

## Prerequisites

- **Node.js**: `v20.x` or `v22.x` (LTS recommended)
- **npm**: `v10.x` or higher
- **Supabase Account**: Access to a Supabase project instance
- **Google Gemini API Key**: API key for `gemini-2.5-flash` model via Google AI Studio

---

## 1. Local Project Installation

Clone the repository and install dependencies:

```bash
# Clone repository
git clone https://github.com/your-org/sochoyhape.git
cd sochoyhape

# Install node packages
npm install
```

---

## 2. Environment Variables Configuration

Create a `.env` file in the root directory by copying `.env.example`:

```bash
cp .env.example .env
```

Set the required environment variables:

```ini
# Supabase Configuration (Client-side safe)
VITE_SUPABASE_URL=https://your-supabase-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key-here

# Gemini AI API Configuration (Server-Side ONLY - NEVER prefix with VITE_)
GEMINI_API_KEY=your-gemini-api-key-here

# Application Base URL
VITE_APP_URL=http://localhost:3000
```

> [!IMPORTANT]
> `GEMINI_API_KEY` must **NEVER** use the `VITE_` prefix. TanStack Start server functions run in a isolated server process, reading `process.env["GEMINI_API_KEY"]` safely without embedding secret keys in client JavaScript bundles.

---

## 3. Database Setup (Supabase)

1. Open your Supabase project dashboard -> **SQL Editor**.
2. Run the DDL script found in [`docs/DATABASE_SCHEMA.md`](file:///C:/Users/ASUS/.gemini/antigravity/scratch/socho-foundation-scaffolding/docs/DATABASE_SCHEMA.md).
3. Verify the following tables are created:
   - `projects`
   - `profiles`
   - `saved_projects`
   - `project_progress`
   - `ideas_analyzed`
4. Confirm Row Level Security (RLS) policies are active on `profiles`, `saved_projects`, `project_progress`, and `ideas_analyzed`.

---

## 4. Running Locally

Start the local development server:

```bash
npm run dev
```

The application will be accessible at:
`http://localhost:3000`

---

## 5. Production Build & Verification

Build the production bundle and verify compilation:

```bash
# Build production bundle with TanStack Start + Vite
npm run build

# Preview production server locally
npm run start
```

Output assets will compile to `.output/` containing both client distribution files and isolated SSR server bundles.
