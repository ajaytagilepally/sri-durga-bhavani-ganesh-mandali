import { useState } from "react";
import { Play, X } from "lucide-react";
import { videos } from "@/data/videos";
import { T, useLang } from "@/lib/lang";

export function VideosSection() {
  const { lang } = useLang();
  const [open, setOpen] = useState<string | null>(null);
  const active = videos.find((v) => v.id === open);

  return (
    <section id="videos" className="py-24 md:py-32 px-6 bg-heritage">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-gold text-xs md:text-sm tracking-[0.3em] uppercase mb-3">
            <T te="వీడియో స్మృతులు" en="Video Memories" />
          </p>
          <h2 className="text-4xl md:text-6xl font-serif italic">
            <T te="వీడియో స్మృతులు" en="Video Memories" />
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((v) => (
            <button
              key={v.id}
              onClick={() => setOpen(v.id)}
              className="group text-left rounded-2xl overflow-hidden border border-gold/10 hover:border-gold/50 transition-all"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={v.thumbnail}
                  alt={v.titleEn}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-heritage-deep/40 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-gold/90 grid place-items-center text-heritage transition-transform group-hover:scale-110">
                    <Play size={26} className="translate-x-0.5" fill="currentColor" />
                  </div>
                </div>
                <div className="absolute bottom-3 right-3 bg-heritage-deep/80 text-cream/90 text-xs px-2 py-0.5 rounded">
                  {v.duration}
                </div>
              </div>
              <div className="p-5">
                <p className={lang === "te" ? "font-telugu text-gold" : "text-gold font-serif italic"}>
                  {lang === "te" ? v.titleTe : v.titleEn}
                </p>
                <p className="text-cream/70 text-sm mt-1">{v.year}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 bg-heritage-deep/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setOpen(null)}
        >
          <button className="absolute top-6 right-6 text-cream hover:text-gold" onClick={() => setOpen(null)} aria-label="Close">
            <X size={28} />
          </button>
          <div className="w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            {active.src ? (
              <video src={active.src} controls autoPlay className="w-full h-full" />
            ) : (
              <div className="w-full h-full grid place-items-center text-center px-6">
                <div>
                  <p className={lang === "te" ? "font-telugu text-gold text-2xl mb-3" : "text-gold text-2xl mb-3 font-serif italic"}>
                    {lang === "te" ? active.titleTe : active.titleEn}
                  </p>
                  <p className="text-cream/70">
                    <T te="వీడియో త్వరలో అందుబాటులో ఉంటుంది." en="Video coming soon." />
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
