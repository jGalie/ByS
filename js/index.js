(() => {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Celular: hasta 40rem (tablet y desktop quedan con reveal)
  const isPhone = window.matchMedia("(max-width: 40rem)").matches;

  // Si es celular o el usuario pide menos animación: mostrar todo y NO observar
  if (reduceMotion || isPhone) {
    items.forEach((el) => {
      el.classList.add("is-visible");
      el.style.transitionDelay = "0ms";
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target); // anima 1 vez y listo
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0% 0% -10% 0%",
    }
  );

  items.forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i * 60, 360)}ms`;
    observer.observe(el);
  });
})();
