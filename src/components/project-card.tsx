import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MatchScore } from "@/components/match-score";
import { cn } from "@/lib/utils";

export type ProjectCardProps = {
  title: string;
  summary: string;
  domain: string;
  difficulty?: "Beginner" | "Intermediate" | "Advanced";
  tags?: string[];
  matchScore?: number;
  href?: string;
  className?: string;
};

/**
 * Presentational card for a project listing. Receives all data via props —
 * it does not fetch, score, or recommend anything.
 */
export function ProjectCard({
  title,
  summary,
  domain,
  difficulty,
  tags = [],
  matchScore,
  href,
  className,
}: ProjectCardProps) {
  const Wrapper: React.ElementType = href ? "a" : "div";
  return (
    <Card
      className={cn(
        "group relative flex h-full flex-col overflow-hidden border-border/80 shadow-soft transition-[box-shadow,transform,border-color] duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-lift",
        className,
      )}
    >
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-electric/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <CardHeader className="flex-row items-start justify-between gap-4 space-y-0 pb-3">
        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-1.5">
            <Badge variant="electric">{domain}</Badge>
            {difficulty && <Badge variant="outline">{difficulty}</Badge>}
          </div>
          <h3 className="font-display text-lg font-semibold leading-snug">
            <Wrapper {...(href ? { href } : {})} className="after:absolute after:inset-0 focus-visible:outline-none">
              {title}
            </Wrapper>
          </h3>
        </div>
        {typeof matchScore === "number" && <MatchScore value={matchScore} size={48} className="shrink-0" />}
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-between gap-4 pt-0">
        <p className="text-sm leading-relaxed text-muted-foreground">{summary}</p>
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {tags.map((t) => (
              <span key={t} className="rounded-md bg-secondary px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
                {t}
              </span>
            ))}
          </div>
          <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-[transform,color] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-electric" aria-hidden="true" />
        </div>
      </CardContent>
    </Card>
  );
}
