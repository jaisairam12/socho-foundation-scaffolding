import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { LogoMark } from "@/components/brand/logo";
import { toast } from "sonner";
import { User, Mail, Lock, GraduationCap, ArrowRight, Sparkles } from "lucide-react";

export const Route = createFileRoute("/get-started")({
  head: () => ({
    meta: [
      { title: "Get Started — Create Student Profile — SOCHOYHAPE" },
      { name: "description", content: "Create your student engineering profile to access project recommendations, AI mentorship, and capstone roadmap tracking." },
    ],
  }),
  component: GetStartedPage,
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

function GetStartedPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [branch, setBranch] = useState("Computer Science");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("Please fill in all required profile fields.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success(`Welcome to SOCHOYHAPE, ${name}! Profile created.`);
      navigate({ to: "/find-project" });
    }, 600);
  };

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col justify-center px-4 py-16 sm:py-24 space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 font-display text-lg font-bold tracking-[0.12em]">
          <LogoMark /> SOCHOYHAPE
        </div>
        <h1 className="font-display text-2xl font-extrabold text-foreground">
          Create Your Student Profile
        </h1>
        <p className="text-xs text-muted-foreground">
          Unlock personalized project recommendations &amp; Gemini AI senior mentorship.
        </p>
      </div>

      <Card className="border border-border/80 bg-card p-6 space-y-4 shadow-soft">
        <CardHeader className="p-0 pb-2 flex items-center justify-between">
          <CardTitle className="text-base font-bold text-foreground">Student Onboarding</CardTitle>
          <Badge variant="electric" className="text-[10px] font-mono gap-1">
            <Sparkles className="size-3" /> Quick Setup
          </Badge>
        </CardHeader>

        <form onSubmit={handleRegister} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <Label className="text-xs font-mono text-muted-foreground uppercase">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="e.g., Alex Johnson"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-9 h-10 bg-background text-xs"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-mono text-muted-foreground uppercase">University Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="email"
                placeholder="alex@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-9 h-10 bg-background text-xs"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-mono text-muted-foreground uppercase">Engineering Branch</Label>
            <Select value={branch} onValueChange={setBranch}>
              <SelectTrigger className="bg-background h-10 text-xs">
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

          <div className="space-y-1.5">
            <Label className="text-xs font-mono text-muted-foreground uppercase">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="password"
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-9 h-10 bg-background text-xs"
                required
              />
            </div>
          </div>

          <Button type="submit" variant="electric" disabled={loading} className="w-full h-10 gap-2">
            <span>{loading ? "Creating Profile..." : "Create Account & Find Projects"}</span>
            <ArrowRight className="size-4" />
          </Button>
        </form>
      </Card>

      <div className="text-center text-xs text-muted-foreground">
        Already have an account?{" "}
        <Link to="/sign-in" className="font-semibold text-electric hover:underline">
          Sign In
        </Link>
      </div>
    </div>
  );
}
