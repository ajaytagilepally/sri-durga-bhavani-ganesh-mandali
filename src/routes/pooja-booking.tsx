import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { queryOptions, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { T, Bi, useLang } from "@/lib/lang";
import { listSlots, createBooking } from "@/lib/bookings.functions";
// import { downloadBookingReceipt } from "@/lib/pdf-receipt";
import { downloadBookingReceipt } from "@/lib/pdf-receipt";

const slotsQuery = queryOptions({
  queryKey: ["pooja-slots"],
  queryFn: () => listSlots(),
  staleTime: 0,
});

export const Route = createFileRoute("/pooja-booking")({
  head: () => ({
    meta: [
      { title: "పూజ బుకింగ్ · Pooja Booking — Durga Bhavani Ganesh Mandali" },
      {
        name: "description",
        content: "Reserve your personal pooja slot during our 5th anniversary Ganesh Utsav.",
      },
      { property: "og:title", content: "Book Your Pooja · Durga Bhavani Ganesh Mandali" },
      {
        property: "og:description",
        content: "Pick a date and time slot for your family's pooja during Utsav.",
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(slotsQuery),
  component: BookingPage,
});

type Slot = Awaited<ReturnType<typeof listSlots>>[number];
type Step = "pick" | "form" | "success";

function fmtTime(t: string) {
  const [h, m] = t.split(":").map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
}

function BookingPage() {
  const { lang } = useLang();
  const { data: slots } = useSuspenseQuery(slotsQuery);
  const create = useServerFn(createBooking);
  const queryClient = useQueryClient();
  const dates = useMemo(() => {
    const set = new Set<string>();
    slots.forEach((s) => set.add(s.slot_date));
    return Array.from(set).sort();
  }, [slots]);

  const [step, setStep] = useState<Step>("pick");
  const [date, setDate] = useState<string>(dates[0] ?? "");
  const [slot, setSlot] = useState<Slot | null>(null);
  const [form, setForm] = useState({ name: "", gothram: "", phone: "", address: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<null | {
    bookingId: string;
    slotDate: string;
    startTime: string;
    endTime: string;
  }>(null);

  const daySlots = slots.filter((s) => s.slot_date === date);

  const canSubmit =
    slot &&
    form.name.trim().length >= 2 &&
    form.gothram.trim() &&
    form.phone.trim().length >= 10 &&
    form.address.trim();

  async function handleSubmit() {
    if (!slot || !canSubmit) return;

    setSubmitting(true);
    setError(null);

    try {
      const res = await create({ data: { slotId: slot.id, ...form } });

      // Refresh slot availability after successful booking
      await queryClient.invalidateQueries({
        queryKey: ["pooja-slots"],
      });

      setReceipt(res);
      setStep("success");
    } catch (e: any) {
      setError(e?.message ?? "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-heritage-deep text-cream">
      <Nav />
      <main className="max-w-4xl mx-auto px-6 pt-32 pb-20">
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-3">
            <T te="పూజ బుకింగ్" en="Pooja Booking" />
          </p>
          <h1 className="text-4xl md:text-5xl">
            <Bi
              te={<span className="font-telugu">మీ కుటుంబ పూజ కోసం సమయాన్ని ఎంచుకోండి</span>}
              en={
                <span className="font-serif italic gold-gradient">Reserve Your Family Pooja</span>
              }
            />
          </h1>
          <p className="text-cream/60 mt-3 text-sm">
            <T
              te="ఉత్సవ 11 రోజులలో మీకు నచ్చిన తేదీ మరియు సమయాన్ని ఎంచుకోండి."
              en="Choose a date and time slot during the 11-day Utsav."
            />
          </p>
        </motion.header>

        {step === "pick" && (
          <section>
            <h2 className="text-gold uppercase tracking-widest text-xs mb-3">
              <T te="తేదీ" en="Select date" />
            </h2>
            <div className="flex flex-wrap gap-2 mb-8">
              {dates.length === 0 && (
                <p className="text-cream/60 text-sm">
                  <T
                    te="ప్రస్తుతం స్లాట్‌లు అందుబాటులో లేవు."
                    en="No slots are currently available."
                  />
                </p>
              )}
              {dates.map((d) => {
                const active = d === date;
                const parsed = new Date(d + "T00:00:00");
                return (
                  <button
                    key={d}
                    onClick={() => {
                      setDate(d);
                      setSlot(null);
                    }}
                    className={`px-4 py-3 rounded-md border text-left transition ${
                      active
                        ? "border-gold bg-gold/15 text-cream"
                        : "border-gold/25 text-cream/70 hover:border-gold/60"
                    }`}
                  >
                    <div className="text-[10px] tracking-widest uppercase text-gold">
                      {parsed.toLocaleDateString(undefined, { weekday: "short" })}
                    </div>
                    <div className="text-sm">
                      {parsed.toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                    </div>
                  </button>
                );
              })}
            </div>

            {date && (
              <>
                <h2 className="text-gold uppercase tracking-widest text-xs mb-3">
                  <T te="సమయం" en="Select time" />
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-8">
                  {daySlots.map((s) => {
                    const full = s.available <= 0 || s.is_blocked;
                    const active = slot?.id === s.id;
                    return (
                      <button
                        key={s.id}
                        disabled={full}
                        onClick={() => setSlot(s)}
                        className={`px-3 py-3 rounded-md border text-sm transition ${
                          full
                            ? "border-cream/10 text-cream/30 cursor-not-allowed"
                            : active
                              ? "border-gold bg-gold/15"
                              : "border-gold/25 hover:border-gold/60"
                        }`}
                      >
                        <div>{fmtTime(s.start_time)}</div>
                        <div className="text-[10px] uppercase tracking-widest opacity-70 mt-1">
                          {full ? (
                            <T te="నిండింది" en="Full" />
                          ) : (
                            <>
                              {s.available}/{s.capacity} <T te="మిగిలింది" en="left" />
                            </>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
                <button
                  disabled={!slot}
                  onClick={() => setStep("form")}
                  className="w-full py-3 rounded-md bg-gold text-heritage-deep font-medium tracking-widest uppercase text-xs disabled:opacity-40"
                >
                  <T te="ముందుకు" en="Continue" />
                </button>
              </>
            )}
          </section>
        )}

        {step === "form" && slot && (
          <section className="space-y-5">
            <div className="p-4 rounded-md border border-gold/25 bg-cream/5 text-sm">
              <div className="text-gold uppercase text-[10px] tracking-widest mb-1">
                <T te="ఎంచుకున్న స్లాట్" en="Selected slot" />
              </div>
              <div>
                {new Date(slot.slot_date + "T00:00:00").toLocaleDateString(undefined, {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
                {" · "}
                {fmtTime(slot.start_time)} — {fmtTime(slot.end_time)}
              </div>
            </div>

            {(
              [
                ["name", "పేరు", "Full name"],
                ["gothram", "గోత్రం", "Gothram"],
                ["phone", "ఫోన్", "Phone (10+ digits)"],
                ["address", "చిరునామా", "Address"],
              ] as const
            ).map(([k, te, en]) => (
              <label key={k} className="block">
                <span className="block text-[11px] uppercase tracking-widest text-gold mb-1">
                  <T te={te} en={en} />
                </span>
                {k === "address" ? (
                  <textarea
                    value={form[k]}
                    onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                    rows={3}
                    className="w-full bg-cream/5 border border-gold/25 rounded-md px-3 py-2 text-sm focus:border-gold outline-none"
                  />
                ) : (
                  <input
                    value={form[k]}
                    onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                    className="w-full bg-cream/5 border border-gold/25 rounded-md px-3 py-2 text-sm focus:border-gold outline-none"
                  />
                )}
              </label>
            ))}

            {error && <p className="text-red-300 text-sm">{error}</p>}

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setStep("pick")}
                className="px-5 py-3 rounded-md border border-gold/30 text-xs uppercase tracking-widest"
              >
                <T te="వెనుకకు" en="Back" />
              </button>
              <button
                onClick={handleSubmit}
                disabled={!canSubmit || submitting}
                className="flex-1 py-3 rounded-md bg-gold text-heritage-deep font-medium tracking-widest uppercase text-xs disabled:opacity-40"
              >
                {submitting ? (
                  <T te="నమోదవుతోంది..." en="Confirming..." />
                ) : (
                  <T te="పూజ ఖరారు" en="Confirm booking" />
                )}
              </button>
            </div>
          </section>
        )}

        {step === "success" && receipt && (
          <section className="text-center space-y-6">
            <div className="text-5xl">🪔</div>
            <h2 className="text-3xl">
              <Bi
                te={<span className="font-telugu">మీ పూజ నమోదైంది</span>}
                en={
                  <span className="font-serif italic gold-gradient">Your pooja is confirmed</span>
                }
              />
            </h2>
            <p className="text-cream/70 text-sm">
              <T te="బుకింగ్ ID" en="Booking ID" />:{" "}
              <span className="text-gold">{receipt.bookingId.slice(0, 8)}</span>
            </p>
            <p className="text-cream/70 text-sm max-w-md mx-auto">
              <T
                te="మీ దర్శన సమయానికి 10 నిమిషాల ముందు దయచేసి పండాల్ కి చేరండి."
                en="Please arrive at the pandal 10 minutes before your slot time."
              />
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={async () => {
                  await downloadBookingReceipt({
                    bookingId: receipt.bookingId,
                    name: form.name,
                    gothram: form.gothram,
                    phone: form.phone,
                    address: form.address,
                    slotDate: receipt.slotDate,
                    startTime: receipt.startTime,
                    endTime: receipt.endTime,
                    lang,
                  });
                }}
                className="px-5 py-3 rounded-md bg-gold text-heritage-deep text-xs uppercase tracking-widest font-medium"
              >
                <T te="రసీదు డౌన్‌లోడ్" en="Download receipt (PDF)" />
              </button>
              <a
                href="/"
                className="px-5 py-3 rounded-md border border-gold/40 text-xs uppercase tracking-widest"
              >
                <T te="ముఖ్య పేజీ" en="Home" />
              </a>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
