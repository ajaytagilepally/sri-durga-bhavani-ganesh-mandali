/* eslint-disable @typescript-eslint/no-explicit-any */
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/* =========================================================
   ADMIN AUTHORIZATION
   ========================================================= */

async function assertAdmin(context: { supabase: any; userId: string }) {
  const { data, error } = await context.supabase.rpc("has_role", {
    _user_id: context.userId,
    _role: "admin",
  });

  if (error) {
    console.error("Admin role check failed:", error);
    throw new Error("Authorization check failed");
  }

  if (!data) {
    throw new Error("Forbidden");
  }
}

/* =========================================================
   GET CURRENT ADMIN
   ========================================================= */

export const getMe = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });

    if (error) {
      console.error("getMe role check failed:", error);
      throw new Error("Could not verify administrator access");
    }

    return {
      userId: context.userId,
      isAdmin: !!data,
    };
  });

/* =========================================================
   CLAIM ADMIN ROLE
   ========================================================= */

export const claimAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const adminEmail = (process.env["ADMIN_EMAIL"] || "bhagwadalbswd@gmail.com").trim();

    const { data, error } = await context.supabase.rpc("claim_admin_role", {
      _admin_email: adminEmail,
    });

    if (error) {
      console.error("claimAdmin failed:", error);
      throw new Error("Could not verify administrator access");
    }

    return {
      granted: !!data,
    };
  });

/* =========================================================
   DONATION DASHBOARD STATISTICS
   ========================================================= */

export const adminDonationStats = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data, error } = await supabaseAdmin
      .from("donations")
      .select("status, amount, category");

    if (error) {
      console.error("adminDonationStats failed:", error);
      throw new Error("Could not load donation statistics");
    }

    const allDonations = data ?? [];

    /* VERIFIED ONLY */

    const verifiedDonations = allDonations.filter((d) => d.status === "verified");

    /* VERIFIED AMOUNT */

    const verifiedAmount = verifiedDonations.reduce((sum, d) => sum + Number(d.amount || 0), 0);

    /* PENDING VERIFICATION */

    const pendingCount = allDonations.filter(
      (d) => d.status === "submitted" || d.status === "pending",
    ).length;

    /* VERIFIED COUNT */

    const totalVerified = verifiedDonations.length;

    /* CATEGORY TOTALS */

    const byCategory: Record<string, number> = {};

    verifiedDonations.forEach((d) => {
      if (!d.category) return;

      byCategory[d.category] = (byCategory[d.category] || 0) + Number(d.amount || 0);
    });

    return {
      verifiedAmount,
      pendingCount,
      totalVerified,
      byCategory,
    };
  });

/* =========================================================
   DONATIONS - PAGINATED
   ========================================================= */

export const adminListDonations = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        page: z.number().int().min(1).default(1),
        pageSize: z.number().int().min(1).max(100).default(25),
      })
      .parse(input ?? {}),
  )
  .handler(async ({ context, data }) => {
    await assertAdmin(context);

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const from = (data.page - 1) * data.pageSize;
    const to = from + data.pageSize - 1;

    const {
      data: donations,
      error,
      count,
    } = await supabaseAdmin
      .from("donations")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) {
      console.error("adminListDonations failed:", error);
      throw new Error("Could not load donations");
    }

    const total = count ?? 0;

    return {
      data: donations ?? [],
      total,
      page: data.page,
      pageSize: data.pageSize,
      totalPages: Math.max(1, Math.ceil(total / data.pageSize)),
    };
  });

/* =========================================================
   SEARCH DONATION BY UTR / REFERENCE NUMBER
   ========================================================= */

export const adminFindDonationByUtr = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        utrRef: z.string().trim().min(4, "Please enter a UTR / reference number.").max(64),
      })
      .parse(input),
  )
  .handler(async ({ context, data }) => {
    await assertAdmin(context);

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const utrRef = data.utrRef.trim().toUpperCase();

    const { data: donation, error } = await supabaseAdmin
      .from("donations")
      .select("*")
      .eq("utr_ref", utrRef)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("adminFindDonationByUtr failed:", error);
      throw new Error("Could not search the UTR / reference number.");
    }

    return {
      found: !!donation,
      donation: donation ?? null,
    };
  });

/* =========================================================
   VERIFY / UPDATE DONATION
   ========================================================= */

export const adminVerifyDonation = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => {
    if (!input || typeof input !== "object") {
      throw new Error("Donation verification data is missing.");
    }

    return z
      .object({
        id: z.string().uuid(),
        status: z.enum(["verified", "failed", "cancelled", "pending", "submitted"]),
      })
      .parse(input);
  })
  .handler(async ({ context, data }) => {
    await assertAdmin(context);

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const patch = {
      status: data.status,
      verified_at: data.status === "verified" ? new Date().toISOString() : null,
    };

    const { error } = await supabaseAdmin.from("donations").update(patch).eq("id", data.id);

    if (error) {
      console.error("adminVerifyDonation failed:", error);
      throw new Error("Could not update donation");
    }

    return {
      ok: true,
    };
  });

/* =========================================================
   BOOKINGS - PAGINATED
   ========================================================= */

export const adminListBookings = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        page: z.number().int().min(1).default(1),
        pageSize: z.number().int().min(1).max(100).default(25),
      })
      .parse(input ?? {}),
  )
  .handler(async ({ context, data }) => {
    await assertAdmin(context);

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const from = (data.page - 1) * data.pageSize;
    const to = from + data.pageSize - 1;

    const {
      data: bookings,
      error,
      count,
    } = await supabaseAdmin
      .from("pooja_bookings")
      .select("*, pooja_slots(slot_date, start_time, end_time)", {
        count: "exact",
      })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) {
      console.error("adminListBookings failed:", error);
      throw new Error("Could not load bookings");
    }

    const total = count ?? 0;

    return {
      data: bookings ?? [],
      total,
      page: data.page,
      pageSize: data.pageSize,
      totalPages: Math.max(1, Math.ceil(total / data.pageSize)),
    };
  });

/* =========================================================
   UPDATE BOOKING
   ========================================================= */

export const adminUpdateBooking = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => {
    if (!input || typeof input !== "object") {
      throw new Error("Booking update data is missing.");
    }

    return z
      .object({
        id: z.string().uuid(),
        status: z.enum(["confirmed", "cancelled", "completed"]),
      })
      .parse(input);
  })
  .handler(async ({ context, data }) => {
    await assertAdmin(context);

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { error } = await supabaseAdmin
      .from("pooja_bookings")
      .update({
        status: data.status,
      })
      .eq("id", data.id);

    if (error) {
      console.error("adminUpdateBooking failed:", error);
      throw new Error("Could not update booking");
    }

    return {
      ok: true,
    };
  });
