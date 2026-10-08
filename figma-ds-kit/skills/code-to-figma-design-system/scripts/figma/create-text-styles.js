// Fase 2 — cria/atualiza text styles e effect styles (idempotente por nome).
// Cada estilo liga fontSize a "font-size/<var>" da coleção Responsive (crie a variável antes).
// Exemplo com valores do projeto Detail — troque pelos da auditoria.

const RESPONSIVE_COLLECTION_ID = 'VariableCollectionId:5:92'; // do ledger
const STYLES = [ // [nome, família, estilo da fonte, var font-size, line-height (% | 'AUTO'), letter-spacing px, maiúsculas]
  ['display/hero', 'Montserrat', 'Black', 'display/hero', 110, 0, true],
  ['display/number', 'Montserrat', 'ExtraBold', 'display/number', 160, 0, false], // div → herda lh do body
  ['heading/h2', 'Montserrat', 'Bold', 'heading/h2', 120, 0, true],
  ['body/md', 'Open Sans', 'Regular', 'body/md', 160, 0, false],
  ['label/button', 'Montserrat', 'SemiBold', 'label/button', 160, 1, true], // <a> herda lh do body
  ['label/chip', 'Montserrat', 'SemiBold', 'label/chip', 'AUTO', 1, true],  // <button> usa lh normal
];
const SHADOWS = [ // [nome, x, y, blur, hex, alpha, descrição]
  ['shadow/sm', 0, 4, 15, '#000000', .1, 'var(--shadow-sm)'],
  ['shadow/md', 0, 10, 30, '#000000', .15, 'var(--shadow)'],
];

const vars = await figma.variables.getLocalVariablesAsync();
const fsVar = n => { const v = vars.find(x => x.name === `font-size/${n}` && x.variableCollectionId === RESPONSIVE_COLLECTION_ID); if (!v) throw new Error('falta font-size/' + n); return v; };
const fonts = [...new Set(STYLES.map(s => `${s[1]}|${s[2]}`))];
await Promise.all(fonts.map(f => { const [family, style] = f.split('|'); return figma.loadFontAsync({ family, style }); }));
const existing = await figma.getLocalTextStylesAsync();
const desktopMode = (await figma.variables.getVariableCollectionByIdAsync(RESPONSIVE_COLLECTION_ID)).modes[0].modeId;
const out = [];
for (const [name, family, style, fv, lh, ls, upper] of STYLES) {
  let s = existing.find(x => x.name === name); if (!s) s = figma.createTextStyle();
  s.name = name; s.fontName = { family, style };
  const v = fsVar(fv); s.fontSize = v.valuesByMode[desktopMode]; s.setBoundVariable('fontSize', v);
  s.lineHeight = lh === 'AUTO' ? { unit: 'AUTO' } : { value: lh, unit: 'PERCENT' };
  s.letterSpacing = { value: ls, unit: 'PIXELS' }; s.textCase = upper ? 'UPPER' : 'ORIGINAL';
  out.push(name);
}
const hex = h => { const c = h.replace('#', ''); return { r: parseInt(c.slice(0, 2), 16) / 255, g: parseInt(c.slice(2, 4), 16) / 255, b: parseInt(c.slice(4, 6), 16) / 255 }; };
const effects = await figma.getLocalEffectStylesAsync();
for (const [name, x, y, blur, h, a, desc] of SHADOWS) {
  let s = effects.find(e => e.name === name); if (!s) s = figma.createEffectStyle();
  s.name = name; s.description = desc;
  s.effects = [{ type: 'DROP_SHADOW', color: { ...hex(h), a }, offset: { x, y }, radius: blur, spread: 0, visible: true, blendMode: 'NORMAL' }];
  out.push(name);
}
return out;
// Inserir um estilo novo numa posição: figma.moveLocalTextStyleAfter(novo, referencia)
