import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SOCHOYHAPE — Home" },
      { name: "description", content: "SOCHOYHAPE foundation: app shell and structure for the first phase." },
      { property: "og:title", content: "SOCHOYHAPE — Home" },
      { property: "og:description", content: "SOCHOYHAPE foundation: app shell and structure for the first phase." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <section className="flex flex-col gap-6">
      <span className="w-fit rounded-full border border-border bg-card px-3 py-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Phase 1 — Foundation
      </span>
      <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">SOCHOYHAPE</h1>
      <p className="max-w-prose text-lg text-muted-foreground">
        The app shell, navigation, loading and error handling are in place. Features arrive in later
        phases — nothing here is simulated.
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { to: "/explore", label: "Explore" },
          { to: "/profile", label: "Profile" },
          { to: "/settings", label: "Settings" },
        ].map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className="rounded-xl border border-border bg-card p-5 transition-colors hover:bg-accent"
          >
            <span className="font-medium">{label}</span>
            <span className="mt-1 block text-sm text-muted-foreground">Placeholder route</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
