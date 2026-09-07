import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { PageShell, SectionFallback } from "@/components/PageShell";

const NamaluBrowser = lazy(() =>
  import("@/components/NamaluBrowser").then((m) => ({ default: m.NamaluBrowser })),
);

export const Route = createFileRoute("/namalu")({
  head: () => ({
    meta: [
      { title: "నామాలు · Namaalu & Devotional Prayers — Ganesh Mandali" },
      {
        name: "description",
        content:
          "Ganapathi Namalu, Hanuman Chalisa, Govinda Namalu, Gowri pooja songs, Kumkuma Archana, Ganesh Aarti and daily slokas in Telugu and English.",
      },
      { property: "og:title", content: "Namaalu & Devotional Prayers" },
      {
        property: "og:description",
        content: "A searchable devotional library — namalu, aarti, chalisa and daily pooja slokas.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <PageShell>
      <Suspense fallback={<SectionFallback />}>
        <NamaluBrowser />
      </Suspense>
    </PageShell>
  ),
});
