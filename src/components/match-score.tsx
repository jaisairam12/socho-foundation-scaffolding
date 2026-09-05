import { cn } from "@/lib/utils";

/**
 * Circular match indicator. Purely presentational — it renders whatever
 * `value` (0–100) it is given. No scoring logic lives here.
 */
export function MatchScore({
  value,
  size = 56,
  label = "Match",
  className,
}: {
  value: number;
  size?: number;
  label?: string;
  className?: string;
}) {
  const v = Math.max(0, Math.min(100, Math.round(value)));
  const stroke = 4;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (v / 100) * c;

  return (
    <div
      className={cn("inline-flex items-center gap-3", className)}
      role="meter"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={v}
      aria-label={`${label}: ${v}%`}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="currentColor" strokeWidth={stroke} className="text-border" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          className="text-electric transition-[stroke-dashoffset] duration-700 ease-out-expo"
        />
      </svg>
      <div className="leading-tight">
        <div className="font-display text-lg font-bold tabular-nums">{v}%</div>
        <div className="text-xs text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}
