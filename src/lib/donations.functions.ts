import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";

import { siteConfig, type DonationCategoryKey } from "@/data/config";

/* =========================================================
   TYPES
   ========================================================= */

type PublicDonationStatus = "PENDING" | "SUCCESSFUL" | "FAILED";

/* =========================================================
   SCHEMAS
   ========================================================= */

const categorySchema = z.enum(["idol", "annadanam", "laddu_token"]);

const submitSchema = z.object({
  name: z.string().trim().min(2).max(100),

  phone: z.string().trim().min(10).max(20),

  email: z.string().trim().email().max(255).optional().or(z.literal("")),

  category: categorySchema,

  amount: z.number().positive().max(10_000_000),

  ladduCount: z.number().int().min(1).max(1000).optional(),

  utrRef: z
    .string()
    .trim()
    .min(4)
    .max(64)
    .regex(/^[A-Za-z0-9\-\/]+$/, "UTR may contain only letters, digits, - and /"),

  message: z.string().trim().max(500).optional().or(z.literal("")),
});

const checkDonationStatusSchema = z.object({
  utrRef: z
    .string()
    .trim()
    .min(4)
    .max(64)
    .regex(/^[A-Za-z0-9\-\/]+$/),
});

/* =========================================================
   SUPABASE SERVER CLIENT
   ========================================================= */

function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL;

  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");

    throw new Error("Supabase server configuration is missing.");
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

/* =========================================================
   CATEGORY VALIDATION
   ========================================================= */

function getCategory(category: DonationCategoryKey) {
  return siteConfig.donationCategories.find((item) => item.key === category) ?? null;
}

/* =========================================================
   SERVER-SIDE AMOUNT VALIDATION
   ========================================================= */

function validateDonationAmount(
  category: DonationCategoryKey,
  amount: number,
  ladduCount?: number,
) {
  const categoryConfig = getCategory(category);

  if (!categoryConfig) {
    throw new Error("Invalid donation category.");
  }

  if (!Number.isFinite(amount) || amount <= 0 || amount > 10_000_000) {
    throw new Error("Invalid donation amount.");
  }

  /* -----------------------------------------
     LADDU TOKEN
     ----------------------------------------- */

  if (category === "laddu_token") {
    if (!ladduCount) {
      throw new Error("Laddu token quantity is required.");
    }

    const expectedAmount = ladduCount * 101;

    if (amount !== expectedAmount) {
      throw new Error("The Laddu Token amount does not match the selected quantity.");
    }

    return expectedAmount;
  }

  /* -----------------------------------------
     OTHER SEVAS
     -----------------------------------------

     These allow the donor to choose either
     a preset amount or a custom amount.

     The server still validates the amount
     range and prevents invalid values.
     ----------------------------------------- */

  return amount;
}

/* =========================================================
   NORMALIZE DATABASE STATUS
   ========================================================= */

function normalizeStatus(status: unknown): PublicDonationStatus {
  const value = String(status ?? "").toLowerCase();

  if (
    value === "verified" ||
    value === "successful" ||
    value === "success" ||
    value === "paid" ||
    value === "completed"
  ) {
    return "SUCCESSFUL";
  }

  if (value === "failed" || value === "rejected" || value === "cancelled" || value === "canceled") {
    return "FAILED";
  }

  return "PENDING";
}

/* =========================================================
   SEVA MESSAGE
   ========================================================= */

function getSevaMessage(category?: DonationCategoryKey) {
  switch (category) {
    case "idol":
      return "Your sacred contribution towards Ganesh Idol Seva helps support the preparation, decoration, installation, and worship of Sri Ganesh.";

    case "annadanam":
      return "Your contribution towards Annadanam helps provide food and prasadam to devotees and members of our community.";

    case "laddu_token":
      return "Your Laddu Token contribution supports the sacred Laddu Seva and devotional celebrations of Ganesh Utsav.";

    default:
      return "Your generous contribution supports the Ganesh Utsav and community seva.";
  }
}

/* =========================================================
   SUBMIT DONATION
   ========================================================= */

export const submitDonation = createServerFn({
  method: "POST",
})
  .inputValidator((input: unknown) => submitSchema.parse(input))
  .handler(async ({ data }) => {
    const supabase = getSupabaseAdmin();

    /* -----------------------------------------
         NORMALIZE UTR
         ----------------------------------------- */

    const utrRef = data.utrRef.trim().toUpperCase();

    /* -----------------------------------------
         SERVER-SIDE CATEGORY CHECK
         ----------------------------------------- */

    const category = getCategory(data.category);

    if (!category) {
      throw new Error("Invalid donation category.");
    }

    /* -----------------------------------------
         SERVER-SIDE AMOUNT CHECK
         ----------------------------------------- */

    const verifiedAmount = validateDonationAmount(data.category, data.amount, data.ladduCount);

    /* -----------------------------------------
         DUPLICATE UTR CHECK
         ----------------------------------------- */

    const { data: existingDonations, error: duplicateCheckError } = await supabase
      .from("donations")
      .select("id, status, created_at")
      .eq("utr_ref", utrRef)
      .limit(1);

    if (duplicateCheckError) {
      console.error("UTR duplicate check failed:", duplicateCheckError);

      throw new Error("Could not verify the donation reference. Please try again.");
    }

    if (existingDonations && existingDonations.length > 0) {
      throw new Error("This UTR / reference number has already been submitted.");
    }

    /* -----------------------------------------
         INSERT
         ----------------------------------------- */

    const { data: row, error } = await supabase
      .from("donations")
      .insert({
        name: data.name,
        phone: data.phone,

        email: data.email?.trim() ? data.email.trim() : null,

        category: data.category,

        amount: verifiedAmount,

        laddu_count: data.category === "laddu_token" ? data.ladduCount : null,

        utr_ref: utrRef,

        /*
         * IMPORTANT:
         *
         * New donations are always pending.
         *
         * Admin must verify the UTR and
         * change the database status.
         */
        status: "pending",

        provider: "upi_manual",

        message: data.message?.trim() ? data.message.trim() : null,
      })
      .select("id, created_at")
      .single();

    if (error) {
      console.error("submitDonation database error:", error);

      if (error.code === "23505") {
        throw new Error("This UTR / reference number has already been submitted.");
      }

      throw new Error("Could not record your donation. Please try again.");
    }

    /* -----------------------------------------
         RECEIPT NUMBER
         ----------------------------------------- */

    const receiptNo = `DON-${String(row.id).slice(0, 8).toUpperCase()}`;

    /* -----------------------------------------
         ADMIN NOTIFICATION
         ----------------------------------------- */

    try {
      const { notifyAdmin } = await import("@/lib/notify.server");

      const when = new Date(row.created_at);

      await notifyAdmin({
        template: "donation_received",

        subject: "New donation received",

        rows: [
          ["Category", category.en],
          ["Name", data.name],
          ["Phone Number", data.phone],
          ["Donation Amount", `INR ${verifiedAmount}`],
          ["UTR / Reference", utrRef],
          [
            "Date",
            when.toLocaleDateString("en-IN", {
              timeZone: "Asia/Kolkata",
            }),
          ],
          [
            "Time",
            when.toLocaleTimeString("en-IN", {
              timeZone: "Asia/Kolkata",
            }),
          ],
          ["Receipt No.", receiptNo],
        ],

        meta: {
          donation_id: row.id,

          category: data.category,
        },
      });
    } catch (notificationError) {
      /*
       * Donation is already saved.
       *
       * Notification failure must
       * NOT fail the donation.
       */

      console.error("Donation notification failed:", notificationError);
    }

    /* -----------------------------------------
         RESPONSE
         ----------------------------------------- */

    return {
      id: row.id,

      receiptNo,

      createdAt: row.created_at,

      status: "PENDING" as const,
    };
  });

/* =========================================================
   CHECK DONATION STATUS BY UTR
   ========================================================= */

export const checkDonationStatus = createServerFn({
  method: "POST",
})
  .inputValidator((input: unknown) => checkDonationStatusSchema.parse(input))
  .handler(async ({ data }) => {
    const supabase = getSupabaseAdmin();

    const utrRef = data.utrRef.trim().toUpperCase();

    /* -----------------------------------------
         FIND DONATION
         ----------------------------------------- */

    const { data: donation, error } = await supabase
      .from("donations")
      .select(
        `
          id,
          created_at,
          name,
          phone,
          email,
          category,
          amount,
          laddu_count,
          utr_ref,
          status,
          message
        `,
      )
      .eq("utr_ref", utrRef)
      .maybeSingle();

    if (error) {
      console.error("checkDonationStatus database error:", error);

      throw new Error("Could not check payment status.");
    }

    /* -----------------------------------------
         NOT FOUND
         ----------------------------------------- */

    if (!donation) {
      return {
        found: false,
      };
    }

    /* -----------------------------------------
         STATUS
         ----------------------------------------- */

    const status = normalizeStatus(donation.status);

    const category = getCategory(donation.category as DonationCategoryKey);

    /* -----------------------------------------
         RECEIPT NUMBER
         ----------------------------------------- */

    const receiptNo = `DON-${String(donation.id).slice(0, 8).toUpperCase()}`;

    /* -----------------------------------------
         RETURN
         ----------------------------------------- */

    return {
      found: true,

      status,

      id: donation.id,

      receiptNo,

      createdAt: donation.created_at,

      donorName: donation.name,

      phone: donation.phone,

      email: donation.email ?? undefined,

      category: donation.category as DonationCategoryKey,

      categoryName: category?.en ?? donation.category,

      amount: Number(donation.amount),

      ladduCount: donation.laddu_count ?? undefined,

      utrRef: donation.utr_ref,

      message: donation.message ?? undefined,

      payeeName: siteConfig.upi.payeeName,

      payeeUpiId: siteConfig.upi.id,

      sevaMessage: getSevaMessage(donation.category as DonationCategoryKey),
    };
  });
