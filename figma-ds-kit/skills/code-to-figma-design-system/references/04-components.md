# Fase 3 — Components

Objetivo: o inventário aprovado como componentes reais — auto layout, variáveis em
tudo, propriedades bem nomeadas — numa única página `Components` organizada em
**seções** (`figma.createSection()`, fill branco).

## Ordem de construção (dependências primeiro)

1. **Icons** — exporte os SVGs da biblioteca usada no projeto
   (`scripts/export-lucide-icons.mjs` para lucide-react; ícones de marca, ex.
   WhatsApp, a partir do SVG do próprio componente). Cada um vira
   `Icon/<Nome>` 24×24, vetores com constraints `SCALE`, traço/fill ligado a
   `icon/heading`. Descrição: origem do ícone.
2. **Button** e **SectionTitle** (os mais reutilizados).
3. **Atoms** — NavLink, chips, badge, controles/dots de carrossel, botões sociais,
   item de checklist, linha de tabela, etc.
4. **Assets** — seção com retângulos-alvo para as imagens que os componentes
   precisam (logo, texturas, uma foto de exemplo por card). Envie com
   `upload_assets` (count + `nodeIds`) e `curl -F "file=@arquivo"` no submitUrl.
   Guarde os `imageHash` no ledger e reutilize: `{type:'IMAGE', imageHash, scaleMode}`.
5. **Cards** — usam átomos como instâncias.
6. **Blocks** — Header (desktop, desktop com scroll, mobile, menu aberto), Footer,
   PageHero, CTA, botão flutuante… Variantes mobile fixam o modo Mobile da
   Responsive com `setExplicitVariableModeForCollection`.

## Convenções

- Variantes `Prop=Valor, Prop=Valor`; estados (`Default/Hover/Active`) como eixo.
  Hover que no CSS só move (`translateY`) — documente na descrição.
- **Propriedades:** `TEXT` para textos editáveis, `BOOLEAN` para blocos opcionais
  (`Show subtitle`, `Show table`…), `INSTANCE_SWAP` para ícones. Instâncias aninhadas
  que o usuário vai editar: `isExposedInstance = true` (Badge, CTA, IconCircle).
- **Listas de tamanho variável** (benefícios, linhas de tabela, colunas): inclua o
  máximo real de itens e esconda os extras com booleanos (`Show benefit 4/5/6`,
  `Show col 4/5`) — instâncias não aceitam filhos novos.
- **Descrição em todo componente/set**: arquivo de origem, comportamento do CSS que
  não aparece no Figma (hover, breakpoints, larguras de grade), uso.
- **Padding fora da escala** de um componente que muda no mobile → variável na
  Responsive (`button/padding-y` 14→12) em vez de uma variante de tamanho.
- **Ícones em instâncias:** ao redimensionar, ajuste `strokeWeight = 2 * size / 24`
  (o lucide escala o traço com o tamanho). Depois de trocar o ícone via
  INSTANCE_SWAP, **reaplique a cor** — overrides se perdem.
- **Bordas que somam ao tamanho** (CSS `border` sem `box-sizing` afetando o
  conteúdo): `strokeAlign = 'INSIDE'` + `strokesIncludedInLayout = true`.
- **Altura natural de imagem** (`height:auto`): `lockAspectRatio()` na imagem do
  componente com a proporção real do uso.
- **`max-width` de parágrafo:** `layoutSizingHorizontal = 'FILL'` + `maxWidth = N`.
  Nunca largura fixa — estoura no mobile.

## Apresentação na página

- Cada seção: título (Montserrat Bold 28), linha de descrição, rótulos de linha/coluna.
- Fundo para variantes claras/escuras: **retângulos `_bg/...` atrás do component
  set** (o set fica transparente). Nunca coloque retângulos dentro do set.
- Ao lado do set, uma instância "exemplo completo" quando os padrões escondem
  blocos (ex.: FilmCard com todos os booleanos ligados).

## QA da fase

- `scripts/figma/audit-bindings.js` — paints SOLID sem variável e textos sem estilo
  dentro de componentes (exceções esperadas: cores de dado).
- Screenshot de cada seção. Procure: texto cortado (altura fixa por `resize`),
  fundos na frente do conteúdo (ordem de camadas), sets com fundo cobrindo backdrop.
- **Sincronize a Foundations** com qualquer token/estilo criado nesta fase e
  registre as adições no doc de auditoria (seção "Adições durante a Fase 3").
