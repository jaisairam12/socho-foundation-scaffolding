export interface SavedProjectItem {
  id: string;
  projectId: string;
  savedAt: string;
  notes?: string;
}

export type RoadmapStage =
  | "Idea"
  | "Research"
  | "Design"
  | "Development"
  | "Testing"
  | "Deployment"
  | "Documentation"
  | "Viva";

export interface ProjectRoadmapProgress {
  projectId: string;
  currentStage: RoadmapStage;
  completedStages: RoadmapStage[];
  notes: Record<string, string>;
  lastUpdated: string;
}

export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string;
  language: string;
  stargazers_count: number;
  updated_at: string;
  topics?: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  skills: string[];
}

export interface TeamSkillAnalysis {
  teamName: string;
  members: TeamMember[];
  combinedSkills: string[];
  requiredProjectSkills: string[];
  missingSkills: string[];
  coveragePercentage: number;
  teamBalanceRating: "Optimal" | "Balanced" | "Skill Gap Identified";
}

export interface TradeOffAnalysisResponse {
  success: boolean;
  tradeOffSummary?: string;
  recommendationWinnerId?: string;
  keyComparisonPoints?: {
    projectId: string;
    pros: string[];
    cons: string[];
    bestSuitedFor: string;
  }[];
  error?: string;
}
