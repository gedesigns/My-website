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

  // Instagram's embed script turns <blockquote class="instagram-media"> into players and feeds.
  // Loaded on demand: when a reel is tapped or the live feed comes near the screen.
  let igScript = null;
  const loadInstagram = () => {
    if (window.instgrm) return window.instgrm.Embeds.process();
    if (igScript) return; // still loading; it processes every embed on the page when it arrives
    igScript = document.createElement("script");
    igScript.async = true;
    igScript.src = "https://www.instagram.com/embed.js";
    document.body.appendChild(igScript);
  };

  // ── Reels: a cover photo per reel; Instagram's player loads only when the reel is tapped.
  //    Keeps the page light (no video players until wanted), especially inside Instagram's own browser.
  //    Share links carry tracking parameters (?igsh=…); the embed needs only the clean permalink. ──
  const permalink = (url) => url.split(/[?#]/)[0].replace(/\/?$/, "/");
  const reels = S.reels.map((r) => (typeof r === "string" ? { url: r } : r));
  const track = document.getElementById("reelsTrack");
  track.innerHTML = reels
    .map(
      (r, i) => `
      <div class="reel">
        <a class="reel__cover" href="${esc(permalink(r.url))}" target="_blank" rel="noopener" data-index="${i}"
           aria-label="Play reel${r.caption ? ": " + esc(r.caption) : ""}">
          ${r.cover ? `<img src="${esc(r.cover)}" alt="" loading="lazy" />` : `<svg class="mark" aria-hidden="true"><use href="#ge-mark"/></svg>`}
          <span class="reel__play" aria-hidden="true"></span>
          <span class="reel__meta"><small>@${esc(S.instagram)}</small>${r.caption ? `<span>${esc(r.caption)}</span>` : ""}</span>
        </a>
      </div>`
    )
    .join("");
  track.addEventListener("click", (e) => {
    const cover = e.target.closest(".reel__cover");
    if (!cover) return;
    e.preventDefault();
    const url = permalink(reels[+cover.dataset.index].url);
    // Swap the cover for Instagram's player; the link inside is the fallback if Instagram can't load
    cover.parentElement.innerHTML = `
      <blockquote class="instagram-media" data-instgrm-permalink="${esc(url)}" data-instgrm-version="14">
        <a class="reel__fallback" href="${esc(url)}" target="_blank" rel="noopener">
          <svg class="mark" aria-hidden="true"><use href="#ge-mark"/></svg>
          <span>Watch on Instagram</span>
        </a>
      </blockquote>`;
    loadInstagram();
  });

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
  //    It loads when the visitor scrolls near it; the tiles inside are the fallback. ──
  const feedLive = document.getElementById("feedLive");
  feedLive.dataset.instgrmPermalink = igUrl;
  document.getElementById("feedGrid").innerHTML = S.feed
    .map(
      (p) => `
      <a class="post" href="${igUrl}" target="_blank" rel="noopener" aria-label="${esc(p.caption)} — view on Instagram">
        <img src="${esc(p.image)}" alt="" loading="lazy" />
        <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.3" cy="6.7" r="1"/></svg>
      </a>`
    )
    .join("");
  new IntersectionObserver(
    (entries, obs) => {
      if (entries.some((en) => en.isIntersecting)) {
        obs.disconnect();
        loadInstagram();
      }
    },
    { rootMargin: "600px 0px" }
  ).observe(feedLive);

  // ── Contact form: sends the message straight to Elina's inbox through FormSubmit (formsubmit.co),
  //    a free form-to-email service. If that fails, the visitor's email app opens with the message instead. ──
  const form = document.getElementById("contactForm");
  const note = document.getElementById("formNote");
  const sendBtn = form.querySelector('button[type="submit"]');
  const openEmailApp = (name, email, message) => {
    const subject = "Website enquiry" + (name ? " from " + name : "");
    const body = `${message}\n\n— ${name || "(no name)"}\n${email}`;
    window.location.href = `mailto:${S.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const d = new FormData(form);
    const name = (d.get("name") || "").trim();
    const email = (d.get("email") || "").trim();
    const message = (d.get("message") || "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      note.textContent = "Please enter a valid email address.";
      form.elements.email.focus();
      return;
    }
    if (!message) {
      note.textContent = "Please write a short message.";
      form.elements.message.focus();
      return;
    }
    if (d.get("_honey")) return; // the hidden spam trap was filled in: a bot
    sendBtn.disabled = true;
    note.textContent = "Sending…";
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${S.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `New enquiry from ${name || email} · gracefuleradesigns.com`,
          _template: "table",
          _captcha: "false",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || String(data.success) !== "true") throw new Error(data.message || "HTTP " + res.status);
      form.reset();
      note.textContent = "Thank you! Your message has been sent. We’ll be in touch soon.";
    } catch (err) {
      note.textContent = "Your email app will open with your message ready. Just press send.";
      openEmailApp(name, email, message);
    } finally {
      sendBtn.disabled = false;
    }
  });

  // ── Nav ──
  const nav = document.getElementById("nav");
  const toggle = document.getElementById("navToggle");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  // Mobile menu: its own full-screen layer (outside the fixed header), shown and hidden instantly.
  // While it's open the page content is hidden, so nothing (e.g. an Instagram player) can draw over it.
  const menu = document.getElementById("mobileMenu");
  const setMenu = (open) => {
    menu.hidden = !open;
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", open);
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };
  toggle.addEventListener("click", () => setMenu(menu.hidden));
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  nav.querySelector(".brand").addEventListener("click", () => setMenu(false));
  document.addEventListener("keydown", (e) => e.key === "Escape" && !menu.hidden && setMenu(false));
  const desktop = window.matchMedia("(min-width: 1081px)");
  const onDesktop = () => desktop.matches && setMenu(false);
  if (desktop.addEventListener) desktop.addEventListener("change", onDesktop);
  else desktop.addListener(onDesktop);

  // ── Interactive room in the hero: the swatches re-upholster the sofa; the lamp switches on and off ──
  const room = document.querySelector(".hero__visual");
  if (room) {
    const fabricName = room.querySelector(".hero__fabric");
    const swatches = room.querySelectorAll(".swatch");
    swatches.forEach((btn) =>
      btn.addEventListener("click", () => {
        room.dataset.fabric = btn.dataset.fabric;
        fabricName.textContent = btn.dataset.name;
        swatches.forEach((b) => {
          b.classList.toggle("is-active", b === btn);
          b.setAttribute("aria-pressed", b === btn);
        });
      })
    );
    const lamp = room.querySelector(".lamp");
    const toggleLamp = () => {
      const on = !room.classList.toggle("is-off");
      lamp.setAttribute("aria-pressed", on);
      lamp.setAttribute("aria-label", on ? "Turn the lamp off" : "Turn the lamp on");
    };
    lamp.addEventListener("click", toggleLamp);
    lamp.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleLamp();
      }
    });
  }

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
