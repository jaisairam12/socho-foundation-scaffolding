import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { toast } from "sonner";
import { LogoMark } from "@/components/brand/logo";
import { EmptyState } from "@/components/empty-state";
import { ErrorState } from "@/components/error-state";
import { LoadingState, ProjectCardSkeleton, Spinner } from "@/components/loading-state";
import { MatchScore } from "@/components/match-score";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { ProjectCard } from "@/components/project-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/design-system")({
  head: () => ({
    meta: [
      { title: "Design System — SOCHOYHAPE" },
      { name: "description", content: "Internal reference of SOCHOYHAPE tokens and reusable components." },
      { property: "og:title", content: "Design System — SOCHOYHAPE" },
      { property: "og:description", content: "Internal reference of SOCHOYHAPE tokens and reusable components." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DesignSystemPage,
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <ScrollReveal as="section" className="space-y-5">
      <h2 className="font-display text-xl font-semibold">{title}</h2>
      {children}
    </ScrollReveal>
  );
}

const swatches = [
  ["Background", "bg-background border"],
  ["Foreground", "bg-foreground"],
  ["Electric", "bg-electric"],
  ["Electric soft", "bg-electric-soft"],
  ["Surface", "bg-surface border"],
  ["Muted", "bg-muted"],
  ["Success", "bg-success"],
  ["Destructive", "bg-destructive"],
] as const;

function DesignSystemPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-16 px-4 py-16 sm:px-6">
      <header className="space-y-3">
        <Badge variant="outline">Internal reference</Badge>
        <h1 className="font-display text-4xl font-bold">Design system</h1>
        <p className="max-w-prose text-muted-foreground">
          Every reusable piece of SOCHOYHAPE, rendered with sample props. Sample values (names, scores) are
          illustrative and not produced by any logic.
        </p>
      </header>

      <Section title="Logo">
        <div className="flex items-center gap-8">
          <LogoMark className="size-16" />
          <div className="rounded-xl bg-foreground p-4"><LogoMark className="size-16 text-background" /></div>
        </div>
      </Section>

      <Section title="Colour tokens">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {swatches.map(([name, cls]) => (
            <div key={name} className="space-y-2">
              <div className={`h-14 rounded-xl ${cls}`} />
              <div className="text-xs text-muted-foreground">{name}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Typography">
        <div className="space-y-2">
          <p className="font-display text-5xl font-bold">Display / Manrope</p>
          <p className="font-display text-2xl font-semibold">Heading — clear, academic-modern</p>
          <p className="max-w-prose text-base">Body / IBM Plex Sans — designed for long reading, engineering documentation and forms.</p>
          <p className="font-mono text-sm text-muted-foreground">mono / IBM Plex Mono — tags, IDs, code</p>
        </div>
      </Section>

      <Section title="Buttons">
        <div className="flex flex-wrap items-center gap-3">
          <Button>Primary</Button>
          <Button variant="electric">Electric</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button variant="destructive">Destructive</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
          <Button size="icon" aria-label="Search"><Search /></Button>
          <Button disabled>Disabled</Button>
        </div>
      </Section>

      <Section title="Badges">
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="electric">Electric</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </Section>

      <Section title="Cards & project cards">
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="font-display">Base card</CardTitle>
              <CardDescription>Generic container with header and content.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">Content area.</CardContent>
          </Card>
          <ProjectCard
            title="Sample: low-cost water quality sensor"
            summary="Illustrative card content. Demonstrates layout with tags and a match indicator."
            domain="Electronics"
            difficulty="Intermediate"
            tags={["IoT", "Sensors"]}
            matchScore={82}
            href="#"
          />
          <ProjectCard
            title="Sample: campus energy dashboard"
            summary="Illustrative card without a match indicator."
            domain="Software"
            difficulty="Beginner"
            tags={["Data"]}
          />
        </div>
      </Section>

      <Section title="Match score & progress">
        <div className="flex flex-wrap items-center gap-10">
          <MatchScore value={92} />
          <MatchScore value={64} size={72} label="Fit" />
          <div className="w-64 space-y-2">
            <Progress value={45} aria-label="Sample progress" />
            <Progress value={80} aria-label="Sample progress" />
          </div>
        </div>
      </Section>

      <Section title="Inputs & selects">
        <div className="grid max-w-2xl gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="ds-name">Project name</Label>
            <Input id="ds-name" placeholder="e.g. Solar tracker" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ds-domain">Domain</Label>
            <Select>
              <SelectTrigger id="ds-domain"><SelectValue placeholder="Choose a domain" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="ece">Electronics</SelectItem>
                <SelectItem value="cse">Software</SelectItem>
                <SelectItem value="mech">Mechanical</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="ds-idea">Idea</Label>
            <Textarea id="ds-idea" placeholder="Describe the idea…" rows={3} />
          </div>
        </div>
      </Section>

      <Section title="Dialog & toasts">
        <div className="flex flex-wrap gap-3">
          <Dialog>
            <DialogTrigger asChild><Button variant="outline">Open dialog</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-display">Dialog title</DialogTitle>
                <DialogDescription>Supporting copy for the dialog.</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="ghost">Cancel</Button>
                <Button>Confirm</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="outline" onClick={() => toast.success("Saved", { description: "Sample success toast." })}>Success toast</Button>
          <Button variant="outline" onClick={() => toast.error("Something failed", { description: "Sample error toast." })}>Error toast</Button>
        </div>
      </Section>

      <Section title="Loading, empty & error states">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-border"><LoadingState /></div>
          <ProjectCardSkeleton />
          <div className="flex items-center justify-center gap-2 rounded-2xl border border-border text-sm text-muted-foreground"><Spinner /> Inline spinner</div>
          <EmptyState title="No projects yet" description="Sample empty state with an action." action={<Button size="sm">Browse projects</Button>} />
          <div className="rounded-2xl border border-border md:col-span-2"><ErrorState compact title="Couldn't load projects" description="Sample error state." onRetry={() => toast("Retry clicked")} /></div>
        </div>
      </Section>
    </div>
  );
}
