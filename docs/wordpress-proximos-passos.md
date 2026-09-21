# Cobertura do WordPress — o que falta

Levantamento do que o cliente consegue editar hoje, o que ainda não, e os
passos para fechar cada lacuna.

Feito em 20/09/2026, depois de concluídas as Fases 0 a 5 da integração. O
processo completo está em [replicar-integracao-wordpress.md](replicar-integracao-wordpress.md)
e em [../Nextjs-to-WP/README.md](../Nextjs-to-WP/README.md).

---

## Estado atual, por página

| Página | Editável no WordPress | Ainda no código |
|---|---|---|
| `/` | hero, diferenciais, contadores, 3 blocos de serviço, galeria, equipe, contatos | títulos das seções Galeria e Equipe, texto do CTA final |
| `/peliculas` | descrição, benefícios, nota e mensagem dos 10 cards | topo da página, títulos e descrições das 2 seções, fotos de seção, logo 3M, CTA final, SEO |
| `/limpeza` | os 3 cards | topo, título e descrição da seção, CTA final, SEO |
| `/protecao-premium` | os 4 cards | topo, título e descrição da seção, CTA final, SEO |
| `/ppf` | **só o bloco de contato** | **todo o resto** |
| Global | telefone, WhatsApp, e-mail, horário, redes | menu, títulos de coluna do rodapé, nome e endereço da empresa |

---

## Lacuna 1 — A página `/ppf` está praticamente descoberta

**Prioridade: alta.** É a única página onde o cliente não consegue mudar
nenhum texto.

### Por que aconteceu

A Fase 4 cobriu "cards de catálogo", e a `/ppf` não tem nenhum card:
[`ppfSections`](../src/data/ppf.ts) é um array vazio. Os três blocos da
página são do tipo `ServiceSection` — o mesmo dos blocos da home — mas moram
em `ppf.ts`, fora do array `serviceSections` que o overlay da home percorre.
O mecanismo existe e simplesmente não alcança ali.

`PpfPage` nem é `async`: não chama o overlay em momento nenhum.

### O que ficaria editável

Título, descrição e checklist de `aboutPpf`, `parabrisa` e `kitInterno`.
Continuariam no código: as fotos, o lado em que cada uma aparece, os logos
das marcas e os blocos de cobertura (`ppfLines`).

### Passos

1. Acrescentar `id` aos três blocos em [`src/data/ppf.ts`](../src/data/ppf.ts):
   `ppf-sobre`, `ppf-parabrisa`, `ppf-kit-interno`. Torne o campo
   obrigatório no tipo `ServiceSection` — assim o compilador acusa qualquer
   bloco esquecido.
2. Criar a página `PPF` no WordPress e anotar o ID em `WP_PAGE_IDS`.
3. Criar o grupo ACF *PPF — Conteúdo*, com um repeater igual ao
   `secoes_servico` da Home: select `id_secao` com as três opções acima,
   mais `titulo_inicio`, `titulo_destaque`, `descricao` e `checklist`.
4. Em [`src/lib/content.ts`](../src/lib/content.ts), generalizar a função que
   já faz isso para a home — ela recebe uma lista de `ServiceSection` e um
   mapa de overrides. Hoje está amarrada ao array da home.
5. Tornar `PpfPage` async e aplicar o overlay aos três blocos.
6. Estender o script de seed para popular a nova página.

**Esforço:** meio dia. O grosso é o grupo ACF; o código é reaproveitado.

---

## Lacuna 2 — Topo e CTA final de todas as páginas internas

**Prioridade: média.**

Os textos do `PageHero` e do `CtaSection` estão escritos direto nos arquivos
de página — não em `src/data/`. São quatro páginas × dois blocos:

```
src/app/peliculas/page.tsx:20-22, 34-38
src/app/limpeza/page.tsx:20-22, 28-32
src/app/ppf/page.tsx:20-22, 33-37
src/app/protecao-premium/page.tsx:21-23, 37-41
src/app/page.tsx:26-31        (só o CTA; a home não tem PageHero)
```

Inclui as mensagens pré-preenchidas do WhatsApp, que são o texto que chega
ao vendedor. Vale conferir com o cliente se elas estão como ele quer — é o
tipo de coisa que ninguém revisa e todo mundo lê.

### Passos

1. Mover esses textos dos arquivos de página para `src/data/`, um objeto por
   página, com `id` estável (`hero-peliculas`, `cta-peliculas`, …). Isso é
   refatoração pura e deve ser um commit separado, sem WordPress no meio.
2. Criar um grupo ACF por página, com os campos de topo e de CTA.
3. Aplicar o overlay nas páginas, que já serão async nessa altura.

**Esforço:** um dia, sendo metade a refatoração do passo 1.

Faça o passo 1 mesmo que decida não seguir para o WordPress. Texto de
conteúdo em arquivo de componente é dívida de qualquer forma.

---

## Lacuna 3 — Títulos de seção dos catálogos

**Prioridade: baixa.**

Cada seção de catálogo tem `titleStart`, `titleHighlight` e `description`
que não entraram no overlay — só os cards dentro dela entraram.

```
films.ts:11-12    "Linha 3M"
films.ts:172-173  "Película Solarium"
cleaning.ts:9-10  "Nossos Pacotes"
premium.ts:17-18  "Nano Coatings"
```

São 4 títulos e 4 descrições. Mudam quando o cliente troca de fornecedor —
raro, e quando acontece a foto e o logo mudam junto, o que já exige
desenvolvedor.

### Passos

1. Dar `id` às seções em `CatalogSection`.
2. Criar o CPT `secao_catalogo` ou acrescentar um repeater no grupo da
   página correspondente.
3. Estender `overlayCatalog()` para tratar o nível da seção, não só o dos
   cards.

**Esforço:** algumas horas. Avalie se compensa antes de fazer.

---

## Lacuna 4 — Títulos da Galeria e da Equipe na home

**Prioridade: baixa.**

```
src/components/home/GallerySection.tsx:21-23   "Nosso Portfólio"
src/components/shared/TeamSection.tsx:45-47    "Equipe Comercial"
src/components/shared/TeamSection.tsx:54-56    "Equipe Técnica"
```

O conteúdo das duas seções já vem do WordPress; só os títulos não.
Incoerência pequena, mas é exatamente o tipo de coisa que o cliente pergunta:
*"consigo mudar as fotos mas não o título?"*

### Passos

Acrescentar quatro campos ao grupo *Home — Conteúdo* (título e texto de cada
seção) e passá-los por prop. São componentes de servidor, então o overlay é
direto.

**Esforço:** uma hora.

---

## Lacuna 5 — SEO por página

**Prioridade: média, se houver alguém cuidando de SEO.**

O `title` e a `description` de cada página estão em `export const metadata`
no próprio arquivo. Quem trabalha SEO costuma querer mexer nisso sem abrir
pull request.

### Passos

Acrescentar `seo_titulo` e `seo_descricao` ao grupo ACF de cada página e
gerar o `metadata` a partir do WordPress:

```ts
export async function generateMetadata(): Promise<Metadata> {
  const wp = await getPageSeo(WP_PAGE_IDS.peliculas);
  return {
    title: wp.seo_titulo || "Catálogo de Películas",
    description: wp.seo_descricao || "…",
  };
}
```

Mantenha o fallback no código: `metadata` vazio é pior que `metadata`
desatualizado.

**Atenção:** `site.url` **não** deve ir para o WordPress. Ele alimenta
canonical, sitemap e Open Graph, e precisa do valor no momento do build —
não pode depender de alguém não ter apagado um campo no admin.

---

## Lacuna 6 — Menu e rodapé

**Prioridade: baixa. Provavelmente não fazer.**

O menu ([`navigation.ts`](../src/data/navigation.ts), 7 itens) e os títulos
de coluna do rodapé estão no código.

Menu editável é tentador e costuma dar errado: o cliente aponta para uma rota
que não existe e a página dá 404 em produção. Se for fazer, use um select das
rotas existentes, nunca campo de texto livre.

Do rodapé, o que muda de verdade — telefone, e-mail, horário, redes — **já é
editável**. Os títulos de coluna ("Serviços", "Links Úteis", "Contato") não
mudam.

---

## O que deve continuar no código, de propósito

Não é lacuna. É a fronteira da "camada segura", e mexer nela foi decisão
consciente:

- Tabelas de especificação das películas (`SpecTable`)
- Bolinhas de tonalidade (`Shade`) e amostras de cor (`swatches`)
- Grupos de itens dos cards (`ItemGroup`)
- Logos de marca, com suas dimensões e variantes
- Âncoras das seções, lado da imagem, fundo alternado, proporção das fotos
- Banners do hero (o select do admin escolhe entre os que existem)
- Pares de botões do hero (`heroButtonPresets`)
- `site.url`

O critério: **se o cliente preencher errado, o site fica feio ou quebra?**
Se quebra, fica no código.

---

## Ordem sugerida

1. **Lacuna 1** (`/ppf`) — é a única página realmente descoberta
2. **Lacuna 2, passo 1** — tirar texto de conteúdo dos arquivos de página,
   independentemente do WordPress
3. Perguntar ao cliente o que ele sentiu falta depois de um mês usando o
   painel. A resposta costuma ser melhor que este documento.
4. O resto, conforme a resposta

Antes de cada uma, aplique o mesmo critério da integração original: **com que
frequência isso muda?** Campo editável que ninguém usa é interface a mais
para o cliente errar.
