# ARCHITECTURE — Oryxon Systems Site

Última atualização: 2026-10-27
Propósito: descrever a stack, a estrutura de arquivos, as integrações e o fluxo de deploy.

## Stack

HTML/CSS/JS estáticos, sem build e sem gerenciador de pacotes. CSS e JS de cada página ficam inline (`<style>` no `<head>`, `<script>` no fim do `<body>`); não há templating nem includes. Hospedagem na Vercel com Git Integration na branch `main`. Repositório: `oryxon-systems/oryxon-systems-site` (público).

Compartilhados em `assets/` (uso): `js/consent.v1.js` (banner, consentimento, GA4; 48 páginas; injeta `css/consent.v1.css` sozinho), `fonts/inter.css` + `inter-var.woff2` (Inter; 48 páginas). Arquivos `*.v1.*` são imutáveis (cache de 1 ano); mudança = novo `v2` e troca em todas as páginas que o carregam (ver RULES.md). Tokens e botões: `css/tokens.v1.css (congelado), assets/css/tokens.v2.css` (ADR-013; migração em andamento, piloto: `index.html`).

## Árvore de diretórios (versionada)

```
/                      index, sobre, solucoes, managed-services, ciberseguranca,
                       lgpd, privacidade, termos, blog (.html)
blog/                  30 posts
cases/gregtur.html     case
suporte/index.html     central de suporte
auditoria-apps-ia/     serviço Auditoria de Apps Criados com IA (index.html)
ti-<cidade>/index.html suzano, mogi-das-cruzes, guarulhos, itaquaquecetuba, poa,
                       ferraz-de-vasconcelos
assets/                css/, js/, fonts/, icons/ (sprite.v1.svg), logos .webp, avatar .webp
.claude/               agentes (seo-checker, a11y-reviewer), hook, skill sync-shared
vercel.json  sitemap.xml  robots.txt  llms.txt  speculationrules.json
og-image.jpg  favicon.ico  codigo-de-conduta-oryxon.pdf  .mcp.json  .vercelignore
```

Ignorados (`.gitignore`): `.vercel`, `.env*`, `audit-output/`, `RELATORIO-SEGURANCA*.md`, `_incoming/`, `_backup/`, `.playwright-mcp/`.
Excluídos do deploy (`.vercelignore`): os mesmos mais `.claude/`, `CLAUDE.md`, `.mcp.json`. Os docs de projeto da raiz (PRD, ARCHITECTURE, RULES, DESIGN, TASK, SECURITY, DECISIONS, CLAUDE, README) também ficam fora do deploy (ADR-010).

## Mapa de páginas

O sitemap lista 48 URLs (`sitemap.xml`). Grupos: hubs da raiz (9 páginas), 30 posts, 6 cidades, case, suporte, `auditoria-apps-ia/` (serviço, programa piloto). `/diagnostico` e `/diagnostico/` redirecionam (301/308) para `/#diagnostico` (não há pasta `diagnostico/`). Pastas `ti-*` e `suporte` sem barra final redirecionam para a versão com barra.

## Assets

- Tokens: `assets/css/tokens.v4.css` (= v3 + cores, `.check-list`, utilitários; ADR-018). Páginas migram por lote da Fase 1b: `index.html` já usa v4; as demais seguem em `tokens.v3.css`. v2 e v3 permanecem no repositório (imutáveis).
- Ícones: `assets/icons/sprite.v1.svg` (127 símbolos, Tabler Icons 3.34.1 outline, licença MIT, © Paweł Kuna; ADR-017). Imutável; ícone novo = `sprite.v2.svg`. Estilo em `assets/css/tokens.v3.css` (`.ti`, `.dot`); as páginas migram do v2 para o v3 por lote (Fase 2).
- Fonte: Inter variável, auto-hospedada (`assets/fonts/inter.css`). Sem Google Fonts.
- Ícones: SVG inline nas páginas. **Não há Tabler Icons/CDN** no repositório (divergência, ver TASK.md).
- Imagens: logos e avatar em `.webp`, OG image em `og-image.jpg` (1200×630), favicon embutido como data URI + `favicon.ico`.

## vercel.json

- Redirects permanentes: diagnóstico → `/#diagnostico`; `/suporte` e `/ti-*` → com barra final.
- Redirects temporários (307, `permanent: false`, destino mutável) para páginas de agendamento do Google Agenda, com e sem barra final:
  - `/bni` → reuniões 1-a-1 do BNI.
  - `/agendar` → alias genérico de agendamento do diagnóstico de TI (perfil do Google Business, site).
  - `/diagnostico` não entra aqui: continua levando ao formulário da home (ADR-019).
- Redirect temporário (307) para o WhatsApp comercial, com e sem barra final: `/whatsapp` → `wa.me/5511934932992` com a mensagem "Vim pelo Instagram". É o primeiro link da bio do Instagram (exibe `oryxonsystems.com.br/whatsapp` no perfil em vez da URL crua do wa.me).
- Cache `public, max-age=31536000, immutable` para js, css, webp, woff2, jpg, jpeg, png, svg.
- Headers de segurança em todas as rotas: ver [SECURITY.md](SECURITY.md).
- Header `Speculation-Rules` apontando para `/speculationrules.json` (prerender `moderate`, exclui `target=_blank`, download, nofollow e âncoras).

## Analytics

GA4 `G-FXFSLJDCNW`, carregado apenas por `assets/js/consent.v1.js` após aceite (escolha em `localStorage['oryxon_consent']`). `generate_lead` habilitado por `data-track-leads="on"` (8 páginas). `data-ga="off"` em privacidade e termos (2 páginas). Nenhuma página carrega gtag diretamente.

## Integrações externas

- **WhatsApp** `wa.me/5511934932992`: destino de todos os formulários (`sendLeadToWhatsApp()` / `sendHeroLead()`) e CTAs.
- **GLPI** (portal de chamados) em `suporte.oryxonsystems.com.br`; e-mail `suporte@oryxonsystems.com.br`.
- **Suporte remoto**: a central de suporte cita AnyDesk e TeamViewer (`suporte/index.html`); o instalador do Action1 é enviado no chamado, não por download direto.
- **Google Tag Manager / GA4**: ver Analytics.
- Links de saída: Help Digital, BNI Alto Tietê, ACE Suzano, redes sociais, fabricantes citados.

## Fluxo de deploy

`git pull` → Claude Code altera → Uedson revisa os diffs → Uedson faz `commit` e `push` em `main` → a Vercel publica via Git Integration. O Claude Code nunca executa `git add/commit/push` nem `vercel`. `.vercel/repo.json` não deve conter a chave `directory` (ver ADR-003).
