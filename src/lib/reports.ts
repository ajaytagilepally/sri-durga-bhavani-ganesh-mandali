// Excel/CSV report generation (client-side, from the admin dashboard data).
import * as XLSX from "xlsx";
import { siteConfig, type DonationCategoryKey } from "@/data/config";

export interface DonationRow {
  name: string;
  phone: string;
  category: DonationCategoryKey | string;
  amount: number | string;
  utr_ref: string | null;
  status: string;
  created_at: string;
}

export interface BookingRow {
  name: string;
  gothram: string;
  phone: string;
  address: string;
  status: string;
  created_at: string;
  pooja_slots?: { slot_date: string; start_time: string; end_time: string } | null;
}

function dateOf(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN");
}
function timeOf(iso: string) {
  return new Date(iso).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
}
function hhmm(t?: string) {
  return t ? t.slice(0, 5) : "";
}

function writeSheet(rows: Record<string, unknown>[], sheetName: string, fileName: string) {
  const ws = XLSX.utils.json_to_sheet(rows);
  const widths = Object.keys(rows[0] ?? { A: "" }).map((k) => ({
    wch: Math.min(40, Math.max(k.length + 2, ...rows.map((r) => String(r[k] ?? "").length + 2), 12)),
  }));
  (ws as any)["!cols"] = widths;
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName.slice(0, 30));
  XLSX.writeFile(wb, fileName);
}

export function downloadDonationReport(all: DonationRow[], category: DonationCategoryKey) {
  const cat = siteConfig.donationCategories.find((c) => c.key === category)!;
  const rows = all
    .filter((d) => d.category === category)
    .map((d) => ({
      Name: d.name,
      "Phone Number": d.phone,
      "Donation Amount": Number(d.amount),
      "UTR / Reference Number": d.utr_ref ?? "",
      Status: d.status,
      Date: dateOf(d.created_at),
      Time: timeOf(d.created_at),
    }));
  writeSheet(rows, cat.en, `${cat.en.replace(/\s+/g, "-").toLowerCase()}-donations.xlsx`);
}

export function downloadAllDonationsReport(all: DonationRow[]) {
  const rows = all.map((d) => ({
    Name: d.name,
    "Phone Number": d.phone,
    Category: siteConfig.donationCategories.find((c) => c.key === d.category)?.en ?? String(d.category),
    "Donation Amount": Number(d.amount),
    "UTR / Reference Number": d.utr_ref ?? "",
    Status: d.status,
    Date: dateOf(d.created_at),
    Time: timeOf(d.created_at),
  }));
  writeSheet(rows, "All Donations", "all-donations.xlsx");
}

export function downloadBookingReport(all: BookingRow[]) {
  const rows = all.map((b) => ({
    Name: b.name,
    Gothram: b.gothram,
    "Phone Number": b.phone,
    Address: b.address,
    "Booking Date": b.pooja_slots?.slot_date ?? "",
    "Booking Time Slot": b.pooja_slots
      ? `${hhmm(b.pooja_slots.start_time)} - ${hhmm(b.pooja_slots.end_time)}`
      : "",
    Status: b.status,
    "Booking Timestamp": new Date(b.created_at).toLocaleString("en-IN"),
  }));
  writeSheet(rows, "Pooja Bookings", "pooja-bookings.xlsx");
}

export function downloadCsv(rows: Record<string, unknown>[], fileName: string) {
  const ws = XLSX.utils.json_to_sheet(rows);
  const csv = XLSX.utils.sheet_to_csv(ws);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
}
