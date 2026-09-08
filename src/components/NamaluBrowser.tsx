/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, Star } from "lucide-react";
import { namaluCategories, namaluItems, type NamaluCategoryKey } from "@/data/namalu";
import { T, useLang } from "@/lib/lang";

const FAV_KEY = "gu:namalu:favs";

export function NamaluBrowser() {
  const { lang } = useLang();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<NamaluCategoryKey | "all" | "fav">("all");
  const [favs, setFavs] = useState<string[]>([]);
  const [expanded, setExpanded] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(FAV_KEY);
      if (raw) setFavs(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  const toggleFav = (id: string) => {
    setFavs((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      try {
        localStorage.setItem(FAV_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  };

  const toggleExpanded = (id: string) => {
    setExpanded((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const items = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return namaluItems.filter((i) => {
      if (cat === "fav" && !favs.includes(i.id)) return false;
      if (cat !== "all" && cat !== "fav" && i.category !== cat) return false;
      if (!needle) return true;
      return [i.titleTe, i.titleEn, i.bodyTe, i.bodyEn ?? ""]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [q, cat, favs]);

  return (
    <section className="px-6 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-10">
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-3">
            <T te="భక్తి సాహిత్యం" en="Devotional Library" />
          </p>
          <h1 className="text-4xl md:text-5xl mb-3">
            {lang === "te" ? (
              <span className="font-telugu">నామాలు &amp; ప్రార్థనలు</span>
            ) : (
              <span className="font-serif italic gold-gradient">Namaalu &amp; Prayers</span>
            )}
          </h1>
          <p className="text-cream/60 text-sm max-w-xl mx-auto">
            <T
              te="గణపతి నామాలు, ఆరతి, చాలీసా మరియు నిత్య పూజ శ్లోకాలు — వెతకండి, ఇష్టమైనవి గుర్తుంచుకోండి."
              en="Namalu, aarti, chalisa and daily slokas — search, filter and bookmark your favourites."
            />
          </p>
        </header>

        <div className="relative mb-5">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/40" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={lang === "te" ? "వెతకండి…" : "Search prayers…"}
            className="w-full pl-11 pr-4 py-3 rounded-full bg-heritage-deep/60 border border-gold/20 text-cream placeholder:text-cream/40 focus:border-gold/60 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { key: "all" as const, te: "అన్నీ", en: "All" },
            ...namaluCategories,
            { key: "fav" as const, te: "ఇష్టమైనవి", en: "Favourites" },
          ].map((c) => (
            <button
              key={c.key}
              onClick={() => setCat(c.key as any)}
              className={`px-4 py-1.5 rounded-full border text-xs tracking-widest uppercase transition-colors ${
                cat === c.key
                  ? "bg-gold text-heritage-deep border-gold"
                  : "border-gold/25 text-cream/70 hover:border-gold/60"
              }`}
            >
              <T te={c.te} en={c.en} />
            </button>
          ))}
        </div>

        <div className="space-y-5">
          {items.map((i, idx) => {
            const body = lang === "te" ? i.bodyTe : (i.bodyEn ?? i.bodyTe);
            const lines = body.split("\n");
            const isExpanded = expanded.includes(i.id);
            const hasMore = lines.length > 5;
            const displayedBody = isExpanded ? body : lines.slice(0, 5).join("\n");

            return (
              <motion.article
                key={i.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(idx * 0.04, 0.3) }}
                className="rounded-2xl border border-gold/20 bg-heritage-deep/50 p-6"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h2
                    className={`text-xl text-gold ${lang === "te" ? "font-telugu" : "font-serif italic"}`}
                  >
                    {lang === "te" ? i.titleTe : i.titleEn}
                  </h2>
                  <button
                    onClick={() => toggleFav(i.id)}
                    aria-label="Bookmark"
                    className={`shrink-0 p-2 rounded-full border transition-colors ${
                      favs.includes(i.id)
                        ? "border-gold bg-gold/20 text-gold"
                        : "border-gold/25 text-cream/50 hover:text-gold"
                    }`}
                  >
                    <Star size={14} fill={favs.includes(i.id) ? "currentColor" : "none"} />
                  </button>
                </div>

                <pre
                  className={`whitespace-pre-wrap leading-relaxed text-cream/85 text-[15px] md:text-base ${
                    lang === "te" ? "font-telugu" : "font-sans"
                  }`}
                >
                  {displayedBody}
                </pre>

                {hasMore && (
                  <button
                    onClick={() => toggleExpanded(i.id)}
                    className="mt-4 text-gold text-sm font-medium hover:underline"
                  >
                    {isExpanded
                      ? lang === "te"
                        ? "తక్కువ చూపించు"
                        : "View Less"
                      : lang === "te"
                        ? "మరింత చూడండి"
                        : "View More"}
                  </button>
                )}

                {lang === "en" && !i.bodyEn && (
                  <p className="mt-3 text-[11px] text-cream/40 uppercase tracking-widest">
                    Telugu text · English translation coming soon
                  </p>
                )}
              </motion.article>
            );
          })}
          {items.length === 0 && (
            <p className="text-center text-cream/50 py-16 text-sm">
              <T te="ఏమీ దొరకలేదు." en="Nothing found." />
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
