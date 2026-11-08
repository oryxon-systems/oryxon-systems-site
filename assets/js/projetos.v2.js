/* Índice de projetos v2 (ADR-021): só aprimora o HTML de #projetos (contador, filtros, preview). Imutável: mudança = projetos.v3.js. */
(function () {
  var root = document.getElementById('projetos');
  var list = root && root.querySelector('[data-proj-list]');
  if (!list) return;
  var rows = Array.prototype.slice.call(list.querySelectorAll('.proj-row'));

  function el(tag, cls, txt) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (txt != null) e.textContent = txt;
    return e;
  }

  var head = el('div', 'proj-head'), count = el('span', 'proj-count');
  count.setAttribute('aria-live', 'polite');
  head.appendChild(count);
  list.parentNode.insertBefore(head, root.querySelector('.proj-cols'));

  function render(cat) {
    var n = 0;
    rows.forEach(function (a) {
      var ok = !cat || a.dataset.cat === cat;
      a.parentNode.hidden = !ok;
      if (ok) n++;
    });
    count.textContent = n + (n === 1 ? ' projeto' : ' projetos');
  }

  // Filtros só com >= 2 categorias distintas.
  var cats = {};
  rows.forEach(function (a) { if (a.dataset.cat) cats[a.dataset.cat] = a.dataset.catLabel || a.dataset.cat; });
  var keys = Object.keys(cats);
  if (keys.length >= 2) {
    var bar = el('div', 'proj-filters');
    bar.setAttribute('role', 'group');
    bar.setAttribute('aria-label', 'Filtrar por tipo de serviço');
    [['', 'Todos']].concat(keys.map(function (k) { return [k, cats[k]]; })).forEach(function (par, i) {
      var b = el('button', null, par[1]);
      b.type = 'button';
      b.setAttribute('aria-pressed', i === 0 ? 'true' : 'false');
      b.addEventListener('click', function () {
        Array.prototype.forEach.call(bar.children, function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        render(par[0]);
      });
      bar.appendChild(b);
    });
    head.appendChild(bar);
  }
  render('');

  // Preview que segue o cursor: só com hover real e ponteiro fino.
  if (!window.matchMedia('(hover:hover) and (pointer:fine)').matches) return;
  var reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var pv = el('figure', 'proj-preview');
  pv.setAttribute('aria-hidden', 'true');
  root.appendChild(pv);
  var tx = 0, ty = 0, x = 0, y = 0, raf = 0, shown = null;

  function show(a) {
    if (shown === a) return;
    shown = a;
    pv.textContent = '';
    var nome = a.children[1].lastChild.textContent;
    var ph = function () { pv.textContent = ''; pv.appendChild(el('div', 'proj-ph', nome)); };
    if (a.dataset.img) {
      var im = new Image();
      im.loading = 'lazy'; im.alt = ''; im.src = a.dataset.img;
      im.onerror = ph;
      pv.appendChild(im);
    } else {
      ph();
    }
    pv.classList.add('on');
  }

  function place() {
    tx = Math.min(tx, window.innerWidth - pv.offsetWidth - 8);
    ty = Math.min(ty, window.innerHeight - pv.offsetHeight - 8);
    pv.style.transform = 'translate3d(' + Math.round(x) + 'px,' + Math.round(y) + 'px,0)';
  }

  function tick() {
    x += (tx - x) * 0.15;
    y += (ty - y) * 0.15;
    place();
    raf = requestAnimationFrame(tick);
  }

  function move(e) {
    tx = e.clientX + 20; ty = e.clientY + 20;
    if (reduce) { x = tx; y = ty; place(); }
  }

  list.addEventListener('mouseenter', function (e) {
    tx = x = e.clientX + 20; ty = y = e.clientY + 20;
    document.addEventListener('mousemove', move);
    if (!reduce) raf = requestAnimationFrame(tick);
  });
  list.addEventListener('mouseleave', function () {
    document.removeEventListener('mousemove', move);
    cancelAnimationFrame(raf);
    raf = 0; shown = null;
    pv.classList.remove('on');
  });
  list.addEventListener('mouseover', function (e) {
    var a = e.target.closest && e.target.closest('.proj-row');
    if (a) show(a);
  });
})();
