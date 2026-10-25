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
  const openProject = (i) => {
    const p = S.projects[i];
    document.getElementById("lightboxMedia").innerHTML = `<img src="${esc(p.image)}" alt="${esc(p.title)}" />`;
    document.getElementById("lightboxMeta").textContent = meta(p);
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
  document.getElementById("reelsTrack").innerHTML = S.reels
    .map(
      (r) => `
      <a class="reel reveal" href="${esc(r.url || igUrl)}" target="_blank" rel="noopener" aria-label="${esc(r.caption)} — watch on Instagram">
        <img src="${esc(r.image)}" alt="" loading="lazy" />
        <span class="reel__play" aria-hidden="true"></span>
        <small>@${esc(S.instagram)}</small>
        <p>${esc(r.caption)}</p>
      </a>`
    )
    .join("");

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
