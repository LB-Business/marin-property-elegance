import { createFileRoute } from "@tanstack/react-router";
import { PrivacyPage } from "@/components/PrivacyPage";
import policy from "@/content/privacy.json";

export const Route = createFileRoute("/politica-de-privacidad")({
  head: () => ({
    meta: [
      { title: policy.title },
      { name: "description", content: policy.description },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: policy.title },
      { property: "og:description", content: policy.description },
      { property: "og:url", content: policy.url },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: policy.title },
      { name: "twitter:description", content: policy.description },
    ],
    links: [{ rel: "canonical", href: policy.url }],
  }),
  component: PrivacyPage,
});
