import { Link } from "@tanstack/react-router";
import { Clock, IndianRupee, Wrench, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Project } from "@/types/project";
import { ActionButtons } from "./action-buttons";

interface ProjectCardRealProps {
  project: Project;
}

export function ProjectCardReal({ project }: ProjectCardRealProps) {
  const getDifficultyBadge = (difficulty: Project["difficulty"]) => {
    switch (difficulty) {
      case "Beginner":
        return <Badge variant="success">Beginner</Badge>;
      case "Intermediate":
        return <Badge variant="warning">Intermediate</Badge>;
      case "Advanced":
        return <Badge variant="destructive">Advanced</Badge>;
      default:
        return <Badge variant="secondary">{difficulty}</Badge>;
    }
  };

  return (
    <Card className="group relative flex flex-col justify-between overflow-hidden border border-border/80 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-electric/40 hover:shadow-lift">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-electric to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      <div>
        <CardHeader className="gap-3 p-5 pb-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Badge variant="electric" className="text-[11px] font-mono tracking-wide">
              {project.domain}
            </Badge>
            {getDifficultyBadge(project.difficulty)}
          </div>
          <CardTitle className="font-display text-xl font-bold leading-snug tracking-tight text-foreground transition-colors group-hover:text-electric">
            <Link to="/projects/$id" params={{ id: project.id }} className="focus-visible:outline-none focus-visible:underline">
              {project.title}
            </Link>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4 p-5 pt-0">
          <p className="line-clamp-2 text-sm text-muted-foreground leading-relaxed">
            {project.short_description}
          </p>

          <div className="grid grid-cols-2 gap-2 text-xs font-medium text-muted-foreground border-y border-border/50 py-2.5">
            <div className="flex items-center gap-1.5">
              <IndianRupee className="size-3.5 text-electric shrink-0" />
              <span>Est. ₹{project.estimated_cost.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="size-3.5 text-electric shrink-0" />
              <span>{project.estimated_duration}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-1 text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
              <Layers className="size-3" /> Tech Stack
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="rounded-md bg-secondary/80 px-2 py-0.5 font-mono text-[11px] text-secondary-foreground"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                  +{project.technologies.length - 4} more
                </span>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-1 text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
              <Wrench className="size-3" /> Required Skills
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.required_skills.slice(0, 3).map((skill) => (
                <span
                  key={skill}
                  className="rounded-md border border-border px-2 py-0.5 text-[11px] text-foreground/80"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </div>

      <CardFooter className="flex flex-wrap items-center justify-between border-t border-border/60 bg-muted/20 p-4 pt-3">
        <Link
          to="/projects/$id"
          params={{ id: project.id }}
          className="text-xs font-semibold text-electric hover:underline"
        >
          View details →
        </Link>
        <ActionButtons projectId={project.id} projectTitle={project.title} size="sm" />
      </CardFooter>
    </Card>
  );
}
