# Graceful Era Designs by Elina Grigoriadou — Website

A static website for Graceful Era Designs (interior architecture & design). It needs no build step: just HTML, CSS and JS.

## Editing content
All text you'll want to change is in **`config.js`**:
- `email` – shown in the footer and contact section, and where the contact form sends messages
- `instagram` – your Instagram handle
- `projects` – title, category, description and photos for each project
  (put photos in `assets/img/projects/`). `image` is the card photo, `images` the gallery shown when the
  project is opened (each with an optional caption; add `video: "assets/video/….mp4"` to play a short
  silent clip, with `src` as its still), and `compare: { before, after }` shows a before/after pair on
  the card. `post` (optional) links to the Instagram post. A card photo named `…-sm.jpg` is used on
  normal screens and the same name without `-sm` on high-resolution screens.
- `journal` – Instagram carousel posts shown as stories: same fields as a project; the card shows the
  first slide and tapping it opens every slide (photos in `assets/img/journal/`)
- `reels` – featured Instagram reels: link (Instagram → ••• → Copy link), cover image and caption.
  Each shows its cover; Instagram's player loads when a visitor taps it. The row ends with a
  "More reels on Instagram" tile that opens the Reels tab of the profile
- `feed` – backup tiles for the live Instagram feed (the feed itself always shows the latest posts automatically)

After changing `config.js`, `styles.css` or `script.js`, raise the `?v=` number where
`index.html` loads them, so visitors' browsers fetch the new version instead of a cached one.

## Contact form
Messages are emailed through Web3Forms (web3forms.com), a free form-to-email service (250 messages a month).
To set it up: on web3forms.com enter the address that should receive the messages and press
**Create Access Key**; Web3Forms emails the key to that address. Put the key in `config.js` as `formKey`
(it is meant to be public). Messages then arrive from Web3Forms with the visitor's address as reply-to. Visitors stay on the page:
if a message can't be sent, they're asked to try again (Elina's address is shown as well).

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
