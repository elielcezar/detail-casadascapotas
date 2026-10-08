// Read-only — Fase 5: camadas com nome padrão do Figma (fora de instâncias).
// Rode uma vez por página (troque PAGE_ID). Para telas, limite aos frames montados.
const PAGE_ID = '1:2';
const ROOT_IDS = []; // opcional: só dentro destes frames (ex.: telas montadas)

const page = await figma.getNodeByIdAsync(PAGE_ID); await figma.setCurrentPageAsync(page);
const generic = /^(Frame|Rectangle|Ellipse|Group|Text|Line|Polygon|Vector|Component|Instance)( \d+)?$/;
const insideInstance = n => { let p = n.parent; while (p) { if (p.type === 'INSTANCE') return true; p = p.parent; } return false; };
const roots = ROOT_IDS.length ? await Promise.all(ROOT_IDS.map(id => figma.getNodeByIdAsync(id))) : [page];
const found = [];
for (const r of roots) for (const n of r.findAll(n => generic.test(n.name) && !insideInstance(n))) found.push({ id: n.id, name: n.name, type: n.type, parent: n.parent.name });
const tally = {}; for (const f of found) tally[`${f.type}:${f.name.replace(/ \d+$/, '')} <${f.parent}>`] = (tally[`${f.type}:${f.name.replace(/ \d+$/, '')} <${f.parent}>`] || 0) + 1;
return { count: found.length, byParent: tally, stray: page.children.filter(n => n.name.startsWith('_tmp')).map(n => n.id) };
// Renomeie pela função (swatch, bar, sample, accent-line, background, overlay, bullet…),
// decidindo pelo nome do pai. Vetores dentro de ícones podem ficar "Vector".
