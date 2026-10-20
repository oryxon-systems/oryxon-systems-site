# TASK — Oryxon Systems Site

Última atualização: 2026-10-19
Propósito: acompanhar o que está em andamento, o backlog, as verificações pendentes e o que foi concluído.

Formato: `- [ ] AAAA-MM-DD — descrição — arquivo(s)`.

## Em andamento

- [ ] 2026-10-19 — Documentação-base e mecanismo de manutenção (PRD, ARCHITECTURE, RULES, DESIGN, TASK, SECURITY, DECISIONS, CLAUDE.md) — raiz

## Backlog

- [ ] 2026-10-19 — Ativar CSP em modo enforce após validar console e GA4 — `vercel.json`
- [ ] 2026-10-19 — Ferramenta de autoavaliação de risco em `/avaliacao-de-risco/` (lead magnet → WhatsApp); a pasta não existe — nova página, `sitemap.xml`
- [ ] 2026-10-19 — Depoimentos com nome/cargo/empresa — `index.html`
- [ ] 2026-10-19 — Barra de logos de parceiros formalizada — `index.html`
- [ ] 2026-10-19 — Case GregTur com ROI financeiro (aguardando dados reais) — `cases/gregtur.html`
- [ ] 2026-10-19 — Revisão de linguagem — `sobre.html`, `managed-services.html`
- [ ] 2026-10-19 — Concluir consolidação das categorias do blog: 13 posts ainda usam sublabels "Categoria · X" — `blog/*.html`, `blog.html`
- [ ] 2026-10-19 — Catálogo digital (solicitado pelo Sebrae) — [A CONFIRMAR]
- [ ] 2026-10-19 — Melhorias de transição/fluidez após prefers-reduced-motion — todas as páginas

## Verificações pendentes (divergências contexto × repositório)

- [ ] 2026-10-19 — Tabler Icons (CDN, `ti ti-*`) não existe no repo; ícones são SVG inline. Confirmar se a migração foi planejada ou abandonada — `index.html`, ADR-004
- [ ] 2026-10-19 — Paleta real é `#1478ff`/`#00b7ff`/`#67e8ff`; `#0A4A8F` e `#00D9FF` não aparecem — `index.html:211`
- [ ] 2026-10-19 — CTA flutuante é verde `#25D366` (não ciano) e na home aparece após 400 px (não 300) — `index.html`
- [ ] 2026-10-19 — Categorias do blog já foram consolidadas em 5 (`8905fdd`); a descrição do backlog estava desatualizada
- [ ] 2026-10-19 — `/diagnostico/` é só redirect para `/#diagnostico`; não há pasta — `vercel.json`
- [ ] 2026-10-19 — "Help Digital TI" nunca deve aparecer; revisar ocorrências de "Help Digital" sem "São Paulo" no contexto de franquia — `*.html`
- [ ] 2026-10-19 — Schema.org usa `contato@oryxonsystems.com.br` além de `suporte@`; confirmar que ambos são válidos — `index.html`
- [ ] 2026-10-19 — Métricas de sucesso e prazo de resposta a reporte de vulnerabilidade não definidos — `PRD.md`, `SECURITY.md`
- [ ] 2026-10-19 — Datas dos ADR-002, 003, 007 não localizáveis no git

## Concluído

- [x] 2026-10-19 — CLAUDE.md: corrigidas afirmações desatualizadas (assets compartilhados, sede em Poá, `diagnostico/`, handlers de lead, Schema, Guarulhos) — `CLAUDE.md`, `ARCHITECTURE.md`
- [x] 2026-10-19 — Docs de projeto da raiz adicionados ao `.vercelignore` (ADR-010) — `.vercelignore`, `ARCHITECTURE.md`, `DECISIONS.md`
- [x] 2026-10-19 — SEO-02: links do pilar, ti-*, home e posts (lotes A, B, C) — `4fc3d81`, `214ae64`, `7b0003d`
- [x] 2026-10-19 — SEO-03: Schema.org e breadcrumbs (fases 1 e 2) — `cf84f1b`, `94e3327`, `6e68fcf`, `9b4900a`
- [x] 2026-10-19 — SEO-13: Guarulhos como área atendida e card Remoto — `9838749`
- [x] 2026-10-19 — CONT-01/CONT-02: promessas de cobertura e SLA real — `0154d7d`, `c33b69e`
- [x] 2026-10-19 — SEO-01: H1, titles e metas dos hubs; SEO-20: redirect 308 de pastas — `1bfbc68`, `07e1a03`
- [x] 2026-10-19 — LGPD-01: consentimento v1 e `generate_lead` — `0ef37c2` a `5fe3dad`
- [x] 2026-10 — MOB-01/02/03: overflow, banner e cabeçalho — `20dfdb5`, `09c445a`, `8c1459c`
- [x] 2026-10 — SEO-04/SEO-11: sede única, parceria Help Digital São Paulo, remoção de alegações não comprovadas — `b31b729`, `9c37aaa`
- [x] 2026-10 — Rede animada no hero, view transitions, speculation rules — `2a8dac1`, `0e00c6d`, `3ada878`
- [x] 2026-09-30 — prefers-reduced-motion (lotes 1 e 2) — `4691900`, `a87a84f`
- [x] 2026-09-28 — Central de Suporte com GLPI — `ac046de`
- [x] 2026-09-27 — Inter auto-hospedada e headers de segurança, CSP Report-Only — `f0195e4`
- [x] 2026-09-21 — Taxonomia do blog em 5 categorias — `8905fdd`
- [x] 2026-05-10 — Commit inicial do site
