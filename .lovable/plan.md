
# Ganesh Utsav Chronicle → Digital Mandali Platform

This is a large upgrade. To keep the existing beautiful site intact and the app working throughout, I'll ship it in **5 incremental phases**. Each phase leaves the site fully functional. Please confirm the plan (and answer the 3 questions at the bottom) before I start.

## Guiding rules
- **Do not rebuild.** All existing sections (Hero, Story, Timeline, 11 Days, Gallery, Videos, Team, Stats, Memory Wall, Year 5, Welcome Splash, Petals, animations, palette) stay as-is.
- Only refactor what's needed to plug into new i18n + backend.
- No secrets in frontend. All privileged work in server functions.

---

## Phase 1 — i18n foundation (fixes mixed-language bug)

- Add `src/i18n/en.ts` and `src/i18n/te.ts` with a nested key structure (`nav.*`, `welcome.*`, `hero.*`, `donate.*`, `booking.*`, `receipt.*`, `supporters.*`, `admin.*`, `errors.*`, `common.*`).
- Extend existing `src/lib/lang.tsx`: add `t(key)` function, persist language in `localStorage` (`gum.lang`), hydrate on load.
- Sweep every existing component (Nav, WelcomeSplash, Hero, Story, Timeline, ElevenDays, Gallery, Videos, Team, Stats, MemoryWall, Year5, Footer, DonateSection) and replace any hardcoded / `<Bi>`-mixed strings with `t()` calls. Existing content in `src/data/*.ts` that is already bilingual (`{ en, te }`) stays — it's read via a small `pick(lang, obj)` helper.
- Result: switching language swaps the **entire** UI; no leakage.

## Phase 2 — Cloud backend + schema

Enable Lovable Cloud, then create migrations for:

- `donation_categories` (idol / annadanam / laddu_token, seeded)
- `donations` (id, name, phone, category_id, amount, status enum `pending|submitted|verified|failed|cancelled`, utr_ref, provider, created_at, verified_at)
- `pooja_slots` (date, start_time, end_time, capacity, is_blocked) — generated for configured Utsav dates
- `pooja_bookings` (id, slot_id FK, name, gothram, phone, address, status, created_at) with a **unique partial index** on `(slot_id)` when capacity=1, plus a server-side capacity check in a Postgres function to prevent double-booking under race conditions
- `past_donors` (name, year, amount nullable, is_public)
- `laddu_auctions` (name, year, winning_amount, is_public)
- `notification_logs` (channel, recipient_masked, template_key, status, created_at)
- `app_role` enum + `user_roles` table + `has_role()` security-definer function (per Lovable role rules)

RLS:
- Public `anon` can `INSERT` into `donations` and `pooja_bookings` (via server fn only — writes go through `createServerFn` using publishable client or admin with explicit validation).
- Public `anon` `SELECT` limited to: `donation_categories`, `pooja_slots` (availability view, no PII), `past_donors WHERE is_public`, `laddu_auctions WHERE is_public`.
- All admin reads/writes gated by `has_role(auth.uid(),'admin')`.

## Phase 3 — Donations flow

- Remove `DonateSection` (QR) from home. Replace with a slim CTA card → **/donate**.
- New route `src/routes/donate.tsx`: 3 category cards → form (name, phone, amount, optional email/message) → UPI screen (QR + UPI ID + copy + `upi://` deep link on mobile) → **"I have paid — submit UTR"** step.
- Server fn `submitDonation` creates row with status `submitted` and optional UTR. Success screen shows "Awaiting verification". A verified donation (set by admin) triggers SMS + optional PDF acknowledgement.
- UPI values come from `src/data/config.ts` `donationConfig` (already central; extended).
- Real payment gateway is **out of scope for phase 3** — see Q1 below.

## Phase 4 — Pooja Booking

- Route `src/routes/pooja-booking.tsx`: calendar (only configured Utsav dates enabled, past disabled) → available time slots (6–9 PM, 30-min default, configurable) → devotee form (name, gothram, phone, address) → confirm.
- Server fn `createBooking` performs the capacity check inside a transaction / SQL function and returns the booking or a "slot full" error.
- Success screen with Booking ID + **PDF receipt** (generated client-side with `jspdf` — works on Android/iOS/desktop) in the currently selected language.
- SMS confirmation — see Q2.

## Phase 5 — Supporters page + Admin dashboard

- Public `/supporters`: two tabs (Idol Contributors, Laddu Auction Winners), year filter, **no PII ever shown**.
- `/admin` gated by `_authenticated` + `has_role('admin')`:
  - Overview stats
  - Donations table (search, filter, **Verify** button → triggers SMS)
  - Bookings table (view, cancel, complete, download receipt)
  - Slot management (enable/disable dates, capacity, block slot)
  - Supporters CRUD (with `is_public` toggle)
  - Config panel for editable non-secret settings (event dates, UPI display, SMS templates)
- Admin sign-in via email/password (Lovable Cloud Auth). First admin bootstrapped via a one-time SQL insert into `user_roles` after the user signs up.

## Cross-cutting
- Update `Nav` (desktop + mobile drawer) with: Home, Story, Journey, 11 Days, Gallery, Videos, **Book Pooja**, **Donate**, Supporters, language toggle. Home sections stay as anchors on `/`.
- Loading / error / empty states everywhere, translated.
- `README.md` + new `EDITING_GUIDE.md`.
- `.env.example` documenting `SUPABASE_*`, SMS provider keys, optional payment keys.

## Technical notes
- Stack: existing TanStack Start + Tailwind + Framer Motion. Add `jspdf` for receipts, `date-fns` for calendar math (both already Worker-safe).
- PDFs generated client-side to avoid Worker font/binary limits.
- All server work via `createServerFn`; admin-only paths use `requireSupabaseAuth` + `has_role` check before importing `supabaseAdmin` inside the handler.

---

## 3 questions before I start

1. **Payment verification**: real gateway integration (Razorpay is the standard for India — has UPI + webhooks + verified status) requires you to sign up and give me a key later. Should I (a) build the **manual UTR + admin verification** flow now and leave a clean seam for Razorpay later, or (b) pause after Phase 2 and wait for you to create a Razorpay account so I integrate it directly?

2. **SMS provider**: SMS in India is **not free**. Options: **MSG91** or **Fast2SMS** (₹0.15–0.25 per SMS, DLT registration required for transactional templates), or **Twilio** (₹5–7 per SMS, no DLT). Which do you want? I'll wire the notification service so it's swappable either way.

3. **First admin account**: what email should I bootstrap as the first Mandali admin? (You'll sign up on `/admin` with that email and I'll grant the admin role via migration.)
