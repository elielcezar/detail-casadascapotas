---
name: code-to-figma-design-system
description: >-
  Gera no Figma, por engenharia reversa de um site que já existe em código
  (Next.js/React/HTML+CSS), um design system completo — variáveis (Primitives,
  Semantic, Spacing, Radius, Responsive Desktop/Mobile), text/effect styles,
  componentes com variantes e propriedades — e as telas principais montadas só
  com instâncias, validadas contra capturas do site rodando. Trabalha em 6 fases
  (0 preparação → 5 acabamento) com revisão do usuário ao fim de cada uma. Use
  quando o usuário pedir para "documentar o site no Figma", "criar o design
  system a partir do código", "passar o projeto para o Figma para portfólio",
  "gerar tokens/componentes/telas no Figma do que já está pronto".
---
# Código → Design System no Figma (engenharia reversa)

O projeto foi desenhado direto no código. O Figma **documenta e sistematiza o que
já existe** — não redesenha. Toda decisão visual vem do CSS; toda tela é conferida
contra o site.

## Regras de ouro

1. **Uma fase por vez, com revisão do usuário ao fim de cada uma.** Não emende
   fases. Ao fim de cada uma: resumo curto + decisões que dependem dele.
2. **O CSS é a fonte de verdade.** Leia os módulos inteiros antes de propor tokens.
   Quando o Figma divergir do navegador, a causa está num detalhe do CSS
   (ver `references/css-to-figma-fidelity.md`) — corrija **na origem** (token,
   estilo ou componente), nunca remendando a tela.
3. **Nada de valores soltos.** Fills, strokes, paddings, gaps, radius e font-size
   ligados a variáveis/estilos. Valor pontual que aparecer vira token documentado.
   Exceções legítimas: geometria fixa (ícones, dots), cores que são *dado* de
   conteúdo (amostras de tonalidade), gap negativo.
4. **Não mexa no código do projeto.** A captura é feita injetando o script pelo
   navegador (iframe), sem editar `layout.tsx`. Portar tokens de volta ao código
   é opcional e só com autorização explícita.
5. **Não commite nada** a menos que o usuário peça.

## Pré-requisitos (verifique na Fase 0)

- MCP remoto do Figma autenticado (`whoami`). Plano **Professional ou superior**
  (a coleção Responsive precisa de 2 modos; Starter só permite 1).
- Arquivo Figma com páginas `Cover · Foundations · Components · Screens`.
- Extensão **Claude in Chrome** (para captura e comparação visual).
- Dev server do projeto rodando (anote a porta real — pode não ser a padrão).
- Skills de API do Figma carregadas: leia os recursos MCP
  `skill://figma/figma-use/SKILL.md` e `skill://figma/figma-generate-library/SKILL.md`
  (+ `references/token-creation.md`, `component-creation.md`,
  `documentation-creation.md` desta última). Em todo `use_figma`, passe
  `skillNames: "resource:figma-use,resource:figma-generate-library"`.

## Fases

| Fase | O que entrega | Referência |
|---|---|---|
| 0 · Preparação | MCP ok, dev server, teste de escrita (1 variável) | `references/01-setup.md` |
| 1 · Auditoria (só código) | Proposta de tokens + inventário de componentes → **revisão** | `references/02-audit.md` |
| 2 · Foundations | Coleções, estilos, página de documentação | `references/03-foundations.md` |
| 3 · Components | Ícones, átomos, cards, blocos + seção Assets | `references/04-components.md` |
| 4 · Screens | Capturas de referência + telas montadas com instâncias, validadas | `references/05-screens.md` |
| 5 · Acabamento | Capa, página de case, nomes de camadas | `references/06-finishing.md` |

Sempre consulte também:
- `references/plugin-api-gotchas.md` — armadilhas do Plugin API que custaram retrabalho.
- `references/css-to-figma-fidelity.md` — como cada comportamento do CSS vira Figma.

## Estado entre chamadas (obrigatório)

Nenhum estado persiste entre chamadas `use_figma`. Mantenha um **ledger JSON no
scratchpad** (modelo em `templates/state-ledger.example.json`) com IDs de páginas,
coleções, modos, component sets, propriedades, hashes de imagem e telas. Releia
antes de cada fase; atualize ao fim de cada etapa. Passe IDs como literais.

## Scripts

| Script | Uso |
|---|---|
| `scripts/audit-css.sh <dir-src>` | Frequência de valores nos CSS (font-size, radius, gaps, sombras, breakpoints, cores) |
| `scripts/export-lucide-icons.mjs` | Gera SVGs idênticos aos do `lucide-react` do projeto |
| `scripts/browser/capture-in-iframe.js` | Captura uma página a 1440/390 px via iframe (cole no `javascript_tool`) |
| `scripts/figma/prelude.js` | Helpers para colar no topo de cada `use_figma` (V, paint, TS, setP, recolor…) |
| `scripts/figma/*.js` | Inspeção, extração da captura, comparação de alturas, auditoria de bindings/nomes |

## Templates

- `templates/plano.md` — plano do projeto (copie para `docs/` do projeto alvo).
- `templates/auditoria.md` — estrutura do entregável da Fase 1.
- `templates/prompts.md` — prompts prontos para disparar cada fase.
- `templates/case-outline.md` — roteiro da página de case (Fase 5).
- `templates/state-ledger.example.json` — formato do ledger.

## Comunicação com o usuário

- Ao fim de cada fase: o que foi criado (contagens), decisões tomadas sem
  perguntar, divergências encontradas e **as perguntas numeradas** que dependem dele.
- Se uma pergunta ficar sem resposta, siga o padrão mais conservador
  (documentar como está) e diga isso.
- Mostre evidência: screenshots do Figma e tabela de alturas Figma × site.
