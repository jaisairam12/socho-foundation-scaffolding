import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/page-placeholder";

export const Route = createFileRoute("/sign-in")({
  head: () => ({
    meta: [
      { title: "Sign In — SOCHOYHAPE" },
      { name: "description", content: "Sign in to SOCHOYHAPE. Accounts are not enabled yet." },
      { property: "og:title", content: "Sign In — SOCHOYHAPE" },
      { property: "og:description", content: "Sign in to SOCHOYHAPE. Accounts are not enabled yet." },
    ],
  }),
  component: () => <PagePlaceholder title="Sign In" description="Sign in to SOCHOYHAPE. Accounts are not enabled yet." />,
});
