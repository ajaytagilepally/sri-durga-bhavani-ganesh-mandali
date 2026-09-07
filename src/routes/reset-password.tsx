import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Reset Password — Durga Bhavani Ganesh Mandali" },
      { name: "description", content: "Set a new admin password for the mandali portal." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Reset Password" },
      { property: "og:description", content: "Set a new admin password." },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const nav = useNavigate();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") setReady(true);
    });
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setMsg(null);
    if (password !== confirm) {
      setErr("Passwords do not match.");
      return;
    }
    setBusy(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setMsg("Password updated. Redirecting…");
      setTimeout(() => nav({ to: "/admin" }), 1200);
    } catch (e: any) {
      setErr(e?.message ?? "Could not update password");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-heritage-deep text-cream">
      <Nav />
      <main className="max-w-md mx-auto px-6 pt-32 pb-20">
        <h1 className="text-3xl font-serif italic gold-gradient text-center mb-8">Set New Password</h1>
        {!ready && (
          <p className="text-cream/60 text-sm text-center mb-6">
            Open this page from the reset link sent to your email.
          </p>
        )}
        <form onSubmit={submit} className="space-y-4">
          <input
            type="password"
            required
            minLength={8}
            placeholder="New password (min 8 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-cream/5 border border-gold/25 rounded-md px-3 py-2 text-sm"
          />
          <input
            type="password"
            required
            minLength={8}
            placeholder="Confirm new password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full bg-cream/5 border border-gold/25 rounded-md px-3 py-2 text-sm"
          />
          {err && <p className="text-red-300 text-sm">{err}</p>}
          {msg && <p className="text-emerald-300 text-sm">{msg}</p>}
          <button
            disabled={busy || !ready}
            className="w-full py-3 rounded-md bg-gold text-heritage-deep uppercase tracking-widest text-xs font-medium disabled:opacity-40"
          >
            {busy ? "..." : "Update password"}
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
