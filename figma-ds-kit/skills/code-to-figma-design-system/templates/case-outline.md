# Roteiro da página Case (frame 1440, padding 100/80, gap 100)

Monte tudo com os estilos e cores do próprio sistema. Textos corridos em `text/body`.

1. **Cabeçalho** — eyebrow `label/eyebrow` laranja ("Case · Engenharia reversa"),
   título `heading/h1` com destaque (`setRangeFills`), intro `body/lg` (largura ~860),
   linha de destaque 60×3.
2. **Contexto, problema e abordagem** — 3 cards lado a lado, alturas iguais
   (FILL vertical): claro (`bg/subtle`), escuro (`bg/inverse`), marca (`bg/brand`).
   Título `title/lg` + texto `body/sm`.
3. **Processo em 5 fases** — 5 colunas com borda superior 3px laranja; número
   `display/number`, título `title/md`, texto `body/xs` com os **números reais**
   (quantos tamanhos de fonte, coleções, componentes, telas).
4. **Decisões** — 6 itens em 2 colunas (625 cada): número `title/lg` laranja,
   título `title/sm`, texto `body/sm`. Sugestões que se repetem entre projetos:
   semântica por superfície · responsividade como modo · arredondar e consolidar ·
   nada de valores soltos · validar contra o site · ler o CSS como o navegador.
5. **Antes e depois dos tokens** — painel claro com a paleta crua (amostras ligadas
   às primitives) × painel escuro com as coleções e contagens.
6. **Validação** — tabela Tela | Figma | Site | Diferença; nota em `caption/italic`
   explicando qualquer desvio (ex.: consolidação aprovada).
7. **Achados devolvidos ao cliente** — 4 cards com valor em destaque (`heading/h5`
   laranja): contraste, hex soltos, comentários desatualizados, tokens prontos para
   voltar ao código.
