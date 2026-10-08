#!/usr/bin/env bash
# Fase 1 — frequência de valores nos arquivos de estilo do projeto.
# Uso: bash audit-css.sh [diretório]   (padrão: src)
# Varre *.css, *.scss e *.module.css. Saída: contagem decrescente por propriedade.
set -euo pipefail
DIR="${1:-src}"
mapfile -t FILES < <(find "$DIR" -type f \( -name "*.css" -o -name "*.scss" \) -not -path "*/node_modules/*")
if [ "${#FILES[@]}" -eq 0 ]; then echo "Nenhum CSS em $DIR"; exit 1; fi
echo "Arquivos: ${#FILES[@]}  ($(cat "${FILES[@]}" | wc -l) linhas)"
count() { echo; echo "== $1"; grep -hoE "$2" "${FILES[@]}" | sed 's/[[:space:]]\+/ /g' | sort | uniq -c | sort -rn | head -"${3:-40}"; }
count "font-size"       "font-size:[^;]*"
count "font-weight"     "font-weight:[^;]*"
count "letter-spacing"  "letter-spacing:[^;]*"
count "line-height"     "line-height:[^;]*"
count "font-family"     "font-family:[^;]*"
count "border-radius"   "border-radius:[^;]*"
count "box-shadow"      "box-shadow:[^;]*"
count "media queries"   "@media[^{]*"
count "gap"             "(^|[^-])gap:[^;]*"
count "padding"         "padding[a-z-]*:[^;]*" 60
count "margin"          "margin[a-z-]*:[^;]*" 60
count "max-width"       "max-width:[^;]*"
count "transition"      "transition:[^;]*"
count "cores soltas (hex/rgba)" "#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\)"
count "uso de var(--…)" "var\(--[a-zA-Z0-9-]*"
echo
echo "Dica: leia também cada módulo inteiro — a contagem diz quanto, a leitura diz onde (papel de cada valor)."
