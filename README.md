This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploying

**Deploy by pushing to `main`.** Production (https://pablogarces.vercel.app) is built by
Vercel's GitHub integration on every push to `main`. That is the only deploy path.

> **Do not run `vercel deploy` / `vercel --prod` from this repo.**
> There is no `.vercel` directory here, and the Vercel CLI on this machine is logged
> into the scope `casper-5849`, which contains **zero projects** — the portfolio project
> lives under a different account. A CLI deploy therefore does not update
> pablogarces.vercel.app; it silently creates a brand-new, unrelated project and hands
> you a URL that looks plausible but is not the live site.
> Verified 2026-09-14 (`vercel whoami` → `casper-5849`, `vercel projects ls` → none).

After pushing, production takes roughly 30-60s to go live. Verify with `curl` rather than
assuming — `curl` runs no JavaScript, so a 200 with the expected text in the body also
proves the page is not auth-gated, not JS-gated, and will not 404 on a cold direct hit:

```bash
curl -s -o /dev/null -w "%{http_code} redirects=%{num_redirects}\n" \
  https://pablogarces.vercel.app/docs/policy/trainpilot
```

## App Store documents (`/docs`)

Apple requires a public Privacy Policy URL and Support URL per app, and a reviewer opens
both. They live under `src/app/docs` and are statically prerendered, so a direct hit works
with no client-side routing:

- `/docs/policy/<app>` — privacy policy
- `/docs/support/<app>` — support page

Both share `src/app/docs/DocPage.tsx` + `doc.module.css`. To add an app, create
`src/app/docs/<kind>/<app>/page.tsx` and wrap the content in `<DocPage>`. Keep
`export const dynamic = 'force-static'` so the route stays prerendered. Confirm with
`npm run build` that the route prints as `○ (Static)`.

Older policy pages (`/recetai`, `/pacepilot`) predate this shell and still live at their
own top-level routes.
