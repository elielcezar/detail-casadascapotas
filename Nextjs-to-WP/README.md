# Next.js → WordPress

Como dar um painel de conteúdo ao cliente sem abrir mão de um site estático.

Material de treinamento da equipe. Escrito a partir de uma integração real,
concluída e em produção — os números, os erros e os tempos aqui são os que
aconteceram, não exemplos.

---

## O problema que isto resolve

Você entrega um site em Next.js com `output: "export"`. Rápido, barato de
hospedar, sem servidor para manter. O cliente adora — até querer trocar uma
foto.

A partir daí existem três saídas ruins:

1. **O cliente liga toda vez.** Você vira suporte vitalício de um projeto
   fechado.
2. **Você abandona o estático** e monta WordPress tradicional. Perde
   performance, ganha manutenção de servidor e superfície de ataque.
3. **Você entrega um painel meia-boca**, feito às pressas, que o cliente
   quebra na primeira semana.

A quarta saída é esta: o WordPress vira **só um painel de administração**.
Ele não serve nenhuma página ao público. O Next.js lê o conteúdo dele
durante o build e publica HTML estático. Quando o cliente clica em
"Publicar", um webhook dispara um novo build, e o site atualiza sozinho em
3 a 5 minutos.

O visitante nunca fala com o WordPress. Não há PHP em produção, não há banco
de dados na frente do usuário, e o site continua sendo arquivos estáticos.

---

## Quando usar — e quando não

**Use quando:** o site é majoritariamente estável e algumas áreas mudam com
frequência (galeria, equipe, novidades, preços visíveis, contatos).

**Não use quando:**

- O conteúdo muda a cada minuto. Rebuild de 3–5 minutos não serve para isso.
- O site precisa de busca, login ou carrinho. Isso pede servidor.
- O cliente não vai editar nada. Aí é complexidade sem retorno — mantenha os
  textos no código.
- O projeto tem uma semana de prazo. Este setup leva de 2 a 4 dias bem
  feitos, e a Fase 1 depende de acesso à hospedagem do cliente.

---

## Arquitetura

```
        WordPress                              Next.js
   admin.dominio.com.br                    repositório no GitHub
  ┌──────────────────────┐              ┌────────────────────────┐
  │ plugin headless      │              │ src/lib/wordpress.ts   │ busca
  │  (fecha o frontend)  │              │ src/lib/content.ts     │ overlay
  │                      │   REST API   │ src/data/*.ts          │ padrões
  │ CPTs + campos ACF    │ ───────────► │                        │
  │                      │  (no build)  │ .github/workflows/     │ deploy
  │ plugin deploy-trigger│ ──webhook──► │                        │
  └──────────────────────┘              └────────────────────────┘
                                                    │
                                                    │ FTP
                                                    ▼
                                            hospedagem estática
                                             dominio.com.br
```

Três coisas que valem ser ditas em voz alta:

- **A REST API só é consultada durante o build.** Nenhuma requisição sai do
  navegador do visitante. Por consequência, **CORS não participa desta
  integração** — é restrição de navegador, e não há navegador envolvido.
- **O WordPress pode ficar em qualquer lugar.** Servidor diferente, provedor
  diferente, domínio diferente. Ele só precisa responder HTTP no momento do
  build.
- **Se o WordPress cair, o site continua no ar.** O que cai é a capacidade de
  publicar mudanças.

---

## A decisão que vem primeiro

Antes de escrever uma linha, decida **o que vai para o WordPress**. É a
decisão mais cara de reverter e a que mais gente erra.

A tentação é mandar tudo. Não faça.

Conteúdo muito estruturado — tabelas de especificação técnica, variantes de
cor, flags de layout — vira repeater dentro de repeater dentro de repeater no
ACF. O resultado é uma interface **pior que editar o arquivo TypeScript**,
que o cliente não entende e consegue quebrar sem perceber.

Decida por **frequência de mudança**, não por "é tecnicamente possível":

| Muda | Exemplos | Vai para o WP? |
|---|---|---|
| Toda semana | galeria de trabalhos, novidades | **sim** |
| Todo mês | equipe, textos de seção | **sim** |
| Raro, mas urgente | telefone, WhatsApp, e-mail, horário | **sim**, é barato |
| Uma vez por ano | tabelas técnicas de fabricante | **não** |
| Quase nunca | ordem das seções, âncoras, layout | **não** |

No projeto que originou este material, isso significou: 7 categorias de
galeria (163 fotos), 9 pessoas na equipe, 9 campos de contato, os textos da
home e os textos de 17 cards de catálogo foram para o WordPress. As tabelas
de especificação, as amostras de cor e toda a estrutura de layout ficaram no
código.

A pergunta que resolve casos duvidosos: **se o cliente preencher isso
errado, o site fica feio ou quebra?** Se quebra, fica no código.

---

## O padrão de overlay

É o conceito central. Sem ele, "migrar para o WordPress" vira um salto sem
rede.

> `src/data/*.ts` define **estrutura e valores padrão**.
> O WordPress fornece **override** apenas dos campos editáveis.
> O casamento é por um `id` estável.

Três regras que valem em todo lugar:

### 1. Falha de rede quebra o build. De propósito.

```ts
throw new Error(
  `[WordPress] ${path} falhou após N tentativas. ` +
  `Build abortado de propósito — publicar com dados vazios apagaria o conteúdo.`
);
```

Nunca devolva `[]` quando a API falhar. Em site estático, um build que passa
com dados vazios **publica páginas vazias e apaga o conteúdo do ar**. Build
quebrado é recuperável em minutos; deploy vazio não.

Isso não é teórico: durante a implantação deste projeto, o WordPress ficou
inalcançável por ~3 minutos no meio de um deploy real. O build abortou com
exit 1, o deploy não aconteceu, e o site no ar ficou intacto.

### 2. Campo vazio usa o padrão do código.

Diferente de falha. É o que permite migrar uma seção por vez sem que as
outras sumam, e o que protege o site quando alguém esvazia um campo no
admin por engano.

Diga isso ao cliente com estas palavras: *"apagar o texto no painel não
apaga do site — volta o texto original"*.

### 3. Todo item editável precisa de um `id` estável.

E esse `id` deve ser **obrigatório no TypeScript**:

```ts
export interface CatalogCard {
  /** Liga este card ao conteúdo no WordPress. Nunca renomeie nem reutilize. */
  id: string;
  title: string;
  // ...
}
```

Obrigatório porque aí o compilador acusa qualquer item que você esqueceu.
Ao adicionar `id` aos 17 cards do projeto original, tornar o campo
obrigatório foi o que garantiu que nenhum ficasse de fora — se ficasse, o
card cairia silenciosamente no texto padrão para sempre.

### Como fica o código

```ts
export async function overlayCatalogo(secoes: Secao[]): Promise<Secao[]> {
  const porId = await getOverrides();        // lança exceção se a API falhar

  return secoes.map((secao) => ({
    ...secao,
    cards: secao.cards.map((card) => {
      const wp = porId.get(card.id);
      if (!wp) return card;                  // sem correspondente: intacto

      return {
        ...card,
        descricao: wp.descricao?.trim() || card.descricao,   // vazio → padrão
        beneficios: wp.beneficios.length ? wp.beneficios : card.beneficios,
      };
    }),
  }));
}
```

---

## As seis fases

**A ordem importa.** Faça o WordPress inteiro antes de tocar no Next.js. Sem
CPTs e ACF prontos, o build falha e você perde tempo diagnosticando o lado
errado.

### Fase 0 — Pré-requisitos

- Domínio final e onde o WordPress vai morar
- Credenciais de deploy da hospedagem
- **Licença ACF PRO** — Repeater, Gallery e Options Page são recursos pagos
- **Quais pastas do servidor não podem ser apagadas** (volte a isso na Fase 5)

Aproveite e confira se o domínio de SEO no código é o real. Sites entregues
com placeholder em `canonical`, `sitemap` e Open Graph são mais comuns do que
deveriam — foi o caso aqui, e a correção é uma linha.

### Fase 1 — WordPress

Instale em subdomínio dedicado, com permalinks "bonitos" (a REST API
precisa deles).

**Registre os CPTs em código, num mu-plugin.** Não pela interface:

```php
register_post_type('galeria_categoria', [
    'public'       => true,
    'show_in_rest' => true,      // sem isto, não existe para a REST API
    'rest_base'    => 'galeria_categoria',
    'supports'     => ['title', 'page-attributes'],
]);
```

Duas razões para mu-plugin: fica versionado no repositório, e **não pode ser
desativado por engano** — desativar faria o conteúdo sumir do site no build
seguinte.

`page-attributes` é obrigatório em todo CPT que o site ordena por
`menu_order`. Sem ele, a REST API rejeita `orderby=menu_order` com HTTP 400.

**Exporte os grupos ACF como JSON e versione.** Clicar campo a campo na
interface convida a erro de digitação em `name` — e `name` é a interface com
o TypeScript. Um typo ali **não dá erro**: só faz o conteúdo voltar
silenciosamente ao padrão do código. Vale escrever um teste que compare os
`name` do JSON com os campos das interfaces.

Teste cada endpoint no navegador antes de seguir:

```
https://admin.dominio/wp-json/wp/v2/<rest_base>?acf_format=standard
```

`acf_format=standard` faz o ACF devolver URLs e valores resolvidos em vez de
IDs. Campos de imagem e galeria dependem disso.

Anote os IDs das páginas de configuração — são buscadas por ID, não por
slug. **Comunique ao cliente: renomear a página é seguro, excluir e recriar
quebra o build.**

### Fase 2 — Camada de dados

Dois arquivos, com responsabilidades separadas:

- `src/lib/wordpress.ts` — fala com a API. Busca, tipos, retentativas.
- `src/lib/content.ts` — decide o que sobrescreve o quê. O overlay.

Na camada de busca, três coisas que não são opcionais:

```ts
// 1. User-Agent próprio: o fetch do Node manda "node", que WAFs barram
headers: { "User-Agent": "MeuProjeto-Build/1.0" }

// 2. Retentativas com espera crescente, contra bloqueio temporário
const RETRY_DELAYS_MS = [2000, 5000, 15000, 30000];

// 3. Nenhuma opção de cache no fetch — `no-store` e `revalidate` são
//    incompatíveis com output: export
```

**Normalize a origem das imagens por variável de ambiente.** A URL de cada
anexo fica gravada no HTML publicado; se o WordPress mudar de domínio
depois, você quer trocar uma variável e rebuildar, não mexer em componente.

### Fase 3 — Seed

Não cadastre conteúdo à mão. Escreva um script que lê os arquivos de dados e
cria tudo via REST com Application Password.

No projeto original: 172 imagens e 33 posts, em ~6 minutos. À mão seria um
dia de trabalho e vários erros de digitação.

O script precisa ser:

- **Idempotente** — manifesto local dos uploads e busca por título antes de
  criar. Se cair no upload 150, rodar de novo continua de onde parou.
- **Educado** — pausa entre uploads. Rajada leva bloqueio de WAF.
- **Verificável** — um modo `--dry-run` que confere os caminhos dos arquivos
  sem escrever nada.

Detalhe que pega todo mundo: campo de imagem do ACF recebe **ID de anexo** na
escrita, mas devolve **objeto completo** na leitura com `acf_format=standard`.

### Fase 4 — Componentes

Um por vez, do menos arriscado ao mais. Cada etapa é um commit que passa no
build sozinho.

Ordem que funcionou: galeria → equipe → contatos → cards → home. A home por
último porque é a que tem mais campos.

Componente de cliente (`"use client"`) não pode buscar no build — receba por
prop de um componente de servidor. Quando vários componentes leem a mesma
página do WordPress, envolva a função em `cache()` do React: uma requisição
em vez de cinco.

### Fase 5 — Deploy

Quatro coisas no workflow que não são firula:

| Item | Por quê |
|---|---|
| `concurrency` + `cancel-in-progress: false` | Dois deploys simultâneos se derrubam no FTP. Cancelar no meio deixa o servidor em estado parcial |
| `timeout` alto | O export gera centenas de arquivos pequenos; o padrão estoura |
| `exclude` completo | A action **apaga** do servidor o que não existe no build |
| Step de keepalive | O GitHub desativa workflows agendados após 60 dias sem commits |

**Antes do primeiro deploy real, rode com `dry-run: true` e leia o log.** É a
única forma de conferir o diretório de destino, porque o GitHub não devolve o
valor de um secret. O que você quer ver:

```
Uploading: 79.2 MB -- Deleting: 0 B -- Replacing: 0 B
```

`Deleting: 0 B` é a linha que importa.

### Fase 6 — Validação

**Não confie no build passar.** Para cada overlay, altere o valor no admin,
rebuilde e confira o HTML gerado. Se o valor no WordPress é igual ao padrão
do código, um build verde não prova absolutamente nada — pode estar lendo do
código o tempo todo.

Faça também o teste negativo: aponte o build para um host inexistente e
confirme que ele sai com erro em vez de gerar páginas vazias.

---

## Armadilhas

Ler antes de "melhorar" qualquer coisa. Cada uma custou horas.

**O fetch-cache do Next publica conteúdo velho.** `.next/cache/fetch-cache`
guarda as respostas do WordPress *entre builds*. O build roda, reporta
sucesso e gera o site com o conteúdo anterior — sem erro em lugar nenhum. No
runner do GitHub o diretório nasce vazio, então produção escapa por acidente;
basta alguém adicionar `.next/` ao cache do workflow "para acelerar" e o site
congela em silêncio. Use um script `prebuild` que apague o diretório.

**Retentativas longas brigam com o timeout de página do Next.** A escada de
espera (2 + 5 + 15 + 30 s) soma ~52 segundos, mas o Next mata a geração de
cada página aos 60 s e recomeça. Na prática a última retentativa — a mais
importante, porque é a que atravessa o bloqueio — nunca chega ao fim. Aumente
`staticPageGenerationTimeout` para 180. Não encurte a escada: a espera longa
é o mecanismo, não o problema.

**403 no webhook quase nunca é o token.** O plugin de deploy vem com o
repositório do projeto de origem como valor padrão. Com um token restrito ao
repositório novo, o disparo vai para o lugar errado e o GitHub devolve
`403 Resource not accessible by personal access token` — que parece problema
de credencial e não é. Teste o mesmo token nos dois repositórios antes de
regerar nada.

**Campo `required` no ACF impede update parcial via REST.** Um `POST` que
mande só um campo devolve `400 rest_invalid_param` exigindo todos os
obrigatórios do grupo. O admin não sofre porque envia o formulário inteiro;
quem quebra é script de seed e automação.

**`cache: "no-store"` gera páginas 404.** Com `output: "export"` o Next
entende que a rota é dinâmica e não consegue pré-renderizar. Sem opções de
cache, o fetch roda uma vez no build — que é o comportamento desejado.

**O certificado FTPS de hospedagem compartilhada não cobre o domínio do
cliente.** Em HostGator, por exemplo, é `*.hostgator.com.br`. Conectar pelo
domínio do cliente ou pelo IP falha na validação TLS. O nome utilizável está
no cPanel, em *Informações gerais → Nome do servidor*. Sem ele, a escolha é
entre FTP em texto puro e não fazer deploy — decida conscientemente e
registre a decisão no workflow.

**A conta de FTP cai no home da hospedagem, não na raiz do site.** Apontar o
deploy para `/` faz a action apagar `mail/`, `ssl/`, `logs/` — contas de
e-mail e certificados do cliente. Confira o diretório antes do primeiro
deploy automático.

**`.well-known/` precisa estar no `exclude`.** É onde o Let's Encrypt valida
a renovação do certificado. Apagar derruba o HTTPS em algumas semanas, muito
depois de você ter esquecido do deploy.

**O WordPress devolve entidades HTML.** Títulos vêm com `&#8220;`, `&#8211;`
e afins. Decodifique todo texto que não for renderizado como HTML.

**Um salvamento no editor de blocos dispara vários hooks.** Salvar um post
publicado aciona `publish_{post_type}` **e** `post_updated`, e o editor salva
mais de uma vez. Sem debounce no plugin, uma edição vira quatro deploys
concorrentes.

**Repeater vazio do ACF volta como `false`, não como `[]`.** Normalize antes
de iterar, ou o primeiro `.map()` derruba o build.

**Prefira token fine-grained ao classic.** O scope `repo` do classic dá
escrita em *todos* os repositórios da conta — e o token fica em texto no
banco do WordPress, legível por qualquer administrador do site. Um
fine-grained restrito a um repositório com `Contents: Read and write` faz o
mesmo trabalho. Contrapartida: expira em no máximo um ano, e quando expira os
deploys param sem ninguém perceber. Anote a data.

---

## Checklist de validação

Antes de entregar:

- [ ] `/wp-json/wp/v2/posts?per_page=1` responde JSON
- [ ] Cada CPT responde em `/wp-json/wp/v2/<rest_base>`
- [ ] A chave `acf` aparece nas respostas, com a forma que o TypeScript espera
- [ ] `orderby=menu_order` responde 200 nos CPTs que o site ordena
- [ ] `npm run build` gera a pasta de saída com os HTMLs esperados
- [ ] Um trecho real do conteúdo aparece no HTML gerado (`grep`)
- [ ] **Alterar um valor no admin muda o HTML gerado** — por overlay
- [ ] Build apontado para host inexistente **falha** em vez de publicar vazio
- [ ] O que existe no servidor e não vem do build está no `exclude`
- [ ] Deploy em `dry-run` reporta `Deleting: 0 B`
- [ ] Deploy manual conclui e o site abre
- [ ] Pastas externas continuam no servidor depois do deploy
- [ ] Publicar no WordPress dispara o workflow sozinho
- [ ] A mudança aparece no site em 3–5 min
- [ ] Cache do servidor limpo e testado em aba anônima

Ao entregar o painel ao cliente:

- [ ] Trocar a senha de FTP e o token do GitHub
- [ ] Anotar a data de expiração do token
- [ ] Explicar: renomear página é seguro, excluir e recriar quebra o build
- [ ] Explicar: apagar texto no painel restaura o texto original, não apaga

---

## As skills

Duas skills acompanham este material, em [`skills/`](skills/):

| Skill | Para quê |
|---|---|
| [`nextjs-wp-integracao`](skills/nextjs-wp-integracao/SKILL.md) | Executar a integração num projeto novo |
| [`nextjs-wp-diagnostico`](skills/nextjs-wp-diagnostico/SKILL.md) | Ir do sintoma à causa quando algo quebra |

Para instalar, copie as pastas para `.claude/skills/` do projeto — ou para
`~/.claude/skills/` se quiser em todos.

---

## Ordem de leitura sugerida

1. **[`index.html`](index.html)** — a visão geral, em 10 minutos
2. Este README, seções **A decisão que vem primeiro** e **O padrão de
   overlay** — são os dois conceitos que carregam o resto
3. As seis fases, quando for executar
4. As armadilhas, antes de "melhorar" o código herdado

Quem já fez uma vez: vá direto para as armadilhas e o checklist.
