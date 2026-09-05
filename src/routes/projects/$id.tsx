import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { getProjectById } from "@/lib/projects-data";
import { Project } from "@/types/project";
import { LoadingState } from "@/components/loading-state";
import { EmptyState } from "@/components/empty-state";
import { ActionButtons } from "@/components/projects/action-buttons";
import { AiMentorChat } from "@/components/projects/ai-mentor-chat";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  Clock,
  IndianRupee,
  Cpu,
  CheckCircle,
  TrendingUp,
  Layers,
  Wrench,
  GraduationCap,
  Sparkles,
  AlertCircle,
  CheckSquare,
  Brain,
  MessageSquare,
  Calendar,
  Award,
  ExternalLink,
  Users,
  Database,
} from "lucide-react";

export const Route = createFileRoute("/projects/$id")({
  head: ({ params }) => ({
    meta: [
      { title: `Project Blueprint ${params.id} — SOCHOYHAPE` },
      { name: "description", content: "Detailed engineering project blueprint, hardware requirements, development steps, AI Chat Mentor, and Viva Preparation." },
    ],
  }),
  component: ProjectDetailPage,
});

function ProjectDetailPage() {
  const { id } = Route.useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [showMentorChat, setShowMentorChat] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    getProjectById(id).then((res) => {
      if (isMounted) {
        setProject(res);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return <LoadingState label="Loading complete project blueprint specification..." />;
  }

  if (!project) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16">
        <EmptyState
          title="Project Blueprint Not Found"
          description={`No engineering project record matching ID "${id}" was found in the database.`}
          action={
            <Button variant="outline" asChild>
              <Link to="/projects">Return to Project Catalog</Link>
            </Button>
          }
        />
      </div>
    );
  }

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
      ? `${project.min_team_size}–${project.max_team_size || 4} Students`
      : "Not available");

  const yearDisplay = project.year ? String(project.year) : "Not available";
  const sourceDisplay = project.source || "Not available";
  const sourceUrlDisplay = project.source_url || null;
  const datasetSourceDisplay = project.dataset_source || "Supabase Projects Database";
  const qualityScoreDisplay =
    typeof project.quality_score === "number"
      ? `${project.quality_score}/10`
      : "Not available";

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 sm:py-16 space-y-10">
      {/* Back Link & Quick Tools */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-xs font-mono font-medium text-muted-foreground transition-colors hover:text-electric"
        >
          <ArrowLeft className="size-3.5" /> Back to Project Catalog
        </Link>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowMentorChat(!showMentorChat)}
            className="gap-1.5"
          >
            <MessageSquare className="size-3.5 text-electric" />
            <span>{showMentorChat ? "Hide Senior Mentor" : "Ask Senior Mentor"}</span>
          </Button>

          <Button variant="electric" size="sm" asChild className="gap-1.5">
            <Link to="/viva">
              <GraduationCap className="size-3.5" /> Viva Prep
            </Link>
          </Button>
        </div>
      </div>

      {/* Header Banner */}
      <div className="space-y-4 rounded-3xl border border-electric/30 bg-card p-6 sm:p-8 shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="electric" className="text-xs font-mono">
              {project.domain || "General Domain"}
            </Badge>
            <Badge variant="outline">{project.difficulty || "Intermediate"} Level</Badge>
            <Badge variant="outline" className="font-mono text-[10px] text-muted-foreground">
              <Database className="size-2.5 mr-1 text-electric" /> {datasetSourceDisplay}
            </Badge>
          </div>
          <ActionButtons projectId={project.id} projectTitle={project.title} size="default" />
        </div>

        <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
          {project.title}
        </h1>

        <p className="text-base text-muted-foreground leading-relaxed">
          {project.description || project.short_description || project.abstract || "Engineering capstone project specification."}
        </p>

        {/* Quick Specs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-border/60 pt-6">
          <div className="space-y-1">
            <span className="text-xs font-mono text-muted-foreground uppercase flex items-center gap-1">
              <IndianRupee className="size-3.5 text-electric" /> Estimated Cost
            </span>
            <div className="font-display text-lg font-bold text-foreground">
              {costDisplay}
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-mono text-muted-foreground uppercase flex items-center gap-1">
              <Clock className="size-3.5 text-electric" /> Duration
            </span>
            <div className="font-display text-lg font-bold text-foreground">
              {durationDisplay}
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-mono text-muted-foreground uppercase flex items-center gap-1">
              <Users className="size-3.5 text-electric" /> Ideal Team
            </span>
            <div className="font-display text-lg font-bold text-foreground">
              {teamSizeDisplay}
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-mono text-muted-foreground uppercase flex items-center gap-1">
              <Cpu className="size-3.5 text-electric" /> Hardware Req.
            </span>
            <div className="font-display text-lg font-bold text-foreground">
              {project.hardware && project.hardware.length > 0
                ? `${project.hardware.length} Modules`
                : "Pure Software / None"}
            </div>
          </div>
        </div>
      </div>

      {/* Dataset Metadata Strip */}
      <div className="rounded-2xl border border-border/70 bg-muted/20 p-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
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
            <span className="text-[11px] font-mono uppercase text-muted-foreground">Database Record ID</span>
            <div className="font-mono text-muted-foreground truncate">{project.id || "Not available"}</div>
          </div>
        </div>
      </div>

      {/* Embedded Conversational AI Mentor Chat Section */}
      {showMentorChat && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
            <Brain className="size-5 text-electric" /> Senior Engineering Mentor Chat
          </div>
          <AiMentorChat project={project} />
        </div>
      )}

      {/* Abstract / Problem Statement Section */}
      {(project.abstract || project.problem_statement) && (
        <Card className="border border-border/80 bg-muted/20">
          <CardContent className="p-6 space-y-2">
            <div className="flex items-center gap-2 font-display text-base font-bold text-foreground">
              <AlertCircle className="size-4 text-electric" /> Abstract &amp; Problem Statement
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {project.abstract || project.problem_statement}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Tech Stack & Required Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border border-border/80">
          <CardContent className="p-6 space-y-3">
            <div className="flex items-center gap-2 font-display text-base font-bold text-foreground">
              <Layers className="size-4 text-electric" /> Technologies &amp; Frameworks
            </div>
            <div className="flex flex-wrap gap-2">
              {project.technologies && project.technologies.length > 0 ? (
                project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg bg-electric/10 border border-electric/20 px-3 py-1 font-mono text-xs font-semibold text-electric"
                  >
                    {tech}
                  </span>
                ))
              ) : (
                <span className="text-xs text-muted-foreground">Not available</span>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border/80">
          <CardContent className="p-6 space-y-3">
            <div className="flex items-center gap-2 font-display text-base font-bold text-foreground">
              <Wrench className="size-4 text-electric" /> Required Prerequisites &amp; Skills
            </div>
            <div className="flex flex-wrap gap-2">
              {project.required_skills && project.required_skills.length > 0 ? (
                project.required_skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-border bg-background px-3 py-1 text-xs font-medium text-foreground"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-xs text-muted-foreground">Not available</span>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Hardware Bill of Materials & Software Required */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border border-border/80">
          <CardContent className="p-6 space-y-3">
            <div className="flex items-center gap-2 font-display text-base font-bold text-foreground">
              <Cpu className="size-4 text-electric" /> Hardware &amp; Components (BOM)
            </div>
            {project.hardware && project.hardware.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {project.hardware.map((hw) => (
                  <div key={hw} className="flex items-center gap-2 rounded-lg border border-border/60 bg-muted/30 p-2.5">
                    <CheckSquare className="size-3.5 text-electric shrink-0" />
                    <span className="font-mono text-foreground">{hw}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">None (Pure Software / Not available)</p>
            )}
          </CardContent>
        </Card>

        <Card className="border border-border/80">
          <CardContent className="p-6 space-y-3">
            <div className="flex items-center gap-2 font-display text-base font-bold text-foreground">
              <Layers className="size-4 text-electric" /> Software &amp; Dependencies
            </div>
            {project.software && project.software.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {project.software.map((sw) => (
                  <div key={sw} className="flex items-center gap-2 rounded-lg border border-border/60 bg-muted/30 p-2.5">
                    <CheckSquare className="size-3.5 text-electric shrink-0" />
                    <span className="font-mono text-foreground">{sw}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">Standard development tools &amp; IDEs</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Core vs Advanced Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {project.core_features && project.core_features.length > 0 && (
          <Card className="border border-border/80">
            <CardContent className="p-6 space-y-3">
              <div className="flex items-center gap-2 font-display text-base font-bold text-foreground">
                <CheckCircle className="size-4 text-success" /> Core Mandatory Features
              </div>
              <ul className="space-y-2 text-xs text-muted-foreground">
                {project.core_features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="font-mono font-bold text-electric">•</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {project.advanced_features && project.advanced_features.length > 0 && (
          <Card className="border border-border/80">
            <CardContent className="p-6 space-y-3">
              <div className="flex items-center gap-2 font-display text-base font-bold text-foreground">
                <Sparkles className="size-4 text-electric" /> Advanced Extension Features
              </div>
              <ul className="space-y-2 text-xs text-muted-foreground">
                {project.advanced_features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="font-mono font-bold text-electric">•</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Development Steps Roadmap */}
      {project.development_steps && project.development_steps.length > 0 && (
        <Card className="border border-border/80">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-2 font-display text-base font-bold text-foreground">
              <TrendingUp className="size-4 text-electric" /> Step-by-Step Execution Roadmap
            </div>
            <div className="space-y-3">
              {project.development_steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 rounded-xl border border-border/50 bg-background/50 p-3 text-xs">
                  <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-electric text-white font-mono font-bold text-xs">
                    {idx + 1}
                  </div>
                  <div className="pt-0.5 text-foreground leading-relaxed">{step}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Suitable Branches & AI Dataset Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {project.suitable_branches && project.suitable_branches.length > 0 && (
          <Card className="border border-border/80">
            <CardContent className="p-6 space-y-2">
              <div className="flex items-center gap-2 font-display text-sm font-bold text-foreground">
                <GraduationCap className="size-4 text-electric" /> Suitable Engineering Branches
              </div>
              <div className="flex flex-wrap gap-1.5">
                {project.suitable_branches.map((b) => (
                  <Badge key={b} variant="secondary" className="text-xs">
                    {b}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {project.dataset_ai_info && (
          <Card className="border border-electric/30 bg-electric/5">
            <CardContent className="p-6 space-y-2">
              <div className="flex items-center gap-2 font-display text-sm font-bold text-electric">
                <Sparkles className="size-4" /> Benchmark Dataset &amp; Telemetry Info
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {project.dataset_ai_info}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
