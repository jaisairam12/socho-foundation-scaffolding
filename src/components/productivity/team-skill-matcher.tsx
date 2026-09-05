import { useState } from "react";
import { Project } from "@/types/project";
import { TeamMember, TeamSkillAnalysis } from "@/types/productivity";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, UserPlus, ShieldCheck, AlertTriangle, CheckCircle, Trash2 } from "lucide-react";

interface TeamSkillMatcherProps {
  project: Project;
}

export function TeamSkillMatcher({ project }: TeamSkillMatcherProps) {
  const [teamName, setTeamName] = useState("Alpha Capstone Squad");
  const [members, setMembers] = useState<TeamMember[]>([
    { id: "m-1", name: "Alex (Me)", role: "Team Lead / AI Engineer", skills: ["Python", "TensorFlow", "React"] },
    { id: "m-2", name: "Priya", role: "Embedded Systems Specialist", skills: ["C++", "Arduino", "Embedded C"] },
  ]);

  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberRole, setNewMemberRole] = useState("");
  const [newMemberSkills, setNewMemberSkills] = useState("");

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;

    const skillsArray = newMemberSkills
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const newM: TeamMember = {
      id: `m-${Date.now()}`,
      name: newMemberName.trim(),
      role: newMemberRole.trim() || "Developer",
      skills: skillsArray.length > 0 ? skillsArray : ["General Engineering"],
    };

    setMembers([...members, newM]);
    setNewMemberName("");
    setNewMemberRole("");
    setNewMemberSkills("");
  };

  const handleRemoveMember = (id: string) => {
    if (members.length <= 1) return;
    setMembers(members.filter((m) => m.id !== id));
  };

  // Perform Skill Matching Calculation
  const combinedSkillsSet = new Set<string>();
  members.forEach((m) => m.skills.forEach((s) => combinedSkillsSet.add(s.toLowerCase())));

  const reqSkills = project.required_skills.concat(project.technologies);
  const matchedSkills: string[] = [];
  const missingSkills: string[] = [];

  project.required_skills.forEach((req) => {
    const isMatched = Array.from(combinedSkillsSet).some((userSkill) =>
      userSkill.includes(req.toLowerCase()) || req.toLowerCase().includes(userSkill)
    );
    if (isMatched) {
      matchedSkills.push(req);
    } else {
      missingSkills.push(req);
    }
  });

  const totalReq = Math.max(1, project.required_skills.length);
  const coveragePercentage = Math.min(100, Math.round((matchedSkills.length / totalReq) * 100));

  let teamBalanceRating: TeamSkillAnalysis["teamBalanceRating"] = "Balanced";
  if (coveragePercentage >= 80) teamBalanceRating = "Optimal";
  else if (coveragePercentage < 50) teamBalanceRating = "Skill Gap Identified";

  return (
    <Card className="border border-border/80 bg-card p-6 space-y-6 shadow-soft">
      <CardHeader className="p-0 pb-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-display text-xl font-bold text-foreground">
            <Users className="size-5 text-electric" /> Team Skill Composition &amp; Gap Analysis
          </div>
          <Badge
            variant={
              teamBalanceRating === "Optimal"
                ? "success"
                : teamBalanceRating === "Skill Gap Identified"
                ? "destructive"
                : "warning"
            }
          >
            {teamBalanceRating} ({coveragePercentage}% Skill Coverage)
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">
          Analyze combined skills for target project: <span className="font-semibold text-foreground">{project.title}</span>
        </p>
      </CardHeader>

      <CardContent className="p-0 space-y-6">
        {/* Coverage Progress Bar */}
        <div className="space-y-2 rounded-2xl border border-border/60 bg-muted/20 p-4">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-muted-foreground">Prerequisite Skill Coverage</span>
            <span className="font-bold text-foreground">{matchedSkills.length} of {project.required_skills.length} Skills Covered</span>
          </div>
          <Progress value={coveragePercentage} className="h-2" />
        </div>

        {/* Combined Team Members Grid */}
        <div className="space-y-3">
          <div className="text-xs font-mono font-semibold uppercase text-muted-foreground">Current Team Roster ({members.length} Members)</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {members.map((m) => (
              <div key={m.id} className="flex items-start justify-between rounded-xl border border-border/60 bg-background/60 p-3.5 text-xs">
                <div className="space-y-1">
                  <div className="font-display font-bold text-foreground">{m.name}</div>
                  <div className="text-[11px] text-electric font-mono">{m.role}</div>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {m.skills.map((s) => (
                      <span key={s} className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                {members.length > 1 && (
                  <button type="button" onClick={() => handleRemoveMember(m.id)} className="text-muted-foreground hover:text-destructive">
                    <Trash2 className="size-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Skill Overlap & Gap Assessment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="rounded-xl border border-success/30 bg-success/5 p-4 space-y-2">
            <div className="font-bold text-success flex items-center gap-1.5">
              <CheckCircle className="size-4" /> Covered Project Skills
            </div>
            <div className="flex flex-wrap gap-1.5">
              {matchedSkills.length > 0 ? (
                matchedSkills.map((s) => (
                  <span key={s} className="rounded-md bg-success/10 border border-success/20 px-2.5 py-1 text-success font-medium">
                    {s}
                  </span>
                ))
              ) : (
                <span className="text-muted-foreground text-xs italic">No skills covered yet</span>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-warning/30 bg-warning/5 p-4 space-y-2">
            <div className="font-bold text-warning flex items-center gap-1.5">
              <AlertTriangle className="size-4" /> Missing Team Skill Gaps
            </div>
            <div className="flex flex-wrap gap-1.5">
              {missingSkills.length > 0 ? (
                missingSkills.map((s) => (
                  <span key={s} className="rounded-md bg-warning/10 border border-warning/20 px-2.5 py-1 text-warning font-medium">
                    Need: {s}
                  </span>
                ))
              ) : (
                <span className="text-success text-xs font-semibold">100% Complete Skill Coverage!</span>
              )}
            </div>
          </div>
        </div>

        {/* Add Teammate Form */}
        <form onSubmit={handleAddMember} className="rounded-2xl border border-border/80 bg-muted/30 p-4 space-y-3">
          <div className="text-xs font-mono font-semibold text-foreground flex items-center gap-1.5">
            <UserPlus className="size-3.5 text-electric" /> Add Teammate to Team Roster
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Input
              type="text"
              placeholder="Teammate Name (e.g. Rahul)"
              value={newMemberName}
              onChange={(e) => setNewMemberName(e.target.value)}
              className="bg-background text-xs h-9"
              required
            />
            <Input
              type="text"
              placeholder="Role (e.g. Hardware Lead)"
              value={newMemberRole}
              onChange={(e) => setNewMemberRole(e.target.value)}
              className="bg-background text-xs h-9"
            />
            <Input
              type="text"
              placeholder="Skills comma-separated (e.g. ROS2, C++)"
              value={newMemberSkills}
              onChange={(e) => setNewMemberSkills(e.target.value)}
              className="bg-background text-xs h-9"
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" size="sm" variant="electric" disabled={!newMemberName.trim()} className="gap-1.5">
              <UserPlus className="size-3.5" /> Add Member
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
