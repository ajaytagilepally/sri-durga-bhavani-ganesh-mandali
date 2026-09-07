import { Play } from "lucide-react";
import hero from "@/assets/hero-ganesha.jpg";
import { T, Bi } from "@/lib/lang";

export function MemoryFilmSection() {
  return (
    <section id="film" className="relative py-24 md:py-32 px-6 bg-heritage-deep overflow-hidden">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-gold text-xs md:text-sm tracking-[0.3em] uppercase mb-3">
          <T te="ప్రత్యేక సినిమాటిక్ ఫిల్మ్" en="A Cinematic Anniversary Film" />
        </p>
        <h2 className="text-4xl md:text-7xl font-serif italic mb-4">
          <Bi
            te={<span className="font-telugu">ఐదేళ్ళు · ఒకే ప్రయాణం</span>}
            en={
              <>
                5 Years. <span className="gold-gradient">One Journey.</span>
              </>
            }
          />
        </h2>
        <p className="text-cream/60 max-w-2xl mx-auto mb-12">
          <T
            te="ఐదు సంవత్సరాల ఉత్తమ క్షణాలను ఒక సినిమాటిక్ ఫిల్మ్‌లో చూడండి."
            en="Watch five years of unforgettable moments woven into a single cinematic film."
          />
        </p>

        <div className="relative aspect-video rounded-3xl overflow-hidden border border-gold/30 group cursor-pointer">
          <img
            src={hero}
            alt="5-Year Anniversary Film"
            loading="lazy"
            className="w-full h-full object-cover brightness-50 group-hover:brightness-75 transition-all duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gold/90 grid place-items-center text-heritage animate-diya">
              <Play size={48} className="translate-x-1" fill="currentColor" />
            </div>
          </div>
          <div className="absolute bottom-6 left-6 text-left">
            <Bi
              te={<p className="font-telugu text-gold text-xl">ఐదేళ్ళ ప్రయాణం</p>}
              en={<p className="text-gold text-xl font-serif italic">The Anniversary Film</p>}
            />
            <p className="text-cream/70 text-sm">
              <T te="త్వరలో" en="Coming Soon" />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
