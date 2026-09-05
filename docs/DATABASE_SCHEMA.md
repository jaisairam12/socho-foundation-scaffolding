# Database Schema — Supabase

This document outlines the database schema for the **SOCHOYHAPE** engineering project discovery platform.

---

## 1. Tables

### `projects`
Stores engineering capstone project blueprints, metadata, technical specifications, and hardware requirements.

| Column | Type | Constraints | Description |
| --- | --- | --- | --- |
| `id` | `text` / `uuid` | PRIMARY KEY | Unique identifier for the project |
| `title` | `text` | NOT NULL | Project title |
| `domain` | `text` | NOT NULL | Main engineering domain |
| `difficulty` | `text` | NOT NULL | Difficulty rating (`Beginner`, `Intermediate`, `Advanced`) |
| `estimated_cost` | `numeric` | NOT NULL | Estimated cost in INR (₹) |
| `estimated_duration` | `text` | NOT NULL | Readable duration (e.g. "6 weeks", "10 weeks") |
| `estimated_duration_weeks` | `integer` | DEFAULT 6 | Duration in weeks for numeric filtering |
| `technologies` | `text[]` | NOT NULL | Array of required programming languages/frameworks |
| `required_skills` | `text[]` | NOT NULL | Array of prerequisite skills required |
| `short_description` | `text` | NOT NULL | Brief summary |
| `description` | `text` | NULL | Comprehensive project overview |
| `problem_statement` | `text` | NULL | Detailed engineering problem |
| `hardware` | `text[]` | DEFAULT '{}' | Hardware components list (BOM) |
| `core_features` | `text[]` | DEFAULT '{}' | List of mandatory MVP features |
| `advanced_features` | `text[]` | DEFAULT '{}' | List of extended features |
| `development_steps` | `text[]` | DEFAULT '{}' | Sequential execution roadmap steps |
| `future_improvements` | `text[]` | DEFAULT '{}' | Potential enhancements |
| `suitable_branches` | `text[]` | DEFAULT '{}' | Suitable engineering branches |
| `min_team_size` | `integer` | DEFAULT 1 | Minimum recommended team size |
| `max_team_size` | `integer` | DEFAULT 4 | Maximum recommended team size |
| `dataset_ai_info` | `text` | NULL | AI model telemetry / benchmark dataset metadata |
| `created_at` | `timestamptz` | DEFAULT `now()` | Record creation timestamp |

### `saved_projects` (Phase 6)
Stores user-bookmarked project blueprints.

| Column | Type | Constraints | Description |
| --- | --- | --- | --- |
| `id` | `uuid` | PRIMARY KEY | Unique bookmark ID |
| `user_id` | `uuid` | NOT NULL | Supabase Auth user ID |
| `project_id` | `text` | NOT NULL REFERENCES `projects(id)` | Foreign key to project |
| `created_at` | `timestamptz` | DEFAULT `now()` | Bookmark timestamp |

### `project_roadmaps` (Phase 6)
Stores student project progress across 8 roadmap stages.

| Column | Type | Constraints | Description |
| --- | --- | --- | --- |
| `id` | `uuid` | PRIMARY KEY | Unique progress record ID |
| `user_id` | `uuid` | NOT NULL | Supabase Auth user ID |
| `project_id` | `text` | NOT NULL REFERENCES `projects(id)` | Associated project |
| `current_stage` | `text` | NOT NULL | Active stage (`Idea`..`Viva`) |
| `completed_stages` | `text[]` | DEFAULT '{}' | Array of completed stages |
| `notes` | `jsonb` | DEFAULT '{}' | Stage notes dictionary |
| `updated_at` | `timestamptz` | DEFAULT `now()` | Last modification timestamp |

---

## 2. SQL DDL Migration Script

```sql
-- Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  domain TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
  estimated_cost NUMERIC NOT NULL DEFAULT 0,
  estimated_duration TEXT NOT NULL,
  estimated_duration_weeks INTEGER DEFAULT 6,
  technologies TEXT[] NOT NULL DEFAULT '{}',
  required_skills TEXT[] NOT NULL DEFAULT '{}',
  short_description TEXT NOT NULL,
  description TEXT,
  problem_statement TEXT,
  hardware TEXT[] DEFAULT '{}',
  core_features TEXT[] DEFAULT '{}',
  advanced_features TEXT[] DEFAULT '{}',
  development_steps TEXT[] DEFAULT '{}',
  future_improvements TEXT[] DEFAULT '{}',
  suitable_branches TEXT[] DEFAULT '{}',
  min_team_size INTEGER DEFAULT 1,
  max_team_size INTEGER DEFAULT 4,
  dataset_ai_info TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Saved Projects Table (RLS Enabled)
CREATE TABLE IF NOT EXISTS public.saved_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  project_id TEXT NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, project_id)
);

ALTER TABLE public.saved_projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own saved projects" ON public.saved_projects
  FOR ALL USING (auth.uid() = user_id);

-- Project Roadmaps Table (RLS Enabled)
CREATE TABLE IF NOT EXISTS public.project_roadmaps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  project_id TEXT NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  current_stage TEXT NOT NULL DEFAULT 'Idea',
  completed_stages TEXT[] DEFAULT '{}',
  notes JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, project_id)
);

ALTER TABLE public.project_roadmaps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own project roadmaps" ON public.project_roadmaps
  FOR ALL USING (auth.uid() = user_id);
```
