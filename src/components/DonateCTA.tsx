import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { T, Bi } from "@/lib/lang";

export function DonateCTA() {
  return (
    <section id="donate" className="py-24 px-6 bg-gradient-to-b from-heritage to-heritage-deep">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-4">
            <T te="సేవ · భక్తి" en="Seva · Devotion" />
          </p>
          <h2 className="text-3xl md:text-5xl mb-6">
            <Bi
              te={<span className="font-telugu text-cream">మా సేవలో పాల్గొనండి</span>}
              en={<span className="font-serif italic gold-gradient">Be a part of our Seva</span>}
            />
          </h2>
          <p className="text-cream/70 mb-10 max-w-xl mx-auto leading-relaxed">
            <T
              te="విగ్రహ సేవ, అన్నదానం, లడ్డు వేలం — ప్రతి విరాళం మా వేడుకకు ఆశీర్వాదం."
              en="Idol Seva, Annadanam, Laddu Auction — every contribution is a blessing on our celebration."
            />
          </p>
          <Link
            to="/donate"
            className="inline-block px-10 py-4 border border-gold/60 rounded-full text-gold hover:bg-gold hover:text-heritage-deep transition-all tracking-widest text-sm uppercase"
          >
            <T te="విరాళం సమర్పించండి →" en="Offer Your Seva →" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
