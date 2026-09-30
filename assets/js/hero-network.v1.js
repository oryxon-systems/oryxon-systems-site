(function () {
  'use strict';
  var host = document.querySelector('.hero-visual');
  var cv = host && host.querySelector('.hero-net');
  var ctx = cv && cv.getContext && cv.getContext('2d');
  if (!ctx) return;

  var mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  var weak = (navigator.hardwareConcurrency || 8) <= 2 || (navigator.deviceMemory || 8) <= 2;
  var isStatic = function () { return mq.matches || weak; };

  var w = 0, h = 0, nodes = [], band = 0, packets = [], raf = 0, last = 0, nextPkt = 0;
  var cx = 0, cy = 0, visible = true, on = false;

  function bandOf() { var v = window.innerWidth; return v >= 980 ? 38 : v >= 680 ? 24 : 16; }
  function rnd(a, b) { return a + Math.random() * (b - a); }

  function makeNode() {
    var x, y, i = 0;
    do {
      x = rnd(0, w); y = rnd(0, h);
      var dx = x - cx, dy = y - cy;
      // menos nós perto da orb: ~75% de rejeição dentro de 130px
    } while (dx * dx + dy * dy < 16900 && Math.random() < 0.75 && ++i < 8);
    var ang = rnd(0, 6.2832), sp = rnd(0.05, 0.18);
    return { x: x, y: y, r: rnd(1.2, 2.2), a: rnd(0.5, 0.9), vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp };
  }

  function resize() {
    w = host.clientWidth; h = host.clientHeight;
    if (!w || !h) return;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var orb = host.querySelector('.orb-large');
    cx = w / 2; cy = orb ? orb.offsetTop + orb.offsetHeight / 2 : 164;
    var b = bandOf();
    if (b !== band || !nodes.length) {
      band = b; nodes = [];
      for (var i = 0; i < b; i++) nodes.push(makeNode());
      packets = [];
    } else {
      // mesma faixa: mantém os nós, só traz de volta os que ficaram fora
      nodes.forEach(function (n) {
        n.x = Math.min(Math.max(n.x, 0), w); n.y = Math.min(Math.max(n.y, 0), h);
      });
    }
    draw(0);
  }

  function draw(now) {
    var maxD = window.innerWidth < 680 ? 90 : 120, max2 = maxD * maxD, i, j, a, b, dx, dy, d2;
    ctx.clearRect(0, 0, w, h);
    ctx.lineWidth = 0.6;
    for (i = 0; i < nodes.length; i++) {
      a = nodes[i];
      for (j = i + 1; j < nodes.length; j++) {
        b = nodes[j]; dx = a.x - b.x; dy = a.y - b.y; d2 = dx * dx + dy * dy;
        if (d2 < max2) {
          ctx.strokeStyle = 'rgba(0,183,255,' + ((1 - Math.sqrt(d2) / maxD) * 0.35).toFixed(3) + ')';
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
    }
    for (i = 0; i < nodes.length; i++) {
      a = nodes[i];
      ctx.fillStyle = 'rgba(103,232,255,' + a.a.toFixed(2) + ')';
      ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, 6.2832); ctx.fill();
    }
    if (now) {
      ctx.fillStyle = 'rgba(157,247,255,1)'; ctx.shadowColor = 'rgba(157,247,255,1)'; ctx.shadowBlur = 8;
      packets = packets.filter(function (p) {
        var t = (now - p.t0) / 900;
        if (t >= 1) return false;
        ctx.beginPath();
        ctx.arc(p.a.x + (p.b.x - p.a.x) * t, p.a.y + (p.b.y - p.a.y) * t, 2.5, 0, 6.2832); ctx.fill();
        return true;
      });
      ctx.shadowBlur = 0;
    }
    if (!on) { on = true; cv.classList.add('on'); }
  }

  function spawnPacket(now) {
    var maxD = window.innerWidth < 680 ? 90 : 120, max2 = maxD * maxD, pairs = [], i, j, dx, dy;
    for (i = 0; i < nodes.length; i++) for (j = i + 1; j < nodes.length; j++) {
      dx = nodes[i].x - nodes[j].x; dy = nodes[i].y - nodes[j].y;
      if (dx * dx + dy * dy < max2) pairs.push([nodes[i], nodes[j]]);
    }
    if (pairs.length) {
      var p = pairs[(Math.random() * pairs.length) | 0];
      packets.push({ a: p[0], b: p[1], t0: now });
    }
  }

  function frame(ts) {
    raf = requestAnimationFrame(frame);
    if (window.innerWidth < 680 && last && ts - last < 29) return; // ~30fps no mobile
    var k = last ? Math.min(ts - last, 50) / 16.667 : 1;
    last = ts;
    nodes.forEach(function (n) {
      n.x += n.vx * k; n.y += n.vy * k;
      if (n.x < 0) { n.x = 0; n.vx = -n.vx; } else if (n.x > w) { n.x = w; n.vx = -n.vx; }
      if (n.y < 0) { n.y = 0; n.vy = -n.vy; } else if (n.y > h) { n.y = h; n.vy = -n.vy; }
    });
    if (ts >= nextPkt) {
      if (packets.length < 3) spawnPacket(ts);
      nextPkt = ts + rnd(1200, 2400);
    }
    draw(ts);
  }

  // liga/desliga o loop conforme modo, viewport e aba visível
  function sync() {
    var run = !isStatic() && visible && !document.hidden;
    if (run && !raf) { last = 0; packets = []; nextPkt = 0; raf = requestAnimationFrame(frame); }
    else if (!run && raf) { cancelAnimationFrame(raf); raf = 0; }
    if (!raf && w) draw(0);
  }

  function init() {
    resize();
    if (window.ResizeObserver) new ResizeObserver(function () { resize(); }).observe(host);
    else window.addEventListener('resize', resize);
    if (window.IntersectionObserver) {
      new IntersectionObserver(function (e) { visible = e[0].isIntersecting; sync(); }).observe(host);
    }
    document.addEventListener('visibilitychange', sync);
    (mq.addEventListener ? mq.addEventListener('change', sync) : mq.addListener(sync));
    sync();
  }

  function start() {
    if (window.requestIdleCallback) requestIdleCallback(init); else setTimeout(init, 200);
  }
  if (document.readyState === 'complete') start(); else window.addEventListener('load', start);
})();
