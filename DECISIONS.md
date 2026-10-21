# DECISIONS — Oryxon Systems Site

Última atualização: 2026-10-21
Propósito: registro de decisões técnicas e editoriais (ADR). Novas decisões entram no fim, com número sequencial.

Formato: ADR-NNN | Data | Status | Contexto | Decisão | Consequências.

---

**ADR-001 | 2026-05-10 | Aceito**
Contexto: site institucional pequeno, equipe de uma pessoa.
Decisão: site estático em HTML/CSS/JS, sem build nem framework. Data = commit inicial.
Consequências: deploy trivial e sem dependências; blocos compartilhados (header, footer, `:root`) duplicados por página, exigindo `sync-shared`.

**ADR-002 | [A CONFIRMAR] | Aceito**
Contexto: necessidade de deploy simples e controle humano.
Decisão: deploy pela Vercel Git Integration na `main`; commit, push e deploy são exclusivos do Uedson; Claude Code não executa Git de escrita nem Vercel.
Consequências: toda mudança passa por revisão de diff antes de ir ao ar.

**ADR-003 | [A CONFIRMAR] | Aceito**
Contexto: erro de deploy na Vercel.
Decisão: remover a chave `directory` de `.vercel/repo.json`.
Consequências: deploy corrigido; a chave não deve voltar. (O arquivo é ignorado pelo Git; a data não é localizável no histórico.)

**ADR-004 | [A CONFIRMAR] | Divergente do repositório**
Contexto: substituir emojis por ícones, exceto em `.post-thumb`.
Decisão registrada: Tabler Icons via CDN. No repositório, os ícones são SVG inline e não há referência a Tabler.
Consequências: manter emojis em `.post-thumb`; confirmar a decisão real (TASK.md).

**ADR-005 | 2026-09-27 | Aceito**
Contexto: webfont bloqueante e privacidade (commit `f0195e4`; `88f7eca` removeu a fonte bloqueante em 2026-09-16).
Decisão: Inter variável auto-hospedada em `assets/fonts/`; Google Fonts removido.
Consequências: sem requisição a terceiros por fonte; `font-src 'self'` na CSP.

**ADR-006 | 2026-09-27 | Aceito**
Contexto: introduzir CSP sem quebrar GA4 e páginas inline (`f0195e4`).
Decisão: CSP primeiro em `Report-Only`.
Consequências: sem bloqueio em produção; enforce depende de validar console e GA4. `'unsafe-inline'` ainda necessário por CSS/JS inline.

**ADR-007 | [A CONFIRMAR] | Aceito**
Contexto: relatórios de auditoria contêm achados sensíveis e o repositório é público.
Decisão: auditorias ficam fora do repo; `.gitignore` bloqueia `audit-output/` e `RELATORIO-SEGURANCA*.md`.
Consequências: achados não são versionados; SECURITY.md fica em nível de política.

**ADR-008 | 2026-10-19 (ativação `5fe3dad`) | Aceito**
Contexto: medir leads com respeito à LGPD (`0ef37c2` a `5fe3dad`).
Decisão: GA4 com `generate_lead` como conversão primária, carregado por `consent.v1.js` com Consent Mode v2 básico; evento ativado por página (`data-track-leads="on"`).
Consequências: sem consentimento não há dados; `consent.v1.*` é imutável (mudança = `v2`).

**ADR-009 | 2026-09-21 | Aceito**
Contexto: categorias do blog dispersas (`8905fdd`).
Decisão: taxonomia fixa de 5 categorias.
Consequências: persistem sublabels "Categoria · X" em alguns posts (TASK.md).

**ADR-010 | 2026-10-19 | Aceito**
Contexto: o repositório tem docs de projeto na raiz (PRD, ARCHITECTURE, RULES, DESIGN, TASK, SECURITY, DECISIONS) que, sem exclusão, seriam servidos pela Vercel (ex.: `/TASK.md`).
Decisão: docs de projeto fora do deploy; entradas `/PRD.md`, `/ARCHITECTURE.md`, `/RULES.md`, `/DESIGN.md`, `/TASK.md`, `/SECURITY.md`, `/DECISIONS.md`, `/CLAUDE.md` e `/README.md` no `.vercelignore`. Alternativa descartada: publicar os docs.
Consequências: documentos ficam só no repositório; todo novo doc de projeto na raiz precisa entrar no `.vercelignore`.

**ADR-011 | 2026-10-19 | Aceito**
Contexto: a CSP estava em Report-Only desde `f0195e4`; o site não carrega recurso externo além do GA4 (via `consent.v1.js`) e nenhum `<form>` tem `action`.
Decisão: CSP em enforce (`Content-Security-Policy`) mantendo `'unsafe-inline'` em `script-src` e `style-src` por ora. Alternativa descartada: aguardar a remoção do `'unsafe-inline'` (exige mover todo CSS/JS inline para arquivos).
Consequências: proteção de origem (scripts, estilos, fontes, imagens, frames, `object`, `base`, `form-action`) ativa agora, mas sem proteção contra XSS inline até a etapa 3 (TASK.md).

**ADR-012 | 2026-10-20 | Aceito**
Contexto: novo serviço "Auditoria de Apps Criados com IA", em formato de programa piloto, sem preços definidos.
Decisão: página própria em `/auditoria-apps-ia/` com formulário → WhatsApp e `generate_lead` (`service: auditoria_apps_ia`); dados de mercado só de fontes linkadas e conferidas (Veracode, Tecnoblog/RedAccess, NVD). Da CVE-2025-48757 cita-se a descrição e a contestação do fornecedor, sem números de severidade. Posicionamento "não é pentest": exploração aprofundada com parceiro. JS do formulário inline com `addEventListener` e sem `style=""` (não amplia a dívida do `'unsafe-inline'`, ADR-011). Alternativas descartadas: preços fictícios no lançamento; título com "Alto Tietê" (estoura 60 caracteres).
Consequências: preços pendentes (registrados só em TASK.md); a página é a 48ª URL do sitemap, com redirect da versão sem barra. Arujá ficou fora do `areaServed` por não constar no território de RULES.md (incluir exige alterar RULES.md).

**ADR-013 | 2026-10-20 | Aceito (piloto em `index.html`)**
Contexto: auditoria de 2026-10-20 achou 27 valores de border-radius, 129 declarações de sombra/glow e 9 famílias de botão com 45 `style=""`.
Decisão: `assets/css/tokens.v1.css` com radius (6/10/14/999/50%), sombras neutras (blur ≤16px), `--focus-ring`, único `--gradient-brand` e botões `.btn-primary/-secondary/-ghost` + `.btn-sm` (44px). Hover de card = borda ciano e fundo mais claro (sombra preta é invisível em `#020713`). Alternativas descartadas: mexer em `consent.v1.css` (imutável); remover os fundos radiais de página.
Consequências: demais 47 páginas migram em lotes por diretório após aprovação; até lá convivem dois sistemas. Painel Command Center e `.orb-large` (exceto glow) ficam para fase própria.

**ADR-013, adendo | 2026-10-20 | Versionamento**
`tokens.v1.css` foi alterado após o primeiro deploy (`94704ba`, `666529c`), e o cache imutável de 1 ano (`vercel.json`) pode manter a cópia antiga em clientes. Regra: arquivo publicado nunca é alterado; toda mudança = nova versão. `tokens.v2.css` = v1 + `.partner-card--row`, `.partner-link*`; as 9 páginas migradas apontam para ele. `tokens.v1.css` permanece no repositório, congelado, para HTML antigo em cache. Os componentes `.city-card` e `.stack-badge` ficam no `<style>` de `index.html` (uso único).

**ADR-014 | 2026-10-20 | Aceito**
Contexto: a auditoria (item 7) apontou o painel "Oryxon Command Center" (99,9% de disponibilidade, "Proteção ativa" com ponto pulsante), a esfera `.orb-large`/`.orb-glow` e o canvas de rede animada como visuais sem função e com dados sem fonte.
Decisão: o `.hero-visual` vira um único card "Prazos de atendimento" com os 3 prazos de SLA do RULES.md (confirmação automática em até 15 min; contato humano em até 2 h; plantão para incidentes críticos fora do horário), sem gráficos, percentuais ou animação. Removidos `.orb-*`, `@keyframes orb-*`, `.hero-net`, `.dash-*`, `.status`, o `<script>` do canvas e `assets/js/hero-network.v1.js` (apagado; nada o referenciava).
Alternativas descartadas: manter o canvas como textura (custo de rAF contínuo sem informação); manter o painel com dados reais de outra fonte (não há métrica medida de disponibilidade).
Consequências: menos JS e CSS no hero; `termos.html` mantinha a meta de 99,9% de uptime (resolvido no ADR-015).

**ADR-015 | 2026-10-21 | Aceito**
Contexto: `termos.html` (seção 4) prometia "meta de 99,9% de uptime"; os contratos reais não têm meta de disponibilidade medível.
Decisão: remover a meta; a seção passa a se chamar "Garantias e prazos de atendimento" e cita só os prazos reais (confirmação automática em até 15 min, contato de técnico em até 2 h, plantão para incidentes críticos). O aviso de exclusões passou a valer para os prazos de atendimento. Âncora `#garantias` mantida. Também: Arujá entra no território (Alto Tietê); "24x7" passa a ser rotulado "Monitoramento automatizado 24x7" (RMM, sem promessa de atendimento humano).
Alternativas descartadas: manter o 99,9% como "meta"; afirmar no texto que o contrato não tem meta (expõe a ausência sem necessidade).
Consequências: texto contratual alinhado à operação; `ti-aruja/` fica no backlog (Arujá é card sem link).

**ADR-016 | 2026-10-21 | Aceito**
Contexto: `index.html` tinha um `<p>` oculto (`position:absolute;width:1px;height:1px;opacity:0`) com lista de cidades e palavras-chave para crawlers.
Decisão: texto oculto para crawlers é proibido (política de spam do Google). SEO local apenas por Schema `areaServed`, grades de cidades visíveis, páginas `ti-*` e FAQ. O bloco foi removido; não havia outro no site.
Alternativas descartadas: manter o bloco (risco de penalidade por texto oculto/keyword stuffing).
Consequências: nenhuma perda de cobertura visível; as cidades continuam em Schema, grades e FAQ.

**ADR-017 | 2026-10-21 | Aceito (fecha o ADR-004)**
Contexto: o ADR-004 previa Tabler via CDN; o site usa 387 `<svg class="ti">` inline (90 desenhos, 345 com `style` repetido) e ainda tem ~469 emojis de UI.
Decisão: Tabler Icons (outline, MIT) via sprite SVG: `assets/icons/sprite.v1.svg` (ids = nome Tabler), uso `<svg class="ti" aria-hidden="true" focusable="false"><use href="/assets/icons/sprite.v1.svg#nome"/></svg>`. O sprite é imutável (cache de 1 ano): ícone novo = `sprite.v2.svg` e troca da referência em todas as páginas. Estilo `.ti` e `.dot` em `assets/css/tokens.v3.css` (v2 permanece no repositório; troca do `<link>` página a página, por lote). Semáforos viram `.dot` com rótulo de texto adjacente; `✓` tipográfico fica (`.check-list` na Fase 1b); `.post-thumb` mantém emojis.
Alternativas descartadas: CDN (script/estilo de terceiro, CSP); manter SVG inline (≈345 `style=""` repetidos); fonte de ícones.
Consequências: CSP inalterada (`default-src 'self'`); +~31 KB brutos (~7 KB gzip) em cache longo.
