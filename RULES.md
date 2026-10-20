# RULES — Oryxon Systems Site

Última atualização: 2026-10-19
Propósito: regras editoriais, técnicas e de workflow que valem para toda alteração no projeto.

## Editoriais

- Nenhum dado inventado. Estatística só com fonte nomeada.
- Nenhuma certificação que a Oryxon não possui. ISO 27001: "controles implementados internamente, sem certificação".
- Sem números de big tech aplicados a PME.
- Linguagem formal, alinhada à LGPD, sem informalidade.
- Parceiro: "Help Digital" (nunca "Help Digital TI"); a franquia é "Help Digital São Paulo". Não existe unidade Help Digital no Alto Tietê.
- Pentest é executado por parceiro.
- SLA: confirmação automática do chamado no GLPI em até 15 min; contato humano em até 2 h; plantão para incidentes críticos. Não prometer "24x7" além do que a operação entrega.
- Sede única: Rua Presidente Rodrigues Alves, 715 A, Jardim Santa Helena, Poá-SP, 08553-520. "Suzano" em SEO é território, não endereço; não alterar.
- Guarulhos é vizinha, não faz parte do Alto Tietê.
- Canais de chamado: `https://suporte.oryxonsystems.com.br/` e `suporte@oryxonsystems.com.br`.
- Emojis em `.post-thumb` do blog são intencionais; não trocar por ícones.
- Análise de concorrentes (Netcenter, HabiliSystem, Nexigen): só para extrair padrões, sem cópia.

## Técnicas

- Sem build, sem dependências. Cada página é autocontida (CSS/JS inline). Alterar header, footer ou `:root` exige editar todas as páginas do grupo (usar a skill `sync-shared`).
- Título: no máximo 60 caracteres, terminando em ` | Oryxon Systems`. Meta description: no máximo 155. Um único `<h1>`, que não repete o `<title>`.
- Ao criar/alterar URL: atualizar `sitemap.xml` (`lastmod`) e, se mudar fato da empresa, serviço ou página-chave, `llms.txt`.
- Consentimento: `assets/js/consent.v1.*` é imutável; mudança = `v2` e troca nas 47 páginas. Nunca carregar gtag direto.
- Formulário de lead: seguir o padrão WhatsApp (sem backend).
- Mobile-first: validar 320, 360 e 1280 px sem overflow horizontal. Respeitar `prefers-reduced-motion`.
- Não commitar segredos nem relatórios de auditoria (ficam fora do repo).

## Workflow

- Fluxo: `git pull` → Claude Code → Uedson revisa os diffs → Uedson faz commit/push.
- Uma melhoria por vez, com aprovação antes da próxima.
- **Proibido ao Claude Code:** `git add`, `git commit`, `git push`, `vercel`, `vercel --prod`.
- Escopo: alterar somente o que a tarefa pede.

## Padrão de prompt

1. **Passo 0 — Investigação** (ler arquivos, `git log`, `git status`) e resumo curto antes de escrever.
2. **Restrições factuais com fontes**: cada fato vem do repositório ou de contexto informado; o resto recebe `[A CONFIRMAR]`. Se o repositório contradisser o contexto, vale o repositório e a divergência vai para TASK.md.
3. **Restrições editoriais**: as regras acima.
4. **Proibição explícita** de comandos Git/Vercel.
5. **Saída esperada**: arquivos alterados, divergências, itens `[A CONFIRMAR]`.
