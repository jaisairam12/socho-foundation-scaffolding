import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { GitHubRepository } from "@/types/productivity";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/empty-state";
import {
  Github,
  Search,
  Star,
  ExternalLink,
  Code,
  Calendar,
  Loader2,
  AlertCircle,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/github-finder")({
  head: () => ({
    meta: [
      { title: "GitHub Engineering Resource Finder — SOCHOYHAPE" },
      { name: "description", content: "Search real open-source GitHub repositories, starter kits, and engineering frameworks related to your project stack." },
    ],
  }),
  component: GitHubFinderPage,
});

function GitHubFinderPage() {
  const [query, setQuery] = useState("autonomous robotics ROS2");
  const [repos, setRepos] = useState<GitHubRepository[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchGitHubRepos = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setErrorMsg(null);

    try {
      // Fetch real repositories from official GitHub REST API
      const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(
        searchQuery.trim()
      )}+in:name,description,topic&sort=stars&order=desc&per_page=9`;

      const res = await fetch(url, {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      });

      if (!res.ok) {
        if (res.status === 403) {
          throw new Error("GitHub API rate limit reached. Please wait a minute and try again.");
        }
        throw new Error(`GitHub API HTTP Error: ${res.status}`);
      }

      const json = await res.json();

      if (json.items && Array.isArray(json.items)) {
        const formatted: GitHubRepository[] = json.items.map((item: any) => ({
          id: item.id,
          name: item.name,
          full_name: item.full_name,
          html_url: item.html_url,
          description: item.description || "No description provided for this repository.",
          language: item.language || "Multi-language",
          stargazers_count: item.stargazers_count || 0,
          updated_at: item.updated_at,
          topics: item.topics || [],
        }));
        setRepos(formatted);
      } else {
        setRepos([]);
      }
    } catch (err: any) {
      console.error("GitHub API fetch error:", err);
      setErrorMsg(err?.message || "Failed to fetch GitHub repositories.");
      setRepos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGitHubRepos("autonomous robotics ROS2");
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchGitHubRepos(query);
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 sm:py-16 space-y-8">
      <ScrollReveal className="space-y-3 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 rounded-full border border-electric/30 bg-electric/10 px-3.5 py-1 text-xs font-mono font-medium text-electric">
          <Github className="size-3.5" /> Official GitHub API Integration
        </div>
        <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
          Discover Real Open-Source <span className="text-electric">Codebases.</span>
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground leading-relaxed">
          Search real GitHub open-source repositories, libraries, and reference hardware implementations to accelerate your engineering capstone project.
        </p>
      </ScrollReveal>

      {/* Search Toolbar */}
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 rounded-2xl border border-border/80 bg-card p-4 shadow-soft">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search GitHub repositories by tech stack e.g., 'TensorFlow Lite crop disease' or 'ESP32 solar'"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 h-11 bg-background text-sm"
          />
        </div>
        <Button type="submit" variant="electric" disabled={loading || !query.trim()} className="gap-2 h-11 px-6 shrink-0">
          {loading ? <Loader2 className="size-4 animate-spin" /> : <Search className="size-4" />}
          <span>Search Repositories</span>
        </Button>
      </form>

      {/* Quick Filter Badges */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-muted-foreground font-mono">Popular Engineering Topics:</span>
        {["ROS2 Autonomous", "ESP32 IoT", "TensorFlow TFLite", "Solidity Smart Contract", "FastAPI Edge AI"].map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => {
              setQuery(t);
              fetchGitHubRepos(t);
            }}
            className="rounded-lg border border-border/60 bg-muted/30 px-2.5 py-1 font-mono text-[11px] hover:border-electric hover:text-electric transition-colors"
          >
            {t}
          </button>
        ))}
      </div>

      {/* Error Alert */}
      {errorMsg && (
        <div className="rounded-2xl border border-warning/40 bg-warning/5 p-5 flex items-start gap-3 text-xs">
          <AlertCircle className="size-5 text-warning shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-bold text-warning">GitHub Search Notice</div>
            <div className="text-muted-foreground">{errorMsg}</div>
          </div>
        </div>
      )}

      {/* Results Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="h-48 animate-pulse border border-border/60 bg-muted/20" />
          ))}
        </div>
      ) : repos.length === 0 ? (
        <EmptyState
          title="No GitHub repositories found"
          description="Try modifying your search keywords or choosing one of the popular engineering topics above."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo) => (
            <Card key={repo.id} className="flex flex-col justify-between overflow-hidden border border-border/80 bg-card hover:border-electric/40 transition-all hover:-translate-y-0.5 shadow-soft">
              <div>
                <CardHeader className="p-5 pb-3 gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-1 font-mono text-xs font-semibold text-electric">
                      <Code className="size-3.5" /> {repo.language}
                    </span>
                    <span className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
                      <Star className="size-3.5 text-warning fill-warning" /> {repo.stargazers_count.toLocaleString()}
                    </span>
                  </div>

                  <CardTitle className="font-display text-base font-bold text-foreground line-clamp-1 hover:text-electric">
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="focus-visible:underline">
                      {repo.name}
                    </a>
                  </CardTitle>
                  <div className="font-mono text-[11px] text-muted-foreground truncate">{repo.full_name}</div>
                </CardHeader>

                <CardContent className="p-5 pt-0 space-y-3">
                  <p className="line-clamp-3 text-xs text-muted-foreground leading-relaxed">
                    {repo.description}
                  </p>

                  {repo.topics && repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {repo.topics.slice(0, 3).map((tp) => (
                        <span key={tp} className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                          #{tp}
                        </span>
                      ))}
                    </div>
                  )}
                </CardContent>
              </div>

              <CardFooter className="flex items-center justify-between border-t border-border/60 bg-muted/20 p-4 text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1 font-mono">
                  <Calendar className="size-3" /> Updated {new Date(repo.updated_at).toLocaleDateString()}
                </span>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-electric hover:underline"
                >
                  View on GitHub <ExternalLink className="size-3" />
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
