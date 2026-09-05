import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

export function PagePlaceholder({ title, description }: { title: string; description: string }) {
  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <div aria-hidden="true" className="circuit-grid pointer-events-none absolute inset-0 -z-10" />
      <ScrollReveal className="flex flex-col gap-5">
        <Badge variant="outline" className="w-fit">Placeholder</Badge>
        <h1 className="font-display text-4xl font-bold sm:text-5xl">{title}</h1>
        <p className="max-w-prose text-lg text-muted-foreground">{description}</p>
        <div className="mt-6 rounded-2xl border border-dashed border-border bg-background/60 p-8 text-center text-sm text-muted-foreground">
          This page is not built yet. Nothing here is simulated.
        </div>
      </ScrollReveal>
    </section>
  );
}
