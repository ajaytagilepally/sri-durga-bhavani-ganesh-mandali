import { useMemo, useState } from "react";
import { Copy, Check, Heart } from "lucide-react";
import { siteConfig } from "@/data/config";
import { T } from "@/lib/lang";

export function DonateSection() {
  const { upi } = siteConfig;
  const [copied, setCopied] = useState(false);
  const [amount, setAmount] = useState<string>("");

  const upiUrl = useMemo(() => {
    const params = new URLSearchParams({
      pa: upi.id,
      pn: upi.payeeName,
      cu: "INR",
      tn: upi.note,
    });
    if (amount && Number(amount) > 0) params.set("am", amount);
    return `upi://pay?${params.toString()}`;
  }, [upi, amount]);

  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&margin=10&data=${encodeURIComponent(
    upiUrl
  )}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(upi.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  const presets = [101, 251, 501, 1001];

  return (
    <section id="donate" className="py-24 md:py-32 px-6 bg-heritage-deep border-y border-gold/10">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-gold text-xs md:text-sm tracking-[0.3em] uppercase mb-3">
            <T te="విరాళం" en="Offer Seva" />
          </p>
          <h2 className="text-4xl md:text-6xl font-serif italic mb-4">
            <T te="మీ భక్తి విరాళం" en="Support the Utsav" />
          </h2>
          <p className="text-cream/70 max-w-2xl mx-auto">
            <T
              te="మీ చిన్న సహకారం మా ఉత్సవాలను మరింత గొప్పగా చేస్తుంది. UPI ద్వారా సులభంగా విరాళం అందించండి."
              en="Every contribution keeps the tradition alive. Scan the UPI QR or pay directly to our ID."
            />
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* QR */}
          <div className="glass-card rounded-2xl p-8 text-center">
            <div className="inline-block bg-cream p-4 rounded-xl">
              <img
                src={qrSrc}
                alt="UPI donation QR code"
                width={280}
                height={280}
                className="w-64 h-64 md:w-72 md:h-72"
              />
            </div>
            <p className="mt-4 text-cream/60 text-xs tracking-widest uppercase">
              <T te="ఏ UPI యాప్‌తోనైనా స్కాన్ చేయండి" en="Scan with any UPI app" />
            </p>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-6">
              <p className="text-cream/50 text-xs tracking-widest uppercase mb-2">
                <T te="UPI ID" en="UPI ID" />
              </p>
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-gold text-lg md:text-xl break-all">
                  {upi.id}
                </span>
                <button
                  onClick={copy}
                  className="shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-full border border-gold/40 text-gold hover:bg-gold/10 text-xs tracking-widest uppercase"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? <T te="కాపీ అయ్యింది" en="Copied" /> : <T te="కాపీ" en="Copy" />}
                </button>
              </div>
              <p className="mt-3 text-cream/60 text-sm">
                <T te="పేయి పేరు" en="Payee" />: {" "}
                <span className="text-cream">{upi.payeeName}</span>
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <p className="text-cream/50 text-xs tracking-widest uppercase mb-3">
                <T te="మొత్తం (ఐచ్ఛికం)" en="Amount (optional)" />
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {presets.map((p) => (
                  <button
                    key={p}
                    onClick={() => setAmount(String(p))}
                    className={`px-4 py-2 rounded-full border text-sm transition-colors ${
                      amount === String(p)
                        ? "bg-gold text-heritage border-gold"
                        : "border-gold/30 text-cream/80 hover:border-gold/60"
                    }`}
                  >
                    ₹{p}
                  </button>
                ))}
              </div>
              <input
                type="number"
                inputMode="numeric"
                min={1}
                placeholder="₹ Custom amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-heritage/60 border border-gold/20 rounded-full px-5 py-3 text-cream placeholder:text-cream/40 focus:outline-none focus:border-gold"
              />
              <a
                href={upiUrl}
                className="mt-4 w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gold text-heritage font-semibold rounded-full hover:bg-saffron transition-all uppercase tracking-widest text-sm"
              >
                <Heart size={16} />
                <T te="UPI యాప్‌లో చెల్లించండి" en="Pay via UPI App" />
              </a>
              <p className="mt-3 text-cream/40 text-xs text-center">
                <T
                  te="మొబైల్‌లో మాత్రమే — GPay, PhonePe, Paytm, BHIM"
                  en="Mobile only — GPay, PhonePe, Paytm, BHIM"
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
