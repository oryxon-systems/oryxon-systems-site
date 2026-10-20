# SECURITY — Oryxon Systems Site

Última atualização: 2026-10-19
Propósito: política de segurança do site (nível de política; o repositório é público).

## Headers (vercel.json)

Aplicados a todas as rotas: `X-Content-Type-Options: nosniff`; `X-Frame-Options: DENY`; `Referrer-Policy: strict-origin-when-cross-origin`; `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()`; `Content-Security-Policy-Report-Only` (abaixo); `Speculation-Rules`. Assets estáticos recebem cache imutável de 1 ano.

## CSP

**Status: Report-Only** (introduzida no commit `f0195e4`). Ativação em modo enforce pendente de validação de console e GA4 (TASK.md). Política atual: `default-src 'self'`; scripts `'self'`, `'unsafe-inline'` e `googletagmanager.com`; estilos `'self'` e `'unsafe-inline'`; fontes `'self'`; imagens e conexões `'self'` + domínios Google Analytics/Tag Manager; `frame-ancestors 'none'`; `object-src 'none'`; `base-uri 'self'`; `form-action 'self'`; `upgrade-insecure-requests`. Valor exato em `vercel.json`.

## Recursos de terceiros

- Permitidos: Google Tag Manager/GA4, somente após consentimento e somente via `assets/js/consent.v1.js`.
- Fontes e scripts próprios, sem CDN de fontes ou ícones.
- Novo script ou recurso de terceiro exige: justificativa, atualização desta seção e da CSP, e ADR.
- Links de saída usam `rel="noopener"` quando abrem em nova aba.

## Dados pessoais

- Formulários não enviam dados a servidor próprio: validam no navegador e abrem o WhatsApp com a mensagem. O envio ocorre no aplicativo do titular.
- Banner de consentimento (LGPD): escolha guardada apenas em `localStorage['oryxon_consent']`; sem escolha, nada é enviado ao Google. Política de cookies e retenção em `privacidade.html`.
- Páginas de privacidade e termos não carregam GA (`data-ga="off"`).
- Não coletar dados além do necessário ao contato comercial.

## Checklist pré-deploy

- [ ] Nenhum segredo, token, ID de projeto ou relatório de auditoria no diff.
- [ ] `.gitignore`/`.vercelignore` cobrem `.env*`, `.vercel`, `audit-output/`, `RELATORIO-SEGURANCA*.md`.
- [ ] Nenhum script de terceiro novo fora do `consent.v1.js`.
- [ ] Console sem erros e sem violações de CSP relevantes (Report-Only).
- [ ] `generate_lead` só dispara após aceite.
- [ ] Links externos com `rel="noopener"`.
- [ ] `sitemap.xml` e `llms.txt` coerentes com as mudanças.

## Reporte de vulnerabilidade

Envie para **suporte@oryxonsystems.com.br**, com descrição e passos para reproduzir. Não divulgue publicamente antes do retorno. Prazo de resposta [A CONFIRMAR].

## Regra de conteúdo deste arquivo

Não registrar segredos, tokens, IDs do `.vercel`, IPs, detalhes de infraestrutura interna, achados de auditoria ou vulnerabilidades em aberto. Relatórios ficam fora do repositório.
