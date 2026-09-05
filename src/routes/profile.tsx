import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/page-placeholder";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — SOCHOYHAPE" },
      { name: "description", content: "Profile section of SOCHOYHAPE. Placeholder for a later phase." },
      { property: "og:title", content: "Profile — SOCHOYHAPE" },
      { property: "og:description", content: "Profile section of SOCHOYHAPE. Placeholder for a later phase." },
    ],
  }),
  component: () => (
    <PagePlaceholder title="Profile" description="Reserved for account and personal details once sign-in exists." />
  ),
});
