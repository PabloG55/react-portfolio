# Marketing landings — October 7, 2026

TrainPilot, Skipper v2, and Ghostfleet have brand-matched landing pages with
existing app colors, logos, favicons, and real media. TrainPilot includes real Run and Gym screenshots in a fixed-size phone frame. The portfolio hero is slightly larger,
and project entries link to the new landings. Existing legal/support paths
and legacy /docs routes remain supported.

Validation: lint, TypeScript, and the normal production build pass. Chromium
checks at 1440px and 375px passed for all three pages, with no broken images,
horizontal overflow, or browser exceptions. TrainPilot screenshot switching preserves the phone dimensions. Static generation includes
all existing app privacy/support/account-deletion pages.

Ghostfleet's subdomain is attached to the existing react-portfolio Vercel
project in pablo-6122s-projects. Vercel verified its existing DNS configuration;
no DNS records needed to be changed. Production publishes through the existing
GitHub integration on main. Do not use vercel --prod from this unlinked checkout.

Skipper v2 is marked in development. Replace that label and its support CTA
only after the owner confirms a public v2 release link.
