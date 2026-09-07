import { team } from "@/data/team";
import { T, Bi, useLang } from "@/lib/lang";

export function TeamSection() {
  const { lang } = useLang();
  return (
    <section id="team" className="py-24 md:py-32 px-6 bg-heritage">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-gold text-xs md:text-sm tracking-[0.3em] uppercase mb-3">
            <T te="మా బృందం" en="Our Team" />
          </p>
          <h2 className="text-4xl md:text-6xl font-serif italic mb-4">
            <Bi
              te={<span className="font-telugu">ప్రతి వేడుక వెనుక ఒక బృందం</span>}
              en={<span>Behind Every Celebration Is a Team</span>}
            />
          </h2>
          <p className="text-cream/60 max-w-2xl mx-auto">
            <T
              te="ప్రతి ఉత్సవం వెనుక ఒక ప్రేమగల కుటుంబం ఉంది."
              en="Behind every celebration is a family bound by love and devotion."
            />
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {team.map((m, i) => (
            <div
              key={i}
              className="glass-card rounded-2xl p-6 text-center hover:border-gold/60 transition-all"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full grid place-items-center border border-gold/40 text-gold font-serif text-xl">
                {m.initials}
              </div>
              <p className={lang === "te" ? "font-telugu text-gold text-lg" : "text-gold text-lg font-serif italic"}>
                {lang === "te" ? m.roleTe : m.roleEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
