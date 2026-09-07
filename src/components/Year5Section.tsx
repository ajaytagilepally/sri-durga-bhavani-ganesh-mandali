import { Calendar, MapPin } from "lucide-react";
import { Countdown } from "./Countdown";
import { siteConfig } from "@/data/config";
import { T, Bi } from "@/lib/lang";

export function Year5Section() {
  const { year5 } = siteConfig;
  return (
    <section
      id="year-5"
      className="relative py-24 md:py-40 px-6 overflow-hidden bg-heritage"
    >
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(212,175,55,0.3), transparent 70%)",
        }}
      />
      <div className="relative max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-gold/40 backdrop-blur-sm mb-8">
          <span className="w-2 h-2 rounded-full bg-saffron animate-diya" />
          <span className="text-gold tracking-[0.3em] font-light text-sm">
            <T te="త్వరలో · 2026" en="Coming Soon · 2026" />
          </span>
        </div>

        <h2 className="text-4xl md:text-6xl mb-4">
          <Bi
            te={<span className="font-telugu text-gold">ఐదవ వార్షికోత్సవం</span>}
            en={<span className="font-serif italic gold-gradient">Fifth Anniversary</span>}
          />
        </h2>
        <h3 className="text-3xl md:text-5xl font-serif italic mb-6">
          <T te="ప్రయాణం కొనసాగుతుంది" en="The Journey Continues" />
        </h3>
        <p className="text-cream/70 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-serif italic">
          <T
            te="మా ఐదవ వార్షికోత్సవం — భక్తితో నిండిన మైలురాయి."
            en="Celebrating our 5th anniversary — a milestone written in devotion."
          />
        </p>

        <div className="max-w-2xl mx-auto mb-12">
          <Countdown />
        </div>

        <div className="glass-card rounded-2xl p-8 md:p-12 max-w-3xl mx-auto">
          <Bi
            te={<p className="font-telugu text-xl md:text-2xl text-gold mb-6">{year5.inviteTelugu}</p>}
            en={<p className="text-cream/80 font-serif italic text-lg md:text-xl mb-6">{year5.inviteEnglish}</p>}
          />
          <div className="flex flex-wrap justify-center gap-6 text-sm text-cream/80 mb-8">
            <span className="inline-flex items-center gap-2">
              <Calendar size={16} className="text-gold" />
              {year5.dateLabel}
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin size={16} className="text-gold" />
              {year5.locationLabel}
            </span>
            <a
              href={year5.mapUrl}
              target="_blank"
              rel="noopener noreferrer"

              className="text-gold underline hover:text-saffron"
            >
              <T te="గూగుల్ మ్యాప్‌లో చూడండి →" en="View on Google Maps →" />
            </a>
          </div>
          <button className="px-10 py-4 bg-gold text-heritage font-semibold rounded-full hover:bg-saffron transition-all uppercase tracking-widest text-sm">
            <T te="ఐదవ సంవత్సరంలో పాలుపంచుకోండి" en="Join Us for Year 5" />
          </button>
        </div>
      </div>
    </section>
  );
}
