import { useState, useEffect } from "react";
import { Project } from "@/types/project";
import { RoadmapStage, ProjectRoadmapProgress } from "@/types/productivity";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  TrendingUp,
  CheckCircle2,
  Circle,
  Clock,
  ArrowRight,
  BookOpen,
  Check,
} from "lucide-react";

interface ProjectRoadmapProps {
  project: Project;
}

const ROADMAP_STAGES: RoadmapStage[] = [
  "Idea",
  "Research",
  "Design",
  "Development",
  "Testing",
  "Deployment",
  "Documentation",
  "Viva",
];

const NEXT_ACTIONS: Record<RoadmapStage, string> = {
  Idea: "Define problem statement and domain target.",
  Research: "Conduct literature review & hardware/software feasibility study.",
  Design: "Draft component architecture diagrams and PCB/API schematics.",
  Development: "Implement core mandatory features & sensor drivers.",
  Testing: "Execute unit tests, integration benchmarks, and edge case trials.",
  Deployment: "Build TFLite/Docker containers & launch live telemetry interface.",
  Documentation: "Author final capstone report, synopses, and project manuals.",
  Viva: "Run 10-category viva simulation and review examiner trap questions.",
};

export function ProjectRoadmap({ project }: ProjectRoadmapProps) {
  const storageKey = `socho_roadmap_${project.id}`;

  const [roadmap, setRoadmap] = useState<ProjectRoadmapProgress>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) return JSON.parse(saved);
    } catch (e) {}

    return {
      projectId: project.id,
      currentStage: "Development",
      completedStages: ["Idea", "Research", "Design"],
      notes: {
        Idea: "Problem statement defined.",
        Research: "Selected TensorFlow Lite & ESP32-CAM stack.",
        Design: "EasyEDA schematics approved.",
      },
      lastUpdated: new Date().toLocaleDateString(),
    };
  });

  const [activeStageNote, setActiveStageNote] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(roadmap));
    } catch (e) {}
  }, [roadmap, storageKey]);

  const toggleStageComplete = (stage: RoadmapStage) => {
    const isCompleted = roadmap.completedStages.includes(stage);
    let updatedCompleted: RoadmapStage[];

    if (isCompleted) {
      updatedCompleted = roadmap.completedStages.filter((s) => s !== stage);
    } else {
      updatedCompleted = [...roadmap.completedStages, stage];
    }

    // Determine new current stage
    let nextCurrent: RoadmapStage = "Viva";
    for (const s of ROADMAP_STAGES) {
      if (!updatedCompleted.includes(s)) {
        nextCurrent = s;
        break;
      }
    }

    setRoadmap({
      ...roadmap,
      completedStages: updatedCompleted,
      currentStage: nextCurrent,
      lastUpdated: new Date().toLocaleDateString(),
    });

    toast.success(
      isCompleted
        ? `Marked stage "${stage}" as pending`
        : `Completed stage "${stage}"! 🎉`
    );
  };

  const handleSaveNote = (stage: RoadmapStage) => {
    if (!activeStageNote.trim()) return;

    setRoadmap({
      ...roadmap,
      notes: {
        ...roadmap.notes,
        [stage]: activeStageNote.trim(),
      },
      lastUpdated: new Date().toLocaleDateString(),
    });

    setActiveStageNote("");
    toast.info(`Updated notes for stage ${stage}`);
  };

  const percentProgress = Math.round(
    (roadmap.completedStages.length / ROADMAP_STAGES.length) * 100
  );

  return (
    <Card className="border border-border/80 bg-card p-6 space-y-6 shadow-soft">
      <CardHeader className="p-0 pb-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-display text-xl font-bold text-foreground">
            <TrendingUp className="size-5 text-electric" /> Project Roadmap &amp; Progress Tracker
          </div>
          <Badge variant="electric" className="font-mono text-xs">
            {percentProgress}% Complete ({roadmap.completedStages.length}/8 Stages)
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">
          Capstone Journey for: <span className="font-semibold text-foreground">{project.title}</span>
        </p>
      </CardHeader>

      <CardContent className="p-0 space-y-6">
        {/* Progress Meter & Next Action */}
        <div className="space-y-3 rounded-2xl border border-electric/30 bg-electric/5 p-5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-muted-foreground uppercase">Current Stage</span>
            <span className="font-display font-extrabold text-electric">{roadmap.currentStage}</span>
          </div>
          <Progress value={percentProgress} className="h-2.5" />
          <div className="flex items-start gap-2 pt-1 text-xs text-foreground/90">
            <ArrowRight className="size-4 text-electric shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-electric">Next Recommended Action: </span>
              <span>{NEXT_ACTIONS[roadmap.currentStage]}</span>
            </div>
          </div>
        </div>

        {/* 8-Stage Timeline Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          {ROADMAP_STAGES.map((stage, idx) => {
            const isDone = roadmap.completedStages.includes(stage);
            const isCurrent = roadmap.currentStage === stage;
            return (
              <div
                key={stage}
                onClick={() => toggleStageComplete(stage)}
                className={`cursor-pointer rounded-2xl border p-3.5 space-y-2 transition-all ${
                  isDone
                    ? "border-success/40 bg-success/5 text-foreground hover:border-success"
                    : isCurrent
                    ? "border-electric/50 bg-electric/10 shadow-soft"
                    : "border-border/60 bg-muted/20 text-muted-foreground hover:border-border"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold">Stage {idx + 1}</span>
                  {isDone ? (
                    <CheckCircle2 className="size-4 text-success" />
                  ) : (
                    <Circle className="size-4 text-muted-foreground/60" />
                  )}
                </div>
                <div className="font-display font-bold text-sm text-foreground">{stage}</div>
                <div className="text-[10px] text-muted-foreground line-clamp-1">
                  {isDone ? "Completed" : isCurrent ? "Active Stage" : "Pending"}
                </div>
              </div>
            );
          })}
        </div>

        {/* Stage Notes Section */}
        <div className="rounded-2xl border border-border/80 bg-muted/20 p-4 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono font-semibold text-foreground">
            <span className="flex items-center gap-1.5">
              <BookOpen className="size-3.5 text-electric" /> Stage Notes for {roadmap.currentStage}
            </span>
            <span className="text-muted-foreground">Last updated: {roadmap.lastUpdated}</span>
          </div>

          {roadmap.notes[roadmap.currentStage] && (
            <p className="text-xs text-foreground/90 bg-background/80 p-3 rounded-xl border border-border/60 font-sans">
              "{roadmap.notes[roadmap.currentStage]}"
            </p>
          )}

          <div className="flex items-center gap-2">
            <Input
              type="text"
              placeholder={`Add log note for ${roadmap.currentStage} stage...`}
              value={activeStageNote}
              onChange={(e) => setActiveStageNote(e.target.value)}
              className="bg-background text-xs h-9 flex-1"
            />
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleSaveNote(roadmap.currentStage)}
              disabled={!activeStageNote.trim()}
              className="h-9 gap-1"
            >
              <Check className="size-3.5" /> Save Note
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
