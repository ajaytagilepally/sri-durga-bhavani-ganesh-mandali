import { siteConfig } from "@/data/config";
import { T, Bi } from "@/lib/lang";

const links = [
  { href: "#top", te: "హోమ్", en: "Home" },
  { href: "#story", te: "మన కథ", en: "Our Journey" },
  { href: "#gallery", te: "గ్యాలరీ", en: "Gallery" },
  { href: "#videos", te: "వీడియోలు", en: "Videos" },
  { href: "#donate", te: "విరాళం", en: "Donate" },
  { href: "#year-5", te: "సంవత్సరం 5", en: "Year 5" },
  { href: "#contact", te: "సంప్రదించండి", en: "Contact" },
];

export function Footer() {
  return (
    <footer className="py-16 border-t border-gold/10 px-6 bg-heritage-deep">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 items-center text-center md:text-left">
        <div>
          <Bi
            te={<h4 className="font-telugu text-2xl text-gold mb-1">{siteConfig.footer.mantraTelugu}</h4>}
            en={<h4 className="text-2xl text-gold mb-1 font-serif italic">{siteConfig.footer.mantraEnglish} 🙏</h4>}
          />
        </div>

        <nav className="flex flex-wrap justify-center gap-6 text-xs tracking-widest uppercase text-cream/60">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-gold transition-colors">
              <T te={l.te} en={l.en} />
            </a>
          ))}
        </nav>

        <div className="md:text-right">
          <p className="text-xs text-cream/50 italic">{siteConfig.footer.dedication}</p>
          <p className="text-[10px] text-cream/30 tracking-widest mt-2">
            © {siteConfig.years} · {siteConfig.brandEnglish}
          </p>
        </div>
      </div>
    </footer>
  );
}
