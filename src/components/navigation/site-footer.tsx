import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/brand/logo";
import { PRIMARY_NAV } from "./site-header";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            A platform for engineering students to find and shape original project ideas.
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Explore</h2>
          <ul className="space-y-2 text-sm">
            {PRIMARY_NAV.filter((n) => n.to !== "/").map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className="text-foreground/80 transition-colors hover:text-electric">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Account</h2>
          <ul className="space-y-2 text-sm">
            <li><Link to="/sign-in" className="text-foreground/80 transition-colors hover:text-electric">Sign In</Link></li>
            <li><Link to="/get-started" className="text-foreground/80 transition-colors hover:text-electric">Get Started</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span>© {new Date().getFullYear()} SOCHOYHAPE</span>
          <span className="font-mono">Phase 2 — Design system &amp; navigation</span>
        </div>
      </div>
    </footer>
  );
}
