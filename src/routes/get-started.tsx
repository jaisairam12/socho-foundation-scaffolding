import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/page-placeholder";

export const Route = createFileRoute("/get-started")({
  head: () => ({
    meta: [
      { title: "Get Started — SOCHOYHAPE" },
      { name: "description", content: "Create your SOCHOYHAPE account. Accounts are not enabled yet." },
      { property: "og:title", content: "Get Started — SOCHOYHAPE" },
      { property: "og:description", content: "Create your SOCHOYHAPE account. Accounts are not enabled yet." },
    ],
  }),
  component: () => <PagePlaceholder title="Get Started" description="Create your SOCHOYHAPE account. Accounts are not enabled yet." />,
});
