(() => {
    const track = document.getElementById("track");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const dot1 = document.getElementById("dot1");
    const dot2 = document.getElementById("dot2");
  
    if (!track || !prevBtn || !nextBtn) return;
  
    const slides = Array.from(track.querySelectorAll(".slide"));
    const total = slides.length; // 2
  
    let index = 0;
    let timer = null;
  
    const render = () => {
      track.style.transform = `translateX(-${index * 100}%)`;
      dot1?.classList.toggle("active", index === 0);
      dot2?.classList.toggle("active", index === 1);
    };
  
    const go = (i) => {
      index = (i + total) % total;
      render();
    };
  
    const next = () => go(index + 1);
    const prev = () => go(index - 1);
  
    const start = () => {
      stop();
      timer = setInterval(next, 6000);
    };
  
    const stop = () => {
      if (timer) clearInterval(timer);
      timer = null;
    };
  
    prevBtn.addEventListener("click", () => { stop(); prev(); start(); });
    nextBtn.addEventListener("click", () => { stop(); next(); start(); });
  
    // Swipe simple (mobile)
    let startX = 0;
    track.addEventListener("touchstart", (e) => {
      stop();
      startX = e.touches[0].clientX;
    }, { passive: true });
  
    track.addEventListener("touchend", (e) => {
      const endX = e.changedTouches[0].clientX;
      const diff = endX - startX;
      if (Math.abs(diff) > 40) {
        diff < 0 ? next() : prev();
      }
      start();
    }, { passive: true });
  
    render();
    start();
  })();
  