# AI Architecture — Gemini AI Integration & Features

This document describes the AI architecture, security boundaries, server function design, and prompt pipelines for **SOCHOYHAPE**.

---

## 1. Architecture Overview

```text
                                  ┌────────────────────────┐
                                  │   Student Client UI    │
                                  └───────────┬────────────┘
                                              │
                    ┌─────────────────────────┼─────────────────────────┐
                    │                         │                         │
                    ▼                         ▼                         ▼
         [/find-project]               [/analyze-idea]               [/viva]
       Matching + AI Mentor            Idea Feasibility            Viva Prep Q&As
                    │                         │                         │
                    └─────────────────────────┼─────────────────────────┘
                                              │
                                              ▼
                                 [Server Functions Layer]
                            src/lib/gemini-mentor.functions.ts
                                              │
                                   (Reads GEMINI_API_KEY)
                                              │
                                              ▼
                                    [Gemini 2.5 Flash API]
```

---

## 2. Server Functions Registry (`src/lib/gemini-mentor.functions.ts`)

All Gemini API calls are executed securely on the server runtime via TanStack Start `createServerFn`. `GEMINI_API_KEY` is isolated from client JavaScript bundles.

| Server Function | Endpoint / Handler | Input Payload | Output Schema |
| --- | --- | --- | --- |
| `generateGeminiMentorship` | `POST` | `StudentPreferences`, `topProjects[5]` | Overall summary & per-project mentor insights |
| `analyzeStudentIdea` | `POST` | Title, description, branch, domain | Feasibility (0-100), difficulty, AI cost, AI duration, tech stack, hardware BOM, missing features, risks, improvements, architecture, roadmap |
| `generateProjectVivaQuestions` | `POST` | `Project` object | 10 category-specific Viva exam Q&As with suggested answers & key points |
| `chatWithProjectMentor` | `POST` | `Project` info, conversation history, user message | Conversational mentor response text |

---

## 3. Security & Key Isolation Rules

1. **Zero Client Leakage**: `GEMINI_API_KEY` is read strictly via `process.env["GEMINI_API_KEY"]` inside server functions. It is **never** assigned to `import.meta.env.VITE_*`.
2. **Payload Limitation**: `generateGeminiMentorship` accepts **ONLY** top 5 candidate projects pre-filtered by the Phase 3 Database Matching Engine. The full database is never dumped to AI.
3. **Structured JSON Validation**: Prompt pipelines enforce `response_mime_type: "application/json"`. Responses are validated prior to returning to the browser.
4. **Database Fact vs AI Advice Distinction**: UI badges explicitly distinguish database vector facts (`Database Fact / Algorithmic Score`) from AI recommendations (`Gemini AI Senior Mentor Guidance` / `AI Estimates`).
