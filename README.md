# Graceful Era Designs by Elina Grigoriadou — Website

A static website for Graceful Era Designs (interior architecture & design). It needs no build step: just HTML, CSS and JS.

## Editing content
All text you'll want to change is in **`config.js`**:
- `email` – shown in the footer and contact section, and where the contact form sends messages
- `instagram` – your Instagram handle
- `projects` – title, category, description and photo for each project
  (put photos in `assets/img/` and set `image: "assets/img/your-photo.jpg"`)
- `reels` – featured Instagram reels: link (Instagram → ••• → Copy link), cover image and caption.
  Each shows its cover; Instagram's player loads when a visitor taps it
- `feed` – backup tiles for the live Instagram feed (the feed itself always shows the latest posts automatically)

After changing `config.js`, `styles.css` or `script.js`, raise the `?v=` number where
`index.html` loads them, so visitors' browsers fetch the new version instead of a cached one.

## Contact form
Messages are emailed to the address in `config.js` (`email`) through FormSubmit (formsubmit.co), a free
form-to-email service. The first message sent to a new address triggers a one-time FormSubmit email asking
to **Activate Form**; click it and every message after that arrives in the inbox. If FormSubmit can't be
reached, the visitor's email app opens with the message ready to send instead.

## Brand assets
- `assets/brand/` – the original logo files plus `logo-mark.svg`, a vector trace of the mark
- `assets/favicon.svg`, `assets/apple-touch-icon.png` – browser and home-screen icons
- `assets/og-image.jpg` – preview image shown when the site link is shared

## Preview locally
Open `index.html` in a browser. Reels need an internet connection, since they load from Instagram.

## Going live
Works on any static host: GitHub Pages, Netlify, Vercel, or GoDaddy file upload.
For GitHub Pages: Settings → Pages → Deploy from branch, then point the
`gracefuleradesigns.com` DNS records at GitHub Pages from the GoDaddy DNS panel.
Only the website records (A / CNAME for `@` and `www`) change; the MX records
that deliver Microsoft email stay as they are.
