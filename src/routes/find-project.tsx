import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/page-placeholder";

export const Route = createFileRoute("/find-project")({
  head: () => ({
    meta: [
      { title: "Find Project — SOCHOYHAPE" },
      { name: "description", content: "Browse engineering project ideas. Placeholder for a later phase." },
      { property: "og:title", content: "Find Project — SOCHOYHAPE" },
      { property: "og:description", content: "Browse engineering project ideas. Placeholder for a later phase." },
    ],
  }),
  component: () => <PagePlaceholder title="Find Project" description="Browse engineering project ideas. Placeholder for a later phase." />,
});
