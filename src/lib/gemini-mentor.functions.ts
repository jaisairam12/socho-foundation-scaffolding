import { createServerFn } from "@tanstack/react-start";
import { StudentPreferences, Project } from "@/types/project";
import {
  AiRecommendationResponse,
  ProjectAiInsight,
  IdeaAnalysisResponse,
  IdeaAnalysisResult,
  VivaResponsePayload,
  VivaQuestionItem,
  ChatResponsePayload,
} from "@/types/ai";
import { TradeOffAnalysisResponse } from "@/types/productivity";

// Helper to securely fetch server key
function getGeminiApiKey(): string {
  return (
    process.env["GEMINI_API_KEY"] ||
    process.env["VITE_GEMINI_API_KEY"] ||
    ""
  );
}

// Resilient priority fallback list of Google Gemini models
const CANDIDATE_MODELS = [
  "gemini-3.5-flash-lite",
  "gemini-3.5-flash",
  "gemini-3.6-flash",
  "gemini-3.7-flash",
  "gemini-flash-latest",
];

async function callGeminiApiWithFallback(
  apiKey: string,
  bodyPayload: any,
): Promise<{ success: true; text: string } | { success: false; error: string }> {
  let lastError = "Unable to connect to Google Gemini API.";

  for (const model of CANDIDATE_MODELS) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyPayload),
      });

      if (res.ok) {
        const json = await res.json();
        const rawText = json?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawText) {
          return { success: true, text: rawText };
        }
      }

      const errText = await res.text();
      lastError = `Google Gemini (${model}) Error (${res.status}): ${errText}`;

      // If transient high-demand (503), rate-limit (429), or deprecated (404), continue to next model in fallback list
      if (res.status === 503 || res.status === 429 || res.status === 404 || res.status === 500) {
        console.warn(`[Gemini Fallback] Model ${model} returned ${res.status}, trying next available model...`);
        continue;
      }

      // If invalid API key (400/401/403), stop and report authentication issue
      if (res.status === 401 || res.status === 403) {
        return { success: false, error: `Gemini Authentication Error (${res.status}): Please check your API key.` };
      }
    } catch (e: any) {
      lastError = e?.message || String(e);
      console.warn(`[Gemini Fallback] Request error on ${model}:`, e);
    }
  }

  return { success: false, error: lastError };
}

// ---------------------------------------------------------------------------
// 1. Recommendation Mentorship Server Function
// ---------------------------------------------------------------------------
interface AiRecommendationPayload {
  preferences: StudentPreferences;
  topProjects: Project[];
}

export const generateGeminiMentorship = createServerFn({ method: "POST" })
  .validator((data: AiRecommendationPayload) => data)
  .handler(async ({ data }): Promise<AiRecommendationResponse> => {
    const { preferences, topProjects } = data;
    const apiKey = getGeminiApiKey();

    if (!apiKey) {
      return {
        success: false,
        error: "GEMINI_API_KEY is not set in server environment. Set GEMINI_API_KEY in your .env file.",
      };
    }

    if (!topProjects || topProjects.length === 0) {
      return {
        success: false,
        error: "No top candidate projects were provided.",
      };
    }

    const candidateSummaries = topProjects.slice(0, 5).map((p) => ({
      id: p.id,
      title: p.title,
      domain: p.domain,
      difficulty: p.difficulty,
      estimated_cost: p.estimated_cost,
      estimated_duration: p.estimated_duration,
      technologies: p.technologies,
      required_skills: p.required_skills,
      short_description: p.short_description,
      problem_statement: p.problem_statement || p.short_description,
    }));

    const systemPrompt = `You are a professional engineering mentor and friendly senior advisor for university students.
Analyze the student profile and candidate projects.

STUDENT PROFILE:
- Branch: ${preferences.branch}
- Experience: ${preferences.experience_level}
- Skills: ${preferences.skills.join(", ") || "General fundamentals"}
- Interests: ${preferences.interests.join(", ") || "General engineering"}
- Budget: ₹${preferences.budget}
- Duration: ${preferences.available_time_weeks} weeks
- Team Size: ${preferences.team_size}
- Hardware: ${preferences.available_hardware.join(", ")}

PROJECTS:
${JSON.stringify(candidateSummaries, null, 2)}

Return strict JSON only matching this schema:
{
  "overall_mentor_summary": "Friendly 2-3 sentence overview from senior mentor.",
  "insights": {
    "<project_id>": {
      "why_matches_student": "Specific explanation of why this project fits this student.",
      "matching_strengths": ["Strength 1", "Strength 2"],
      "existing_skills_utilized": ["Skill 1", "Skill 2"],
      "skills_to_learn": ["New Skill A", "New Skill B"],
      "difficulty_explanation": "Realistic analysis of difficulty curve.",
      "suggested_improvements": ["Enhancement idea 1", "Idea 2"],
      "potential_risks": ["Potential bottleneck 1", "Risk 2"],
      "recommended_first_steps": ["First action step 1", "Step 2"]
    }
  }
}`;

    const apiCall = await callGeminiApiWithFallback(apiKey, {
      contents: [{ parts: [{ text: systemPrompt }] }],
      generationConfig: { response_mime_type: "application/json", temperature: 0.7 },
    });

    if (!apiCall.success) {
      return { success: false, error: apiCall.error };
    }

    try {
      const parsed = JSON.parse(apiCall.text) as {
        overall_mentor_summary?: string;
        insights?: Record<string, ProjectAiInsight>;
      };

      const validatedInsights: Record<string, ProjectAiInsight> = {};
      candidateSummaries.forEach((p) => {
        const item = parsed.insights?.[p.id];
        if (item) {
          validatedInsights[p.id] = {
            projectId: p.id,
            why_matches_student: item.why_matches_student || `Fits your ${preferences.branch} background.`,
            matching_strengths: Array.isArray(item.matching_strengths) ? item.matching_strengths : ["Good skill match"],
            existing_skills_utilized: Array.isArray(item.existing_skills_utilized) ? item.existing_skills_utilized : [],
            skills_to_learn: Array.isArray(item.skills_to_learn) ? item.skills_to_learn : [],
            difficulty_explanation: item.difficulty_explanation || `Suitable for ${preferences.experience_level} level.`,
            suggested_improvements: Array.isArray(item.suggested_improvements) ? item.suggested_improvements : [],
            potential_risks: Array.isArray(item.potential_risks) ? item.potential_risks : [],
            recommended_first_steps: Array.isArray(item.recommended_first_steps) ? item.recommended_first_steps : ["Review technical specifications"],
          };
        }
      });

      return {
        success: true,
        overall_mentor_summary: parsed.overall_mentor_summary || "Personalized mentorship guidance for your top projects.",
        insights: validatedInsights,
      };
    } catch (err: any) {
      return { success: false, error: `JSON Parse error on AI response: ${err?.message || String(err)}` };
    }
  });

// ---------------------------------------------------------------------------
// 2. Idea Analyzer Server Function
// ---------------------------------------------------------------------------
interface IdeaPayload {
  title: string;
  description: string;
  branch: string;
  domain: string;
}

export const analyzeStudentIdea = createServerFn({ method: "POST" })
  .validator((data: IdeaPayload) => data)
  .handler(async ({ data }): Promise<IdeaAnalysisResponse> => {
    const apiKey = getGeminiApiKey();

    if (!apiKey) {
      return {
        success: false,
        error: "GEMINI_API_KEY is not set in server environment. Set GEMINI_API_KEY to enable Idea Analyzer.",
      };
    }

    const prompt = `You are a professional engineering project reviewer and senior mentor.
Analyze the following student project proposal idea carefully.

PROPOSAL:
- Title: ${data.title}
- Description: ${data.description}
- Branch: ${data.branch}
- Target Domain: ${data.domain}

Provide an exhaustive, realistic engineering feasibility analysis in strict JSON format:
{
  "ideaTitle": "${data.title}",
  "feasibilityScore": 85,
  "difficulty": "Intermediate",
  "estimatedCost": "₹3,500 - ₹5,000",
  "estimatedDuration": "6 - 8 weeks",
  "requiredSkills": ["Skill 1", "Skill 2"],
  "technologies": ["Tech A", "Tech B"],
  "hardware": ["Hardware Component 1", "Component 2"],
  "missingFeatures": ["Missing core feature 1", "Missing feature 2"],
  "risks": ["Technical bottleneck 1", "Risk 2"],
  "improvements": ["Suggested enhancement 1", "Enhancement 2"],
  "suggestedArchitecture": "Brief technical architecture overview (e.g. Microservices / IoT Gateway / Mobile TFLite)",
  "developmentRoadmap": ["Phase 1: Component setup", "Phase 2: Core logic", "Phase 3: Integration", "Phase 4: Testing"]
}`;

    const apiCall = await callGeminiApiWithFallback(apiKey, {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { response_mime_type: "application/json", temperature: 0.7 },
    });

    if (!apiCall.success) {
      return { success: false, error: apiCall.error };
    }

    try {
      const parsed = JSON.parse(apiCall.text) as IdeaAnalysisResult;

      return {
        success: true,
        result: {
          ideaTitle: parsed.ideaTitle || data.title,
          feasibilityScore: typeof parsed.feasibilityScore === "number" ? parsed.feasibilityScore : 75,
          difficulty: parsed.difficulty || "Intermediate",
          estimatedCost: parsed.estimatedCost || "₹2,500 - ₹5,000 (AI Estimate)",
          estimatedDuration: parsed.estimatedDuration || "6 - 8 weeks (AI Estimate)",
          requiredSkills: Array.isArray(parsed.requiredSkills) ? parsed.requiredSkills : ["General Engineering"],
          technologies: Array.isArray(parsed.technologies) ? parsed.technologies : [],
          hardware: Array.isArray(parsed.hardware) ? parsed.hardware : [],
          missingFeatures: Array.isArray(parsed.missingFeatures) ? parsed.missingFeatures : [],
          risks: Array.isArray(parsed.risks) ? parsed.risks : [],
          improvements: Array.isArray(parsed.improvements) ? parsed.improvements : [],
          suggestedArchitecture: parsed.suggestedArchitecture || "Client-Server System Architecture",
          developmentRoadmap: Array.isArray(parsed.developmentRoadmap) ? parsed.developmentRoadmap : [],
        },
      };
    } catch (err: any) {
      return { success: false, error: `Idea Analysis parse error: ${err?.message || String(err)}` };
    }
  });

// ---------------------------------------------------------------------------
// 3. Viva Preparation Questions Generator Server Function
// ---------------------------------------------------------------------------
interface VivaPayload {
  project: Project;
}

export const generateProjectVivaQuestions = createServerFn({ method: "POST" })
  .validator((data: VivaPayload) => data)
  .handler(async ({ data }): Promise<VivaResponsePayload> => {
    const apiKey = getGeminiApiKey();

    if (!apiKey) {
      return {
        success: false,
        error: "GEMINI_API_KEY is missing in server environment. Set GEMINI_API_KEY to generate Viva questions.",
      };
    }

    const { project } = data;

    const prompt = `You are a senior university external examiner and engineering professor conducting a final year project Viva Voce examination.
Generate 10 realistic, challenging, and comprehensive Viva examination questions for this project blueprint.

PROJECT SPECIFICATION:
- Title: ${project.title}
- Domain: ${project.domain}
- Difficulty: ${project.difficulty}
- Tech Stack: ${project.technologies.join(", ")}
- Required Skills: ${project.required_skills.join(", ")}
- Hardware: ${project.hardware?.join(", ") || "Software Only"}
- Problem Statement: ${project.problem_statement || project.short_description}

Generate 10 questions covering these exact categories:
1. Basic
2. Technical
3. Architecture
4. Technologies
5. AI/ML or Algorithm
6. Dataset or Data Layer
7. Testing
8. Limitations
9. Future Scope
10. Difficult Examiner (Trap question)

Return strict JSON only matching this schema:
{
  "questions": [
    {
      "id": "viva-1",
      "category": "Basic",
      "difficulty": "Easy",
      "question": "Clear examiner question...",
      "suggestedAnswer": "Comprehensive, technical, model answer for student...",
      "keyPoints": ["Key point 1", "Key point 2", "Key point 3"]
    }
  ]
}`;

    const apiCall = await callGeminiApiWithFallback(apiKey, {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { response_mime_type: "application/json", temperature: 0.7 },
    });

    if (!apiCall.success) {
      return { success: false, error: apiCall.error };
    }

    try {
      const parsed = JSON.parse(apiCall.text) as { questions?: VivaQuestionItem[] };

      if (!parsed.questions || !Array.isArray(parsed.questions)) {
        return { success: false, error: "Invalid Viva questions response format." };
      }

      const validatedQuestions: VivaQuestionItem[] = parsed.questions.map((q, idx) => ({
        id: q.id || `viva-${idx + 1}`,
        category: q.category || "Technical",
        difficulty: q.difficulty || "Medium",
        question: q.question || "Explain the core architecture of your project.",
        suggestedAnswer: q.suggestedAnswer || "The system uses a modular component structure.",
        keyPoints: Array.isArray(q.keyPoints) ? q.keyPoints : ["Modularity", "Scalability"],
      }));

      return {
        success: true,
        projectTitle: project.title,
        questions: validatedQuestions,
      };
    } catch (err: any) {
      return { success: false, error: `Viva Generation parse error: ${err?.message || String(err)}` };
    }
  });

// ---------------------------------------------------------------------------
// 4. Conversational AI Mentor Chat Server Function
// ---------------------------------------------------------------------------
interface ChatPayload {
  projectTitle: string;
  projectDomain: string;
  projectTech: string[];
  history: { role: "user" | "assistant"; content: string }[];
  userMessage: string;
}

export const chatWithProjectMentor = createServerFn({ method: "POST" })
  .validator((data: ChatPayload) => data)
  .handler(async ({ data }): Promise<ChatResponsePayload> => {
    const apiKey = getGeminiApiKey();

    if (!apiKey) {
      return {
        success: false,
        error: "GEMINI_API_KEY is not set in server environment. Set GEMINI_API_KEY to chat with Senior Mentor.",
      };
    }

    const { projectTitle, projectDomain, projectTech, history, userMessage } = data;

    const systemInstruction = `You are a professional engineering mentor and friendly senior advisor for university engineering students working on capstone projects.
You are helping a student with their project: "${projectTitle}" (Domain: ${projectDomain}, Tech Stack: ${projectTech.join(", ")}).
Be encouraging, highly technical yet clear, actionable, and structured. 
Provide debugging advice, roadmap guidance, tech recommendations, or risk mitigation when asked.`;

    const contents = [
      { role: "user", parts: [{ text: `[SYSTEM CONTEXT: ${systemInstruction}]` }] },
      ...history.map((h) => ({
        role: h.role === "user" ? "user" : "model",
        parts: [{ text: h.content }],
      })),
      { role: "user", parts: [{ text: userMessage }] },
    ];

    const apiCall = await callGeminiApiWithFallback(apiKey, {
      contents,
      generationConfig: { temperature: 0.7 },
    });

    if (!apiCall.success) {
      return { success: false, error: apiCall.error };
    }

    return {
      success: true,
      reply: apiCall.text,
    };
  });

// ---------------------------------------------------------------------------
// 5. Project Trade-Off Explanation Server Function (Phase 6)
// ---------------------------------------------------------------------------
interface TradeOffPayload {
  projects: Project[];
}

export const explainProjectTradeOffs = createServerFn({ method: "POST" })
  .validator((data: TradeOffPayload) => data)
  .handler(async ({ data }): Promise<TradeOffAnalysisResponse> => {
    const apiKey = getGeminiApiKey();

    if (!apiKey) {
      return {
        success: false,
        error: "GEMINI_API_KEY is not set in server environment. Set GEMINI_API_KEY to enable AI Trade-off explanation.",
      };
    }

    const { projects } = data;
    if (!projects || projects.length < 2) {
      return {
        success: false,
        error: "Please select at least 2 projects to compare.",
      };
    }

    const summaries = projects.map((p) => ({
      id: p.id,
      title: p.title,
      domain: p.domain,
      difficulty: p.difficulty,
      cost: p.estimated_cost,
      duration: p.estimated_duration,
      technologies: p.technologies,
      skills: p.required_skills,
    }));

    const prompt = `You are a senior engineering project advisor.
Analyze the technical trade-offs between the following compared project choices based strictly on provided database attributes:

COMPARED PROJECTS:
${JSON.stringify(summaries, null, 2)}

Provide an objective engineering trade-off comparison in strict JSON format:
{
  "tradeOffSummary": "2-3 sentence executive comparison of engineering trade-offs.",
  "recommendationWinnerId": "${projects[0].id}",
  "keyComparisonPoints": [
    {
      "projectId": "<project_id>",
      "pros": ["Pro 1", "Pro 2"],
      "cons": ["Con 1", "Con 2"],
      "bestSuitedFor": "Students seeking..."
    }
  ]
}`;

    const apiCall = await callGeminiApiWithFallback(apiKey, {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { response_mime_type: "application/json", temperature: 0.7 },
    });

    if (!apiCall.success) {
      return { success: false, error: apiCall.error };
    }

    try {
      const parsed = JSON.parse(apiCall.text);

      return {
        success: true,
        tradeOffSummary: parsed.tradeOffSummary || "Technical trade-off analysis between selected projects.",
        recommendationWinnerId: parsed.recommendationWinnerId || projects[0].id,
        keyComparisonPoints: Array.isArray(parsed.keyComparisonPoints) ? parsed.keyComparisonPoints : [],
      };
    } catch (err: any) {
      return { success: false, error: `Trade-off analysis parse error: ${err?.message || String(err)}` };
    }
  });
