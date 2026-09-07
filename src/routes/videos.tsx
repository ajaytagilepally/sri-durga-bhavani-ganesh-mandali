import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { PageShell, SectionFallback } from "@/components/PageShell";

const VideosSection = lazy(() =>
  import("@/components/VideosSection").then((m) => ({ default: m.VideosSection })),
);
const MemoryFilmSection = lazy(() =>
  import("@/components/MemoryFilmSection").then((m) => ({ default: m.MemoryFilmSection })),
);

export const Route = createFileRoute("/videos")({
  head: () => ({
    meta: [
      { title: "వీడియోలు · Videos — Sri Durga Bhavani Ganesh Mandali" },
      {
        name: "description",
        content: "Video memories and the anniversary film of our Ganesh Utsav in Banswada.",
      },
      { property: "og:title", content: "Ganesh Utsav Video Memories" },
      { property: "og:description", content: "Watch the moments — aartis, processions and our anniversary film." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <PageShell>
      <Suspense fallback={<SectionFallback />}>
        <VideosSection />
        <MemoryFilmSection />
      </Suspense>
    </PageShell>
  ),
});
