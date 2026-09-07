import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";

import { supabase } from "@/integrations/supabase/client";

import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

import { siteConfig, type DonationCategoryKey } from "@/data/config";

import {
  downloadAllDonationsReport,
  downloadBookingReport,
  downloadDonationReport,
  downloadCsv,
} from "@/lib/reports";

import {
  getMe,
  claimAdmin,
  adminListDonations,
  adminListBookings,
  adminDonationStats,
  adminVerifyDonation,
  adminUpdateBooking,
  adminFindDonationByUtr,
} from "@/lib/admin.functions";

/* =========================================================
   ROUTE
   ========================================================= */

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      {
        title: "Admin Dashboard — Sri Durga Bhavani Ganesh Mandali",
      },
      {
        name: "description",
        content: "Mandali admin dashboard: donations, bookings, reports and settings.",
      },
      {
        name: "robots",
        content: "noindex",
      },
      {
        property: "og:title",
        content: "Mandali Admin",
      },
      {
        property: "og:description",
        content: "Restricted admin dashboard.",
      },
    ],
  }),

  component: AdminPage,
});

/* =========================================================
   TYPES
   ========================================================= */

type Tab = "dashboard" | "donations" | "bookings" | "reports" | "settings";

const TABS: Tab[] = ["dashboard", "donations", "bookings", "reports", "settings"];

const PAGE_SIZE = 25;

/* =========================================================
   SEVA RECEIPT INFORMATION
   ========================================================= */

function getSevaReceiptInfo(category: string) {
  switch (category) {
    case "idol":
      return {
        name: "Idol Seva",
        message:
          "May Lord Ganesha bless you and your family with happiness, prosperity, peace and success.",
      };

    case "laddu_token":
      return {
        name: "Laddu Token Seva",
        message:
          "May the divine blessings of Lord Ganesha bring sweetness, joy and prosperity to your family.",
      };

    case "annadanam":
      return {
        name: "Annadanam Seva",
        message:
          "May your contribution towards Annadanam bring divine blessings, peace and abundance to your family.",
      };

    default:
      return {
        name: category || "Donation",
        message:
          "Thank you for your generous contribution towards Sri Durga Bhavani Ganesh Mandali.",
      };
  }
}

/* =========================================================
   DATE / TIME HELPERS
   ========================================================= */

function formatDateTime(value: string | null | undefined) {
  if (!value) {
    return {
      date: "—",
      time: "—",
    };
  }

  const date = new Date(value);

  return {
    date: date.toLocaleDateString("en-IN", {
      timeZone: "Asia/Kolkata",
    }),

    time: date.toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
  };
}

/* =========================================================
   DOWNLOAD RECEIPT
   ========================================================= */

function downloadDonationReceipt(donation: any) {
  const seva = getSevaReceiptInfo(donation.category);

  const created = formatDateTime(donation.created_at);

  const receiptNo = donation.receipt_no || `DON-${String(donation.id).slice(0, 8).toUpperCase()}`;

  const status =
    donation.status === "verified" ? "PAYMENT SUCCESSFUL" : donation.status.toUpperCase();

  const payeeName =
    siteConfig.upi?.payeeName || siteConfig.brandEnglish || "Sri Durga Bhavani Ganesh Mandali";

  const upiId = siteConfig.upi?.id || "";

  const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>Donation Receipt - ${receiptNo}</title>

<style>
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 30px;
    background: #f5f1e8;
    font-family: Arial, Helvetica, sans-serif;
    color: #24170d;
  }

  .receipt {
    max-width: 760px;
    margin: 0 auto;
    background: white;
    border: 2px solid #c49a45;
    padding: 34px;
  }

  .header {
    text-align: center;
    border-bottom: 1px solid #d8c49a;
    padding-bottom: 22px;
    margin-bottom: 24px;
  }

  .title {
    font-size: 26px;
    font-weight: bold;
    margin-bottom: 8px;
  }

  .subtitle {
    font-size: 13px;
    color: #67543d;
    line-height: 1.5;
  }

  .receipt-number {
    margin-top: 14px;
    font-size: 12px;
    font-weight: bold;
    color: #8a671f;
  }

  .success {
    display: inline-block;
    margin: 18px 0;
    padding: 8px 14px;
    border-radius: 5px;
    background: #dcfce7;
    color: #166534;
    font-weight: bold;
    font-size: 13px;
  }

  .section-title {
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #8a671f;
    margin-top: 24px;
    margin-bottom: 10px;
    font-weight: bold;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  td {
    padding: 9px 8px;
    border-bottom: 1px solid #eee5d4;
    font-size: 13px;
  }

  td:first-child {
    width: 38%;
    color: #74634c;
  }

  td:last-child {
    font-weight: 600;
  }

  .amount {
    font-size: 22px;
    color: #8a671f;
    font-weight: bold;
  }

  .seva-message {
    margin-top: 20px;
    padding: 16px;
    background: #faf7ef;
    border-left: 4px solid #c49a45;
    font-size: 13px;
    line-height: 1.6;
  }

  .footer {
    text-align: center;
    margin-top: 28px;
    padding-top: 18px;
    border-top: 1px solid #d8c49a;
    font-size: 11px;
    color: #75644d;
    line-height: 1.6;
  }

  @media print {
    body {
      background: white;
      padding: 0;
    }

    .receipt {
      border: none;
      max-width: none;
    }
  }
</style>
</head>

<body>

<div class="receipt">

  <div class="header">
    <div class="title">
      ${escapeHtml(siteConfig.brandEnglish || "Sri Durga Bhavani Ganesh Mandali")}
    </div>

    <div class="subtitle">
      ${escapeHtml(siteConfig.addressEnglish || "")}
    </div>

    <div class="success">
      ${escapeHtml(status)}
    </div>

    <div class="receipt-number">
      Receipt No: ${escapeHtml(receiptNo)}
    </div>
  </div>

  <div class="section-title">
    Payment Details
  </div>

  <table>
    <tr>
      <td>Donation Amount</td>
      <td class="amount">
        ₹${Number(donation.amount || 0).toLocaleString("en-IN")}
      </td>
    </tr>

    <tr>
      <td>Payment Status</td>
      <td>${escapeHtml(status)}</td>
    </tr>

    <tr>
      <td>UTR / Reference Number</td>
      <td>${escapeHtml(donation.utr_ref || "—")}</td>
    </tr>

    <tr>
      <td>Payment Date</td>
      <td>${escapeHtml(created.date)}</td>
    </tr>

    <tr>
      <td>Payment Time</td>
      <td>${escapeHtml(created.time)} IST</td>
    </tr>

    <tr>
      <td>Payment Method</td>
      <td>UPI</td>
    </tr>
  </table>

  <div class="section-title">
    Donor Details
  </div>

  <table>
    <tr>
      <td>Donor Name</td>
      <td>${escapeHtml(donation.name || "—")}</td>
    </tr>

    <tr>
      <td>Phone Number</td>
      <td>${escapeHtml(donation.phone || "—")}</td>
    </tr>

    <tr>
      <td>Email</td>
      <td>${escapeHtml(donation.email || "—")}</td>
    </tr>
  </table>

  <div class="section-title">
    Payee Details
  </div>

  <table>
    <tr>
      <td>Payee Name</td>
      <td>${escapeHtml(payeeName)}</td>
    </tr>

    <tr>
      <td>UPI ID</td>
      <td>${escapeHtml(upiId || "—")}</td>
    </tr>
  </table>

  <div class="section-title">
    Seva Details
  </div>

  <table>
    <tr>
      <td>Seva Selected</td>
      <td>${escapeHtml(seva.name)}</td>
    </tr>
  </table>

  <div class="seva-message">
    <strong>Divine Message</strong><br />
    ${escapeHtml(seva.message)}
  </div>

  <div class="footer">
    Thank you for supporting Sri Durga Bhavani Ganesh Mandali.<br />
    This receipt confirms that the payment was verified by the Mandali administration.
  </div>

</div>

</body>
</html>
`;

  const blob = new Blob([html], {
    type: "text/html;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = `${receiptNo}.html`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);

  /*
   * Open the receipt in a new tab as well.
   * The user can choose Print → Save as PDF.
   */
  const printWindow = window.open("", "_blank");

  if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
  }
}

/* =========================================================
   HTML ESCAPE
   ========================================================= */

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* =========================================================
   ADMIN PAGE
   ========================================================= */

function AdminPage() {
  const nav = useNavigate();

  const meFn = useServerFn(getMe);
  const claimFn = useServerFn(claimAdmin);

  const donFn = useServerFn(adminListDonations);
  const bookFn = useServerFn(adminListBookings);

  const statsFn = useServerFn(adminDonationStats);

  const verifyFn = useServerFn(adminVerifyDonation);
  const updateBookFn = useServerFn(adminUpdateBooking);

  const searchUtrFn = useServerFn(adminFindDonationByUtr);

  /* =======================================================
     AUTH STATE
     ======================================================= */

  const [status, setStatus] = useState<"loading" | "unauth" | "forbidden" | "ok">("loading");

  const [tab, setTab] = useState<Tab>("dashboard");

  /* =======================================================
     DONATIONS
     ======================================================= */

  const [donations, setDonations] = useState<any[]>([]);
  const [donationTotal, setDonationTotal] = useState(0);
  const [donationPage, setDonationPage] = useState(1);
  const [donationTotalPages, setDonationTotalPages] = useState(1);
  const [loadingDonations, setLoadingDonations] = useState(false);

  /* =======================================================
     BOOKINGS
     ======================================================= */

  const [bookings, setBookings] = useState<any[]>([]);
  const [bookingTotal, setBookingTotal] = useState(0);
  const [bookingPage, setBookingPage] = useState(1);
  const [bookingTotalPages, setBookingTotalPages] = useState(1);
  const [loadingBookings, setLoadingBookings] = useState(false);

  /* =======================================================
     STATISTICS
     ======================================================= */

  const [verifiedAmount, setVerifiedAmount] = useState(0);
  const [totalVerified, setTotalVerified] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [verifiedByCategory, setVerifiedByCategory] = useState<Record<string, number>>({});
  const [loadingStats, setLoadingStats] = useState(false);

  /* =======================================================
     ERROR
     ======================================================= */

  const [err, setErr] = useState<string | null>(null);

  /* =======================================================
     DONATION FILTERS
     ======================================================= */

  const [donQ, setDonQ] = useState("");
  const [donCat, setDonCat] = useState<DonationCategoryKey | "all">("all");
  const [donStatus, setDonStatus] = useState<string>("all");

  /* =======================================================
     UTR SEARCH
     ======================================================= */

  const [utrSearch, setUtrSearch] = useState("");
  const [utrResult, setUtrResult] = useState<any | null>(null);
  const [utrSearched, setUtrSearched] = useState(false);
  const [searchingUtr, setSearchingUtr] = useState(false);

  /* =======================================================
     BOOKING FILTERS
     ======================================================= */

  const [bookQ, setBookQ] = useState("");
  const [bookDate, setBookDate] = useState("");
  const [bookSlot, setBookSlot] = useState("all");

  /* =======================================================
     INITIAL ADMIN AUTHENTICATION
     ======================================================= */

  useEffect(() => {
    let mounted = true;

    (async () => {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        if (mounted) {
          setStatus("unauth");
        }

        return;
      }

      try {
        let me = await meFn();

        if (!me.isAdmin) {
          try {
            const res = await claimFn();

            if (res.granted) {
              me = await meFn();
            }
          } catch {
            // Ignore automatic claim errors.
          }
        }

        if (!mounted) return;

        if (!me.isAdmin) {
          setStatus("forbidden");
        } else {
          setStatus("ok");
        }
      } catch (error) {
        console.error("Admin authentication failed:", error);

        if (mounted) {
          setStatus("unauth");
        }
      }
    })();

    return () => {
      mounted = false;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* =======================================================
     LOAD DONATION STATISTICS
     ======================================================= */

  async function refreshDonationStats() {
    try {
      setLoadingStats(true);

      const result = await statsFn();

      setVerifiedAmount(result.verifiedAmount);
      setTotalVerified(result.totalVerified);
      setPendingCount(result.pendingCount);
      setVerifiedByCategory(result.byCategory);
    } catch (error: any) {
      console.error("Failed to load donation statistics:", error);

      setErr(error?.message ?? "Could not load donation statistics");
    } finally {
      setLoadingStats(false);
    }
  }

  /* =======================================================
     LOAD DONATIONS
     ======================================================= */

  async function refreshDonations(page = donationPage) {
    try {
      setLoadingDonations(true);
      setErr(null);

      const result = await donFn({
        data: {
          page,
          pageSize: PAGE_SIZE,
        },
      });

      setDonations(result.data);
      setDonationTotal(result.total);
      setDonationTotalPages(result.totalPages);
      setDonationPage(result.page);
    } catch (error: any) {
      console.error("Failed to load donations:", error);

      setErr(error?.message ?? "Could not load donations");
    } finally {
      setLoadingDonations(false);
    }
  }

  /* =======================================================
     SEARCH UTR
     ======================================================= */

  async function searchUtr() {
    const value = utrSearch.trim();

    if (!value) {
      setErr("Please enter a UTR / reference number.");
      return;
    }

    try {
      setSearchingUtr(true);
      setErr(null);
      setUtrSearched(false);
      setUtrResult(null);

      const result = await searchUtrFn({
        data: {
          utrRef: value,
        },
      });

      setUtrSearched(true);
      setUtrResult(result.donation);
    } catch (error: any) {
      console.error("UTR search failed:", error);

      setErr(error?.message ?? "Could not search the UTR / reference number.");
    } finally {
      setSearchingUtr(false);
    }
  }

  /* =======================================================
     LOAD BOOKINGS
     ======================================================= */

  async function refreshBookings(page = bookingPage) {
    try {
      setLoadingBookings(true);
      setErr(null);

      const result = await bookFn({
        data: {
          page,
          pageSize: PAGE_SIZE,
        },
      });

      setBookings(result.data);
      setBookingTotal(result.total);
      setBookingTotalPages(result.totalPages);
      setBookingPage(result.page);
    } catch (error: any) {
      console.error("Failed to load bookings:", error);

      setErr(error?.message ?? "Could not load bookings");
    } finally {
      setLoadingBookings(false);
    }
  }

  /* =======================================================
     INITIAL DATA LOAD
     ======================================================= */

  useEffect(() => {
    if (status !== "ok") return;

    refreshDonations(1);
    refreshBookings(1);
    refreshDonationStats();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  /* =======================================================
     REFRESH EVERYTHING
     ======================================================= */

  async function refresh() {
    await Promise.all([
      refreshDonations(donationPage),
      refreshBookings(bookingPage),
      refreshDonationStats(),
    ]);
  }

  /* =======================================================
     DONATION STATUS UPDATE
     ======================================================= */

  async function verify(id: string, s: "verified" | "failed" | "pending") {
    try {
      setErr(null);

      await verifyFn({
        data: {
          id,
          status: s,
        },
      });

      /*
       * If the UTR search result is the same donation,
       * update it immediately.
       */
      if (utrResult?.id === id) {
        setUtrResult((old: any) =>
          old
            ? {
                ...old,
                status: s,
                verified_at: s === "verified" ? new Date().toISOString() : null,
              }
            : old,
        );
      }

      await Promise.all([refreshDonations(donationPage), refreshDonationStats()]);
    } catch (error: any) {
      console.error("Donation status update failed:", error);

      setErr(error?.message ?? "Could not update donation");
    }
  }

  /* =======================================================
     BOOKING STATUS UPDATE
     ======================================================= */

  async function updBooking(id: string, s: "confirmed" | "cancelled" | "completed") {
    try {
      setErr(null);

      await updateBookFn({
        data: {
          id,
          status: s,
        },
      });

      await refreshBookings(bookingPage);
    } catch (error: any) {
      console.error("Booking status update failed:", error);

      setErr(error?.message ?? "Could not update booking");
    }
  }

  /* =======================================================
     SIGN OUT
     ======================================================= */

  async function signOut() {
    await supabase.auth.signOut();

    nav({ to: "/auth" });
  }

  /* =======================================================
     DONATION FILTERING
     ======================================================= */

  const filteredDonations = useMemo(() => {
    const q = donQ.trim().toLowerCase();

    return donations.filter((d) => {
      if (donCat !== "all" && d.category !== donCat) {
        return false;
      }

      if (donStatus !== "all" && d.status !== donStatus) {
        return false;
      }

      if (!q) {
        return true;
      }

      return [d.name, d.phone, d.utr_ref, d.email]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [donations, donQ, donCat, donStatus]);

  /* =======================================================
     BOOKING SLOT OPTIONS
     ======================================================= */

  const slotOptions = useMemo(() => {
    const set = new Set<string>();

    bookings.forEach((b) => {
      if (b.pooja_slots?.start_time) {
        set.add(b.pooja_slots.start_time.slice(0, 5));
      }
    });

    return Array.from(set).sort();
  }, [bookings]);

  /* =======================================================
     BOOKING FILTERING
     ======================================================= */

  const filteredBookings = useMemo(() => {
    const q = bookQ.trim().toLowerCase();

    return bookings.filter((b) => {
      if (bookDate && b.pooja_slots?.slot_date !== bookDate) {
        return false;
      }

      if (bookSlot !== "all" && b.pooja_slots?.start_time?.slice(0, 5) !== bookSlot) {
        return false;
      }

      if (!q) {
        return true;
      }

      return [b.name, b.gothram, b.phone, b.address]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [bookings, bookQ, bookDate, bookSlot]);

  /* =======================================================
     PAGINATION
     ======================================================= */

  function donationPreviousPage() {
    if (donationPage > 1) {
      refreshDonations(donationPage - 1);
    }
  }

  function donationNextPage() {
    if (donationPage < donationTotalPages) {
      refreshDonations(donationPage + 1);
    }
  }

  function bookingPreviousPage() {
    if (bookingPage > 1) {
      refreshBookings(bookingPage - 1);
    }
  }

  function bookingNextPage() {
    if (bookingPage < bookingTotalPages) {
      refreshBookings(bookingPage + 1);
    }
  }

  /* =======================================================
     AUTH STATES
     ======================================================= */

  if (status === "loading") {
    return (
      <Shell>
        <p className="text-cream/60">Loading…</p>
      </Shell>
    );
  }

  if (status === "unauth") {
    return (
      <Shell>
        <p className="text-cream/70 mb-4">You must sign in to access the admin dashboard.</p>

        <Link
          to="/auth"
          className="px-5 py-3 rounded-md bg-gold text-heritage-deep uppercase text-xs tracking-widest"
        >
          Sign in
        </Link>
      </Shell>
    );
  }

  if (status === "forbidden") {
    return (
      <Shell>
        <p className="text-cream/70 mb-2">Signed in, but your account is not an admin.</p>

        <p className="text-cream/50 text-sm">
          Sign in with the administrator address ({siteConfig.adminEmail}) to get access
          automatically.
        </p>

        <button onClick={signOut} className="mt-4 text-xs underline text-gold">
          Sign out
        </button>
      </Shell>
    );
  }

  /* =======================================================
     DASHBOARD
     ======================================================= */

  const byCat = (k: DonationCategoryKey) => verifiedByCategory[k] ?? 0;

  return (
    <Shell>
      {/* HEADER */}

      <div className="flex justify-between items-start mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-serif italic gold-gradient">Admin Dashboard</h1>

          <p className="text-cream/60 text-sm">
            {siteConfig.brandEnglish} · {siteConfig.addressEnglish}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={refresh}
            disabled={loadingStats || loadingDonations || loadingBookings}
            className="text-xs uppercase tracking-widest text-gold border border-gold/30 rounded-full px-3 py-1 hover:bg-gold/10 disabled:opacity-40"
          >
            {loadingStats || loadingDonations || loadingBookings ? "Refreshing…" : "Refresh"}
          </button>

          <button
            onClick={signOut}
            className="text-xs uppercase tracking-widest text-cream/60 hover:text-gold border border-gold/30 rounded-full px-3 py-1"
          >
            Sign out
          </button>
        </div>
      </div>

      {/* TABS */}

      <div className="flex gap-1 border-b border-gold/20 mb-6 overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-xs uppercase tracking-widest whitespace-nowrap ${
              tab === t ? "text-gold border-b-2 border-gold" : "text-cream/50 hover:text-cream/80"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {err && (
        <div className="mb-4 rounded-md border border-red-400/30 bg-red-500/10 px-4 py-3 text-red-200 text-sm">
          {err}
        </div>
      )}

      {/* ===================================================
          DASHBOARD
      =================================================== */}

      {tab === "dashboard" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Stat
              label="Verified ₹"
              value={loadingStats ? "Loading…" : `₹${verifiedAmount.toLocaleString("en-IN")}`}
            />

            <Stat label="Pending Verify" value={String(pendingCount)} />

            <Stat label="Verified Donations" value={String(totalVerified)} />

            <Stat label="Total Bookings" value={String(bookingTotal)} />
          </div>

          <div className="grid md:grid-cols-3 gap-3">
            {siteConfig.donationCategories.map((c) => (
              <Stat
                key={c.key}
                label={`${c.en} — Verified`}
                value={loadingStats ? "Loading…" : `₹${byCat(c.key).toLocaleString("en-IN")}`}
              />
            ))}
          </div>

          <div className="border border-gold/20 rounded-md p-4 bg-cream/5">
            <p className="text-[10px] uppercase tracking-widest text-gold mb-2">
              Verified Payment Summary
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-cream/50 text-xs">Verified amount</p>

                <p className="text-xl">₹{verifiedAmount.toLocaleString("en-IN")}</p>
              </div>

              <div>
                <p className="text-cream/50 text-xs">Verified payments</p>

                <p className="text-xl">{totalVerified}</p>
              </div>

              <div>
                <p className="text-cream/50 text-xs">Waiting for verification</p>

                <p className="text-xl">{pendingCount}</p>
              </div>
            </div>
          </div>

          <div className="border border-gold/20 rounded-md p-4 bg-cream/5">
            <p className="text-[10px] uppercase tracking-widest text-gold mb-2">
              Latest Loaded Donation
            </p>

            <p className="text-cream/70 text-sm">
              {donations[0]
                ? `${donations[0].name} · ₹${Number(donations[0].amount).toLocaleString(
                    "en-IN",
                  )} · ${donations[0].status}`
                : "—"}
            </p>
          </div>

          <div className="border border-gold/20 rounded-md p-4 bg-cream/5">
            <p className="text-[10px] uppercase tracking-widest text-gold mb-2">Records</p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p className="text-cream/50 text-xs">All Donation Records</p>

                <p className="text-xl">{donationTotal}</p>
              </div>

              <div>
                <p className="text-cream/50 text-xs">Verified Donations</p>

                <p className="text-xl">{totalVerified}</p>
              </div>

              <div>
                <p className="text-cream/50 text-xs">Pooja Bookings</p>

                <p className="text-xl">{bookingTotal}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================
          DONATIONS
      =================================================== */}

      {tab === "donations" && (
        <div>
          {/* UTR SEARCH */}

          <div className="mb-5 border border-gold/30 rounded-lg p-4 bg-gold/5">
            <p className="text-xs uppercase tracking-widest text-gold mb-2">
              Verify Donation by UTR / Reference Number
            </p>

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                value={utrSearch}
                onChange={(e) => setUtrSearch(e.target.value.toUpperCase())}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    searchUtr();
                  }
                }}
                placeholder="Enter UTR / Reference Number"
                className="flex-1 px-4 py-3 rounded-md bg-heritage-deep border border-gold/30 text-sm font-mono"
              />

              <button
                onClick={searchUtr}
                disabled={searchingUtr}
                className="px-5 py-3 rounded-md bg-gold text-heritage-deep text-xs uppercase tracking-widest disabled:opacity-40"
              >
                {searchingUtr ? "Searching…" : "Search UTR"}
              </button>
            </div>

            {utrSearched && !utrResult && (
              <div className="mt-3 rounded-md border border-red-400/30 bg-red-500/10 p-3 text-red-200 text-sm">
                No donation found for this UTR / reference number.
              </div>
            )}

            {utrResult && (
              <div className="mt-4 rounded-lg border border-gold/20 bg-heritage-deep p-4">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div>
                    <p className="font-semibold">{utrResult.name}</p>

                    <p className="text-xs text-cream/50">
                      UTR: <span className="font-mono text-cream/80">{utrResult.utr_ref}</span>
                    </p>
                  </div>

                  <StatusPill s={utrResult.status} />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
                  <div>
                    <p className="text-[10px] uppercase text-cream/40">Amount</p>
                    <p className="text-gold">₹{Number(utrResult.amount).toLocaleString("en-IN")}</p>
                  </div>

                  <div>
                    <p className="text-[10px] uppercase text-cream/40">Seva</p>
                    <p>{getSevaReceiptInfo(utrResult.category).name}</p>
                  </div>

                  <div>
                    <p className="text-[10px] uppercase text-cream/40">Date</p>
                    <p>{formatDateTime(utrResult.created_at).date}</p>
                  </div>

                  <div>
                    <p className="text-[10px] uppercase text-cream/40">Time</p>
                    <p>{formatDateTime(utrResult.created_at).time}</p>
                  </div>

                  <div>
                    <p className="text-[10px] uppercase text-cream/40">Phone</p>
                    <p>{utrResult.phone || "—"}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {utrResult.status !== "verified" && (
                    <button
                      onClick={() => verify(utrResult.id, "verified")}
                      className="px-4 py-2 rounded-md bg-emerald-500/20 text-emerald-200 text-xs uppercase tracking-widest"
                    >
                      Mark Successful
                    </button>
                  )}

                  {utrResult.status !== "failed" && (
                    <button
                      onClick={() => verify(utrResult.id, "failed")}
                      className="px-4 py-2 rounded-md bg-red-500/20 text-red-200 text-xs uppercase tracking-widest"
                    >
                      Mark Failed
                    </button>
                  )}

                  {utrResult.status !== "pending" && (
                    <button
                      onClick={() => verify(utrResult.id, "pending")}
                      className="px-4 py-2 rounded-md bg-amber-500/20 text-amber-200 text-xs uppercase tracking-widest"
                    >
                      Mark Pending
                    </button>
                  )}

                  {utrResult.status === "verified" && (
                    <button
                      onClick={() => downloadDonationReceipt(utrResult)}
                      className="px-4 py-2 rounded-md bg-gold text-heritage-deep text-xs uppercase tracking-widest"
                    >
                      Download Receipt
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* NORMAL FILTERS */}

          <div className="flex flex-wrap gap-2 mb-4">
            <input
              value={donQ}
              onChange={(e) => setDonQ(e.target.value)}
              placeholder="Search name, phone, UTR…"
              className="flex-1 min-w-[200px] px-4 py-2 rounded-md bg-heritage/60 border border-gold/20 text-sm"
            />

            <select
              value={donCat}
              onChange={(e) => setDonCat(e.target.value as DonationCategoryKey | "all")}
              className="px-3 py-2 rounded-md bg-heritage/60 border border-gold/20 text-sm"
            >
              <option value="all">All categories</option>

              {siteConfig.donationCategories.map((c) => (
                <option key={c.key} value={c.key}>
                  {c.en}
                </option>
              ))}
            </select>

            <select
              value={donStatus}
              onChange={(e) => setDonStatus(e.target.value)}
              className="px-3 py-2 rounded-md bg-heritage/60 border border-gold/20 text-sm"
            >
              {["all", "submitted", "pending", "verified", "failed", "cancelled"].map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <button
              onClick={() => downloadAllDonationsReport(filteredDonations)}
              className="px-4 py-2 rounded-md bg-gold text-heritage-deep text-xs uppercase tracking-widest"
            >
              Excel
            </button>

            <button
              onClick={() =>
                downloadCsv(
                  filteredDonations.map((d) => ({
                    Name: d.name,
                    Phone: d.phone,
                    Category: d.category,
                    Amount: Number(d.amount),
                    UTR: d.utr_ref ?? "",
                    Status: d.status,
                    Date: formatDateTime(d.created_at).date,
                    Time: formatDateTime(d.created_at).time,
                  })),
                  "donations.csv",
                )
              }
              className="px-4 py-2 rounded-md border border-gold/40 text-gold text-xs uppercase tracking-widest"
            >
              CSV
            </button>
          </div>

          {/* DONATION TABLE */}

          <div className="overflow-x-auto border border-gold/20 rounded-md">
            <table className="w-full text-sm">
              <thead className="bg-cream/5 text-gold uppercase text-[10px] tracking-widest">
                <tr>
                  <th className="p-2 text-left">Date</th>

                  <th className="p-2 text-left">Time</th>

                  <th className="p-2 text-left">Name</th>

                  <th className="p-2 text-left">Phone</th>

                  <th className="p-2 text-left">Cat.</th>

                  <th className="p-2 text-right">Amount</th>

                  <th className="p-2 text-left">UTR</th>

                  <th className="p-2 text-left">Status</th>

                  <th className="p-2 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {loadingDonations ? (
                  <tr>
                    <td colSpan={9} className="p-8 text-center text-cream/50">
                      Loading donations…
                    </td>
                  </tr>
                ) : (
                  <>
                    {filteredDonations.map((d) => {
                      const dt = formatDateTime(d.created_at);

                      return (
                        <tr key={d.id} className="border-t border-gold/10">
                          <td className="p-2 whitespace-nowrap text-cream/60">{dt.date}</td>

                          <td className="p-2 whitespace-nowrap text-cream/60">{dt.time}</td>

                          <td className="p-2">{d.name}</td>

                          <td className="p-2 text-cream/70">{d.phone}</td>

                          <td className="p-2 text-cream/70">
                            {getSevaReceiptInfo(d.category).name}
                          </td>

                          <td className="p-2 text-right">
                            ₹{Number(d.amount).toLocaleString("en-IN")}
                          </td>

                          <td className="p-2 text-cream/70 font-mono text-xs">
                            {d.utr_ref ?? "—"}
                          </td>

                          <td className="p-2">
                            <StatusPill s={d.status} />
                          </td>

                          <td className="p-2 whitespace-nowrap">
                            <div className="flex flex-wrap gap-1">
                              {d.status !== "verified" && (
                                <button
                                  onClick={() => verify(d.id, "verified")}
                                  className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-200 text-xs"
                                >
                                  Verify
                                </button>
                              )}

                              {d.status !== "failed" && (
                                <button
                                  onClick={() => verify(d.id, "failed")}
                                  className="px-2 py-1 rounded bg-red-500/20 text-red-200 text-xs"
                                >
                                  Fail
                                </button>
                              )}

                              {d.status !== "pending" && (
                                <button
                                  onClick={() => verify(d.id, "pending")}
                                  className="px-2 py-1 rounded bg-amber-500/20 text-amber-200 text-xs"
                                >
                                  Pending
                                </button>
                              )}

                              {d.status === "verified" && (
                                <button
                                  onClick={() => downloadDonationReceipt(d)}
                                  className="px-2 py-1 rounded bg-gold/20 text-gold text-xs"
                                >
                                  Receipt
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}

                    {filteredDonations.length === 0 && (
                      <tr>
                        <td colSpan={9} className="p-6 text-center text-cream/50">
                          No donations match.
                        </td>
                      </tr>
                    )}
                  </>
                )}
              </tbody>
            </table>
          </div>

          <Pagination
            page={donationPage}
            totalPages={donationTotalPages}
            total={donationTotal}
            pageSize={PAGE_SIZE}
            loading={loadingDonations}
            onPrevious={donationPreviousPage}
            onNext={donationNextPage}
          />
        </div>
      )}

      {/* ===================================================
          BOOKINGS
      =================================================== */}

      {tab === "bookings" && (
        <div>
          <div className="flex flex-wrap gap-2 mb-4">
            <input
              value={bookQ}
              onChange={(e) => setBookQ(e.target.value)}
              placeholder="Search name, gothram, phone…"
              className="flex-1 min-w-[200px] px-4 py-2 rounded-md bg-heritage/60 border border-gold/20 text-sm"
            />

            <input
              type="date"
              value={bookDate}
              onChange={(e) => setBookDate(e.target.value)}
              className="px-3 py-2 rounded-md bg-heritage/60 border border-gold/20 text-sm"
            />

            <select
              value={bookSlot}
              onChange={(e) => setBookSlot(e.target.value)}
              className="px-3 py-2 rounded-md bg-heritage/60 border border-gold/20 text-sm"
            >
              <option value="all">All slots</option>

              {slotOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <button
              onClick={() => downloadBookingReport(filteredBookings)}
              className="px-4 py-2 rounded-md bg-gold text-heritage-deep text-xs uppercase tracking-widest"
            >
              Excel
            </button>
          </div>

          <div className="overflow-x-auto border border-gold/20 rounded-md">
            <table className="w-full text-sm">
              <thead className="bg-cream/5 text-gold uppercase text-[10px] tracking-widest">
                <tr>
                  <th className="p-2 text-left">Slot</th>

                  <th className="p-2 text-left">Name</th>

                  <th className="p-2 text-left">Gothram</th>

                  <th className="p-2 text-left">Phone</th>

                  <th className="p-2 text-left">Address</th>

                  <th className="p-2 text-left">Status</th>

                  <th className="p-2 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {loadingBookings ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-cream/50">
                      Loading bookings…
                    </td>
                  </tr>
                ) : (
                  <>
                    {filteredBookings.map((b) => (
                      <tr key={b.id} className="border-t border-gold/10">
                        <td className="p-2 whitespace-nowrap text-cream/70">
                          {b.pooja_slots?.slot_date} · {b.pooja_slots?.start_time?.slice(0, 5)}
                        </td>

                        <td className="p-2">{b.name}</td>

                        <td className="p-2 text-cream/70">{b.gothram}</td>

                        <td className="p-2 text-cream/70">{b.phone}</td>

                        <td className="p-2 text-cream/60 max-w-[220px] truncate" title={b.address}>
                          {b.address}
                        </td>

                        <td className="p-2">
                          <StatusPill s={b.status} />
                        </td>

                        <td className="p-2 whitespace-nowrap">
                          {b.status === "confirmed" && (
                            <div className="flex gap-1">
                              <button
                                onClick={() => updBooking(b.id, "completed")}
                                className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-200 text-xs"
                              >
                                Complete
                              </button>

                              <button
                                onClick={() => updBooking(b.id, "cancelled")}
                                className="px-2 py-1 rounded bg-red-500/20 text-red-200 text-xs"
                              >
                                Cancel
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}

                    {filteredBookings.length === 0 && (
                      <tr>
                        <td colSpan={7} className="p-6 text-center text-cream/50">
                          No bookings match.
                        </td>
                      </tr>
                    )}
                  </>
                )}
              </tbody>
            </table>
          </div>

          <Pagination
            page={bookingPage}
            totalPages={bookingTotalPages}
            total={bookingTotal}
            pageSize={PAGE_SIZE}
            loading={loadingBookings}
            onPrevious={bookingPreviousPage}
            onNext={bookingNextPage}
          />
        </div>
      )}

      {/* ===================================================
          REPORTS
      =================================================== */}

      {tab === "reports" && (
        <div className="grid md:grid-cols-2 gap-4">
          <ReportCard
            title="Pooja Booking Report"
            desc="Name, Gothram, Phone, Address, Date, Slot, Timestamp"
            count={bookingTotal}
            onClick={() => downloadBookingReport(bookings)}
          />

          {siteConfig.donationCategories.map((c) => (
            <ReportCard
              key={c.key}
              title={`${c.en} — Donation Report`}
              desc="Name, Phone, Amount, UTR, Date, Time"
              count={donations.filter((d) => d.category === c.key).length}
              onClick={() => downloadDonationReport(donations, c.key)}
            />
          ))}

          <ReportCard
            title="All Donations (combined)"
            desc="Every category in one sheet"
            count={donationTotal}
            onClick={() => downloadAllDonationsReport(donations)}
          />

          <div className="md:col-span-2 border border-gold/20 rounded-md p-4 bg-cream/5">
            <p className="text-cream/60 text-xs">
              Reports currently export the donations and bookings loaded on the current dashboard
              page. For very large reports, dedicated server-side report generation can be added
              later.
            </p>
          </div>
        </div>
      )}

      {/* ===================================================
          SETTINGS
      =================================================== */}

      {tab === "settings" && (
        <div className="space-y-3 max-w-2xl">
          <p className="text-cream/60 text-sm">
            These values live in <code className="text-gold">src/data/config.ts</code> and
            environment variables.
          </p>

          <SettingRow label="Administrator email" value={siteConfig.adminEmail} />

          <SettingRow label="UPI ID" value={siteConfig.upi.id} />

          <SettingRow label="UPI payee name" value={siteConfig.upi.payeeName} />

          <SettingRow label="UPI QR" value="Generated automatically from the UPI ID on /donate" />

          <SettingRow label="Event start" value={siteConfig.year5.eventStart} />

          <SettingRow label="Event label" value={siteConfig.year5.dateLabel} />

          <SettingRow
            label="Booking window"
            value={`${siteConfig.booking.windowStart} – ${siteConfig.booking.windowEnd}`}
          />

          <SettingRow label="Slot duration" value={`${siteConfig.booking.slotMinutes} minutes`} />

          <SettingRow label="Slot capacity" value={String(siteConfig.booking.slotCapacity)} />

          <SettingRow
            label="Donation categories"
            value={siteConfig.donationCategories.map((c) => c.en).join(", ")}
          />
        </div>
      )}
    </Shell>
  );
}

/* =========================================================
   PAGINATION
   ========================================================= */

function Pagination({
  page,
  totalPages,
  total,
  pageSize,
  loading,
  onPrevious,
  onNext,
}: {
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
  loading: boolean;
  onPrevious: () => void;
  onNext: () => void;
}) {
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;

  const end = Math.min(page * pageSize, total);

  return (
    <div className="flex items-center justify-between gap-3 flex-wrap mt-4 border border-gold/20 rounded-md p-3 bg-cream/5">
      <p className="text-xs text-cream/50">
        Showing <span className="text-cream/80">{start}</span> –{" "}
        <span className="text-cream/80">{end}</span> of{" "}
        <span className="text-cream/80">{total}</span>
      </p>

      <div className="flex items-center gap-2">
        <button
          onClick={onPrevious}
          disabled={loading || page <= 1}
          className="px-3 py-1.5 rounded-md border border-gold/30 text-gold text-xs disabled:opacity-30 disabled:cursor-not-allowed"
        >
          ← Previous
        </button>

        <span className="text-xs text-cream/60 px-2">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={onNext}
          disabled={loading || page >= totalPages}
          className="px-3 py-1.5 rounded-md border border-gold/30 text-gold text-xs disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   SHELL
   ========================================================= */

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-heritage-deep text-cream">
      <Nav />

      <main className="max-w-6xl mx-auto px-6 pt-32 pb-20">{children}</main>

      <Footer />
    </div>
  );
}

/* =========================================================
   STAT
   ========================================================= */

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-gold/20 rounded-md p-4 bg-cream/5">
      <div className="text-[10px] uppercase tracking-widest text-gold">{label}</div>

      <div className="text-xl mt-1">{value}</div>
    </div>
  );
}

/* =========================================================
   SETTINGS ROW
   ========================================================= */

function SettingRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-wrap justify-between gap-2 border border-gold/20 rounded-md p-3 bg-cream/5">
      <span className="text-[11px] uppercase tracking-widest text-gold">{label}</span>

      <span className="text-sm text-cream/80 break-all">{value}</span>
    </div>
  );
}

/* =========================================================
   REPORT CARD
   ========================================================= */

function ReportCard({
  title,
  desc,
  count,
  onClick,
}: {
  title: string;
  desc: string;
  count: number;
  onClick: () => void;
}) {
  return (
    <div className="border border-gold/20 rounded-md p-5 bg-cream/5 flex flex-col gap-2">
      <h3 className="text-gold text-sm uppercase tracking-widest">{title}</h3>

      <p className="text-cream/60 text-xs">{desc}</p>

      <p className="text-cream/50 text-xs">{count} record(s)</p>

      <button
        onClick={onClick}
        disabled={count === 0}
        className="mt-2 self-start px-4 py-2 rounded-md bg-gold text-heritage-deep text-xs uppercase tracking-widest disabled:opacity-40"
      >
        Download Excel
      </button>
    </div>
  );
}

/* =========================================================
   STATUS PILL
   ========================================================= */

function StatusPill({ s }: { s: string }) {
  const normalized = String(s || "").toLowerCase();

  const map: Record<string, string> = {
    verified: "bg-emerald-500/20 text-emerald-200 border border-emerald-400/30",

    submitted: "bg-amber-500/20 text-amber-200 border border-amber-400/30",

    pending: "bg-amber-500/20 text-amber-200 border border-amber-400/30",

    failed: "bg-red-500/20 text-red-200 border border-red-400/30",

    cancelled: "bg-red-500/20 text-red-200 border border-red-400/30",

    confirmed: "bg-emerald-500/20 text-emerald-200",

    completed: "bg-sky-500/20 text-sky-200",
  };

  const label: Record<string, string> = {
    verified: "Payment Successful",
    submitted: "Awaiting Verification",
    pending: "Payment Pending",
    failed: "Payment Failed",
    cancelled: "Cancelled",
    confirmed: "Confirmed",
    completed: "Completed",
  };

  return (
    <span
      className={`inline-flex px-2 py-1 rounded text-[10px] uppercase tracking-widest whitespace-nowrap ${
        map[normalized] ?? "bg-cream/10 text-cream/70"
      }`}
    >
      {label[normalized] ?? normalized}
    </span>
  );
}
