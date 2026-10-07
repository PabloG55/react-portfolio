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

> **Do not run `vercel deploy` / `vercel --prod` from this unlinked checkout.**
> Publish through the existing GitHub integration by pushing to `main`.
> The CLI previously used a different scope with no projects. On October 7, 2026,
> the owner signed in as `pablo-garces`; the correct team is
> `pablo-6122s-projects`, and the existing project is `react-portfolio`.
> The CLI can manage that project's domains and DNS, but an unlinked CLI deploy
> can create a different project instead of updating the live portfolio.

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

## App subdomains

The existing Vercel project also serves these app sites through host-specific
rewrites in `next.config.ts`:

- `https://trainpilot.pablogarces.dev` — app homepage, `/privacy`, and `/support`.
- `https://skipper.pablogarces.dev` — app homepage, `/privacy`, and `/support`.
- `https://ghostfleet.pablogarces.dev` — Ghostfleet marketing homepage.

The three marketing pages use each project's existing colors, logos, and real
product media. TrainPilot includes an interactive React preview with clearly
labeled sample data and locally bundled app fonts. Skipper v2 is labeled in
development until a public release link is supplied. Ghostfleet uses the actual
three-agent terminal recording and the public mobile walkthrough.

Keep the existing `/docs/policy/<app>` and `/docs/support/<app>` routes working.
The short subdomain paths are additional routes, not replacements or redirects.

TrainPilot's deletion-request page is available through both
`/docs/delete-account/trainpilot` and
`https://trainpilot.pablogarces.dev/delete-account`. Keep both paths supported.
The page describes the email request process and separately handled records;
it makes no fixed retention-duration or request-completion commitment. Update
those terms only when the owner supplies the actual periods.
