(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isPhone = window.matchMedia("(max-width: 40rem)").matches; // <= 640px

  const revealItems = document.querySelectorAll(".reveal");
  const wiggleBtn = document.querySelector(".cta-wiggle");

  // Si el usuario pide menos movimiento: mostramos todo y no animamos nada
  if (reduceMotion) {
    revealItems.forEach(el => {
      el.classList.add("is-visible");
      el.style.transitionDelay = "0ms";
    });
    return;
  }

  // ✅ WIGGLE: siempre activo (celu / tablet / desktop)
  if (wiggleBtn) wiggleBtn.classList.add("is-wiggling");

  // ✅ CELU: sin reveal (para que no ande lento)
  if (isPhone) {
    revealItems.forEach(el => {
      el.classList.add("is-visible");
      el.style.transitionDelay = "0ms";
    });
    return;
  }

  // ✅ TABLET + DESKTOP: reveal normal
  if (!revealItems.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0% 0% -10% 0%" }
  );

  revealItems.forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i * 60, 360)}ms`;
    observer.observe(el);
  });
})();
