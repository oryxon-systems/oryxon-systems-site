---
name: sync-shared
description: Propaga a mudança de um bloco compartilhado (header, footer, :root) da página de origem para as páginas do mesmo grupo (variante idêntica do bloco). Use quando o usuário pedir /sync-shared.
disable-model-invocation: true
argument-hint: <header|footer|root> [arquivo-origem, padrão index.html] [base, padrão HEAD~1]
---

# sync-shared

Argumentos: `$ARGUMENTS` = bloco (`header`, `footer` ou `root`), origem (padrão `index.html`) e base (commit anterior à edição da origem, padrão `HEAD~1`).

Os blocos NÃO são iguais em todas as páginas: o agrupamento é feito por `group.sh` (sha256 do bloco com whitespace normalizado), nunca por julgamento. A sync só toca páginas cujo bloco atual é idêntico, como string exata, ao bloco ANTIGO da origem. Não faça push nem deploy.

1. **Pré-condição.** Rode `git status --porcelain`. Se houver qualquer saída, ABORTE sem escrever nada e responda exatamente: "Árvore suja: comite primeiro a mudança no arquivo de origem e rode de novo."
2. **Grupo.** Rode `.claude/skills/sync-shared/group.sh <bloco> <base>` e mostre a tabela. A origem deve estar num grupo; os alvos são os outros arquivos desse grupo (lista = N). Se a origem não mudou entre base e HEAD, ou N = 0, pare.
3. **Amostra.** Rode `.claude/skills/sync-shared/group.sh --apply <bloco> <origem> <base> <1 arquivo do grupo>` e mostre `git diff` desse arquivo. Pule no relatório qualquer arquivo reportado como sem match exato.
4. **Confirmação.** Pergunte (AskUserQuestion) se pode aplicar nos demais alvos. Sem confirmação explícita, reverta com `git checkout -- .` e pare.
5. **Aplicar.** Rode `group.sh --apply <bloco> <origem> <base>` sem lista de arquivos (a amostra já aplicada vira "sem match" e é ignorada). Confirme com `git diff --stat` que só os arquivos do grupo mudaram.
6. **Commit único:** `chore: sync <bloco> em N páginas` (N = arquivos realmente alterados, incluindo a amostra), com a linha Co-Authored-By padrão. Não faça push.
7. **Relatório:** N alterados, arquivos pulados por falta de match exato, e os outros grupos que NÃO foram tocados (outras variantes do bloco continuam como estavam).
