import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { StorySection } from "@/components/StorySection";
import { BeforeAfterSection } from "@/components/BeforeAfterSection";
import { TeamSection } from "@/components/TeamSection";

export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title: "మా కథ · Our Story — Sri Durga Bhavani Ganesh Mandali" },
      {
        name: "description",
        content:
          "How Sri Durga Bhavani Ganesh Mandali of Teachers Colony, Banswada began — the story behind five years of Ganesh Utsav.",
      },
      { property: "og:title", content: "Our Story · Sri Durga Bhavani Ganesh Mandali" },
      { property: "og:description", content: "The people and devotion behind five years of Ganesh Utsav in Banswada." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <PageShell>
      <StorySection />
      <BeforeAfterSection />
      <TeamSection />
    </PageShell>
  ),
});
