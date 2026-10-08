# Exemplo de referência — Detail Estética Automotiva (Casa das Capotas)

Primeira execução completa do procedimento (outubro/2026). Use como régua de
qualidade e de escopo.

- **Projeto:** site Next.js 15 + CSS Modules + conteúdo via WordPress. 5 páginas.
- **Figma:** https://www.figma.com/design/xTm2yfF5CJtA2iIigP4yBl
- **Arquivos deste exemplo:** `plano.md` (plano com fases marcadas) e
  `auditoria.md` (entregável da Fase 1 + adições das Fases 3 e 4).

## O que foi entregue

| Página | Conteúdo |
|---|---|
| Cover | Frame 1440×900 montado com o próprio sistema (Header real, hero, números do sistema) |
| Case | Contexto/problema/abordagem, processo, 6 decisões, antes/depois, validação, achados |
| Foundations | Doc viva: 64 amostras de cor, 29 estilos (Desktop/Mobile), 29 passos de espaçamento, radius, sombras, breakpoints |
| Components | Seções Icons (24), Button, SectionTitle, Atoms, Assets, Cards, Blocks |
| Screens | Home 1440, Home 390, PPF 1440, Proteção Premium 1440 — só instâncias |

**Números:** 124 variáveis em 5 coleções (Primitives 24 · Semantic 40 · Spacing 28 ·
Radius 5 · Responsive 27, com modos Desktop/Mobile) · 29 text styles · 4 effect styles ·
49 componentes / 100 variantes.

## Validação final (altura total, Figma × site)

| Tela | Figma | Site |
|---|---|---|
| Home — Desktop 1440 | 6931 | 6931 |
| Home — Mobile 390 | 12058 | 12091 |
| PPF — Desktop 1440 | 3895 | 3865 (*parágrafo do hero: consolidação 1.05→1.1rem aprovada*) |
| Proteção Premium — Desktop 1440 | 3670 | 3681 |

## Lições que viraram regra na skill

- O modo Mobile tem que corresponder à largura real do frame (390 → breakpoint ≤480).
- `<button>` não herda line-height; `div` herda o do body — erros de 5 a 20px por elemento.
- Instâncias não deixam redimensionar frames internos fixos: listas e imagens precisam
  ser resolvidas no componente (booleans `Show N`, proporção travada, `maxWidth`).
- Capturar via iframe no navegador dispensa editar o código e dá viewport exata.
- Capturas já trazem todas as fotos — reutilize os `imageHash`.

## Pendências deixadas para o usuário

- Definir a miniatura do arquivo (clique direito na capa → Set as thumbnail).
- Portar tokens para o código: adiado ("quero fazer mais testes").
