// Server-only notification helper. Centralized so email logic is never duplicated.
// Emails are dispatched through Lovable's managed email API once a sender domain
// is configured; until then every notification is recorded in notification_logs
// so the admin dashboard still shows a full audit trail.

export type NotifyTemplate = "donation_received" | "booking_received";

export interface NotifyPayload {
  template: NotifyTemplate;
  subject: string;
  /** ordered label/value rows rendered into the HTML table */
  rows: Array<[string, string]>;
  meta?: Record<string, unknown>;
}

export function adminEmail(): string {
  return (process.env["ADMIN_EMAIL"] || "bhagwadalbswd@gmail.com").trim();
}

function maskEmail(e: string) {
  const [u, d] = e.split("@");
  if (!d) return "***";
  return `${u.slice(0, 2)}***@${d}`;
}

/** Reusable branded HTML email template. */
export function renderEmail(title: string, rows: Array<[string, string]>): string {
  const body = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px;color:#7a2b2b;font-weight:600;border-bottom:1px solid #f0e6d2;white-space:nowrap">${escapeHtml(
          k,
        )}</td><td style="padding:8px 12px;color:#222;border-bottom:1px solid #f0e6d2">${escapeHtml(v)}</td></tr>`,
    )
    .join("");
  return `<!doctype html><html><body style="margin:0;background:#ffffff;font-family:Arial,Helvetica,sans-serif">
  <div style="max-width:600px;margin:0 auto;padding:24px">
    <div style="background:#7a2b2b;border-radius:12px 12px 0 0;padding:20px 24px;text-align:center">
      <div style="color:#f5d488;font-size:20px;font-weight:bold">Sri Durga Bhavani Ganesh Mandali</div>
      <div style="color:#f0e6d2;font-size:12px;margin-top:4px">Teachers Colony, Banswada</div>
    </div>
    <div style="border:1px solid #f0e6d2;border-top:0;border-radius:0 0 12px 12px;padding:20px 8px">
      <h2 style="margin:0 0 12px 16px;color:#7a2b2b;font-size:17px">${escapeHtml(title)}</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px">${body}</table>
      <p style="margin:16px;color:#888;font-size:12px">Automated notification from the Mandali portal.</p>
    </div>
  </div></body></html>`;
}

function escapeHtml(s: string) {
  return String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string,
  );
}

/** Notify the administrator. Never throws — notification failures must not break a submission. */
export async function notifyAdmin(payload: NotifyPayload): Promise<void> {
  const to = adminEmail();
  const html = renderEmail(payload.subject, payload.rows);
  let status = "logged";
  try {
    const apiKey = process.env["LOVABLE_API_KEY"];
    const senderDomain = process.env["SENDER_DOMAIN"];
    if (apiKey && senderDomain) {
      const res = await fetch("https://api.lovable.dev/email/v1/send", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({
          from: `Mandali Portal <notify@${senderDomain}>`,
          to,
          subject: `${payload.subject} — Sri Durga Bhavani Ganesh Mandali`,
          html,
        }),
      });
      status = res.ok ? "sent" : `failed_${res.status}`;
    } else {
      status = "pending_email_domain";
    }
  } catch (e) {
    console.error("notifyAdmin send error", e);
    status = "error";
  }

  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin.from("notification_logs").insert({
      channel: "email",
      recipient_masked: maskEmail(to),
      template_key: payload.template,
      status,
      meta: { rows: payload.rows, ...(payload.meta ?? {}) } as any,
    });
  } catch (e) {
    console.error("notifyAdmin log error", e);
  }
}
