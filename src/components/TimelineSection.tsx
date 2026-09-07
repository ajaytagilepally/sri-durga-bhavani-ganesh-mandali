import { motion } from "framer-motion";
import { years } from "@/data/years";
import { T, Bi, useLang } from "@/lib/lang";

export function TimelineSection() {
  const { lang } = useLang();

  return (
    <section id="timeline" className="py-24 md:py-32 bg-heritage-deep">
      {/* HEADER */}
      <div className="px-6 md:px-16 mb-16 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
        <div>
          <p className="text-gold text-xs md:text-sm tracking-[0.3em] uppercase mb-3">
            <T te="మా చరిత్ర" en="Our Chronicle" />
          </p>

          <h2 className="text-4xl md:text-6xl font-serif italic">
            <Bi
              te={<span className="font-telugu">ఐదేళ్ల కాలరేఖ</span>}
              en={<span>Five Year Timeline</span>}
            />
          </h2>

          <p className="text-gold/80 mt-2 tracking-wider">2022 — 2026</p>
        </div>

        <p className="hidden md:block text-cream/40 italic">
          <T
            te="సంవత్సరాల గుండా ప్రయాణించడానికి పక్కకి స్క్రోల్ చేయండి →"
            en="Scroll horizontally to travel through the years →"
          />
        </p>
      </div>

      {/* TIMELINE CARDS */}
      <div className="flex overflow-x-auto pb-12 px-6 md:px-16 gap-6 md:gap-8 snap-x no-scrollbar">
        {years.map((year, index) => (
          <motion.div
            key={year.year}
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              margin: "-100px",
            }}
            transition={{
              duration: 0.6,
              delay: index * 0.08,
            }}
            className="flex-none w-[300px] md:w-[380px] snap-center"
          >
            <div
              className={`
                glass-card
                rounded-2xl
                p-6
                group
                cursor-pointer
                hover:border-gold/60
                transition-all
                ${year.upcoming ? "ring-1 ring-saffron/40" : ""}
              `}
            >
              {/* IMAGE */}
              <div className="relative overflow-hidden rounded-xl mb-6 aspect-[4/3]">
                <img
                  src={year.cover}
                  alt={
                    lang === "te"
                      ? `${year.year} — ${year.titleTe}`
                      : `${year.year} — ${year.titleEn}`
                  }
                  loading="lazy"
                  className="
                    w-full
                    h-full
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-110
                  "
                />

                {/* YEAR */}
                <div className="absolute top-4 right-4 bg-heritage-deep/80 px-3 py-1 rounded text-xs font-mono tracking-widest">
                  {year.year}
                </div>

                {/* UPCOMING */}
                {year.upcoming && (
                  <div className="absolute top-4 left-4 bg-saffron text-heritage px-3 py-1 rounded text-[10px] tracking-widest uppercase font-semibold">
                    <T te="రాబోతోంది" en="Upcoming" />
                  </div>
                )}
              </div>

              {/* YEAR LABEL */}
              <p className="text-[10px] tracking-[0.3em] uppercase text-gold/70 mb-2">
                {lang === "te" ? year.yearLabelTe : year.yearLabelEn}
              </p>

              {/* TITLE */}
              <Bi
                te={<h3 className="font-telugu text-2xl text-gold mb-1">{year.titleTe}</h3>}
                en={<h3 className="font-serif italic text-2xl text-gold mb-1">{year.titleEn}</h3>}
              />

              {/* DESCRIPTION */}
              <p className="text-sm text-cream/60 mb-6 leading-relaxed">
                {lang === "te" ? year.descriptionTe : year.descriptionEn}
              </p>

              {/* FOOTER */}
              <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-cream/50 border-t border-gold/10 pt-4 mt-4">
                <span>
                  {year.photos} <T te="ఫోటోలు" en="Photos" />
                </span>

                <span>
                  {year.videos} <T te="వీడియోలు" en="Videos" />
                </span>

                <a href="#gallery" className="text-gold hover:underline">
                  <T te="చూడండి →" en="View →" />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
