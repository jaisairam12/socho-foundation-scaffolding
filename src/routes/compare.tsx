import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { REAL_PROJECTS_DATASET, getProjects } from "@/lib/projects-data";
import { explainProjectTradeOffs } from "@/lib/gemini-mentor.functions";
import { Project } from "@/types/project";
import { TradeOffAnalysisResponse } from "@/types/productivity";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButtons } from "@/components/projects/action-buttons";
import { toast } from "sonner";
import {
  Scale,
  Sparkles,
  IndianRupee,
  Clock,
  Wrench,
  Layers,
  Cpu,
  GraduationCap,
  Brain,
  Loader2,
  CheckCircle,
  AlertCircle,
  Plus,
  Trash2,
} from "lucide-react";

export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: [
      { title: "Project Comparison & Trade-off Matrix — SOCHOYHAPE" },
      { name: "description", content: "Compare 2-3 engineering projects side by side across difficulty, cost, skills, hardware, and Gemini AI trade-off analysis." },
    ],
  }),
  component: ProjectComparePage,
});

function ProjectComparePage() {
  const [allProjects, setAllProjects] = useState<Project[]>(REAL_PROJECTS_DATASET);
  const [selectedIds, setSelectedIds] = useState<string[]>([
    REAL_PROJECTS_DATASET[0]?.id || "",
    REAL_PROJECTS_DATASET[1]?.id || "",
  ]);

  const [aiTradeOffs, setAiTradeOffs] = useState<TradeOffAnalysisResponse | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  useEffect(() => {
    getProjects({ pageSize: 20 }).then(({ data }) => {
      if (data && data.length > 0) {
        setAllProjects(data);
      }
    });
  }, []);

  const selectedProjects = selectedIds
    .map((id) => allProjects.find((p) => p.id === id))
    .filter((p): p is Project => Boolean(p));

  const handleSelectSlot = (index: number, newId: string) => {
    const updated = [...selectedIds];
    updated[index] = newId;
    setSelectedIds(updated);
    setAiTradeOffs(null);
  };

  const handleAddSlot = () => {
    if (selectedIds.length >= 3) {
      toast.info("Maximum 3 projects can be compared side-by-side.");
      return;
    }
    const unused = allProjects.find((p) => !selectedIds.includes(p.id));
    if (unused) {
      setSelectedIds([...selectedIds, unused.id]);
      setAiTradeOffs(null);
    }
  };

  const handleRemoveSlot = (index: number) => {
    if (selectedIds.length <= 2) {
      toast.info("At least 2 projects are required for comparison.");
      return;
    }
    const updated = selectedIds.filter((_, i) => i !== index);
    setSelectedIds(updated);
    setAiTradeOffs(null);
  };

  const handleAnalyzeTradeOffs = async () => {
    if (selectedProjects.length < 2) return;

    setLoadingAi(true);
    try {
      const res = await explainProjectTradeOffs({
        data: { projects: selectedProjects },
      });
      setAiTradeOffs(res);
      if (res.success) {
        toast.success("Gemini AI Technical Trade-off Analysis complete!");
      } else {
        toast.warning(res.error || "GEMINI_API_KEY is not configured on server.");
      }
    } catch (err: any) {
      console.error("Trade-off AI call failed:", err);
      toast.error("Network error analyzing trade-offs.");
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16 space-y-10">
      <ScrollReveal className="space-y-3 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 rounded-full border border-electric/30 bg-electric/10 px-3.5 py-1 text-xs font-mono font-medium text-electric">
          <Scale className="size-3.5" /> Technical Comparison Engine
        </div>
        <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
          Side-by-Side Project <span className="text-electric">Matrix.</span>
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground leading-relaxed">
          Compare 2 to 3 engineering capstone blueprints across difficulty, cost, skills, hardware BOM, and features. Consult Gemini AI for objective trade-off explanations.
        </p>
      </ScrollReveal>

      {/* Selector Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-border/80 bg-card p-6 shadow-soft">
        <div className="flex flex-wrap items-center gap-4 flex-1">
          {selectedIds.map((id, idx) => (
            <div key={idx} className="space-y-1.5 flex-1 min-w-[200px]">
              <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                <span>Slot #{idx + 1}</span>
                {selectedIds.length > 2 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveSlot(idx)}
                    className="text-destructive hover:underline flex items-center gap-1"
                  >
                    <Trash2 className="size-3" /> Remove
                  </button>
                )}
              </div>
              <Select value={id} onValueChange={(val) => handleSelectSlot(idx, val)}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  {allProjects.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}

          {selectedIds.length < 3 && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddSlot}
              className="gap-1.5 self-end h-10 shrink-0"
            >
              <Plus className="size-4" /> Add 3rd Project
            </Button>
          )}
        </div>

        <Button
          onClick={handleAnalyzeTradeOffs}
          variant="electric"
          size="lg"
          disabled={loadingAi || selectedProjects.length < 2}
          className="gap-2 shrink-0"
        >
          {loadingAi ? (
            <>
              <Loader2 className="size-4 animate-spin" /> Analyzing Trade-offs...
            </>
          ) : (
            <>
              <Brain className="size-4" /> Explain Technical Trade-Offs (AI)
            </>
          )}
        </Button>
      </div>

      {/* Gemini AI Technical Trade-Off Explanation Banner */}
      {aiTradeOffs && (
        <div className="rounded-3xl border border-electric/40 bg-gradient-to-r from-electric/10 via-electric/5 to-transparent p-6 sm:p-8 space-y-4 shadow-soft">
          <div className="flex items-center justify-between border-b border-electric/20 pb-3">
            <div className="flex items-center gap-2 font-display text-lg font-bold text-electric">
              <Brain className="size-5 text-electric" /> Gemini AI Engineering Trade-Off Assessment
            </div>
            <Badge variant="electric" className="font-mono text-xs gap-1">
              <Sparkles className="size-3" /> Technical Advisor
            </Badge>
          </div>

          {aiTradeOffs.success ? (
            <div className="space-y-4">
              <p className="text-sm text-foreground leading-relaxed">
                {aiTradeOffs.tradeOffSummary}
              </p>

              {aiTradeOffs.keyComparisonPoints && aiTradeOffs.keyComparisonPoints.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs pt-2">
                  {aiTradeOffs.keyComparisonPoints.map((point) => {
                    const matchedProj = selectedProjects.find((p) => p.id === point.projectId);
                    return (
                      <Card key={point.projectId} className="border border-border/80 p-4 space-y-3 bg-background/80">
                        <div className="font-display font-bold text-foreground truncate">
                          {matchedProj?.title || point.projectId}
                        </div>

                        <div className="space-y-1.5">
                          <div className="font-bold text-success flex items-center gap-1">
                            <CheckCircle className="size-3.5" /> Key Pros
                          </div>
                          <ul className="space-y-0.5 text-muted-foreground text-[11px]">
                            {point.pros.map((pro, i) => (
                              <li key={i}>• {pro}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-1.5">
                          <div className="font-bold text-warning flex items-center gap-1">
                            <AlertCircle className="size-3.5" /> Key Considerations
                          </div>
                          <ul className="space-y-0.5 text-muted-foreground text-[11px]">
                            {point.cons.map((con, i) => (
                              <li key={i}>• {con}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="text-[11px] text-electric italic pt-1 border-t border-border/50">
                          Best for: {point.bestSuitedFor}
                        </div>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <div className="text-xs text-warning space-y-1">
              <div className="font-bold">{aiTradeOffs.error}</div>
              <p className="text-muted-foreground">
                Set environment variable <span className="font-mono font-bold text-electric">GEMINI_API_KEY=your_key</span> on server to enable AI trade-off evaluations.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Side-by-Side Comparison Matrix Table */}
      <div className="overflow-x-auto rounded-3xl border border-border/80 bg-card shadow-soft">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-border/80 bg-muted/40 font-display">
              <th className="p-4 w-48 font-bold text-muted-foreground uppercase text-[11px] font-mono">Attribute</th>
              {selectedProjects.map((p) => (
                <th key={p.id} className="p-4 min-w-[240px] font-bold text-foreground text-sm">
                  <div className="space-y-2">
                    <Badge variant="electric" className="text-[10px] font-mono">
                      {p.domain}
                    </Badge>
                    <div className="font-display font-extrabold text-base leading-tight">
                      <Link to="/projects/$id" params={{ id: p.id }} className="hover:text-electric">
                        {p.title}
                      </Link>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {/* Difficulty */}
            <tr>
              <td className="p-4 font-mono font-semibold text-muted-foreground bg-muted/20">Difficulty</td>
              {selectedProjects.map((p) => (
                <td key={p.id} className="p-4">
                  <Badge variant={p.difficulty === "Advanced" ? "destructive" : p.difficulty === "Intermediate" ? "warning" : "success"}>
                    {p.difficulty}
                  </Badge>
                </td>
              ))}
            </tr>

            {/* Estimated Cost */}
            <tr>
              <td className="p-4 font-mono font-semibold text-muted-foreground bg-muted/20 flex items-center gap-1">
                <IndianRupee className="size-3.5 text-electric" /> Estimated Cost
              </td>
              {selectedProjects.map((p) => (
                <td key={p.id} className="p-4 font-display font-bold text-foreground">
                  ₹{p.estimated_cost.toLocaleString("en-IN")}
                </td>
              ))}
            </tr>

            {/* Estimated Duration */}
            <tr>
              <td className="p-4 font-mono font-semibold text-muted-foreground bg-muted/20 flex items-center gap-1">
                <Clock className="size-3.5 text-electric" /> Duration
              </td>
              {selectedProjects.map((p) => (
                <td key={p.id} className="p-4 font-mono">
                  {p.estimated_duration}
                </td>
              ))}
            </tr>

            {/* Technologies */}
            <tr>
              <td className="p-4 font-mono font-semibold text-muted-foreground bg-muted/20 flex items-center gap-1">
                <Layers className="size-3.5 text-electric" /> Tech Stack
              </td>
              {selectedProjects.map((p) => (
                <td key={p.id} className="p-4">
                  <div className="flex flex-wrap gap-1">
                    {p.technologies.map((t) => (
                      <span key={t} className="rounded bg-electric/10 px-2 py-0.5 font-mono text-[11px] text-electric">
                        {t}
                      </span>
                    ))}
                  </div>
                </td>
              ))}
            </tr>

            {/* Required Skills */}
            <tr>
              <td className="p-4 font-mono font-semibold text-muted-foreground bg-muted/20 flex items-center gap-1">
                <Wrench className="size-3.5 text-electric" /> Required Skills
              </td>
              {selectedProjects.map((p) => (
                <td key={p.id} className="p-4">
                  <div className="flex flex-wrap gap-1">
                    {p.required_skills.map((s) => (
                      <span key={s} className="rounded border border-border px-2 py-0.5 text-[11px] text-foreground">
                        {s}
                      </span>
                    ))}
                  </div>
                </td>
              ))}
            </tr>

            {/* Hardware BOM */}
            <tr>
              <td className="p-4 font-mono font-semibold text-muted-foreground bg-muted/20 flex items-center gap-1">
                <Cpu className="size-3.5 text-electric" /> Hardware BOM
              </td>
              {selectedProjects.map((p) => (
                <td key={p.id} className="p-4 text-muted-foreground">
                  {p.hardware && p.hardware.length > 0 ? (
                    <ul className="space-y-0.5">
                      {p.hardware.map((hw) => (
                        <li key={hw}>• {hw}</li>
                      ))}
                    </ul>
                  ) : (
                    <span className="italic">Pure Software</span>
                  )}
                </td>
              ))}
            </tr>

            {/* Suitable Branches */}
            <tr>
              <td className="p-4 font-mono font-semibold text-muted-foreground bg-muted/20 flex items-center gap-1">
                <GraduationCap className="size-3.5 text-electric" /> Suitable Branches
              </td>
              {selectedProjects.map((p) => (
                <td key={p.id} className="p-4">
                  <div className="flex flex-wrap gap-1">
                    {p.suitable_branches?.map((b) => (
                      <Badge key={b} variant="secondary" className="text-[10px]">
                        {b}
                      </Badge>
                    ))}
                  </div>
                </td>
              ))}
            </tr>

            {/* Action Buttons */}
            <tr>
              <td className="p-4 font-mono font-semibold text-muted-foreground bg-muted/20">Actions</td>
              {selectedProjects.map((p) => (
                <td key={p.id} className="p-4">
                  <ActionButtons projectId={p.id} projectTitle={p.title} size="sm" />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
