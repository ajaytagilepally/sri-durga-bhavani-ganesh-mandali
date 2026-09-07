import { createFileRoute } from "@tanstack/react-router";
import { lazy, useCallback, useEffect, useState } from "react";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { MantraMarquee } from "@/components/MantraMarquee";
import { Footer } from "@/components/Footer";
import { WelcomeSplash } from "@/components/WelcomeSplash";
import { LazySection } from "@/components/LazySection";
import { siteConfig } from "@/data/config";

// Below-the-fold sections are code-split so the first paint only ships the hero.
const StorySection = lazy(() => import("@/components/StorySection").then((m) => ({ default: m.StorySection })));
const TimelineSection = lazy(() => import("@/components/TimelineSection").then((m) => ({ default: m.TimelineSection })));
const ElevenDaysSection = lazy(() => import("@/components/ElevenDaysSection").then((m) => ({ default: m.ElevenDaysSection })));
const BeforeAfterSection = lazy(() => import("@/components/BeforeAfterSection").then((m) => ({ default: m.BeforeAfterSection })));
const GallerySection = lazy(() => import("@/components/GallerySection").then((m) => ({ default: m.GallerySection })));
const VideosSection = lazy(() => import("@/components/VideosSection").then((m) => ({ default: m.VideosSection })));
const MemoryFilmSection = lazy(() => import("@/components/MemoryFilmSection").then((m) => ({ default: m.MemoryFilmSection })));
const StatsSection = lazy(() => import("@/components/StatsSection").then((m) => ({ default: m.StatsSection })));
const TeamSection = lazy(() => import("@/components/TeamSection").then((m) => ({ default: m.TeamSection })));
const MemoryWallSection = lazy(() => import("@/components/MemoryWallSection").then((m) => ({ default: m.MemoryWallSection })));
const DonateCTA = lazy(() => import("@/components/DonateCTA").then((m) => ({ default: m.DonateCTA })));
const Year5Section = lazy(() => import("@/components/Year5Section").then((m) => ({ default: m.Year5Section })));
const ContactSection = lazy(() => import("@/components/ContactSection").then((m) => ({ default: m.ContactSection })));

const ENTERED_KEY = "gu:entered";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "గణేష్ ఉత్సవం · 5 Years of Devotion | Durga Bhavani Ganesh Mandali" },
      {
        name: "description",
        content:
          "Five years of Ganesh Utsav by Durga Bhavani Ganesh Mandali, Banswada — story, timeline, 11-day journey, gallery and Year 5 celebrations.",
      },
      { property: "og:title", content: "5 Years of Devotion · Durga Bhavani Ganesh Mandali" },
      {
        property: "og:description",
        content:
          "Relive our Ganesh Utsav journey from 2022 to 2026 — memories, rituals, team and the Year 5 celebration.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "5 Years of Devotion · Durga Bhavani Ganesh Mandali" },
      {
        name: "twitter:description",
        content: "Our Ganesh Utsav journey from 2022 to 2026 — memories, rituals, team and Year 5.",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: siteConfig.brandEnglish,
          alternateName: siteConfig.brandTelugu,
          description: siteConfig.tagline.en,
          address: {
            "@type": "PostalAddress",
            streetAddress: siteConfig.addressEnglish,
            addressCountry: "IN",
          },
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(ENTERED_KEY) === "1") setEntered(true);
  }, []);

  const enter = useCallback(() => {
    sessionStorage.setItem(ENTERED_KEY, "1");
    setEntered(true);
  }, []);

  if (!entered) {
    return (
      <div className="min-h-dvh bg-heritage text-cream">
        <WelcomeSplash onEnter={enter} />
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-heritage text-cream">
      <Nav />
      <main>
        <Hero />
        <MantraMarquee />
        <LazySection label="Story"><StorySection /></LazySection>
        <LazySection label="Timeline"><TimelineSection /></LazySection>
        <LazySection label="Eleven days"><ElevenDaysSection /></LazySection>
        <LazySection label="Before & after"><BeforeAfterSection /></LazySection>
        <LazySection label="Gallery"><GallerySection /></LazySection>
        <LazySection label="Videos"><VideosSection /></LazySection>
        <LazySection label="Memory film"><MemoryFilmSection /></LazySection>
        <LazySection label="Stats" height="40vh"><StatsSection /></LazySection>
        <LazySection label="Team"><TeamSection /></LazySection>
        <LazySection label="Memory wall"><MemoryWallSection /></LazySection>
        <LazySection label="Donate" height="40vh"><DonateCTA /></LazySection>
        <LazySection label="Year 5"><Year5Section /></LazySection>
        <LazySection label="Contact" height="60vh"><ContactSection /></LazySection>
      </main>
      <Footer />
    </div>
  );
}
