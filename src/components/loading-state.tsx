import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function Spinner({ className }: { className?: string }) {
  return (
    <span
      className={cn("inline-block size-5 animate-spin rounded-full border-2 border-border border-t-electric", className)}
      aria-hidden="true"
    />
  );
}

export function LoadingState({ label = "Loading…" }: { label?: string }) {
  return (
    <div role="status" aria-live="polite" className="flex min-h-[40vh] flex-col items-center justify-center gap-3">
      <Spinner className="size-6" />
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  );
}

/** Skeleton shaped like a ProjectCard, for list loading. */
export function ProjectCardSkeleton() {
  return (
    <div className="rounded-xl border border-border p-6" aria-hidden="true">
      <div className="mb-3 flex gap-2">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>
      <Skeleton className="mb-2 h-5 w-3/4" />
      <Skeleton className="mb-4 h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  );
}
