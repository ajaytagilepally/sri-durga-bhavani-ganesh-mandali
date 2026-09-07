// No hard-coded admin email here.
export const ADMIN_EMAIL = "";

// =========================================================
// SITE CONFIGURATION
// =========================================================

export const siteConfig = {
  brandTelugu: "శ్రీ దుర్గా భవాని గణేష్ మండలి",

  brandEnglish: "Sri Durga Bhavani Ganesh Mandali",

  addressTelugu: "టీచర్స్ కాలనీ, బాన్సువాడ",

  addressEnglish: "Teachers Colony, Banswada",

  /**
   * Admin email is intentionally NOT stored here.
   *
   * Keep ADMIN_EMAIL in .env and access it only from
   * server-side code when required.
   */
  adminEmail: "",

  years: "2022 — 2026",

  // =========================================================
  // TAGLINE
  // =========================================================

  tagline: {
    en: "Five years of devotion. Five years of togetherness. Countless memories.",

    te: "ఐదేళ్ళ భక్తి, ఐక్యత మరియు వేడుక.",
  },

  // =========================================================
  // YEAR 5
  // =========================================================

  year5: {
    eventStart: "2026-09-14T06:00:00+05:30",

    dateLabel: "September 14–24, 2026",

    locationLabel: "Our Sacred Pandal",

    mapUrl: "https://maps.app.goo.gl/JXt68xszjzH2N9sP7",

    inviteTelugu: "మా 5వ వార్షికోత్సవ వేడుకలలో మాతో చేరండి.",

    inviteEnglish: "Join us for the 5th anniversary celebration.",
  },

  // =========================================================
  // CONTACT DETAILS
  // =========================================================

  contact: {
    /** Main contact phone number shown on the website. */
    phoneNumber: "+91 9676759005",

    /** Full international number. */
    whatsappNumber: "+91 9381978462",

    /** How the WhatsApp number is displayed on screen. */
    whatsappDisplay: "+91 9381978462",

    /** Instagram handle. */
    instagramUser: "durgabhavani_ganesh_mandali",

    /**
     * Optional WhatsApp destination override.
     *
     * Leave empty to automatically build the WhatsApp URL
     * from whatsappNumber.
     */
    whatsappUrl: "",

    /**
     * Instagram destination.
     */
    instagramUrl: "https://www.instagram.com/bhagwadal_bswd?igsi=MWlmcWJnYzEzbHNjag==",

    /**
     * Extra website.
     *
     * Leave empty if not required.
     */
    websiteUrl: "",

    websiteLabel: "Instagram",
  },

  // =========================================================
  // UPI DONATION CONFIGURATION
  // =========================================================

  upi: {
    id: "9381978462-6@ybl",

    payeeName: "Vadla Hari charan",

    note: "Ganesh Utsav Seva",
  },

  // =========================================================
  // POOJA BOOKING CONFIGURATION
  // =========================================================

  booking: {
    /**
     * Evening booking window.
     */
    windowStart: "18:00",

    windowEnd: "21:00",

    /**
     * Duration of each pooja slot in minutes.
     */
    slotMinutes: 30,

    /**
     * Maximum bookings allowed per slot.
     */
    slotCapacity: 50,
  },

  // =========================================================
  // DONATION CATEGORIES
  // =========================================================

  donationCategories: [
    {
      key: "idol" as const,

      te: "గణేష్ విగ్రహ సేవ",

      en: "Ganesh Idol Seva",

      descTe: "గణపతి విగ్రహ ప్రతిష్ఠ మరియు అలంకరణ",

      descEn: "Sponsor the sacred idol and its decorations",

      presets: [501, 1001, 2501, 5001],
    },

    {
      key: "annadanam" as const,

      te: "అన్నదానం",

      en: "Annadanam",

      descTe: "భక్తులకు ప్రసాద భోజన సేవ",

      descEn: "Offer meals to devotees",

      presets: [251, 501, 1001, 2501],
    },

    {
      key: "laddu_token" as const,

      te: "లడ్డు టోకెన్",

      en: "Laddu Token",

      descTe: "లడ్డు వేలంలో పాల్గొనండి",

      descEn: "Participate in the laddu auction",

      presets: [1001, 2501, 5001, 11001],
    },
  ],

  // =========================================================
  // FOOTER
  // =========================================================

  footer: {
    mantraTelugu: "గణపతి బప్పా మోరియా 🙏",

    mantraEnglish: "Ganpati Bappa Morya",

    dedication: "Made with ❤️ for our Ganesh family",
  },
};

// =========================================================
// TYPES
// =========================================================

export type DonationCategoryKey = "idol" | "annadanam" | "laddu_token";

// =========================================================
// CATEGORY HELPER
// =========================================================

export const categoryLabel = (k: DonationCategoryKey) =>
  siteConfig.donationCategories.find((c) => c.key === k) ?? siteConfig.donationCategories[0];
