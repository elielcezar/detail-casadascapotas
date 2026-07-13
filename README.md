# Detail — Estética Automotiva

Site institucional em [Next.js](https://nextjs.org) (App Router + TypeScript), exportado como HTML estático.

## Desenvolvimento

```bash
npm install
npm run dev       # http://localhost:3000
```

## Build de produção

```bash
npm run build     # gera a pasta out/, pronta para upload em qualquer hospedagem estática
npm run lint
```

## Onde editar o conteúdo

Todo o conteúdo do site (textos, catálogo de películas, pacotes de limpeza, portfólio de PPF,
equipe, galeria, dados de contato) fica em `src/data/*.ts`. Não é necessário mexer nos
componentes para atualizar textos, preços, garantias ou links.

- `src/data/site.ts` — telefone, WhatsApp, e-mail, domínio, redes sociais (contém os placeholders a substituir antes do lançamento)
- `src/data/navigation.ts` — itens do menu
- `src/data/films.ts` — catálogo de películas
- `src/data/cleaning.ts` — pacotes de limpeza
- `src/data/ppf.ts` — portfólio de PPF
- `src/data/home.ts` — hero, diferenciais, seções de serviço, contadores, equipe e galeria da home

## Estrutura

```
src/
├─ app/            páginas (App Router) e configuração de SEO (sitemap, robots, metadata)
├─ components/
│  ├─ layout/      Header, Footer, WhatsAppFloat
│  ├─ home/        componentes exclusivos da página inicial
│  └─ shared/      componentes reutilizados entre páginas
└─ data/           conteúdo do site (ver acima)
public/img/        imagens usadas no site
docs/              material de apoio (PDFs de origem, referências visuais) — não entra no build
```

O protótipo HTML original que deu origem a este projeto está preservado na tag git `prototipo-html`.
