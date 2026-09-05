import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { REAL_PROJECTS_DATASET, getProjects } from "@/lib/projects-data";
import { generateProjectVivaQuestions } from "@/lib/gemini-mentor.functions";
import { Project } from "@/types/project";
import { VivaQuestionItem } from "@/types/ai";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { LoadingState } from "@/components/loading-state";
import { toast } from "sonner";
import {
  GraduationCap,
  Sparkles,
  HelpCircle,
  BookOpen,
  CheckCircle,
  AlertCircle,
  Loader2,
  Brain,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export const Route = createFileRoute("/viva")({
  head: () => ({
    meta: [
      { title: "Viva Preparation — SOCHOYHAPE Examiner Simulator" },
      { name: "description", content: "Generate 10 category-specific viva exam questions, suggested answers, and key points for any engineering project blueprint." },
    ],
  }),
  component: VivaPreparationPage,
});

function VivaPreparationPage() {
  const [projectsList, setProjectsList] = useState<Project[]>(REAL_PROJECTS_DATASET);
  const [selectedProjectId, setSelectedProjectId] = useState<string>(REAL_PROJECTS_DATASET[0]?.id || "");
  const [selectedProject, setSelectedProject] = useState<Project | null>(REAL_PROJECTS_DATASET[0] || null);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<VivaQuestionItem[] | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>("All");

  useEffect(() => {
    getProjects({ pageSize: 20 }).then(({ data }) => {
      if (data && data.length > 0) {
        setProjectsList(data);
        if (!selectedProjectId) {
          setSelectedProjectId(data[0].id);
          setSelectedProject(data[0]);
        }
      }
    });
  }, []);

  const handleSelectProject = (id: string) => {
    setSelectedProjectId(id);
    const found = projectsList.find((p) => p.id === id);
    if (found) {
      setSelectedProject(found);
      setQuestions(null);
      setErrorMsg(null);
    }
  };

  const handleGenerateViva = async () => {
    if (!selectedProject) return;

    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await generateProjectVivaQuestions({
        data: { project: selectedProject },
      });

      if (res.success && res.questions) {
        setQuestions(res.questions);
        setExpandedId(res.questions[0]?.id || null);
        toast.success(`Generated 10 Viva Exam questions for ${selectedProject.title}`);
      } else {
        setErrorMsg(res.error || "Failed to generate Viva questions.");
        toast.warning(res.error || "GEMINI_API_KEY is missing on server.");
      }
    } catch (err: any) {
      console.error("Error generating viva questions:", err);
      setErrorMsg(`Server function execution error: ${err?.message || String(err)}`);
      toast.error("Network error requesting Viva questions.");
    } finally {
      setLoading(false);
    }
  };

  const categories = ["All", ...new Set(questions?.map((q) => q.category) || [])];
  const filteredQuestions =
    activeCategoryFilter === "All"
      ? questions
      : questions?.filter((q) => q.category === activeCategoryFilter);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 sm:py-16 space-y-10">
      <ScrollReveal className="space-y-3 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 rounded-full border border-electric/30 bg-electric/10 px-3.5 py-1 text-xs font-mono font-medium text-electric">
          <GraduationCap className="size-3.5" /> External Examiner Viva Simulator
        </div>
        <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
          Prepare for Your <span className="text-electric">Final Viva Examination.</span>
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground leading-relaxed">
          Select any engineering project blueprint to generate 10 category-specific viva questions, model technical answers, key points, and examiner trap warnings powered by Gemini AI.
        </p>
      </ScrollReveal>

      {/* Project Selector Card */}
      <div className="space-y-6 rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-soft">
        <div className="space-y-2">
          <Label className="text-xs font-mono font-medium uppercase text-muted-foreground">Select Project Blueprint for Viva Prep</Label>
          <Select value={selectedProjectId} onValueChange={handleSelectProject}>
            <SelectTrigger className="bg-background h-11 text-sm font-medium">
              <SelectValue placeholder="Choose a project" />
            </SelectTrigger>
            <SelectContent>
              {projectsList.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.title} ({p.domain})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedProject && (
          <div className="rounded-2xl border border-border/60 bg-muted/20 p-5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Badge variant="electric">{selectedProject.domain}</Badge>
                <Badge variant="outline">{selectedProject.difficulty}</Badge>
              </div>
              <span className="font-mono text-xs text-muted-foreground">
                Est. Cost: ₹{selectedProject.estimated_cost.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="font-display text-lg font-bold text-foreground">
              {selectedProject.title}
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {selectedProject.short_description}
            </p>
          </div>
        )}

        <div className="flex justify-end">
          <Button
            onClick={handleGenerateViva}
            size="lg"
            variant="electric"
            disabled={loading || !selectedProject}
            className="gap-2 px-8"
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Simulating Examiner Questions...
              </>
            ) : (
              <>
                <Sparkles className="size-4" /> Generate 10 Viva Exam Q&amp;As
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Error state if server key missing */}
      {errorMsg && (
        <div className="rounded-2xl border border-warning/40 bg-warning/5 p-6 space-y-3">
          <div className="flex items-center gap-2 font-bold text-warning">
            <AlertCircle className="size-5" /> Viva Simulator Status
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {errorMsg}
          </p>
        </div>
      )}

      {/* Viva Q&A Accordion Results */}
      {questions && (
        <div className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-border/80 pb-4 gap-2">
            <div>
              <div className="flex items-center gap-2 font-display text-2xl font-bold tracking-tight text-foreground">
                <Brain className="size-6 text-electric" /> Viva Exam Question Bank ({questions.length} Questions)
              </div>
              <div className="text-xs text-muted-foreground pt-1">
                Project: <span className="font-bold text-foreground">{selectedProject?.title}</span>
              </div>
            </div>
            <Badge variant="electric" className="w-fit font-mono text-xs gap-1">
              External Examiner Simulator
            </Badge>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 pt-1">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategoryFilter(cat)}
                className={`rounded-xl px-3 py-1.5 text-xs font-mono font-medium transition-all ${
                  activeCategoryFilter === cat
                    ? "bg-electric text-white shadow-soft"
                    : "bg-muted/60 border border-border text-foreground hover:border-electric/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Question List */}
          <div className="space-y-4 pt-2">
            {filteredQuestions?.map((q, idx) => {
              const isExpanded = expandedId === q.id;
              return (
                <Card
                  key={q.id}
                  className={`overflow-hidden border transition-all ${
                    isExpanded ? "border-electric/50 shadow-lift" : "border-border/80 hover:border-electric/30"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setExpandedId(isExpanded ? null : q.id)}
                    className="w-full text-left p-5 flex items-start justify-between gap-4 bg-card hover:bg-muted/10 transition-colors"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="electric" className="text-[10px] font-mono">
                          {q.category}
                        </Badge>
                        <Badge
                          variant={
                            q.difficulty === "Examiner Trap"
                              ? "destructive"
                              : q.difficulty === "Hard"
                              ? "warning"
                              : "secondary"
                          }
                          className="text-[10px]"
                        >
                          {q.difficulty}
                        </Badge>
                        <span className="font-mono text-xs text-muted-foreground">Q{idx + 1}</span>
                      </div>
                      <div className="font-display text-base font-bold text-foreground">
                        {q.question}
                      </div>
                    </div>

                    <div className="pt-1 shrink-0 text-muted-foreground">
                      {isExpanded ? <ChevronUp className="size-5 text-electric" /> : <ChevronDown className="size-5" />}
                    </div>
                  </button>

                  {isExpanded && (
                    <CardContent className="p-5 pt-0 space-y-4 border-t border-border/60 bg-muted/20">
                      {/* Model Answer */}
                      <div className="space-y-1.5 pt-4">
                        <div className="flex items-center gap-1.5 font-display text-xs font-bold text-electric">
                          <BookOpen className="size-4" /> Suggested Model Answer for Viva Board
                        </div>
                        <p className="text-xs text-foreground/90 leading-relaxed font-sans bg-background/80 p-3.5 rounded-xl border border-border/60">
                          {q.suggestedAnswer}
                        </p>
                      </div>

                      {/* Key Points */}
                      {q.keyPoints && q.keyPoints.length > 0 && (
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-1.5 font-display text-xs font-bold text-foreground">
                            <CheckCircle className="size-3.5 text-success" /> Key Technical Talking Points
                          </div>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground">
                            {q.keyPoints.map((kp, i) => (
                              <li key={i} className="flex items-start gap-2 bg-background/50 p-2 rounded-lg border border-border/40">
                                <span className="font-mono text-electric font-bold">•</span>
                                <span>{kp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
