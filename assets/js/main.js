/* Progressive enhancement only: without JS (or with reduced motion) everything is simply visible. */
(function () {
  var docEl = document.documentElement;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Sticky header gains a shadow once the page scrolls.
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  if (reduced || !('IntersectionObserver' in window)) return;
  docEl.classList.add('motion');

  // Scroll reveal: elements rise in once, staggered per viewport batch.
  var targets = document.querySelectorAll('.cdrs-card, .section h2, .steps li, .split > div, .directory-foot, .photo-strip img');
  var batchIndex = 0;
  var lastTime = 0;
  var io = new IntersectionObserver(function (entries) {
    var now = performance.now();
    if (now - lastTime > 250) batchIndex = 0; // new batch → restart stagger
    lastTime = now;
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.style.transitionDelay = Math.min(batchIndex * 70, 350) + 'ms';
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
      batchIndex += 1;
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

  targets.forEach(function (el) {
    el.classList.add('will-reveal');
    io.observe(el);
  });
})();
