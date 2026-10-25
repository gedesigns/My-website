# Graceful Era Designs — Website

A static website for Graceful Era Designs (interior architecture & design). It needs no build step: just HTML, CSS and JS.

## Editing content
All text you'll want to change is in **`config.js`**:
- `email` – shown in the footer and contact section
- `instagram` – your Instagram handle
- `projects` – title, category, year, description and photo for each project
  (put photos in `assets/projects/` and set `image: "assets/projects/your-photo.jpg"`)
- `reels` – paste Instagram reel links and they play on the site

## Preview locally
Open `index.html` in a browser.

## Going live
Works on any static host: GitHub Pages, Netlify, Vercel, or GoDaddy file upload.
For GitHub Pages: Settings → Pages → Deploy from branch, then point the
`gracefuleradesigns.com` DNS records at GitHub Pages from the GoDaddy DNS panel.
