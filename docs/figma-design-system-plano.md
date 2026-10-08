# Plano — Design System + Telas no Figma (engenharia reversa do código)

Objetivo: gerar no Figma, a partir deste projeto já concluído, um design system (variáveis, estilos, componentes) e 3 telas, para portfólio de UI/UX. O projeto foi desenhado direto no código; o Figma documenta e sistematiza o que já existe.

Contexto confirmado:
- Plano Figma Professional; cliente autoriza o uso no portfólio; histórico de versões não é problema.
- MCP remoto do Figma (`https://mcp.figma.com/mcp`) configurado e autenticado — usar as ferramentas de escrita (Write to Canvas) e captura (Code to Canvas).
- Fontes: Montserrat (headings, 400–900, `--font-heading`) e Open Sans (body, 400–700, `--font-body`), via `next/font` em `src/app/layout.tsx`. Ambas nativas no Figma.

## O que já existe no código

- Páginas: Home (`src/app/page.tsx`), PPF, Películas, Limpeza, Proteção Premium.
- Tokens em `src/app/globals.css` (`:root`): `--blue #1d3245`, `--orange #ea591c`, `--orange-dark #c84813`, `--cream #d7d6ca`, `--white`, `--gray-light #f5f5f5`, `--gray #999`, `--gray-dark #333`, `--shadow`, `--shadow-sm`, `--transition`, `--ease-power3`. Container: 1300px, padding 20px.
- CSS Modules usam `var(--…)` ~167 vezes; só 3 hex fixos.
- Lacuna: tokens são só paleta crua — falta camada semântica e escalas de espaçamento/tipografia/radius. Criar no Figma (e opcionalmente portar de volta ao código).
- Componentes: `src/components/shared/` (Button, SectionTitle, PageHero, FilmCard, PremiumCard, CatalogBlock, CtaSection, TeamSection, ImageTitleGrid, PPFLogosSection, FadeCarousel, Lightbox, RichText), `layout/` (Header, Footer, WhatsAppFloat), `home/` (HeroCarousel, Counters, Features, ServiceShowcase, GallerySection, Gallery2).
- Button: variantes `primary` / `outline` / `dark`, modificador `block`, hover com translateY(-2px); radius 3px; Montserrat 600 uppercase, letter-spacing 1px, padding 14px 32px (mobile 12px 24px).

## Arquivo Figma

"Detail — Design System & UI", páginas: Cover · Foundations · Components · Screens. (Link: https://www.figma.com/design/xTm2yfF5CJtA2iIigP4yBl)

## Fases

**0 · Preparação** — MCP autenticado ✅ · arquivo criado · `npm run dev` (porta 3001 se a 3000 estiver ocupada) · teste de escrita ✅ (`Primitives/color/orange/500`).

**1 · Auditoria (só código)** — extrair valores recorrentes dos modules (espaçamentos, font-sizes, radius, sombras, breakpoints); propor tokens Primitives → Semantic; inventário de componentes com variantes/estados. Entregar para revisão antes de ir ao Figma.

**2 · Foundations** ✅ — coleções de variáveis: Primitives (cores), Semantic (`bg/`, `text/`, `border/`, `action/`), Spacing, Radius. Text styles (display, h1–h4, body, label, button). Effect styles (2 sombras). Frames de documentação (paleta, tipografia, espaçamento).

**3 · Components** ✅ — átomos/moléculas primeiro (Button, SectionTitle, cards Film/Premium/Team/Counter, itens de galeria/catálogo), depois blocos (Header desktop/mobile, Footer, PageHero, CtaSection, WhatsApp float). Auto layout, component properties, variáveis aplicadas — nada de valores soltos.

**4 · Screens** ✅ — Home, PPF, Proteção Premium em desktop 1440; Home também em mobile 390. Capturar via Code to Canvas para fidelidade e depois trocar as partes por instâncias dos componentes. Validar comparando screenshot do Figma vs navegador, seção por seção.

**5 · Acabamento** ✅ (exceto porte dos tokens ao código — aguardando decisão) — capa, organização e nomes de camadas; opcional: frame de case (contexto, problema, decisões); opcional: portar camada semântica de tokens de volta ao código.

Regra de trabalho: uma fase por vez, com revisão do usuário ao fim de cada uma.
