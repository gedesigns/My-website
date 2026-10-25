/*
 * ─────────────────────────────────────────────────────────────
 *  GRACEFUL ERA DESIGNS — SITE CONTENT
 *  Edit this file to update the website. No coding needed:
 *  change the text between the quotes and save.
 * ─────────────────────────────────────────────────────────────
 */
window.SITE = {
  brand: "Graceful Era Designs",
  designer: "Elina Grigoriadou",
  tagline: "Timeless elegance for every space",

  // ── Contact (shown in the footer and contact section) ──
  email: "elina@gracefuleradesigns.com",
  instagram: "gracefuleradesigns",

  // ── Projects ──
  // image: a photo in assets/img/
  projects: [
    {
      title: "Living Room Transformation",
      category: "Residential",
      year: "",
      image: "assets/img/project-before-after.jpg",
      description:
        "Before, during and after — an empty shell turned into a warm, layered living space with bespoke media joinery, open shelving and a soft neutral palette.",
    },
    {
      title: "Bespoke Wardrobes",
      category: "Joinery",
      year: "",
      image: "assets/img/project-wardrobes.jpg",
      description:
        "Floor-to-ceiling built-in wardrobes, designed to the millimetre and installed on site for a seamless, clean-lined finish.",
    },
    {
      title: "Stone & Water",
      category: "Materials",
      year: "",
      image: "assets/img/project-pool-stone.jpg",
      description:
        "A study in natural materials — pale stone meeting clear water, chosen for calm, texture and longevity.",
    },
  ],

  // ── Instagram reels ──
  // Each reel shows its cover photo; Instagram's player loads only when a visitor taps it
  // (keeps the page light, especially inside Instagram's own browser).
  // To add one: open the reel on Instagram → ••• → Copy link, and paste it as the url.
  // cover is optional (a 9:16 image in assets/img/); without it a branded tile is shown.
  reels: [
    { url: "https://www.instagram.com/reel/DeygPFKp_uC/", cover: "assets/img/reel-1.jpg", caption: "Reading the room? More like reading the entire floor plan" },
    { url: "https://www.instagram.com/reel/DdI03QJxFqR/", cover: "assets/img/reel-2.jpg", caption: "Get to know your favourite interior designer, vol. 2" },
    { url: "https://www.instagram.com/reel/Dd_wZI7JTdQ/", cover: "assets/img/reel-3.jpg", caption: "5 renovation mistakes to avoid" },
    { url: "https://www.instagram.com/reel/DeMrzrMJimk/", cover: "assets/img/reel-4.jpg", caption: "What Pinterest doesn’t show" },
  ],

  // ── Instagram feed ──
  // The website shows your latest Instagram posts automatically (Instagram's official profile embed).
  // These tiles are only a backup, shown if Instagram can't load.
  feed: [
    { image: "assets/img/reel-material-selection.jpg", caption: "Why does material selection matter?" },
    { image: "assets/img/reel-chic-designer.jpg", caption: "Kinda chic to be an interior designer" },
    { image: "assets/img/reel-been-working.jpg", caption: "Sorry I didn’t respond… I’ve been working" },
    { image: "assets/img/reel-age-designer.jpg", caption: "Things that instantly age an interior designer" },
  ],
};
