(function () {
  const S = window.SITE;
  const igUrl = "https://www.instagram.com/" + S.instagram + "/";
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  // ── Contact details ──
  document.querySelectorAll(".js-email").forEach((a) => {
    a.href = "mailto:" + S.email;
    a.textContent = S.email;
  });
  document.querySelectorAll(".js-ig").forEach((a) => (a.href = igUrl));
  document.querySelectorAll(".js-ig-handle").forEach((el) => (el.textContent = "@" + S.instagram));
  document.getElementById("year").textContent = new Date().getFullYear();

  // ── Projects ──
  const grid = document.getElementById("projectsGrid");
  const meta = (p) => [p.category, p.year].filter(Boolean).join(" · ");
  grid.innerHTML = S.projects
    .map(
      (p, i) => `
      <article class="project reveal" tabindex="0" data-index="${i}">
        <div class="project__media"><img src="${esc(p.image)}" alt="${esc(p.title)}" loading="lazy" /></div>
        <div class="project__info">
          <span>${esc(meta(p))}</span>
          <h3>${esc(p.title)}</h3>
        </div>
      </article>`
    )
    .join("");

  // Lightbox
  const lb = document.getElementById("lightbox");
  const lbClose = document.getElementById("lightboxClose");
  let lastFocus = null;
  const openProject = (i) => {
    lastFocus = document.activeElement;
    const p = S.projects[i];
    document.getElementById("lightboxMedia").innerHTML = `<img src="${esc(p.image)}" alt="${esc(p.title)}" />`;
    document.getElementById("lightboxMeta").textContent = meta(p);
    document.getElementById("lightboxTitle").textContent = p.title;
    document.getElementById("lightboxDesc").textContent = p.description;
    lb.classList.add("is-open");
    lb.inert = false;
    document.body.style.overflow = "hidden";
    lbClose.focus();
  };
  const closeLb = () => {
    if (!lb.classList.contains("is-open")) return;
    lb.classList.remove("is-open");
    lb.inert = true;
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
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
  lbClose.addEventListener("click", closeLb);
  lb.addEventListener("click", (e) => e.target === lb && closeLb());
  document.addEventListener("keydown", (e) => e.key === "Escape" && closeLb());

  // ── Reels: official Instagram embeds (the link inside is the fallback if Instagram can't load) ──
  // Share links carry tracking parameters (?igsh=…); the embed needs only the clean permalink.
  const permalink = (url) => url.split(/[?#]/)[0].replace(/\/?$/, "/");
  const track = document.getElementById("reelsTrack");
  track.innerHTML = S.reels
    .map(
      (url, i) => `
      <div class="reel">
        <blockquote class="instagram-media" data-instgrm-permalink="${esc(permalink(url))}" data-instgrm-version="14">
          <a href="${esc(permalink(url))}" target="_blank" rel="noopener">
            <svg class="mark" aria-hidden="true"><use href="#ge-mark"/></svg>
            <span>Reel ${String(i + 1).padStart(2, "0")}</span>
            <strong>Watch on Instagram</strong>
          </a>
        </blockquote>
      </div>`
    )
    .join("");

  // Arrow buttons scroll the reels row by one reel; hidden when every reel already fits
  const reelsNav = document.getElementById("reelsNav");
  const updateReelsNav = () => (reelsNav.hidden = track.scrollWidth <= track.clientWidth + 2);
  reelsNav.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn || !track.firstElementChild) return;
    const step = track.firstElementChild.getBoundingClientRect().width + (parseFloat(getComputedStyle(track).columnGap) || 0);
    track.scrollBy({ left: step * +btn.dataset.dir, behavior: "smooth" });
  });
  window.addEventListener("resize", updateReelsNav);
  updateReelsNav();

  // ── Live Instagram feed: Instagram's official profile embed always shows the latest posts.
  //    The tiles inside it are the fallback, shown only if Instagram can't load. ──
  document.getElementById("feedLive").dataset.instgrmPermalink = igUrl;
  document.getElementById("feedGrid").innerHTML = S.feed
    .map(
      (p) => `
      <a class="post" href="${igUrl}" target="_blank" rel="noopener" aria-label="${esc(p.caption)} — view on Instagram">
        <img src="${esc(p.image)}" alt="" loading="lazy" />
        <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.3" cy="6.7" r="1"/></svg>
      </a>`
    )
    .join("");

  // Instagram's embed script turns the reels and the profile feed above into live embeds
  const igScript = document.createElement("script");
  igScript.async = true;
  igScript.src = "https://www.instagram.com/embed.js";
  document.body.appendChild(igScript);

  // ── Contact form: opens the visitor's email app with the message filled in ──
  const form = document.getElementById("contactForm");
  const note = document.getElementById("formNote");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const d = new FormData(form);
    const email = (d.get("email") || "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      note.textContent = "Please enter a valid email address.";
      form.elements.email.focus();
      return;
    }
    const name = (d.get("name") || "").trim();
    const subject = "Website enquiry" + (name ? " from " + name : "");
    const body = `${d.get("message") || ""}\n\n— ${name || "(no name)"}\n${email}`;
    window.location.href = `mailto:${S.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    note.textContent = "Thank you! Your email app should open to send the message.";
  });

  // ── Nav ──
  const nav = document.getElementById("nav");
  const toggle = document.getElementById("navToggle");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  // Mobile menu: the page behind the full-screen menu doesn't scroll while it's open
  const setMenu = (open) => {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open);
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.style.overflow = open ? "hidden" : "";
  };
  toggle.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
  document.querySelectorAll("#navLinks a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => e.key === "Escape" && nav.classList.contains("is-open") && setMenu(false));

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
