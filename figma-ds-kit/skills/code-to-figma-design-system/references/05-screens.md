# Fase 4 — Screens

Objetivo: telas montadas **só com instâncias** dos componentes, com fidelidade
comprovada contra o site rodando (altura total e seção a seção).

## 1. Capturar o site como referência (sem tocar no código)

A captura (`generate_figma_design`) precisa do script `capture.js` na página e de
uma largura de viewport exata. A janela do Chrome nem sempre aceita
`resize_window` (no projeto de referência o layout ficou em 2560px). Solução que
funcionou: **iframe do mesmo domínio com largura fixa**.

1. `generate_figma_design({ fileKey, nodeId: '<id da página Screens>' })` → captureId.
   Pode gerar vários IDs de uma vez e capturar em abas paralelas.
2. Abra uma aba do Chrome em qualquer URL do mesmo domínio (ex.: `/robots.txt`).
3. Rode `scripts/browser/capture-in-iframe.js` no `javascript_tool`, ajustando
   `PATH`, `WIDTH`, `HEIGHT` e `CAPTURE_ID`. O script:
   - substitui o documento por um iframe `WIDTH×HEIGHT` com a rota;
   - força o estado final de animações de entrada (ex.: `[class*="fadeIn"]` com
     opacity 1) — sem isso os blocos abaixo da dobra saem invisíveis;
   - injeta `capture.js` no documento do iframe;
   - **dispara `captureForDesign` sem aguardar** (aguardar estoura o timeout de 45s do CDP).
4. Faça polling de `generate_figma_design({ fileKey, captureId })` até `completed`
   (páginas com muitas fotos levam alguns minutos; "pending" longo = ainda enviando —
   confira o toolbar "Enviando para o Figma…" com um zoom no screenshot).
5. Capture: cada tela desktop a 1440×900 e a Home mobile a 390×844.

Coisas que a captura pega "no meio": carrossel em outro slide, contadores em 0
(animam ao entrar na tela), texto do hero invisível (animação de entrada). Leia o
estado inicial no DOM (`javascript_tool`) e monte a tela com o **slide 1 / valores finais**.

## 2. Extrair conteúdo da captura

`scripts/figma/extract-capture.js` lista, por seção da captura: textos, imagens
(`imageHash`, tamanho, posição), cor de fundo e altura. Isso traz:
- o conteúdo real (inclusive o que vem de CMS, que pode diferir dos `data/*.ts`);
- **todas as fotos já dentro do arquivo** — reutilize os hashes, não reenvie.

## 3. Montar a tela

- Frame `<Página> — Desktop 1440` (ou `Mobile 390`) em auto layout vertical,
  largura fixa, altura HUG, `clipsContent`. Mobile: modo Mobile da Responsive no frame.
- Seções na ordem do DOM. Header e botão flutuante como filhos **absolutos**
  (fixos na primeira dobra).
- Seções que não viraram componente (hero, linhas de serviço, contadores, equipe…)
  são frames montados com instâncias de átomos/cards — use o mesmo builder para
  todas as linhas do mesmo tipo.
- Textos com destaque de cor no meio (título com span laranja): um único texto com
  `setRangeFills` (ou dois nós num auto layout com wrap, como no SectionTitle).
- Rich text com negrito: `setRangeFontName`; parágrafos com `paragraphSpacing`;
  quebras de linha suaves com ` `.
- Organize na página: telas lado a lado em y=0 com rótulos acima; capturas numa
  seção `_Referência` abaixo de tudo (apague no fim, se o usuário quiser).

## 4. Validar (o coração da fase)

1. `scripts/figma/compare-heights.js` — altura de cada seção montada × captura.
2. Para cada diferença > ~10px: screenshot lado a lado da seção montada e da
   capturada (clone num frame temporário com clip para recortar regiões longas).
3. Ache a causa no CSS (`references/css-to-figma-fidelity.md`) e **corrija na
   origem** (estilo, variável ou componente). Depois reforce o relayout das
   instâncias se preciso (ver gotchas: layout desatualizado).
4. Repita até a altura total ficar dentro de ~1% e as seções visualmente iguais.

Resultado de referência: Home 1440 = 6931 × 6931; Home 390 = 12058 × 12091;
PPF = 3895 × 3865 (diferença explicada por consolidação aprovada);
Premium = 3670 × 3681.

## 5. Encerramento da fase

Feche as abas do Chrome criadas. Registre os ajustes descobertos no doc de
auditoria (tabela "Ajustes da Fase 4") e as alturas finais.
