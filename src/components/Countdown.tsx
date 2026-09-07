import { useEffect, useState } from "react";
import { siteConfig } from "@/data/config";

function diff(target: Date) {
  const now = new Date();
  const ms = Math.max(0, target.getTime() - now.getTime());
  const days = Math.floor(ms / 86_400_000);
  const hours = Math.floor((ms % 86_400_000) / 3_600_000);
  const minutes = Math.floor((ms % 3_600_000) / 60_000);
  const seconds = Math.floor((ms % 60_000) / 1000);
  return { days, hours, minutes, seconds };
}

export function Countdown() {
  const target = new Date(siteConfig.year5.eventStart);
  const [t, setT] = useState(() => diff(target));

  useEffect(() => {
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cells = [
    { v: t.days, l: "Days" },
    { v: t.hours, l: "Hours" },
    { v: t.minutes, l: "Mins" },
    { v: t.seconds, l: "Secs" },
  ];

  return (
    <div className="grid grid-cols-4 gap-3 md:gap-6">
      {cells.map((c) => (
        <div key={c.l} className="glass-card rounded-2xl p-4 md:p-6 text-center">
          <div className="text-4xl md:text-6xl font-serif text-gold tabular-nums">
            {String(c.v).padStart(2, "0")}
          </div>
          <div className="mt-2 text-[10px] tracking-[0.25em] uppercase text-cream/50">
            {c.l}
          </div>
        </div>
      ))}
    </div>
  );
}
