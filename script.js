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

  // ── Projects and journal stories: cards that open a gallery ──
  const meta = (p) => [p.category, p.year].filter(Boolean).join(" · ");
  // photos shown when a card is opened; a card without a list shows its card photo
  const photosOf = (p) => (p.images && p.images.length ? p.images : [{ src: p.image || (p.compare && p.compare.after), caption: "" }]);
  // card photos: the lighter "-sm" file for normal screens, the full-size file for high-resolution screens
  const cardImg = (src, alt, sizes) => {
    const full = /-sm\.jpg$/.test(src) ? src.replace(/-sm\.jpg$/, ".jpg") : null;
    const set = full ? ` srcset="${esc(src)} 720w, ${esc(full)} 1080w" sizes="${sizes}"` : "";
    return `<img src="${esc(src)}"${set} alt="${esc(alt)}" loading="lazy" />`;
  };
  const coverOf = (p, sizes) =>
    p.compare
      ? `<div class="project__compare">
          <figure><img src="${esc(p.compare.before)}" alt="${esc(p.title)}, before" loading="lazy" /><figcaption>Before</figcaption></figure>
          <figure><img src="${esc(p.compare.after)}" alt="${esc(p.title)}, after" loading="lazy" /><figcaption>After</figcaption></figure>
        </div>`
      : cardImg(p.image, p.title, sizes);
  const countOf = (p, unit) => {
    const photos = photosOf(p);
    const clips = photos.filter((ph) => ph.video).length;
    if (photos.length < 2) return "";
    return clips ? `${photos.length - clips} photos + ${clips} videos` : `${photos.length} ${unit}`;
  };
  const renderCards = (el, items, sizes, unit, cols) => {
    if (!el || !items) return;
    el.innerHTML = items
      .map((p, i) => {
        const count = countOf(p, unit);
        return `
      <article class="project reveal" tabindex="0" data-index="${i}" style="--d:${i % cols}">
        <div class="project__media">${coverOf(p, sizes)}${count ? `<span class="project__count">${count}</span>` : ""}</div>
        <div class="project__info">
          <span>${esc(meta(p))}</span>
          <h3>${esc(p.title)}</h3>
        </div>
      </article>`;
      })
      .join("");
    el.addEventListener("click", (e) => {
      const card = e.target.closest(".project");
      if (card) openItem(items[+card.dataset.index]);
    });
    el.addEventListener("keydown", (e) => {
      const card = e.target.closest(".project");
      if (card && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        openItem(items[+card.dataset.index]);
      }
    });
  };

  // Pop-up gallery (arrows, keyboard and swipe); a video item plays as a short silent loop
  const lb = document.getElementById("lightbox");
  const lbClose = document.getElementById("lightboxClose");
  const lbMedia = document.getElementById("lightboxMedia");
  const lbLink = document.getElementById("lightboxLink");
  const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
  let lastFocus = null;
  let current = null;
  let photoIndex = 0;
  const showPhoto = (i) => {
    const photos = photosOf(current);
    photoIndex = (i + photos.length) % photos.length;
    const ph = photos[photoIndex];
    const many = photos.length > 1;
    const label = esc(current.title + (ph.caption ? ": " + ph.caption : ""));
    lbMedia.innerHTML = `
      ${ph.video
        ? `<video src="${esc(ph.video)}" poster="${esc(ph.src)}" muted loop playsinline preload="auto" aria-label="${label}"></video>`
        : `<img src="${esc(ph.src)}" alt="${label}" />`}
      ${many ? `<button class="lightbox__nav lightbox__nav--prev" type="button" data-step="-1" aria-label="Previous">←</button>
                <button class="lightbox__nav lightbox__nav--next" type="button" data-step="1" aria-label="Next">→</button>` : ""}
      ${ph.caption || many ? `<p class="lightbox__caption">${esc(ph.caption || "")}${many ? `<span>${photoIndex + 1} / ${photos.length}</span>` : ""}</p>` : ""}`;
    const video = lbMedia.querySelector("video");
    if (video) {
      video.muted = true;
      // plays on its own unless the visitor prefers less motion (or the browser blocks it): then it gets play controls
      if (calm.matches) video.controls = true;
      else video.play().catch(() => (video.controls = true));
    }
  };
  const openItem = (item) => {
    lastFocus = document.activeElement;
    current = item;
    showPhoto(0);
    document.getElementById("lightboxMeta").textContent = meta(item);
    document.getElementById("lightboxTitle").textContent = item.title;
    document.getElementById("lightboxDesc").textContent = item.description || "";
    lbLink.hidden = !item.post;
    if (item.post) lbLink.href = item.post;
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
    lbMedia.innerHTML = ""; // stops a playing video
    if (lastFocus) lastFocus.focus();
  };
  renderCards(document.getElementById("projectsGrid"), S.projects, "(max-width: 760px) calc(100vw - 40px), (max-width: 1280px) 31vw, 405px", "photos", 3);
  renderCards(document.getElementById("journalGrid"), S.journal, "(max-width: 980px) calc(50vw - 30px), (max-width: 1280px) 23vw, 300px", "slides", 4);
  lbMedia.addEventListener("click", (e) => {
    const btn = e.target.closest(".lightbox__nav");
    if (btn) showPhoto(photoIndex + +btn.dataset.step);
  });
  let touchX = null;
  lbMedia.addEventListener("touchstart", (e) => (touchX = e.touches[0].clientX), { passive: true });
  lbMedia.addEventListener("touchend", (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    touchX = null;
    if (Math.abs(dx) > 40 && photosOf(current).length > 1) showPhoto(photoIndex + (dx < 0 ? 1 : -1));
  });
  lbClose.addEventListener("click", closeLb);
  lb.addEventListener("click", (e) => e.target === lb && closeLb());
  document.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLb();
    else if (e.key === "ArrowRight") showPhoto(photoIndex + 1);
    else if (e.key === "ArrowLeft") showPhoto(photoIndex - 1);
  });

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
          ${r.cover ? `<img src="${esc(r.cover)}"${r.coverLarge ? ` srcset="${esc(r.cover)} 720w, ${esc(r.coverLarge)} 1080w" sizes="(max-width: 760px) 86vw, 340px"` : ""} alt="" loading="lazy" />` : `<svg class="mark" aria-hidden="true"><use href="#ge-mark"/></svg>`}
          <span class="reel__play" aria-hidden="true"></span>
          <span class="reel__meta"><small>@${esc(S.instagram)}</small>${r.caption ? `<span>${esc(r.caption)}</span>` : ""}</span>
        </a>
      </div>`
    )
    .join("") +
    // last tile: every reel, on Instagram's Reels tab
    `
      <div class="reel">
        <a class="reel__more" href="${igUrl}reels/" target="_blank" rel="noopener">
          <svg class="mark" aria-hidden="true"><use href="#ge-mark"/></svg>
          <span>More reels on Instagram</span>
          <small>@${esc(S.instagram)} →</small>
        </a>
      </div>`;
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

  // ── Contact form: sends the message straight to Elina's inbox through Web3Forms (web3forms.com),
  //    a free form-to-email service, using the Access Key in config.js (formKey).
  //    The visitor stays on the page; if sending fails, they're asked to try again. ──
  const form = document.getElementById("contactForm");
  const note = document.getElementById("formNote");
  const sendBtn = form.querySelector('button[type="submit"]');
  const showFailure = (reason) => {
    note.innerHTML =
      "Sorry, your message couldn’t be sent just now" + (reason ? ` (${esc(String(reason).slice(0, 80))})` : "") +
      `. Please try again in a moment, or email <a href="mailto:${esc(S.email)}">${esc(S.email)}</a>.`;
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
    if (!S.formKey) return showFailure();
    sendBtn.disabled = true;
    note.textContent = "Sending…";
    const abort = window.AbortController ? new AbortController() : null;
    const timer = abort && setTimeout(() => abort.abort(), 20000);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: S.formKey,
          subject: `New website enquiry from ${name || email}`,
          // a plain sender name: a web address here, on a message sent by Web3Forms, looks like spoofing to spam filters
          from_name: "Website contact form",
          replyto: email,
          name,
          email,
          message,
        }),
        signal: abort ? abort.signal : undefined,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || String(data.success) !== "true") throw new Error(data.message || "error " + res.status);
      form.reset();
      note.textContent = "Thank you! Your message has been sent. We’ll be in touch soon.";
    } catch (err) {
      showFailure(err && err.name !== "AbortError" && err.name !== "TypeError" ? err.message : "");
    } finally {
      clearTimeout(timer);
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


  // ── Playful touches (motion only; the content stays the same) ──
  const mouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const moving = !calm.matches;

  // Studio: a pen stroke under "effortless", drawn when the heading appears (CSS)
  const effortless = document.querySelector(".studio__text h2 em");
  if (effortless)
    effortless.insertAdjacentHTML("beforeend", '<svg class="scribble" viewBox="0 0 288 20" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M4 13C60 5 140 3 200 8S270 16 284 9"/></svg>');

  // The quote arrives one word at a time (screen readers get the sentence whole)
  const quote = document.querySelector(".band__quote");
  if (quote) {
    const text = quote.textContent.trim();
    quote.innerHTML =
      `<span class="sr-only">${esc(text)}</span><span aria-hidden="true">` +
      text.split(/\s+/).map((w, i) => `<span class="w" style="--w:${i}">${esc(w)}</span>`).join(" ") +
      "</span>";
    quote.classList.add("is-split");
  }

  // Reading progress along the top, and the studio photos floating at different speeds as the page scrolls
  const progress = document.createElement("div");
  progress.className = "progress";
  progress.setAttribute("aria-hidden", "true");
  document.body.appendChild(progress);
  const studioBox = document.querySelector(".studio__images");
  const floaters = moving ? [[".studio__img--a", -12], [".studio__img--b", 30]].map(([sel, amp]) => [document.querySelector(sel), amp]).filter(([el]) => el) : [];
  let fxQueued = false;
  const scrollFx = () => {
    fxQueued = false;
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max).toFixed(4) : 0})`;
    if (studioBox && floaters.length) {
      const r = studioBox.getBoundingClientRect();
      if (r.bottom > -200 && r.top < innerHeight + 200) {
        const t = Math.max(-1, Math.min(1, (r.top + r.height / 2 - innerHeight / 2) / innerHeight));
        floaters.forEach(([el, amp]) => (el.style.translate = `0 ${(t * amp).toFixed(1)}px`));
      }
    }
  };
  const queueFx = () => {
    if (!fxQueued) {
      fxQueued = true;
      requestAnimationFrame(scrollFx);
    }
  };
  window.addEventListener("scroll", queueFx, { passive: true });
  window.addEventListener("resize", queueFx);
  scrollFx();

  if (mouse && moving) {
    // Project and journal cards: hovering flips through the card's photos, with a little progress bar
    const flipThrough = (grid, items) => {
      if (!grid || !items) return;
      grid.querySelectorAll(".project").forEach((card) => {
        const item = items[+card.dataset.index];
        const photos = photosOf(item);
        if (item.compare || photos.length < 2) return;
        const media = card.querySelector(".project__media");
        let layers = null, bars = null, timer = null, shown = 0, top = 0;
        const build = () => {
          layers = [0, 1].map(() => {
            const img = document.createElement("img");
            img.className = "project__peek";
            img.alt = "";
            media.insertBefore(img, media.querySelector(".project__count"));
            return img;
          });
          bars = document.createElement("div");
          bars.className = "project__bars";
          bars.innerHTML = photos.map(() => "<i></i>").join("");
          media.appendChild(bars);
        };
        const show = (i) => {
          shown = i;
          [...bars.children].forEach((b, k) => (b.className = k < i ? "is-done" : ""));
          const now = bars.children[i];
          void now.offsetWidth; // restart this bar's fill
          now.className = "is-now";
          if (i === 0) return layers.forEach((l) => l.classList.remove("is-on"));
          const src = photos[i].src;
          const pre = new Image();
          pre.onload = () => {
            if (shown !== i || !card.classList.contains("is-peeking")) return;
            const next = layers[1 - top];
            next.src = src;
            media.insertBefore(next, media.querySelector(".project__count")); // on top of the other layer
            requestAnimationFrame(() => next.classList.add("is-on"));
            const prev = layers[top];
            setTimeout(() => shown === i && prev.classList.remove("is-on"), 700);
            top = 1 - top;
          };
          pre.src = src;
        };
        card.addEventListener("pointerenter", (e) => {
          if (e.pointerType !== "mouse") return;
          if (!layers) build();
          card.classList.add("is-peeking");
          show(0);
          clearInterval(timer);
          timer = setInterval(() => show((shown + 1) % photos.length), 1600);
        });
        card.addEventListener("pointerleave", () => {
          clearInterval(timer);
          card.classList.remove("is-peeking");
          shown = 0;
          if (layers) layers.forEach((l) => l.classList.remove("is-on"));
        });
      });
    };
    flipThrough(document.getElementById("projectsGrid"), S.projects);
    flipThrough(document.getElementById("journalGrid"), S.journal);

    // Reels: drag the row sideways (a drag never opens a reel)
    let drag = null;
    let dragged = false;
    track.addEventListener("pointerdown", (e) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      drag = { x: e.clientX, left: track.scrollLeft };
      dragged = false;
    });
    window.addEventListener("pointermove", (e) => {
      if (!drag) return;
      const dx = e.clientX - drag.x;
      if (!dragged && Math.abs(dx) > 6) {
        dragged = true;
        track.classList.add("is-dragging");
      }
      if (dragged) track.scrollLeft = drag.left - dx;
    });
    window.addEventListener("pointerup", () => {
      if (!drag) return;
      drag = null;
      track.classList.remove("is-dragging"); // the row settles on the nearest reel
      if (dragged) setTimeout(() => (dragged = false), 0); // after the click that ends the drag
    });
    track.addEventListener("click", (e) => {
      if (!dragged) return;
      e.preventDefault();
      e.stopPropagation();
      dragged = false;
    }, true);
    track.addEventListener("dragstart", (e) => e.preventDefault());

    // Contact: a soft light follows the cursor across the olive panel
    const contact = document.querySelector(".contact");
    if (contact)
      contact.addEventListener("pointermove", (e) => {
        const r = contact.getBoundingClientRect();
        contact.style.setProperty("--gx", `${Math.round(e.clientX - r.left)}px`);
        contact.style.setProperty("--gy", `${Math.round(e.clientY - r.top)}px`);
      });

    // Buttons lean gently towards the cursor
    document.querySelectorAll(".btn--dark, .btn--light, .nav__cta").forEach((btn) => {
      btn.addEventListener("pointermove", (e) => {
        const r = btn.getBoundingClientRect();
        btn.style.translate = `${((e.clientX - r.left - r.width / 2) * 0.18).toFixed(1)}px ${((e.clientY - r.top - r.height / 2) * 0.3).toFixed(1)}px`;
      });
      btn.addEventListener("pointerleave", () => (btn.style.translate = ""));
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

  // ── Services and Process drawings play as they appear (CSS); hovering or tapping one plays it again.
  //    Finished animations restart together, keeping their order but without the stagger between cards. ──
  document.querySelectorAll("[data-play]").forEach((el) =>
    el.addEventListener("pointerenter", () => {
      if (!el.getAnimations || !el.classList.contains("is-visible")) return;
      const done = el.getAnimations({ subtree: true }).filter((a) => a.playState === "finished" && a.effect);
      if (!done.length) return;
      const start = Math.min(...done.map((a) => a.effect.getTiming().delay || 0));
      done.forEach((a) => {
        a.currentTime = start;
        a.play();
      });
    })
  );
})();
