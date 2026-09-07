import { beforeAfterSteps } from "@/data/memories";
import { motion } from "framer-motion";
import { T, Bi, useLang } from "@/lib/lang";

export function BeforeAfterSection() {
  const { lang } = useLang();
  return (
    <section id="before-after" className="py-24 md:py-32 px-6 bg-heritage-deep">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-gold text-xs md:text-sm tracking-[0.3em] uppercase mb-3">
            <T te="వెనుక కృషి" en="Behind the Scenes" />
          </p>
          <h2 className="text-4xl md:text-6xl font-serif italic mb-4">
            <Bi
              te={<span className="font-telugu">ఖాళీ స్థలం నుండి వేడుక వరకు</span>}
              en={<span>From Empty Space to Celebration</span>}
            />
          </h2>
          <p className="text-cream/60 max-w-2xl mx-auto">
            <T
              te="గణేష్ ఉత్సవం ఒక్క వేడుక కాదు — అది వందల మంది కృషి, భక్తి మరియు సమన్వయం."
              en="Ganesh Utsav isn't just a celebration — it's the work, devotion and coordination of hundreds of hands."
            />
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent" />
          <div className="space-y-12 md:space-y-16">
            {beforeAfterSteps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className={`relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-16 md:items-center ${
                  i % 2 === 0 ? "" : "md:direction-rtl"
                }`}
              >
<<<<<<< HEAD
                <div
                  className={`${i % 2 === 0 ? "md:pr-8 md:text-right" : "md:col-start-2 md:pl-8"}`}
                >
=======
                <div className={`${i % 2 === 0 ? "md:pr-8 md:text-right" : "md:col-start-2 md:pl-8"}`}>
>>>>>>> 15dbc36 (Updated)
                  <div className="absolute left-0 md:left-1/2 top-2 -translate-x-[7px] md:-translate-x-1/2 w-4 h-4 rounded-full bg-gold animate-diya" />
                  <p className="text-[10px] tracking-[0.3em] uppercase text-gold/70 mb-2">
                    <T te="దశ" en="Step" /> {String(i + 1).padStart(2, "0")}
                  </p>
                  <Bi
<<<<<<< HEAD
                    te={
                      <h3 className="font-telugu text-2xl md:text-3xl text-gold mb-2">
                        {s.titleTe}
                      </h3>
                    }
                    en={
                      <h3 className="font-serif italic text-2xl md:text-3xl text-gold mb-2">
                        {s.titleEn}
                      </h3>
                    }
=======
                    te={<h3 className="font-telugu text-2xl md:text-3xl text-gold mb-2">{s.titleTe}</h3>}
                    en={<h3 className="font-serif italic text-2xl md:text-3xl text-gold mb-2">{s.titleEn}</h3>}
>>>>>>> 15dbc36 (Updated)
                  />
                  {lang === "en" && <p className="text-cream/60 text-sm">{s.desc}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
