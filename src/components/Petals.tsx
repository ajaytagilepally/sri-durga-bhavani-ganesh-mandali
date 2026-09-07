import { memo, useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

// Petals fall from top with random horizontal drift, duration, and delay.
const PETAL_COUNT = 18;

interface Petal {
  left: number;
  duration: number;
  delay: number;
  size: number;
  hue: number;
}

function makePetals(): Petal[] {
  return Array.from({ length: PETAL_COUNT }, () => ({
    left: Math.random() * 100,
    duration: 10 + Math.random() * 14,
    delay: Math.random() * -20,
    size: 6 + Math.random() * 10,
    hue: 20 + Math.random() * 30,
  }));
}

export const Petals = memo(function Petals() {
  const reduced = useReducedMotion();
  // Generated after mount only: keeps SSR markup deterministic (no hydration
  // mismatch) and skips the work entirely for reduced-motion users.
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    setPetals(reduced ? [] : makePetals());
  }, [reduced]);

  if (petals.length === 0) return null;


  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {petals.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            background: `radial-gradient(circle at 30% 30%, hsl(${p.hue} 90% 65%), hsl(${p.hue - 5} 80% 45%))`,
            boxShadow: `0 0 8px hsla(${p.hue} 90% 60% / 0.5)`,
          }}
        />
      ))}
    </div>
  );
});
