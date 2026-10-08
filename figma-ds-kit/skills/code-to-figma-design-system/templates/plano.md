# Plano — Design System + Telas no Figma (engenharia reversa do código)

Objetivo: gerar no Figma, a partir deste projeto já concluído, um design system
(variáveis, estilos, componentes) e as telas principais, para <portfólio / handoff /
evolução>. O projeto foi desenhado direto no código; o Figma documenta e
sistematiza o que já existe.

Contexto confirmado:
- Plano Figma: <Professional+> (necessário para a coleção Responsive com 2 modos).
- MCP remoto do Figma autenticado. Extensão Claude in Chrome disponível.
- Fontes: <heading — família, pesos, variável CSS> e <body — família, pesos>.
- Uso no portfólio autorizado pelo cliente: <sim/não>.

## O que já existe no código

- Páginas: <lista com caminhos>.
- Tokens em <arquivo>: <custom properties>. Container: <max-width, padding>.
- Estilos: <CSS Modules / Tailwind / …>, ~<N> usos de `var(--…)`, <N> valores fixos.
- Lacunas: <ex.: só paleta crua, sem semântica nem escalas>.
- Componentes: <pastas e nomes>.

## Arquivo Figma

"<Nome> — Design System & UI", páginas: Cover · Case · Foundations · Components · Screens.
Link: <url>

## Telas a montar

- <Home> desktop 1440 e mobile 390
- <Página 2> desktop 1440
- <Página 3> desktop 1440

## Fases

**0 · Preparação** — MCP ok · arquivo com páginas · dev server (porta real: <…>) · teste de escrita (1 variável).

**1 · Auditoria (só código)** — valores recorrentes dos estilos; proposta Primitives → Semantic + Spacing/Radius/Responsive; tipografia desktop/mobile; inventário de componentes com variantes/estados; achados. **Revisão do usuário.**

**2 · Foundations** — coleções, text styles (fontSize ligado à Responsive), effect styles, página de documentação. **Revisão.**

**3 · Components** — ícones, átomos, Assets, cards, blocos. Auto layout, propriedades, variáveis em tudo. **Revisão.**

**4 · Screens** — capturas de referência (iframe 1440/390) → telas montadas com instâncias → validação de alturas e visual por seção. **Revisão.**

**5 · Acabamento** — capa, página de case, nomes de camadas; opcional: portar tokens ao código (só com autorização).

Regra de trabalho: uma fase por vez, com revisão do usuário ao fim de cada uma. Nada é commitado sem pedido.
