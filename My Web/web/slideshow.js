/* =========================================================
   背景图片交替展示（首页与各子页面共用）
   ========================================================= */
(function () {
  var stage = document.querySelector('.hero-slides');
  if (!stage) return;

  var slides = Array.prototype.slice.call(stage.querySelectorAll('img'));
  if (!slides.length) return;

  var dots = Array.prototype.slice.call(document.querySelectorAll('.slide-dots button'));
  var index = 0;
  var timer = null;
  var INTERVAL = 8000;

  function show(n) {
    index = (n + slides.length) % slides.length;
    slides.forEach(function (img, i) {
      img.classList.toggle('is-active', i === index);
    });
    dots.forEach(function (dot, i) {
      dot.setAttribute('aria-pressed', i === index ? 'true' : 'false');
    });
  }

  function start() {
    stop();
    if (slides.length < 2) return;
    timer = window.setInterval(function () { show(index + 1); }, INTERVAL);
  }

  function stop() {
    if (timer) { window.clearInterval(timer); timer = null; }
  }

  dots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      show(parseInt(dot.getAttribute('data-index'), 10) || 0);
      start();
    });
  });

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) { stop(); } else { start(); }
  });

  show(0);
  start();
})();
