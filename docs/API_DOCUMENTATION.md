# API Documentation

This document describes the external APIs, internal Supabase client queries, and TanStack Start server functions implemented in **SOCHOYHAPE**.

---

## 1. External APIs

### **GitHub REST API v3**
- **Endpoint**: `https://api.github.com/search/repositories`
- **Use Case**: Searches open-source engineering codebases, hardware drivers, and starter templates.
- **Parameters**: `q={searchQuery}+in:name,description,topic&sort=stars&order=desc&per_page=9`
- **Headers**: `Accept: application/vnd.github.v3+json`
- **Error Handling**: Graceful detection of HTTP 403 rate limits with user alerts.

### **Google Gemini 2.5 Flash API**
- **Endpoint**: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`
- **Security Boundary**: Executed **EXCLUSIVELY** inside server functions (`src/lib/gemini-mentor.functions.ts`).
- **Configuration**: `response_mime_type: "application/json"`, `temperature: 0.7`.

---

## 2. Server Functions Registry (`src/lib/gemini-mentor.functions.ts`)

| Function | Method | Input Payload | Output Schema |
| --- | --- | --- | --- |
| `generateGeminiMentorship` | `POST` | `StudentPreferences`, `topProjects[5]` | Overall summary & per-project mentor insights |
| `analyzeStudentIdea` | `POST` | `title`, `description`, `branch`, `domain` | Feasibility (0-100), difficulty, AI cost, AI duration, tech stack, hardware BOM, missing features, risks, improvements, architecture, roadmap |
| `generateProjectVivaQuestions` | `POST` | `Project` object | 10 category-specific Viva exam Q&As with suggested answers & key points |
| `chatWithProjectMentor` | `POST` | `projectTitle`, `projectDomain`, `projectTech`, `history`, `userMessage` | Conversational mentor response text |
| `explainProjectTradeOffs` | `POST` | `projects[2..3]` | Executive comparison of engineering trade-offs, pros/cons, & winner recommendation |

---

## 3. Supabase Queries

### **Paginated Project Query**:
```ts
supabase.from('projects')
  .select('*', { count: 'exact' })
  .eq('domain', domain)
  .eq('difficulty', difficulty)
  .or(`title.ilike.%${search}%,short_description.ilike.%${search}%`)
  .lte('estimated_cost', maxBudget)
  .range(from, to);
```

### **Single Project Lookup**:
```ts
supabase.from('projects').select('*').eq('id', id).single();
```
