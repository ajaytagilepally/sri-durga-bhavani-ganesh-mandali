import { stats } from "@/data/memories";
import { Counter } from "./Counter";
import { T, useLang } from "@/lib/lang";

export function StatsSection() {
  const { lang } = useLang();

  return (
    <section id="stats" className="py-24 md:py-32 px-6 bg-heritage-deep border-y border-gold/10">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-16">
          <p className="text-gold text-xs md:text-sm tracking-[0.3em] uppercase mb-3">
            <T te="సంఖ్యలలో" en="In Numbers" />
          </p>

          <h2 className="text-4xl md:text-6xl font-serif italic">
            <T te="సంఖ్యలలో మా ప్రయాణం" en="Our Journey in Numbers" />
          </h2>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="
                glass-card
                rounded-2xl
                p-8
                text-center
                hover:border-gold/60
                transition-all
              "
            >
              <div className="text-5xl md:text-6xl font-serif text-gold mb-3">
                <Counter value={stat.value} />
              </div>

              <p
                className={
                  lang === "te"
                    ? "font-telugu text-cream/80"
                    : "text-cream/80 tracking-widest uppercase text-xs"
                }
              >
                {lang === "te" ? stat.labelTe : stat.labelEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
