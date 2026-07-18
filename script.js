// ============ That Data Geek — interactions ============

// Current year in footer
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Nav background on scroll (transparent over dark hero; always solid on pages without one)
const nav = document.querySelector(".nav");
const hasDarkHero = !!document.querySelector(".hero-dark");
const onScroll = () => {
  if (!hasDarkHero) { nav.classList.add("scrolled"); return; }
  nav.classList.toggle("scrolled", window.scrollY > 8);
};
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Mobile menu
const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");
if (toggle && links) {
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  links.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );
}

// Skill bars: fill to data-level (out of 5), loading one after another
document.querySelectorAll(".skill").forEach((row, i) => {
  const level = parseInt(row.dataset.level || "0", 10);
  const fill = row.querySelector(".skill-fill");
  if (!fill) return;
  row.style.setProperty("--pct", (level / 5) * 100 + "%");
  fill.style.transitionDelay = i * 0.16 + "s"; // sequential cascade
});

// Reveal-on-scroll
const revealables = document.querySelectorAll(".reveal, .skill");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("revealed");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );
  revealables.forEach((el) => io.observe(el));
} else {
  revealables.forEach((el) => el.classList.add("revealed"));
}

// Scrollspy — highlight the nav tab for the section in view
const sections = document.querySelectorAll("main section[id]");
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
if ("IntersectionObserver" in window && sections.length) {
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          navAnchors.forEach((a) =>
            a.classList.toggle("active", a.getAttribute("href") === `#${e.target.id}`)
          );
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );
  sections.forEach((s) => spy.observe(s));
}

// Share buttons — build real share intents from the page's own URL
document.querySelectorAll(".share-btn[data-network]").forEach((btn) => {
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(document.title);
  const map = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
  };
  const href = map[btn.dataset.network];
  if (href) btn.setAttribute("href", href);
});

// ===== Giscus comments (real comments via GitHub Discussions) =====
// After following the Giscus steps in SETUP-GUIDE.md, fill in these
// three values from giscus.app — that's the only edit needed.
const GISCUS = {
  repo: "",        // e.g. "anirudhamp/thatdatageek"
  repoId: "",      // from giscus.app
  categoryId: "",  // from giscus.app (category: Announcements or General)
};

const giscusHolder = document.querySelector(".giscus");
if (giscusHolder) {
  if (GISCUS.repo && GISCUS.repoId && GISCUS.categoryId) {
    const gs = document.createElement("script");
    gs.src = "https://giscus.app/client.js";
    gs.async = true;
    gs.crossOrigin = "anonymous";
    Object.entries({
      "data-repo": GISCUS.repo,
      "data-repo-id": GISCUS.repoId,
      "data-category": "Announcements",
      "data-category-id": GISCUS.categoryId,
      "data-mapping": "pathname",
      "data-strict": "0",
      "data-reactions-enabled": "1",
      "data-emit-metadata": "0",
      "data-input-position": "top",
      "data-theme": "light",
      "data-lang": "en",
    }).forEach(([k, v]) => gs.setAttribute(k, v));
    giscusHolder.appendChild(gs);
  } else {
    // Not configured yet — hide the section so nothing looks broken
    const sec = document.getElementById("comments");
    if (sec) sec.style.display = "none";
  }
}


// Journey timeline: green line draws downward as you scroll through it
const tl = document.querySelector(".timeline");
if (tl) {
  const prog = document.createElement("div");
  prog.className = "tl-progress";
  tl.appendChild(prog);
  const drawLine = () => {
    const r = tl.getBoundingClientRect();
    const anchor = window.innerHeight * 0.72; // line tip follows ~3/4 down the viewport
    const drawn = Math.min(Math.max(anchor - r.top - 12, 0), r.height - 24);
    prog.style.height = drawn + "px";
  };
  window.addEventListener("scroll", drawLine, { passive: true });
  window.addEventListener("resize", drawLine, { passive: true });
  drawLine();
}

// Testimonials slider arrows
const qTrack = document.querySelector(".quote-track");
if (qTrack) {
  const step = () => qTrack.clientWidth + 18;
  const prev = document.querySelector(".q-prev");
  const next = document.querySelector(".q-next");
  if (prev) prev.addEventListener("click", () => qTrack.scrollBy({ left: -step(), behavior: "smooth" }));
  if (next) next.addEventListener("click", () => qTrack.scrollBy({ left: step(), behavior: "smooth" }));
}

// Scroll progress bar + back-to-top visibility
const progressBar = document.querySelector(".scroll-progress");
const toTop = document.querySelector(".to-top");
const onProgress = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (progressBar && max > 0) progressBar.style.width = (window.scrollY / max) * 100 + "%";
  if (toTop) toTop.classList.toggle("show", window.scrollY > 600);
};
window.addEventListener("scroll", onProgress, { passive: true });
onProgress();
