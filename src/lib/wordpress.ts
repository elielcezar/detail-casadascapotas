/**
 * Integração com o WordPress headless (detail.ecwd.cloud).
 *
 * Esta é a camada de busca e de tipos. A regra de overlay — estrutura e
 * valores padrão vivem em src/data/*.ts e o WordPress sobrescreve apenas os
 * campos editáveis — é aplicada nos componentes, não aqui.
 *
 * Todas as chamadas acontecem durante o build (output: "export"). Nenhuma
 * roda no navegador, então CORS não participa desta integração.
 */

const WP_API_URL =
  process.env.NEXT_PUBLIC_WP_API_URL || "https://detail.ecwd.cloud/wp-json/wp/v2";

/**
 * Origem das imagens servidas pelo WordPress.
 *
 * O admin vive hoje em detail.ecwd.cloud e a URL de cada anexo entra gravada
 * no HTML estático publicado. Quando o WordPress mudar de domínio, basta
 * definir NEXT_PUBLIC_WP_MEDIA_URL e rebuildar — nenhum componente muda.
 * Sem a variável, usa a própria origem da API.
 */
const WP_MEDIA_ORIGIN =
  process.env.NEXT_PUBLIC_WP_MEDIA_URL?.replace(/\/$/, "") ||
  new URL(WP_API_URL).origin;

/** Reescreve a origem de uma URL de mídia do WP para WP_MEDIA_ORIGIN. */
export function wpMediaUrl(url: string): string {
  return url.replace(/^https?:\/\/[^/]+/, WP_MEDIA_ORIGIN);
}

// Espera entre tentativas. WAFs e anti-DDoS bloqueiam rajadas vindas de IPs
// de datacenter (o runner do GitHub Actions é um deles), e esse bloqueio é
// temporário — esperar costuma resolver.
const RETRY_DELAYS_MS = [2000, 5000, 15000, 30000];

/**
 * Busca na API do WordPress com retentativas.
 *
 * Lança erro em vez de devolver vazio, de propósito. O site é um export
 * estático: se uma chamada falhasse silenciosamente e devolvesse [], o build
 * passaria e publicaria a página sem conteúdo — apagando a seção do ar. Um
 * build que falha é recuperável; um deploy vazio destrói o que estava
 * publicado. Sempre prefira quebrar o build.
 */
async function wpFetch(path: string): Promise<Response> {
  let lastError = new Error("erro desconhecido");

  for (let attempt = 0; attempt <= RETRY_DELAYS_MS.length; attempt++) {
    if (attempt > 0) {
      const delay = RETRY_DELAYS_MS[attempt - 1];
      console.warn(`[WordPress] ${path} falhou (${lastError.message}); nova tentativa em ${delay}ms`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    let res: Response;
    try {
      // Identifica o cliente: o fetch do Node manda "User-Agent: node" por
      // padrão, que muitos WAFs tratam como bot e barram.
      res = await fetch(`${WP_API_URL}${path}`, {
        headers: {
          "User-Agent": "DetailCasaDasCapotas-Build/1.0 (+https://casadascapotascuritiba.com)",
          Accept: "application/json",
        },
      });
    } catch (error) {
      // Falha de rede/DNS: vale repetir
      lastError = error instanceof Error ? error : new Error(String(error));
      continue;
    }

    if (res.ok) return res;

    lastError = new Error(`HTTP ${res.status} ${res.statusText}`);

    // 4xx (exceto 429) é erro da requisição em si: repetir não muda nada
    if (res.status < 500 && res.status !== 429) break;
  }

  throw new Error(
    `[WordPress] ${path} falhou após ${RETRY_DELAYS_MS.length + 1} tentativas: ${lastError.message}. ` +
      `Build abortado de propósito — publicar com dados vazios apagaria o conteúdo do site.`
  );
}

// Decodifica entidades HTML numéricas e nomeadas mais comuns
// (WordPress retorna aspas curvas, traços e similares como &#NNNN;)
export function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&ldquo;/g, "“")
    .replace(/&rdquo;/g, "”")
    .replace(/&lsquo;/g, "‘")
    .replace(/&rsquo;/g, "’")
    .replace(/&ndash;/g, "–")
    .replace(/&mdash;/g, "—")
    .replace(/&hellip;/g, "…")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

// Remove tags HTML e decodifica entidades — para texto puro vindo do WP
export function stripHtml(html: string): string {
  return decodeHtmlEntities(html.replace(/<[^>]*>/g, "")).trim();
}

/* -------------------------------------------------------------------------
 * Imagens
 * ---------------------------------------------------------------------- */

/** Campo de imagem do ACF com acf_format=standard. */
export interface WordPressImage {
  url: string;
  alt: string;
  width: number;
  height: number;
}

/** Formato de imagem usado pelos componentes do site (AppImage, galerias). */
export interface SiteImage {
  src: string;
  width: number;
  height: number;
  alt: string;
}

/**
 * Converte a imagem do ACF para o formato dos componentes, já aplicando a
 * normalização de origem. Use sempre isto — nunca `img.url` direto.
 */
export function toSiteImage(img: WordPressImage): SiteImage {
  return {
    src: wpMediaUrl(img.url),
    width: img.width,
    height: img.height,
    alt: decodeHtmlEntities(img.alt || ""),
  };
}

/* -------------------------------------------------------------------------
 * Páginas de conteúdo (buscadas por ID)
 * ---------------------------------------------------------------------- */

/**
 * IDs das páginas do WordPress que alimentam o site.
 *
 * Preencher na Fase 1, com o `post=NNN` da URL do admin. Renomear a página é
 * seguro; excluir e recriar quebra o build.
 */
export const WP_PAGE_IDS = {
  home: 20,
  configuracoes: 22,
  ppf: 261,
};

export interface WordPressPage {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  acf: Record<string, unknown>;
}

// Buscar página individual por ID
// null aqui significa "não existe", não "falhou" — falha vira exceção
export async function getPageById(id: number): Promise<WordPressPage | null> {
  if (!id) {
    throw new Error(
      "[WordPress] ID de página não configurado. Preencha WP_PAGE_IDS em src/lib/wordpress.ts (Fase 1)."
    );
  }
  const res = await wpFetch(`/pages/${id}?acf_format=standard`);
  return res.json();
}

/* -------------------------------------------------------------------------
 * CPT: galeria_categoria
 * ---------------------------------------------------------------------- */

/**
 * Uma categoria da galeria filtrável. As fotos vêm do campo Gallery do ACF —
 * fonte única de imagem deste tipo. A imagem destacada não é usada em lugar
 * nenhum, de propósito: duas fontes fariam a mesma categoria aparecer com
 * capas diferentes dependendo da tela.
 */
export interface WordPressGalleryCategory {
  id: number;
  slug: string;
  title: { rendered: string };
  menu_order: number;
  acf: {
    fotos: WordPressImage[];
  };
}

// Ordenar por menu_order exige que o CPT declare 'page-attributes' em
// `supports`; sem isso o WordPress rejeita orderby=menu_order com HTTP 400.
export async function getGalleryCategories(): Promise<WordPressGalleryCategory[]> {
  const res = await wpFetch(
    "/galeria_categoria?per_page=100&acf_format=standard&orderby=menu_order&order=asc"
  );
  return res.json();
}

/* -------------------------------------------------------------------------
 * CPT: membro_equipe
 * ---------------------------------------------------------------------- */

export interface WordPressTeamMember {
  id: number;
  slug: string;
  /** Nome da pessoa */
  title: { rendered: string };
  menu_order: number;
  acf: {
    cargo: string;
    foto: WordPressImage;
    /** Separa a equipe técnica do time de vendas na home */
    time: "tecnica" | "vendas";
  };
}

export async function getTeamMembers(): Promise<WordPressTeamMember[]> {
  const res = await wpFetch(
    "/membro_equipe?per_page=100&acf_format=standard&orderby=menu_order&order=asc"
  );
  return res.json();
}

/* -------------------------------------------------------------------------
 * CPT: card_catalogo
 * ---------------------------------------------------------------------- */

/**
 * Textos editáveis de um card de catálogo (películas, limpeza, premium).
 *
 * `id_card` casa com o `id` do card em src/data/*.ts. Tabelas de
 * especificação, tonalidades, grupos e logos de marca continuam no código —
 * o WordPress não os controla.
 */
export interface WordPressCatalogCard {
  id: number;
  /** Título do post — é o nome do card que o cliente vê e edita no admin. */
  title: { rendered: string };
  acf: {
    id_card: string;
    subtitulo: string;
    descricao: string;
    beneficios: { item: string }[];
    /** Listas com titulo proprio; `itens` vem com um por linha. */
    grupos: { titulo: string; itens: string }[];
    nota: string;
    cta_label: string;
    mensagem_cta: string;
  };
}

export async function getCatalogCards(): Promise<WordPressCatalogCard[]> {
  const res = await wpFetch("/card_catalogo?per_page=100&acf_format=standard");
  return res.json();
}

/**
 * Indexa os cards por `id_card`, que é como o overlay os procura.
 *
 * Devolve o post inteiro, não só o `acf`: o nome do card é o título do
 * post, e o cliente edita por ali.
 */
export function indexCatalogCards(
  cards: WordPressCatalogCard[]
): Map<string, WordPressCatalogCard> {
  return new Map(cards.map((card) => [card.acf.id_card, card]));
}

/* -------------------------------------------------------------------------
 * Conteúdo das páginas de configuração
 * ---------------------------------------------------------------------- */

/**
 * Normaliza um repeater do ACF.
 *
 * Um repeater sem nenhuma linha volta da API como `false`, não como `[]`.
 * Sem isto, todo `.map()` sobre um repeater vazio quebraria o build.
 */
function asArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

/**
 * Contatos e redes sociais.
 *
 * Tudo é opcional de propósito: pela regra de overlay, campo vazio no admin
 * significa "usa o valor de src/data/site.ts", não "apaga do site".
 */
export interface WordPressSiteSettings {
  telefone: string;
  telefone_link: string;
  whatsapp: string;
  email: string;
  horario: string;
  instagram_handle: string;
  instagram: string;
  facebook: string;
  youtube: string;
}

export async function getSiteSettings(): Promise<Partial<WordPressSiteSettings>> {
  const page = await getPageById(WP_PAGE_IDS.configuracoes);
  return (page?.acf ?? {}) as Partial<WordPressSiteSettings>;
}

/** Slide do carrossel da home. A imagem de fundo continua em public/img. */
export interface WordPressHeroSlide {
  /** Caminho do banner, escolhido entre os que existem em public/img */
  imagem: string;
  titulo_inicio: string;
  titulo_destaque: string;
  titulo_fim: string;
  subtitulo: string;
  /** Par de botões pré-definido; os rótulos e ações moram no código */
  botoes: "servicos" | "peliculas";
}

export interface WordPressFeature {
  icone: "award" | "users" | "shield";
  titulo: string;
  texto: string;
}

export interface WordPressCounter {
  numero: number;
  sufixo: string;
  rotulo: string;
}

/**
 * Bloco de serviço da home. Só os textos e o checklist são editáveis —
 * âncora, lado da imagem, fundo alternado e proporção da foto continuam em
 * src/data/home.ts, casados por `id_secao`.
 */
export interface WordPressServiceSection {
  /** Casa com o `id` da seção em src/data. Cada página tem o seu conjunto. */
  id_secao: string;
  titulo_inicio: string;
  titulo_destaque: string;
  descricao: string;
  /** Um item por linha */
  checklist: string;
}

export interface WordPressHomeContent {
  hero_slides: WordPressHeroSlide[];
  features: WordPressFeature[];
  counters: WordPressCounter[];
  secoes_servico: WordPressServiceSection[];
}

export async function getHomeContent(): Promise<WordPressHomeContent> {
  const page = await getPageById(WP_PAGE_IDS.home);
  const acf = page?.acf ?? {};
  return {
    hero_slides: asArray<WordPressHeroSlide>(acf.hero_slides),
    features: asArray<WordPressFeature>(acf.features),
    counters: asArray<WordPressCounter>(acf.counters),
    secoes_servico: asArray<WordPressServiceSection>(acf.secoes_servico),
  };
}

/** Quebra um campo "um item por linha" na lista que os componentes esperam. */
export function linesToList(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

/**
 * Blocos de serviço de uma página de conteúdo.
 *
 * A home e a /ppf usam o mesmo formato de repeater, com conjuntos de
 * `id_secao` diferentes — por isso a busca recebe o ID da página.
 */
export async function getServiceSections(pageId: number): Promise<WordPressServiceSection[]> {
  const page = await getPageById(pageId);
  return asArray<WordPressServiceSection>(page?.acf?.secoes_servico);
}
