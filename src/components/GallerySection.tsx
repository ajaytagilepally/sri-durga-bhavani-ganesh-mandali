import { useState, useEffect, useCallback, useMemo, memo } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { galleryItems, galleryCategories, type GalleryCategory } from "@/data/gallery";
import { T, useLang } from "@/lib/lang";

const years = ["All", 2022, 2023, 2024, 2025, 2026] as const;

const categoryLabels: Record<GalleryCategory, { te: string; en: string }> = {
  All: { te: "అన్నీ", en: "All" },
  Sthapana: { te: "ప్రతిష్ఠ", en: "Sthapana" },
  Decoration: { te: "అలంకరణ", en: "Decoration" },
  Aarti: { te: "ఆరతి", en: "Aarti" },
  Annadanam: { te: "అన్నదానం", en: "Annadanam" },
  Cultural: { te: "సాంస్కృతిక", en: "Cultural" },
  Visarjan: { te: "విసర్జన", en: "Visarjan" },
};

export const GallerySection = memo(function GallerySection() {
  const { lang } = useLang();
  const [year, setYear] = useState<(typeof years)[number]>("All");
  const [cat, setCat] = useState<GalleryCategory>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = useMemo(
    () =>
      galleryItems.filter(
        (i) => (year === "All" || i.year === year) && (cat === "All" || i.category === cat)
      ),
    [year, cat]
  );

  // Filters change the index space — close any open lightbox to stay in sync.
  useEffect(() => setLightbox(null), [year, cat]);

  const close = useCallback(() => setLightbox(null), []);

  const prev = useCallback(
    () => setLightbox((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length)),
    [filtered.length]
  );
  const next = useCallback(
    () => setLightbox((i) => (i === null ? null : (i + 1) % filtered.length)),
    [filtered.length]
  );

  useEffect(() => {
    if (lightbox === null) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [lightbox, close, prev, next]);

  const allLabel = { te: "అన్నీ", en: "All" };

  return (
    <section id="gallery" className="py-24 md:py-32 px-6 bg-heritage-deep">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-gold text-xs md:text-sm tracking-[0.3em] uppercase mb-3">
            <T te="స్మృతుల చిత్రశాల" en="Memory Gallery" />
          </p>
          <h2 className="text-4xl md:text-6xl font-serif italic mb-4">
            <T te="స్మృతుల చిత్రశాల" en="Memory Gallery" />
          </h2>
          <p className="text-cream/60 max-w-xl mx-auto">
            <T
              te="ప్రతి ఫోటో ఒక కథ. మా ఐదేళ్ల ప్రయాణంలోని ప్రతి క్షణం."
              en="Every frame carries a story from our five-year journey."
            />
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {years.map((y) => (
            <button
              key={String(y)}
              onClick={() => setYear(y)}
              className={`px-4 py-1.5 rounded-full text-xs tracking-widest uppercase transition-all ${
                year === y ? "bg-gold text-heritage" : "border border-gold/30 text-cream/70 hover:border-gold"
              }`}
            >
              {y === "All" ? (lang === "te" ? allLabel.te : allLabel.en) : y}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {galleryCategories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-3 py-1 rounded-full text-[10px] tracking-widest uppercase transition-all ${
                cat === c ? "bg-saffron/90 text-heritage" : "text-cream/50 hover:text-gold"
              }`}
            >
              {lang === "te" ? categoryLabels[c].te : categoryLabels[c].en}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-cream/40 py-24 italic">
            <T te="ఈ ఎంపిక కోసం స్మృతులు ఇంకా లేవు." en="No memories yet for this filter." />
          </p>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [&>*]:mb-4">
            {filtered.map((item, i) => (
              <button
                key={item.src + i}
                onClick={() => setLightbox(i)}
                aria-label={`Open memory: ${item.captionEn} (${item.year})`}
                className="group block w-full break-inside-avoid rounded-xl overflow-hidden border border-gold/10 hover:border-gold/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold transition-all"
              >
                <div className="relative">
                  <img
                    src={item.src}
                    alt={item.captionEn}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto will-change-transform transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-heritage-deep/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity text-left">
                    <p className={lang === "te" ? "text-gold font-telugu text-sm" : "text-gold text-sm font-serif italic"}>

                      {lang === "te" ? item.captionTe : item.captionEn}
                    </p>
                    <p className="text-cream/80 text-xs">{item.year}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {lightbox !== null && filtered[lightbox] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Memory viewer"
          className="fixed inset-0 z-50 bg-heritage-deep/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={close}
        >

          <button
            onClick={(e) => { e.stopPropagation(); close(); }}
            className="absolute top-6 right-6 text-cream/80 hover:text-gold"
            aria-label="Close"
          ><X size={28} /></button>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 md:left-8 text-cream/80 hover:text-gold p-2"
            aria-label="Previous"
          ><ChevronLeft size={40} /></button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 md:right-8 text-cream/80 hover:text-gold p-2"
            aria-label="Next"
          ><ChevronRight size={40} /></button>
          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={filtered[lightbox].src}
              alt={filtered[lightbox].captionEn}
              className="w-full max-h-[80vh] object-contain rounded-lg"
            />
            <div className="text-center mt-4">
              <p className={lang === "te" ? "font-telugu text-gold text-lg" : "text-gold text-lg font-serif italic"}>
                {lang === "te" ? filtered[lightbox].captionTe : filtered[lightbox].captionEn}
              </p>
              <p className="text-cream/60 text-sm">{filtered[lightbox].year}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
});

