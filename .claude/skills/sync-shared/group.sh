#!/usr/bin/env bash
# Agrupa páginas .html versionadas por variante exata de um bloco compartilhado.
#   group.sh <header|footer|root> [rev]
#       tabela: grupo (sha256 do bloco com whitespace normalizado) -> nº de páginas -> arquivos.
#       rev (opcional): lê os arquivos desse commit em vez da árvore de trabalho.
#   group.sh --apply <bloco> <origem> <base> [arquivo...]
#       antigo = bloco de <base>:<origem>; novo = bloco atual de <origem>.
#       Em cada alvo (padrão: grupo da origem em <base>, menos a origem) troca antigo -> novo
#       só se o bloco atual for idêntico (string exata) ao antigo; senão pula e lista.
cd "$(git rev-parse --show-toplevel)" || exit 1
exec python3 - "$@" <<'PY'
import re, sys, subprocess, hashlib, collections
RX = {
  "header": r'<header class="nav-shell".*?</header>',
  "footer": r'<footer\b.*?</footer>',
  "root":   r':root\s*\{[^}]*\}',
}
def die(m): sys.exit(m)
def read(f, rev=None):
    if rev: return subprocess.check_output(["git", "show", f"{rev}:{f}"], text=True)
    return open(f, encoding="utf-8").read()
def block(txt, b):
    m = re.search(RX[b], txt, re.S)
    return m.group(0) if m else None
def sha(s): return hashlib.sha256(" ".join(s.split()).encode()).hexdigest()[:10]
def files(): return sorted(subprocess.check_output(["git", "ls-files", "*.html"], text=True).split())
def groups(b, rev=None):
    g, none = collections.defaultdict(list), []
    for f in files():
        try: blk = block(read(f, rev), b)
        except subprocess.CalledProcessError: continue
        (g[sha(blk)] if blk else none).append(f)
    return g, none

a = sys.argv[1:]
if a and a[0] == "--apply":
    if len(a) < 4 or a[1] not in RX: die("uso: group.sh --apply <header|footer|root> <origem> <base> [arquivo...]")
    b, src, base, targets = a[1], a[2], a[3], a[4:]
    old, new = block(read(src, base), b), block(read(src), b)
    if not old or not new: die(f"bloco {b} não encontrado em {src}")
    if old == new: die("bloco antigo e novo são idênticos; nada a fazer")
    if not targets:
        g, _ = groups(b, base)
        targets = [f for f in g[sha(old)] if f != src]
    done, skipped = [], []
    for f in targets:
        s = read(f)
        if s.count(old) == 1:
            open(f, "w", encoding="utf-8").write(s.replace(old, new)); done.append(f)
        else: skipped.append(f)
    print(f"aplicado em {len(done)}: " + " ".join(done))
    print(f"pulado (sem match exato) {len(skipped)}: " + " ".join(skipped))
    sys.exit(0)

if not a or a[0] not in RX: die("uso: group.sh <header|footer|root> [rev]")
g, none = groups(a[0], a[1] if len(a) > 1 else None)
print(f"bloco: {a[0]}   variantes: {len(g)}   páginas sem o bloco: {len(none)}")
print(f"{'GRUPO':<12}{'PÁGINAS':<9}ARQUIVOS")
for h, fs in sorted(g.items(), key=lambda x: -len(x[1])):
    print(f"{h:<12}{len(fs):<9}{' '.join(fs)}")
if none: print(f"{'(sem bloco)':<12}{len(none):<9}{' '.join(none)}")
PY
