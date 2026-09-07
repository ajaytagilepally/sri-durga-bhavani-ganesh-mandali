/* eslint-disable @typescript-eslint/no-explicit-any */
import { jsPDF } from "jspdf";

export interface BookingReceiptData {
  bookingId: string;
  name: string;
  gothram: string;
  phone: string;
  address: string;
  slotDate: string;
  startTime: string;
  endTime: string;
  lang: "en" | "te";
}

function fmtDate(d: string) {
  try {
    return new Date(d + "T00:00:00").toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return d;
  }
}

function fmtTime(t: string) {
  const [h, m] = t.split(":").map(Number);
  const d = new Date();

  d.setHours(h, m, 0, 0);

  return d.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}

async function loadImageAsDataURL(src: string): Promise<string> {
  const response = await fetch(src);

  if (!response.ok) {
    throw new Error(`Failed to load image: ${src}`);
  }

  const blob = await response.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Could not convert image"));
      }
    };

    reader.onerror = () => reject(reader.error);

    reader.readAsDataURL(blob);
  });
}

export async function downloadBookingReceipt(r: BookingReceiptData) {
  const doc = new jsPDF({
    unit: "pt",
    format: "a4",
  });

  const w = doc.internal.pageSize.getWidth();
  const h = doc.internal.pageSize.getHeight();

  // Light cream background
  doc.setFillColor(250, 245, 234);
  doc.rect(0, 0, w, h, "F");

  /*
   * =========================================================
   * BACKGROUND GANESH IMAGE
   * =========================================================
   *
   * Make sure this file exists:
   *
   * public/ganesh-receipt.png
   *
   */

  try {
    const imageData = await loadImageAsDataURL("/celebrating.png");

    doc.saveGraphicsState();

    // Light opacity so text remains readable
    doc.setGState(
      new (doc as any).GState({
        opacity: 0.3,
      }),
    );

    // Center the Ganesh image on the receipt
    const imageSize = 400;

    doc.addImage(imageData, "PNG", (w - imageSize) / 2, 170, imageSize, imageSize);

    doc.restoreGraphicsState();
  } catch (error) {
    console.warn("Ganesh receipt background could not be loaded.", error);
  }

  // =========================================================
  // GANESH IMAGE — RIGHT SIDE OF DEVOTEE DETAILS
  // =========================================================

  try {
    const imageData = await loadImageAsDataURL("/ganesh-receipt.png");

    doc.saveGraphicsState();

    // Increase/decrease this value for opacity.
    // 0.15 = very light
    // 0.20 = light
    // 0.25 = more visible
    doc.setGState(
      new (doc as any).GState({
        opacity: 0.18,
      }),
    );

    // Right-side placement
    // Increase these dimensions to make Ganesh bigger.
    const imageWidth = 190;
    const imageHeight = 190;

    const imageX = w - imageWidth - 45;
    const imageY = 105;

    doc.addImage(imageData, "PNG", imageX, imageY, imageWidth, imageHeight);

    doc.restoreGraphicsState();
  } catch (error) {
    console.warn("Receipt background image could not be loaded:", error);
  }

  /*
   * =========================================================
   * HEADER
   * =========================================================
   */

  doc.setFillColor(120, 30, 30);
  doc.rect(0, 0, w, 104, "F");

  doc.setTextColor(255, 210, 120);

  doc.setFont("times", "bolditalic");
  doc.setFontSize(22);

  doc.text("Sri Durga Bhavani Ganesh Mandali", w / 2, 38, { align: "center" });

  doc.setFont("times", "normal");
  doc.setFontSize(11);

  doc.text("Teachers Colony, Banswada", w / 2, 58, { align: "center" });

  doc.setFont("times", "italic");
  doc.setFontSize(12);

  doc.text("Pooja Booking Receipt · 5th Anniversary Ganesh Utsav", w / 2, 80, { align: "center" });

  /*
   * =========================================================
   * RECEIPT DETAILS
   * =========================================================
   */

  doc.setTextColor(30, 30, 30);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);

  let y = 140;

  const rows: Array<[string, string]> = [
    ["Booking ID", r.bookingId],
    ["Name", r.name],
    ["Gothram", r.gothram],
    ["Phone", r.phone],
    ["Address", r.address],
    ["Date", fmtDate(r.slotDate)],
    ["Time", `${fmtTime(r.startTime)} — ${fmtTime(r.endTime)}`],
  ];

  rows.forEach(([key, value]) => {
    doc.setFont("helvetica", "bold");
    doc.text(key, 60, y);

    doc.setFont("helvetica", "normal");

    const lines = doc.splitTextToSize(value, w - 220);

    doc.text(lines, 200, y);

    y += Array.isArray(lines) ? 18 * lines.length : 18;

    y += 4;
  });

  /*
   * =========================================================
   * FOOTER
   * =========================================================
   */

  y += 80;

  doc.setDrawColor(200, 160, 60);
  doc.line(60, y, w - 60, y);

  // =========================================================
  // CONTACT DETAILS
  // =========================================================

  y += 80;
  y += 80;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(120, 30, 30);

  doc.text("For any queries, please contact us", w / 2, y, { align: "center" });

  y += 20;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(60, 50, 40);

  doc.text("Phone: 9381978462", w / 2, y, { align: "center" });
  y += 10;
  doc.text("Phone: 9063410896", w / 2, y, { align: "center" });

  y += 50;

  doc.setFont("times", "italic");
  doc.setFontSize(13);
  doc.setTextColor(120, 30, 30);

  doc.text("Ganpati Bappa Morya!", w / 2, y, { align: "center" });

  y += 20;

  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);

  doc.text(
    r.lang === "te"
      ? "మీ దర్శన సమయానికి 10 నిమిషాల ముందు దయచేసి పండాల్ కి చేరండి."
      : "Please arrive at the pandal 10 minutes before your slot time.",
    w / 2,
    y,
    { align: "center" },
  );

  /*
   * =========================================================
   * SAVE PDF
   * =========================================================
   */

  doc.save(`booking-${r.bookingId.slice(0, 8)}.pdf`);
}

/*
 * =========================================================
 * TEST RECEIPT
 * =========================================================
 */

export async function testBookingReceipt() {
  await downloadBookingReceipt({
    bookingId: "TEST-BOOKING-12345678",
    name: "Test Name",
    gothram: "Test Gothram",
    phone: "9988776655",
    address: "Teachers Colony, Banswada",
    slotDate: "2026-09-05",
    startTime: "23:00:00",
    endTime: "23:30:00",
    lang: "en",
  });
}
