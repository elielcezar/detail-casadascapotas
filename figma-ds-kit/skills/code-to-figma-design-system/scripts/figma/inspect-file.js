// Read-only — estado do arquivo antes de cada fase (ou para retomar uma sessão).
// Ajuste FONT_FAMILIES para as fontes do projeto.
const FONT_FAMILIES = ['Montserrat', 'Open Sans'];

const cols = await figma.variables.getLocalVariableCollectionsAsync();
const vars = await figma.variables.getLocalVariablesAsync();
const [ts, es, ps] = await Promise.all([figma.getLocalTextStylesAsync(), figma.getLocalEffectStylesAsync(), figma.getLocalPaintStylesAsync()]);
const fonts = await figma.listAvailableFontsAsync();
return {
  pages: figma.root.children.map(p => ({ name: p.name, id: p.id })),
  collections: cols.map(c => ({ name: c.name, id: c.id, modes: c.modes.map(m => `${m.name}:${m.modeId}`), count: c.variableIds.length })),
  variables: vars.length,
  textStyles: ts.map(s => s.name),
  effectStyles: es.map(s => s.name),
  paintStyles: ps.length,
  fontStyles: Object.fromEntries(FONT_FAMILIES.map(f => [f, fonts.filter(x => x.fontName.family === f).map(x => x.fontName.style)])),
};
// Componentes por página: rode uma chamada por página (setCurrentPageAsync uma vez só) com
//   page.findAllWithCriteria({ types: ['COMPONENT', 'COMPONENT_SET'] })
