# figma-ds-kit — Código → Design System no Figma

Procedimento replicável para transformar um site que **já existe em código** num
design system completo no Figma (variáveis, estilos, componentes) e nas suas telas
principais, montadas só com instâncias e **validadas contra o site rodando**.

Nasceu do projeto Detail Estética Automotiva (ver `examples/`): 124 variáveis,
29 estilos de texto, 49 componentes e 4 telas com diferença de altura ≤1% em relação
ao site.

---

## Para quem é

- **Você**, para disparar o processo num projeto novo com poucos prompts.
- **Um agente (Claude Code)**, que deve ler `skills/code-to-figma-design-system/SKILL.md`
  e seguir as referências fase a fase.

## Instalação da skill

A skill é autocontida (instruções, scripts e templates na mesma pasta). Copie-a para:

- **todos os projetos:** `~/.claude/skills/code-to-figma-design-system/`
- **só um projeto:** `<projeto>/.claude/skills/code-to-figma-design-system/`

```bash
cp -r figma-ds-kit/skills/code-to-figma-design-system ~/.claude/skills/
```

Depois, numa sessão nova do Claude Code, ela aparece como
`code-to-figma-design-system`. Para usar sem instalar, aponte o agente para esta
pasta: *"Leia figma-ds-kit/skills/code-to-figma-design-system/SKILL.md e siga."*

## Pré-requisitos

- Claude Code com o **MCP remoto do Figma** autenticado.
- Plano Figma **Professional** ou superior (a coleção Responsive usa 2 modos).
- Extensão **Claude in Chrome** (captura do site e comparação visual).
- Um arquivo Figma com as páginas `Cover · Foundations · Components · Screens`.
- O projeto rodando localmente (`npm run dev` ou equivalente).

## Como começar

1. Crie o arquivo Figma e copie o link.
2. Abra o Claude Code na raiz do projeto alvo.
3. Cole o prompt de kickoff de `skills/code-to-figma-design-system/templates/prompts.md`.
4. Revise o que o agente entregar ao fim de cada fase e responda às perguntas
   numeradas. Use os prompts das fases seguintes.

## As 6 fases

| Fase | Entrega | Você revisa |
|---|---|---|
| 0 · Preparação | MCP ok, dev server, 1 variável de teste | — (segue direto) |
| 1 · Auditoria | `docs/figma-fase1-auditoria.md`: tokens propostos, tipografia, inventário, achados | decisões de arredondamento, consolidação, Responsive, contraste |
| 2 · Foundations | 5 coleções, text/effect styles, página de documentação | a página Foundations |
| 3 · Components | ícones, átomos, cards, blocos (com Assets) | a página Components |
| 4 · Screens | telas montadas com instâncias + tabela Figma × site | as telas |
| 5 · Acabamento | capa, página de case, nomes de camadas | o resultado final |

Princípios: uma fase por vez · o CSS é a fonte de verdade · nada de valores soltos ·
não editar o código do projeto · não commitar sem pedido.

## Mapa do kit

```
figma-ds-kit/
├── README.md                          ← este arquivo
├── skills/code-to-figma-design-system/
│   ├── SKILL.md                       ← ponto de entrada do agente
│   ├── references/
│   │   ├── 01-setup.md … 06-finishing.md   ← passo a passo de cada fase
│   │   ├── plugin-api-gotchas.md      ← armadilhas do Plugin API (com soluções)
│   │   └── css-to-figma-fidelity.md   ← como cada regra do CSS vira Figma
│   ├── scripts/
│   │   ├── audit-css.sh               ← Fase 1: frequência de valores no CSS
│   │   ├── export-lucide-icons.mjs    ← Fase 3: SVGs idênticos aos do lucide-react
│   │   ├── browser/capture-in-iframe.js   ← Fase 4: captura numa largura exata
│   │   └── figma/                     ← snippets para use_figma
│   │       ├── prelude.js             ← helpers (V, paint, TS, setP, recolor, container…)
│   │       ├── inspect-file.js        ← estado do arquivo / retomar sessão
│   │       ├── create-tokens.js       ← Fase 2: 5 coleções a partir de uma config
│   │       ├── create-text-styles.js  ← Fase 2: text + effect styles
│   │       ├── audit-bindings.js      ← Fase 3: QA de variáveis/estilos
│   │       ├── extract-capture.js     ← Fase 4: textos/imagens/alturas da captura
│   │       ├── compare-heights.js     ← Fase 4: montado × captura
│   │       └── list-generic-names.js  ← Fase 5: camadas com nome padrão
│   └── templates/
│       ├── plano.md                   ← plano do projeto (vai para docs/)
│       ├── auditoria.md               ← estrutura do entregável da Fase 1
│       ├── case-outline.md            ← roteiro da página Case
│       ├── prompts.md                 ← prompts de cada fase + retomada
│       └── state-ledger.example.json  ← formato do ledger de IDs
└── examples/detail-casadascapotas/
    ├── plano.md · auditoria.md        ← documentos reais da 1ª execução
    └── resultado.md                   ← o que foi entregue, números, lições
```

## Adaptando a outros stacks

- **Tailwind:** a auditoria lê `tailwind.config` e as classes mais usadas no lugar
  dos módulos (`audit-css.sh` ainda serve para o CSS global).
- **Outra biblioteca de ícones:** troque `export-lucide-icons.mjs` por um export
  equivalente; o resto (componente `Icon/*` 24px, traço ligado a variável) é igual.
- **Site com dark mode:** a coleção Semantic ganha modos Light/Dark em vez de
  "semântica por superfície".
- **Animações de entrada diferentes:** ajuste `FORCE_VISIBLE` no `capture-in-iframe.js`.

## Mantendo o kit

Toda vez que um projeto revelar uma armadilha nova, acrescente-a em
`references/plugin-api-gotchas.md` ou `references/css-to-figma-fidelity.md` — é
isso que faz a próxima execução sair mais rápida.
