import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { getProjects } from "@/lib/projects-data";
import { Project, ProjectFilterParams } from "@/types/project";
import { ProjectCardReal } from "@/components/projects/project-card-real";
import { ProjectFilters } from "@/components/projects/project-filters";
import { LoadingState } from "@/components/loading-state";
import { EmptyState } from "@/components/empty-state";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Layers, ChevronLeft, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Project Discovery — SOCHOYHAPE" },
      { name: "description", content: "Explore real engineering project blueprints, datasets, hardware specs, and domain ideas." },
    ],
  }),
  component: ProjectsCatalogPage,
});

function ProjectsCatalogPage() {
  const [filters, setFilters] = useState<ProjectFilterParams>({
    page: 1,
    pageSize: 6,
  });
  const [projects, setProjects] = useState<Project[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    getProjects(filters).then(({ data, total }) => {
      if (isMounted) {
        setProjects(data);
        setTotal(total);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [filters]);

  const totalPages = Math.ceil(total / (filters.pageSize || 6));

  const handleReset = () => {
    setFilters({ page: 1, pageSize: 6 });
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16 space-y-8">
      <ScrollReveal className="space-y-3 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 rounded-full border border-electric/30 bg-electric/10 px-3.5 py-1 text-xs font-mono font-medium text-electric">
          <Layers className="size-3.5" /> Engineering Project Catalog
        </div>
        <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
          Discover Verified Project <span className="text-electric">Blueprints.</span>
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground leading-relaxed">
          Browse real-world engineering project ideas across AI/ML, IoT, Robotics, Cybersecurity, Blockchain, and Web systems with complete technical specifications.
        </p>
      </ScrollReveal>

      {/* Filter Toolbar */}
      <ProjectFilters filters={filters} onChange={setFilters} onReset={handleReset} />

      {/* Active Results Summary */}
      <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
        <div>
          Showing <span className="font-bold text-foreground">{projects.length}</span> of{" "}
          <span className="font-bold text-foreground">{total}</span> engineering projects
        </div>
        {filters.domain && filters.domain !== "All" && (
          <div className="font-mono text-electric">Filter: {filters.domain}</div>
        )}
      </div>

      {/* Catalog Grid */}
      {loading ? (
        <LoadingState label="Querying Supabase project database..." />
      ) : projects.length === 0 ? (
        <EmptyState
          title="No engineering projects match your criteria"
          description="Try broadening your search term, resetting domain filters, or increasing the max budget parameter."
          action={
            <Button variant="outline" onClick={handleReset}>
              Reset Filters
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCardReal key={project.id} project={project} />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 pt-6 border-t border-border/60">
          <Button
            variant="outline"
            size="sm"
            disabled={filters.page === 1}
            onClick={() => setFilters({ ...filters, page: (filters.page || 1) - 1 })}
            className="gap-1"
          >
            <ChevronLeft className="size-4" /> Previous
          </Button>

          <span className="font-mono text-xs text-muted-foreground px-2">
            Page {filters.page} of {totalPages}
          </span>

          <Button
            variant="outline"
            size="sm"
            disabled={filters.page === totalPages}
            onClick={() => setFilters({ ...filters, page: (filters.page || 1) + 1 })}
            className="gap-1"
          >
            Next <ChevronRight className="size-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
