import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

function publicClient() {
  const url = process.env.SUPABASE_URL!;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY!;
  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
          h.delete("Authorization");
        }
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

export const listSlots = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = publicClient();
  const today = new Date().toISOString().slice(0, 10);
  const { data: slots, error } = await supabase
    .from("pooja_slots")
    .select("id, slot_date, start_time, end_time, capacity, is_blocked")
    .gte("slot_date", today)
    .order("slot_date", { ascending: true })
    .order("start_time", { ascending: true });
  if (error) throw new Error("Could not load slots");

  const { data: bookings } = await supabase
    .from("pooja_bookings")
    .select("slot_id, status")
    .eq("status", "confirmed");

  const counts = new Map<string, number>();
  (bookings ?? []).forEach((b) => counts.set(b.slot_id, (counts.get(b.slot_id) ?? 0) + 1));

  return (slots ?? []).map((s) => ({
    ...s,
    booked: counts.get(s.id) ?? 0,
    available: Math.max(0, s.capacity - (counts.get(s.id) ?? 0)),
  }));
});

const createSchema = z.object({
  slotId: z.string().uuid(),
  name: z.string().trim().min(2).max(100),
  gothram: z.string().trim().min(1).max(100),
  phone: z.string().trim().min(10).max(20),
  address: z.string().trim().min(3).max(500),
});

export const createBooking = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => createSchema.parse(input))
  .handler(async ({ data }) => {
    const supabase = publicClient();
    const { data: result, error } = await supabase.rpc("create_pooja_booking", {
      _slot_id: data.slotId,
      _name: data.name,
      _gothram: data.gothram,
      _phone: data.phone,
      _address: data.address,
    });
    if (error) {
      const msg = error.message || "";
      if (msg.includes("slot_full")) throw new Error("This slot is fully booked. Please pick another.");
      if (msg.includes("slot_blocked")) throw new Error("This slot is not available.");
      if (msg.includes("slot_past")) throw new Error("This slot has already passed.");
      if (msg.includes("invalid_input")) throw new Error("Please fill all fields correctly.");
      console.error("createBooking error", error);
      throw new Error("Could not create your booking. Please try again.");
    }
    const row = Array.isArray(result) ? result[0] : result;

    try {
      const { notifyAdmin } = await import("@/lib/notify.server");
      await notifyAdmin({
        template: "booking_received",
        subject: "New pooja booking",
        rows: [
          ["Booking ID", String(row.booking_id).slice(0, 8).toUpperCase()],
          ["Name", data.name],
          ["Gothram", data.gothram],
          ["Phone Number", data.phone],
          ["Address", data.address],
          ["Booking Date", String(row.slot_date)],
          ["Time Slot", `${String(row.start_time).slice(0, 5)} - ${String(row.end_time).slice(0, 5)}`],
          ["Submitted", new Date().toLocaleString("en-IN")],
        ],
        meta: { booking_id: row.booking_id },
      });
    } catch (e) {
      console.error("booking notify failed", e);
    }

    return {
      bookingId: row.booking_id as string,
      slotDate: row.slot_date as string,
      startTime: row.start_time as string,
      endTime: row.end_time as string,
    };
  });
