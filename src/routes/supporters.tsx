<<<<<<< HEAD
/* eslint-disable prettier/prettier */

=======
>>>>>>> 15dbc36 (Updated)
import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { T, Bi } from "@/lib/lang";

<<<<<<< HEAD
=======
/*
 * ============================================================
 * SUPPORTERS
 * ============================================================
 *
 * HOW TO ADD / EDIT PHOTOS:
 *
 * Put your photos inside:
 *
 * public/supporters/
 *
 * Example:
 *
 * public/supporters/member-1.jpg
 * public/supporters/member-2.jpg
 * public/supporters/member-3.jpg
 *
 * Then change the "photo" value below.
 *
 * If you don't have photos yet, leave the placeholder URL.
 * The page will still work.
 */

>>>>>>> 15dbc36 (Updated)
// ============================================================
// IDOL DONORS
// ============================================================

const idolDonors = [
  {
<<<<<<< HEAD
    name: "SDBGM - 2022",
  },
  {
    name: "Pawan Rathod - 2023",
  },
  {
    name: "SDBGM - 2024",
  },
  {
    name: "Bandaru Krishna - 2025",
  },
  {
    name: "Soma Sathish",
=======
    name: "Donor Name 1",
    photo: "https://images.unsplash.com/photo-1609619385002-f40f1b3f9b3c?w=400&q=80",
  },
  {
    name: "Donor Name 2",
    photo: "https://images.unsplash.com/photo-1598145572057-0e1c2c1d0d7c?w=400&q=80",
  },
  {
    name: "Donor Name 3",
    photo: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=400&q=80",
  },
  {
    name: "Donor Name 4",
    photo: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&q=80",
  },
  {
    name: "Donor Name 5",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
  },
  {
    name: "Donor Name 6",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
>>>>>>> 15dbc36 (Updated)
  },
];

// ============================================================
// LADDU AUCTION WINNERS
// ============================================================

const ladduWinners = [
  {
<<<<<<< HEAD
    name: "Mokshith - 2022",
    amount: 16111,
  },
  {
    name: "Abhilash Kammari - 2023",
    amount: 45000,
  },
  {
    name: "Abhilash Kammari - 2024",
    amount: 60000,
  },
  {
    name: "Deepak Kathri - 2025",
    amount: 111111,
  },
  {
    name: "Coming Soon - 2026",
    amount: 0,
=======
    name: "Winner Name 1",
    amount: 11001,
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
  },
  {
    name: "Winner Name 2",
    amount: 15001,
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80",
  },
  {
    name: "Winner Name 3",
    amount: 21001,
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
  },
  {
    name: "Winner Name 4",
    amount: 25001,
    photo: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400&q=80",
  },
  {
    name: "Winner Name 5",
    amount: 31001,
    photo: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&q=80",
  },
  {
    name: "Winner Name 6",
    amount: 51001,
    photo: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400&q=80",
>>>>>>> 15dbc36 (Updated)
  },
];

// ============================================================
// YEARS
// ============================================================

const years = [2022, 2023, 2024, 2025, 2026];

// ============================================================
// PAGE
// ============================================================

export const Route = createFileRoute("/supporters")({
  head: () => ({
    meta: [
      {
        title: "మా భక్తులు · Our Supporters — Sri Durga Bhavani Ganesh Mandali",
      },
      {
        name: "description",
        content:
          "Honouring the devotees and supporters who have helped make our Ganesh Utsav possible.",
      },
      {
        property: "og:title",
        content: "Our Supporters · Sri Durga Bhavani Ganesh Mandali",
      },
      {
        property: "og:description",
        content: "Honouring our Idol Donors and Laddu Auction Winners.",
      },
    ],
  }),

  component: SupportersPage,
});

// ============================================================
// SUPPORTERS PAGE
// ============================================================

function SupportersPage() {
  return (
    <div className="min-h-screen bg-heritage text-cream">
      <Nav />

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* ==================================================
              PAGE HEADER
              ================================================== */}

          <div className="text-center mb-16">
            <p className="text-gold text-xs md:text-sm tracking-[0.4em] uppercase mb-3">
              <T te="కృతజ్ఞతలతో" en="With Gratitude" />
            </p>

            <h1 className="text-4xl md:text-6xl mb-5">
              <Bi
                te={<span className="font-telugu text-cream">మా భక్తులు</span>}
                en={<span className="font-serif italic gold-gradient">Our Supporters</span>}
              />
            </h1>

            <p className="text-cream/70 max-w-2xl mx-auto leading-relaxed">
              <T
                te="మా గణేష్ ఉత్సవాలను విజయవంతం చేయడానికి తమ సహకారం అందించిన ప్రతి భక్తునికి మా హృదయపూర్వక కృతజ్ఞతలు."
                en="Our heartfelt gratitude to every devotee who has supported and blessed our Ganesh Utsav."
              />
            </p>
          </div>

          {/* ==================================================
              YEARS
              ================================================== */}

          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {years.map((year) => (
              <div
                key={year}
                className={`px-5 py-2 rounded-full border text-sm tracking-wider ${
                  year === 2026
                    ? "border-saffron/50 bg-saffron/10 text-saffron"
                    : "border-gold/30 text-gold/80"
                }`}
              >
                {year}

                {year === 2026 && (
                  <span className="ml-2 text-[10px] uppercase">
                    <T te="త్వరలో" en="Coming Soon" />
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* ==================================================
              SIDE-BY-SIDE CATEGORIES
              ================================================== */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* ==================================================
                IDOL DONORS
                ================================================== */}

            <section className="glass-card rounded-3xl p-6 md:p-8">
              {/* Category heading */}

              <div className="text-center mb-8">
                <div className="mx-auto mb-4 w-14 h-14 rounded-full border border-gold/40 bg-gold/10 grid place-items-center text-2xl">
                  🪔
                </div>

                <h2 className="text-2xl md:text-3xl text-gold font-serif italic">
                  <T te="గణేష్ విగ్రహ దాతలు" en="Idol Donors" />
                </h2>

                <p className="text-cream/50 text-xs mt-2">
                  <T
                    te="గణేష్ విగ్రహ సేవకు సహకరించిన భక్తులు"
                    en="Devotees who supported the Ganesh Idol Seva"
                  />
                </p>
              </div>

              {/* Donor list */}

              <div className="space-y-4">
                {idolDonors.map((donor, index) => (
<<<<<<< HEAD
                  <SupporterCard key={`${donor.name}-${index}`} name={donor.name} />
=======
                  <SupporterCard
                    key={`${donor.name}-${index}`}
                    name={donor.name}
                    photo={donor.photo}
                  />
>>>>>>> 15dbc36 (Updated)
                ))}
              </div>
            </section>

            {/* ==================================================
                LADDU AUCTION WINNERS
                ================================================== */}

            <section className="glass-card rounded-3xl p-6 md:p-8">
              {/* Category heading */}

              <div className="text-center mb-8">
                <div className="mx-auto mb-4 w-14 h-14 rounded-full border border-gold/40 bg-gold/10 grid place-items-center text-2xl">
                  🏆
                </div>

                <h2 className="text-2xl md:text-3xl text-gold font-serif italic">
                  <T te="లడ్డు వేలం విజేతలు" en="Laddu Auction Winners" />
                </h2>

                <p className="text-cream/50 text-xs mt-2">
                  <T
                    te="లడ్డు వేలంలో విజయం సాధించిన భక్తులు"
                    en="Devotees who won the Laddu Auction"
                  />
                </p>
              </div>

              {/* Winner list */}

              <div className="space-y-4">
                {ladduWinners.map((winner, index) => (
                  <SupporterCard
                    key={`${winner.name}-${index}`}
                    name={winner.name}
<<<<<<< HEAD
=======
                    photo={winner.photo}
>>>>>>> 15dbc36 (Updated)
                    amount={winner.amount}
                    winner
                  />
                ))}
              </div>
            </section>
          </div>

          {/* ==================================================
              THANK YOU MESSAGE
              ================================================== */}

          <div className="mt-16 text-center">
            <div className="max-w-3xl mx-auto glass-card rounded-3xl p-8 md:p-12 border border-gold/20">
              <div className="text-4xl mb-5">🙏</div>

              <h2 className="text-2xl md:text-3xl text-gold font-serif italic mb-4">
                <T te="మీ సేవకు ధన్యవాదాలు" en="Thank You for Your Seva" />
              </h2>

              <p className="text-cream/60 leading-relaxed">
                <T
                  te="మీ భక్తి, సహకారం మరియు ఆశీర్వాదాలతో మా గణేష్ ఉత్సవ ప్రయాణం కొనసాగుతోంది."
                  en="With your devotion, support and blessings, our Ganesh Utsav journey continues."
                />
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// ============================================================
// SUPPORTER CARD
// ============================================================

interface SupporterCardProps {
  name: string;
<<<<<<< HEAD
=======
  photo: string;
>>>>>>> 15dbc36 (Updated)
  amount?: number;
  winner?: boolean;
}

<<<<<<< HEAD
function SupporterCard({ name, amount, winner = false }: SupporterCardProps) {
  // Get the first alphabet from the name
  const firstLetter = name.trim().charAt(0).toUpperCase();

  return (
    <div className="group flex items-center gap-4 p-4 rounded-2xl border border-gold/10 bg-heritage-deep/40 hover:border-gold/40 hover:bg-gold/5 transition-all duration-300">
      {/* FIRST LETTER INSTEAD OF PHOTO */}

      <div className="relative shrink-0">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-gold/30 bg-gold/10 flex items-center justify-center group-hover:border-gold/70 group-hover:bg-gold/20 transition-all duration-300">
          <span className="text-2xl md:text-3xl text-gold font-serif font-bold">{firstLetter}</span>
        </div>
=======
function SupporterCard({ name, photo, amount, winner = false }: SupporterCardProps) {
  return (
    <div className="group flex items-center gap-4 p-4 rounded-2xl border border-gold/10 bg-heritage-deep/40 hover:border-gold/40 hover:bg-gold/5 transition-all duration-300">
      {/* PHOTO */}

      <div className="relative shrink-0">
        <img
          src={photo}
          alt={name}
          loading="lazy"
          className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-gold/30 group-hover:border-gold/70 transition-all duration-300"
          onError={(event) => {
            event.currentTarget.src =
              "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&q=80";
          }}
        />
>>>>>>> 15dbc36 (Updated)

        {/* Winner badge */}

        {winner && (
          <span className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-gold text-heritage grid place-items-center text-xs">
            🏆
          </span>
        )}
      </div>

      {/* DETAILS */}

      <div className="min-w-0 flex-1">
        <p className="text-cream font-medium text-base md:text-lg truncate">{name}</p>

        {winner && amount !== undefined && (
          <p className="text-gold mt-1 text-sm">₹{amount.toLocaleString("en-IN")}</p>
        )}

        {!winner && (
          <p className="text-cream/40 text-xs mt-1">
            <T te="గణేష్ విగ్రహ సేవ" en="Ganesh Idol Seva" />
          </p>
        )}
      </div>
    </div>
  );
}
