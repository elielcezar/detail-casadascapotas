# Fase 1 — Auditoria do código → proposta de tokens e inventário

Fonte: os 23 `*.module.css` em `src/components/` + `src/app/globals.css` + props dos `.tsx`.
Conversão: 1rem = 16px. Contagens = ocorrências nos modules.

## 1. Cores

### Primitives (coleção `Primitives`, 1 modo, scopes vazios = escondidas dos pickers)

| Variável | Valor | Origem |
|---|---|---|
| `color/blue/900` | #1d3245 | `--blue` (25×) |
| `color/orange/500` | #ea591c | `--orange` (44×) — **já criada no teste da Fase 0** |
| `color/orange/600` | #c84813 | `--orange-dark` (hover do primary) |
| `color/cream/300` | #d7d6ca | `--cream` (12×) |
| `color/neutral/0` | #ffffff | `--white` (32×) |
| `color/neutral/100` | #f5f5f5 | `--gray-light` (seções alt) |
| `color/neutral/400` | #999999 | `--gray` |
| `color/neutral/800` | #333333 | `--gray-dark` + `#333` fixo no Header |
| `color/neutral/1000` | #000000 | lightbox; `#000001` do ImageTitleGrid |
| `color/whatsapp/500` | #25d366 | WhatsAppFloat (marca de terceiro) |

Alfas (como variáveis próprias, pois o Figma não aplica opacidade sobre alias):

| Variável | Valor | Uso |
|---|---|---|
| `color/alpha/white-8` | #fff 8% | th de tabela |
| `color/alpha/white-15` | #fff 15% | divisórias em card escuro (4×) |
| `color/alpha/white-30` | #fff 30% | borda do filtro (0.35/0.4 consolidados aqui) |
| `color/alpha/white-90` | #fff 90% | texto secundário sobre laranja/card |
| `color/alpha/cream-10` | cream 10% | divisória do footer (0.05 do drawer consolidado) |
| `color/alpha/cream-30` | cream 30% | borda dos ícones sociais |
| `color/alpha/cream-70` | cream 70% | texto do footer (0.8 do hero consolidado?) |
| `color/alpha/black-35` | #000 35% | controles do FadeCarousel (0.15 do hero à parte) |
| `color/alpha/black-95` | #000 95% | backdrop do lightbox |
| `color/alpha/orange-60` | laranja 60% | overlay da galeria |
| `color/alpha/blue-85` / `blue-50` | azul 85/50% | gradiente do hero |

### Semantic (coleção `Semantic`, aliases para Primitives)

O site não tem tema claro/escuro; ele alterna **superfícies** claras e escuras. Proposta: 1 modo, nomes que dizem a superfície (`on-inverse`, `on-brand`).

| Grupo | Token → primitive |
|---|---|
| `bg/` | `page` → neutral/0 · `subtle` → neutral/100 · `inverse` → blue/900 · `brand` → orange/500 · `accent` → cream/300 · `black` → neutral/1000 · `header` → neutral/800 · `scrim` → alpha/black-95 · `overlay-brand` → alpha/orange-60 |
| `text/` | `heading` → blue/900 · `body` → neutral/800 · `muted` → neutral/400 · `accent` → orange/500 · `on-inverse` → neutral/0 · `on-inverse-heading` → cream/300 · `on-inverse-muted` → alpha/cream-70 · `on-brand` → neutral/0 · `on-brand-muted` → alpha/white-90 |
| `border/` | `accent` → orange/500 · `on-inverse` → alpha/white-15 · `on-inverse-strong` → alpha/cream-30 · `divider-inverse` → alpha/cream-10 · `outline` → neutral/0 |
| `action/` | `primary` → orange/500 · `primary-hover` → orange/600 · `dark` → blue/900 · `dark-hover` → neutral/800 · `outline-hover-bg` → neutral/0 · `whatsapp` → whatsapp/500 |
| `focus/` | `ring` → orange/500 |

## 2. Espaçamento (coleção `Spacing`, scope GAP / padding)

Valores encontrados (gap + padding + margin): 3, 5, 6, 7, 8, 10, 12, 14, 15, 20, 25, 30, 35, 40, 45, 50, 60, 80, 100, 120, 160.
O código segue um ritmo de múltiplos de 5, com 8/12 de exceção.

| Token | px | Uso típico |
|---|---|---|
| `space/3` | 3 | gutter de grades de foto (Gallery2, ImageTitleGrid) |
| `space/5` | 5 | toggle, gap de linhas |
| `space/8` | 8 | gap ícone+texto (botão, telefone) — 7× |
| `space/10` | 10 | gap de nav, checklist, dots — 8× |
| `space/12` | 12 | social |
| `space/15` | 15 | gap de botões, margens de título |
| `space/20` | 20 | `margin-bottom` padrão (13×), gutter do container |
| `space/25` | 25 | padding de card (25 30) |
| `space/30` | 30 | gap de grades de card (7×) |
| `space/40` | 40 | gap do footer, padding de feature card |
| `space/50` | 50 | intro do catálogo |
| `space/60` | 60 | gap ServiceShowcase, margin do SectionTitle |
| `space/80` | 80 | padding de seção md |
| `space/100` | 100 | padding de seção lg |

Fora da escala (ficam como valor local do componente, documentados): 6 (subItems), 7 (nav link), 14 (bullet), 35 (hero/intro), 45 (PremiumCard), 120/160 (PageHero).

Padding de seção — candidato a variável responsiva (ver §6): `section/sm` 60 · `section/md` 80 · `section/lg` 100 → 60 no mobile.

## 3. Radius (coleção `Radius`)

| Token | px | Uso |
|---|---|---|
| `radius/xs` | 2 | link da nav |
| `radius/sm` | 3 | botão, image badge, skip-link |
| `radius/md` | 5 | feature card, fotos (6×) |
| `radius/lg` | 8 | FilmCard, PremiumCard, logo de catálogo (4×) |
| `radius/pill` | 999 | filtro e badge (código usa 20px, visualmente idêntico nessas alturas) |
| `radius/full` | 50% → círculos | ícones, avatar, dots (10×) — no Figma é elipse, não token |

Consolidação: o `4px` da swatch bar → `radius/sm` (3).

## 4. Tipografia

Fontes: **Montserrat** (headings, `h1–h6` globais 700 / lh 1.2) e **Open Sans** (body, lh 1.6).
Observação: badge, label do counter, cargo do time e subtítulo do PremiumCard **não** definem `font-family` → saem em Open Sans.

| Text style | Fonte / peso | Desktop | Mobile (≤768) | Extras | Uso |
|---|---|---|---|---|---|
| `display/hero` | Montserrat 900 | 56 (3.5rem) | 32 (≤480: 27) | upper, lh 1.1 | HeroCarousel |
| `display/number` | Montserrat 800 | 48 | 35 | — | Counters (sufixo 32) |
| `heading/h1` | Montserrat 700 | 45 (2.8rem) | 32 | upper | PageHero |
| `heading/h2` | Montserrat 700 | 40 (2.5rem) | 29 (1.8rem) | upper | SectionTitle, CtaSection |
| `heading/h3` | Montserrat 700 | 35 (2.2rem) | 29 | — | ServiceShowcase |
| `heading/h4` | Montserrat 700 | 32 (2rem) | — | — | SectionTitle `category` |
| `heading/h5` | Montserrat 700 | 29 (1.8rem) | — | — | PremiumCard |
| `heading/h6` | Montserrat 700 | 26 (1.6rem) | 22 | — | FilmCard, ImageTitleGrid |
| `title/lg` | Montserrat 700 | 22 (1.4rem) | — | — | título da grade de cards |
| `title/md` | Montserrat 700 | 19 (1.2rem) | — | — | Feature, Team |
| `title/sm` | Montserrat 700 | 18 (1.1rem) | — | — | subseção do ServiceShowcase |
| `body/lg` | Open Sans 400 | 18 (1.1rem) | 15 | lh 1.6 | hero sub, CTA, PageHero (1.05 consolidado) |
| `body/md` | Open Sans 400 | 16 | — | lh 1.6 | base |
| `body/sm` | Open Sans 400 | 15 (0.95rem) | — | lh 1.6 | descrição, checklist |
| `body/xs` | Open Sans 400 | 14 (0.9rem) | — | lh 1.6 | card, footer (10×, o mais usado) |
| `caption` | Open Sans 400 | 13 (0.8rem) | — | lh 1.6 (`/italic` p/ notas) | notas, tabela (0.78 consolidado) |
| `label/button` | Montserrat 600 | 14 | 14 (≤480) | upper, ls 1 | Button |
| `label/nav` | Montserrat 500 | 14 (0.85rem) | 16 (drawer) | upper, ls 1 | Header |
| `label/chip` | Montserrat 600 | 13 | — | upper, ls 1 | filtro da galeria |
| `label/overline` | Montserrat 700 | 13 | — | upper, ls 1 | grupo do FilmCard (laranja), coluna do footer (16) |
| `label/eyebrow` | Open Sans 500 | 14 | — | upper, ls 2 | label do counter, cargo (ls 1) |
| `label/badge` | Open Sans 700 | 12 (0.75rem) | — | upper | badge, th |

Valores em px **arredondados** (desvio máx. 0,4px: 44.8→45, 35.2→35, 28.8→29, 25.6→26, 22.4→22, 19.2→19, 17.6→18, 15.2→15, 14.4→14, 13.6→14, 12.8→13).

## 5. Efeitos, layout e motion

Effect styles:

| Style | Valor | Uso |
|---|---|---|
| `shadow/sm` | 0 4 15 #000 10% | `--shadow-sm` — cards em repouso |
| `shadow/md` | 0 10 30 #000 15% | `--shadow` — feature card, hover de card |
| `shadow/lg` | 0 15 40 #000 20% | hover do feature card |
| `shadow/brand` | 0 5 20 laranja 40% | hover do Button primary |
| (local) | glow WhatsApp 0 4 15 verde 40% · drawer −5 0 30 #000 50% | não viram style |

Layout: container 1300 (wide 1380), gutter 20. Breakpoints: **480 / 768 / 1024** (principais), 900 (PremiumCard) e 1398 (grade do catálogo). Frames de tela: 1440 desktop, 390 mobile.

Motion (só documentação): `--transition` 0.3s ease (19×), `--ease-power3`; hovers sobem −2 (botão), −3 (social), −5 (FilmCard), −8 (feature).

## 6. Proposta extra: tipografia/espaçamento responsivos

Coleção `Responsive` com modos **Desktop / Mobile** contendo `font-size/*` e `section/*`; os text styles amarram o `fontSize` nessas variáveis. Assim a tela 390 troca de modo em vez de ter estilos `-mobile` duplicados.

## 7. Inventário de componentes

### Átomos / moléculas

| Componente | Variantes / props | Estados |
|---|---|---|
| **Button** | `variant` primary · outline · dark · `block` bool · `size` desktop · mobile · ícone à esquerda (bool + instance swap) | default · hover (−2px, sombra brand no primary) |
| **SectionTitle** | `variant` section · category · `align` center · left · `light` bool · texto opcional | — |
| **NavLink** | `context` desktop · drawer | default · hover · active |
| **FilterChip** | — | default · hover · active |
| **Badge** | ícone opcional (star, gem, layers, shield, tablet) | — |
| **CarouselControl** | `kind` hero (50, vidro) · fade (34, escuro) · `dir` prev · next | default · hover |
| **CarouselDots** | `kind` hero (12) · fade (8) | dot active |
| **SocialButton** | ícone (instance swap) | default · hover |
| **ChecklistItem** | `kind` showcase · card-benefit | — |
| **SpecTable** | linhas: header · body · highlight · swatch | — |
| **ShadeDot** | cor | — |
| **ImageBadge** | `content` text · logo | — |
| **IconCircle** | 70px laranja (Feature) | — |

### Cards

| Componente | Variantes / props | Estados |
|---|---|---|
| **FeatureCard** | ícone, título, texto | default · hover |
| **CounterItem** | número + sufixo + label | — |
| **TeamCard** | avatar 200 (borda 4 laranja), nome, cargo | — |
| **FilmCard** | header: título, subtítulo?, logo?, badge? · body: descrição?, benefits / groups / tables / swatches / shades, nota?, CTA (booleans) | default · hover (−5) |
| **PremiumCard** | `reversed` bool · `layout` desktop · mobile (empilhado) | default · hover |
| **GalleryCell** | — | default · hover (overlay laranja + zoom) |
| **ImageTitleItem** | título + imagem | — |

### Blocos / seções

| Bloco | Variantes |
|---|---|
| **Header** | desktop default · desktop scrolled · mobile fechado · mobile drawer aberto |
| **Footer** | desktop (4 col) · mobile (1 col) |
| **PageHero** | text · banner image · cover photo (+ faixa diagonal laranja) |
| **CtaSection** | com / sem contact info |
| **HeroCarousel** (slide) | desktop · mobile |
| **Counters**, **Features**, **TeamSection** (com/sem time de vendas), **GallerySection**/**Gallery2**, **PPFLogosSection** | desktop · mobile |
| **ServiceShowcase** (linha) | normal · reversed · `alt` bg · foto portrait |
| **CatalogBlock** | intro com carrossel · com logo · grade auto / 2 col / full · `alt` · `wide` |
| **Lightbox**, **WhatsAppFloat** | — |

Fora do Figma (só comportamento): FadeIn, RichText, AppImage, FadeCarousel (entra como CarouselControl + Dots).

## 8. Achados no caminho

1. **Contraste**: `text/muted` (#999) sobre branco = **2,85:1**, abaixo do AA (4,5:1) — usado em textos de 14–15px (Features, ServiceShowcase, notas). Sobre o azul passa (≈4,6:1). Vale decidir se o Figma documenta como está ou propõe um cinza mais escuro.
2. Dots e controles do hero usam `--gray-dark` sobre overlay azul — pouco contraste.
3. Hex soltos: `#333` no Header (= `--gray-dark`), `#000001` no ImageTitleGrid, `#25d366` no WhatsApp.
4. Comentário em `Button.tsx` desatualizado: diz "primary = vermelho, dark = preto", mas são laranja e azul.
5. Tamanhos mobile e paddings de seção estão espalhados em media queries, sem token — a coleção `Responsive` (§6) resolve no Figma e pode voltar ao código na Fase 5.

## 9. Adições durante a Fase 3 (componentes)

Ao construir os componentes apareceram valores sem token. Em vez de deixá-los soltos no Figma, viraram tokens:

| Tipo | Adicionado | Motivo |
|---|---|---|
| Spacing | `space/6`, `7`, `14`, `16`, `35`, `45` | Passos pontuais (subItems, nav link, badge, PremiumCard…) |
| Responsive | `button/padding-y` 14→12, `button/padding-x` 32→24 | Padding do Button cai no ≤480 — substitui uma variante de tamanho |
| Responsive | `size/carousel-control` 50→40 | Setas do HeroCarousel |
| Primitive / Semantic | `alpha/black-10`, `border/control`, `icon/body` | Borda e ícone dos controles do hero |
| Text styles | `heading/h2-strong`, `title/xs`, `caption/strong`, `label/column`, `label/role`, `label/subtitle` | `<strong>` do CTA, selo da foto, 1ª coluna das tabelas, títulos do footer, cargo da equipe, subtítulo do PremiumCard |
| Correção | `heading/h4` → UPPER | O título `category` herda o `uppercase` de `.wrap h2` |

Totais após a Fase 3: 120 variáveis, 29 text styles, 4 effect styles, 49 componentes/sets (100 variantes).

## 10. Ajustes descobertos na Fase 4 (validação contra o site)

| Ajuste | Por quê |
|---|---|
| `display/number` lh 1.2 → 1.6 | O número do contador é `div`, herda o line-height do body |
| `label/chip` lh → AUTO | `<button>` não herda line-height: usa `normal` |
| `font-size/body/lg` Mobile 15 → 18 | Só o subtítulo do hero encolhe no mobile (usa `body/sm`); CTA e PageHero mantêm 1.1rem |
| `font-size/display/hero` Mobile 32 → 27 | O modo Mobile representa a tela 390 (breakpoint ≤480) |
| SpecTableRow: colunas 4 e 5 | Tabelas reais têm 5 colunas (FX 5…FX 70, NeoCoat X…NL272) |
| PremiumCard: carrossel + até 6 benefícios | Setas/dots do FadeCarousel; cards com 3–6 itens |
| ImageTitleItem: proporção travada 1126:518 | Imagem segue a proporção natural (`height: auto`) |
| SectionTitle: texto com `maxWidth` | Era largura fixa de 600/700 — no mobile estourava a coluna |
| Footer: ritmo das listas | Cada `<li>` tem a altura de linha de 16px do body + margem também no último |
| Espaço entre PremiumCards = 60 | `gap: 30` da grade + `.card + .card { margin-top: 30px }` |

Validação final (altura total, tela montada × site): Home 1440 6931 × 6931 · Home 390 12058 × 12091 · PPF 1440 3895 × 3865 · Proteção Premium 1440 3670 × 3681.
