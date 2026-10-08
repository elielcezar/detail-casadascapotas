// Read-only — altura de cada seção da tela montada × captura de referência.
// Seções de fluxo apenas (ignora filhos absolutos: header fixo, botão flutuante).
const SCREENS_PAGE_ID = '1:4';
const BUILT_ID = '33:3';     // frame da tela montada
const CAPTURE_ID = '27:2';   // frame raiz da captura

const page = await figma.getNodeByIdAsync(SCREENS_PAGE_ID); await figma.setCurrentPageAsync(page);
const built = await figma.getNodeByIdAsync(BUILT_ID); const cap = await figma.getNodeByIdAsync(CAPTURE_ID);
const bb = built.absoluteBoundingBox, cb = cap.absoluteBoundingBox;
const mine = built.children.filter(n => n.layoutPositioning !== 'ABSOLUTE')
  .map(s => ({ name: s.name, y: Math.round(s.absoluteBoundingBox.y - bb.y), h: Math.round(s.height) }));
const main = cap.findOne(n => n.name === 'Main Content') || cap.children[0];
const ref = [...main.children, ...cap.findAll(n => n.name === 'Footer').slice(0, 1)]
  .map(s => ({ name: s.name, y: Math.round(s.absoluteBoundingBox.y - cb.y), h: Math.round(s.height) }));
return { totals: { built: Math.round(built.height), capture: Math.round(cap.height), diffPct: +((built.height - cap.height) / cap.height * 100).toFixed(2) }, mine, ref };
// Pareie por ordem. Diferença > ~10px numa seção → recorte as duas e compare
// (clone num frame temporário com clipsContent, screenshot, remova o frame).
// Atenção: wrappers com margin na captura ("Container:margin", "Section:margin")
// incluem a margem — compare também o y da seção seguinte.
