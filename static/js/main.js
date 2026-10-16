// Formulář: demo režim neodesílá nic, ostrý režim posílá na endpoint ze site.json (data-endpoint).
(function () {
  document.querySelectorAll('form.formular').forEach(function (f) {
    var stav = f.querySelector('.formular-stav');
    f.addEventListener('submit', function (e) {
      var endpoint = f.getAttribute('data-endpoint');
      var demo = f.getAttribute('data-demo') === '1';
      if (f.querySelector('.past input').value) { e.preventDefault(); return; }   // robot
      if (demo || !endpoint) {
        e.preventDefault();
        stav.textContent = 'Ukázka formuláře: nic se neodesílá. Po spuštění webu bude zpráva doručena na e-mail firmy.';
        return;
      }
      e.preventDefault();
      stav.textContent = 'Odesílám…';
      fetch(endpoint, { method: 'POST', body: new FormData(f), headers: { Accept: 'application/json' } })
        .then(function (r) { if (!r.ok) throw new Error(r.status); f.reset(); stav.textContent = 'Děkujeme, zpráva byla odeslána.'; })
        .catch(function () { stav.textContent = 'Odeslání se nepodařilo. Napište nám prosím e-mailem.'; });
    });
  });
})();
// Rejstřík realizací: zvýrazní projekt, který je právě ve výřezu; fade-in článků.
(function () {
  var odkazy = document.querySelectorAll('.rejstrik-seznam ol a');
  var clanky = document.querySelectorAll('.projekt');
  if (!('IntersectionObserver' in window)) { clanky.forEach(function (c) { c.classList.add('vidim'); }); return; }
  clanky.forEach(function (c) { c.classList.add('reveal'); });
  clanky.forEach(function (c) {
    new IntersectionObserver(function (z, o) { if (z[0].isIntersecting) { c.classList.add('vidim'); o.disconnect(); } }, { threshold: 0.12 }).observe(c);
  });
  var akt = new IntersectionObserver(function (z) {
    z.forEach(function (e) { if (e.isIntersecting) { odkazy.forEach(function (a) { a.classList.toggle('aktivni', a.dataset.cil === e.target.id); }); } });
  }, { rootMargin: '-40% 0px -50% 0px' });
  clanky.forEach(function (c) { akt.observe(c); });
})();
