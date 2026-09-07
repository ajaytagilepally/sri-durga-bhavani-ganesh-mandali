import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { siteConfig } from "@/data/config";
import { useLang, T } from "@/lib/lang";
import { LangToggle } from "./LangToggle";

type RoutePath =
  | "/"
  | "/story"
  | "/journey"
  | "/gallery"
  | "/videos"
  | "/namalu"
  | "/donate"
  | "/supporters"
  | "/pooja-booking"
  | "/admin";

type NavLink = { to: RoutePath; te: string; en: string };

const links: NavLink[] = [
  { to: "/story", te: "కథ", en: "Story" },
  { to: "/journey", te: "ప్రయాణం", en: "Journey" },
  { to: "/gallery", te: "గ్యాలరీ", en: "Gallery" },
  { to: "/videos", te: "వీడియోలు", en: "Videos" },
  { to: "/namalu", te: "నామాలు", en: "Namaalu" },
  { to: "/supporters", te: "భక్తులు", en: "Supporters" },
];

const actions: NavLink[] = [
  { to: "/pooja-booking", te: "పూజ బుకింగ్", en: "Book Pooja" },
  { to: "/donate", te: "విరాళం", en: "Donate" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { lang } = useLang();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const onHome = pathname === "/";

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 24);
    h();
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const solid = scrolled || !onHome || open;

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        solid
          ? "bg-heritage-deep/90 backdrop-blur-xl border-b border-gold/15 shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
          : "bg-gradient-to-b from-heritage-deep/60 to-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 md:h-[72px] flex items-center justify-between gap-3">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5 min-w-0 group">
          <span className="shrink-0 grid place-items-center w-9 h-9 rounded-full border border-gold/40 bg-gold/10 text-gold text-base group-hover:bg-gold/20 transition-colors">
            ॐ
          </span>
          <span className="min-w-0 leading-tight">
            <span
              className={`block truncate text-gold text-[13px] sm:text-[15px] md:text-lg ${
                lang === "te" ? "font-telugu" : "font-serif italic"
              }`}
            >
              <T te={siteConfig.brandTelugu} en={siteConfig.brandEnglish} />
            </span>
            <span className="hidden sm:block text-[9px] tracking-[0.3em] uppercase text-cream/40">
              {siteConfig.years}
            </span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeProps={{ className: "text-gold bg-gold/10" }}
              className="px-3 py-2 rounded-full text-[11px] tracking-[0.18em] uppercase text-cream/70 hover:text-gold hover:bg-gold/5 transition-colors"
            >
              <T te={l.te} en={l.en} />
            </Link>
          ))}
        </div>

        {/* Right cluster */}
        <div className="flex items-center gap-2">
          <div className="hidden lg:flex items-center gap-2">
            <Link
              to={actions[0].to}
              className="px-3.5 py-2 rounded-full border border-gold/40 text-[11px] tracking-[0.18em] uppercase text-gold hover:bg-gold/10 transition-colors"
            >
              <T te={actions[0].te} en={actions[0].en} />
            </Link>
            <Link
              to={actions[1].to}
              className="px-3.5 py-2 rounded-full bg-gold text-heritage-deep text-[11px] tracking-[0.18em] uppercase font-medium hover:bg-gold/90 transition-colors"
            >
              <T te={actions[1].te} en={actions[1].en} />
            </Link>
          </div>
          <LangToggle />
          <Link
            to="/admin"
            title="Admin"
            aria-label="Admin"
            className="hidden sm:grid place-items-center w-9 h-9 rounded-full border border-gold/25 text-cream/60 hover:text-gold hover:border-gold/50 transition-colors text-xs"
          >
            ⚙
          </Link>
          <button
            className="lg:hidden grid place-items-center w-9 h-9 rounded-full border border-gold/40 text-gold"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
          >
            <span className="sr-only">Menu</span>
            <span className="flex flex-col gap-[3px]">
              <span className={`block h-px w-4 bg-gold transition-transform ${open ? "translate-y-[4px] rotate-45" : ""}`} />
              <span className={`block h-px w-4 bg-gold transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`block h-px w-4 bg-gold transition-transform ${open ? "-translate-y-[4px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-[max-height] duration-300 ${
          open ? "max-h-[520px]" : "max-h-0"
        }`}
      >
        <div className="bg-heritage-deep/95 backdrop-blur-xl border-t border-gold/10 px-4 py-4">
          <div className="grid grid-cols-2 gap-2">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeProps={{ className: "text-gold border-gold/40" }}
                className="px-3 py-2.5 rounded-lg border border-gold/15 text-[11px] tracking-[0.18em] uppercase text-cream/75 hover:text-gold"
              >
                <T te={l.te} en={l.en} />
              </Link>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Link
              to={actions[0].to}
              className="px-3 py-2.5 rounded-lg border border-gold/40 text-center text-[11px] tracking-[0.18em] uppercase text-gold"
            >
              <T te={actions[0].te} en={actions[0].en} />
            </Link>
            <Link
              to={actions[1].to}
              className="px-3 py-2.5 rounded-lg bg-gold text-heritage-deep text-center text-[11px] tracking-[0.18em] uppercase font-medium"
            >
              <T te={actions[1].te} en={actions[1].en} />
            </Link>
          </div>
          <Link
            to="/admin"
            className="mt-3 block text-center text-[10px] tracking-[0.3em] uppercase text-cream/40 hover:text-gold"
          >
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}
