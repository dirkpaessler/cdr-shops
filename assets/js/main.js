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
  var targets = document.querySelectorAll('.cdrs-card, .section h2, .steps li, .split > div, .directory-foot, .method');
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

/* Method filter on the directory (progressive: the bar is hidden without JS). */
(function () {
  var bar = document.querySelector('.method-filter');
  if (!bar) return;
  bar.hidden = false;
  var cards = document.querySelectorAll('.card-grid .cdrs-card');
  var buttons = bar.querySelectorAll('.method-filter__btn');
  function apply(filter) {
    buttons.forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.filter === filter)); });
    cards.forEach(function (c) {
      c.hidden = filter !== 'all' && c.dataset.method !== filter;
    });
  }
  buttons.forEach(function (b) {
    b.addEventListener('click', function () {
      var f = b.dataset.filter;
      apply(f);
      try { history.replaceState(null, '', f === 'all' ? location.pathname : '#' + f); } catch (e) {}
    });
  });
  var h = (location.hash || '').replace('#', '');
  if (h && bar.querySelector('[data-filter="' + CSS.escape(h) + '"]')) apply(h);
})();
