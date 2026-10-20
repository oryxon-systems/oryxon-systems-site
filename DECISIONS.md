# DECISIONS — Oryxon Systems Site

Última atualização: 2026-10-19
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
