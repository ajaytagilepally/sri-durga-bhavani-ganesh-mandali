import { motion } from "framer-motion";
import storyImg from "@/assets/story-friends.jpg";
import { Bi, T } from "@/lib/lang";

const lines = [
  { te: "ఒక ఆలోచనతో మొదలైంది...", en: "It started with an idea..." },
  { te: "ఆ ఆలోచన స్నేహితులను ఒకచోట చేర్చింది.", en: "An idea brought friends together." },
  { te: "స్నేహితులు ఒక బృందంగా మారారు.", en: "Friends became a team." },
  { te: "బృందం ఒక సంప్రదాయాన్ని సృష్టించింది.", en: "A team created a tradition." },
  {
    te: "ఇప్పుడు, ఆ సంప్రదాయం ఐదు అందమైన సంవత్సరాలు పూర్తి చేస్తోంది.",
    en: "And now, that tradition completes five beautiful years.",
  },
];

export function StorySection() {
  return (
    <section id="story" className="relative py-24 md:py-40 px-6 bg-heritage">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-gold text-xs md:text-sm tracking-[0.3em] uppercase mb-6">
            <T te="మన కథ" en="Our Story" />
          </p>
          <div className="space-y-8">
            {lines.map((l, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
              >
                <Bi
                  te={
                    <p className="font-telugu text-2xl md:text-3xl text-gold leading-snug">
                      {l.te}
                    </p>
                  }
                  en={
                    <p className="font-serif italic text-2xl md:text-3xl text-gold leading-snug">
                      {l.en}
                    </p>
                  }
                />
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <img
            src={storyImg}
            alt="Friends planning the first Ganesh Utsav"
            loading="lazy"
            width={800}
            height={1000}
            className="w-full aspect-[4/5] object-cover rounded-2xl border border-gold/20"
          />
          <div className="hidden md:block absolute -bottom-8 -left-8 glass-card p-6 rounded-xl max-w-xs">
            <Bi
              te={
                <p className="font-telugu text-gold text-lg">
                  "ఎక్కడ భక్తి ఉందో, అక్కడ కుటుంబం ఉంటుంది."
                </p>
              }
              en={
                <p className="font-serif italic text-gold text-lg">
                  "Where there is faith, there is family."
                </p>
              }
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
