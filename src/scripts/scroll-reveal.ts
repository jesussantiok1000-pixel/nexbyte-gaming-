const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (!reducedMotion.matches && "IntersectionObserver" in window) {
  const revealGroups = [
    ".shortcuts",
    ".explorer",
    ".guides",
    ".trust",
    ".faq",
    ".site-footer",
  ];

  const childSelectors = new Map<string, string>([
    [".shortcuts", ":scope > a"],
    [".explorer", ":scope > .filters, .toolbar, .product-card, .empty"],
    [".guides", ".section-top, .guide-card"],
    [".trust", ".eyebrow, .section-heading, .trust-grid > article, .container > a"],
    [".faq", ":scope > .eyebrow, :scope > .section-heading, details"],
    [".site-footer", ".footer-grid > *, .disclosure"],
  ]);

  document.documentElement.classList.add("reveal-enabled");

  revealGroups.forEach((groupSelector) => {
    const group = document.querySelector<HTMLElement>(groupSelector);
    const childSelector = childSelectors.get(groupSelector);
    if (!group || !childSelector) return;

    group.dataset.revealGroup = "";
    const items = [...group.querySelectorAll<HTMLElement>(childSelector)];

    items.forEach((item, index) => {
      item.dataset.revealItem = "";
      item.style.setProperty("--reveal-index", String(index));
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const group = entry.target as HTMLElement;
        group.dataset.revealed = "";
        observer.unobserve(group);
      });
    },
    {
      rootMargin: "0px 0px -10% 0px",
      threshold: 0.08,
    },
  );

  document
    .querySelectorAll<HTMLElement>("[data-reveal-group]")
    .forEach((group) => observer.observe(group));
}
