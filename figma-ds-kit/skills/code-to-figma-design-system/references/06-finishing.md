# Fase 5 — Acabamento

## 1. Auditoria de nomes e restos

`scripts/figma/list-generic-names.js` em Foundations, Components e nas telas
(ignorando o que está dentro de instâncias). Renomeie por função: `swatch`, `bar`,
`sample`, `accent-line`, `background`, `overlay`… Remova frames `_tmp*`.

## 2. Capa (página Cover, frame 1440×900)

Monte **com o próprio sistema** — é a vitrine do trabalho:
- Header real (instância) no topo;
- foto do hero + overlay com stops de gradiente ligados às alfas;
- eyebrow (`label/eyebrow`), título `display/hero` com destaque por `setRangeFills`,
  descrição `body/lg`, chips com as seções do arquivo;
- números do sistema em instâncias do componente de contador (variáveis, estilos,
  componentes, telas validadas);
- elemento de marca do site na base (faixa, padrão…).

A miniatura do arquivo **não** pode ser definida pela API
(`setFileThumbnailNodeAsync` não é suportado): peça ao usuário clique direito no
frame → *Set as thumbnail*.

## 3. Página Case (logo após Cover, frame 1440)

Estrutura que funcionou (ver `templates/case-outline.md`):
1. Cabeçalho — eyebrow, título com destaque, intro, linha.
2. Contexto · Problema · Abordagem — 3 cards (claro, azul, laranja).
3. Processo em 5 fases — número grande, título, texto (com os números reais).
4. Decisões — 6 itens numerados em 2 colunas.
5. Antes e depois dos tokens — paleta crua × coleções com contagens.
6. Validação — tabela Figma × site com % de diferença e nota explicando desvios.
7. Achados devolvidos ao cliente — contraste, hex soltos, comentários desatualizados,
   tokens prontos para voltar ao código.

Use `text/body` (não `text/muted`) em textos corridos se `text/muted` tiver
contraste baixo — o case não pode cometer o erro que ele aponta.

## 4. Opcional — portar tokens de volta ao código

Só com autorização explícita. Fazer numa branch: custom properties da Semantic e
da Responsive em `globals.css`, troca dos valores fixos nos módulos, e comparação
visual antes/depois. Até lá, registre como pendência no plano.

## 5. Fechar

Marque as fases no `docs/figma-design-system-plano.md`, atualize o ledger e entregue:
o que foi criado, o que o usuário precisa fazer à mão (thumbnail), decisões pendentes.
