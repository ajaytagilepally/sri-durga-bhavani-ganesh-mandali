import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { claimAdmin } from "@/lib/admin.functions";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { T } from "@/lib/lang";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Admin Sign In — Durga Bhavani Ganesh Mandali" },
      { name: "description", content: "Admin sign in for Durga Bhavani Ganesh Mandali." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Admin Sign In" },
      { property: "og:description", content: "Restricted admin sign in." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const nav = useNavigate();
  const claimAdminFn = useServerFn(claimAdmin);
  const [mode, setMode] = useState<"in" | "up" | "forgot">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      if (mode === "forgot") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        setNotice("Password reset link sent. Check your email inbox.");
        return;
      }
      if (mode === "in") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        if (!data.session) {
          setNotice("Account created. Please check your email to confirm, then sign in.");
          setMode("in");
          return;
        }
      }
      // Bootstrap: grants the admin role when this account is the configured administrator email.
      try {
        await claimAdminFn();
      } catch {
        /* non-admin accounts simply stay unprivileged */
      }
      nav({ to: "/admin" });
    } catch (e: any) {
      setError(e?.message ?? "Sign in failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-heritage-deep text-cream">
      <Nav />
      <main className="max-w-md mx-auto px-6 pt-32 pb-20">
        <h1 className="text-3xl font-serif italic gold-gradient text-center mb-8">
          {mode === "in" ? "Admin Sign In" : mode === "up" ? "Create Admin Account" : "Reset Password"}
        </h1>
        <form onSubmit={submit} className="space-y-4">
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-cream/5 border border-gold/25 rounded-md px-3 py-2 text-sm"
          />
          {mode !== "forgot" && (
            <input
              type="password"
              required
              minLength={8}
              placeholder="Password (min 8 chars)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-cream/5 border border-gold/25 rounded-md px-3 py-2 text-sm"
            />
          )}
          {error && <p className="text-red-300 text-sm">{error}</p>}
          {notice && <p className="text-emerald-300 text-sm">{notice}</p>}
          <button
            disabled={busy}
            className="w-full py-3 rounded-md bg-gold text-heritage-deep uppercase tracking-widest text-xs font-medium disabled:opacity-40"
          >
            {busy ? "..." : mode === "in" ? "Sign in" : mode === "up" ? "Sign up" : "Send reset link"}
          </button>
        </form>
        <div className="mt-4 flex flex-col gap-2 text-xs text-cream/60">
          <button onClick={() => setMode(mode === "in" ? "up" : "in")} className="hover:text-gold">
            {mode === "in" ? "Need an account? Sign up" : "Already have an account? Sign in"}
          </button>
          <button
            onClick={() => setMode(mode === "forgot" ? "in" : "forgot")}
            className="hover:text-gold"
          >
            {mode === "forgot" ? "Back to sign in" : "Forgot password? Reset via email"}
          </button>
        </div>
        <p className="text-cream/40 text-xs text-center mt-6">
          <T
            te="మీ ఖాతా సృష్టించిన తర్వాత, అడ్మిన్ హక్కులను మంజూరు చేయడానికి మండలి నిర్వాహకుడిని సంప్రదించండి."
            en="After creating an account, contact the mandali admin to grant admin rights."
          />
        </p>

      </main>
      <Footer />
    </div>
  );
}
