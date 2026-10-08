# Fidelidade CSS → Figma

Quando a tela montada diverge do site, a causa quase sempre é uma destas regras do
CSS. Cada linha desta tabela foi uma diferença real encontrada e corrigida.

| No CSS | Efeito | No Figma |
|---|---|---|
| `div`/`span`/`li` sem line-height próprio | herda do `body` (ex.: 1.6) | estilo com lh 160% — mesmo se o elemento "parece" um título (número de contador) |
| `<button>` | **não herda** line-height (usa `normal`) | `lineHeight: { unit: 'AUTO' }` |
| `<li>` com `<a>` de fonte menor dentro | a linha do `li` usa o font-size dele (16px → 25,6px), não o do link | `itemSpacing` = margin + (lh do li − lh do texto), `paddingBottom` = margin do último |
| `margin-bottom` no último item | soma ao final da lista | `paddingBottom` no container |
| `gap: 30px` + `.card + .card { margin-top: 30px }` | espaço real 60px | `itemSpacing` 60 (e documente) |
| `margin-top` negativo + `gap` | itens se sobrepõem | `itemSpacing` negativo (ex.: 20 − 40 = −20) |
| seção com `margin-top: -30px` sobre o hero | a seção cobre o fim do hero | encurte o frame do hero em 30 e ancore os elementos de base no tamanho original |
| card com `margin-top: -40px` sobre a seção anterior | sobreposição | frame de seção sem auto layout, `clipsContent=false`, grade em y=−40 |
| `max-width: 600px` num parágrafo | encolhe em telas estreitas | `FILL` + `maxWidth = 600` (nunca largura fixa) |
| `height: auto` em imagem | proporção natural | `lockAspectRatio()` com a proporção real |
| `aspect-ratio: 9/16` + `max-height: 600px` | altura limitada | altura fixa = min(calculada, máx.) |
| `object-fit: cover` | recorte | `scaleMode: 'FILL'` |
| `background: url() center no-repeat` em tamanho natural | não escala | `scaleMode: 'CROP'` com `imageTransform` (ver gotchas) |
| `linear-gradient(135deg, a 0%, b 100%)` | overlay diagonal | `GRADIENT_LINEAR` com `gradientTransform [[.5,.5,0],[-.5,.5,.5]]`, stops ligados às alfas |
| `clip-path: polygon(0 100%, 100% 0, 100% 100%)` | faixa diagonal | `createVector` com path `M 0 h L w 0 L w h Z` |
| `border: 2px` (sem box-sizing afetando) | aumenta o elemento | `strokeAlign INSIDE` + `strokesIncludedInLayout` |
| `border-radius: 50%` | círculo | `radius/pill` (999) ou elipse |
| `text-transform: uppercase` | caixa alta | `textCase: 'UPPER'` no estilo |
| `<strong>` dentro de um título 700 | peso 900 ("bolder") | estilo próprio (ex.: `heading/h2-strong`) |
| `font-size` em rem | 1rem = 16px | arredonde para px inteiro (desvio ≤ 0,4px) se o usuário aprovou |
| media query `max-width: 480px` vs `768px` | dois valores mobile | o modo Mobile = largura do frame mobile (390 → usa o ≤480) |
| `position: fixed` (header, botão flutuante) | fica na primeira dobra | filho absoluto do frame da tela, na posição da viewport |
| animações de entrada (opacity 0 até entrar na tela) | captura sai vazia | força o estado final antes de capturar |
| contadores animados | captura mostra 0 | use os valores finais dos dados |
| carrossel | captura pega um slide aleatório | leia o slide ativo inicial no DOM e monte esse |
| `transform: translateY(-2px)` no hover | só movimento | não representável; descreva no componente |

## Método de diagnóstico

1. Compare alturas por seção (montado × captura).
2. Recorte a seção dos dois lados e compare visualmente.
3. Calcule a altura esperada a partir do CSS (padding + line-height × linhas + gaps).
   A diferença numérica costuma apontar a regra: ~20px num número de 48px =
   line-height 1.2 vs 1.6; ~5px por chip = button com lh normal; etc.
4. Corrija o estilo/variável/componente, force o relayout das instâncias, meça de novo.
