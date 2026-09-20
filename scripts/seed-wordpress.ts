/**
 * Popula o WordPress a partir de src/data/*.ts.
 *
 * Roda uma vez, na Fase 3. Depois disso o WordPress passa a ser a fonte e
 * este script vira histórico — não o rode de novo depois que o cliente
 * começar a editar, ou você sobrescreve o trabalho dele.
 *
 * Uso:
 *   WP_USER=seu-login WP_APP_PASSWORD="xxxx xxxx xxxx xxxx" npx tsx scripts/seed-wordpress.ts
 *   ... --dry-run    mostra o que faria, sem escrever nada
 *
 * É idempotente: uploads já feitos ficam registrados em
 * scripts/.seed-manifest.json e posts são localizados pelo título antes de
 * serem criados. Interrompeu no meio? Rode de novo, ele continua de onde parou.
 */

import { readFileSync, existsSync, writeFileSync } from "node:fs";
import { join, basename } from "node:path";
import { galleryCategories } from "../src/data/gallery2";
import { team, salesTeam, heroSlides, features, counters, serviceSections } from "../src/data/home";
import { filmSections } from "../src/data/films";
import { cleaningSections } from "../src/data/cleaning";
import { premiumSections } from "../src/data/premium";
import { site } from "../src/data/site";

const WP = process.env.WP_API_URL || "https://detail.ecwd.cloud/wp-json/wp/v2";
const USER = process.env.WP_USER;
const PASS = process.env.WP_APP_PASSWORD;
const DRY = process.argv.includes("--dry-run");

const MANIFEST = join("scripts", ".seed-manifest.json");
const PUBLIC_DIR = "public";

// Pausa entre uploads. Rajada de requisições leva bloqueio temporário de WAF —
// 182 imagens sem pausa é exatamente o padrão que dispara isso.
const UPLOAD_DELAY_MS = 350;

if (!DRY && (!USER || !PASS)) {
  console.error(
    "Faltam credenciais.\n" +
      '  WP_USER=login WP_APP_PASSWORD="xxxx xxxx xxxx xxxx" npx tsx scripts/seed-wordpress.ts\n' +
      "Gere a senha em Usuários → Perfil → Senhas de aplicativo."
  );
  process.exit(1);
}

const auth = "Basic " + Buffer.from(`${USER}:${PASS}`).toString("base64");
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Cache local de uploads: caminho em public/ → ID do anexo no WordPress. */
const manifest: Record<string, number> = existsSync(MANIFEST)
  ? JSON.parse(readFileSync(MANIFEST, "utf8"))
  : {};

function saveManifest() {
  if (!DRY) writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
}

async function wp(path: string, init: RequestInit = {}, retries = 3): Promise<any> {
  for (let attempt = 0; ; attempt++) {
    const res = await fetch(`${WP}${path}`, {
      ...init,
      headers: {
        Authorization: auth,
        "User-Agent": "DetailCasaDasCapotas-Seed/1.0",
        ...(init.headers || {}),
      },
    });

    if (res.ok) return res.json();

    // 5xx e 429 costumam ser bloqueio temporário; o resto é erro real
    const retriable = res.status >= 500 || res.status === 429;
    if (!retriable || attempt >= retries) {
      throw new Error(`${init.method || "GET"} ${path} → HTTP ${res.status}: ${await res.text()}`);
    }
    const wait = 3000 * (attempt + 1);
    console.warn(`    HTTP ${res.status}, nova tentativa em ${wait}ms`);
    await sleep(wait);
  }
}

/** Sobe uma imagem de public/ e devolve o ID do anexo. */
async function uploadImage(src: string, alt: string): Promise<number> {
  if (manifest[src]) return manifest[src];

  const file = join(PUBLIC_DIR, src);
  if (!existsSync(file)) throw new Error(`Imagem não encontrada: ${file}`);

  if (DRY) {
    console.log(`    [dry] subiria ${src}`);
    return 0;
  }

  const name = basename(src);
  const ext = name.split(".").pop()!.toLowerCase();
  const mime = ext === "png" ? "image/png" : ext === "webp" ? "image/webp" : "image/jpeg";

  const created = await wp("/media", {
    method: "POST",
    headers: {
      "Content-Type": mime,
      "Content-Disposition": `attachment; filename="${name}"`,
    },
    body: new Uint8Array(readFileSync(file)),
  });

  // O alt vai numa segunda chamada: o endpoint de upload recebe o binário no
  // corpo, então não sobra espaço para os metadados na mesma requisição.
  await wp(`/media/${created.id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ alt_text: alt, title: alt || name }),
  });

  manifest[src] = created.id;
  saveManifest();
  await sleep(UPLOAD_DELAY_MS);
  return created.id;
}

/** Cria um post do CPT se ainda não existir um com o mesmo título. */
async function ensurePost(
  type: string,
  title: string,
  acf: Record<string, unknown>,
  menuOrder?: number
): Promise<number> {
  const found = await wp(`/${type}?per_page=100&_fields=id,title&search=${encodeURIComponent(title)}`);
  const hit = Array.isArray(found)
    ? found.find((p: any) => p.title.rendered.trim() === title.trim())
    : null;

  const body: Record<string, unknown> = { title, status: "publish", acf };
  if (menuOrder !== undefined) body.menu_order = menuOrder;

  if (DRY) {
    console.log(`    [dry] ${hit ? "atualizaria" : "criaria"} ${type}: ${title}`);
    return hit?.id ?? 0;
  }

  const saved = await wp(hit ? `/${type}/${hit.id}` : `/${type}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  console.log(`    ${hit ? "atualizado" : "criado"}: ${title} (id ${saved.id})`);
  return saved.id;
}

async function seedGallery() {
  console.log(`\n▸ Galeria — ${galleryCategories.length} categorias`);
  for (const [i, cat] of galleryCategories.entries()) {
    console.log(`  ${cat.label} (${cat.photos.length} fotos)`);
    const ids: number[] = [];
    for (const photo of cat.photos) {
      ids.push(await uploadImage(photo.src, photo.alt));
    }
    // O campo Galeria do ACF recebe IDs de anexo na escrita, embora devolva
    // objetos completos na leitura com acf_format=standard.
    await ensurePost("galeria_categoria", cat.label, { fotos: ids }, i);
  }
}

async function seedTeam() {
  const all = [
    ...salesTeam.map((m) => ({ ...m, time: "vendas" as const })),
    ...team.map((m) => ({ ...m, time: "tecnica" as const })),
  ];
  console.log(`\n▸ Equipe — ${all.length} pessoas`);
  for (const [i, member] of all.entries()) {
    const fotoId = await uploadImage(member.photo.src, `${member.name} — ${member.role}`);
    await ensurePost(
      "membro_equipe",
      member.name,
      { cargo: member.role, foto: fotoId, time: member.time },
      i
    );
  }
}

async function seedCards() {
  const cards = [...filmSections, ...cleaningSections, ...premiumSections].flatMap((s) => s.cards);
  console.log(`\n▸ Cards de catálogo — ${cards.length} cards`);
  for (const card of cards) {
    await ensurePost("card_catalogo", card.title, {
      id_card: card.id,
      descricao: card.description ?? "",
      beneficios: (card.benefits ?? []).map((item) => ({ item })),
      nota: card.note ?? "",
      mensagem_cta: card.cta?.message ?? "",
    });
  }
}

async function seedSettings() {
  console.log("\n▸ Página Configurações (22)");
  const acf = {
    telefone: site.phone,
    telefone_link: site.phoneHref,
    whatsapp: site.whatsapp,
    email: site.email,
    horario: site.hours,
    instagram_handle: site.instagramHandle,
    instagram: site.social.instagram,
    facebook: site.social.facebook,
    youtube: site.social.youtube,
  };
  if (DRY) return console.log("    [dry]", acf);
  await wp("/pages/22", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ acf }),
  });
  console.log("    preenchida");
}

async function seedHome() {
  console.log("\n▸ Página Home (20)");

  const acf = {
    hero_slides: heroSlides.map((slide) => ({
      imagem: slide.background,
      // O par de botões é identificado pelo destino do primeiro botão; no
      // WordPress o cliente escolhe pelo nome, não monta link à mão.
      botoes: slide.buttons[0]?.href === "/peliculas" ? "peliculas" : "servicos",
      titulo_inicio: slide.titleStart,
      titulo_destaque: slide.titleHighlight,
      titulo_fim: slide.titleEnd ?? "",
      subtitulo: slide.subtitle,
    })),
    features: features.map((f) => ({ icone: f.icon, titulo: f.title, texto: f.text })),
    counters: counters.map((c) => ({
      numero: c.target,
      sufixo: c.suffix ?? "+",
      rotulo: c.label,
    })),
    secoes_servico: serviceSections.map((sec) => ({
      id_secao: sec.id,
      titulo_inicio: sec.titleStart,
      titulo_destaque: sec.titleHighlight,
      descricao: sec.description,
      // O campo no admin é "um item por linha"
      checklist: (sec.checklist ?? []).join("\n"),
    })),
  };

  if (DRY) {
    console.log("    [dry] %d slides, %d diferenciais, %d contadores, %d blocos",
      acf.hero_slides.length, acf.features.length, acf.counters.length, acf.secoes_servico.length);
    return;
  }

  await wp("/pages/20", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ acf }),
  });
  console.log("    preenchida: %d slides, %d diferenciais, %d contadores, %d blocos",
    acf.hero_slides.length, acf.features.length, acf.counters.length, acf.secoes_servico.length);
}

async function main() {
  console.log(`Seed → ${WP}${DRY ? "  (DRY RUN — nada será escrito)" : ""}`);
  await seedGallery();
  await seedTeam();
  await seedCards();
  await seedSettings();
  await seedHome();
  saveManifest();
  console.log(`\nConcluído. ${Object.keys(manifest).length} imagens no manifesto.`);
}

main().catch((err) => {
  console.error("\nFALHOU:", err.message);
  saveManifest();
  process.exit(1);
});
