export function LoadingState({ label = "Loading…" }: { label?: string }) {
  return (
    <div role="status" aria-live="polite" className="flex min-h-[40vh] flex-col items-center justify-center gap-3">
      <span className="size-6 animate-spin rounded-full border-2 border-border border-t-primary" aria-hidden="true" />
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  );
}
