// Read-only — extrai de uma captura (generate_figma_design) o conteúdo de cada seção:
// textos, imagens (hash, tamanho, posição, opacidade), fundo sólido e altura.
// Use os hashes para montar as telas sem reenviar fotos; use as alturas para validar.
const SCREENS_PAGE_ID = '1:4';
const CAPTURE_ROOT_ID = '27:2'; // frame raiz da captura

const page = await figma.getNodeByIdAsync(SCREENS_PAGE_ID); await figma.setCurrentPageAsync(page);
const root = await figma.getNodeByIdAsync(CAPTURE_ROOT_ID); const rb = root.absoluteBoundingBox;
const main = root.findOne(n => n.name === 'Main Content') || root.children[0];
const hex = f => '#' + ['r', 'g', 'b'].map(k => Math.round(f.color[k] * 255).toString(16).padStart(2, '0')).join('');
const sections = [...main.children, ...root.findAll(n => n.name === 'Footer').slice(0, 1)];
return sections.map(s => {
  const texts = s.findAll(x => x.type === 'TEXT').map(t => t.characters.replace(/\s+/g, ' ').trim()).filter(Boolean);
  const imgs = new Set();
  for (const x of [s, ...s.findAll(() => true)]) {
    if (!('fills' in x) || !Array.isArray(x.fills) || !x.visible) continue;
    for (const f of x.fills) if (f.type === 'IMAGE') { const b = x.absoluteBoundingBox;
      imgs.add(`${f.imageHash}|${Math.round(b.width)}x${Math.round(b.height)}@${Math.round(b.x - rb.x)},${Math.round(b.y - rb.y)}|op${(x.opacity ?? 1).toFixed(2)}`); }
  }
  return { name: s.name, id: s.id, y: Math.round(s.absoluteBoundingBox.y - rb.y), h: Math.round(s.height),
    bg: (s.fills || []).filter(f => f.type === 'SOLID').map(hex), texts, imgs: [...imgs] };
});
// Imagens com op ~0.95 e ~0.05 no mesmo lugar = carrossel em transição: use a de maior opacidade.
// Para ver tipografia real de uma seção: t.fontName / t.fontSize / cor de cada TEXT.
