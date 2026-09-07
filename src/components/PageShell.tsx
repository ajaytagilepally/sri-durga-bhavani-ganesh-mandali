import type { ReactNode } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-heritage text-cream">
      <Nav />
      <main className="pt-24">{children}</main>
      <Footer />
    </div>
  );
}

export function SectionFallback() {
  return (
    <div className="py-32 text-center text-cream/50 text-sm tracking-widest uppercase">Loading…</div>
  );
}
