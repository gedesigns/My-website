(function () {
  const S = window.SITE;
  const igUrl = "https://www.instagram.com/" + S.instagram + "/";

  // ── Contact details ──
  document.querySelectorAll(".js-email").forEach((a) => {
    a.href = "mailto:" + S.email;
    a.textContent = S.email;
  });
  document.querySelectorAll(".js-email-btn").forEach((a) => (a.href = "mailto:" + S.email));
  document.querySelectorAll(".js-ig").forEach((a) => (a.href = igUrl));
  document.querySelectorAll(".js-ig-handle").forEach((el) => (el.textContent = "@" + S.instagram));
  document.getElementById("year").textContent = new Date().getFullYear();

  // ── Projects ──
  const grid = document.getElementById("projectsGrid");
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const media = (p, i) =>
    p.image
      ? `<img src="${esc(p.image)}" alt="${esc(p.title)}" loading="lazy" />`
      : `<div class="ph ph--${i % 6}"><span>${esc(p.category)}</span></div>`;

  grid.innerHTML = S.projects
    .map(
      (p, i) => `
      <article class="project reveal" tabindex="0" data-index="${i}" data-category="${esc(p.category)}">
        <div class="project__media">${media(p, i)}</div>
        <div class="project__info">
          <h3>${esc(p.title)}</h3>
          <span>${esc(p.category)} · ${esc(p.year)}</span>
        </div>
      </article>`
    )
    .join("");

  // Filters
  const cats = ["All", ...new Set(S.projects.map((p) => p.category))];
  const filters = document.getElementById("filters");
  filters.innerHTML = cats
    .map((c, i) => `<button role="tab" class="${i === 0 ? "is-active" : ""}" data-filter="${esc(c)}">${esc(c)}</button>`)
    .join("");
  filters.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    filters.querySelectorAll("button").forEach((b) => b.classList.toggle("is-active", b === btn));
    const f = btn.dataset.filter;
    grid.querySelectorAll(".project").forEach((el) => {
      el.classList.toggle("is-hidden", f !== "All" && el.dataset.category !== f);
    });
  });

  // Lightbox
  const lb = document.getElementById("lightbox");
  const openProject = (i) => {
    const p = S.projects[i];
    document.getElementById("lightboxMedia").innerHTML = media(p, i);
    document.getElementById("lightboxMeta").textContent = [p.category, p.location, p.year].filter(Boolean).join(" · ");
    document.getElementById("lightboxTitle").textContent = p.title;
    document.getElementById("lightboxDesc").textContent = p.description;
    lb.classList.add("is-open");
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };
  const closeLb = () => {
    lb.classList.remove("is-open");
    lb.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };
  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".project");
    if (card) openProject(+card.dataset.index);
  });
  grid.addEventListener("keydown", (e) => {
    const card = e.target.closest(".project");
    if (card && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      openProject(+card.dataset.index);
    }
  });
  document.getElementById("lightboxClose").addEventListener("click", closeLb);
  lb.addEventListener("click", (e) => e.target === lb && closeLb());
  document.addEventListener("keydown", (e) => e.key === "Escape" && closeLb());

  // ── Reels ──
  const track = document.getElementById("reelsTrack");
  if (S.reels && S.reels.length) {
    track.innerHTML = S.reels
      .map(
        (url) => `
        <div class="reel">
          <blockquote class="instagram-media" data-instgrm-permalink="${esc(url)}" data-instgrm-version="14">
            <a href="${esc(url)}" target="_blank" rel="noopener">View this reel on Instagram</a>
          </blockquote>
        </div>`
      )
      .join("");
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://www.instagram.com/embed.js";
    document.body.appendChild(s);
  } else {
    // Until reel links are added, show elegant tiles that open the Instagram profile
    const tiles = ["Material Studies", "Before & After", "Project Reveal", "Design Details", "Studio Moments"];
    track.innerHTML = tiles
      .map(
        (t, i) => `
        <a class="reel reel--ph ph--${i % 6} reveal" href="${igUrl}" target="_blank" rel="noopener" aria-label="${t} — watch on Instagram">
          <span class="reel__play" aria-hidden="true"></span>
          <small>@${esc(S.instagram)}</small>
          <p>${t}</p>
        </a>`
      )
      .join("");
  }

  // ── Nav ──
  const nav = document.getElementById("nav");
  const toggle = document.getElementById("navToggle");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open);
  });
  document.querySelectorAll("#navLinks a").forEach((a) =>
    a.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );

  // ── Reveal on scroll ──
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("is-visible");
          io.unobserve(en.target);
        }
      }),
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
})();
