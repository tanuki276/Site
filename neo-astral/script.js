const qs = (selector, root = document) => root.querySelector(selector);
const qsa = (selector, root = document) => [...root.querySelectorAll(selector)];

const header = qs("[data-header]");
const menuButton = qs("[data-menu]");
const modal = qs("[data-modal]");
const toast = qs("[data-toast]");
const wishlistButtons = qsa("[data-wishlist]");
const countNodes = qsa("[data-count]");
const trailerButton = qs("[data-trailer]");

let wishlistCount = Number(localStorage.getItem("neon-echo-wishlist") || 0);

const renderCount = () => {
  const label = String(Math.max(0, wishlistCount)).padStart(2, "0");
  countNodes.forEach(node => node.textContent = label);
};

const showToast = (message) => {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2600);
};

wishlistButtons.forEach(button => {
  button.addEventListener("click", () => {
    wishlistCount += 1;
    localStorage.setItem("neon-echo-wishlist", String(wishlistCount));
    renderCount();
    showToast("SIGNAL LOCKED — WISHLIST に登録しました。");
  });
});

const setModal = (open) => {
  modal.classList.toggle("open", open);
  modal.setAttribute("aria-hidden", String(!open));
  document.body.style.overflow = open ? "hidden" : "";
};

trailerButton?.addEventListener("click", () => setModal(true));
qsa("[data-close]", modal).forEach(element => element.addEventListener("click", () => setModal(false)));
document.addEventListener("keydown", event => {
  if (event.key === "Escape") setModal(false);
});

menuButton?.addEventListener("click", () => {
  const open = header.classList.toggle("menu-open");
  menuButton.setAttribute("aria-expanded", String(open));
});

qsa(".site-nav a").forEach(link => {
  link.addEventListener("click", () => {
    header.classList.remove("menu-open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 20);
}, { passive: true });

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

qsa(".section-heading, .fact-card, .system-card, .operator-card, .release-panel").forEach(element => {
  element.classList.add("reveal");
  observer.observe(element);
});

renderCount();
