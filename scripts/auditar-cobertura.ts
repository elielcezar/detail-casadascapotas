/**
 * Audita quanto do conteúdo do site é editável no WordPress.
 *
 * Percorre os dados reais de src/data/, coleta todo campo de texto com seu
 * caminho e classifica em:
 *
 *   coberto     — o overlay de src/lib/content.ts lê este campo
 *   proposital  — fora do painel por decisão (quebraria o layout, ou é
 *                 estrutura e não conteúdo)
 *   lacuna      — texto que ninguém consegue editar sem desenvolvedor
 *
 * Rode depois de mexer no overlay ou nos dados:
 *   npx tsx scripts/auditar-cobertura.ts
 *
 * O resultado alimenta docs/wordpress-proximos-passos.md. Se os números
 * divergirem do que está lá, o documento é que está velho.
 */
import { filmSections } from "../src/data/films";
import { cleaningSections } from "../src/data/cleaning";
import { premiumSections } from "../src/data/premium";
import { aboutPpf, parabrisa, kitInterno, ppfLines, ppfLogos, ppfSections } from "../src/data/ppf";
import { heroSlides, features, counters, serviceSections, team, salesTeam } from "../src/data/home";
import { galleryCategories } from "../src/data/gallery2";
import { navItems } from "../src/data/navigation";
import { site } from "../src/data/site";

/** Chaves que não são conteúdo: caminhos de arquivo, dimensões, flags. */
const NAO_E_CONTEUDO = new Set([
  "src", "width", "height", "hex", "color", "href", "icon", "variant", "id", "slug",
]);

/** Campos que o overlay de src/lib/content.ts realmente lê. */
const COBERTO = [
  /^gallery2\.galleryCategories\[\]\.label$/,
  /^gallery2\.galleryCategories\[\]\.photos\[\]\.alt$/,
  /^home\.(team|salesTeam)\[\]\.(name|role)$/,
  /^home\.heroSlides\[\]\.(titleStart|titleHighlight|titleEnd|subtitle|background)$/,
  /^home\.features\[\]\.(title|text)$/,
  /^home\.counters\[\]\.label$/,
  /^home\.serviceSections\[\]\.(titleStart|titleHighlight|description|checklist\[\])$/,
  /^(films|cleaning|premium)\.\w+\[\]\.cards\[\]\.(description|note)$/,
  /^(films|cleaning|premium)\.\w+\[\]\.cards\[\]\.benefits\[\]$/,
  /^(films|cleaning|premium)\.\w+\[\]\.cards\[\]\.groups\[\]\.(title|items\[\])$/,
  /^(films|cleaning|premium)\.\w+\[\]\.cards\[\]\.cta\.message$/,
  /^ppf\.(aboutPpf|parabrisa|kitInterno)\.(titleStart|titleHighlight|description|checklist\[\])$/,
  /^site\.site\.(phone|phoneHref|whatsapp|email|hours|instagramHandle)$/,
  /^site\.site\.social\.\w+$/,
];

/** Fora do painel de propósito — ver a fronteira da "camada segura". */
const PROPOSITAL = [
  /\.table\b/, /\.tables\[\]/, /badgeIcon/, /brandLogo/, /\.logo\./,
  /heroSlides\[\]\.buttons/, /\.background$/, /descriptionColor/, /orientation/,
  /^site\.site\.url$/,
];

const PAGINA: [RegExp, string][] = [
  [/^films\./, "/peliculas"],
  [/^cleaning\./, "/limpeza"],
  [/^premium\./, "/protecao-premium"],
  [/^ppf\./, "/ppf"],
  [/^home\.|^gallery2\./, "/ (home)"],
  [/^site\.|^navigation\./, "global"],
];

const achados = new Map<string, { n: number; amostra: string }>();

function anda(valor: unknown, caminho: string) {
  if (Array.isArray(valor)) {
    valor.forEach((v) => anda(v, caminho + "[]"));
  } else if (valor && typeof valor === "object") {
    for (const [k, v] of Object.entries(valor)) {
      if (!NAO_E_CONTEUDO.has(k)) anda(v, caminho ? `${caminho}.${k}` : k);
    }
  } else if (typeof valor === "string" && valor.trim()) {
    const a = achados.get(caminho) ?? { n: 0, amostra: valor };
    a.n += 1;
    achados.set(caminho, a);
  }
}

const raizes: [string, unknown][] = [
  ["films.filmSections", filmSections],
  ["cleaning.cleaningSections", cleaningSections],
  ["premium.premiumSections", premiumSections],
  ["ppf.ppfSections", ppfSections],
  ["ppf.aboutPpf", aboutPpf],
  ["ppf.parabrisa", parabrisa],
  ["ppf.kitInterno", kitInterno],
  ["ppf.ppfLines", ppfLines],
  ["ppf.ppfLogos", ppfLogos],
  ["home.heroSlides", heroSlides],
  ["home.features", features],
  ["home.counters", counters],
  ["home.serviceSections", serviceSections],
  ["home.team", team],
  ["home.salesTeam", salesTeam],
  ["gallery2.galleryCategories", galleryCategories],
  ["navigation.navItems", navItems],
  ["site.site", site],
];
for (const [nome, valor] of raizes) anda(valor, nome);

type Item = { caminho: string; n: number; amostra: string; estado: string; pagina: string };
const itens: Item[] = [...achados.entries()].map(([caminho, { n, amostra }]) => ({
  caminho,
  n,
  amostra,
  estado: COBERTO.some((r) => r.test(caminho))
    ? "coberto"
    : PROPOSITAL.some((r) => r.test(caminho))
      ? "proposital"
      : "lacuna",
  pagina: PAGINA.find(([r]) => r.test(caminho))?.[1] ?? "?",
}));

const soma = (f: (i: Item) => boolean) => itens.filter(f).reduce((t, i) => t + i.n, 0);

console.log("COBERTURA POR PÁGINA (em número de textos)\n");
console.log("página".padEnd(20) + "coberto".padStart(9) + "proposital".padStart(12) + "lacuna".padStart(9));
console.log("-".repeat(50));
for (const [, pag] of PAGINA) {
  const q = (e: string) => String(soma((i) => i.pagina === pag && i.estado === e));
  console.log(pag.padEnd(20) + q("coberto").padStart(9) + q("proposital").padStart(12) + q("lacuna").padStart(9));
}
console.log("-".repeat(50));
const tot = (e: string) => String(soma((i) => i.estado === e));
console.log("TOTAL".padEnd(20) + tot("coberto").padStart(9) + tot("proposital").padStart(12) + tot("lacuna").padStart(9));

console.log("\n\nLACUNAS, por volume\n");
console.log("qtd".padStart(4) + "  " + "página".padEnd(20) + "campo");
console.log("-".repeat(78));
for (const i of itens.filter((x) => x.estado === "lacuna").sort((a, b) => b.n - a.n || a.caminho.localeCompare(b.caminho))) {
  console.log(String(i.n).padStart(4) + "  " + i.pagina.padEnd(20) + i.caminho.replace(/^\w+\./, ""));
}
