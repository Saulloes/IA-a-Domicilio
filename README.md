# iaadomicilio.com

Next.js 14 app for IA a Domicilio — boutique AI consultancy site for Mexican SMBs.

## Stack

- Next.js 14 (App Router, JSX, no TypeScript)
- React 18
- Inline styles + `S.*` token objects (no Tailwind, no CSS-in-JS library)
- Gemini 2.0 Flash (free tier) for personalized report generation
- Resend for outbound transactional email
- Supabase for submission logging (`quiz_submissions` table)
- Google Analytics 4 (cookieless — `storage:'none'`, no consent banner needed)

## Routes

- `/` — homepage (Dir1Editorial)
- `/diagnostico` — 9-question business readiness quiz
- `/api/generate-report` — POST endpoint that generates + emails the personalized report
- `/sitemap.xml`, `/robots.txt` — auto-generated

## Environment variables

Required for production (set in Vercel → Project → Settings → Environment Variables):

| Name | Value | Source |
|---|---|---|
| `GOOGLE_AI_API_KEY` | Gemini API key | aistudio.google.com/apikey |
| `RESEND_API_KEY` | Resend API key | resend.com/api-keys |
| `SUPABASE_URL` | `https://nirxojllgwqwmkysmdjf.supabase.co` | — |
| `SUPABASE_SERVICE_KEY` | `service_role` key (NOT anon) | Supabase dashboard → Project Settings → API |
| `NEXT_PUBLIC_GA_ID` | `G-XXXXXXXXXX` (GA4 Measurement ID) | analytics.google.com → Admin → Data Streams |

The `SUPABASE_SERVICE_KEY` bypasses RLS — never expose it to the browser, never commit it. The `NEXT_PUBLIC_` prefix on the GA ID is intentional: Next.js only exposes vars with that prefix to browser code, and the GA ID is public-by-design (it ships in page source anyway).

## Local dev

```bash
npm install
# create .env.local with the 4 vars above
npm run dev
# http://localhost:3000
```

## Deploy

Connected to GitHub → Vercel auto-deploys on push to `main`. Preview URLs on feature branches.

## Supabase

Project: `iaadomicilio-website` (`nirxojllgwqwmkysmdjf`), us-east-2, free tier.
Table `public.quiz_submissions` — uuid id, created_at, email, score, dimensions jsonb, archetype, bottleneck, answers jsonb, report_sent bool. RLS enabled with no policies (service_role only).

## Resend

Domain `iaadomicilio.com` needs SPF + DKIM DNS records added at Namecheap (Resend dashboard shows them when you verify the domain). Zoho Mail continues handling inbound mail via MX records — the two don't conflict.

## Analytics

GA4 in cookieless mode (`storage:'none'`). Create a property at analytics.google.com for iaadomicilio.com, grab the `G-XXXXXXXXXX` Measurement ID, paste into Vercel as `NEXT_PUBLIC_GA_ID`. Events auto-fire: `pageview`, `quiz_started`, `quiz_question_answered`, `quiz_completed`, `cta_clicked_call|email|quiz|whatsapp`, `email_submitted`, `popup_shown|dismissed|converted`, `share_whatsapp|copy_link`.

Because storage is disabled, GA4 can't identify returning visitors — treat each visit as a new session. Conversions and event counts still work.

## Editing copy

Tweaks panel still works: the host parser reads `TWEAK_DEFAULTS` in `app/page.jsx` between the `/*EDITMODE-BEGIN*/` and `/*EDITMODE-END*/` markers.

## Layout

```
app/
├── layout.jsx            # root: fonts, Plausible, schema.org, metadata
├── globals.css
├── page.jsx              # homepage: Dir1Editorial + TweaksPanel
├── sitemap.js
├── robots.js
├── opengraph-image.jsx
├── api/
│   └── generate-report/
│       └── route.js      # POST: Gemini → Resend → Supabase
├── components/
│   ├── Dir1Editorial.jsx
│   ├── TweaksPanel.jsx
│   └── DiagnosticoPopup.jsx
└── diagnostico/
    ├── layout.jsx        # SEO metadata for /diagnostico
    ├── page.jsx          # quiz client component
    ├── data.js           # QUESTIONS, ARCHETYPES, scoring, opportunities
    └── opengraph-image.jsx

lib/
├── supabaseAdmin.js      # server-only Supabase client
├── reportEmail.js        # HTML email template
└── reportPrompt.js       # Gemini system + user prompt
```
