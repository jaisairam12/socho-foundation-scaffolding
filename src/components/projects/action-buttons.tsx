import { useState } from "react";
import { Bookmark, Sparkles, Scale, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ActionButtonsProps {
  projectId: string;
  projectTitle: string;
  className?: string;
  size?: "sm" | "default" | "lg";
}

export function ActionButtons({ projectId, projectTitle, className, size = "sm" }: ActionButtonsProps) {
  const [saved, setSaved] = useState(false);
  const [compared, setCompared] = useState(false);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newSaved = !saved;
    setSaved(newSaved);
    toast.success(newSaved ? `Saved "${projectTitle}" to bookmarks` : `Removed "${projectTitle}" from bookmarks`);
  };

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newComp = !compared;
    setCompared(newComp);
    toast.info(newComp ? `Added "${projectTitle}" to comparison drawer` : `Removed from comparison drawer`);
  };

  const handleAskAI = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast("Ask AI Assistant (Phase 4)", {
      description: `AI features for "${projectTitle}" will be unlocked in Phase 4.`,
      icon: <Sparkles className="size-4 text-electric" />,
    });
  };

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <Button
        variant={saved ? "electric" : "outline"}
        size={size}
        onClick={handleSave}
        className="gap-1.5"
      >
        {saved ? <Check className="size-3.5" /> : <Bookmark className="size-3.5" />}
        <span>{saved ? "Saved" : "Save"}</span>
      </Button>

      <Button
        variant={compared ? "secondary" : "outline"}
        size={size}
        onClick={handleCompare}
        className="gap-1.5"
      >
        <Scale className="size-3.5" />
        <span>{compared ? "Comparing" : "Compare"}</span>
      </Button>

      <Button
        variant="ghost"
        size={size}
        onClick={handleAskAI}
        className="gap-1.5 text-electric hover:text-electric hover:bg-electric/10"
      >
        <Sparkles className="size-3.5" />
        <span>Ask AI</span>
      </Button>
    </div>
  );
}
