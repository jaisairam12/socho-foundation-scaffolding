export function PagePlaceholder({ title, description }: { title: string; description: string }) {
  return (
    <section className="flex flex-col gap-4">
      <span className="w-fit rounded-full border border-border bg-card px-3 py-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Placeholder
      </span>
      <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
      <p className="max-w-prose text-muted-foreground">{description}</p>
      <div className="mt-4 rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
        This page is not built yet. Nothing here is simulated.
      </div>
    </section>
  );
}
