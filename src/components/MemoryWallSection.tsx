import { memories } from "@/data/memories";
import { motion } from "framer-motion";
import { T, useLang } from "@/lib/lang";

export function MemoryWallSection() {
  const { lang } = useLang();
  return (
    <section id="memory-wall" className="py-24 md:py-32 px-6 bg-heritage">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-gold text-xs md:text-sm tracking-[0.3em] uppercase mb-3">
            <T te="స్మృతుల గోడ" en="Wall of Memories" />
          </p>
          <h2 className="text-4xl md:text-6xl font-serif italic">
            <T te="స్మృతుల గోడ" en="Wall of Memories" />
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {memories.map((m, i) => (
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.1 }}
              className="glass-card rounded-2xl p-8 border-l-2 border-gold/60"
            >
              {lang === "te" && m.quoteTe ? (
                <p className="font-telugu text-xl text-gold leading-relaxed">"{m.quoteTe}"</p>
              ) : (
                <p className="font-serif italic text-lg text-cream/80 leading-relaxed">"{m.quoteEn}"</p>
              )}
              {m.attribution && (
                <p className="mt-4 text-xs tracking-widest uppercase text-cream/40">— {m.attribution}</p>
              )}
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
