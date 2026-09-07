import { useLang } from "@/lib/lang";

export function LangToggle({ className = "" }: { className?: string }) {
  const { lang, toggle } = useLang();
  return (
    <button
      onClick={toggle}
      aria-label="Toggle language"
      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-gold/40 text-[11px] tracking-widest uppercase text-gold hover:bg-gold/10 transition-colors ${className}`}
    >
      <span className={lang === "te" ? "text-gold" : "text-cream/40"}>తె</span>
      <span className="text-cream/30">/</span>
      <span className={lang === "en" ? "text-gold" : "text-cream/40"}>EN</span>
    </button>
  );
}
