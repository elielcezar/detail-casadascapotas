// Fase 3 — gera os SVGs exatos dos ícones lucide-react usados no projeto.
//
// Rode a partir da RAIZ do projeto alvo (usa o node_modules dele):
//   node <caminho>/export-lucide-icons.mjs [dir-src] > icons.json
// Detecta automaticamente os ícones importados de "lucide-react" em dir-src (padrão: src).
// Saída: JSON { NomeDoIcone: "<svg …>" } com stroke #000 — no Figma, o stroke é
// religado a uma variável (icon/heading) logo após createNodeFromSvg.
import { createRequire } from 'node:module';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const require = createRequire(join(process.cwd(), 'noop.js'));
const L = require('lucide-react');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');

const src = process.argv[2] || 'src';
const walk = d => readdirSync(d).flatMap(f => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : /\.(t|j)sx?$/.test(f) ? [p] : []; });
const names = new Set();
for (const file of walk(src)) {
  const code = readFileSync(file, 'utf8');
  for (const m of code.matchAll(/import\s*\{([^}]+)\}\s*from\s*["']lucide-react["']/g))
    m[1].split(',').map(s => s.trim().split(/\s+as\s+/)[0]).filter(Boolean).forEach(n => names.add(n));
}
const out = {};
for (const n of [...names].sort()) {
  if (!L[n]) { console.error(`(ignorado) ${n} não existe em lucide-react`); continue; }
  out[n] = renderToStaticMarkup(React.createElement(L[n], { size: 24, color: '#000000', strokeWidth: 2 })).replace(/ class="[^"]*"/, '');
}
console.error(`${Object.keys(out).length} ícones: ${Object.keys(out).join(', ')}`);
process.stdout.write(JSON.stringify(out));
