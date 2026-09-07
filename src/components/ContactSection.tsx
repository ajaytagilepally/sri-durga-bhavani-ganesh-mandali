import { useCallback, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { toast } from "sonner";
import { Globe } from "lucide-react";
import { siteConfig } from "@/data/config";
import {
  instagramDeepLink,
  instagramUrl,
  openSocial,
  trackSocialClick,
  whatsappDeepLink,
  whatsappUrl,
  websiteUrl,
} from "@/lib/social";
import { T, Bi, useLang } from "@/lib/lang";

/**
 * Proper WhatsApp brand icon.
 */
function WhatsAppIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.08 0C5.52 0 .18 5.34.18 11.9c0 2.1.55 4.15 1.6 5.96L.1 24l6.3-1.65a11.9 11.9 0 0 0 5.68 1.45h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.47-8.42ZM12.09 21.8h-.01a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.74.98 1-3.64-.24-.37a9.9 9.9 0 1 1 8.4 4.62Zm5.43-7.42c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.91-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
    </svg>
  );
}

/**
 * Proper Instagram brand icon.
 */
function InstagramIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.3" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const contactSchema = z.object({
  name: z.string().trim().nonempty("Please enter your name").max(80, "Name is too long"),

  phone: z
    .string()
    .trim()
    .max(20, "Phone number is too long")
    .regex(/^[0-9+\-\s]*$/, "Phone can only contain digits, +, - and spaces")
    .optional()
    .or(z.literal("")),

  message: z
    .string()
    .trim()
    .nonempty("Please write a short message")
    .max(600, "Message must be under 600 characters"),
});

export function ContactSection() {
  const { lang } = useLang();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const mountedAt = useRef(Date.now());

  /*
   * IMPORTANT:
   * All contact information comes from src/data/config.ts.
   */
  const { whatsappNumber, whatsappDisplay, instagramUser, phoneNumber, websiteLabel } =
    siteConfig.contact;

  /*
   * Use the configured number/username to build the links.
   */
  const waBase = useMemo(() => {
    const configuredUrl = siteConfig.contact.whatsappUrl?.trim();

    if (configuredUrl) {
      return configuredUrl;
    }

    return `https://wa.me/${whatsappNumber.replace(/\D/g, "")}`;
  }, [whatsappNumber]);

  const igUrl = useMemo(() => {
    const configuredUrl = siteConfig.contact.instagramUrl?.trim();

    if (configuredUrl) {
      return configuredUrl;
    }

    return `https://www.instagram.com/${instagramUser.replace(/^@/, "")}/`;
  }, [instagramUser]);

  const siteUrl = useMemo(() => websiteUrl(), []);

  const openWhatsApp = useCallback((place: string, text?: string) => {
    openSocial({
      channel: "whatsapp",
      webUrl: whatsappUrl(text),
      deepLink: whatsappDeepLink(text),
      place,
    });
  }, []);

  const openInstagram = useCallback((place: string) => {
    openSocial({
      channel: "instagram",
      webUrl: instagramUrl(),
      deepLink: instagramDeepLink(),
      place,
    });
  }, []);

  const reset = useCallback(() => {
    setName("");
    setPhone("");
    setMessage("");
    setWebsite("");
    mountedAt.current = Date.now();
    setStatus("idle");
  }, []);

  const submit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (status !== "idle") return;

      // Basic bot protection.
      if (website.trim() !== "" || Date.now() - mountedAt.current < 2500) {
        setStatus("sent");
        return;
      }

      const parsed = contactSchema.safeParse({
        name,
        phone,
        message,
      });

      if (!parsed.success) {
        toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
        return;
      }

      setStatus("sending");

      const d = parsed.data;

      const text = [
        `🙏 ${siteConfig.brandEnglish}`,
        "",
        `Name: ${d.name}`,
        d.phone ? `Phone: ${d.phone}` : "",
        "",
        d.message,
      ]
        .filter(Boolean)
        .join("\n");

      openWhatsApp("contact-form", text);

      toast.success(
        lang === "te" ? "వాట్సాప్‌లో సందేశం తెరవబడింది" : "Opening WhatsApp with your message",
      );

      setStatus("sent");
    },
    [status, website, name, phone, message, openWhatsApp, lang],
  );

  const field =
    "w-full rounded-xl bg-cream/[0.04] border border-gold/20 px-4 py-3 text-cream placeholder:text-cream/35 outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/30 transition-all";

  const socialIcon =
    "group grid place-items-center w-16 h-16 rounded-full border border-gold/40 bg-gold/[0.06] text-gold hover:bg-gold/10 hover:border-gold/70 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-heritage-deep";

  const socialPill =
    "inline-flex items-center gap-2 px-6 py-3.5 min-h-11 rounded-full border border-gold/40 text-gold text-xs tracking-[0.15em] uppercase hover:bg-gold/10 hover:border-gold/70 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-heritage-deep";

  return (
    <section id="contact" className="py-24 px-6 bg-heritage-deep">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-4">
            <T te="సంప్రదించండి" en="Get in touch" />
          </p>

          <h2 className="text-3xl md:text-5xl mb-4">
            <Bi
              te={<span className="font-telugu text-cream">మమ్మల్ని సంప్రదించండి</span>}
              en={<span className="font-serif italic gold-gradient">Contact the Mandali</span>}
            />
          </h2>

          <p className="text-cream/70 max-w-xl mx-auto leading-relaxed">
            <T
              te="మీ సందేశం నేరుగా వాట్సాప్‌లో మాకు చేరుతుంది."
              en="Your message reaches us directly on WhatsApp."
            />
          </p>

          {/* Actual contact information */}
          <div className="mt-5 flex flex-col items-center gap-1">
            <p className="text-cream/80 text-sm">
              Phone:{" "}
              <a
                href={`tel:${phoneNumber.replace(/\s/g, "")}`}
                className="text-gold hover:underline"
              >
                {phoneNumber}
              </a>
            </p>
            <p className="text-cream/80 text-sm">
              WhatsApp: <span className="text-gold">{whatsappDisplay}</span>
            </p>
            <p className="text-cream/80 text-sm">
              Instagram: <span className="text-gold">@{instagramUser.replace(/^@/, "")}</span>
            </p>
          </div>
        </motion.div>

        {/* Social icons */}
        <div className="flex items-center justify-center gap-6 mb-10">
          {/* WhatsApp */}
          <a
            href={waBase}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.preventDefault();
              openWhatsApp("contact-icon");
            }}
            title={`Chat on WhatsApp · ${whatsappDisplay}`}
            aria-label={`Chat with us on WhatsApp at ${whatsappDisplay}`}
            className={socialIcon}
          >
            <WhatsAppIcon size={30} />
          </a>

          {/* Instagram */}
          <a
            href={igUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.preventDefault();
              openInstagram("contact-icon");
            }}
            title={`Instagram · @${instagramUser.replace(/^@/, "")}`}
            aria-label={`View our Instagram page @${instagramUser.replace(/^@/, "")}`}
            className={socialIcon}
          >
            <InstagramIcon size={30} />
          </a>

          {/* Website — only shown if configured */}
          {siteUrl && (
            <a
              href={siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackSocialClick("website", "contact-icon")}
              title={websiteLabel}
              aria-label={`Open ${websiteLabel}`}
              className={socialIcon}
            >
              <Globe size={30} strokeWidth={2} aria-hidden="true" />
            </a>
          )}
        </div>

        {/* Contact form */}
        {status === "sent" ? (
          <div
            role="status"
            aria-live="polite"
            className="rounded-2xl border border-gold/30 bg-gold/[0.06] px-6 py-10 text-center"
          >
            <div className="mx-auto mb-4 grid place-items-center w-12 h-12 rounded-full border border-gold/50 text-gold text-xl">
              ✓
            </div>

            <h3 className="text-xl mb-2">
              <Bi
                te={<span className="font-telugu text-cream">మీ సందేశం సిద్ధమైంది</span>}
                en={<span className="font-serif italic gold-gradient">Your message is ready</span>}
              />
            </h3>

            <p className="text-cream/70 text-sm max-w-md mx-auto leading-relaxed">
              <T
                te="వాట్సాప్ తెరవబడింది — అక్కడ 'పంపు' నొక్కండి."
                en="WhatsApp has opened — just press Send there."
              />
            </p>

            <button
              type="button"
              onClick={reset}
              className="mt-6 px-8 py-3 rounded-full border border-gold/40 text-gold text-xs tracking-[0.2em] uppercase hover:bg-gold/10 transition-colors"
            >
              <T te="మరో సందేశం పంపండి" en="Send another message" />
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="grid gap-4">
            {/* Honeypot */}
            <div
              aria-hidden
              className="absolute w-px h-px overflow-hidden -m-px opacity-0 pointer-events-none"
            >
              <label htmlFor="c-website">Website</label>

              <input
                id="c-website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            {/* Name */}
            <div>
              <label
                htmlFor="c-name"
                className="block text-[11px] tracking-[0.25em] uppercase text-cream/50 mb-2"
              >
                <T te="పేరు" en="Name" />
              </label>

              <input
                id="c-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={80}
                required
                autoComplete="name"
                className={field}
                placeholder={lang === "te" ? "మీ పేరు" : "Your name"}
              />
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="c-phone"
                className="block text-[11px] tracking-[0.25em] uppercase text-cream/50 mb-2"
              >
                <T te="ఫోన్ (ఐచ్ఛికం)" en="Phone (optional)" />
              </label>

              <input
                id="c-phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                maxLength={20}
                inputMode="tel"
                autoComplete="tel"
                className={field}
                placeholder="+91 9*********"
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="c-msg"
                className="block text-[11px] tracking-[0.25em] uppercase text-cream/50 mb-2"
              >
                <T te="సందేశం" en="Message" />
              </label>

              <textarea
                id="c-msg"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={600}
                rows={5}
                required
                className={`${field} resize-y`}
                placeholder={lang === "te" ? "మీ సందేశం రాయండి…" : "Write your message…"}
              />

              <p className="mt-1 text-right text-[10px] text-cream/35">{message.length}/600</p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={status !== "idle"}
              aria-busy={status === "sending"}
              className="justify-self-center mt-2 px-10 py-4 rounded-full bg-gold text-heritage-deep tracking-widest text-sm uppercase font-medium hover:bg-gold/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "sending" ? (
                <T te="పంపుతోంది…" en="Sending…" />
              ) : (
                <span className="inline-flex items-center gap-2">
                  <WhatsAppIcon size={19} />
                  <T te="వాట్సాప్‌లో పంపండి" en="Send on WhatsApp" />
                </span>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
