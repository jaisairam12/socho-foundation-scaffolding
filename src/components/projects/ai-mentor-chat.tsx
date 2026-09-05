import { useState, useRef, useEffect } from "react";
import { chatWithProjectMentor } from "@/lib/gemini-mentor.functions";
import { Project } from "@/types/project";
import { ChatMessage } from "@/types/ai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Brain, Send, User, Loader2, Sparkles } from "lucide-react";

interface AiMentorChatProps {
  project: Project;
}

export function AiMentorChat({ project }: AiMentorChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init-1",
      sender: "mentor",
      text: `Hey there! I'm your Senior Engineering Mentor for "${project.title}". Ask me anything about system architecture, setting up ${project.technologies.slice(0, 2).join(" & ")}, debugging roadmap steps, or preparing for your lab review!`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input.trim();
    setInput("");

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "user",
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const historyPayload = messages.map((m) => ({
        role: m.sender === "user" ? ("user" as const) : ("assistant" as const),
        content: m.text,
      }));

      const res = await chatWithProjectMentor({
        data: {
          projectTitle: project.title,
          projectDomain: project.domain,
          projectTech: project.technologies,
          history: historyPayload,
          userMessage: userText,
        },
      });

      if (res.success && res.reply) {
        const mentorMsg: ChatMessage = {
          id: `msg-${Date.now() + 1}`,
          sender: "mentor",
          text: res.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, mentorMsg]);
      } else {
        const errorMsg: ChatMessage = {
          id: `msg-${Date.now() + 1}`,
          sender: "mentor",
          text: `⚠️ Mentor Note: ${res.error || "Please set GEMINI_API_KEY in server environment to enable live AI chat."}`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, errorMsg]);
      }
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: "mentor",
        text: `⚠️ Network error communicating with Gemini server function.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[520px] rounded-3xl border border-electric/30 bg-card shadow-soft overflow-hidden">
      {/* Chat Header */}
      <div className="flex items-center justify-between border-b border-border/80 bg-muted/40 px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-xl bg-electric/10 text-electric">
            <Brain className="size-4" />
          </div>
          <div>
            <div className="flex items-center gap-2 font-display text-sm font-bold text-foreground">
              <span>Gemini AI Senior Mentor</span>
              <Badge variant="electric" className="text-[10px] font-mono">Live Assistant</Badge>
            </div>
            <div className="text-[11px] text-muted-foreground truncate max-w-xs">
              Context: {project.title}
            </div>
          </div>
        </div>

        <Badge variant="outline" className="gap-1 font-mono text-[10px]">
          <Sparkles className="size-3 text-electric" /> Mentor Persona
        </Badge>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-background/50 text-xs">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start gap-2.5 ${m.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
          >
            <div
              className={`flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                m.sender === "user" ? "bg-primary text-primary-foreground" : "bg-electric text-white"
              }`}
            >
              {m.sender === "user" ? <User className="size-3.5" /> : <Brain className="size-3.5" />}
            </div>

            <div
              className={`max-w-[82%] rounded-2xl p-3.5 text-xs leading-relaxed space-y-1 ${
                m.sender === "user"
                  ? "bg-primary text-primary-foreground rounded-tr-none"
                  : "bg-muted/80 border border-border/80 text-foreground rounded-tl-none"
              }`}
            >
              <div className="whitespace-pre-wrap">{m.text}</div>
              <div className={`text-[10px] text-right ${m.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                {m.timestamp}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground italic pl-2">
            <Loader2 className="size-3.5 animate-spin text-electric" />
            <span>Senior mentor is thinking...</span>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSendMessage} className="flex items-center gap-2 border-t border-border/80 p-3 bg-card">
        <Input
          type="text"
          placeholder={`Ask senior mentor about ${project.domain.toLowerCase()}, tech, debugging...`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 text-xs h-10 bg-background"
        />
        <Button type="submit" size="sm" variant="electric" disabled={!input.trim() || loading} className="gap-1.5 h-10 px-4">
          <Send className="size-3.5" />
          <span className="hidden sm:inline">Send</span>
        </Button>
      </form>
    </div>
  );
}
