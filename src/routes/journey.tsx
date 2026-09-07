import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { TimelineSection } from "@/components/TimelineSection";
import { ElevenDaysSection } from "@/components/ElevenDaysSection";
import { StatsSection } from "@/components/StatsSection";
import { T, Bi, useLang } from "@/lib/lang";

/* =========================================================
   MANDALI MEMBERS
   Replace these names with your actual member names.
   ========================================================= */

const members = [
  {
    te: "సభ్యుని పేరు 1",
    en: "Member Name 1",
  },
  {
    te: "సభ్యుని పేరు 2",
    en: "Member Name 2",
  },
  {
    te: "సభ్యుని పేరు 3",
    en: "Member Name 3",
  },
  {
    te: "సభ్యుని పేరు 4",
    en: "Member Name 4",
  },
  {
    te: "సభ్యుని పేరు 5",
    en: "Member Name 5",
  },
  {
    te: "సభ్యుని పేరు 6",
    en: "Member Name 6",
  },
  {
    te: "సభ్యుని పేరు 7",
    en: "Member Name 7",
  },
  {
    te: "సభ్యుని పేరు 8",
    en: "Member Name 8",
  },
  {
    te: "సభ్యుని పేరు 9",
    en: "Member Name 9",
  },
  {
    te: "సభ్యుని పేరు 10",
    en: "Member Name 10",
  },
];

/* =========================================================
   MEMBERS SECTION
   ========================================================= */

function MembersSection() {
  const { lang } = useLang();

  return (
    <section
      id="members"
      className="relative py-24 md:py-32 px-6 bg-heritage-deep border-t border-gold/10 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gold/10 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-14">
          <p className="text-gold text-xs md:text-sm tracking-[0.3em] uppercase mb-3">
            <T te="మా కుటుంబం" en="Our Family" />
          </p>

          <h2 className="text-4xl md:text-6xl font-serif italic mb-5">
            <Bi
              te={<span className="font-telugu text-gold">మా మండలి సభ్యులు</span>}
              en={<span className="font-serif italic gold-gradient">Our Mandali Members</span>}
            />
          </h2>

          <p className={`text-cream/60 max-w-2xl mx-auto ${lang === "te" ? "font-telugu" : ""}`}>
            <T
              te="భక్తి, ఐక్యత మరియు ప్రేమతో గణేష్ ఉత్సవాన్ని విజయవంతం చేయడానికి కలిసి పనిచేసే మా మండలి సభ్యులు."
              en="The dedicated members who come together with devotion, unity and love to make our Ganesh Utsav special."
            />
          </p>
        </div>

        {/* MEMBERS GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
          {members.map((member, index) => (
            <div
              key={`${member.en}-${index}`}
              className="group p-5 md:p-6 rounded-2xl border border-gold/20 bg-heritage/40 text-center transition-all duration-300 hover:border-gold/60 hover:bg-gold/10 hover:-translate-y-1"
            >
              {/* Member icon */}
              <div className="mx-auto mb-4 w-11 h-11 rounded-full border border-gold/40 flex items-center justify-center text-gold text-lg transition-transform duration-300 group-hover:scale-110">
                🙏
              </div>

              {/* Member name */}
              <p
                className={`text-cream font-medium leading-relaxed ${
                  lang === "te" ? "font-telugu" : "font-serif"
                }`}
              >
                {lang === "te" ? member.te : member.en}
              </p>

              {/* Member number */}
              <p className="mt-2 text-[9px] tracking-[0.25em] uppercase text-gold/40">
                {String(index + 1).padStart(2, "0")}
              </p>
            </div>
          ))}
        </div>

        {/* BOTTOM MESSAGE */}
        <div className="text-center mt-14">
          <p className="text-gold/70 text-sm">
            <T te="గణపతి బప్పా మోరియా 🙏" en="Ganpati Bappa Morya 🙏" />
          </p>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   JOURNEY ROUTE
   ========================================================= */

export const Route = createFileRoute("/journey")({
  head: () => ({
    meta: [
      {
        title: "5 సంవత్సరాల ప్రయాణం · 5-Year Journey — Ganesh Utsav",
      },
      {
        name: "description",
        content:
          "Year by year from 2022 to 2026 — the timeline, the 11-day rituals, the numbers behind our Utsav, and our Mandali members.",
      },
      {
        property: "og:title",
        content: "Our 5-Year Ganesh Utsav Journey",
      },
      {
        property: "og:description",
        content:
          "Timeline, 11-day ritual journey, milestones and Mandali members from 2022 to 2026.",
      },
      {
        property: "og:type",
        content: "article",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
    ],
  }),

  component: () => (
    <PageShell>
      {/* 1. FIVE YEAR TIMELINE */}
      <TimelineSection />

      {/* 2. 11 DAY JOURNEY */}
      <ElevenDaysSection />

      {/* 3. STATISTICS */}
      <StatsSection />

      {/* 4. MANDALI MEMBERS — LAST SECTION */}
      <MembersSection />
    </PageShell>
  ),
});
