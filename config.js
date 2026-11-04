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

  // ── Contact form ──
  // Messages from the website's form are emailed to the address above through Web3Forms (web3forms.com).
  // formKey is the Access Key Web3Forms emails to that address (it's safe to publish).
  // While it's empty, the form opens the visitor's email app with their message ready to send.
  formKey: "ff1fea85-393b-4bf7-ab19-c6bcc539c18c",

  // ── Projects ──
  // image:   the photo on the project card (put photos in assets/img/projects/)
  // images:  the photos shown when the project is opened, each with an optional caption;
  //          add video: "assets/video/….mp4" to show a short clip instead (src is its still)
  // compare: { before, after } shows a before/after pair on the card instead of one photo
  // post:    optional link to the Instagram post, shown when the project is opened
  projects: [
    {
      title: "Living Room Transformation",
      category: "Residential",
      year: "",
      post: "https://www.instagram.com/p/DdVsxpCjUu8/",
      compare: { before: "assets/img/projects/living-room-before.jpg", after: "assets/img/projects/living-room-after.jpg" },
      images: [
        { src: "assets/img/projects/living-room-before.jpg", caption: "Before: an empty shell" },
        { src: "assets/img/projects/living-during.jpg", caption: "During: joinery and furniture going in" },
        { src: "assets/img/projects/living-room-making.jpg", video: "assets/video/living-room-making.mp4", caption: "In the making: the final details" },
        { src: "assets/img/projects/living-room-after.jpg", video: "assets/video/living-room-after.mp4", caption: "The vision: the finished living room" },
      ],
      description:
        "Swipe through the story of a space: before, in the making and, finally, the vision. An empty shell turned into a warm, layered living room with bespoke media joinery, open shelving and a soft neutral palette.",
    },
    {
      title: "Pool Terrace",
      category: "Residential",
      year: "In progress",
      post: "https://www.instagram.com/p/Dc-hnh7jVlp/",
      image: "assets/img/projects/pool-doors-sm.jpg",
      images: [
        { src: "assets/img/projects/pool-doors.jpg", caption: "The view out to the pool" },
        { src: "assets/img/projects/pool-terrace.jpg", caption: "The pool terrace taking shape" },
        { src: "assets/img/projects/pool-water.jpg", caption: "At the water’s edge" },
      ],
      description:
        "A glimpse of what’s taking shape: clean lines, natural textures and a pool area designed for slow summer days. A project still in progress, slowly coming to life.",
    },
    {
      title: "Sea-View Apartment",
      category: "Residential",
      year: "",
      image: "assets/img/projects/seaview-bathroom-sm.jpg",
      images: [
        { src: "assets/img/projects/seaview-bathroom.jpg", caption: "Floral wallpaper in the bathroom" },
        { src: "assets/img/projects/seaview-view.jpg", caption: "The view from the balcony" },
        { src: "assets/img/projects/seaview-rug.jpg", caption: "The statement rug, just out of its crate" },
      ],
      description:
        "Details from a sea-view apartment: floral wallpaper in the bathroom, patterned oak parquet, a statement rug and a view to design around.",
    },
    {
      title: "Materials & Finishes",
      category: "Materials",
      year: "",
      post: "https://www.instagram.com/p/Dd0mSP5j45U/",
      image: "assets/img/projects/materials-fabrics-sm.jpg",
      images: [
        { src: "assets/img/projects/materials-why.jpg", caption: "Why does material selection matter?" },
        { src: "assets/img/projects/materials-aesthetic.jpg", caption: "Aesthetic & atmosphere: textures, finishes and materials define the overall look and feeling of a space, bringing the design concept together." },
        { src: "assets/img/projects/materials-function.jpg", caption: "Functionality & comfort: every material serves a purpose. Choosing correctly makes the space practical, comfortable and suited to everyday life." },
        { src: "assets/img/projects/materials-durability.jpg", caption: "Durability & longevity: the right materials ensure your space looks beautiful and performs well for years." },
        { src: "assets/img/projects/materials-fabrics.jpg", caption: "Upholstery fabric samples" },
        { src: "assets/img/projects/materials-board.jpg", caption: "Wallpaper and paint samples" },
      ],
      description:
        "Choosing materials isn’t just about finding the right colour or finish. We consider how each material will perform in the space, because a well-designed space should not only look good on day one, but continue to work beautifully for years to come.",
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
      title: "Bespoke Wardrobes",
      category: "Joinery",
      year: "",
      image: "assets/img/project-wardrobes.jpg",
      description:
        "Floor-to-ceiling built-in wardrobes, designed to the millimetre and installed on site for a seamless, clean-lined finish.",
    },
  ],

  // ── Journal ──
  // Instagram carousel posts, shown as stories: the card shows the first slide (image),
  // tapping it opens every slide (images). Slides go in assets/img/journal/.
  journal: [
    {
      title: "How to lose a designer in 5 days",
      category: "Studio life",
      post: "https://www.instagram.com/p/DfEovqTEWkD/",
      image: "assets/img/journal/lose-designer-1-sm.jpg",
      images: [1, 2, 3, 4, 5, 6].map((n) => ({ src: `assets/img/journal/lose-designer-${n}.jpg` })),
      description: "5 days. 5 ways to test your interior designer’s patience.",
    },
    {
      title: "The interior designer starter pack",
      category: "Studio life",
      post: "https://www.instagram.com/p/DebVMu3DJ3M/",
      image: "assets/img/journal/kinda-chic-1-sm.jpg",
      images: [1, 2, 3, 4, 5].map((n) => ({ src: `assets/img/journal/kinda-chic-${n}.jpg` })),
      description: "Kinda chic to carry a measuring tape wherever you go. Consider this the interior designer starter pack.",
    },
    {
      title: "Out of office: on site",
      category: "On site",
      post: "https://www.instagram.com/p/DejDe13Aej1/",
      image: "assets/img/journal/on-site-1-sm.jpg",
      images: [
        "assets/img/journal/on-site-1.jpg",
        "assets/img/projects/seaview-rug.jpg",
        "assets/img/projects/seaview-view.jpg",
        "assets/img/projects/site-assembly.jpg",
        "assets/img/projects/materials-board.jpg",
        "assets/img/projects/site-fitout.jpg",
        "assets/img/projects/seaview-bathroom.jpg",
        "assets/img/projects/site-shell.jpg",
        "assets/img/projects/materials-fabrics.jpg",
      ].map((src) => ({ src })),
      description: "Sorry I didn’t respond to you… I’ve been working. Consider this my official out of office: I was on site.",
    },
    {
      title: "Why material selection matters",
      category: "Guide",
      post: "https://www.instagram.com/p/Dd0mSP5j45U/",
      image: "assets/img/journal/materials-guide-1-sm.jpg",
      images: [1, 2, 3, 4].map((n) => ({ src: `assets/img/journal/materials-guide-${n}.jpg` })),
      description: "Aesthetic and atmosphere, functionality and comfort, durability and longevity: what we weigh up when choosing every material.",
    },
  ],

  // ── Instagram reels ──
  // Each reel shows its cover photo; Instagram's player loads only when a visitor taps it
  // (keeps the page light, especially inside Instagram's own browser).
  // To add one: open the reel on Instagram → ••• → Copy link, and paste it as the url.
  // cover is optional (a 9:16 image in assets/img/); without it a branded tile is shown.
  // The row always ends with a "More reels on Instagram" tile linking to the profile's Reels tab.
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
