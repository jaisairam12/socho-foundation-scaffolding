import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo, LogoMark } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export const PRIMARY_NAV = [
  { to: "/", label: "Home", exact: true },
  { to: "/projects", label: "Projects", exact: false },
  { to: "/find-project", label: "Find Project", exact: false },
  { to: "/analyze-idea", label: "Analyze Idea", exact: false },
  { to: "/viva", label: "Viva Prep", exact: false },
  { to: "/compare", label: "Compare", exact: false },
  { to: "/github-finder", label: "GitHub Finder", exact: false },
  { to: "/dashboard", label: "Dashboard", exact: false },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300",
        scrolled
          ? "border-border/80 bg-background/80 shadow-soft backdrop-blur-xl"
          : "border-transparent bg-background/60 backdrop-blur",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-0.5 xl:flex">
          {PRIMARY_NAV.map(({ to, label, exact }) => (
            <Link
              key={to}
              to={to}
              activeOptions={{ exact }}
              className="relative rounded-full px-3 py-1.5 text-[13px] font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              activeProps={{ className: "text-foreground" }}
            >
              {({ isActive }) => (
                <>
                  {label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-3 -bottom-px h-0.5 origin-left rounded-full bg-electric transition-transform duration-300 ease-out-expo",
                      isActive ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </>
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 xl:flex">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/sign-in">Sign In</Link>
          </Button>
          <Button size="sm" variant="electric" asChild>
            <Link to="/dashboard">Dashboard</Link>
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="xl:hidden" aria-label="Open menu">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="flex w-full max-w-sm flex-col gap-0 p-0 [&>button]:hidden">
            <div className="flex h-16 items-center justify-between border-b border-border px-5">
              <SheetTitle asChild>
                <span className="inline-flex items-center gap-2.5 font-display text-[15px] font-bold tracking-[0.12em]">
                  <LogoMark /> SOCHOYHAPE
                </span>
              </SheetTitle>
              <Button variant="ghost" size="icon" aria-label="Close menu" onClick={() => setOpen(false)}>
                <X className="size-5" />
              </Button>
            </div>
            <nav aria-label="Mobile" className="flex flex-1 flex-col gap-1 px-3 py-4 overflow-y-auto">
              {PRIMARY_NAV.map(({ to, label, exact }, i) => (
                <Link
                  key={to}
                  to={to}
                  activeOptions={{ exact }}
                  style={{ animationDelay: `${i * 30}ms` }}
                  className="animate-in fade-in slide-in-from-right-2 fill-mode-both rounded-xl px-4 py-2.5 font-display text-lg font-semibold tracking-tight text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  activeProps={{ className: "text-foreground bg-accent" }}
                >
                  {label}
                </Link>
              ))}
            </nav>
            <div className="grid grid-cols-2 gap-2 border-t border-border p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <Button variant="outline" size="lg" asChild>
                <Link to="/sign-in">Sign In</Link>
              </Button>
              <Button variant="electric" size="lg" asChild>
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
