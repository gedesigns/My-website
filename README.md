# Graceful Era Designs by Elina Grigoriadou — Website

A static website for Graceful Era Designs (interior architecture & design). It needs no build step: just HTML, CSS and JS.

## Editing content
All text you'll want to change is in **`config.js`**:
- `email` – shown in the footer and contact section, and where the contact form sends messages
- `instagram` – your Instagram handle
- `projects` – title, category, description and photo for each project
  (put photos in `assets/img/` and set `image: "assets/img/your-photo.jpg"`)
- `reels` – Instagram reel links; each one plays on the site (Instagram → ••• → Copy link)
- `feed` – the Instagram tiles under the reels

After changing `config.js`, `styles.css` or `script.js`, raise the `?v=` number where
`index.html` loads them, so visitors' browsers fetch the new version instead of a cached one.

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
