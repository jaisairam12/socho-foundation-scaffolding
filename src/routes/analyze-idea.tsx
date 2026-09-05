import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { analyzeStudentIdea } from "@/lib/gemini-mentor.functions";
import { IdeaAnalysisResult } from "@/types/ai";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import {
  Sparkles,
  Brain,
  CheckCircle,
  AlertTriangle,
  Loader2,
  Wrench,
  Layers,
  Cpu,
  TrendingUp,
  AlertCircle,
  ShieldCheck,
  RotateCcw,
  IndianRupee,
  Clock,
} from "lucide-react";

export const Route = createFileRoute("/analyze-idea")({
  head: () => ({
    meta: [
      { title: "Idea Analyzer — SOCHOYHAPE AI Feasibility Tool" },
      { name: "description", content: "Submit your engineering project proposal for real-time Gemini AI feasibility analysis, risk assessment, and technical roadmap generation." },
    ],
  }),
  component: AnalyzeIdeaPage,
});

const BRANCHES = [
  "Computer Science",
  "Information Technology",
  "Electronics & Communication",
  "Electrical Engineering",
  "Robotics & Automation",
  "Biomedical Engineering",
  "AI & Data Science",
  "Civil & Environmental",
];

const DOMAINS = [
  "AI & Machine Learning",
  "Robotics & Hardware",
  "IoT & Embedded Systems",
  "Cybersecurity & Cloud",
  "Blockchain & Web3",
  "Biomedical & AI",
  "Web Development",
];

function AnalyzeIdeaPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [branch, setBranch] = useState("Computer Science");
  const [domain, setDomain] = useState("AI & Machine Learning");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<IdeaAnalysisResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      toast.error("Please provide both a project title and description.");
      return;
    }

    setLoading(true);
    setErrorMsg(null);
    setAnalysis(null);

    try {
      const res = await analyzeStudentIdea({
        data: { title: title.trim(), description: description.trim(), branch, domain },
      });

      if (res.success && res.result) {
        setAnalysis(res.result);
        toast.success("AI Feasibility Analysis complete!");
      } else {
        setErrorMsg(res.error || "Failed to analyze idea.");
        toast.warning(res.error || "GEMINI_API_KEY is not configured on server.");
      }
    } catch (err: any) {
      console.error("Error invoking analyzeStudentIdea:", err);
      setErrorMsg(`Server function invocation error: ${err?.message || String(err)}`);
      toast.error("Network error analyzing idea.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setTitle("");
    setDescription("");
    setAnalysis(null);
    setErrorMsg(null);
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 sm:py-16 space-y-10">
      <ScrollReveal className="space-y-3 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 rounded-full border border-electric/30 bg-electric/10 px-3.5 py-1 text-xs font-mono font-medium text-electric">
          <Brain className="size-3.5" /> Gemini AI Idea Feasibility Analyzer
        </div>
        <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
          Validate Your Original <span className="text-electric">Project Idea.</span>
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground leading-relaxed">
          Enter your custom engineering proposal. Our server-side Gemini AI model evaluates feasibility, flags technical risks, identifies missing features, and generates an execution roadmap.
        </p>
      </ScrollReveal>

      {/* Idea Input Form */}
      <form onSubmit={handleAnalyze} className="space-y-6 rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-soft">
        <div className="flex items-center justify-between border-b border-border/60 pb-4">
          <div className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
            <Sparkles className="size-5 text-electric" /> Project Proposal Form
          </div>
          {(title || description || analysis) && (
            <Button type="button" variant="ghost" size="sm" onClick={handleReset} className="gap-1.5 text-xs">
              <RotateCcw className="size-3.5" /> Reset Form
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-xs font-mono font-medium uppercase text-muted-foreground">Engineering Branch</Label>
            <Select value={branch} onValueChange={setBranch}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select branch" />
              </SelectTrigger>
              <SelectContent>
                {BRANCHES.map((b) => (
                  <SelectItem key={b} value={b}>
                    {b}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-mono font-medium uppercase text-muted-foreground">Target Domain</Label>
            <Select value={domain} onValueChange={setDomain}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select domain" />
              </SelectTrigger>
              <SelectContent>
                {DOMAINS.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-mono font-medium uppercase text-muted-foreground">Project Title</Label>
          <Input
            type="text"
            placeholder="e.g., Automated IoT Hydroponic Nutrient Dosing System using ESP32"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-background"
            required
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-mono font-medium uppercase text-muted-foreground">Detailed Description &amp; Problem Statement</Label>
          <Textarea
            placeholder="Describe what your project does, what problem it solves, what hardware or software stack you plan to use..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className="bg-background leading-relaxed text-xs"
            required
          />
        </div>

        <div className="flex justify-end pt-2">
          <Button type="submit" size="lg" variant="electric" disabled={loading || !title.trim() || !description.trim()} className="gap-2 px-8">
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Analyzing Proposal with Gemini AI...
              </>
            ) : (
              <>
                <Sparkles className="size-4" /> Run AI Feasibility Analysis
              </>
            )}
          </Button>
        </div>
      </form>

      {/* Error state if server key is missing */}
      {errorMsg && (
        <div className="rounded-2xl border border-warning/40 bg-warning/5 p-6 space-y-3">
          <div className="flex items-center gap-2 font-bold text-warning">
            <AlertCircle className="size-5" /> Idea Analysis Status
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {errorMsg}
          </p>
        </div>
      )}

      {/* Analysis Results Display */}
      {analysis && (
        <div className="space-y-8 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-border/80 pb-4 gap-2">
            <div>
              <div className="flex items-center gap-2 font-display text-2xl font-bold tracking-tight text-foreground">
                <Brain className="size-6 text-electric" /> AI Proposal Feasibility Report
              </div>
              <div className="text-xs text-muted-foreground pt-1">
                Project: <span className="font-bold text-foreground">{analysis.ideaTitle}</span>
              </div>
            </div>
            <Badge variant="electric" className="w-fit font-mono text-xs gap-1">
              <Sparkles className="size-3" /> Gemini AI Model Analysis
            </Badge>
          </div>

          {/* Top Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Feasibility Score */}
            <Card className="border border-electric/30 bg-card p-5 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-muted-foreground uppercase">
                <span>Feasibility Score</span>
                <ShieldCheck className="size-4 text-electric" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-4xl font-extrabold text-electric">
                  {analysis.feasibilityScore}%
                </span>
                <span className="text-xs text-muted-foreground">Viability</span>
              </div>
              <Progress value={analysis.feasibilityScore} className="h-2" />
            </Card>

            {/* AI Cost Estimate */}
            <Card className="border border-border/80 bg-card p-5 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-muted-foreground uppercase">
                <span>Est. Cost (AI Estimate)</span>
                <IndianRupee className="size-4 text-electric" />
              </div>
              <div className="font-display text-2xl font-bold text-foreground">
                {analysis.estimatedCost}
              </div>
              <Badge variant="outline" className="text-[10px] font-mono">
                AI Projections
              </Badge>
            </Card>

            {/* AI Duration Estimate */}
            <Card className="border border-border/80 bg-card p-5 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-muted-foreground uppercase">
                <span>Est. Duration (AI Estimate)</span>
                <Clock className="size-4 text-electric" />
              </div>
              <div className="font-display text-2xl font-bold text-foreground">
                {analysis.estimatedDuration}
              </div>
              <Badge variant="outline" className="text-[10px] font-mono">
                {analysis.difficulty} Difficulty
              </Badge>
            </Card>
          </div>

          {/* Architecture Overview */}
          <Card className="border border-electric/30 bg-electric/5 p-6 space-y-2">
            <div className="flex items-center gap-2 font-display text-base font-bold text-electric">
              <Layers className="size-4" /> Recommended System Architecture
            </div>
            <p className="text-xs text-foreground/90 leading-relaxed font-mono">
              {analysis.suggestedArchitecture}
            </p>
          </Card>

          {/* Tech Stack & Required Skills */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border border-border/80 p-6 space-y-3">
              <div className="flex items-center gap-2 font-display text-sm font-bold text-foreground">
                <Layers className="size-4 text-electric" /> Recommended Tech Stack
              </div>
              <div className="flex flex-wrap gap-2">
                {analysis.technologies.map((tech) => (
                  <span key={tech} className="rounded-lg bg-electric/10 border border-electric/20 px-3 py-1 font-mono text-xs text-electric">
                    {tech}
                  </span>
                ))}
              </div>
            </Card>

            <Card className="border border-border/80 p-6 space-y-3">
              <div className="flex items-center gap-2 font-display text-sm font-bold text-foreground">
                <Wrench className="size-4 text-electric" /> Required Prerequisite Skills
              </div>
              <div className="flex flex-wrap gap-2">
                {analysis.requiredSkills.map((s) => (
                  <span key={s} className="rounded-lg border border-border bg-background px-3 py-1 text-xs text-foreground">
                    {s}
                  </span>
                ))}
              </div>
            </Card>
          </div>

          {/* Hardware BOM if applicable */}
          {analysis.hardware && analysis.hardware.length > 0 && (
            <Card className="border border-border/80 p-6 space-y-3">
              <div className="flex items-center gap-2 font-display text-sm font-bold text-foreground">
                <Cpu className="size-4 text-electric" /> Recommended Hardware / Modules
              </div>
              <div className="flex flex-wrap gap-2">
                {analysis.hardware.map((hw) => (
                  <span key={hw} className="rounded-lg border border-border/60 bg-muted/30 px-3 py-1 font-mono text-xs text-foreground">
                    {hw}
                  </span>
                ))}
              </div>
            </Card>
          )}

          {/* Missing Features & Risks & Improvements */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <Card className="border border-warning/30 bg-warning/5 p-5 space-y-2">
              <div className="font-bold text-warning flex items-center gap-1.5">
                <AlertTriangle className="size-4" /> Identified Technical Risks
              </div>
              <ul className="space-y-1 text-muted-foreground">
                {analysis.risks.map((r, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="font-mono text-warning font-bold">•</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="border border-border/80 p-5 space-y-2">
              <div className="font-bold text-foreground flex items-center gap-1.5">
                <AlertCircle className="size-4 text-electric" /> Missing Core Features
              </div>
              <ul className="space-y-1 text-muted-foreground">
                {analysis.missingFeatures.map((mf, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="font-mono text-electric font-bold">•</span>
                    <span>{mf}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="border border-success/30 bg-success/5 p-5 space-y-2">
              <div className="font-bold text-success flex items-center gap-1.5">
                <CheckCircle className="size-4" /> Mentor Enhancements
              </div>
              <ul className="space-y-1 text-muted-foreground">
                {analysis.improvements.map((imp, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="font-mono text-success font-bold">•</span>
                    <span>{imp}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Development Roadmap */}
          {analysis.developmentRoadmap && analysis.developmentRoadmap.length > 0 && (
            <Card className="border border-border/80 p-6 space-y-4">
              <div className="flex items-center gap-2 font-display text-base font-bold text-foreground">
                <TrendingUp className="size-5 text-electric" /> Suggested Development Roadmap
              </div>
              <div className="space-y-3">
                {analysis.developmentRoadmap.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 rounded-xl border border-border/50 bg-background/50 p-3.5 text-xs">
                    <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-electric text-white font-mono font-bold text-xs">
                      {idx + 1}
                    </div>
                    <div className="pt-0.5 text-foreground leading-relaxed">{step}</div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
