import { Link } from "@tanstack/react-router";
import {
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Database,
  Brain,
  AlertTriangle,
  ArrowUpRight,
  BookOpen,
  TrendingUp,
  Cpu,
  Layers,
  Wrench,
  Users,
  Calendar,
  ExternalLink,
  Award,
  IndianRupee,
  Clock,
  Code,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MatchScore } from "@/components/match-score";
import { RecommendationResult } from "@/types/project";
import { ProjectAiInsight } from "@/types/ai";
import { ActionButtons } from "./action-buttons";

interface RecommendationCardProps {
  result: RecommendationResult;
  rank: number;
  aiInsight?: ProjectAiInsight;
}

export function RecommendationCard({ result, rank, aiInsight }: RecommendationCardProps) {
  const {
    project,
    final_score,
    breakdown,
    matching_skills,
    matching_interests,
    budget_fit,
    time_fit,
    difficulty_fit,
    why_it_matches,
  } = result;

  const costDisplay =
    typeof project.estimated_cost === "number" && project.estimated_cost > 0
      ? `₹${project.estimated_cost.toLocaleString("en-IN")}`
      : typeof project.budget === "number" && project.budget > 0
      ? `₹${project.budget.toLocaleString("en-IN")}`
      : "Not available";

  const durationDisplay =
    project.estimated_duration || project.duration || "Not available";

  const teamSizeDisplay =
    project.team_size ||
    (project.min_team_size
      ? `${project.min_team_size}–${project.max_team_size || 4} members`
      : "Not available");

  const yearDisplay = project.year ? String(project.year) : "Not available";
  const sourceDisplay = project.source || "Not available";
  const sourceUrlDisplay = project.source_url || null;
  const datasetSourceDisplay = project.dataset_source || "Supabase Verified Projects";
  const qualityScoreDisplay =
    typeof project.quality_score === "number"
      ? `${project.quality_score}/10`
      : "Not available";

  return (
    <Card className="relative overflow-hidden border border-electric/30 bg-card shadow-soft transition-all duration-300 hover:border-electric">
      <div className="absolute top-0 right-0 rounded-bl-xl bg-electric/10 border-b border-l border-electric/30 px-3 py-1 text-xs font-mono font-bold text-electric">
        Rank #{rank} Match
      </div>

      {/* Card Header */}
      <CardHeader className="gap-4 p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex-1 space-y-2 pr-12">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="electric">{project.domain || "General Domain"}</Badge>
              <Badge variant="outline">{project.difficulty || "Intermediate"}</Badge>
              <Badge variant="secondary" className="font-mono text-xs">
                Est. {costDisplay}
              </Badge>
              <Badge variant="outline" className="font-mono text-[10px] text-muted-foreground">
                <Database className="size-2.5 mr-1 text-electric" /> {datasetSourceDisplay}
              </Badge>
            </div>

            <CardTitle className="font-display text-2xl font-bold tracking-tight text-foreground hover:text-electric">
              <Link to="/projects/$id" params={{ id: project.id }}>
                {project.title}
              </Link>
            </CardTitle>

            <p className="text-sm text-muted-foreground leading-relaxed">
              {project.short_description || project.description || project.abstract || "Detailed final year engineering project blueprint."}
            </p>
          </div>

          {/* Database Match Score Indicator */}
          <div className="flex shrink-0 items-center justify-center gap-3 rounded-2xl border border-border/80 bg-background/50 p-4">
            <MatchScore score={final_score} size="lg" />
            <div className="text-left">
              <div className="flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                <Database className="size-3 text-electric" /> Match Score
              </div>
              <div className="font-display text-xl font-extrabold text-electric">{final_score}% Match</div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 p-6 pt-0 border-t border-border/50">
        {/* Complete Dataset Specifications Grid */}
        <div className="rounded-xl border border-border/70 bg-muted/20 p-4 space-y-4">
          <div className="flex items-center justify-between border-b border-border/50 pb-2">
            <span className="font-display text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
              <Layers className="size-3.5 text-electric" /> Complete Dataset Blueprint Specifications
            </span>
            <span className="text-[10px] font-mono text-muted-foreground">
              ID: {project.id ? `${project.id.slice(0, 8)}...` : "Not available"}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 text-xs">
            <div className="space-y-0.5">
              <span className="text-[11px] font-mono uppercase text-muted-foreground flex items-center gap-1">
                <IndianRupee className="size-3 text-electric" /> Estimated Budget
              </span>
              <div className="font-bold text-foreground">{costDisplay}</div>
            </div>

            <div className="space-y-0.5">
              <span className="text-[11px] font-mono uppercase text-muted-foreground flex items-center gap-1">
                <Clock className="size-3 text-electric" /> Duration
              </span>
              <div className="font-bold text-foreground">{durationDisplay}</div>
            </div>

            <div className="space-y-0.5">
              <span className="text-[11px] font-mono uppercase text-muted-foreground flex items-center gap-1">
                <Users className="size-3 text-electric" /> Team Size
              </span>
              <div className="font-bold text-foreground">{teamSizeDisplay}</div>
            </div>

            <div className="space-y-0.5">
              <span className="text-[11px] font-mono uppercase text-muted-foreground flex items-center gap-1">
                <Calendar className="size-3 text-electric" /> Year / Release
              </span>
              <div className="font-bold text-foreground">{yearDisplay}</div>
            </div>

            <div className="space-y-0.5">
              <span className="text-[11px] font-mono uppercase text-muted-foreground flex items-center gap-1">
                <Award className="size-3 text-electric" /> Quality Score
              </span>
              <div className="font-bold text-foreground">{qualityScoreDisplay}</div>
            </div>

            <div className="space-y-0.5">
              <span className="text-[11px] font-mono uppercase text-muted-foreground">Source</span>
              <div className="font-bold text-foreground truncate">
                {sourceUrlDisplay ? (
                  <a
                    href={sourceUrlDisplay}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-electric hover:underline"
                  >
                    {sourceDisplay} <ExternalLink className="size-3" />
                  </a>
                ) : (
                  sourceDisplay
                )}
              </div>
            </div>

            <div className="space-y-0.5">
              <span className="text-[11px] font-mono uppercase text-muted-foreground">Difficulty</span>
              <div className="font-bold text-foreground">{project.difficulty || "Not available"}</div>
            </div>

            <div className="space-y-0.5">
              <span className="text-[11px] font-mono uppercase text-muted-foreground">Dataset Origin</span>
              <div className="font-bold text-foreground truncate">{datasetSourceDisplay}</div>
            </div>
          </div>

          {/* Abstract / Description if present */}
          {(project.abstract || project.description) && (
            <div className="space-y-1 border-t border-border/40 pt-3">
              <span className="text-[11px] font-mono uppercase text-muted-foreground">Abstract / Description</span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {project.abstract || project.description}
              </p>
            </div>
          )}

          {/* Tech Stack Chips */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-border/40 pt-3">
            <div className="space-y-1.5">
              <span className="text-[11px] font-mono uppercase text-muted-foreground flex items-center gap-1">
                <Code className="size-3 text-electric" /> Technologies
              </span>
              <div className="flex flex-wrap gap-1">
                {project.technologies && project.technologies.length > 0 ? (
                  project.technologies.map((t) => (
                    <span key={t} className="rounded-md bg-background px-2 py-0.5 text-[11px] font-mono border border-border/70 text-foreground">
                      {t}
                    </span>
                  ))
                ) : (
                  <span className="text-muted-foreground text-xs">Not available</span>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-[11px] font-mono uppercase text-muted-foreground flex items-center gap-1">
                <Wrench className="size-3 text-electric" /> Required Skills
              </span>
              <div className="flex flex-wrap gap-1">
                {project.required_skills && project.required_skills.length > 0 ? (
                  project.required_skills.map((s) => (
                    <span key={s} className="rounded-md bg-background px-2 py-0.5 text-[11px] font-mono border border-border/70 text-foreground">
                      {s}
                    </span>
                  ))
                ) : (
                  <span className="text-muted-foreground text-xs">Not available</span>
                )}
              </div>
            </div>
          </div>

          {/* Hardware & Software Requirements */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-border/40 pt-3">
            <div className="space-y-1.5">
              <span className="text-[11px] font-mono uppercase text-muted-foreground flex items-center gap-1">
                <Cpu className="size-3 text-electric" /> Hardware Required
              </span>
              <div className="flex flex-wrap gap-1">
                {project.hardware && project.hardware.length > 0 ? (
                  project.hardware.map((h) => (
                    <span key={h} className="rounded-md bg-electric/5 text-electric px-2 py-0.5 text-[11px] font-mono border border-electric/20">
                      {h}
                    </span>
                  ))
                ) : (
                  <span className="text-muted-foreground text-xs">None (Software Only / Not available)</span>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-[11px] font-mono uppercase text-muted-foreground flex items-center gap-1">
                <Layers className="size-3 text-electric" /> Software Required
              </span>
              <div className="flex flex-wrap gap-1">
                {project.software && project.software.length > 0 ? (
                  project.software.map((sw) => (
                    <span key={sw} className="rounded-md bg-background px-2 py-0.5 text-[11px] font-mono border border-border/70 text-foreground">
                      {sw}
                    </span>
                  ))
                ) : (
                  <span className="text-muted-foreground text-xs">Not available</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Why this matches you - Explainable Rationale */}
        <div className="rounded-xl bg-muted/30 p-4 border border-border/60 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-display text-xs font-bold text-foreground">
              <Database className="size-3.5 text-muted-foreground" /> Why This Project Matches You
            </div>
            <Badge variant="outline" className="text-[10px] font-mono">Factual Matching Rationale</Badge>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-muted-foreground">
            {why_it_matches.map((reason, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="size-3.5 text-success shrink-0 mt-0.5" />
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Gemini AI Personalized Senior Mentor Guidance */}
        {aiInsight ? (
          <div className="rounded-2xl bg-gradient-to-b from-electric/10 via-electric/5 to-transparent p-5 border border-electric/40 space-y-4 shadow-soft">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-electric/20 pb-3">
              <div className="flex items-center gap-2 font-display text-base font-bold text-electric">
                <Brain className="size-5 text-electric animate-pulse" /> Gemini AI Senior Mentor Guidance
              </div>
              <Badge variant="electric" className="gap-1 font-mono text-[11px]">
                <Sparkles className="size-3" /> Senior Mentor Persona
              </Badge>
            </div>

            <p className="text-xs text-foreground/90 font-medium leading-relaxed italic border-l-2 border-electric pl-3 py-1 bg-electric/5 rounded-r-lg">
              "{aiInsight.why_matches_student}"
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Skills Utilized vs Skills to Learn */}
              <div className="space-y-2 rounded-xl border border-border/60 bg-background/60 p-3">
                <div className="font-bold text-foreground flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5 text-success" /> Existing Skills You Utilize
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {aiInsight.existing_skills_utilized.length > 0 ? (
                    aiInsight.existing_skills_utilized.map((s) => (
                      <span key={s} className="rounded-md bg-success/10 text-success border border-success/20 px-2 py-0.5 text-[11px] font-medium">
                        {s}
                      </span>
                    ))
                  ) : (
                    <span className="text-muted-foreground text-[11px]">General engineering background</span>
                  )}
                </div>
              </div>

              <div className="space-y-2 rounded-xl border border-border/60 bg-background/60 p-3">
                <div className="font-bold text-foreground flex items-center gap-1.5">
                  <BookOpen className="size-3.5 text-electric" /> Skills You Will Learn
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {aiInsight.skills_to_learn.map((s) => (
                    <span key={s} className="rounded-md bg-electric/10 text-electric border border-electric/20 px-2 py-0.5 text-[11px] font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Suggested Improvements */}
              <div className="space-y-2 rounded-xl border border-border/60 bg-background/60 p-3">
                <div className="font-bold text-foreground flex items-center gap-1.5">
                  <TrendingUp className="size-3.5 text-electric" /> Senior Mentor Enhancements
                </div>
                <ul className="space-y-1 text-muted-foreground text-[11px]">
                  {aiInsight.suggested_improvements.map((imp, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <ArrowUpRight className="size-3 text-electric shrink-0 mt-0.5" />
                      <span>{imp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Potential Risks */}
              <div className="space-y-2 rounded-xl border border-border/60 bg-background/60 p-3">
                <div className="font-bold text-foreground flex items-center gap-1.5">
                  <AlertTriangle className="size-3.5 text-warning" /> Potential Execution Risks
                </div>
                <ul className="space-y-1 text-muted-foreground text-[11px]">
                  {aiInsight.potential_risks.map((risk, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="font-mono text-warning font-bold">•</span>
                      <span>{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Recommended First Steps */}
            <div className="rounded-xl border border-electric/30 bg-electric/5 p-3 space-y-1.5 text-xs">
              <div className="font-bold text-electric">Recommended Actionable First Steps:</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-foreground/90 text-[11px]">
                {aiInsight.recommended_first_steps.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-background/50 rounded-lg p-2 border border-border/40">
                    <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-electric text-white text-[10px] font-bold font-mono">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {/* Detailed Breakdown Gauges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="space-y-1.5 rounded-lg border border-border/60 p-3 bg-muted/20">
            <div className="flex justify-between font-medium">
              <span className="text-muted-foreground">Skills Match (30%)</span>
              <span className="font-mono font-bold text-foreground">{breakdown.skills_score}%</span>
            </div>
            <Progress value={breakdown.skills_score} className="h-1.5" />
            {matching_skills.length > 0 && (
              <div className="text-[11px] text-muted-foreground truncate pt-0.5">
                Matched: {matching_skills.join(", ")}
              </div>
            )}
          </div>

          <div className="space-y-1.5 rounded-lg border border-border/60 p-3 bg-muted/20">
            <div className="flex justify-between font-medium">
              <span className="text-muted-foreground">Domain Interest (25%)</span>
              <span className="font-mono font-bold text-foreground">{breakdown.interests_score}%</span>
            </div>
            <Progress value={breakdown.interests_score} className="h-1.5" />
            {matching_interests.length > 0 && (
              <div className="text-[11px] text-muted-foreground truncate pt-0.5">
                Matched: {matching_interests.join(", ")}
              </div>
            )}
          </div>

          <div className="space-y-1.5 rounded-lg border border-border/60 p-3 bg-muted/20">
            <div className="flex justify-between font-medium">
              <span className="text-muted-foreground">Budget Fit (15%)</span>
              <span className="font-mono font-bold text-foreground">{breakdown.budget_score}%</span>
            </div>
            <Progress value={breakdown.budget_score} className="h-1.5" />
            <div className="text-[11px] text-muted-foreground truncate pt-0.5">
              {budget_fit}
            </div>
          </div>

          <div className="space-y-1.5 rounded-lg border border-border/60 p-3 bg-muted/20">
            <div className="flex justify-between font-medium">
              <span className="text-muted-foreground">Duration Fit (15%)</span>
              <span className="font-mono font-bold text-foreground">{breakdown.time_score}%</span>
            </div>
            <Progress value={breakdown.time_score} className="h-1.5" />
            <div className="text-[11px] text-muted-foreground truncate pt-0.5">
              {time_fit}
            </div>
          </div>

          <div className="space-y-1.5 rounded-lg border border-border/60 p-3 bg-muted/20">
            <div className="flex justify-between font-medium">
              <span className="text-muted-foreground">Difficulty Fit (10%)</span>
              <span className="font-mono font-bold text-foreground">{breakdown.difficulty_score}%</span>
            </div>
            <Progress value={breakdown.difficulty_score} className="h-1.5" />
            <div className="text-[11px] text-muted-foreground truncate pt-0.5">
              {difficulty_fit}
            </div>
          </div>

          <div className="space-y-1.5 rounded-lg border border-border/60 p-3 bg-muted/20">
            <div className="flex justify-between font-medium">
              <span className="text-muted-foreground">Team Size Fit (5%)</span>
              <span className="font-mono font-bold text-foreground">{breakdown.team_score}%</span>
            </div>
            <Progress value={breakdown.team_score} className="h-1.5" />
            <div className="text-[11px] text-muted-foreground truncate pt-0.5">
              Suitable team: {teamSizeDisplay}
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-wrap items-center justify-between border-t border-border/80 bg-muted/30 p-4 px-6">
        <Link
          to="/projects/$id"
          params={{ id: project.id }}
          className="inline-flex items-center gap-1 text-sm font-semibold text-electric hover:underline"
        >
          Explore full project blueprint <ChevronRight className="size-4" />
        </Link>
        <ActionButtons projectId={project.id} projectTitle={project.title} size="sm" />
      </CardFooter>
    </Card>
  );
}
