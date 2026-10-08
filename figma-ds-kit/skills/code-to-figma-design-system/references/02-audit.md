# Fase 1 — Auditoria (só código, nada no Figma)

Objetivo: transformar o CSS em uma **proposta de tokens** e um **inventário de
componentes** que o usuário aprova antes de qualquer escrita no Figma.

## Passos

1. **Tokens existentes.** Leia o arquivo global (`globals.css`, `:root`,
   `tailwind.config`, tema…). Anote nomes reais das custom properties — eles viram
   o code syntax das primitives.
2. **Frequência de valores.** Rode `scripts/audit-css.sh src` — conta font-size,
   font-weight, letter-spacing, line-height, radius, sombras, media queries, gap,
   padding, margin, cores soltas (hex/rgba), uso de `var(--…)`, max-width, transition.
3. **Leia todos os módulos de CSS inteiros.** A contagem diz *quanto*; a leitura diz
   *onde*. Para cada tamanho de fonte, descubra o papel (h1 do PageHero, número do
   contador, label do botão…) e o valor mobile (media queries).
4. **Leia as props dos componentes** (interfaces `*Props`, tipos em `data/types.ts`)
   para levantar variantes reais (`variant`, `align`, `light`, booleanos…).
5. **Mapeie herança de fonte e line-height** — é a maior fonte de erro depois:
   - `h1–h6` costumam ter `font-family` de heading e `line-height` próprio (ex.: 1.2);
   - `div`, `span`, `p`, `li` herdam o line-height do `body` (ex.: 1.6);
   - **`<button>` não herda** line-height nem font: usa `normal` (≈1.2);
   - elementos sem `font-family` explícito ficam com a fonte do body.
6. **Escreva o entregável** usando `templates/auditoria.md`:
   cores (Primitives + alfas + Semantic), espaçamento, radius, tipografia (tabela
   desktop/mobile), efeitos, layout/breakpoints/motion, proposta da coleção
   Responsive, inventário (átomos, cards, blocos, fora do Figma) e **achados**
   (contraste WCAG, hex soltos, comentários desatualizados).
7. **Salve** em `docs/figma-fase1-auditoria.md` do projeto e traga ao usuário um
   resumo + perguntas.

## Decisões a perguntar (padrões recomendados)

1. Arredondar rem → px inteiros no Figma? *(recomendado: sim; desvio ≤0,4px)*
2. Consolidar valores quase iguais (1.05→1.1rem, radius 4→3, transparências)? *(sim)*
3. Coleção `Responsive` com modos Desktop/Mobile para fontes e paddings? *(sim)*
4. Contraste abaixo do AA: documentar como está ou propor correção? *(documentar + avisar)*
5. Nomenclatura de títulos: h1–h6 + title/sm–lg, ou reduzir? *(manter a escala real)*

Se o usuário não responder alguma, siga a recomendada e diga isso na próxima mensagem.

## Calcule contraste

Use a fórmula WCAG (luminância relativa) para os pares texto/fundo mais usados.
No projeto de referência, `#999` sobre branco = 2,85:1 — virou aviso na amostra
de `text/muted` e um achado no case.
