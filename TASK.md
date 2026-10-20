# TASK — Oryxon Systems Site

Última atualização: 2026-10-20
Propósito: acompanhar o que está em andamento, o backlog, as verificações pendentes e o que foi concluído.

Formato: `- [ ] AAAA-MM-DD — descrição — arquivo(s)`.

## Em andamento

- [ ] 2026-10-19 — Documentação-base e mecanismo de manutenção (PRD, ARCHITECTURE, RULES, DESIGN, TASK, SECURITY, DECISIONS, CLAUDE.md) — raiz
- [ ] 2026-10-20 — Fase 1 tokens (`tokens.v2.css`): `index.html` e as 8 páginas da raiz migradas, aguardando revisão/commit. Lotes pendentes, nesta ordem: `ti-*/` (6), `blog/` (30 posts), `cases/`, `suporte/`, `auditoria-apps-ia/` — `assets/css/tokens.v2.css`
- [ ] 2026-10-20 — Fase 2 (emojis): os ~354 emojis de UI AINDA estão no site (29 arquivos); a exceção `.post-thumb` é a regra-alvo, não o estado atual. Depende de fechar o ADR-004 — vários

## Backlog

- [ ] 2026-10-20 — `.valor-tab` (`sobre.html`): trocar o estilo inline reescrito por `showValor()` por toggle de classe `.is-active` + `aria-selected` — `sobre.html`

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
- [ ] 2026-10-19 — Cache imutável (1 ano) em arquivos SEM versão no nome: `assets/fonts/inter.css`, `assets/fonts/inter-var.woff2`, `og-image.jpg`, `assets/*.webp` (logos, avatar). Trocar o conteúdo não chega a quem já tem cache — regex de cache em `vercel.json` (`/(.*)\.(js|css|webp|woff2|jpg|jpeg|png|svg)`); recomendação: renomear com versão (`inter.v1.css` etc.) ou limitar a regra a `*.v[0-9]*.*`
- [ ] 2026-10-19 — Remover `'unsafe-inline'` da CSP (etapa 3): `'unsafe-inline'` em `script-src` e `style-src` é obrigatório hoje (index.html: 190 `style=""`, 10 handlers `onsubmit=`/`onclick=`, JS inline na linha 688 e `<style>` inline). Nada é bloqueado com a política atual, mas ela não protege contra XSS; remover `'unsafe-inline'` exigiria mover tudo para arquivos e usar listeners — `vercel.json`, `index.html`
- [ ] 2026-10-20 — Definir os preços de Raio-X, Auditoria de Aplicação e Revalidação (a página diz "valor definido após triagem de escopo"; sem marcadores no HTML) — `auditoria-apps-ia/index.html`
- [ ] 2026-10-20 — Auditoria de apps IA: validar com o Uedson o escopo comercial (programa piloto, prazos, revisão de código mediante acesso ao repositório) antes de publicar — `auditoria-apps-ia/index.html`
- [ ] 2026-10-20 — Título da nova página sem "Alto Tietê" (limite de 60 caracteres: com a região daria 61); região está no H1, meta description e Schema — `auditoria-apps-ia/index.html`
- [ ] 2026-10-20 — Prompt pedia Tabler Icons (`ti ti-*`); a página não usa ícones (o repositório não tem Tabler, ver ADR-004) — `auditoria-apps-ia/index.html`

## Concluído

- [x] 2026-10-20 — Ajustes da página de auditoria: redirect sem barra, `llms.txt`, mapa de 48 URLs, comentário do `consent.v1.js` (47→48, só comentário), Arujá removida do Schema (decisão pendente do Uedson: incluir no território?) — `vercel.json`, `llms.txt`, `ARCHITECTURE.md`, `assets/js/consent.v1.js`, `auditoria-apps-ia/index.html`
- [x] 2026-10-20 — Página /auditoria-apps-ia/ criada (Service + FAQPage, formulário → WhatsApp, `generate_lead` com `service: auditoria_apps_ia`), card em soluções e URL no sitemap; fontes conferidas (Veracode, Tecnoblog, NVD CVE-2025-48757) — `auditoria-apps-ia/index.html`, `solucoes.html`, `sitemap.xml`
- [x] 2026-10-19 — CSP ativada em enforce com `'unsafe-inline'` temporário (ADR-011); validar pós-deploy — `vercel.json`, `SECURITY.md`, `DECISIONS.md`
- [x] 2026-10-19 — Verificação de cache e de CSS injetado pelo `consent.v1.js`: CSS externo via `<link>` (linhas 121-124), sem `style=`/`<style>`/eval/handlers inline no arquivo; nada bloqueado pela CSP atual em enforce — `assets/js/consent.v1.js`, `vercel.json`
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

## Fase 1b — tokens de cor (executar depois dos 3 lotes da Fase 1)

Inclui: centralizar `--red`/`--danger`/`--orange`/`--warn` (hoje definidos no `:root` de `ciberseguranca.html` e `lgpd.html`) em `tokens.v1.css`.

Inventário de hex literais fora de `:root` (medido em 2026-10-20, antes dos lotes; refazer ao iniciar). Escopo: criar tokens para #c8d7e9, #dff9ff, #001224, #bff6ff, #67e8ff etc. e trocar.

| Arquivo | Hex soltos | Mais frequentes |
|---|---|---|
| `auditoria-apps-ia/index.html` | 21 | #fff×6, #00b7ff×3, #9df7ff×2, #1478ff×2 |
| `blog.html` | 17 | #fff×4, #9df7ff×2, #00b7ff×2, #67e8ff×2 |
| `blog/agente-de-ia-acesso-just-in-time.html` | 56 | #67e8ff×12, #dff9ff×11, #1478ff×7, #001224×6 |
| `blog/agente-de-ia-protegido-limitado-auditavel.html` | 53 | #67e8ff×11, #dff9ff×10, #1478ff×7, #001224×6 |
| `blog/atualizar-computador-nao-basta-rede-tambem-precisa.html` | 48 | #dff9ff×9, #67e8ff×8, #1478ff×5, #001224×5 |
| `blog/backup-continuidade-ferraz-de-vasconcelos.html` | 42 | #dff9ff×11, #fff×5, #1478ff×5, #001224×5 |
| `blog/backup-nuvem-vs-local.html` | 44 | #dff9ff×11, #fff×5, #67e8ff×5, #1478ff×4 |
| `blog/chave-de-api-esquecida-vazamento-dados.html` | 49 | #67e8ff×9, #dff9ff×9, #fff×5, #1478ff×5 |
| `blog/ciberseguranca-itaquaquecetuba.html` | 42 | #dff9ff×11, #fff×5, #1478ff×5, #001224×5 |
| `blog/cisa-muda-priorizacao-vulnerabilidades-ssvc.html` | 56 | #67e8ff×12, #dff9ff×11, #1478ff×7, #001224×6 |
| `blog/custo-automacao-ia-nuvem-fora-de-controle.html` | 52 | #67e8ff×11, #dff9ff×10, #1478ff×6, #001224×5 |
| `blog/farsa-firewall-mfa-ataque-aitm.html` | 49 | #67e8ff×9, #dff9ff×9, #fff×5, #1478ff×5 |
| `blog/fraude-com-ia-imita-executivos-faturas-processo-financeiro.html` | 56 | #67e8ff×12, #dff9ff×11, #1478ff×7, #001224×6 |
| `blog/gestao-de-ti-e-estrategia.html` | 43 | #dff9ff×10, #fff×5, #67e8ff×4, #1478ff×4 |
| `blog/gestao-de-ti-guararema.html` | 42 | #dff9ff×11, #fff×5, #1478ff×5, #001224×5 |
| `blog/gestao-de-ti-suzano.html` | 42 | #dff9ff×11, #fff×5, #67e8ff×5, #1478ff×5 |
| `blog/ia-gestao-ti-pme.html` | 47 | #dff9ff×10, #67e8ff×9, #1478ff×5, #001224×5 |
| `blog/identidade-e-o-novo-perimetro.html` | 56 | #67e8ff×12, #dff9ff×11, #1478ff×7, #001224×6 |
| `blog/identidade-ia-infraestrutura-continuidade-avaliar-juntos.html` | 53 | #67e8ff×11, #dff9ff×10, #1478ff×7, #001224×6 |
| `blog/infraestrutura-de-ti-santa-isabel.html` | 42 | #dff9ff×11, #fff×5, #67e8ff×5, #1478ff×5 |
| `blog/nuvem-hibrida-governanca-recuperacao.html` | 56 | #67e8ff×12, #dff9ff×11, #1478ff×7, #001224×6 |
| `blog/nuvem-hibrida-sem-custos-fantasma.html` | 52 | #67e8ff×11, #dff9ff×10, #1478ff×6, #001224×5 |
| `blog/o-que-pmes-deveriam-exigir-do-provedor-de-ti.html` | 43 | #dff9ff×10, #fff×5, #67e8ff×4, #1478ff×4 |
| `blog/perguntas-cliente-grande-antes-renovar-contrato.html` | 52 | #67e8ff×10, #dff9ff×10, #1478ff×6, #001224×6 |
| `blog/ransomware-brasil-2026.html` | 44 | #dff9ff×10, #67e8ff×5, #1478ff×5, #001224×5 |
| `blog/seu-agente-de-ia-e-um-usuario-privilegiado.html` | 47 | #67e8ff×9, #dff9ff×9, #1478ff×5, #001224×5 |
| `blog/suporte-de-ti-poa-reativo-vs-gerenciado.html` | 42 | #dff9ff×11, #fff×5, #1478ff×5, #001224×5 |
| `blog/tendencias-ti-msp-2026.html` | 43 | #dff9ff×10, #fff×5, #67e8ff×5, #1478ff×4 |
| `blog/terceirizacao-de-ti-mogi-das-cruzes.html` | 42 | #dff9ff×11, #fff×5, #1478ff×5, #001224×5 |
| `blog/terceirizacao-de-ti.html` | 45 | #dff9ff×10, #fff×6, #67e8ff×6, #1478ff×4 |
| `blog/velocidade-de-maquina-tempo-de-reacao-pme.html` | 56 | #67e8ff×12, #dff9ff×11, #1478ff×7, #001224×6 |
| `blog/vulnerabilidade-critica-nao-e-prioridade-critica.html` | 56 | #67e8ff×12, #dff9ff×11, #1478ff×7, #001224×6 |
| `cases/gregtur.html` | 37 | #fff×4, #37f5a1×4, #dff9ff×4, #00b7ff×3 |
| `ciberseguranca.html` | 47 | #fff×7, #dff9ff×7, #67e8ff×5, #1478ff×5 |
| `index.html` | 101 | #fff×10, #c8d7e9×10, #dff9ff×8, #bff6ff×5 |
| `lgpd.html` | 55 | #dff9ff×9, #fff×7, #ff8888×7, #c8d7e9×5 |
| `managed-services.html` | 37 | #fff×9, #67e8ff×5, #1478ff×4, #00b7ff×3 |
| `privacidade.html` | 40 | #dff9ff×28, #fff×4, #01040d×1, #061226×1 |
| `sobre.html` | 99 | #37f5a1×32, #c8d7e9×30, #fff×6, #00b7ff×6 |
| `solucoes.html` | 50 | #fff×7, #9df7ff×3, #00b7ff×3, #67e8ff×3 |
| `suporte/index.html` | 27 | #fff×7, #001224×3, #00b7ff×2, #67e8ff×2 |
| `termos.html` | 33 | #dff9ff×20, #fff×4, #061226×2, #01040d×1 |
| `ti-ferraz-de-vasconcelos/index.html` | 29 | #dff9ff×8, #fff×6, #00b7ff×3, #9df7ff×2 |
| `ti-guarulhos/index.html` | 29 | #dff9ff×8, #fff×6, #00b7ff×3, #9df7ff×2 |
| `ti-itaquaquecetuba/index.html` | 29 | #dff9ff×8, #fff×6, #00b7ff×3, #9df7ff×2 |
| `ti-mogi-das-cruzes/index.html` | 29 | #dff9ff×8, #fff×6, #00b7ff×3, #9df7ff×2 |
| `ti-poa/index.html` | 29 | #dff9ff×8, #fff×6, #00b7ff×3, #9df7ff×2 |
| `ti-suzano/index.html` | 29 | #dff9ff×8, #fff×6, #00b7ff×3, #9df7ff×2 |
