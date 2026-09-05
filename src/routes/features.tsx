import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/page-placeholder";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features — SOCHOYHAPE" },
      { name: "description", content: "What SOCHOYHAPE offers. Placeholder for a later phase." },
      { property: "og:title", content: "Features — SOCHOYHAPE" },
      { property: "og:description", content: "What SOCHOYHAPE offers. Placeholder for a later phase." },
    ],
  }),
  component: () => <PagePlaceholder title="Features" description="What SOCHOYHAPE offers. Placeholder for a later phase." />,
});
