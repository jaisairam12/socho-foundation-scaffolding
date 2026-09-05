import { Search, RotateCcw, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProjectFilterParams } from "@/types/project";

interface ProjectFiltersProps {
  filters: ProjectFilterParams;
  onChange: (newFilters: ProjectFilterParams) => void;
  onReset: () => void;
}

const DOMAINS = [
  "All",
  "AI & Machine Learning",
  "Robotics & Hardware",
  "IoT & Embedded Systems",
  "Cybersecurity & Cloud",
  "Blockchain & Web3",
  "Biomedical & AI",
  "Web Development",
];

const DIFFICULTIES = ["All", "Beginner", "Intermediate", "Advanced"];

export function ProjectFilters({ filters, onChange, onReset }: ProjectFiltersProps) {
  return (
    <div className="space-y-4 rounded-2xl border border-border/80 bg-card p-5 shadow-soft">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search project titles, technologies, problem statements..."
            value={filters.search || ""}
            onChange={(e) => onChange({ ...filters, search: e.target.value, page: 1 })}
            className="pl-10 h-10 bg-background"
          />
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={onReset}
          className="gap-2 shrink-0 self-end sm:self-auto"
        >
          <RotateCcw className="size-3.5" />
          <span>Reset Filters</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pt-2">
        <div className="space-y-1.5">
          <label className="text-xs font-mono font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1">
            <Filter className="size-3" /> Domain / Category
          </label>
          <Select
            value={filters.domain || "All"}
            onValueChange={(val) => onChange({ ...filters, domain: val, page: 1 })}
          >
            <SelectTrigger className="h-9 text-xs bg-background">
              <SelectValue placeholder="Select domain" />
            </SelectTrigger>
            <SelectContent>
              {DOMAINS.map((d) => (
                <SelectItem key={d} value={d} className="text-xs">
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-mono font-medium text-muted-foreground uppercase tracking-wider">
            Difficulty Level
          </label>
          <Select
            value={filters.difficulty || "All"}
            onValueChange={(val) => onChange({ ...filters, difficulty: val, page: 1 })}
          >
            <SelectTrigger className="h-9 text-xs bg-background">
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              {DIFFICULTIES.map((diff) => (
                <SelectItem key={diff} value={diff} className="text-xs">
                  {diff}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-mono font-medium text-muted-foreground uppercase tracking-wider">
            Max Budget (INR)
          </label>
          <Input
            type="number"
            placeholder="e.g. 5000"
            value={filters.maxBudget || ""}
            onChange={(e) =>
              onChange({
                ...filters,
                maxBudget: e.target.value ? Number(e.target.value) : undefined,
                page: 1,
              })
            }
            className="h-9 text-xs bg-background"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-mono font-medium text-muted-foreground uppercase tracking-wider">
            Max Duration (Weeks)
          </label>
          <Input
            type="number"
            placeholder="e.g. 8"
            value={filters.maxDurationWeeks || ""}
            onChange={(e) =>
              onChange({
                ...filters,
                maxDurationWeeks: e.target.value ? Number(e.target.value) : undefined,
                page: 1,
              })
            }
            className="h-9 text-xs bg-background"
          />
        </div>
      </div>
    </div>
  );
}
