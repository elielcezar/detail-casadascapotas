// Cole no topo de cada use_figma que cria/edita nós (ajuste PAGE_ID e as fontes).
// Não há estado entre chamadas: tudo é resolvido por nome ou por ID literal do ledger.

const PAGE_ID = '1:3'; // página alvo (Components, Screens…)
const page = await figma.getNodeByIdAsync(PAGE_ID);
await figma.setCurrentPageAsync(page);

// Variáveis por nome (nomes são únicos entre coleções neste padrão)
const ALL_VARS = await figma.variables.getLocalVariablesAsync();
const V = n => { const v = ALL_VARS.find(x => x.name === n); if (!v) throw new Error('variável não encontrada: ' + n); return v; };
const paint = n => figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', V(n));
const img = (hash, mode = 'FILL') => ({ type: 'IMAGE', imageHash: hash, scaleMode: mode });

// Fontes: carregue TODAS as combinações que o script vai tocar (inclusive as dos estilos)
await Promise.all([['Montserrat', 'Bold'], ['Montserrat', 'SemiBold'], ['Open Sans', 'Regular'], ['Open Sans', 'SemiBold']]
  .map(([family, style]) => figma.loadFontAsync({ family, style })));
const TSTYLES = await figma.getLocalTextStylesAsync();
const TS = n => { const s = TSTYLES.find(s => s.name === n); if (!s) throw new Error('estilo não encontrado: ' + n); return s; };
const ES = Object.fromEntries((await figma.getLocalEffectStylesAsync()).map(s => [s.name, s.id]));

// Binding helpers
const radius = (n, v) => { for (const k of ['topLeftRadius', 'topRightRadius', 'bottomLeftRadius', 'bottomRightRadius']) n.setBoundVariable(k, V(v)); };
const pad = (n, y, x) => { if (y) { n.setBoundVariable('paddingTop', V(y)); n.setBoundVariable('paddingBottom', V(y)); } if (x) { n.setBoundVariable('paddingLeft', V(x)); n.setBoundVariable('paddingRight', V(x)); } };

// Texto com estilo + cor semântica
const text = async (chars, style, color, name = 'text') => { const t = figma.createText(); t.name = name; t.characters = chars; await t.setTextStyleIdAsync(TS(style).id); t.fills = [paint(color)]; return t; };
const fillT = t => { t.layoutSizingHorizontal = 'FILL'; t.textAutoResize = 'HEIGHT'; }; // chamar DEPOIS do appendChild

// Auto layout
const vstack = (name, gapVar) => { const f = figma.createAutoLayout('VERTICAL', { name }); f.fills = []; if (gapVar) f.setBoundVariable('itemSpacing', V(gapVar)); return f; };
const hstack = (name, gapVar) => { const f = figma.createAutoLayout('HORIZONTAL', { name }); f.fills = []; f.counterAxisAlignItems = 'CENTER'; if (gapVar) f.setBoundVariable('itemSpacing', V(gapVar)); return f; };
// Container do site (max-width + padding lateral): largura ligada a layout/container
const container = (parent, gapVar, dir = 'VERTICAL') => {
  const c = figma.createAutoLayout(dir, { name: 'container' }); c.fills = []; c.counterAxisAlignItems = 'CENTER';
  if (gapVar) c.setBoundVariable('itemSpacing', V(gapVar));
  c.setBoundVariable('paddingLeft', V('layout/gutter')); c.setBoundVariable('paddingRight', V('layout/gutter'));
  parent.appendChild(c); c.resize(1300, 10); c.layoutSizingHorizontal = 'FIXED'; c.setBoundVariable('width', V('layout/container'));
  c.layoutSizingVertical = 'HUG'; // resize() fixou a altura — volte para HUG
  return c;
};

// Instâncias
const N = id => figma.getNodeByIdAsync(id);
const variantOf = (set, name) => set.children.find(c => c.name === name);
const key = (inst, prefix) => Object.keys(inst.componentProperties).find(k => k.split('#')[0] === prefix);
const setP = (inst, obj) => { const o = {}; for (const [k, v] of Object.entries(obj)) { const kk = key(inst, k); if (!kk) throw new Error(`prop "${k}" não existe em ${inst.name}`); o[kk] = v; } inst.setProperties(o); };
const iconOf = inst => inst.findOne(n => n.name === 'icon') || inst.findOne(n => n.type === 'INSTANCE');
// Ícone de traço: espessura proporcional ao tamanho (lucide escala o traço). Reaplique após INSTANCE_SWAP.
const recolor = (node, color, size, sw = 2) => { for (const n of node.findAll(() => true)) {
  if ('strokes' in n && n.strokes.length) { n.strokes = [paint(color)]; n.strokeWeight = sw * size / 24; }
  if ('fills' in n && n.fills.length && n.type !== 'FRAME' && n.type !== 'INSTANCE') n.fills = [paint(color)]; } };
const iconInst = async (iconComponentId, size, color, sw = 2) => { const i = (await N(iconComponentId)).createInstance(); i.name = 'icon'; i.resize(size, size); recolor(i, color, size, sw); return i; };

// Modo Mobile da coleção Responsive (IDs do ledger)
// const rsCol = await figma.variables.getVariableCollectionByIdAsync('VariableCollectionId:…');
// frame.setExplicitVariableModeForCollection(rsCol, '<mobileModeId>');
