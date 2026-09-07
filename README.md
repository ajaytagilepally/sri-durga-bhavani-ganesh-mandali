# Durga Bhavani Ganesh Mandali — 5th Anniversary Digital Portfolio

A cinematic, bilingual (తెలుగు · English) web application celebrating five years of Ganesh Utsav — with pooja bookings, UPI donations, PDF receipts, a supporters wall, devotional namalu, and an admin dashboard.

Built with **TanStack Start (React 19 + Vite 7)**, **TypeScript**, **Tailwind CSS v4**, **Framer Motion**, and **Lovable Cloud (Supabase)**.

---

## 1. Connect to GitHub (one-time setup)

Lovable has a built-in two-way GitHub sync. Once connected, every change in Lovable pushes to GitHub, and every push to GitHub syncs back to Lovable.

### Step-by-step

1. Open this project in the Lovable editor.
2. Click **GitHub → Connect to GitHub** (top-right of the editor).
3. Authorize the Lovable GitHub App when GitHub asks for permission.
4. Choose the GitHub account or organization where the repository should live.
5. Click **Create Repository** in Lovable. This creates a new repo and pushes the current codebase.
6. Copy the repository URL shown after connecting (for example `https://github.com/your-username/durga-bhavani-ganesh-mandali`).

> **Note:** Only one GitHub account can be linked to a Lovable workspace at a time. If you already have a GitHub connection, Lovable will push to that account.

---

## 2. Clone the project to your computer

After the repo is created on GitHub, you can clone it anywhere.

### Using VS Code (recommended)

1. Open VS Code.
2. Press `Ctrl + Shift + P` (Windows/Linux) or `Cmd + Shift + P` (Mac).
3. Type **Git: Clone** and select it.
4. Paste your GitHub repository URL and press Enter.
5. Choose a folder on your computer where you want the project to live.
6. When prompted, click **Open** to open the cloned folder.

### Using the terminal

```bash
# Replace this URL with your actual GitHub repository URL
git clone https://github.com/your-username/your-repo-name.git

# Move into the project folder
cd your-repo-name

# Open in VS Code (optional, if you have the `code` command installed)
code .
```

---

## 3. Install dependencies

This project uses **bun** by default (fastest and matches Lovable). You can also use **npm** or **pnpm** if you prefer.

### Prerequisites

- **Node.js 20 or later** — download from [nodejs.org](https://nodejs.org/)
- **bun** (recommended) — install from [bun.sh](https://bun.sh/)
  ```bash
  # macOS / Linux / WSL
  curl -fsSL https://bun.sh/install | bash
  ```

### Install with bun (recommended)

```bash
bun install
```

### Install with npm

```bash
npm install
```

### Install with pnpm

```bash
pnpm install
```

The install step downloads all packages listed in `package.json` and creates the lockfile (`bun.lockb`, `package-lock.json`, etc.).

---

## 4. Run the development server

Start the local dev server and open the preview URL in your browser.

### With bun

```bash
bun run dev
```

### With npm

```bash
npm run dev
```

The terminal will print a local URL, usually:

```text
http://localhost:8080
```

Open that URL in your browser. The page will hot-reload automatically when you save changes.

---

## 5. Available scripts

Run these from the project root after installing dependencies.

| Command | What it does |
|---|---|
| `bun run dev` | Start the local development server |
| `bun run build` | Create an optimized production build |
| `bun run build:dev` | Create a development build |
| `bun run preview` | Preview the production build locally |
| `bun run typecheck` | Run TypeScript checks across the project |
| `bun run lint` | Run ESLint |
| `bun run format` | Format all files with Prettier |

> Replace `bun` with `npm` or `pnpm` if you are not using bun.

---

## 6. Environment variables

The project is already wired to a **Lovable Cloud (Supabase)** backend. Values live in `.env`:

```env
VITE_SUPABASE_URL="https://<your-project>.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="<publishable-anon-key>"
VITE_SUPABASE_PROJECT_ID="<project-id>"
SUPABASE_URL="https://<your-project>.supabase.co"
SUPABASE_PUBLISHABLE_KEY="<publishable-anon-key>"
```

These publishable keys are safe to commit. **Do NOT** put the service-role key in `.env` — Lovable Cloud manages it server-side.

If you want to host on your own Supabase project, replace the values with your own project's URL and anon key, then re-run the migrations under `supabase/migrations/`.

---

## 7. Deploy to Vercel or Netlify

The project uses TanStack Start's Nitro build. The default target is Cloudflare, but you can switch to Vercel or Netlify by adjusting `vite.config.ts`:

```ts
// vite.config.ts
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: {
      entry: "server",
      preset: "vercel", // or "netlify"
    },
  },
});
```

Presets you can use: `vercel`, `netlify`, `cloudflare-pages`, `node-server`.

### Deploy to Vercel

1. Push the repo to GitHub.
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import the repo.
3. Framework preset: **Other**.
4. Build command: `bun run build` (or `npm run build`).
5. Output directory: leave default.
6. Add the environment variables from `.env` under **Project Settings → Environment Variables**.
7. Click **Deploy**.

### Deploy to Netlify

1. Push to GitHub.
2. Go to [netlify.com](https://netlify.com) → **Add new site → Import from Git**.
3. Build command: `npm run build`.
4. Publish directory: `.output/public`.
5. Add the env vars from `.env` under **Site settings → Environment variables**.
6. Deploy.

### Or publish directly from Lovable

The simplest option — click **Publish** in Lovable to deploy to `yourname.lovable.app`, with an option to attach a custom domain.

---

## 8. Cloud services (all free tiers used)

| Service | Purpose | Cost |
|---|---|---|
| **Lovable Cloud (Supabase)** | Postgres DB, auth, RLS, storage | Free tier |
| **Lovable Hosting** | Preview & published site | Free |
| **UPI (any Indian bank)** | Donations — direct to the mandali account | Free, zero fees |

No paid API keys are required to run the app. Optional add-ons (Razorpay, Twilio SMS, etc.) can be added later.

---

## 9. Project structure

```text
src/
├─ routes/               # File-based routing (TanStack Start)
│  ├─ __root.tsx         # App shell (fonts, LangProvider, Nav wrapper)
│  ├─ index.tsx          # Home (hero, story, timeline, gallery, year 5…)
│  ├─ donate.tsx         # UPI donation flow
│  ├─ pooja-booking.tsx  # Slot picker + PDF receipt
│  ├─ supporters.tsx     # Public supporters wall
│  ├─ namalu.tsx         # Devotional songs / namalu browser
│  ├─ auth.tsx           # Admin sign-in
│  └─ admin.tsx          # Admin dashboard
├─ components/           # Reusable UI (Hero, Nav, Countdown, WelcomeSplash…)
├─ data/                 # Content: years, days, team, videos, config
├─ lib/                  # i18n, PDF receipts, server functions, reports
└─ integrations/supabase # Auto-generated Supabase client
```

Content lives in plain TS files under `src/data/` — edit those to change years, days, team, videos, etc.

---

## 10. Common tasks

**Change the UPI ID / payee name:** `src/data/config.ts` → `siteConfig.upi`.

**Add a supporter or auction winner:** insert a row into `past_donors` or `laddu_auctions` from the admin dashboard (or run a SQL migration).

**Grant admin access:** sign up at `/auth`, then run:

```sql
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin' FROM auth.users WHERE email = 'you@example.com';
```

**Edit content:** all text lives under `src/data/` and inside each component's `<T te="..." en="..." />` blocks.

---

## 11. Troubleshooting

| Problem | Solution |
|---|---|
| `bun: command not found` | Install bun from [bun.sh](https://bun.sh/) or use `npm install` instead. |
| `Could not load slots` on `/pooja-booking` | The Lovable Cloud backend may be paused. Resume it from the Lovable dashboard, then reload the page. |
| Port `8080` already in use | Run `bun run dev -- --port 3000` to use a different port. |
| Styles look broken | Make sure `src/styles.css` is present and Tailwind CSS v4 is installed. |

---

Made with 🪔 for Durga Bhavani Ganesh Mandali.
