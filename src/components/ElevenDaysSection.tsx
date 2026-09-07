import { useState } from "react";
import { years } from "@/data/years";
import { elevenDays } from "@/data/days";
import { T, Bi, useLang } from "@/lib/lang";

export function ElevenDaysSection() {
  const { lang } = useLang();

  const [year, setYear] = useState<number>(years[0].year);

  const [day, setDay] = useState<number>(1);

  const active = elevenDays.find((d) => d.day === day) ?? elevenDays[0];

  return (
    <section id="eleven-days" className="py-24 md:py-32 px-6 bg-heritage border-y border-gold/10">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-12">
          <p className="text-gold text-xs md:text-sm tracking-[0.3em] uppercase mb-3">
            <T te="11 రోజుల ప్రయాణం" en="The 11-Day Journey" />
          </p>

          <h2 className="text-4xl md:text-6xl font-serif italic mb-4">
            <Bi
              te={<span className="font-telugu">11 రోజుల ఉత్సవం</span>}
              en={<span>The 11-Day Journey</span>}
            />
          </h2>

          <p className="text-cream/60 max-w-xl mx-auto">
            <T
              te="ప్రతి రోజు ఒక ప్రత్యేకత. మా వేడుకలోని ప్రతి రోజును సంవత్సరాల వారీగా అన్వేషించండి."
              en="Every day carries its own meaning. Explore each day of our celebration, year by year."
            />
          </p>
        </div>

        {/* YEAR SELECTOR */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {years.map((item) => (
            <button
              key={item.year}
              type="button"
              onClick={() => setYear(item.year)}
              className={`
                px-4
                py-1.5
                rounded-full
                text-xs
                tracking-widest
                uppercase
                transition-all
                ${
                  year === item.year
                    ? "bg-gold text-heritage"
                    : "border border-gold/30 text-cream/70 hover:border-gold"
                }
              `}
            >
              {item.year}

              {item.upcoming && (
                <span className="ml-2 text-[9px] opacity-70">
                  <T te="త్వరలో" en="SOON" />
                </span>
              )}
            </button>
          ))}
        </div>

        {/* DAY SELECTOR */}
        <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-11 gap-2 mb-10">
          {elevenDays.map((item) => (
            <button
              key={item.day}
              type="button"
              onClick={() => setDay(item.day)}
              className={`
                aspect-square
                rounded-lg
                flex
                flex-col
                items-center
                justify-center
                p-2
                text-center
                transition-all
                ${
                  day === item.day
                    ? "bg-saffron text-heritage shadow-lg shadow-saffron/30"
                    : "glass-card text-cream/70 hover:text-gold hover:border-gold/60"
                }
              `}
            >
              <span className="text-[10px] font-mono tracking-widest opacity-70">
                <T te="రోజు" en="DAY" />
              </span>

              <span className="text-xl font-serif">{String(item.day).padStart(2, "0")}</span>
            </button>
          ))}
        </div>

        {/* ACTIVE DAY */}
        <div className="glass-card rounded-2xl p-8 md:p-12 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-gold mb-2">
            {year} · <T te="రోజు" en="Day" /> {active.day}
          </p>

          <Bi
            te={
              <h3 className="font-telugu text-3xl md:text-4xl text-gold mb-4">{active.titleTe}</h3>
            }
            en={
              <h3 className="font-serif italic text-3xl md:text-4xl text-gold mb-4">
                {active.titleEn}
              </h3>
            }
          />

          <p className="text-cream/70 max-w-2xl mx-auto leading-relaxed">
            {lang === "te" ? active.descriptionTe : active.descriptionEn}
          </p>
        </div>
      </div>
    </section>
  );
}
