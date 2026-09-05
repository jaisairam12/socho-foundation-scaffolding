import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Compass,
  Layers,
  Sparkles,
  Brain,
  GraduationCap,
  Scale,
  Github,
  LayoutDashboard,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SOCHOYHAPE — Stop Searching. Start Finding It Here." },
      { name: "description", content: "SochoYhaPe helps engineering students find, analyze, and successfully build the right final-year project." },
      { property: "og:title", content: "SOCHOYHAPE — Stop Searching. Start Finding It Here." },
      { property: "og:description", content: "SochoYhaPe helps engineering students find, analyze, and successfully build the right final-year project." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative mx-auto flex w-full max-w-6xl flex-col items-start gap-8 px-4 py-20 sm:px-6 sm:py-28">
        <div aria-hidden="true" className="circuit-grid pointer-events-none absolute inset-0 -z-10" />
        <ScrollReveal className="flex flex-col items-start gap-6">
          <Badge variant="electric" className="gap-1.5 px-3.5 py-1 font-mono text-xs">
            <Sparkles className="size-3.5" /> Engineering Capstone &amp; Project Intelligence Platform
          </Badge>
          <h1 className="max-w-4xl font-display text-5xl font-extrabold leading-[1.05] sm:text-6xl text-foreground">
            Stop Searching. <span className="text-electric">Start Finding It Here.</span>
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
            SochoYhaPe helps engineering students find, analyze, and successfully build the right final-year project with verified database blueprints, deterministic matching, and Gemini AI senior mentorship.
          </p>
          <div className="flex flex-wrap gap-3.5 pt-2">
            <Button size="lg" variant="electric" asChild className="gap-2 px-7">
              <Link to="/find-project">
                <Compass className="size-4" /> Match My Project <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="gap-2 px-6">
              <Link to="/projects">
                <Layers className="size-4" /> Browse Project Catalog
              </Link>
            </Button>
          </div>
        </ScrollReveal>
      </section>

      {/* Feature Showcase Grid */}
      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 space-y-10">
        <div className="text-center space-y-2">
          <Badge variant="outline" className="font-mono text-xs">Full Platform Suite</Badge>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
            Everything You Need for Your <span className="text-electric">Final-Year Capstone.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Project Discovery & Matching */}
          <Card className="border border-border/80 bg-card p-6 space-y-4 shadow-soft hover:border-electric transition-all">
            <div className="flex size-10 items-center justify-center rounded-2xl bg-electric/10 text-electric">
              <Compass className="size-5" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-display text-lg font-bold text-foreground">Deterministic Match Engine</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Calculates weighted scores (Skills 30%, Domain 25%, Budget 15%, Time 15%, Difficulty 10%, Team 5%) across verified project blueprints.
              </p>
            </div>
            <Link to="/find-project" className="inline-flex items-center gap-1 text-xs font-semibold text-electric hover:underline">
              Launch Match Engine →
            </Link>
          </Card>

          {/* Card 2: Gemini AI Mentor */}
          <Card className="border border-border/80 bg-card p-6 space-y-4 shadow-soft hover:border-electric transition-all">
            <div className="flex size-10 items-center justify-center rounded-2xl bg-electric/10 text-electric">
              <Brain className="size-5" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-display text-lg font-bold text-foreground">Gemini AI Senior Mentor</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Server-side AI mentor providing personalized guidance, skills to learn, difficulty explanations, execution risks, and first steps.
              </p>
            </div>
            <Link to="/projects" className="inline-flex items-center gap-1 text-xs font-semibold text-electric hover:underline">
              Consult AI Mentor →
            </Link>
          </Card>

          {/* Card 3: Idea Analyzer */}
          <Card className="border border-border/80 bg-card p-6 space-y-4 shadow-soft hover:border-electric transition-all">
            <div className="flex size-10 items-center justify-center rounded-2xl bg-electric/10 text-electric">
              <Sparkles className="size-5" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-display text-lg font-bold text-foreground">AI Proposal Feasibility Analyzer</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Submit custom project proposals to evaluate viability score (0–100%), AI cost/duration projections, hardware BOM, and roadmap.
              </p>
            </div>
            <Link to="/analyze-idea" className="inline-flex items-center gap-1 text-xs font-semibold text-electric hover:underline">
              Analyze Proposal →
            </Link>
          </Card>

          {/* Card 4: Viva Preparation */}
          <Card className="border border-border/80 bg-card p-6 space-y-4 shadow-soft hover:border-electric transition-all">
            <div className="flex size-10 items-center justify-center rounded-2xl bg-electric/10 text-electric">
              <GraduationCap className="size-5" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-display text-lg font-bold text-foreground">Viva Voce Examiner Simulator</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Generate 10 category-specific exam questions, model technical answers, key points, and examiner trap warnings for any project.
              </p>
            </div>
            <Link to="/viva" className="inline-flex items-center gap-1 text-xs font-semibold text-electric hover:underline">
              Start Viva Prep →
            </Link>
          </Card>

          {/* Card 5: Project Comparison */}
          <Card className="border border-border/80 bg-card p-6 space-y-4 shadow-soft hover:border-electric transition-all">
            <div className="flex size-10 items-center justify-center rounded-2xl bg-electric/10 text-electric">
              <Scale className="size-5" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-display text-lg font-bold text-foreground">Side-by-Side Trade-off Matrix</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Compare 2–3 projects across cost, duration, skills, tech stack, and hardware BOM with AI trade-off analysis.
              </p>
            </div>
            <Link to="/compare" className="inline-flex items-center gap-1 text-xs font-semibold text-electric hover:underline">
              Compare Projects →
            </Link>
          </Card>

          {/* Card 6: Student Dashboard & Roadmap */}
          <Card className="border border-border/80 bg-card p-6 space-y-4 shadow-soft hover:border-electric transition-all">
            <div className="flex size-10 items-center justify-center rounded-2xl bg-electric/10 text-electric">
              <LayoutDashboard className="size-5" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-display text-lg font-bold text-foreground">Dashboard &amp; 8-Stage Roadmap</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Manage your active capstone through 8 stages (Idea to Viva), track team skill coverage, and access saved bookmarks.
              </p>
            </div>
            <Link to="/dashboard" className="inline-flex items-center gap-1 text-xs font-semibold text-electric hover:underline">
              Open Dashboard →
            </Link>
          </Card>
        </div>
      </section>

      {/* Trust & Verification Banner */}
      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="rounded-3xl border border-electric/30 bg-electric/5 p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-display text-xl font-bold text-foreground">
              <ShieldCheck className="size-5 text-electric" /> Strict Non-Hallucination Engineering Guarantee
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-2xl">
              Database facts (cost, duration, tech requirements) come strictly from verified project blueprints. Gemini AI acts as a senior engineering mentor providing advice without inventing database facts.
            </p>
          </div>
          <Button variant="electric" size="lg" asChild className="gap-2 shrink-0">
            <Link to="/find-project">Get Started Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
