export {};

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const revealGroups = [
  { container: ".shortcut-section", items: ":scope > p, :scope > .shortcuts > a" },
  { container: ".explorer", items: ":scope > .filters, :scope > .results > .toolbar > div, :scope > .results > .product-grid > .product-card, :scope > .results > .empty" },
  { container: ".comparisons", items: ":scope > .comparison-heading > *, :scope > .comparison-grid > .comparison-card" },
  { container: ".guides", items: ":scope > .section-top > *, :scope > .guide-grid > .guide-card" },
  { container: ".trust", items: ":scope > .container > .eyebrow, :scope > .container > .section-heading, :scope > .container > .trust-grid > article, :scope > .container > a" },
  { container: ".faq", items: ":scope > .eyebrow, :scope > .section-heading, :scope > div > details" },
  { container: ".site-footer", items: ".footer-grid > *, .disclosure" },
  { container: ".page-shell", items: ":scope > .breadcrumbs, :scope > header, :scope > article, :scope > section, :scope > aside, :scope > form, :scope > .saved-grid, :scope > .empty-state, :scope > button" },
  { container: ".content-grid", items: ":scope > *" },
  { container: ".prose", items: ":scope > nav, :scope > section, :scope > aside, :scope > .educational-note" },
  { container: ".analysis-layout", items: ":scope > *" },
  { container: ".related", items: ":scope > *" },
  { container: ".comparison-table", items: ":scope > *" },
  { container: ".saved-grid", items: ":scope > *" },
  { container: "main", items: ":scope > section, :scope > article, :scope > aside, :scope > form, :scope > div" },
];

if (!reduceMotion.matches && "IntersectionObserver" in window) {
  const revealElements = new Set<HTMLElement>();
  const homeStagger = document.querySelector("[data-home-stagger]");
  const mobile = matchMedia("(max-width: 767px)").matches;
  const revealLimit = homeStagger ? (mobile ? 7 : 10) : (mobile ? 5 : 7);

  revealGroups.forEach(({ container, items }) => {
    document.querySelectorAll<HTMLElement>(container).forEach((group) => {
      [...group.querySelectorAll<HTMLElement>(items)].forEach((item, index) => {
        if (item.closest("[hidden]") || item.matches("script,style,[hidden]")) return;
        if (!item.hasAttribute("data-reveal")) {
          const staggerIndex = Math.min(index, revealLimit);
          item.dataset.reveal = "";
          item.dataset.revealIndex = String(staggerIndex);
          item.style.setProperty("--reveal-index", String(staggerIndex));
          if (homeStagger?.contains(item)) item.dataset.homeReveal = "";
          if (item.matches(".product-card,.info-card,.comparison-card,.guide-card,.surface,img")) {
            item.dataset.revealCard = "";
          }
        }
        revealElements.add(item);
      });
    });
  });

  document.querySelectorAll<HTMLElement>(
    ".header-main > *, .nav-inner > *, .mobile-menu nav > *, .breadcrumbs > *, .page-hero > *, .editorial-hero__copy > *"
  ).forEach((item, index) => {
    item.dataset.pageEnter = "";
    item.style.setProperty("--enter-index", String(Math.min(index, 6)));
  });

  document.documentElement.classList.add("motion-ready");
  // Force the hidden starting state to be painted before revealing elements.
  // Without this layout read, fast desktop browsers can batch both states.
  void document.documentElement.offsetHeight;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const item = entry.target as HTMLElement;
      item.classList.add("is-visible");
      const finishReveal = (event: TransitionEvent) => {
        if (event.propertyName !== "transform") return;
        item.removeEventListener("transitionend", finishReveal);
        item.style.willChange = "auto";
        item.removeAttribute("data-reveal");
        item.removeAttribute("data-reveal-card");
        item.removeAttribute("data-reveal-index");
        item.removeAttribute("data-home-reveal");
        item.style.removeProperty("--reveal-index");
      };
      item.addEventListener("transitionend", finishReveal);
      observer.unobserve(item);
    });
  }, { rootMargin:"0px 0px -7% 0px", threshold:.08 });

  window.setTimeout(() => {
    revealElements.forEach((item) => observer.observe(item));
    document.querySelectorAll<HTMLElement>("[data-page-enter]").forEach((item) => item.classList.add("is-visible"));
  }, 80);
}

document.addEventListener("pointerdown", (event) => {
  const control = (event.target as Element).closest<HTMLElement>("button,.btn");
  control?.classList.add("is-pointer-down");
});

const releasePointer = (event: PointerEvent) => {
  const control = (event.target as Element).closest<HTMLElement>("button,.btn");
  control?.classList.remove("is-pointer-down");
};

document.addEventListener("pointerup", releasePointer);
document.addEventListener("pointercancel", releasePointer);
