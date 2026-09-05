import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SOCHOYHAPE — Original project ideas for engineering students" },
      { name: "description", content: "SOCHOYHAPE helps engineering students find and shape original project ideas. Foundation phase." },
      { property: "og:title", content: "SOCHOYHAPE — Original project ideas for engineering students" },
      { property: "og:description", content: "SOCHOYHAPE helps engineering students find and shape original project ideas. Foundation phase." },
    ],
  }),
  component: Index,
});

// Intentionally minimal: the full homepage is a later phase.
function Index() {
  return (
    <section className="relative mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-4 py-24 sm:px-6 sm:py-32">
      <div aria-hidden="true" className="circuit-grid pointer-events-none absolute inset-0 -z-10" />
      <ScrollReveal className="flex flex-col items-start gap-6">
        <Badge variant="electric">Phase 2 — Design system &amp; navigation</Badge>
        <h1 className="max-w-3xl font-display text-5xl font-bold leading-[1.05] sm:text-6xl">
          Original thinking, <span className="text-electric">engineered.</span>
        </h1>
        <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
          The visual system and navigation are in place. Product pages, idea analysis and project
          discovery arrive in later phases — nothing on this site is simulated.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button size="lg" asChild>
            <Link to="/get-started">Get Started <ArrowRight /></Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/design-system">View design system</Link>
          </Button>
        </div>
      </ScrollReveal>
    </section>
  );
}
