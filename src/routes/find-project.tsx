import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { fetchAllProjectsForMatching, calculateMatchScores } from "@/lib/projects-data";
import { generateGeminiMentorship } from "@/lib/gemini-mentor.functions";
import { StudentPreferences, RecommendationResult } from "@/types/project";
import { AiRecommendationResponse } from "@/types/ai";
import { RecommendationCard } from "@/components/projects/recommendation-card";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/empty-state";
import { toast } from "sonner";
import {
  Compass,
  Sparkles,
  Check,
  RotateCcw,
  Sliders,
  Award,
  Brain,
  AlertCircle,
  Loader2,
  Lock,
} from "lucide-react";

export const Route = createFileRoute("/find-project")({
  head: () => ({
    meta: [
      { title: "Find My Project — Gemini AI & Matching Engine" },
      { name: "description", content: "Input your engineering preferences, query real database blueprints, rank matches deterministically, and receive personalized Gemini AI Senior Mentor guidance." },
    ],
  }),
  component: FindProjectPage,
});

const BRANCHES = [
  "Computer Science",
  "Information Technology",
  "Electronics & Communication",
  "Electrical Engineering",
  "Robotics & Automation",
  "Biomedical Engineering",
  "AI & Data Science",
  "Civil & Environmental",
];

const SKILL_OPTIONS = [
  "Python",
  "C++",
  "React",
  "TensorFlow",
  "ROS2",
  "Solidity",
  "Embedded C",
  "OpenCV",
  "Go",
  "Node.js",
  "SQL",
  "Arduino",
  "Computer Vision",
  "Deep Learning",
  "Docker",
  "Signal Processing",
];

const INTEREST_OPTIONS = [
  "AI & Machine Learning",
  "Robotics & Hardware",
  "IoT & Embedded Systems",
  "Cybersecurity & Cloud",
  "Blockchain & Web3",
  "Biomedical & AI",
  "Web Development",
];

const HARDWARE_OPTIONS = [
  "None (Software Only)",
  "Raspberry Pi",
  "Arduino / ESP32",
  "NVIDIA Jetson Nano",
  "LiDAR Sensor",
  "EEG Headset",
  "Drone Frame",
];

function FindProjectPage() {
  const [prefs, setPrefs] = useState<StudentPreferences>({
    branch: "Computer Science",
    skills: ["Python", "React"],
    interests: ["AI & Machine Learning"],
    experience_level: "Intermediate",
    budget: 5000,
    available_time_weeks: 8,
    team_size: 3,
    available_hardware: ["None (Software Only)"],
  });

  const [recommendations, setRecommendations] = useState<RecommendationResult[] | null>(null);
  const [aiResponse, setAiResponse] = useState<AiRecommendationResponse | null>(null);
  const [matchingLoading, setMatchingLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  const toggleSkill = (skill: string) => {
    setPrefs((prev) => {
      const exists = prev.skills.includes(skill);
      return {
        ...prev,
        skills: exists ? prev.skills.filter((s) => s !== skill) : [...prev.skills, skill],
      };
    });
  };

  const toggleInterest = (interest: string) => {
    setPrefs((prev) => {
      const exists = prev.interests.includes(interest);
      return {
        ...prev,
        interests: exists ? prev.interests.filter((i) => i !== interest) : [...prev.interests, interest],
      };
    });
  };

  const toggleHardware = (hw: string) => {
    setPrefs((prev) => {
      const exists = prev.available_hardware.includes(hw);
      return {
        ...prev,
        available_hardware: exists ? prev.available_hardware.filter((h) => h !== hw) : [...prev.available_hardware, hw],
      };
    });
  };

  const handleCalculateMatch = async (e: React.FormEvent) => {
    e.preventDefault();
    setAiResponse(null);
    setMatchingLoading(true);

    try {
      // 1. Fetch real Supabase project dataset (with local fallback if empty/offline)
      const allProjects = await fetchAllProjectsForMatching();

      // 2. Run deterministic Matching Engine with exact weighted formula
      const matches = calculateMatchScores(allProjects, prefs);
      const top5 = matches.slice(0, 5);
      setRecommendations(top5);

      // 3. Automatically trigger secure Gemini AI Senior Mentor server call for Top 5 only
      await fetchAiMentorship(top5);
    } catch (err: any) {
      console.error("Match Engine Execution Error:", err);
      toast.error("Failed to calculate project matches.");
    } finally {
      setMatchingLoading(false);
    }
  };

  const fetchAiMentorship = async (topMatches: RecommendationResult[]) => {
    if (topMatches.length === 0) return;

    setAiLoading(true);
    try {
      // SECURITY GUARANTEE: Calls server function generateGeminiMentorship.
      // Send ONLY top 5 candidate projects (never send full dataset)
      const res = await generateGeminiMentorship({
        data: {
          preferences: prefs,
          topProjects: topMatches.map((m) => m.project),
        },
      });

      setAiResponse(res);
      if (res.success) {
        toast.success("Gemini AI Senior Mentor analysis generated!");
      } else {
        toast.warning(res.error || "Gemini API key is not configured on server.");
      }
    } catch (err: any) {
      console.error("Client Error Invoking AI Server Function:", err);
      setAiResponse({
        success: false,
        error: `Server invocation error: ${err?.message || String(err)}`,
      });
      toast.error("Failed to reach Gemini server function.");
    } finally {
      setAiLoading(false);
    }
  };

  const handleReset = () => {
    setPrefs({
      branch: "Computer Science",
      skills: [],
      interests: [],
      experience_level: "Intermediate",
      budget: 5000,
      available_time_weeks: 8,
      team_size: 2,
      available_hardware: ["None (Software Only)"],
    });
    setRecommendations(null);
    setAiResponse(null);
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 sm:py-16 space-y-10">
      <ScrollReveal className="space-y-3 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 rounded-full border border-electric/30 bg-electric/10 px-3.5 py-1 text-xs font-mono font-medium text-electric">
          <Brain className="size-3.5" /> Phase 4 — Gemini AI Integration Active
        </div>
        <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
          Match Projects &amp; Consult <span className="text-electric">Gemini AI Senior Mentor.</span>
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground leading-relaxed">
          Input your engineering profile to query database blueprints, rank matches deterministically, and receive personalized mentorship from our server-side Gemini AI model.
        </p>
      </ScrollReveal>

      {/* Input Preferences Form */}
      <form onSubmit={handleCalculateMatch} className="space-y-8 rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-soft">
        <div className="flex items-center justify-between border-b border-border/60 pb-4">
          <div className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
            <Sliders className="size-5 text-electric" /> Student Preference Profile
          </div>
          <Button type="button" variant="ghost" size="sm" onClick={handleReset} className="gap-1.5 text-xs">
            <RotateCcw className="size-3.5" /> Reset Form
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Engineering Branch */}
          <div className="space-y-2">
            <Label className="text-xs font-mono font-medium uppercase text-muted-foreground">Engineering Branch</Label>
            <Select value={prefs.branch} onValueChange={(val) => setPrefs({ ...prefs, branch: val })}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select branch" />
              </SelectTrigger>
              <SelectContent>
                {BRANCHES.map((b) => (
                  <SelectItem key={b} value={b}>
                    {b}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Experience Level */}
          <div className="space-y-2">
            <Label className="text-xs font-mono font-medium uppercase text-muted-foreground">Experience Level</Label>
            <Select
              value={prefs.experience_level}
              onValueChange={(val: any) => setPrefs({ ...prefs, experience_level: val })}
            >
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Beginner">Beginner (1st/2nd Year)</SelectItem>
                <SelectItem value="Intermediate">Intermediate (3rd Year)</SelectItem>
                <SelectItem value="Advanced">Advanced (Final Year / Capstone)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Team Size */}
          <div className="space-y-2">
            <Label className="text-xs font-mono font-medium uppercase text-muted-foreground">Target Team Size</Label>
            <Select
              value={String(prefs.team_size)}
              onValueChange={(val) => setPrefs({ ...prefs, team_size: Number(val) })}
            >
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select team size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Individual Project (1 Student)</SelectItem>
                <SelectItem value="2">Pair Project (2 Students)</SelectItem>
                <SelectItem value="3">Small Team (3 Students)</SelectItem>
                <SelectItem value="4">Standard Team (4 Students)</SelectItem>
                <SelectItem value="5">Large Team (5 Students)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Max Budget */}
          <div className="space-y-2">
            <Label className="text-xs font-mono font-medium uppercase text-muted-foreground">
              Maximum Budget (₹{prefs.budget.toLocaleString("en-IN")})
            </Label>
            <Input
              type="number"
              min={0}
              step={500}
              value={prefs.budget}
              onChange={(e) => setPrefs({ ...prefs, budget: Number(e.target.value) })}
              className="bg-background"
            />
          </div>

          {/* Time Duration */}
          <div className="space-y-2">
            <Label className="text-xs font-mono font-medium uppercase text-muted-foreground">
              Available Time ({prefs.available_time_weeks} Weeks)
            </Label>
            <Input
              type="number"
              min={2}
              max={24}
              value={prefs.available_time_weeks}
              onChange={(e) => setPrefs({ ...prefs, available_time_weeks: Number(e.target.value) })}
              className="bg-background"
            />
          </div>
        </div>

        {/* Skills Multi-Select */}
        <div className="space-y-3 pt-2">
          <Label className="text-xs font-mono font-medium uppercase text-muted-foreground flex items-center justify-between">
            <span>Your Technical Skills ({prefs.skills.length} Selected)</span>
            <span className="text-[11px] text-muted-foreground lowercase">click to toggle</span>
          </Label>
          <div className="flex flex-wrap gap-2">
            {SKILL_OPTIONS.map((skill) => {
              const active = prefs.skills.includes(skill);
              return (
                <button
                  key={skill}
                  type="button"
                  onClick={() => toggleSkill(skill)}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
                    active
                      ? "bg-electric text-white shadow-soft"
                      : "bg-muted/50 border border-border text-foreground hover:border-electric/50"
                  }`}
                >
                  {active && <Check className="size-3" />}
                  <span>{skill}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Domain Interests Multi-Select */}
        <div className="space-y-3 pt-2">
          <Label className="text-xs font-mono font-medium uppercase text-muted-foreground flex items-center justify-between">
            <span>Domain Interests ({prefs.interests.length} Selected)</span>
            <span className="text-[11px] text-muted-foreground lowercase">click to toggle</span>
          </Label>
          <div className="flex flex-wrap gap-2">
            {INTEREST_OPTIONS.map((interest) => {
              const active = prefs.interests.includes(interest);
              return (
                <button
                  key={interest}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
                    active
                      ? "bg-electric text-white shadow-soft"
                      : "bg-muted/50 border border-border text-foreground hover:border-electric/50"
                  }`}
                >
                  {active && <Check className="size-3" />}
                  <span>{interest}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Hardware Availability */}
        <div className="space-y-3 pt-2">
          <Label className="text-xs font-mono font-medium uppercase text-muted-foreground flex items-center justify-between">
            <span>Available Hardware / Lab Equipment</span>
          </Label>
          <div className="flex flex-wrap gap-2">
            {HARDWARE_OPTIONS.map((hw) => {
              const active = prefs.available_hardware.includes(hw);
              return (
                <button
                  key={hw}
                  type="button"
                  onClick={() => toggleHardware(hw)}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
                    active
                      ? "bg-foreground text-background shadow-soft"
                      : "bg-muted/50 border border-border text-foreground hover:border-foreground/50"
                  }`}
                >
                  {active && <Check className="size-3" />}
                  <span>{hw}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border/60">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Lock className="size-3.5 text-electric shrink-0" />
            <span>Secure Server Function: API key is never exposed to browser.</span>
          </div>

          <Button type="submit" size="lg" variant="electric" disabled={aiLoading} className="gap-2 px-8">
            {aiLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Consulting Gemini AI...
              </>
            ) : (
              <>
                <Sparkles className="size-4" /> Calculate Match &amp; Consult Gemini AI
              </>
            )}
          </Button>
        </div>
      </form>

      {/* Results Section */}
      {recommendations && (
        <div className="space-y-6 pt-6">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-border/80 pb-4 gap-2">
            <div>
              <div className="flex items-center gap-2 font-display text-2xl font-bold tracking-tight text-foreground">
                <Award className="size-6 text-electric" /> Project Recommendations
              </div>
              <p className="text-xs text-muted-foreground">
                Database Facts (Match Scores) generated by local vector ranker. Gemini AI Senior Mentor Guidance generated securely via server function.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="font-mono text-xs">
                Database Engine: Active
              </Badge>
              <Badge variant={aiResponse?.success ? "electric" : "secondary"} className="font-mono text-xs gap-1">
                <Brain className="size-3" /> Gemini AI: {aiResponse?.success ? "Connected" : aiLoading ? "Analyzing..." : "Key Needed"}
              </Badge>
            </div>
          </div>

          {/* Gemini AI Mentor Overview Banner */}
          {aiLoading ? (
            <div className="rounded-2xl border border-electric/30 bg-electric/5 p-6 text-center space-y-3 animate-pulse">
              <div className="flex items-center justify-center gap-2 text-electric font-display font-bold text-base">
                <Loader2 className="size-5 animate-spin" /> Gemini AI Senior Mentor is analyzing your top candidate projects...
              </div>
              <p className="text-xs text-muted-foreground">
                Synthesizing skills to learn, difficulty curves, risks, and actionable first steps...
              </p>
            </div>
          ) : aiResponse ? (
            aiResponse.success ? (
              <div className="rounded-2xl border border-electric/40 bg-gradient-to-r from-electric/10 via-electric/5 to-transparent p-6 space-y-2 shadow-soft">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-display text-base font-bold text-electric">
                    <Brain className="size-5 text-electric" /> Senior Engineering Mentor's Overall Assessment
                  </div>
                  <Badge variant="electric" className="text-[10px] font-mono">Gemini 2.5 Flash</Badge>
                </div>
                <p className="text-sm text-foreground leading-relaxed">
                  {aiResponse.overall_mentor_summary}
                </p>
              </div>
            ) : (
              <div className="rounded-2xl border border-warning/40 bg-warning/5 p-5 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-warning">
                    <AlertCircle className="size-4" /> Gemini AI Status Notice
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => recommendations && fetchAiMentorship(recommendations)}
                    disabled={aiLoading}
                    className="gap-1.5 text-xs"
                  >
                    <Sparkles className="size-3 text-electric" /> Retry AI Mentor
                  </Button>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {aiResponse.error}
                </p>
              </div>
            )
          ) : null}

          {/* Recommendation Cards */}
          {recommendations.length === 0 ? (
            <EmptyState
              title="No high-confidence project matches"
              description="Try adjusting your budget cap or selecting additional skills and interests."
            />
          ) : (
            <div className="space-y-6">
              {recommendations.map((result, idx) => (
                <RecommendationCard
                  key={result.project.id}
                  result={result}
                  rank={idx + 1}
                  aiInsight={aiResponse?.insights?.[result.project.id]}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
