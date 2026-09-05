import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LogoMark } from "@/components/brand/logo";
import { toast } from "sonner";
import { Lock, Mail, ArrowRight, ShieldCheck, UserCheck } from "lucide-react";

export const Route = createFileRoute("/sign-in")({
  head: () => ({
    meta: [
      { title: "Sign In — SOCHOYHAPE Student Portal" },
      { name: "description", content: "Sign in to your SOCHOYHAPE engineering student profile to access saved project blueprints and roadmap progress." },
    ],
  }),
  component: SignInPage,
});

function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in both email and password.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Signed in successfully!");
      navigate({ to: "/dashboard" });
    }, 600);
  };

  const handleGuestLogin = () => {
    toast.info("Continuing in Guest Mode with full platform access.");
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="mx-auto flex w-full max-w-md flex-col justify-center px-4 py-16 sm:py-24 space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 font-display text-lg font-bold tracking-[0.12em]">
          <LogoMark /> SOCHOYHAPE
        </div>
        <h1 className="font-display text-2xl font-extrabold text-foreground">
          Welcome to Your Student Portal
        </h1>
        <p className="text-xs text-muted-foreground">
          Sign in to manage your engineering project roadmap &amp; recommendations.
        </p>
      </div>

      <Card className="border border-border/80 bg-card p-6 space-y-4 shadow-soft">
        <CardHeader className="p-0 pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-bold text-foreground">Sign In</CardTitle>
            <Badge variant="electric" className="text-[10px] font-mono">
              Supabase Auth
            </Badge>
          </div>
        </CardHeader>

        <form onSubmit={handleSignIn} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <Label className="text-xs font-mono text-muted-foreground uppercase">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="email"
                placeholder="student@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-9 h-10 bg-background text-xs"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-mono text-muted-foreground uppercase">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-9 h-10 bg-background text-xs"
                required
              />
            </div>
          </div>

          <Button type="submit" variant="electric" disabled={loading} className="w-full h-10 gap-2">
            <span>{loading ? "Signing in..." : "Sign In to Dashboard"}</span>
            <ArrowRight className="size-4" />
          </Button>
        </form>

        <div className="relative py-2 text-center text-[11px] text-muted-foreground">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <span className="relative bg-card px-2">OR</span>
        </div>

        <Button type="button" variant="outline" onClick={handleGuestLogin} className="w-full h-10 gap-2">
          <UserCheck className="size-4 text-electric" />
          <span>Continue as Guest Student</span>
        </Button>
      </Card>

      <div className="text-center text-xs text-muted-foreground">
        Don't have an account?{" "}
        <Link to="/get-started" className="font-semibold text-electric hover:underline">
          Create Student Profile
        </Link>
      </div>
    </div>
  );
}
