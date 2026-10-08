# Fase 2 — Foundations

Objetivo: variáveis, estilos e uma página de documentação viva, tudo coerente com
a auditoria aprovada.

## 1. Inspecione antes de criar

Rode `scripts/figma/inspect-file.js` (read-only): coleções, variáveis, estilos e,
principalmente, **os estilos de fonte disponíveis** (`listAvailableFontsAsync`).
Nomes variam por família: Montserrat usa `SemiBold`/`ExtraBold` (sem espaço),
Inter usa `Semi Bold`. Open Sans no Figma **não tem Medium (500)** — use o peso
disponível mais próximo e registre.

## 2. Coleções (scripts idempotentes: procure por nome antes de criar)

| Coleção | Modos | Conteúdo | Scopes |
|---|---|---|---|
| `Primitives` | Value | `color/<família>/<nível>` + `color/alpha/<cor>-<%>` | `[]` (escondidas) |
| `Semantic` | Default | aliases agrupados por função: `bg/ text/ icon/ border/ action/ focus/` | fills: `FRAME_FILL, SHAPE_FILL` · texto: `TEXT_FILL` · borda: `STROKE_COLOR` · ícone: `SHAPE_FILL, STROKE_COLOR` |
| `Spacing` | Value | `space/<px>` + `section/sm|md|lg` (aliases) + `layout/gutter`, `layout/container` | `GAP` (container: `WIDTH_HEIGHT`) |
| `Radius` | Value | `radius/xs|sm|md|lg|pill` | `CORNER_RADIUS` |
| `Responsive` | **Desktop / Mobile** | `font-size/<estilo>` para TODOS os estilos + paddings que mudam (seção, botão) + tamanhos (controles) | `FONT_SIZE`, `GAP`, `WIDTH_HEIGHT` |

Regras:
- **Semântica por superfície** quando o site não tem dark mode: `text/on-inverse`
  (sobre o azul), `text/on-brand` (sobre o laranja), `border/divider-inverse`…
  Um modo só (`Default`).
- **Alfas como primitives próprias** (o Figma não aplica opacidade sobre alias).
- **Code syntax em tudo**: WEB = `var(--nome)`. Primitives com o nome REAL do CSS;
  as demais com nomes propostos (`--bg-page`, `--space-20`, `--fs-heading-h2`).
- **O modo Mobile representa a largura da tela mobile que você vai desenhar**
  (390 → breakpoint ≤480). Se o CSS tiver valores diferentes em ≤768 e ≤480, use
  o ≤480 e anote o outro na descrição da variável.
- Só coloque no modo Mobile o que de fato muda naquele elemento. Ex.: o subtítulo
  do hero cai para 15px no mobile, mas o parágrafo do CTA não — então o estilo
  `body/lg` fica 18/18 e o hero mobile usa `body/sm`.

## 3. Text styles

- Nome por papel: `display/*`, `heading/h1–h6`, `title/lg|md|sm|xs`, `body/lg|md|sm|xs`,
  `caption/regular|italic|strong`, `label/*` (button, nav, chip, overline, eyebrow,
  badge, role, subtitle, column…). Crie mais estilos quando um papel real aparecer
  — não sobrescreva fonte na instância.
- `fontSize` **ligado** à variável `font-size/<estilo>` da Responsive
  (`style.setBoundVariable('fontSize', v)`).
- `lineHeight` em % conforme a herança do CSS (heading 120%, body 160%, `div` que
  herda body = 160%, `<button>` = `{unit:'AUTO'}`).
- `letterSpacing` em px, `textCase: 'UPPER'` quando o CSS usa `text-transform`.
- `<strong>` dentro de título com peso diferente → estilo próprio (`heading/h2-strong`).

## 4. Effect styles

Uma por `box-shadow` recorrente (`shadow/sm|md|lg|brand`). Sombras pontuais
(glow de WhatsApp, drawer) ficam locais no componente.

## 5. Página de documentação (`Foundations — Docs`, frame 1440)

Seções em auto layout vertical, cada uma com título, descrição e linha de destaque:
- **Cores:** amostras ligadas às variáveis; alfas brancas/creme sobre fundo azul;
  Semantic agrupado; aviso de contraste na amostra problemática.
- **Tipografia:** uma linha por estilo com coluna Desktop e coluna Mobile (frame
  com `setExplicitVariableModeForCollection(responsive, mobileModeId)`).
  Arredonde o line-height exibido (`toFixed(2)`).
- **Espaçamento:** barras com `width` ligado à variável.
- **Radius, Sombras, Layout/Breakpoints** (larguras proporcionais que caibam em 1280).

Sempre que tokens/estilos forem adicionados em fases seguintes, **reconstrua as
seções afetadas** no mesmo índice (remova e `insertChild(idx, …)`).

## 6. Validação

Rode o check de `references/plugin-api-gotchas.md` §Validação: contagem por
coleção, aliases quebrados = 0, nenhum `ALL_SCOPES`, nenhum code syntax faltando,
todos os text styles com `fontSize` ligado. Screenshot de cada seção da doc.
