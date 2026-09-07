import { Suspense, type ReactNode } from "react";
import { ErrorBoundary } from "./ErrorBoundary";

/** Neutral, layout-stable placeholder that avoids CLS while a chunk loads. */
export function SectionSkeleton({ height = "60vh" }: { height?: string }) {
  return (
    <div
      aria-hidden
      style={{ minHeight: height }}
      className="w-full animate-pulse bg-gradient-to-b from-transparent via-cream/[0.03] to-transparent"
    />
  );
}

/**
 * Wraps a lazily-imported section with its own error boundary + skeleton so a
 * single failing chunk never blanks the page.
 */
export function LazySection({
  children,
  label,
  height,
}: {
  children: ReactNode;
  label?: string;
  height?: string;
}) {
  return (
    <ErrorBoundary label={label}>
      <Suspense fallback={<SectionSkeleton height={height} />}>{children}</Suspense>
    </ErrorBoundary>
  );
}
