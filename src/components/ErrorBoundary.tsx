import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  /** Optional label shown in the fallback, e.g. "Gallery". */
  label?: string;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Isolates a section of the page: a crash inside `children` never takes down
 * the whole route, and the user gets a retry affordance.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[section error]", this.props.label ?? "", error, info.componentStack);
  }

  private reset = () => this.setState({ hasError: false });

  render() {
    if (!this.state.hasError) return this.props.children;
    if (this.props.fallback) return this.props.fallback;

    return (
      <div className="py-20 px-6 text-center">
        <p className="text-cream/60 text-sm">
          This section couldn&apos;t be displayed right now.
        </p>
        <button
          onClick={this.reset}
          className="mt-4 px-5 py-2 rounded-full border border-gold/40 text-gold text-xs tracking-[0.2em] uppercase hover:bg-gold/10 transition-colors"
        >
          Try again
        </button>
      </div>
    );
  }
}
