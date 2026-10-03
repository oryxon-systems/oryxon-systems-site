---
name: sync-shared
description: Propaga um bloco compartilhado (nav-shell, footer, :root) de uma página de origem para todas as outras páginas que o contêm. Use quando o usuário pedir /sync-shared.
disable-model-invocation: true
argument-hint: <bloco> [arquivo-origem, padrão index.html]
---

# sync-shared

Argumentos: `$ARGUMENTS` = bloco (ex.: `nav-shell`, `footer`, `:root`) e opcionalmente o arquivo de origem (padrão `index.html`).

Siga estes passos nesta ordem. Não faça push nem deploy.

1. **Pré-condição.** Rode `git status --porcelain`. Se houver qualquer saída, ABORTE sem escrever nada e responda exatamente: "Árvore suja: comite primeiro a mudança no arquivo de origem e rode de novo."
2. **Arquivos afetados.** `grep -rl --include='*.html' "<marcador>" . --exclude-dir={.git,_backup,_incoming}` (marcador: `nav-shell` para o header, o equivalente para footer ou `:root`). Liste os arquivos e a contagem N, excluindo a origem. Se N = 0, pare.
3. **Extrair o bloco** da origem (trecho exato do elemento, ou do bloco `:root { ... }`). Mostre-o ao usuário. Se o bloco da origem não for claramente delimitável, pare e pergunte.
4. **Amostra.** Aplique a substituição em UM arquivo de amostra e mostre `git diff` desse arquivo. Atenção a diferenças legítimas por página (link ativo, caminhos relativos em `blog/`, `cases/`, `ti-*/`): preserve-as e sinalize.
5. **Confirmação.** Pergunte (AskUserQuestion) se pode aplicar nos demais N-1 arquivos. Sem confirmação explícita, reverta a amostra com `git checkout -- <arquivo>` e pare.
6. **Aplicar** nos demais. Confira com `git diff --stat` que só os arquivos listados mudaram.
7. **Commit único:** `chore: sync <bloco> em N páginas`, com a linha Co-Authored-By padrão. Não faça push.
8. Reporte N, arquivos pulados e qualquer divergência encontrada.
