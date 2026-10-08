# Armadilhas do Plugin API (aprendidas na prática)

Complementa `figma-use` (leia aquela skill primeiro). Cada item abaixo custou pelo
menos uma chamada de retrabalho no projeto de referência.

## Execução

- **Chamada com erro = rollback total.** Nada do script persiste (nem o que rodou
  antes da linha que falhou). Pode repetir o script corrigido inteiro. Mesmo assim,
  confira o estado com uma leitura se o erro for estranho.
- **Scripts idempotentes:** procure por nome e remova/reuse antes de criar
  (`page.children.find(n => n.name === …)`). Assim o retry é seguro.
- **Uma página por chamada** (`await figma.setCurrentPageAsync(page)`).
- **Não aguarde operações longas no navegador** pelo `javascript_tool`: o CDP corta
  em 45s. Dispare e acompanhe por outro canal (polling).

## Tamanho e auto layout

- **`resize()` fixa as duas dimensões.** Depois dele, reaplique
  `layoutSizingVertical = 'HUG'` (ou horizontal). Sintomas: frame com 10px de altura,
  texto cortado, variante de 100px fixos, coluna da tabela com altura travada.
- `HUG`/`FILL` só depois do `appendChild` num pai com auto layout.
- **`minHeight`/`maxWidth` só em nós dentro de auto layout** — faça append antes.
- **`layoutPositioning = 'ABSOLUTE'` só se o pai tiver auto layout.** Em frame comum,
  basta posicionar com x/y + constraints.
- Gap negativo é permitido (`itemSpacing = -20`), mas não aceita variável.
- `strokesIncludedInLayout = true` faz a borda somar ao tamanho (como CSS `border`).

## Instâncias

- **Não dá para redimensionar um frame interno de altura fixa numa instância**
  (`resize` é ignorado; `minHeight` lança "cannot be overridden"). Corrija no
  componente (proporção travada, HUG, booleans).
- **Layout desatualizado:** depois de mudar estilo/variável que altera altura, a
  instância pode manter a altura antiga. Force: `inst.layoutSizingVertical = 'FIXED';
  inst.resize(w, novoH); inst.layoutSizingVertical = 'HUG'`. Para textos:
  alternar `textAutoResize` HEIGHT → WIDTH_AND_HEIGHT.
- **INSTANCE_SWAP renomeia/limpa a camada interna:** procure o ícone com fallback
  (`inst.findOne(n => n.name === 'icon') || inst.findOne(n => n.type === 'INSTANCE')`)
  e **reaplique cor e espessura** depois da troca.
- `setProperties` exige a chave completa (`Label#12:0`); resolva pelo prefixo
  (`key.split('#')[0] === 'Label'`) — helper `setP` no `prelude.js`.
- Propriedades de texto compartilham o default entre variantes — o texto de exemplo
  vale para todas.

## Variáveis e estilos

- Paint ligado a variável: `figma.variables.setBoundVariableForPaint(paint, 'color', v)`
  devolve um novo paint (reatribua `fills`).
- **Stops de gradiente aceitam variável:** `{ position, color, boundVariables: { color: { type: 'VARIABLE_ALIAS', id } } }`.
- Text style com tamanho responsivo: `style.setBoundVariable('fontSize', v)`.
- `lineHeight: { unit: 'AUTO' }` = `line-height: normal` do navegador.
- Mudar um estilo de fonte do nó (`fontName`) **desliga o estilo** — crie um estilo
  novo em vez de sobrescrever (ex.: `heading/h2-strong`).
- Modo explícito: `frame.setExplicitVariableModeForCollection(collection, modeId)`
  (aceita o objeto da coleção).

## Imagens

- `createImageAsync` não é suportado. Use `upload_assets` com `nodeIds` (um alvo por
  imagem) e envie com `curl -X POST -F "file=@arquivo" <submitUrl>` (em paralelo).
- A resposta traz o `imageHash`; reutilize em qualquer nó.
- Capturas (`generate_figma_design`) já sobem todas as fotos da página: extraia os
  hashes delas em vez de reenviar.
- `background-position: center` com imagem em tamanho natural → `scaleMode: 'CROP'`
  e `imageTransform: [[w/IW, 0, (IW-w)/2/IW], [0, h/IH, (IH-h)/2/IH]]`.

## APIs que não existem/não funcionam aqui

- `figma.notify`, `loadAllPagesAsync`, `setPluginData`, `createImageAsync`.
- `setFileThumbnailNodeAsync` → "not a supported API" (thumbnail é manual).

## Validação (cole e rode ao fim de cada fase)

```js
const cols = await figma.variables.getLocalVariableCollectionsAsync();
const vars = await figma.variables.getLocalVariablesAsync();
const ids = new Set(vars.map(v => v.id));
let broken = 0, allScopes = 0, noSyntax = 0;
for (const v of vars) {
  for (const val of Object.values(v.valuesByMode)) if (val?.type === 'VARIABLE_ALIAS' && !ids.has(val.id)) broken++;
  if (v.scopes.includes('ALL_SCOPES')) allScopes++;
  if (!v.codeSyntax.WEB) noSyntax++;
}
const ts = await figma.getLocalTextStylesAsync();
return { collections: cols.map(c => `${c.name}(${c.modes.map(m => m.name)}): ${c.variableIds.length}`),
  broken, allScopes, noSyntax, textStyles: ts.length, unboundText: ts.filter(s => !s.boundVariables?.fontSize).length };
```
