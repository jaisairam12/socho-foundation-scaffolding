import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

/**
 * SOCHOYHAPE mark — an "idea node": a central point of original thought with
 * circuit-like traces branching to satellite nodes. Deliberately abstract;
 * never a robot, bulb-cliché, or face.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={cn("size-7 text-foreground", className)}
    >
      {/* circuit traces */}
      <path
        d="M16 16 L16 6 M16 16 L25 21 M16 16 L7 21 M16 6 L22 6 M25 21 L25 27 M7 21 L7 27"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.55"
      />
      {/* satellite nodes */}
      <circle cx="22" cy="6" r="1.6" fill="currentColor" />
      <circle cx="25" cy="27" r="1.6" fill="currentColor" />
      <circle cx="7" cy="27" r="1.6" fill="currentColor" />
      {/* central idea node — electric blue */}
      <circle cx="16" cy="16" r="4.2" className="fill-electric" />
      <circle cx="16" cy="16" r="6.8" stroke="currentColor" strokeWidth="1" opacity="0.18" />
    </svg>
  );
}

export function Logo({ className, wordmark = true }: { className?: string; wordmark?: boolean }) {
  return (
    <Link
      to="/"
      aria-label="SOCHOYHAPE home"
      className={cn("group inline-flex items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className)}
    >
      <LogoMark className="transition-transform duration-500 ease-out-expo group-hover:rotate-12" />
      {wordmark && (
        <span className="font-display text-[15px] font-bold tracking-[0.12em] text-foreground">
          SOCHOYHAPE
        </span>
      )}
    </Link>
  );
}
