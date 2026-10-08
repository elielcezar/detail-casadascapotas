// Fase 2 — cria/atualiza as 5 coleções a partir da config abaixo (idempotente:
// procura por nome antes de criar; rodar de novo só atualiza valores).
// Os valores de exemplo são do projeto Detail — troque pelos da auditoria aprovada.

const CONFIG = {
  primitives: [ // [nome, hex, alpha, nome-real-da-custom-property]
    ['color/blue/900', '#1d3245', 1, '--blue'], ['color/orange/500', '#ea591c', 1, '--orange'],
    ['color/orange/600', '#c84813', 1, '--orange-dark'], ['color/cream/300', '#d7d6ca', 1, '--cream'],
    ['color/neutral/0', '#ffffff', 1, '--white'], ['color/neutral/100', '#f5f5f5', 1, '--gray-light'],
    ['color/neutral/400', '#999999', 1, '--gray'], ['color/neutral/800', '#333333', 1, '--gray-dark'],
    ['color/alpha/white-15', '#ffffff', .15, '--white-a15'], ['color/alpha/cream-70', '#d7d6ca', .7, '--cream-a70'],
  ],
  semantic: [ // [nome, primitive (sem "color/"), grupo de scope]
    ['bg/page', 'neutral/0', 'bg'], ['bg/inverse', 'blue/900', 'bg'], ['bg/brand', 'orange/500', 'bg'],
    ['text/heading', 'blue/900', 'text'], ['text/body', 'neutral/800', 'text'], ['text/on-inverse', 'neutral/0', 'text'],
    ['icon/accent', 'orange/500', 'icon'], ['border/on-inverse', 'alpha/white-15', 'border'],
    ['action/primary', 'orange/500', 'bg'], ['action/primary-hover', 'orange/600', 'bg'], ['focus/ring', 'orange/500', 'border'],
  ],
  spacing: [3, 5, 8, 10, 12, 15, 20, 25, 30, 40, 50, 60, 80, 100],
  spacingAliases: [['section/sm', 60], ['section/md', 80], ['section/lg', 100], ['layout/gutter', 20]],
  layout: [['layout/container', 1300]],
  radius: [['xs', 2], ['sm', 3], ['md', 5], ['lg', 8], ['pill', 999]],
  responsive: [ // [nome, desktop, mobile, scope]
    ['font-size/display/hero', 56, 27, 'FONT_SIZE'], ['font-size/heading/h2', 40, 29, 'FONT_SIZE'], ['font-size/body/md', 16, 16, 'FONT_SIZE'],
    ['section/showcase', 100, 60, 'GAP'], ['button/padding-y', 14, 12, 'GAP'], ['button/padding-x', 32, 24, 'GAP'],
  ],
};

const SCOPES = { bg: ['FRAME_FILL', 'SHAPE_FILL'], text: ['TEXT_FILL'], icon: ['SHAPE_FILL', 'STROKE_COLOR'], border: ['STROKE_COLOR'] };
const hex = (h, a = 1) => { const c = h.replace('#', ''); return { r: parseInt(c.slice(0, 2), 16) / 255, g: parseInt(c.slice(2, 4), 16) / 255, b: parseInt(c.slice(4, 6), 16) / 255, a }; };
const css = n => n.replace(/\//g, '-');
const cols = await figma.variables.getLocalVariableCollectionsAsync();
const vars = await figma.variables.getLocalVariablesAsync();
function col(name, modes) {
  let c = cols.find(x => x.name === name); if (!c) { c = figma.variables.createVariableCollection(name); cols.push(c); }
  c.renameMode(c.modes[0].modeId, modes[0]);
  for (const m of modes.slice(1)) if (!c.modes.find(x => x.name === m)) c.addMode(m); // Starter: lança erro (1 modo só)
  return c;
}
function v(c, name, type) { let x = vars.find(y => y.name === name && y.variableCollectionId === c.id); if (!x) { x = figma.variables.createVariable(name, c, type); vars.push(x); } return x; }

const prim = col('Primitives', ['Value']); const pm = prim.modes[0].modeId; const P = {};
for (const [n, h, a, cssName] of CONFIG.primitives) { const x = v(prim, n, 'COLOR'); x.setValueForMode(pm, hex(h, a)); x.scopes = []; x.setVariableCodeSyntax('WEB', `var(${cssName})`); P[n] = x; }
const sem = col('Semantic', ['Default']); const sm = sem.modes[0].modeId;
for (const [n, p, g] of CONFIG.semantic) { const x = v(sem, n, 'COLOR'); x.setValueForMode(sm, figma.variables.createVariableAlias(P['color/' + p])); x.scopes = SCOPES[g]; x.setVariableCodeSyntax('WEB', `var(--${css(n)})`); }
const sp = col('Spacing', ['Value']); const spm = sp.modes[0].modeId; const S = {};
for (const n of CONFIG.spacing) { const x = v(sp, `space/${n}`, 'FLOAT'); x.setValueForMode(spm, n); x.scopes = ['GAP']; x.setVariableCodeSyntax('WEB', `var(--space-${n})`); S[n] = x; }
for (const [n, ref] of CONFIG.spacingAliases) { const x = v(sp, n, 'FLOAT'); x.setValueForMode(spm, S[ref] ? figma.variables.createVariableAlias(S[ref]) : ref); x.scopes = ['GAP']; x.setVariableCodeSyntax('WEB', `var(--${css(n)})`); }
for (const [n, val] of CONFIG.layout) { const x = v(sp, n, 'FLOAT'); x.setValueForMode(spm, val); x.scopes = ['WIDTH_HEIGHT']; x.setVariableCodeSyntax('WEB', `var(--${css(n)})`); }
const rd = col('Radius', ['Value']); const rm = rd.modes[0].modeId;
for (const [n, val] of CONFIG.radius) { const x = v(rd, `radius/${n}`, 'FLOAT'); x.setValueForMode(rm, val); x.scopes = ['CORNER_RADIUS']; x.setVariableCodeSyntax('WEB', `var(--radius-${n})`); }
const rs = col('Responsive', ['Desktop', 'Mobile']); const dM = rs.modes.find(m => m.name === 'Desktop').modeId, mM = rs.modes.find(m => m.name === 'Mobile').modeId;
for (const [n, d, m, scope] of CONFIG.responsive) { const x = v(rs, n, 'FLOAT'); x.setValueForMode(dM, d); x.setValueForMode(mM, m); x.scopes = [scope]; x.setVariableCodeSyntax('WEB', `var(--${n.replace('font-size/', 'fs-').replace(/\//g, '-')})`); }

return (await figma.variables.getLocalVariableCollectionsAsync()).map(c => ({ name: c.name, id: c.id, modes: c.modes.map(m => `${m.name}:${m.modeId}`), count: c.variableIds.length }));
// Salve IDs de coleção e modos no ledger. Em seguida: create-text-styles.js.
