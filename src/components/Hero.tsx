import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import hero from "@/assets/hero-ganesha.jpg";
import { siteConfig } from "@/data/config";
import { Petals } from "./Petals";
import { T, useLang } from "@/lib/lang";

export function Hero() {
  const { lang } = useLang();
  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <img
          src={hero}
          alt="Lord Ganesha adorned with marigold garlands"
          width={1920}
          height={1080}
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover brightness-[0.45]"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-heritage-deep/60 via-transparent to-heritage" />
      </div>

      <Petals />

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-gold font-serif italic text-lg md:text-2xl mb-4 tracking-widest uppercase"
        >
          <T te="ఐదేళ్ళ భక్తి · 2022 — 2026" en="5 Years of Devotion · 2022 — 2026" />
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.15 }}
          className={`text-5xl md:text-8xl mb-4 leading-tight text-cream ${lang === "te" ? "font-telugu" : "font-serif"}`}
        >
          <T te={siteConfig.brandTelugu} en={siteConfig.brandEnglish} />
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.3 }}
          className="text-3xl md:text-5xl font-serif italic mb-8 gold-gradient"
        >
          <T te="ఐదు ఉజ్జ్వల సంవత్సరాలు" en="Celebrating 5 Glorious Years" />
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="text-cream/80 text-base md:text-lg font-light mb-10 max-w-2xl mx-auto"
        >
          <T te={siteConfig.tagline.te} en={siteConfig.tagline.en} />
        </motion.p>

        <motion.a
          href="#story"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="inline-block px-10 py-4 bg-gold text-heritage font-semibold rounded-full hover:bg-saffron transition-all hover:scale-105 active:scale-95 uppercase tracking-widest text-sm animate-diya"
        >
          <T te="మా ప్రయాణం చూడండి" en="Explore Our Journey" />
        </motion.a>
      </div>

      <a
        href="#story"
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gold/60 hover:text-gold animate-bounce"
      >
        <ChevronDown size={32} />
      </a>
    </section>
  );
}
