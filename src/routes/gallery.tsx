import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { PageShell, SectionFallback } from "@/components/PageShell";

const GallerySection = lazy(() =>
  import("@/components/GallerySection").then((m) => ({ default: m.GallerySection })),
);

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "గ్యాలరీ · Gallery — Sri Durga Bhavani Ganesh Mandali" },
      {
        name: "description",
        content: "Photo memories from five years of Ganesh Utsav at Teachers Colony, Banswada.",
      },
      { property: "og:title", content: "Ganesh Utsav Photo Gallery" },
      { property: "og:description", content: "Five years of pandal, pooja, processions and people — in pictures." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <PageShell>
      <Suspense fallback={<SectionFallback />}>
        <GallerySection />
      </Suspense>
    </PageShell>
  ),
});
