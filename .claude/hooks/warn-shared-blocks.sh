#!/usr/bin/env bash
# PostToolUse (Edit|Write|MultiEdit): avisa quando um .html editado toca blocos compartilhados.
# Nunca bloqueia: sempre exit 0.
in=$(cat)
f=$(jq -r '.tool_input.file_path // empty' <<<"$in")
[[ "$f" == *.html ]] || exit 0
txt=$(jq -r '[.tool_input.content, .tool_input.new_string, (.tool_input.edits[]?.new_string)] | map(select(. != null)) | join("\n")' <<<"$in")
blocks=()
grep -q 'nav-shell' <<<"$txt" && blocks+=("nav-shell")
grep -q ':root' <<<"$txt" && blocks+=(":root")
[ ${#blocks[@]} -eq 0 ] && exit 0
msg="Bloco compartilhado editado — rode .claude/skills/sync-shared/group.sh <bloco> para ver as páginas do mesmo grupo."
jq -n --arg m "$msg" '{hookSpecificOutput:{hookEventName:"PostToolUse",additionalContext:$m}}'
exit 0
