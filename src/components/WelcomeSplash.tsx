import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Petals } from "./Petals";
import { T, Bi } from "@/lib/lang";

interface Props {
  onEnter: () => void;
}

export function WelcomeSplash({ onEnter }: Props) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-heritage-deep">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: "radial-gradient(circle at 50% 45%, rgba(212,175,55,0.28), transparent 60%)",
        }}
      />

      {/* Decorative petals */}
      <Petals />

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        {/* Animated Om */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            {/* Glow */}
            <div className="absolute inset-0 rounded-full bg-gold/15 blur-xl" aria-hidden="true" />

            {/* Om circle */}
            <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full border-2 border-gold/60 flex items-center justify-center bg-heritage/40">
              <span className="font-telugu text-6xl md:text-7xl gold-gradient leading-none">ॐ</span>
            </div>
          </div>
        </motion.div>

        {/* Welcome */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="text-gold text-xs md:text-sm tracking-[0.4em] uppercase mb-6"
        >
          <T te="స్వాగతం" en="Welcome" />
        </motion.p>

        {/* Mandali name */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.35,
            ease: "easeOut",
          }}
          className="text-3xl md:text-5xl mb-3 leading-tight"
        >
          <Bi
            te={<span className="font-telugu text-cream">దుర్గా భవాని గణేష్ మండలి</span>}
            en={
              <span className="font-serif italic gold-gradient">Durga Bhavani Ganesh Mandali</span>
            }
          />
        </motion.h1>

        {/* Location */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.45,
            ease: "easeOut",
          }}
          className="text-cream/70 text-sm md:text-base tracking-widest mb-10"
        >
          <T te="టీచర్స్ కాలనీ, బాన్సవాడ" en="Teachers Colony, Banswada" />
        </motion.p>

        {/* Welcome message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.55,
          }}
          className="text-cream/70 italic max-w-xl mx-auto mb-12"
        >
          <T
            te="గణపతి బప్పా మోరియా! మా ఐదేళ్ళ భక్తి ప్రయాణంలోకి మిమ్మల్ని ఆహ్వానిస్తున్నాము."
            en="Ganpati Bappa Morya! Step into five years of devotion, unity and celebration."
          />
        </motion.p>

        {/* Enter button */}
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.45,
            delay: 0.7,
            ease: "easeOut",
          }}
          onClick={onEnter}
          className="group inline-flex items-center gap-3 px-8 py-4 bg-gold text-heritage font-semibold rounded-full hover:bg-saffron transition-transform duration-200 hover:scale-105 active:scale-95 uppercase tracking-widest text-sm"
        >
          <T te="ప్రవేశించండి" en="Enter" />

          <ChevronRight
            size={20}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </motion.button>
      </div>
    </section>
  );
}
