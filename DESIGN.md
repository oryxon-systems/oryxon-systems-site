# DESIGN — Oryxon Systems Site

Última atualização: 2026-10-21
Propósito: registrar os tokens e padrões visuais reais do site (fonte: `index.html`, bloco `:root`, linha 211).

## Paleta (valores do CSS)

| Token | Valor |
|---|---|
| `--bg` | `#020713` |
| `--panel` | `rgba(8,21,43,.78)` |
| `--border` | `rgba(93,176,255,.22)` |
| `--text` | `#f7fbff` |
| `--muted` / `--muted2` | `#a9bad1` / `#71839d` |
| `--blue` / `--blue2` | `#1478ff` / `#00b7ff` |
| `--cyan` | `#67e8ff` |
| `--success` | `#37f5a1` |
| `--max` | `1180px` |
| `--radius-sm/md/lg/pill/full` | `6 / 10 / 14px / 999px / 50%` (`assets/css/tokens.v2.css`, ADR-013) |
| `--shadow-sm/md/lg` | sombras neutras, blur ≤16px (hover de card = borda ciano .35 + fundo mais claro, não sombra) |
| `--focus-ring` | `2px solid var(--cyan)`, `outline-offset:2px` |
| `--gradient-brand` | `linear-gradient(135deg,#67e8ff,#1478ff)` (único gradiente; fundos radiais de página mantidos) |
| Exceções de marca de parceiro | `--brand-helpdigital:#ec6824` (+ `-bg`, `-border`, `-border-hover`, `tokens.v2.css`) no selo Help Digital, `--brand-ace:#44cc88` e `--brand-bni:#ff6666` (cards de associações em `sobre.html`, classes `.partner-card/.partner-ace/.partner-bni`), e `#25D366` no CTA flutuante do WhatsApp. Cores de terceiros, fora da paleta Oryxon. |
| Exceção de marca (logotipo) | Gradiente do `.brand-wordmark span`: `linear-gradient(135deg,#fff 20%,#9df7ff 55%,#00b7ff 100%)` no texto "ORYXON" do header. É o logotipo, não o `--gradient-brand`; fica fora do token e não deve ser migrado. |
| Botões | `.btn` + `.btn-primary` / `.btn-secondary` / `.btn-ghost`, tamanho `.btn-sm` (min 44px) |

Fundo: gradientes radiais azul/ciano sobre degradê escuro, mais grade sutil em `body:before`. Tema único escuro. Os valores `#0A4A8F` e `#00D9FF` do contexto **não** existem no CSS (ver TASK.md). Tokens são redefinidos por página; copiar de `index.html`.

## Tipografia

Inter variável (100–900), auto-hospedada: `assets/fonts/inter.css`, `font-display: swap`. Fallback `system-ui, sans-serif`. Destaque em títulos com `<span class="grad">`.

## Ícones

Tabler Icons (outline, MIT) via sprite SVG: `assets/icons/sprite.v1.svg` (127 símbolos, ADR-017). Uso: `<svg class="ti" aria-hidden="true" focusable="false"><use href="/assets/icons/sprite.v1.svg#nome"/></svg>`; `.ti` (1em, `currentColor`) e `.dot` (semáforo, sempre com rótulo de texto) em `tokens.v3.css`. Tamanho e cor por `font-size`/`color` do elemento pai (cards: `var(--blue2)`). Ícone só-ícone: `aria-label` no pai interativo. Sprite imutável: ícone novo = `sprite.v2.svg`. Migração em andamento (Fase 2): `index.html` migrada; demais páginas ainda com SVG inline/emoji. Blog: emoji em `.post-thumb` (intencional).

## Componentes

- **Header** `.nav-shell` (com `.nav-badge` e botão `.menu-diag`; ocultos entre 981–1210 px / `.nav-badge` ≤400 px) e menu mobile `#mobileToggle`.
- **CTA flutuante WhatsApp** `.floating-whatsapp`: pill verde `#25D366`, texto escuro, fixo no canto inferior direito; em mobile ocupa a largura (`left:14px;right:14px`). Na home, a exibição depende do scroll (>400 px) e some perto do formulário [A CONFIRMAR: gatilho nas demais páginas].
- **Mini-form do hero** `.hero-mini-form` (`sendHeroLead`): nome, empresa, telefone → WhatsApp.
- **Cards**: `.card`, grids de serviço/risco/cidade (1 coluna em mobile).
- **Contadores** `.counter[data-target]` com `data-prefix`/`data-suffix`.
- **Texto rotativo** no hero (`.hero-rotator`).
- **Painel "Prazos de atendimento"** (`.hero-visual`, `.sla-row`): único card com os 3 prazos de SLA (RULES.md). Sem dado ao vivo, sem animação.
- **`.metrics` (home):** 4 métricas — "40+ Endpoints gerenciados", "<15min Confirmação do chamado", "7+ Clientes ativos" (clientes, não cidades) e "24x7 Monitoramento automatizado" (RMM, sem promessa de atendimento humano).
- **Banner de cookies**: `consent.v1.css`.
- **Reveal** `.js .reveal` / `.visible`.

## Breakpoints reais

`980/981–1210`, `900`, `680`, `640`, `600`, `480`, `400`, `360` px (max-width, exceto onde indicado). Mais usados: 900 (37 ocorrências), 600 e 480. Foco de correções: 320–480 px.

## Movimento e acessibilidade

- `prefers-reduced-motion: reduce` zera animações/transições e desativa `.reveal`; `no-preference` habilita `scroll-behavior:smooth` e view transitions (`@view-transition`, `.nav-shell` e `.floating-whatsapp` com nomes próprios).
- Reveal depende da classe `js` no `<html>`.
- Revisão de a11y: agente `a11y-reviewer`.

## Convenções de blog

- Listagem (`blog.html`): `.post-cat` + `.post-thumb` com emoji. Post: `.article-cat`.
- Taxonomia fixa de 5 categorias (commit `8905fdd`): Cibersegurança, Gestão de TI, Nuvem & Infraestrutura, Inteligência Artificial & Automação, Tendências & Mercado.
- Alguns posts ainda usam sublabels "Categoria · X" (ver TASK.md).
