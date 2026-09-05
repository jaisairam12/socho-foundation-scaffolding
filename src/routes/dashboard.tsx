import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { REAL_PROJECTS_DATASET, getProjects } from "@/lib/projects-data";
import { Project } from "@/types/project";
import { ProjectCardReal } from "@/components/projects/project-card-real";
import { ProjectRoadmap } from "@/components/productivity/project-roadmap";
import { TeamSkillMatcher } from "@/components/productivity/team-skill-matcher";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  LayoutDashboard,
  Compass,
  Brain,
  GraduationCap,
  Scale,
  Github,
  Bookmark,
  Sparkles,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Student Dashboard — SOCHOYHAPE Platform" },
      { name: "description", content: "Main engineering student dashboard tracking active project roadmap, match scores, saved blueprints, GitHub resources, and AI activities." },
    ],
  }),
  component: StudentDashboardPage,
});

function StudentDashboardPage() {
  const [activeProject, setActiveProject] = useState<Project>(REAL_PROJECTS_DATASET[0]);
  const [recommended, setRecommended] = useState<Project[]>(REAL_PROJECTS_DATASET.slice(1, 4));
  const [savedProjects, setSavedProjects] = useState<Project[]>([REAL_PROJECTS_DATASET[1], REAL_PROJECTS_DATASET[2]]);

  useEffect(() => {
    getProjects({ pageSize: 6 }).then(({ data }) => {
      if (data && data.length > 0) {
        setActiveProject(data[0]);
        setRecommended(data.slice(1, 4));
      }
    });
  }, []);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16 space-y-10">
      {/* Welcome Banner */}
      <ScrollReveal className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 rounded-3xl border border-electric/30 bg-gradient-to-r from-electric/10 via-electric/5 to-transparent p-6 sm:p-8 shadow-soft">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-electric/30 bg-electric/10 px-3 py-0.5 text-xs font-mono text-electric">
            <LayoutDashboard className="size-3.5" /> Engineering Student Workspace
          </div>
          <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
            Welcome back, <span className="text-electric">Engineering Innovator!</span>
          </h1>
          <p className="max-w-xl text-sm text-muted-foreground leading-relaxed">
            Track your capstone progress, review AI mentor advice, check GitHub repositories, and manage your project team.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <Button variant="electric" size="sm" asChild className="gap-1.5">
            <Link to="/find-project">
              <Compass className="size-4" /> Match Engine
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild className="gap-1.5">
            <Link to="/analyze-idea">
              <Brain className="size-4 text-electric" /> Analyze Idea
            </Link>
          </Button>
        </div>
      </ScrollReveal>

      {/* Quick Action Dock */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 text-xs font-medium">
        <Link
          to="/find-project"
          className="flex items-center gap-2.5 rounded-2xl border border-border/80 bg-card p-4 hover:border-electric hover:shadow-soft transition-all"
        >
          <div className="flex size-8 items-center justify-center rounded-xl bg-electric/10 text-electric">
            <Compass className="size-4" />
          </div>
          <div>
            <div className="font-bold text-foreground">Match Engine</div>
            <div className="text-[10px] text-muted-foreground">Find blueprint</div>
          </div>
        </Link>

        <Link
          to="/analyze-idea"
          className="flex items-center gap-2.5 rounded-2xl border border-border/80 bg-card p-4 hover:border-electric hover:shadow-soft transition-all"
        >
          <div className="flex size-8 items-center justify-center rounded-xl bg-electric/10 text-electric">
            <Brain className="size-4" />
          </div>
          <div>
            <div className="font-bold text-foreground">Idea Analyzer</div>
            <div className="text-[10px] text-muted-foreground">Proposal check</div>
          </div>
        </Link>

        <Link
          to="/viva"
          className="flex items-center gap-2.5 rounded-2xl border border-border/80 bg-card p-4 hover:border-electric hover:shadow-soft transition-all"
        >
          <div className="flex size-8 items-center justify-center rounded-xl bg-electric/10 text-electric">
            <GraduationCap className="size-4" />
          </div>
          <div>
            <div className="font-bold text-foreground">Viva Prep</div>
            <div className="text-[10px] text-muted-foreground">10 Q&amp;A topics</div>
          </div>
        </Link>

        <Link
          to="/compare"
          className="flex items-center gap-2.5 rounded-2xl border border-border/80 bg-card p-4 hover:border-electric hover:shadow-soft transition-all"
        >
          <div className="flex size-8 items-center justify-center rounded-xl bg-electric/10 text-electric">
            <Scale className="size-4" />
          </div>
          <div>
            <div className="font-bold text-foreground">Compare</div>
            <div className="text-[10px] text-muted-foreground">Trade-offs</div>
          </div>
        </Link>

        <Link
          to="/github-finder"
          className="flex items-center gap-2.5 rounded-2xl border border-border/80 bg-card p-4 hover:border-electric hover:shadow-soft transition-all col-span-2 sm:col-span-1"
        >
          <div className="flex size-8 items-center justify-center rounded-xl bg-electric/10 text-electric">
            <Github className="size-4" />
          </div>
          <div>
            <div className="font-bold text-foreground">GitHub Finder</div>
            <div className="text-[10px] text-muted-foreground">Open-source code</div>
          </div>
        </Link>
      </div>

      {/* Main Active Project Banner */}
      {activeProject && (
        <Card className="border border-electric/40 bg-card p-6 sm:p-8 space-y-4 shadow-soft">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Badge variant="electric" className="font-mono text-xs">
                Active Capstone Target
              </Badge>
              <Badge variant="outline">{activeProject.domain}</Badge>
            </div>
            <Link
              to="/projects/$id"
              params={{ id: activeProject.id }}
              className="text-xs font-semibold text-electric hover:underline flex items-center gap-1"
            >
              View complete blueprint <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <div className="font-display text-2xl font-extrabold text-foreground">
            {activeProject.title}
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            {activeProject.short_description}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2 font-mono">
            <div className="rounded-xl bg-muted/30 p-2.5 border border-border/60">
              <span className="text-muted-foreground text-[10px]">Est. Cost</span>
              <div className="font-bold text-foreground">₹{activeProject.estimated_cost.toLocaleString("en-IN")}</div>
            </div>
            <div className="rounded-xl bg-muted/30 p-2.5 border border-border/60">
              <span className="text-muted-foreground text-[10px]">Duration</span>
              <div className="font-bold text-foreground">{activeProject.estimated_duration}</div>
            </div>
            <div className="rounded-xl bg-muted/30 p-2.5 border border-border/60">
              <span className="text-muted-foreground text-[10px]">Difficulty</span>
              <div className="font-bold text-foreground">{activeProject.difficulty}</div>
            </div>
            <div className="rounded-xl bg-muted/30 p-2.5 border border-border/60">
              <span className="text-muted-foreground text-[10px]">Match Score</span>
              <div className="font-bold text-electric">94% Fit</div>
            </div>
          </div>
        </Card>
      )}

      {/* Project Roadmap & Progress Tracker */}
      {activeProject && <ProjectRoadmap project={activeProject} />}

      {/* Team Skill Composition & Gap Analysis */}
      {activeProject && <TeamSkillMatcher project={activeProject} />}

      {/* Saved Projects Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-border/80 pb-3">
          <div className="flex items-center gap-2 font-display text-xl font-bold text-foreground">
            <Bookmark className="size-5 text-electric" /> Saved Bookmarked Blueprints
          </div>
          <Link to="/projects" className="text-xs font-semibold text-electric hover:underline">
            Browse Catalog →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savedProjects.map((p) => (
            <Card key={p.id} className="p-4 border border-border/80 bg-card flex flex-col justify-between gap-3">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Badge variant="electric" className="text-[10px] font-mono">
                    {p.domain}
                  </Badge>
                  <span className="text-[11px] font-mono text-muted-foreground">Est. ₹{p.estimated_cost.toLocaleString("en-IN")}</span>
                </div>
                <div className="font-display font-bold text-base text-foreground line-clamp-1">
                  <Link to="/projects/$id" params={{ id: p.id }} className="hover:text-electric">
                    {p.title}
                  </Link>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {p.short_description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border/50 text-xs">
                <Link to="/projects/$id" params={{ id: p.id }} className="font-semibold text-electric hover:underline">
                  Open specification →
                </Link>
                <span className="text-[10px] text-muted-foreground font-mono">Bookmarked</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Recommended Projects Grid */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between border-b border-border/80 pb-3">
          <div className="flex items-center gap-2 font-display text-xl font-bold text-foreground">
            <Sparkles className="size-5 text-electric" /> Recommended Engineering Blueprints
          </div>
          <Link to="/projects" className="text-xs font-semibold text-electric hover:underline">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommended.map((p) => (
            <ProjectCardReal key={p.id} project={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
