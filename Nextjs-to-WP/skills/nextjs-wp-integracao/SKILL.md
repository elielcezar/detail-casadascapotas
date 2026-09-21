---
name: nextjs-wp-integracao
description: Integra um site Next.js com export estático a um WordPress headless, para que o cliente edite conteúdo sem mexer no código. Use quando o pedido for "colocar o WordPress no site", "deixar o cliente editar os textos/fotos", "painel para o cliente", "WordPress headless", "CMS no Next", ou quando um projeto Next.js com output export precisar passar a buscar conteúdo de uma API do WordPress. Cobre a ordem das fases, a decisão de escopo, o padrão de overlay e o deploy automático por GitHub Actions.
---

# Integração Next.js estático + WordPress headless

Conteúdo editável no WordPress, site publicado como HTML estático, rebuild
automático quando o cliente publica.

```
WordPress (admin.dominio)              Repositório Next.js
├── plugin headless          ──────►   ├── src/lib/wordpress.ts   (busca)
├── plugin deploy-trigger    webhook   ├── src/lib/content.ts     (overlay)
├── CPTs (show_in_rest)                ├── .github/workflows/     (deploy)
└── campos ACF (Show in REST)          └── next.config.ts (output: export)
                                                  │
                                                  └──FTP──► hospedagem
```

## Antes de qualquer código: decida o escopo

O erro mais caro é mandar tudo para o WordPress. Conteúdo estruturado
(tabelas de especificação, variantes de cor, flags de layout) vira repeater
dentro de repeater no ACF e entrega ao cliente uma interface **pior** que
editar o arquivo TypeScript — e fácil de quebrar o layout.

Decida por frequência de mudança, não por "é possível":

| Frequência | Exemplos | Vai para o WP? |
|---|---|---|
| Semanal | galeria de trabalhos, novidades | **sim** |
| Mensal | equipe, textos de seção, preços visíveis | **sim** |
| Rara mas urgente | telefone, WhatsApp, e-mail, horário | **sim**, é barato |
| Anual | tabelas técnicas de fabricante | **não** |
| Quase nunca | ordem das seções, âncoras, layout | **não** |

Pergunte ao usuário antes de assumir. A resposta muda o tamanho do trabalho
em uma ordem de grandeza.

## O padrão de overlay

A regra que sustenta tudo:

> `src/data/*.ts` define **estrutura e valores padrão**. O WordPress fornece
> **override** apenas dos campos marcados como editáveis. O casamento é por
> um `id` estável.

Três consequências que precisam valer sempre:

1. **Falha de rede ou HTTP → exceção, build quebra.** Nunca devolva `[]`.
   Um build que passa com dados vazios publica páginas vazias e apaga o
   conteúdo do ar. Build quebrado é recuperável, deploy vazio não.
2. **Campo vazio no WordPress → usa o padrão do código.** É diferente de
   falha, e é o que permite migrar uma seção por vez.
3. **Cada item precisa de um `id` estável** nos arquivos de dados, e esse
   `id` vira um campo obrigatório no ACF. Torne-o obrigatório no TypeScript:
   assim o compilador acusa qualquer item que você esqueceu.

```ts
export async function overlaySecoes(secoes: Secao[]): Promise<Secao[]> {
  const porId = await getOverridesDoWordPress();   // lança se a API falhar
  return secoes.map((secao) => {
    const wp = porId.get(secao.id);
    if (!wp) return secao;                          // sem correspondente: intacto
    return {
      ...secao,
      titulo: wp.titulo?.trim() || secao.titulo,    // vazio: padrão do código
      descricao: wp.descricao?.trim() || secao.descricao,
    };
  });
}
```

## Ordem das fases

**Faça o WordPress inteiro antes de tocar no Next.** Sem CPTs e ACF prontos,
o build falha e você perde tempo diagnosticando o lado errado.

### Fase 0 — Pré-requisitos
Domínio final, hospedagem, credenciais de deploy, licença ACF PRO (Repeater
e Gallery são recursos pagos), e **quais pastas do servidor não podem ser
apagadas**. Confira também se o domínio de SEO no código é o real: sites
entregues com placeholder em `canonical`/`sitemap` não são raros.

### Fase 1 — WordPress
Instale em subdomínio dedicado. Permalinks "bonitos" (a REST API precisa).
Registre os CPTs **em código**, num mu-plugin, não pela interface:

```php
register_post_type('galeria_categoria', [
    'public'       => true,
    'show_in_rest' => true,            // sem isto não aparece na REST API
    'rest_base'    => 'galeria_categoria',
    'supports'     => ['title', 'page-attributes'],  // page-attributes é o
]);                                    // que habilita orderby=menu_order
```

Mu-plugin porque não pode ser desativado por engano: sem os CPTs, o site
perde conteúdo no build seguinte.

Nos grupos ACF, marque **Show in REST API = Sim**. Exporte os grupos como
JSON e versione — clicar campo a campo na interface convida a erro de
digitação em `name`, que é a interface com o TypeScript e **não dá erro**:
só faz o conteúdo voltar silenciosamente ao padrão do código.

Teste cada endpoint no navegador antes de seguir:
```
https://admin.dominio/wp-json/wp/v2/<rest_base>?acf_format=standard
```

Anote os IDs das páginas de configuração — elas são buscadas por ID, não por
slug. Avise o cliente: renomear é seguro, excluir e recriar quebra o build.

### Fase 2 — Camada de dados
`src/lib/wordpress.ts` com busca + tipos. `src/lib/content.ts` com o overlay.
Mantenha separados: um fala com a API, o outro decide o que sobrescreve.

Normalize a origem das imagens por variável de ambiente. A URL de cada anexo
fica **gravada no HTML publicado**; se o WordPress mudar de domínio depois,
você quer trocar uma variável, não mexer em componente.

### Fase 3 — Seed
Não cadastre conteúdo à mão. Script que lê os arquivos de dados e cria tudo
via REST com Application Password. Idempotente (manifesto local de uploads +
busca por título antes de criar) e com pausa entre uploads — rajada de
requisições leva bloqueio temporário de WAF.

Campo de imagem do ACF recebe **ID de anexo** na escrita, mas devolve objeto
completo na leitura com `acf_format=standard`.

### Fase 4 — Componentes
Um componente por vez, do menos arriscado (galeria) ao mais (home). Cada
etapa é um commit que passa no build sozinho.

Componente de cliente não pode buscar no build — receba por prop de um
componente de servidor. Use `cache()` do React quando vários componentes
leem a mesma página do WordPress.

### Fase 5 — Deploy
Workflow com `concurrency` (dois deploys simultâneos se derrubam no FTP),
timeout alto (export gera centenas de arquivos pequenos) e `exclude` com
tudo que existe no servidor e **não** é gerado pelo build — a action apaga o
que não está em `local-dir`.

Antes do primeiro deploy real, rode com `dry-run: true` e leia o log. É a
única forma de conferir o diretório de destino, porque o GitHub não devolve
o valor de um secret.

### Fase 6 — Validação
Não confie no build passar. Para cada overlay, **altere o valor no admin,
rebuilde e confira o HTML gerado**. Se o valor no WordPress é igual ao
padrão do código, um build verde não prova nada.

## Verificações que valem a pena

- Aponte o build para um host inexistente e confirme que ele sai com erro em
  vez de gerar páginas vazias.
- Compare o conteúdo do servidor com o do build antes do primeiro deploy
  automático, para saber exatamente o que seria apagado.
- Depois do primeiro deploy, confira que nada foi parar fora da pasta certa.

## Armadilhas

Estão em `../../README.md`, seção **Armadilhas**. Leia antes de "melhorar"
qualquer coisa — cada uma custou horas.

As três que mais enganam:

- **O fetch-cache do Next publica conteúdo velho.** Build verde, site
  desatualizado. Limpe `.next/cache/fetch-cache` num script `prebuild`.
- **Retentativas longas brigam com o timeout de página do Next.** Aumente
  `staticPageGenerationTimeout`, não encurte as retentativas.
- **403 no webhook quase nunca é o token.** Confira para qual repositório o
  plugin está disparando.
