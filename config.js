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
  // image:   the photo on the project card (put photos in assets/img/projects/)
  // images:  the photos shown when the project is opened, each with an optional caption
  // compare: { before, after } shows a before/after pair on the card instead of one photo
  projects: [
    {
      title: "Sea-View Apartment",
      category: "Residential",
      year: "",
      image: "assets/img/projects/seaview-bathroom-sm.jpg",
      images: [
        { src: "assets/img/projects/seaview-bathroom.jpg", caption: "Floral wallpaper in the bathroom" },
        { src: "assets/img/projects/seaview-view.jpg", caption: "The view from the balcony" },
      ],
      description:
        "Details from a sea-view apartment: floral wallpaper in the bathroom, patterned oak parquet and a view to design around.",
    },
    {
      title: "Living Room Transformation",
      category: "Residential",
      year: "",
      compare: { before: "assets/img/projects/living-before.jpg", after: "assets/img/projects/living-after.jpg" },
      images: [
        { src: "assets/img/projects/living-before.jpg", caption: "Before" },
        { src: "assets/img/projects/living-during.jpg", caption: "During" },
        { src: "assets/img/projects/living-after.jpg", caption: "After" },
      ],
      description:
        "Before, during and after — an empty shell turned into a warm, layered living space with bespoke media joinery, open shelving and a soft neutral palette.",
    },
    {
      title: "On Site",
      category: "Process",
      year: "",
      image: "assets/img/projects/site-assembly-sm.jpg",
      images: [
        { src: "assets/img/projects/site-shell.jpg", caption: "The bare shell" },
        { src: "assets/img/projects/site-fitout.jpg", caption: "Floors and kitchen in, deliveries arriving" },
        { src: "assets/img/projects/site-assembly.jpg", caption: "Putting the furniture together" },
      ],
      description:
        "Notes from site at the sea-view apartment: the bare shell, the fit-out, and the furniture going together.",
    },
    {
      title: "Materials & Finishes",
      category: "Materials",
      year: "",
      image: "assets/img/projects/materials-fabrics-sm.jpg",
      images: [
        { src: "assets/img/projects/materials-fabrics.jpg", caption: "Upholstery fabric samples" },
        { src: "assets/img/projects/materials-board.jpg", caption: "Wallpaper and paint samples" },
      ],
      description:
        "Wallpaper, paint and fabric samples compared side by side, chosen for how they look, feel and last.",
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
      title: "Statement Rug",
      category: "Details",
      year: "",
      image: "assets/img/projects/seaview-rug-sm.jpg",
      images: [{ src: "assets/img/projects/seaview-rug.jpg", caption: "Just out of its crate" }],
      description: "A statement rug for the sea-view apartment, just out of its crate.",
    },
  ],

  // ── Instagram reels ──
  // Each reel shows its cover photo; Instagram's player loads only when a visitor taps it
  // (keeps the page light, especially inside Instagram's own browser).
  // To add one: open the reel on Instagram → ••• → Copy link, and paste it as the url.
  // cover is optional (a 9:16 image in assets/img/); without it a branded tile is shown.
  reels: [
    { url: "https://www.instagram.com/reel/DeygPFKp_uC/", cover: "assets/img/reel-1.jpg", coverLarge: "assets/img/reel-1-lg.jpg", caption: "Reading the room? More like reading the entire floor plan" },
    { url: "https://www.instagram.com/reel/DdI03QJxFqR/", cover: "assets/img/reel-2.jpg", coverLarge: "assets/img/reel-2-lg.jpg", caption: "Get to know your favourite interior designer, vol. 2" },
    { url: "https://www.instagram.com/reel/Dd_wZI7JTdQ/", cover: "assets/img/reel-3.jpg", coverLarge: "assets/img/reel-3-lg.jpg", caption: "5 renovation mistakes to avoid" },
    { url: "https://www.instagram.com/reel/DeMrzrMJimk/", cover: "assets/img/reel-4.jpg", coverLarge: "assets/img/reel-4-lg.jpg", caption: "What Pinterest doesn’t show" },
  ],

  // ── Instagram feed ──
  // The website shows your latest Instagram posts automatically (Instagram's official profile embed).
  // These tiles are only a backup, shown if Instagram can't load.
  feed: [
    { image: "assets/img/feed-1.jpg", caption: "How to lose a designer in 5 days" },
    { image: "assets/img/feed-2.jpg", caption: "Sorry I didn’t respond… I’ve been working" },
    { image: "assets/img/feed-3.jpg", caption: "Kinda chic to be an interior designer" },
    { image: "assets/img/feed-4.jpg", caption: "Kinda chic to judge interiors instead of people" },
  ],
};
