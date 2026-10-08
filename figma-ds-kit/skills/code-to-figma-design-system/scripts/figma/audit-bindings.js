// Read-only — QA da Fase 3: paints SOLID sem variável e textos sem estilo
// dentro dos componentes da página Components (ignora o que está dentro de instâncias).
const COMPONENTS_PAGE_ID = '1:3';

const page = await figma.getNodeByIdAsync(COMPONENTS_PAGE_ID); await figma.setCurrentPageAsync(page);
const comps = page.findAllWithCriteria({ types: ['COMPONENT'] });
const unboundPaint = [], unstyledText = [], counts = {};
const insideInstance = (n, stop) => { let p = n.parent; while (p && p !== stop) { if (p.type === 'INSTANCE') return true; p = p.parent; } return false; };
for (const c of comps) {
  const owner = c.parent.type === 'COMPONENT_SET' ? c.parent.name : c.name;
  counts[owner] = (counts[owner] || 0) + 1;
  for (const n of [c, ...c.findAll(() => true)]) {
    if (insideInstance(n, c)) continue;
    for (const prop of ['fills', 'strokes']) {
      if (!(prop in n) || !Array.isArray(n[prop])) continue;
      for (const f of n[prop]) if (f.type === 'SOLID' && !f.boundVariables?.color) unboundPaint.push(`${owner} › ${n.name} (${prop})`);
    }
    if (n.type === 'TEXT' && !n.textStyleId) unstyledText.push(`${owner} › ${n.name}`);
  }
}
return { components: comps.length, sets: Object.keys(counts).length, counts, unboundPaint, unstyledText };
// Exceções aceitáveis: cores que são DADO (amostras de tonalidade). Todo o resto: ligar a variável/estilo.
