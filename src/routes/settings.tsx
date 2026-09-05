import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/page-placeholder";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — SOCHOYHAPE" },
      { name: "description", content: "Settings section of SOCHOYHAPE. Placeholder for a later phase." },
      { property: "og:title", content: "Settings — SOCHOYHAPE" },
      { property: "og:description", content: "Settings section of SOCHOYHAPE. Placeholder for a later phase." },
    ],
  }),
  component: () => (
    <PagePlaceholder title="Settings" description="Reserved for preferences in a later phase." />
  ),
});
