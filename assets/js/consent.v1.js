/*!
 * consent.v1.js — consentimento de cookies (LGPD) + carregamento condicional do Google Analytics 4.
 *
 * IMUTÁVEL: o vercel.json serve /assets/**.js com cache de 1 ano (immutable). Qualquer mudança
 * exige um novo arquivo versionado (consent.v2.js) e a troca do <script> nas 47 páginas.
 *
 * Modo básico do Consent Mode v2: antes do aceite explícito NENHUMA requisição é feita a
 * googletagmanager.com / google-analytics.com. A escolha fica em localStorage['oryxon_consent'] como
 * JSON {"v":1,"choice":"accepted"|"declined","ts":"<ISO 8601>"}. Ausente, JSON inválido ou v != 1
 * = sem escolha (banner visível, nada do Google). A chave legada 'oryxon_cookies' é removida na
 * inicialização, sem migrar o valor (consentimento antigo não vale).
 *
 * Uso nas páginas:  <script src="/assets/js/consent.v1.js" defer></script>
 *   data-ga="off"           -> mostra banner/preferências, mas nunca carrega o GA (privacidade, termos).
 *   data-track-leads="on"   -> liga o evento generate_lead nesta página (fonte única da flag;
 *                              ausente = desligado). Só as páginas com formulário precisam dele.
 */
(function () {
  'use strict';

  var GA_ID = 'G-FXFSLJDCNW';
  var KEY = 'oryxon_consent';
  var LEGACY_KEY = 'oryxon_cookies';
  var VERSION = 1;
  var CSS_HREF = '/assets/css/consent.v1.css';
  var PRIVACY_HREF = '/privacidade.html#cookies';

  var script = document.currentScript || document.querySelector('script[src*="consent.v1.js"]');
  var gaAllowed = !(script && script.getAttribute('data-ga') === 'off');
  var leadsOn = !!(script && script.getAttribute('data-track-leads') === 'on');   // generate_lead: desligado por padrão

  var enabled = false;   // true = eventos podem ir para o dataLayer (só após aceite)
  var loaded = false;    // gtag.js já foi injetado nesta visualização
  var banner = null;
  var reopened = false;

  // ---------- storage ----------
  function getChoice() {
    try {
      var o = JSON.parse(localStorage.getItem(KEY));
      if (o && o.v === VERSION && (o.choice === 'accepted' || o.choice === 'declined')) { return o.choice; }
    } catch (e) { /* ausente, JSON inválido ou sem storage = sem escolha */ }
    return null;
  }
  function setChoice(v) {
    try { localStorage.setItem(KEY, JSON.stringify({ v: VERSION, choice: v, ts: new Date().toISOString() })); }
    catch (e) { /* sem storage: vale só nesta página */ }
  }
  function removeLegacy() { try { localStorage.removeItem(LEGACY_KEY); } catch (e) { /* ignora */ } }

  // ---------- gtag stub: descarta tudo até o aceite (não enfileira) ----------
  window.gtag = function () { if (enabled) { window.dataLayer.push(arguments); } };

  function g() { window.dataLayer.push(arguments); }

  // ---------- cookies do GA ----------
  function deleteGaCookies() {
    var names = [];
    document.cookie.split(';').forEach(function (c) {
      var n = c.split('=')[0].replace(/^\s+/, '');
      if (/^_ga($|_)/.test(n) || n === '_gid' || /^_gat/.test(n)) { names.push(n); }
    });
    if (!names.length) { return; }
    var host = location.hostname, parts = host.split('.'), domains = [null];
    for (var i = 0; i < parts.length - 1; i++) {
      var d = parts.slice(i).join('.');
      domains.push(d, '.' + d);
    }
    var past = 'expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0; path=/';
    names.forEach(function (n) {
      domains.forEach(function (d) {
        document.cookie = n + '=; ' + past + (d ? '; domain=' + d : '');
      });
    });
  }

  // ---------- GA4 ----------
  function whenActive(fn) {
    if (document.prerendering) { document.addEventListener('prerenderingchange', fn, { once: true }); }
    else { fn(); }
  }

  function enableGA() {
    if (!gaAllowed) { return; }
    window['ga-disable-' + GA_ID] = false;
    enabled = true;
    window.dataLayer = window.dataLayer || [];
    if (loaded) { g('consent', 'update', { analytics_storage: 'granted' }); return; }
    loaded = true;
    g('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied' });
    g('consent', 'update', { analytics_storage: 'granted' });
    g('js', new Date());
    g('config', GA_ID);
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
  }

  function disableGA() {
    if (loaded) { g('consent', 'update', { analytics_storage: 'denied' }); }
    enabled = false;
    window['ga-disable-' + GA_ID] = true;
    deleteGaCookies();
  }

  function apply(choice) {
    if (choice === 'accepted') { whenActive(enableGA); } else { disableGA(); }
  }

  // ---------- eventos (só com aceite) ----------
  window.oryxonTrack = function (name, params) {
    if (!enabled || getChoice() !== 'accepted') { return; }
    if (name === 'generate_lead' && !leadsOn) { return; }
    window.gtag('event', name, params || {});
  };

  // ---------- UI ----------
  function loadCss() {
    if (document.querySelector('link[href="' + CSS_HREF + '"]')) { return; }
    var l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = CSS_HREF;
    document.head.appendChild(l);
  }

  function buildBanner() {
    var el = document.createElement('div');
    el.id = 'oryxon-consent';
    el.className = 'oc-banner';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-labelledby', 'oc-title');
    el.setAttribute('aria-describedby', 'oc-desc');
    el.hidden = true;
    el.innerHTML =
      '<div class="oc-inner">' +
        '<div class="oc-text">' +
          '<strong id="oc-title">Cookies de análise</strong>' +
          '<p id="oc-desc">Usamos armazenamento essencial para o site funcionar. Com a sua autorização, também usamos cookies de análise (Google Analytics) para entender como o site é usado e melhorá-lo. Sem a autorização, o Google Analytics não é carregado. Você pode mudar de ideia a qualquer momento em “Preferências de cookies”, no rodapé. Saiba mais na <a href="' + PRIVACY_HREF + '">Política de Privacidade</a>.</p>' +
        '</div>' +
        '<div class="oc-actions">' +
          '<button type="button" class="oc-btn" data-oc="declined">Recusar</button>' +
          '<button type="button" class="oc-btn oc-btn-primary" data-oc="accepted">Aceitar</button>' +
        '</div>' +
      '</div>';
    el.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('[data-oc]') : null;
      if (!b) { return; }
      var choice = b.getAttribute('data-oc');
      setChoice(choice);
      apply(choice);
      hideBanner();
    });
    document.body.appendChild(el);
    return el;
  }

  function showBanner(fromUser) {
    loadCss();
    if (!banner) { banner = buildBanner(); }
    reopened = !!fromUser;
    banner.hidden = false;
    // força reflow para a transição de entrada
    void banner.offsetHeight;
    banner.classList.add('oc-visible');
    if (fromUser) {
      var first = banner.querySelector('.oc-btn');
      if (first) { first.focus(); }
    }
  }

  function hideBanner() {
    if (!banner) { return; }
    banner.classList.remove('oc-visible');
    banner.hidden = true;
    reopened = false;
  }

  function addPrefsLink() {
    var footer = document.querySelector('footer');
    if (!footer || footer.querySelector('.oc-prefs')) { return; }
    loadCss();
    var p = document.createElement('p');
    p.className = 'oc-prefs';
    p.innerHTML = '<button type="button" class="oc-prefs-btn" data-cookie-prefs>Preferências de cookies</button>';
    footer.appendChild(p);
  }

  document.addEventListener('click', function (e) {
    var t = e.target.closest ? e.target.closest('[data-cookie-prefs]') : null;
    if (!t) { return; }
    e.preventDefault();
    showBanner(true);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && reopened) { hideBanner(); }
  });

  // ---------- init ----------
  function init() {
    removeLegacy();
    var choice = getChoice();
    apply(choice);                 // sem escolha ou recusado: garante GA desligado e cookies antigos removidos
    addPrefsLink();
    if (!choice) { setTimeout(function () { showBanner(false); }, 300); }
  }

  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', init); }
  else { init(); }
})();
