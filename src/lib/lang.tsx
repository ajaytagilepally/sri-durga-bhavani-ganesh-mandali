import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "te" | "en";

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
}

const Ctx = createContext<LangCtx>({ lang: "en", setLang: () => {}, toggle: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("lang")) as Lang | null;
    if (saved === "te" || saved === "en") setLangState(saved);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
  }, []);

  const toggle = useCallback(() => {
    setLangState((prev) => {
      const next: Lang = prev === "en" ? "te" : "en";
      if (typeof window !== "undefined") localStorage.setItem("lang", next);
      return next;
    });
  }, []);

  // Stable context value — prevents every consumer re-rendering on parent renders.
  const value = useMemo<LangCtx>(() => ({ lang, setLang, toggle }), [lang, setLang, toggle]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLang() {
  return useContext(Ctx);
}

/** Renders a Telugu OR English string based on current language. */
export function T({ te, en }: { te: string; en: string }) {
  const { lang } = useLang();
  return <>{lang === "te" ? te : en}</>;
}

/** Wrap two blocks and show only the one matching the current language. */
export function Bi({ te, en }: { te: ReactNode; en: ReactNode }) {
  const { lang } = useLang();
  return <>{lang === "te" ? te : en}</>;
}
