import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/page-placeholder";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works — SOCHOYHAPE" },
      { name: "description", content: "How SOCHOYHAPE will guide students from idea to project. Placeholder for a later phase." },
      { property: "og:title", content: "How It Works — SOCHOYHAPE" },
      { property: "og:description", content: "How SOCHOYHAPE will guide students from idea to project. Placeholder for a later phase." },
    ],
  }),
  component: () => <PagePlaceholder title="How It Works" description="How SOCHOYHAPE will guide students from idea to project. Placeholder for a later phase." />,
});
