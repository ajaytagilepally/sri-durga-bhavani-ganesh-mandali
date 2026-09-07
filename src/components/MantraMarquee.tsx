import { useLang, T } from "@/lib/lang";

const mantras = [
  { te: "ॐ గణేశాయ నమః", en: "Om Ganeshaya Namah" },
  { te: "ॐ విఘ్నేశ్వరాయ నమః", en: "Om Vigneshwaraya Namah" },
];

export function MantraMarquee() {
  const { lang } = useLang();

  // Build the repeating strip so the loop is seamless and long enough.
  const strip = (
    <>
      {mantras.map((m, i) => (
        <span key={i} className="inline-flex items-center gap-6 mx-6">
          <span className="text-2xl md:text-3xl font-telugu gold-gradient">ॐ</span>
          <span className="text-lg md:text-xl font-serif italic tracking-widest text-cream/90 whitespace-nowrap">
            <T te={m.te} en={m.en} />
          </span>
        </span>
      ))}
    </>
  );

  return (
    <div className="relative overflow-hidden border-y border-gold/20 bg-heritage-deep/80 py-4 md:py-5">
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 md:w-20 bg-gradient-to-r from-heritage to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 md:w-20 bg-gradient-to-l from-heritage to-transparent z-10" />

      <div className="animate-marquee flex w-max items-center">
        {strip}
        {strip}
        {strip}
        {strip}
      </div>
    </div>
  );
}
