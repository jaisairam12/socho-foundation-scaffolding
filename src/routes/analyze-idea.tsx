import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/page-placeholder";

export const Route = createFileRoute("/analyze-idea")({
  head: () => ({
    meta: [
      { title: "Analyze Idea — SOCHOYHAPE" },
      { name: "description", content: "Submit an idea for analysis. Placeholder — no analysis exists yet." },
      { property: "og:title", content: "Analyze Idea — SOCHOYHAPE" },
      { property: "og:description", content: "Submit an idea for analysis. Placeholder — no analysis exists yet." },
    ],
  }),
  component: () => <PagePlaceholder title="Analyze Idea" description="Submit an idea for analysis. Placeholder — no analysis exists yet." />,
});
