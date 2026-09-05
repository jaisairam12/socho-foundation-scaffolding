# SochoYhaPe — AI-Powered Engineering Final-Year Project Platform

> **"Stop Searching. Start Finding It Here."**  
> *SochoYhaPe helps engineering students find, analyze and successfully build the right final-year project.*

---

## 🌟 What is SochoYhaPe?

**SochoYhaPe** (सोचो यहाँ पे) is an AI-driven, engineering-first discovery, decision, and execution platform for university students embarking on their final-year capstone projects. 

Instead of searching endlessly through generic project lists, SochoYhaPe combines a **deterministic 5-factor matching algorithm** with **Google Gemini 2.5 Flash AI mentorship** to guide students from initial project discovery to their final external Viva examination.

---

## ✨ Key Features

1. **Intelligent Project Catalog (`/projects`)**: Browse, search, and filter verified engineering project blueprints with complete hardware BOMs, tech stacks, difficulty ratings, and estimated costs in INR.
2. **Deterministic Matching Engine (`/find-project`)**: Match student preferences (branch, domain, skills, budget, duration) against project requirements with objective 0–100% compatibility scores.
3. **Gemini AI Senior Mentor (`AiMentorChat`)**: Get personalized advice acting as a professional engineering mentor + friendly senior, explaining why a project matches, skill gaps, learning paths, and hardware procurement strategies.
4. **Idea Feasibility Analyzer (`/analyze-idea`)**: Submit custom project proposals for AI risk, cost, hardware feasibility, missing feature, and architectural breakdown.
5. **Viva Defense Preparation (`/viva`)**: Practice external examiner viva questions categorized into hardware design, theoretical fundamentals, software architecture, edge cases, and deployment.
6. **Side-by-Side Project Matrix Comparison (`/compare`)**: Compare 2–3 projects across 10 technical dimensions alongside Gemini AI trade-off analysis.
7. **Interactive 8-Stage Roadmap & Progress Tracker (`ProjectRoadmap`)**: Guide students through Idea → Research → Design → Development → Testing → Deployment → Documentation → Viva.
8. **Real GitHub Open-Source Finder (`/github-finder`)**: Search live GitHub repositories for reference codebases, star ratings, and dependencies.
9. **Team Skill Composition Matcher (`TeamSkillMatcher`)**: Analyze multi-student team skill coverage against project prerequisites.
10. **Central Student Dashboard (`/dashboard`)**: Unified workspace aggregating active project status, roadmap progress, team skill breakdown, and saved blueprints.

---

## 🛠️ Technology Stack

- **Frontend Framework**: [TanStack Start](https://tanstack.com/router) (React 19, Vite 8)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com) with custom dark mode semantic tokens
- **Database & Auth**: [Supabase](https://supabase.com) (PostgreSQL, Row Level Security)
- **AI Model**: [Google Gemini 2.5 Flash](https://ai.google.dev/) via `@google/genai`
- **Iconography**: [Lucide React](https://lucide.dev)
- **Runtime & Tooling**: Node.js v20+, TypeScript 5.8+

---

## 🚀 Quick Setup & Installation

### 1. Prerequisites
- Node.js `v20.x` or `v22.x`
- npm `v10.x` or higher
- Supabase account & project instance
- Google Gemini API Key

### 2. Installation Commands

```bash
# Clone the repository
git clone https://github.com/your-org/sochoyhape.git
cd sochoyhape

# Install node dependencies
npm install

# Set up environment variables
cp .env.example .env
```

### 3. Environment Variables (`.env`)

```ini
# Supabase Configuration (Client-side safe)
VITE_SUPABASE_URL=https://your-supabase-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key-here

# Gemini AI API Key (Server-Side ONLY - NEVER prefix with VITE_)
GEMINI_API_KEY=your-gemini-api-key-here

# App Base URL
VITE_APP_URL=http://localhost:3000
```

### 4. Database Setup (Supabase)
Run the SQL DDL script located in [`docs/DATABASE_SCHEMA.md`](file:///C:/Users/ASUS/.gemini/antigravity/scratch/socho-foundation-scaffolding/docs/DATABASE_SCHEMA.md) inside your Supabase SQL Editor.

### 5. Launch Development Server

```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

---

## 🔒 Security Architecture

- **Server-Side API Key Isolation**: All Google Gemini API calls are executed strictly within TanStack Start server functions (`createServerFn`). The `GEMINI_API_KEY` is loaded via `process.env["GEMINI_API_KEY"]` on the server host and is **never bundle-exported** to the browser.
- **Row Level Security (RLS)**: User tables (`saved_projects`, `project_progress`, `ideas_analyzed`, `profiles`) enforce PostgreSQL RLS policies matching `auth.uid() = user_id`.
- **Public Data Protection**: Only public blueprint records (`projects`) are readable anonymously.

---

## ⚙️ How the Matching Engine Works

The matching algorithm computes compatibility scores \( S \in [0, 100]\% \) using a deterministic 5-factor weighted model:

$$S = (0.30 \cdot W_{\text{branch}}) + (0.25 \cdot W_{\text{domain}}) + (0.20 \cdot W_{\text{skills}}) + (0.15 \cdot W_{\text{budget}}) + (0.10 \cdot W_{\text{duration}})$$

- **Branch Match (30%)**: 1.0 if target branch matches project's suitable branches; 0.5 for adjacent engineering branches.
- **Domain Match (25%)**: 1.0 if primary interest aligns with project domain; 0.0 otherwise.
- **Skill Overlap (20%)**: Jaccard index ratio of student's current skills vs project prerequisites.
- **Budget Fit (15%)**: Linear scale based on project estimated cost vs student max budget threshold.
- **Duration Fit (10%)**: Linear scale evaluating project duration against available timeline.

---

## 🧠 How Gemini AI Works

1. **Matching Engine Pre-Filtering**: The deterministic algorithm filters the Supabase dataset to find the top matching candidates.
2. **Context Minimization**: Gemini receives **only** the student's profile and top candidate details. It never processes the raw entire database, preventing API bloat.
3. **Prompt Persona**: Gemini is instructed to act as a **"Professional engineering mentor + friendly senior"**, ensuring advice is technically accurate, supportive, and realistic.
4. **Zero Hallucination Enforcement**: Gemini explains and expands upon factual blueprint parameters without inventing hardware components or fake pricing.

---

## 📁 Documentation Suite

For detailed technical references, explore the `/docs` directory:
- 📖 [Project Context](file:///C:/Users/ASUS/.gemini/antigravity/scratch/socho-foundation-scaffolding/docs/PROJECT_CONTEXT.md)
- 📋 [Project Requirements](file:///C:/Users/ASUS/.gemini/antigravity/scratch/socho-foundation-scaffolding/docs/PROJECT_REQUIREMENTS.md)
- 🎨 [Design System & Tokens](file:///C:/Users/ASUS/.gemini/antigravity/scratch/socho-foundation-scaffolding/docs/DESIGN_SYSTEM.md)
- 🗄️ [Database Schema & DDL](file:///C:/Users/ASUS/.gemini/antigravity/scratch/socho-foundation-scaffolding/docs/DATABASE_SCHEMA.md)
- 🤖 [AI Architecture](file:///C:/Users/ASUS/.gemini/antigravity/scratch/socho-foundation-scaffolding/docs/AI_ARCHITECTURE.md)
- 🔌 [API Documentation](file:///C:/Users/ASUS/.gemini/antigravity/scratch/socho-foundation-scaffolding/docs/API_DOCUMENTATION.md)
- 📊 [Dataset Documentation](file:///C:/Users/ASUS/.gemini/antigravity/scratch/socho-foundation-scaffolding/docs/DATASET_DOCUMENTATION.md)
- 🛠️ [Setup Guide](file:///C:/Users/ASUS/.gemini/antigravity/scratch/socho-foundation-scaffolding/docs/SETUP_GUIDE.md)
- 🔧 [Troubleshooting Guide](file:///C:/Users/ASUS/.gemini/antigravity/scratch/socho-foundation-scaffolding/docs/TROUBLESHOOTING.md)
- 📝 [Development Log](file:///C:/Users/ASUS/.gemini/antigravity/scratch/socho-foundation-scaffolding/docs/DEVELOPMENT_LOG.md)
- ✅ [Task Tracker](file:///C:/Users/ASUS/.gemini/antigravity/scratch/socho-foundation-scaffolding/docs/TODO.md)
- 🚀 [Changelog](file:///C:/Users/ASUS/.gemini/antigravity/scratch/socho-foundation-scaffolding/docs/CHANGELOG.md)
