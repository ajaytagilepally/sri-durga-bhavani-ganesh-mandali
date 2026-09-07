import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";

import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { T, Bi, useLang } from "@/lib/lang";
import { siteConfig, type DonationCategoryKey } from "@/data/config";
import { submitDonation, checkDonationStatus } from "@/lib/donations.functions";

export const Route = createFileRoute("/donate")({
  head: () => ({
    meta: [
      {
        title: "విరాళం · Donate — Durga Bhavani Ganesh Mandali",
      },
      {
        name: "description",
        content:
          "Offer your seva — Idol Seva, Annadanam, or Laddu Token — securely via UPI to Durga Bhavani Ganesh Mandali.",
      },
      {
        property: "og:title",
        content: "Offer Your Seva · Durga Bhavani Ganesh Mandali",
      },
      {
        property: "og:description",
        content:
          "Contribute to our Ganesh Utsav via UPI and verify your payment using UTR/reference number.",
      },
    ],
  }),

  component: DonatePage,
});

type Step = "category" | "form" | "success" | "check";

type DonationStatus = "PENDING" | "SUCCESSFUL" | "FAILED";

type Receipt = {
  id: string;
  receiptNo: string;
  createdAt: string;
  status: DonationStatus;
};

type DonationStatusResult = {
  found: boolean;
  status?: DonationStatus;
  id?: string;
  receiptNo?: string;
  createdAt?: string;

  donorName?: string;
  phone?: string;
  email?: string;

  category?: DonationCategoryKey;
  categoryName?: string;

  amount?: number;
  ladduCount?: number;

  utrRef?: string;

  message?: string;

  payeeName?: string;
  payeeUpiId?: string;

  sevaMessage?: string;
};

const LADDU_TOKEN_PRICE = 101;

function DonatePage() {
  const { lang } = useLang();

  const submit = useServerFn(submitDonation);
  const checkPayment = useServerFn(checkDonationStatus);

  const [step, setStep] = useState<Step>("category");

  const [category, setCategory] = useState<DonationCategoryKey | null>(null);

  const [amount, setAmount] = useState<number>(501);
  const [customAmount, setCustomAmount] = useState<string>("");

  const [ladduCount, setLadduCount] = useState<number>(1);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    utrRef: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [checking, setChecking] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [receipt, setReceipt] = useState<Receipt | null>(null);

  const [checkUtr, setCheckUtr] = useState("");

  const [paymentResult, setPaymentResult] = useState<DonationStatusResult | null>(null);

  const selectedCat = useMemo(
    () => siteConfig.donationCategories.find((c) => c.key === category) ?? null,
    [category],
  );

  const isLadduToken = selectedCat?.key === "laddu_token";

  const finalAmount = useMemo(() => {
    if (isLadduToken) {
      return ladduCount * LADDU_TOKEN_PRICE;
    }

    if (customAmount.trim() !== "") {
      const parsed = Number(customAmount);
      return Number.isFinite(parsed) ? parsed : 0;
    }

    return amount;
  }, [isLadduToken, ladduCount, customAmount, amount]);

  const upiLink = useMemo(() => {
    if (!finalAmount || finalAmount <= 0 || !selectedCat) {
      return "";
    }

    const params = new URLSearchParams({
      pa: siteConfig.upi.id,
      pn: siteConfig.upi.payeeName,
      am: finalAmount.toFixed(2),
      cu: "INR",
      tn: `${siteConfig.upi.note} - ${selectedCat.en}`,
    });

    return `upi://pay?${params.toString()}`;
  }, [finalAmount, selectedCat]);

  function chooseCategory(key: DonationCategoryKey) {
    const cat = siteConfig.donationCategories.find((c) => c.key === key);

    if (!cat) {
      return;
    }

    if (cat.key === "laddu_token") {
      setLadduCount(1);
      setCustomAmount("");
      setAmount(LADDU_TOKEN_PRICE);
    } else {
      setAmount(cat.presets[0] ?? 501);
      setCustomAmount("");
      setLadduCount(1);
    }

    setCategory(key);
    setError(null);
    setPaymentResult(null);
    setStep("form");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!category) {
      setError(lang === "te" ? "దయచేసి సేవను ఎంచుకోండి." : "Please select a seva.");
      return;
    }

    if (!finalAmount || finalAmount <= 0) {
      setError(
        lang === "te"
          ? "చెల్లుబాటు అయ్యే మొత్తాన్ని నమోదు చేయండి."
          : "Please enter a valid amount.",
      );
      return;
    }

    if (form.name.trim().length < 2) {
      setError(lang === "te" ? "దయచేసి మీ పేరు నమోదు చేయండి." : "Please enter your name.");
      return;
    }

    const normalizedPhone = form.phone.trim().replace(/\D/g, "");

    if (normalizedPhone.length < 10) {
      setError(
        lang === "te"
          ? "చెల్లుబాటు అయ్యే ఫోన్ నంబర్ నమోదు చేయండి."
          : "Please enter a valid phone number.",
      );
      return;
    }

    if (form.utrRef.trim().length < 4) {
      setError(
        lang === "te"
          ? "దయచేసి UTR / Reference Number నమోదు చేయండి."
          : "Please enter your UTR / Reference Number.",
      );
      return;
    }

    setError(null);
    setSubmitting(true);

    try {
      const res = await submit({
        data: {
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),

          category,

          ladduCount: isLadduToken ? ladduCount : undefined,

          amount: finalAmount,

          utrRef: form.utrRef.trim().toUpperCase(),

          message: form.message.trim(),
        },
      });

      setReceipt({
        id: res.id,
        receiptNo: res.receiptNo,
        createdAt: res.createdAt,
        status: "PENDING",
      });

      setPaymentResult({
        found: true,
        status: "PENDING",
        id: res.id,
        receiptNo: res.receiptNo,
        createdAt: res.createdAt,
      });

      setStep("success");
    } catch (err) {
      console.error("Donation submission failed:", err);

      const message = err instanceof Error ? err.message : "";

      if (message.toLowerCase().includes("already")) {
        setError(
          lang === "te"
            ? "ఈ UTR ఇప్పటికే నమోదు చేయబడింది."
            : "This UTR / Reference Number has already been submitted.",
        );
      } else {
        setError(
          lang === "te"
            ? "క్షమించండి, విరాళం నమోదు చేయడంలో సమస్య వచ్చింది. మళ్ళీ ప్రయత్నించండి."
            : "Something went wrong while submitting your donation. Please try again.",
        );
      }
    } finally {
      setSubmitting(false);
    }
  }

  async function handleCheckPayment(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const utr = checkUtr.trim().toUpperCase();

    if (utr.length < 4) {
      setPaymentResult({
        found: false,
      });
      return;
    }

    setChecking(true);
    setPaymentResult(null);

    try {
      const result = await checkPayment({
        data: {
          utrRef: utr,
        },
      });

      setPaymentResult(result);
    } catch (err) {
      console.error("Payment status check failed:", err);

      setPaymentResult({
        found: false,
      });
    } finally {
      setChecking(false);
    }
  }

  function resetDonation() {
    setStep("category");
    setCategory(null);

    setAmount(501);
    setCustomAmount("");
    setLadduCount(1);

    setForm({
      name: "",
      phone: "",
      email: "",
      utrRef: "",
      message: "",
    });

    setReceipt(null);
    setPaymentResult(null);
    setCheckUtr("");
    setError(null);
  }

  function openCheckPayment() {
    setCheckUtr(form.utrRef);
    setPaymentResult(null);
    setStep("check");
  }

  function downloadReceipt() {
    if (!paymentResult || paymentResult.status !== "SUCCESSFUL") {
      return;
    }

    const receiptId =
      paymentResult.receiptNo ?? `DON-${paymentResult.id?.slice(0, 8).toUpperCase() ?? "N/A"}`;

    const date = paymentResult.createdAt
      ? new Date(paymentResult.createdAt).toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
        })
      : new Date().toLocaleString("en-IN");

    const seva = paymentResult.categoryName ?? paymentResult.category ?? "Seva";

    const amount =
      paymentResult.amount != null ? paymentResult.amount.toLocaleString("en-IN") : "0";

    const sevaMessage = paymentResult.sevaMessage ?? getSevaMessage(paymentResult.category);

    const receiptHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Donation Receipt - ${escapeHtml(receiptId)}</title>

<style>
body {
  font-family: Georgia, serif;
  background: #f7f1e5;
  margin: 0;
  padding: 40px;
  color: #3d1f0a;
}

.receipt {
  max-width: 700px;
  margin: auto;
  background: #fffdf7;
  padding: 45px;
  border: 2px solid #c79b43;
}

.center {
  text-align: center;
}

h1 {
  margin-bottom: 5px;
}

.subtitle {
  color: #8b6a2e;
  letter-spacing: 2px;
  font-size: 13px;
}

.success {
  margin: 25px 0;
  padding: 15px;
  background: #e8f7e8;
  color: #187331;
  border: 1px solid #72b982;
  text-align: center;
  font-weight: bold;
}

.row {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #eadfc9;
  gap: 20px;
}

.label {
  color: #806b52;
}

.value {
  font-weight: bold;
  text-align: right;
  overflow-wrap: anywhere;
}

.amount {
  font-size: 28px;
  color: #9a6b14;
}

.message {
  margin-top: 30px;
  padding: 20px;
  background: #faf4e8;
  border-left: 4px solid #c79b43;
  line-height: 1.7;
}

.footer {
  margin-top: 35px;
  text-align: center;
  font-size: 12px;
  color: #806b52;
}

@media print {
  body {
    padding: 0;
    background: white;
  }

  .receipt {
    border: none;
  }
}
</style>
</head>

<body>
<div class="receipt">

<div class="center">
<h1>🙏 Durga Bhavani Ganesh Mandali</h1>

<div class="subtitle">
GANESH UTSAV · SEVA RECEIPT
</div>
</div>

<div class="success">
PAYMENT SUCCESSFUL
</div>

<div class="row">
<div class="label">Receipt Number</div>
<div class="value">${escapeHtml(receiptId)}</div>
</div>

<div class="row">
<div class="label">Payment Date</div>
<div class="value">${escapeHtml(date)}</div>
</div>

<div class="row">
<div class="label">Donor Name</div>
<div class="value">
${escapeHtml(paymentResult.donorName ?? "")}
</div>
</div>

<div class="row">
<div class="label">Phone</div>
<div class="value">
${escapeHtml(paymentResult.phone ?? "")}
</div>
</div>

${
  paymentResult.email
    ? `
<div class="row">
<div class="label">Email</div>
<div class="value">
${escapeHtml(paymentResult.email)}
</div>
</div>
`
    : ""
}

<div class="row">
<div class="label">Seva</div>
<div class="value">
${escapeHtml(seva)}
</div>
</div>

${
  paymentResult.ladduCount
    ? `
<div class="row">
<div class="label">Laddu Tokens</div>
<div class="value">
${paymentResult.ladduCount}
</div>
</div>
`
    : ""
}

<div class="row">
<div class="label">UTR / Reference</div>
<div class="value">
${escapeHtml(paymentResult.utrRef ?? "")}
</div>
</div>

<div class="row">
<div class="label">Payee Name</div>
<div class="value">
${escapeHtml(paymentResult.payeeName ?? siteConfig.upi.payeeName)}
</div>
</div>

<div class="row">
<div class="label">UPI ID</div>
<div class="value">
${escapeHtml(paymentResult.payeeUpiId ?? siteConfig.upi.id)}
</div>
</div>

<div class="row">
<div class="label">Amount</div>
<div class="value amount">
₹${escapeHtml(amount)}
</div>
</div>

<div class="message">
<strong>Seva Message</strong>
<br />
${escapeHtml(sevaMessage)}
</div>

<div class="footer">
Thank you for your generous seva.<br />
Ganpati Bappa Morya! 🙏<br /><br />

This receipt confirms a payment verified by
the Durga Bhavani Ganesh Mandali committee.
</div>

</div>

<script>
window.onload = function () {
  window.print();
};
</script>

</body>
</html>
`;

    const blob = new Blob([receiptHtml], { type: "text/html" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = `Donation-Receipt-${receiptId}.html`;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-heritage text-cream">
      <Nav />

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          {/* HEADER */}

          <div className="text-center mb-12">
            <p className="text-gold text-xs tracking-[0.4em] uppercase mb-3">
              <T te="సేవ · భక్తి" en="Seva · Devotion" />
            </p>

            <h1 className="text-4xl md:text-5xl mb-4">
              <Bi
                te={<span className="font-telugu text-cream">విరాళం సమర్పించండి</span>}
                en={<span className="font-serif italic gold-gradient">Offer Your Seva</span>}
              />
            </h1>

            <p className="text-cream/70 max-w-xl mx-auto">
              <T
                te="మీ విరాళాన్ని UPI ద్వారా చెల్లించండి. UTR నంబర్ ద్వారా మీ చెల్లింపు స్థితిని ఎప్పుడైనా తనిఖీ చేయవచ్చు."
                en="Pay your seva securely through UPI. You can check your payment status anytime using your UTR or reference number."
              />
            </p>
          </div>

          {/* PAYMENT STATUS CHECK */}

          <div className="mb-12 p-6 md:p-8 rounded-2xl border border-gold/30 bg-heritage-deep/50">
            <div className="text-center mb-5">
              <p className="text-gold text-xs tracking-[0.3em] uppercase mb-2">
                <T te="చెల్లింపు స్థితి" en="Payment Status" />
              </p>

              <h2 className="text-2xl text-cream">
                <T te="UTR ద్వారా చెల్లింపును తనిఖీ చేయండి" en="Check Payment Using UTR" />
              </h2>

              <p className="text-sm text-cream/60 mt-2">
                <T
                  te="మీ UPI యాప్‌లో కనిపించే UTR / Reference Number నమోదు చేయండి."
                  en="Enter the UTR / Reference Number shown in your UPI app."
                />
              </p>
            </div>

            <form
              onSubmit={handleCheckPayment}
              className="flex flex-col md:flex-row gap-3 max-w-2xl mx-auto"
            >
              <input
                type="text"
                value={checkUtr}
                onChange={(e) => setCheckUtr(e.target.value.toUpperCase())}
                placeholder={
                  lang === "te" ? "UTR / Reference Number" : "Enter UTR / Reference Number"
                }
                maxLength={64}
                autoComplete="off"
                className="flex-1 px-5 py-3 rounded-full bg-heritage border border-gold/30 text-cream placeholder:text-cream/40 focus:outline-none focus:border-gold"
              />

              <button
                type="submit"
                disabled={checking || checkUtr.trim().length < 4}
                className="px-7 py-3 rounded-full bg-gold text-heritage-deep text-sm tracking-widest uppercase disabled:opacity-40"
              >
                {checking ? (
                  <T te="తనిఖీ చేస్తోంది…" en="Checking…" />
                ) : (
                  <T te="తనిఖీ చేయండి" en="Check Payment" />
                )}
              </button>
            </form>

            {paymentResult && (
              <PaymentStatusCard result={paymentResult} lang={lang} onDownload={downloadReceipt} />
            )}
          </div>

          {/* CATEGORY */}

          {step === "category" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid md:grid-cols-3 gap-5"
            >
              {siteConfig.donationCategories.map((c) => {
                const ladduCategory = c.key === "laddu_token";

                return (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => chooseCategory(c.key)}
                    className="text-left p-6 rounded-2xl border border-gold/20 bg-heritage-deep/40 hover:border-gold/60 hover:bg-heritage-deep/70 transition-all group"
                  >
                    <h3 className="text-xl mb-2 text-gold">
                      <T te={c.te} en={c.en} />
                    </h3>

                    <p className="text-cream/70 text-sm leading-relaxed">
                      <T te={c.descTe} en={c.descEn} />
                    </p>

                    {ladduCategory && (
                      <div className="mt-3 text-sm text-gold">
                        ₹101 <T te="ఒక్క లడ్డూ టోకెన్" en="per Laddu Token" />
                      </div>
                    )}

                    <div className="mt-4 text-xs tracking-widest uppercase text-gold/70 group-hover:text-gold">
                      <T te="ఎంచుకోండి →" en="Choose →" />
                    </div>
                  </button>
                );
              })}
            </motion.div>
          )}

          {/* FORM */}

          {step === "form" && selectedCat && (
            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="grid md:grid-cols-2 gap-8"
            >
              {/* LEFT PAYMENT */}

              <div className="p-6 rounded-2xl border border-gold/20 bg-heritage-deep/40">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg text-gold">
                    <T te={selectedCat.te} en={selectedCat.en} />
                  </h2>

                  <button
                    type="button"
                    onClick={() => setStep("category")}
                    className="text-xs text-cream/60 hover:text-gold"
                  >
                    <T te="మార్చు" en="Change" />
                  </button>
                </div>

                {isLadduToken ? (
                  <div>
                    <p className="text-xs tracking-widest uppercase text-cream/60 mb-3">
                      <T te="లడ్డూ టోకెన్లు" en="Laddu Tokens" />
                    </p>

                    <div className="p-5 rounded-xl border border-gold/20 bg-heritage/50">
                      <div className="text-center mb-4">
                        <p className="text-sm text-cream/70">
                          <T te="ఒక్క లడ్డూ టోకెన్" en="Price per Laddu Token" />
                        </p>

                        <p className="text-3xl text-gold mt-1 font-semibold">₹101</p>
                      </div>

                      <div className="flex items-center justify-center gap-5">
                        <button
                          type="button"
                          onClick={() => setLadduCount((count) => Math.max(1, count - 1))}
                          disabled={ladduCount <= 1}
                          className="w-12 h-12 rounded-full border border-gold/50 text-gold text-2xl flex items-center justify-center disabled:opacity-30"
                        >
                          −
                        </button>

                        <div className="text-center min-w-[80px]">
                          <p className="text-4xl font-semibold text-cream">{ladduCount}</p>

                          <p className="text-xs text-cream/50 uppercase tracking-widest">
                            <T te="టోకెన్లు" en="Tokens" />
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => setLadduCount((count) => Math.min(1000, count + 1))}
                          disabled={ladduCount >= 1000}
                          className="w-12 h-12 rounded-full border border-gold/50 text-gold text-2xl flex items-center justify-center hover:bg-gold hover:text-heritage-deep disabled:opacity-30"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between p-4 rounded-xl bg-gold/10 border border-gold/20">
                      <span className="text-sm text-cream/70">
                        <T te="మొత్తం" en="Total Amount" />
                      </span>

                      <span className="text-2xl font-semibold text-gold">
                        ₹{finalAmount.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <p className="mt-3 text-xs text-cream/50 text-center">
                      {ladduCount} × ₹101 = ₹{finalAmount.toLocaleString("en-IN")}
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-xs tracking-widest uppercase text-cream/60 mb-3">
                      <T te="మొత్తం (₹)" en="Amount (₹)" />
                    </p>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {selectedCat.presets.map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => {
                            setAmount(p);
                            setCustomAmount("");
                          }}
                          className={`px-4 py-2 rounded-full border text-sm transition-all ${
                            !customAmount && amount === p
                              ? "border-gold bg-gold text-heritage-deep"
                              : "border-gold/30 text-cream/80 hover:border-gold/60"
                          }`}
                        >
                          ₹{p.toLocaleString("en-IN")}
                        </button>
                      ))}
                    </div>

                    <input
                      type="number"
                      min={1}
                      max={10000000}
                      step={1}
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      placeholder={lang === "te" ? "ఇతర మొత్తం" : "Custom amount"}
                      className="w-full px-4 py-2 rounded-lg bg-heritage/60 border border-gold/20 text-cream placeholder:text-cream/40 focus:border-gold/60 focus:outline-none"
                    />

                    <div className="mt-4 flex items-center justify-between p-4 rounded-xl bg-gold/10 border border-gold/20">
                      <span className="text-sm text-cream/70">
                        <T te="మొత్తం" en="Total Amount" />
                      </span>

                      <span className="text-2xl font-semibold text-gold">
                        ₹{finalAmount.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                )}

                {/* QR CODE */}

                <div className="mt-6 flex flex-col items-center gap-3 p-4 bg-cream rounded-xl">
                  {upiLink ? (
                    <QRCodeSVG value={upiLink} size={180} bgColor="#faf5ea" fgColor="#3d1f0a" />
                  ) : (
                    <div className="w-[180px] h-[180px] flex items-center justify-center text-heritage-deep/60 text-sm">
                      <T te="మొత్తం ఇవ్వండి" en="Enter amount" />
                    </div>
                  )}

                  <p className="text-heritage-deep text-xs tracking-widest uppercase">
                    {siteConfig.upi.id}
                  </p>

                  <p className="text-heritage-deep text-xs text-center">
                    {siteConfig.upi.payeeName}
                  </p>
                </div>

                <a
                  href={upiLink || "#"}
                  onClick={(e) => {
                    if (!upiLink) {
                      e.preventDefault();
                    }
                  }}
                  className="mt-3 block text-center py-3 rounded-full border border-gold/60 text-gold hover:bg-gold hover:text-heritage-deep transition-all text-xs tracking-widest uppercase"
                >
                  <T te="UPI యాప్‌లో చెల్లించండి" en="Pay in UPI App" />
                </a>

                {isLadduToken && (
                  <p className="mt-4 text-[11px] text-cream/50 text-center">
                    <T
                      te="మీరు ఎంచుకున్న లడ్డూ టోకెన్ల సంఖ్యకు అనుగుణంగా మొత్తం చెల్లించండి."
                      en="Please pay the total amount corresponding to the number of Laddu Tokens selected."
                    />
                  </p>
                )}
              </div>

              {/* RIGHT FORM */}

              <form
                onSubmit={handleSubmit}
                className="p-6 rounded-2xl border border-gold/20 bg-heritage-deep/40 space-y-3"
              >
                <h2 className="text-lg text-gold mb-2">
                  <T te="మీ వివరాలు" en="Your details" />
                </h2>

                <Field
                  label={<T te="పేరు" en="Name" />}
                  required
                  value={form.name}
                  onChange={(v) =>
                    setForm((prev) => ({
                      ...prev,
                      name: v,
                    }))
                  }
                  maxLength={100}
                />

                <Field
                  label={<T te="ఫోన్" en="Phone" />}
                  required
                  value={form.phone}
                  onChange={(v) =>
                    setForm((prev) => ({
                      ...prev,
                      phone: v,
                    }))
                  }
                  maxLength={20}
                  inputMode="tel"
                />

                <Field
                  label={<T te="ఇమెయిల్ (ఐచ్ఛికం)" en="Email (optional)" />}
                  value={form.email}
                  onChange={(v) =>
                    setForm((prev) => ({
                      ...prev,
                      email: v,
                    }))
                  }
                  maxLength={255}
                  type="email"
                />

                <Field
                  label={<T te="UTR / రిఫరెన్స్ నంబర్" en="UTR / Reference Number" />}
                  required
                  value={form.utrRef}
                  onChange={(v) =>
                    setForm((prev) => ({
                      ...prev,
                      utrRef: v.toUpperCase(),
                    }))
                  }
                  maxLength={64}
                />

                <p className="-mt-2 text-[11px] text-cream/50">
                  <T
                    te="చెల్లింపు చేసిన తర్వాత మీ UPI యాప్‌లో కనిపించే UTR / Reference Number నమోదు చేయండి."
                    en="After making the payment, enter the UTR / Reference Number shown in your UPI app."
                  />
                </p>

                <Field
                  label={<T te="సందేశం (ఐచ్ఛికం)" en="Message (optional)" />}
                  value={form.message}
                  onChange={(v) =>
                    setForm((prev) => ({
                      ...prev,
                      message: v,
                    }))
                  }
                  maxLength={500}
                  textarea
                />

                {error && (
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-400/20 text-red-300 text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={
                    submitting ||
                    form.name.trim().length < 2 ||
                    normalizedPhoneLength(form.phone) < 10 ||
                    form.utrRef.trim().length < 4 ||
                    !finalAmount ||
                    finalAmount <= 0
                  }
                  className="w-full py-3 rounded-full bg-gold text-heritage-deep tracking-widest text-sm uppercase disabled:opacity-40"
                >
                  {submitting ? (
                    <T te="పంపుతోంది…" en="Submitting…" />
                  ) : (
                    <T te="విరాళం సమర్పించండి" en="Submit Seva" />
                  )}
                </button>

                <p className="text-[11px] text-cream/50">
                  <T
                    te="మీ చెల్లింపు ముందుగా Pending గా నమోదు చేయబడుతుంది. కమిటీ ధృవీకరించిన తర్వాత మాత్రమే Successful గా మారుతుంది."
                    en="Your payment is initially recorded as Pending. It becomes Successful only after committee verification."
                  />
                </p>
              </form>
            </motion.div>
          )}

          {/* SUCCESS */}

          {step === "success" && receipt && (
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              className="text-center p-10 rounded-2xl border border-gold/40 bg-heritage-deep/60"
            >
              <div className="text-5xl mb-4">🙏</div>

              <h2 className="text-2xl md:text-3xl mb-3">
                <Bi
                  te={<span className="font-telugu text-gold">ధన్యవాదాలు!</span>}
                  en={<span className="font-serif italic gold-gradient">Thank you!</span>}
                />
              </h2>

              <p className="text-cream/70 mb-6 max-w-md mx-auto">
                <T
                  te="మీ సేవను స్వీకరించాము. చెల్లింపు ప్రస్తుతం ధృవీకరణలో ఉంది."
                  en="Your seva has been recorded. Your payment is currently awaiting verification."
                />
              </p>

              <div className="mb-7">
                <StatusBadge status="PENDING" />
              </div>

              <p className="text-xs text-cream/50 tracking-widest uppercase mb-8">
                <T te="రసీదు నం" en="Receipt no." />: {receipt.receiptNo}
              </p>

              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  type="button"
                  onClick={openCheckPayment}
                  className="px-6 py-3 rounded-full border border-gold/60 text-gold"
                >
                  <T te="చెల్లింపు తనిఖీ" en="Check Payment" />
                </button>

                <button
                  type="button"
                  onClick={resetDonation}
                  className="px-6 py-3 rounded-full border border-gold/60 text-gold"
                >
                  <T te="మరొక సేవ" en="Another Seva" />
                </button>

                <Link to="/" className="px-6 py-3 rounded-full bg-gold text-heritage-deep">
                  <T te="హోమ్‌కి" en="Back to Home" />
                </Link>
              </div>
            </motion.div>
          )}

          {/* CHECK PAGE */}

          {step === "check" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-8 rounded-2xl border border-gold/30 bg-heritage-deep/50"
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl text-gold">
                  <T te="చెల్లింపు స్థితి" en="Payment Status" />
                </h2>
              </div>

              <form
                onSubmit={handleCheckPayment}
                className="flex flex-col md:flex-row gap-3 max-w-2xl mx-auto"
              >
                <input
                  type="text"
                  value={checkUtr}
                  onChange={(e) => setCheckUtr(e.target.value.toUpperCase())}
                  placeholder="UTR / Reference Number"
                  maxLength={64}
                  className="flex-1 px-5 py-3 rounded-full bg-heritage border border-gold/30 text-cream placeholder:text-cream/40 focus:outline-none focus:border-gold"
                />

                <button
                  type="submit"
                  disabled={checking || checkUtr.trim().length < 4}
                  className="px-7 py-3 rounded-full bg-gold text-heritage-deep text-sm tracking-widest uppercase disabled:opacity-40"
                >
                  {checking ? "Checking…" : "Check Payment"}
                </button>
              </form>

              {paymentResult && (
                <PaymentStatusCard
                  result={paymentResult}
                  lang={lang}
                  onDownload={downloadReceipt}
                />
              )}

              <div className="text-center mt-6">
                <button
                  type="button"
                  onClick={() => setStep(category ? "form" : "category")}
                  className="text-sm text-gold"
                >
                  ← <T te="వెనక్కి" en="Back" />
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

/* =========================================================
   PAYMENT STATUS CARD
   ========================================================= */

function PaymentStatusCard({
  result,
  lang,
  onDownload,
}: {
  result: DonationStatusResult;
  lang: string;
  onDownload: () => void;
}) {
  if (!result.found) {
    return (
      <div className="mt-6 p-5 rounded-xl border border-red-400/30 bg-red-500/10 text-center">
        <div className="text-3xl mb-2">❌</div>

        <h3 className="text-red-300 text-lg font-semibold">
          <T te="చెల్లింపు కనుగొనబడలేదు" en="Payment Not Found" />
        </h3>

        <p className="text-sm text-cream/60 mt-2">
          <T
            te="ఈ UTR / Reference Number మా రికార్డుల్లో లేదు."
            en="This UTR / Reference Number was not found in our records."
          />
        </p>
      </div>
    );
  }

  const status = result.status ?? "PENDING";

  return (
    <div className="mt-6 p-6 rounded-xl border border-gold/20 bg-heritage">
      <div className="text-center mb-5">
        <StatusBadge status={status} />
      </div>

      <div className="grid sm:grid-cols-2 gap-3 text-sm">
        {result.receiptNo && (
          <Detail label={lang === "te" ? "రసీదు నంబర్" : "Receipt No."} value={result.receiptNo} />
        )}

        {result.donorName && (
          <Detail label={lang === "te" ? "దాత పేరు" : "Donor"} value={result.donorName} />
        )}

        {result.categoryName && (
          <Detail label={lang === "te" ? "సేవ" : "Seva"} value={result.categoryName} />
        )}

        {result.ladduCount != null && (
          <Detail
            label={lang === "te" ? "లడ్డు టోకెన్లు" : "Laddu Tokens"}
            value={String(result.ladduCount)}
          />
        )}

        {result.amount != null && (
          <Detail
            label={lang === "te" ? "మొత్తం" : "Amount"}
            value={`₹${result.amount.toLocaleString("en-IN")}`}
          />
        )}

        {result.utrRef && <Detail label="UTR / Reference" value={result.utrRef} />}

        {result.payeeName && (
          <Detail label={lang === "te" ? "చెల్లింపు గ్రహీత" : "Payee"} value={result.payeeName} />
        )}

        {result.payeeUpiId && <Detail label="UPI ID" value={result.payeeUpiId} />}

        {result.createdAt && (
          <Detail
            label={lang === "te" ? "తేదీ" : "Date"}
            value={new Date(result.createdAt).toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
            })}
          />
        )}
      </div>

      {status === "PENDING" && (
        <div className="mt-5 p-4 rounded-lg bg-yellow-500/10 border border-yellow-400/20 text-yellow-200 text-sm text-center">
          <T
            te="మీ చెల్లింపు మా కమిటీ ధృవీకరణ కోసం వేచి ఉంది."
            en="Your payment is waiting for verification by our committee."
          />
        </div>
      )}

      {status === "FAILED" && (
        <div className="mt-5 p-4 rounded-lg bg-red-500/10 border border-red-400/20 text-red-200 text-sm text-center">
          <T
            te="ఈ చెల్లింపు విఫలమైంది లేదా కమిటీ ధృవీకరణలో తిరస్కరించబడింది."
            en="This payment has failed or was rejected during verification."
          />
        </div>
      )}

      {status === "SUCCESSFUL" && (
        <>
          <div className="mt-5 p-4 rounded-lg bg-green-500/10 border border-green-400/20 text-green-200 text-sm text-center">
            <T
              te="మీ చెల్లింపు విజయవంతంగా ధృవీకరించబడింది."
              en="Your payment has been successfully verified."
            />
          </div>

          <button
            type="button"
            onClick={onDownload}
            className="mt-5 w-full py-3 rounded-full bg-gold text-heritage-deep text-sm tracking-widest uppercase"
          >
            📄 <T te="రసీదు డౌన్‌లోడ్ చేయండి" en="Download Receipt" />
          </button>
        </>
      )}
    </div>
  );
}

/* =========================================================
   STATUS BADGE
   ========================================================= */

function StatusBadge({ status }: { status: DonationStatus }) {
  if (status === "SUCCESSFUL") {
    return (
      <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-green-500/15 border border-green-400/40 text-green-300 font-semibold">
        <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
        Payment Successful
      </span>
    );
  }

  if (status === "FAILED") {
    return (
      <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-red-500/15 border border-red-400/40 text-red-300 font-semibold">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
        Payment Failed
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-yellow-500/15 border border-yellow-400/40 text-yellow-300 font-semibold">
      <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
      Payment Pending
    </span>
  );
}

/* =========================================================
   DETAIL
   ========================================================= */

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 rounded-lg bg-heritage-deep/50 border border-gold/10">
      <p className="text-[10px] tracking-widest uppercase text-cream/50 mb-1">{label}</p>

      <p className="text-cream break-words">{value}</p>
    </div>
  );
}

/* =========================================================
   FIELD
   ========================================================= */

function Field({
  label,
  value,
  onChange,
  required,
  maxLength,
  type = "text",
  inputMode,
  textarea,
}: {
  label: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  maxLength?: number;
  type?: string;
  inputMode?: "tel" | "email" | "text";
  textarea?: boolean;
}) {
  const cls =
    "w-full px-4 py-2 rounded-lg bg-heritage/60 border border-gold/20 text-cream placeholder:text-cream/40 focus:border-gold/60 focus:outline-none";

  return (
    <label className="block">
      <span className="block text-[11px] tracking-widest uppercase text-cream/60 mb-1">
        {label}
        {required && " *"}
      </span>

      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          maxLength={maxLength}
          rows={3}
          className={cls}
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          maxLength={maxLength}
          type={type}
          inputMode={inputMode}
          className={cls}
        />
      )}
    </label>
  );
}

/* =========================================================
   SEVA-SPECIFIC RECEIPT MESSAGES
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
   HELPERS
   ========================================================= */

function normalizedPhoneLength(value: string) {
  return value.replace(/\D/g, "").length;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
