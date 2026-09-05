export interface Project {
  id: string;
  project_id?: string;
  title: string;
  domain: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | string;
  estimated_cost: number; // in INR
  budget?: number; // alias
  estimated_duration: string; // e.g. "4 weeks", "8 weeks", "12 weeks"
  duration?: string; // alias
  estimated_duration_weeks?: number;
  technologies: string[];
  required_skills: string[];
  skills?: string[]; // alias
  short_description: string;
  description?: string;
  abstract?: string;
  problem_statement?: string;
  hardware?: string[];
  software?: string[];
  core_features?: string[];
  advanced_features?: string[];
  development_steps?: string[];
  future_improvements?: string[];
  suitable_branches?: string[];
  team_size?: number | string;
  min_team_size?: number;
  max_team_size?: number;
  year?: number | string;
  source?: string;
  source_url?: string;
  quality_score?: number;
  dataset_source?: string;
  dataset_ai_info?: string;
  created_at?: string;
}

export interface StudentPreferences {
  branch: string;
  skills: string[];
  interests: string[];
  experience_level: "Beginner" | "Intermediate" | "Advanced";
  budget: number; // Max budget in INR
  available_time_weeks: number;
  team_size: number;
  available_hardware: string[];
}

export interface RecommendationResult {
  project: Project;
  final_score: number; // 0 - 100
  breakdown: {
    skills_score: number; // 0 - 100
    interests_score: number; // 0 - 100
    budget_score: number; // 0 - 100
    time_score: number; // 0 - 100
    difficulty_score: number; // 0 - 100
    team_score: number; // 0 - 100
  };
  matching_skills: string[];
  matching_interests: string[];
  budget_fit: string;
  time_fit: string;
  difficulty_fit: string;
  why_it_matches: string[];
}

export interface ProjectFilterParams {
  search?: string | undefined;
  domain?: string | undefined;
  difficulty?: string | undefined;
  maxBudget?: number | undefined;
  maxDurationWeeks?: number | undefined;
  technology?: string | undefined;
  skill?: string | undefined;
  branch?: string | undefined;
  page?: number | undefined;
  pageSize?: number | undefined;
}
