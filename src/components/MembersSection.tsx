/* eslint-disable prettier/prettier */
import { motion } from "framer-motion";
import { T } from "@/lib/lang";

const members = [
  "Member Name 1",
  "Member Name 2",
  "Member Name 3",
  "Member Name 4",
  "Member Name 5",
  "Member Name 6",
  "Member Name 7",
  "Member Name 8",
  "Member Name 9",
  "Member Name 10",
];

export function MembersSection() {
  return (
    <section className="relative py-20 px-6 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-gold/10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="text-gold text-xs tracking-[0.35em] uppercase mb-3">
            <T te="మా సభ్యులు" en="Our Members" />
          </p>

          <h2 className="text-3xl md:text-4xl text-cream">
            <T te="దుర్గా భవాని గణేష్ మండలి సభ్యులు" en="Durga Bhavani Ganesh Mandali Members" />
          </h2>

          <div className="w-20 h-px bg-gold/50 mx-auto mt-5" />
        </motion.div>

        {/* Members */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {members.map((member, index) => (
            <motion.div
              key={`${member}-${index}`}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.45,
                delay: Math.min(index * 0.04, 0.3),
              }}
              className="group p-5 rounded-xl border border-gold/15 bg-heritage-deep/40 hover:border-gold/50 hover:bg-gold/5 transition-all text-center"
            >
              <div className="w-10 h-10 mx-auto mb-3 rounded-full border border-gold/30 flex items-center justify-center text-gold">
                {index + 1}
              </div>

              <p className="text-cream/90 text-sm md:text-base font-medium">{member}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom message */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center text-cream/50 text-sm mt-10"
        >
          <T te="మన ఐక్యతే మన బలం 🙏" en="Together in devotion, together as one 🙏" />
        </motion.p>
      </div>
    </section>
  );
}
