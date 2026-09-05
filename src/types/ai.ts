export interface ProjectAiInsight {
  projectId: string;
  why_matches_student: string;
  matching_strengths: string[];
  existing_skills_utilized: string[];
  skills_to_learn: string[];
  difficulty_explanation: string;
  suggested_improvements: string[];
  potential_risks: string[];
  recommended_first_steps: string[];
}

export interface AiRecommendationResponse {
  success: boolean;
  overall_mentor_summary?: string;
  insights?: Record<string, ProjectAiInsight>;
  error?: string;
  isMockFallback?: boolean;
}

export interface IdeaAnalysisResult {
  ideaTitle: string;
  feasibilityScore: number; // 0-100
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedCost: string; // e.g. "₹2,500 - ₹4,000"
  estimatedDuration: string; // e.g. "6 - 8 weeks"
  requiredSkills: string[];
  technologies: string[];
  hardware: string[];
  missingFeatures: string[];
  risks: string[];
  improvements: string[];
  suggestedArchitecture: string;
  developmentRoadmap: string[];
}

export interface IdeaAnalysisResponse {
  success: boolean;
  result?: IdeaAnalysisResult;
  error?: string;
}

export interface VivaQuestionItem {
  id: string;
  category:
    | "Basic"
    | "Technical"
    | "Architecture"
    | "Technologies"
    | "AI/ML"
    | "Dataset"
    | "Testing"
    | "Limitations"
    | "Future Scope"
    | "Difficult Examiner";
  difficulty: "Easy" | "Medium" | "Hard" | "Examiner Trap";
  question: string;
  suggestedAnswer: string;
  keyPoints: string[];
}

export interface VivaResponsePayload {
  success: boolean;
  projectTitle?: string;
  questions?: VivaQuestionItem[];
  error?: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "mentor";
  text: string;
  timestamp: string;
}

export interface ChatResponsePayload {
  success: boolean;
  reply?: string;
  error?: string;
}
