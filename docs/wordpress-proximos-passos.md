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

Atualizado em 20/09/2026, depois do lote que cobriu `/limpeza`, `/ppf`,
nomes dos cards, subseções da home e SEO por página.

---

## Onde estamos

```
página                coberto  proposital   lacuna
--------------------------------------------------
/peliculas                 70         214        8
/limpeza                   48           3        3
/protecao-premium          36          12       17
/ppf                       17           2       18
/ (home)                  248           9       14
global                      9           1       13
SEO (todas)                10           0        0
--------------------------------------------------
TOTAL                     438         241       73
```

**Coberto** — o overlay lê do WordPress.
**Proposital** — fora do painel por decisão; ver a seção final.
**Lacuna** — texto que ninguém edita sem desenvolvedor.

Os 214 "proposital" de `/peliculas` são quase todos célula de tabela de
especificação: 108 valores, 32 rótulos de linha, 29 cabeçalhos de coluna.
Mudam quando a 3M troca de linha, o que já exige desenvolvedor.

### O que mudou no lote de 20/09

Cobertura foi de **372 para 438**; lacunas de **128 para 73**.

| Entregue | Onde |
|---|---|
| Grupos de itens dos cards (27 textos) | `/limpeza` |
| Três blocos de serviço | `/ppf` |
| Nome, subtítulo e texto do botão dos cards | as três páginas de catálogo |
| Subseções dos blocos de serviço (12 itens) | `/` |
| Nota de rodapé dos blocos de serviço | `/` e `/ppf` |
| Título e descrição para o Google | as 5 páginas |

Páginas criadas no WordPress no processo: PPF (261), Películas (276),
Limpeza (277), Proteção Premium (278).

---

## Lacuna 1 — Texto alternativo das imagens

**Prioridade: alta agora que é a maior.** Cerca de 26 textos, sendo 14 nas
galerias dos cards de `/protecao-premium`.

Não é estética: é o que leitores de tela anunciam e o que o Google usa para
entender a imagem.

Os alts da galeria e da equipe **já vêm do WordPress**, porque são imagens da
biblioteca de mídia. Estes não, porque as imagens continuam em `public/img` —
e alt não existe sem a imagem ao lado.

### Passos

Duas opções, e a escolha depende de quanto se quer migrar:

- **Migrar essas imagens para a biblioteca de mídia.** O alt vem junto, de
  graça, e o cliente edita na mesma tela em que troca a foto.
- **Criar campos de alt separados.** Mais barato agora, mas passa a haver
  dois lugares para editar a mesma imagem, e eles saem de sincronia.

Recomendo a primeira. É a decisão que está travando esta lacuna.

---

## Lacuna 2 — Rótulos de botão dos blocos de serviço

**Prioridade: média.** 8 textos: `primaryCta.label`, `primaryCta.whatsappMessage`
e `link.label` nos blocos da home e da `/ppf`.

Os cards de catálogo já tiveram o rótulo do botão coberto neste lote; os
blocos de serviço ficaram para trás. Mesma inconsistência que motivou aquela
correção: renomear um bloco deixa o botão dizendo o nome antigo.

### Passos

Acrescentar `botao_label`, `botao_mensagem` e `link_label` ao repeater
`secoes_servico`, nos grupos da Home e da PPF. Mapeamento direto.

**Esforço:** uma hora.

---

## Lacuna 3 — Títulos e descrições de seção de catálogo

**Prioridade: baixa.** 10 textos.

```
films.ts      "Linha 3M", "Película Solarium"  + 2 descrições
cleaning.ts   "Nossos Pacotes"                 + 1 descrição
premium.ts    "Nano Coatings"                  + 1 descrição
```

Mudam quando o cliente troca de fornecedor — e aí a foto e o logo mudam
junto, o que já exige desenvolvedor.

---

## Lacuna 4 — `/ppf`: blocos de cobertura e selos

**Prioridade: baixa.** 3 títulos de cobertura (PPF Frontal, Quina e Concha,
Full PPF), 2 alts de logo, 1 selo sobre a foto.

Cobrir os títulos de cobertura exigiria acrescentar `id` ao tipo `ppfLines`,
que hoje não tem. Custo maior que o retorno para três textos que não mudam.

---

## Lacuna 5 — Menu e dados da empresa

**Prioridade: baixa. Provavelmente não fazer.** 13 textos.

O menu ([`navigation.ts`](../src/data/navigation.ts), 6 itens) e
`site.name`, `site.shortName`, `site.description`, `site.address`,
`site.parentWebsite`, `site.parentWebsiteUrl`.

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

1. **Decidir sobre a Lacuna 1** — migrar as imagens para a biblioteca de
   mídia ou não. É a maior lacuna e a decisão trava as duas saídas.
2. **Lacuna 2** — rótulos dos botões, pela mesma lógica que motivou a
   correção dos cards.
3. Perguntar ao cliente o que ele sentiu falta depois de um mês usando o
   painel. A resposta será melhor que este documento.
4. O resto, conforme a resposta.

Antes de cada uma, aplique o critério: **com que frequência isso muda?**
Campo editável que ninguém usa é mais uma interface para o cliente errar.

---

## Pendências de infraestrutura e entrega

Não são cobertura de conteúdo. São itens de servidor e de handover que
ficaram em aberto quando a integração foi concluída, em 20/09/2026.

### Migrar o WordPress para o subdomínio do cliente

Hoje o admin vive em `detail.ecwd.cloud`, um VPS Hostinger que **não é do
cliente**. Foi decisão consciente para não travar o projeto, com a migração
adiada.

Importa porque a URL de cada imagem fica **gravada no HTML publicado**: a
galeria e a equipe do site dependem desse domínio estar no ar.

O caminho já está preparado — a origem das imagens sai de
`NEXT_PUBLIC_WP_MEDIA_URL`, então migrar é:

1. Mover a instalação para `admin.casadascapotascuritiba.com`
2. `search-replace` no banco do WordPress, trocando a origem dos anexos
3. Definir o secret `WP_MEDIA_URL` no GitHub e atualizar `WP_API_URL`
4. Atualizar o `hostname` em `remotePatterns` no `next.config.ts`
5. Rebuild

**Nenhum componente muda.** A variável existe exatamente para isso.

Existe uma pasta `admin.casadascapotascuritiba.com/` no servidor do cliente
desde 02/09/2026, anterior a este trabalho — confira o que há nela antes de
usar o subdomínio.

### Verificar o `malware.txt` no servidor do cliente

Há um arquivo `malware.txt` na raiz da conta cPanel, com dono `root` e data
de 26/08/2026. O formato é típico de scanner do provedor (Imunify360 ou
similar). Não foi investigado. Leia antes de assumir que não é nada.

### Trocar credenciais ao entregar o painel

Duas, e as duas circularam durante o desenvolvimento:

- **Senha do FTP.** Trafega em texto puro a cada deploy, porque o
  certificado FTPS do HostGator não cobre o domínio do cliente — a decisão e
  o motivo estão registrados em `.github/workflows/deploy.yml`.
- **Token do GitHub.** Fine-grained, restrito a `detail-casadascapotas` com
  `Contents: Read and write`, guardado em texto no banco do WordPress.
  **Expira** — anote a data. Quando expirar, o plugin passa a registrar erro
  HTTP no log e os deploys automáticos param sem que ninguém perceba, porque
  o cron de backup 2×/dia continua funcionando.

### Compartilhar o material de treinamento

O guia visual em [`../Nextjs-to-WP/`](../Nextjs-to-WP/) foi publicado como
artefato privado. A equipe só abre depois de compartilhado pelo menu Share
da página.

---

## Um padrão que se repetiu três vezes

Os `groups` dos cards, os blocos da `/ppf` e os `subSections` da home caíram
todos no mesmo erro: **o overlay foi desenhado a partir do tipo mais comum, e
o conteúdo real estava numa variação do tipo**.

Cards de limpeza não usam `benefits`, usam `groups`. A `/ppf` não tem cards,
tem `ServiceSection`. O bloco de limpeza da home não usa `checklist`, usa
`subSections`.

Em todos os casos o build passava, o admin abria e o site funcionava — só que
o campo aparecia vazio e ninguém entendia por quê. A varredura existe para
não precisar descobrir isso uma página por vez.

E uma variação do mesmo: o **nome do card** já estava no WordPress como
título do post, e não era lido de volta. O cliente editava, salvava, e o site
continuava mostrando o antigo. Campo que mente é pior que campo que não
existe — vale procurar por outros antes de acrescentar campos novos.
