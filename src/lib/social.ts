import { siteConfig } from "@/data/config";

export type SocialChannel = "whatsapp" | "instagram" | "website";

const STORAGE_KEY = "gu:social-clicks";

/** Digits-only WhatsApp number. */
export const waDigits = () => siteConfig.contact.whatsappNumber.replace(/[^0-9]/g, "");

/** Instagram handle without a leading @. */
export const igHandle = () => siteConfig.contact.instagramUser.replace(/^@/, "");

/** Web (fallback) URL for WhatsApp, optionally prefilled with text. */
export function whatsappUrl(text?: string) {
  const base = siteConfig.contact.whatsappUrl || `https://wa.me/${waDigits()}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

/** Native app deep link for WhatsApp. */
export function whatsappDeepLink(text?: string) {
  const q = new URLSearchParams({ phone: waDigits(), ...(text ? { text } : {}) });
  return `whatsapp://send?${q.toString()}`;
}

/** Web (fallback) URL for Instagram. */
export function instagramUrl() {
  return siteConfig.contact.instagramUrl || `https://instagram.com/${igHandle()}`;
}

/** Native app deep link for Instagram. */
export function instagramDeepLink() {
  return `instagram://user?username=${igHandle()}`;
}

/** Configurable extra destination (e.g. inayageam page). */
export function websiteUrl() {
  return siteConfig.contact.websiteUrl || "";
}

const isBrowser = () => typeof window !== "undefined";

const isMobile = () =>
  isBrowser() && /android|iphone|ipad|ipod/i.test(window.navigator.userAgent);

/** Local, backend-free click counters. */
export function trackSocialClick(channel: SocialChannel, place = "contact") {
  if (!isBrowser()) return;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const data: Record<string, number> = raw ? JSON.parse(raw) : {};
    const key = `${channel}:${place}`;
    data[key] = (data[key] ?? 0) + 1;
    data[channel] = (data[channel] ?? 0) + 1;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* storage unavailable — tracking is best-effort */
  }
  // Surface to any analytics layer that may exist, without requiring one.
  (window as unknown as { dataLayer?: unknown[] }).dataLayer?.push({
    event: "social_click",
    channel,
    place,
  });
}

export function getSocialClickStats(): Record<string, number> {
  if (!isBrowser()) return {};
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

/**
 * Try the native app first on mobile, then fall back to the web URL if the
 * app never took over the tab. Desktop goes straight to the web URL.
 */
export function openSocial(opts: {
  channel: SocialChannel;
  webUrl: string;
  deepLink?: string;
  place?: string;
}) {
  const { channel, webUrl, deepLink, place } = opts;
  trackSocialClick(channel, place);
  if (!isBrowser() || !webUrl) return;

  if (!deepLink || !isMobile()) {
    window.open(webUrl, "_blank", "noopener,noreferrer");
    return;
  }

  let fellBack = false;
  const start = Date.now();
  const fallback = () => {
    if (fellBack || document.hidden) return;
    fellBack = true;
    // If we were backgrounded quickly, the app opened — otherwise use the web.
    if (Date.now() - start < 2500) window.location.href = webUrl;
  };
  const timer = window.setTimeout(fallback, 1200);
  const onHide = () => {
    if (document.hidden) window.clearTimeout(timer);
  };
  document.addEventListener("visibilitychange", onHide, { once: true });
  window.location.href = deepLink;
}
