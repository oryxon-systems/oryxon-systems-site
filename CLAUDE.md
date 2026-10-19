# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Static marketing website for Oryxon Systems, an IT managed services (MSP) provider based in Suzano, SP, Brazil. No build system, no package manager, no framework — plain HTML files with CSS and JS inlined in `<style>`/`<script>` tags in each page's `<head>`/end of `<body>`. Deployed as-is (static hosting).

## Commands

There is no build, lint, or test tooling in this repo (no `package.json`). To preview, open an HTML file directly in a browser or serve the directory with any static file server, e.g.:

```
python3 -m http.server 8000
```

## Architecture

**No templating, no shared includes.** Every page is a fully self-contained `.html` file: full `<style>` block, header/nav, footer, and `<script>` blocks are copy-pasted into each page. There is no shared CSS/JS asset anywhere in the repo (`find . -iname "*.css" -o -iname "*.js"` returns nothing outside inline tags). Consequences:

- Changing the header/nav, footer, or global design tokens (`:root` CSS variables in the `<style>` block) requires editing every page individually — a repo-wide `grep -rl "nav-shell"` shows which pages currently contain the shared header.
- Design tokens (`--bg`, `--panel`, `--border`, `--text`, `--blue`, `--cyan`, etc.) are redefined per-page at the top of each `<style>` block. Keep new pages visually consistent by copying these from an existing page (e.g. `index.html`) rather than inventing new values.
- JS behavior (mobile menu toggle, scroll-reveal `IntersectionObserver`, lead-form → WhatsApp handoff, animated counters, LGPD cookie banner) is duplicated per page where needed, not imported.

**Page categories:**
- Root pages: `index.html` (home), `sobre.html`, `solucoes.html`, `managed-services.html`, `ciberseguranca.html`, `lgpd.html`, `privacidade.html`, `termos.html`, `blog.html`.
- `blog/*.html` — individual blog posts.
- `cases/*.html` — customer case studies.
- City landing pages: `ti-suzano/`, `ti-mogi-das-cruzes/`, `ti-guarulhos/`, `ti-itaquaquecetuba/`, `ti-poa/`, `ti-ferraz-de-vasconcelos/` — each `index.html`, same template/design system as the homepage with city-specific copy, title, meta description, and JSON-LD (local SEO pages targeting the Alto Tietê region).
- `diagnostico/`, `suporte/` — single-purpose landing pages (free diagnostic funnel, remote support).

**Lead capture flow:** Forms don't POST to a backend — `sendLeadToWhatsApp()` / `sendHeroLead()` (inline JS per page) validate fields client-side, build a formatted message, and open `https://wa.me/5511934932992?text=...` (WhatsApp) in a new tab. Any new lead form should follow this same pattern rather than adding a backend dependency.

**SEO/structured data:**
- Pages carry `application/ld+json` (LocalBusiness/schema.org) blocks — check `sitemap.xml` and update it (with `lastmod`) whenever adding or changing a page's URL.
- `llms.txt` at the repo root is a hand-maintained AI-facing summary of the company (services, tech stack, service area, key pages) per the llmstxt.org convention — update it if company facts, services, or key page URLs change.
- `robots.txt` points to `sitemap.xml`.
- **Cookie consent (LGPD):** `assets/js/consent.v1.js` (+ `assets/css/consent.v1.css`) owns the banner, the consent choice and the conditional load of GA4. The choice lives in `localStorage['oryxon_consent']` as JSON `{"v":1,"choice":"accepted"|"declined","ts":"<ISO 8601>"}` (missing, invalid or `v != 1` = no choice → banner, nothing from Google); the legacy `oryxon_cookies` key is deleted on init without migrating it. It is **immutable** (`vercel.json` caches `/assets/**.js|css` for 1 year): any change needs a new versioned file (`consent.v2.js`/`.css`) and swapping the `<script>` on all 47 pages — never edit `v1` in place. Pages must not load gtag directly. The `generate_lead` event is off by default and enabled per page only with `data-track-leads="on"` on the consent `<script>` (single source; no flag inside the file). `data-ga="off"` keeps the banner but never loads GA (privacy/terms pages).

**Business context** (useful when writing/editing copy): Oryxon Systems is an MSP partnered with Help Digital, serving Suzano, Mogi das Cruzes, Itaquaquecetuba, Poá, Ferraz de Vasconcelos, Guararema, and Santa Isabel (Alto Tietê region, SP). Core stack referenced in marketing copy: NinjaOne (RMM), Action1 (patch management), Acronis Cyber Protect (backup), Bitdefender (security), PWS Cloud, Help Mail, Ansible/Python (automation). Primary CTA across the site is WhatsApp contact (+55 11 93493-2992) and the "diagnóstico gratuito" (free diagnostic) lead form.
