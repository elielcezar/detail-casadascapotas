# Cobertura do WordPress — o que falta

Quanto do conteúdo do site o cliente consegue editar, o que ainda não, e os
passos para fechar cada lacuna.

Os números vêm de [`scripts/auditar-cobertura.ts`](../scripts/auditar-cobertura.ts),
que percorre os dados reais de `src/data/` e classifica cada campo de texto.
**Rode o script depois de mexer no overlay** — se os números divergirem deste
documento, é este documento que está velho.

```bash
npx tsx scripts/auditar-cobertura.ts
```

Levantado em 20/09/2026, depois das Fases 0 a 5 e das correções da `/limpeza`
e da `/ppf`.

---

## Onde estamos

```
página                coberto  proposital   lacuna
--------------------------------------------------
/peliculas                 50         214       28
/limpeza                   39           3       12
/protecao-premium          24          12       29
/ppf                       16           2       19
/ (home)                  234           9       28
global                      9           1       12
--------------------------------------------------
TOTAL                     372         241      128
```

**Coberto** — o overlay lê do WordPress.
**Proposital** — fora do painel por decisão; ver a seção final.
**Lacuna** — texto que ninguém edita sem desenvolvedor.

Os 214 "proposital" de `/peliculas` são quase todos células de tabela de
especificação: 108 valores, 32 rótulos de linha, 29 cabeçalhos de coluna.
Elas mudam quando a 3M troca de linha, o que já exige desenvolvedor de
qualquer forma.

---

## As lacunas, por volume

| Qtd | Página | Campo |
|---|---|---|
| 14 | `/protecao-premium` | `cards[].images[].alt` |
| 12 | `/` | `serviceSections[].subSections[].items[]` |
| 10 | `/peliculas` | `cards[].title` |
| 10 | `/peliculas` | `cards[].subtitle` |
| 6 | global | `navItems[].label` |
| 4 | `/protecao-premium` | `cards[].title`, `cards[].subtitle`, `cards[].cta.label` |
| 3 | `/limpeza` | `cards[].title`, `cards[].subtitle`, `cards[].cta.label` |
| 3 | `/` | `serviceSections[].image.alt`, `link.label`, `primaryCta.label` |
| 3 | `/ppf` | `ppfLines[].title`, `ppfLines[].image.alt` |
| 1–2 | várias | títulos e descrições de seção, `imageBadge`, alts de imagem |

---

## Lacuna 1 — Título e subtítulo dos cards

**Prioridade: alta. É a mais barata de todas.**

30 textos entre as três páginas de catálogo. E o título **já está no
WordPress**: o seed grava `card.title` como título do post, que é o que o
cliente vê ao abrir o card. Ele só não é lido de volta.

Hoje o cliente edita o título no admin, salva, e o site continua mostrando o
título antigo — sem nenhum aviso. É pior que não ter o campo.

### Passos

1. Em `overlayCatalog()`, usar `stripHtml(wp.title.rendered)` como `title`
   quando não estiver vazio. Exige incluir `title` no `_fields` da busca de
   `card_catalogo`.
2. Acrescentar um campo `subtitulo` ao grupo ACF dos cards.

**Esforço:** uma hora, e resolve uma incoerência que o cliente vai notar.

---

## Lacuna 2 — `subSections` no bloco de limpeza da home

**Prioridade: alta.** 12 itens em duas subseções ("Limpeza Clássica" e
"Limpeza Técnica"), visíveis na home e sem nenhum campo no painel.

É o terceiro caso do mesmo padrão — depois dos `groups` dos cards e dos
blocos da `/ppf`. O mecanismo existe, mas não alcança onde o conteúdo está.

### Passos

Mesmo formato do repeater `grupos` que já resolveu os cards de limpeza:
título do grupo + itens um por linha, dentro do repeater `secoes_servico` da
Home.

**Esforço:** uma hora. O mapeamento é idêntico ao de `grupos`.

---

## Lacuna 3 — Texto alternativo das imagens

**Prioridade: média. É SEO e acessibilidade, não estética.**

- 14 em `/protecao-premium` (galerias dos cards)
- 3 na home, 3 na `/ppf`, 2 em `/peliculas`, mais os logos

Os alts da galeria e da equipe **já vêm do WordPress**, porque são imagens
da biblioteca de mídia. Estes não, porque as imagens continuam em
`public/img` — e alt não existe sem a imagem ao lado.

### Passos

Duas opções, e a escolha depende de quanto você quer migrar:

- **Migrar essas imagens para a biblioteca de mídia.** Aí o alt vem junto,
  de graça, e o cliente edita na mesma tela em que troca a foto.
- **Criar campos de alt separados.** Mais barato agora, mas cria dois
  lugares para editar a mesma imagem — e eles saem de sincronia.

Recomendo a primeira, quando houver motivo para migrar as imagens.

---

## Lacuna 4 — Rótulos de botão e `primaryCta.label`

**Prioridade: média.**

A **mensagem** do WhatsApp já é editável; o **rótulo do botão** não. São 11
textos entre os cards e os blocos de serviço.

Vale notar que essas mensagens são o texto que chega ao vendedor. Se ninguém
as revisou, é um bom momento — elas são lidas por gente, não por máquina.

### Passos

Acrescentar `cta_label` ao grupo dos cards e `botao_label` ao repeater de
blocos de serviço. Mapeamento direto, sem estrutura nova.

**Esforço:** uma hora.

---

## Lacuna 5 — Títulos e descrições de seção

**Prioridade: baixa.**

Cada seção de catálogo tem `titleStart`, `titleHighlight` e `description`
fora do overlay — só os cards dentro dela entraram.

```
films.ts      "Linha 3M", "Película Solarium"
cleaning.ts   "Nossos Pacotes"
premium.ts    "Nano Coatings"
```

Mudam quando o cliente troca de fornecedor. Quando isso acontece, a foto e o
logo mudam junto, o que já exige desenvolvedor.

**Esforço:** algumas horas. Avalie se compensa.

---

## Lacuna 6 — `/ppf`: blocos de cobertura e a nota do Kit Interno

**Prioridade: baixa.**

A `/ppf` foi coberta nos três blocos de serviço, mas ficaram de fora:

- `ppfLines[].title` — os três blocos de cobertura (PPF Frontal, Quina e
  Concha, Full PPF): 3 títulos e 3 alts
- `kitInterno.note` — **o tipo `ServiceSection` tem um campo `note` que eu
  não incluí no grupo ACF da `/ppf`**. É um campo só, e fecha a cobertura
  daquela página

O `note` é o mais fácil e o mais claramente esquecido: acrescente `nota` ao
repeater `secoes_servico` do grupo *PPF — Conteúdo* e mapeie no overlay.

---

## Lacuna 7 — Menu e dados da empresa

**Prioridade: baixa. Provavelmente não fazer.**

O menu ([`navigation.ts`](../src/data/navigation.ts), 6 itens) e
`site.name`, `site.shortName`, `site.description`, `site.address` estão no
código.

Menu editável costuma dar errado: o cliente aponta para uma rota que não
existe e a página dá 404 em produção. Se for fazer, use um select das rotas
existentes, nunca campo de texto livre.

Do que muda de verdade — telefone, e-mail, horário, redes — **tudo já é
editável**.

---

## O que fica no código, de propósito

Não é lacuna. É a fronteira da "camada segura", e a decisão foi consciente:

| O quê | Por quê |
|---|---|
| Tabelas de especificação (214 textos) | Valor errado numa célula quebra a tabela, e mudam ~1×/ano |
| Amostras de cor (`swatches`) | Hexadecimal inválido quebra o layout — hoje nenhum card usa |
| Logos de marca e dimensões | Trocar logo exige recorte e compressão |
| Âncoras, lado da imagem, fundo alternado | Estrutura, não conteúdo |
| Banners do hero | O select escolhe entre os existentes; upload livre vira foto de 4 MB no topo |
| Pares de botões do hero | Rota inexistente = 404 em produção |
| `site.url` | Alimenta canonical e sitemap; precisa do valor no build |

O critério: **se o cliente preencher errado, o site fica feio ou quebra?**
Se quebra, fica no código.

---

## Ordem sugerida

1. **Lacuna 1** — título dos cards. O campo já existe no admin e não faz
   nada; isso é pior que não existir.
2. **Lacuna 2** — `subSections` da home. Mesmo mapeamento dos `groups`.
3. **Lacuna 6, a parte do `note`** — um campo, fecha a `/ppf`.
4. Pergunte ao cliente o que ele sentiu falta depois de um mês usando o
   painel. A resposta será melhor que este documento.
5. O resto, conforme a resposta.

Antes de cada uma, aplique o mesmo critério: **com que frequência isso
muda?** Campo editável que ninguém usa é mais uma interface para o cliente
errar.

---

## Um padrão que se repetiu três vezes

Os `groups` dos cards, os blocos da `/ppf` e os `subSections` da home caíram
todos no mesmo erro: **o overlay foi desenhado a partir do tipo mais comum,
e o conteúdo real estava numa variação do tipo**.

Cards de limpeza não usam `benefits`, usam `groups`. A `/ppf` não tem cards,
tem `ServiceSection`. O bloco de limpeza da home não usa `checklist`, usa
`subSections`.

Em todos os casos o build passava, o admin abria e o site funcionava — só
que o campo aparecia vazio e ninguém entendia por quê. A varredura existe
para não precisar descobrir isso uma página por vez.
