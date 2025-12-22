(() => {
    const items = document.querySelectorAll(".reveal");
    if (!items.length) return;
  
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }
  
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target); // se anima 1 vez y listo
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
  
  (() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;
  
    const cards = document.querySelectorAll(".content-card");
    if (!cards.length) return;
  
    // Solo desktop real
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!finePointer) return;
  
    cards.forEach((card) => {
      card.style.transformStyle = "preserve-3d";
      card.style.willChange = "transform";
  
      const onMove = (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;   // 0..1
        const y = (e.clientY - r.top) / r.height;   // 0..1
  
        const rotY = (x - 0.5) * 6; // grados
        const rotX = (0.5 - y) * 6;
  
        card.style.transform = `translateY(-0.15rem) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      };
  
      const onLeave = () => {
        card.style.transform = "";
      };
  
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
    });
  })();
  