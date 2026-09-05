import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/page-placeholder";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore — SOCHOYHAPE" },
      { name: "description", content: "Explore section of SOCHOYHAPE. Placeholder for a later phase." },
      { property: "og:title", content: "Explore — SOCHOYHAPE" },
      { property: "og:description", content: "Explore section of SOCHOYHAPE. Placeholder for a later phase." },
    ],
  }),
  component: () => (
    <PagePlaceholder title="Explore" description="Reserved for browsing content in a later phase." />
  ),
});
