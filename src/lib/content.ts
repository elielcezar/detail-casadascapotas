/**
 * Camada de overlay: junta o conteúdo do WordPress com os valores padrão de
 * src/data/*.ts.
 *
 * As duas regras que valem para tudo neste arquivo:
 *
 * 1. Falha de rede ou HTTP **não** é tratada aqui — a exceção sobe e derruba
 *    o build, de propósito. Publicar o site com seções vazias apagaria o
 *    conteúdo do ar; um build quebrado é recuperável.
 *
 * 2. Conteúdo ausente no WordPress cai no padrão do código. É o que permite
 *    migrar uma seção por vez sem que as outras sumam, e o que protege o site
 *    se alguém esvaziar um campo no admin por engano.
 */

import { cache } from "react";
import {
  getCatalogCards as wpGetCatalogCards,
  type WordPressServiceSection,
  getHomeContent as wpGetHomeContent,
  getGalleryCategories as wpGetGalleryCategories,
  getServiceSections as wpGetServiceSections,
  getSiteSettings as wpGetSiteSettings,
  indexCatalogCards,
  WP_PAGE_IDS,
  linesToList,
  getTeamMembers as wpGetTeamMembers,
  stripHtml,
  toSiteImage,
} from "./wordpress";
import { galleryCategories, type GalleryCategory } from "@/data/gallery2";
import {
  counters,
  features,
  heroButtonPresets,
  heroSlides,
  salesTeam,
  serviceSections,
  team,
  type Counter,
  type Feature,
  type HeroSlide,
  type ServiceSection,
  type TeamMember,
} from "@/data/home";
import { aboutPpf, kitInterno, parabrisa } from "@/data/ppf";
import { site } from "@/data/site";
import type { CatalogSection, ItemGroup } from "@/data/types";

/**
 * Categorias da galeria filtrável.
 *
 * Categoria sem nenhuma foto é descartada em vez de virar um filtro que abre
 * numa grade vazia. Se sobrar nenhuma, o site usa a galeria do código.
 */
export async function getGallery(): Promise<GalleryCategory[]> {
  const fromWp = (await wpGetGalleryCategories())
    .map((cat) => ({
      slug: cat.slug,
      label: stripHtml(cat.title.rendered),
      photos: (Array.isArray(cat.acf?.fotos) ? cat.acf.fotos : []).map(toSiteImage),
    }))
    .filter((cat) => cat.photos.length > 0);

  return fromWp.length > 0 ? fromWp : galleryCategories;
}

/**
 * Equipe, separada pelo campo "time" do admin.
 *
 * O fallback é por grupo, não global: se o cliente cadastrar só o time de
 * vendas, a equipe técnica continua vindo do código em vez de sumir da home.
 */
export async function getTeam(): Promise<{ tecnica: TeamMember[]; vendas: TeamMember[] }> {
  const members = (await wpGetTeamMembers())
    // Membro sem foto quebraria o layout da grade; ignorar é melhor do que
    // publicar um card vazio.
    .filter((member) => member.acf?.foto)
    .map((member) => ({
      time: member.acf.time,
      member: {
        name: stripHtml(member.title.rendered),
        role: stripHtml(member.acf.cargo ?? ""),
        photo: toSiteImage(member.acf.foto),
      },
    }));

  const pick = (time: "tecnica" | "vendas") =>
    members.filter((m) => m.time === time).map((m) => m.member);

  const tecnica = pick("tecnica");
  const vendas = pick("vendas");

  return {
    tecnica: tecnica.length > 0 ? tecnica : team,
    vendas: vendas.length > 0 ? vendas : salesTeam,
  };
}

/**
 * Contatos e redes sociais.
 *
 * Envolvido em `cache()` do React: vários componentes de servidor chamam esta
 * função na mesma renderização e só uma requisição sai de fato.
 *
 * `site.url` fica de fora de propósito — é usado em canonical, sitemap e
 * Open Graph, que precisam do valor no momento do build e não podem depender
 * de alguém não ter apagado um campo no admin.
 */
export const getSettings = cache(async (): Promise<typeof site> => {
  const wp = await wpGetSiteSettings();
  const pick = (value: string | undefined, padrao: string) =>
    value && value.trim() ? value.trim() : padrao;

  return {
    ...site,
    phone: pick(wp.telefone, site.phone),
    phoneHref: pick(wp.telefone_link, site.phoneHref),
    whatsapp: pick(wp.whatsapp, site.whatsapp),
    email: pick(wp.email, site.email),
    hours: pick(wp.horario, site.hours),
    instagramHandle: pick(wp.instagram_handle, site.instagramHandle),
    social: {
      instagram: pick(wp.instagram, site.social.instagram),
      facebook: pick(wp.facebook, site.social.facebook),
      youtube: pick(wp.youtube, site.social.youtube),
    },
  };
});

/**
 * Aplica os textos do WordPress sobre as seções de catálogo do código.
 *
 * Só descrição, benefícios, nota e mensagem do CTA vêm do admin. Tabelas de
 * especificação, tonalidades, grupos, logos de marca, ordem e a divisão em
 * seções continuam no código — é a fronteira da "camada segura".
 *
 * O casamento é pelo `id_card`. Card sem correspondente no WordPress fica
 * exatamente como está, o que permite adicionar um card novo no código sem
 * precisar cadastrá-lo no admin antes.
 *
 * Envolvido em `cache()` porque as três páginas de catálogo chamam esta
 * função, e sem isso seriam três requisições idênticas por build.
 */
const getCardOverrides = cache(async () => indexCatalogCards(await wpGetCatalogCards()));

export async function overlayCatalog(sections: CatalogSection[]): Promise<CatalogSection[]> {
  const byId = await getCardOverrides();

  return sections.map((section) => ({
    ...section,
    cards: section.cards.map((card) => {
      const wp = byId.get(card.id);
      if (!wp) return card;

      const beneficios = (Array.isArray(wp.beneficios) ? wp.beneficios : [])
        .map((linha) => linha?.item?.trim())
        .filter((item): item is string => Boolean(item));

      // Listas com título próprio (Exterior / Interior / Acabamentos). Grupo
      // sem título ou sem nenhum item é descartado em vez de virar um bloco
      // vazio no card.
      const grupos: ItemGroup[] = (Array.isArray(wp.grupos) ? wp.grupos : [])
        .map((g) => ({ title: g?.titulo?.trim() ?? "", items: linesToList(g?.itens) }))
        .filter((g) => g.title.length > 0 && g.items.length > 0);

      return {
        ...card,
        description: wp.descricao?.trim() || card.description,
        benefits: beneficios.length > 0 ? beneficios : card.benefits,
        groups: grupos.length > 0 ? grupos : card.groups,
        note: wp.nota?.trim() || card.note,
        cta: card.cta
          ? { ...card.cta, message: wp.mensagem_cta?.trim() || card.cta.message }
          : card.cta,
      };
    }),
  }));
}

/* -------------------------------------------------------------------------
 * Home
 * ---------------------------------------------------------------------- */

export interface HomeContent {
  heroSlides: HeroSlide[];
  features: Feature[];
  counters: Counter[];
  serviceSections: ServiceSection[];
}

/**
 * Conteúdo da home, com cada bloco caindo no padrão do código de forma
 * independente: o cliente pode preencher só os contadores e o resto continua
 * exatamente como está hoje.
 *
 * Em `cache()` porque a home monta quatro componentes diferentes a partir
 * desta mesma página do WordPress.
 */
export const getHome = cache(async (): Promise<HomeContent> => {
  const wp = await wpGetHomeContent();

  const wpHero: HeroSlide[] = wp.hero_slides.map((slide) => ({
    background: slide.imagem,
    titleStart: slide.titulo_inicio ?? "",
    titleHighlight: slide.titulo_destaque ?? "",
    titleEnd: slide.titulo_fim?.trim() || undefined,
    subtitle: slide.subtitulo ?? "",
    // O par de botões vem do código, escolhido pelo nome guardado no admin
    buttons: heroButtonPresets[slide.botoes] ?? heroButtonPresets.servicos,
  }));

  const wpFeatures: Feature[] = wp.features.map((f) => ({
    icon: f.icone,
    title: f.titulo,
    text: f.texto,
  }));

  const wpCounters: Counter[] = wp.counters.map((c) => ({
    target: Number(c.numero),
    suffix: c.sufixo?.trim() || undefined,
    label: c.rotulo,
  }));

  // Blocos de serviço são overlay, não substituição: layout, foto, âncora,
  // CTA e link continuam no código, casados por `id`.
  const wpSections = aplicarBlocosServico(serviceSections, wp.secoes_servico);

  return {
    heroSlides: wpHero.length > 0 ? wpHero : heroSlides,
    features: wpFeatures.length > 0 ? wpFeatures : features,
    counters: wpCounters.length > 0 ? wpCounters : counters,
    serviceSections: wpSections,
  };
});

/**
 * Sobrescreve os textos de blocos de serviço, casando por `id`.
 *
 * Usada pela home e pela /ppf: as duas páginas usam o mesmo formato, com
 * conjuntos de `id` diferentes. Bloco sem correspondente no WordPress fica
 * intacto, e layout, foto, âncora e CTA seguem vindo do código.
 */
function aplicarBlocosServico(
  secoes: ServiceSection[],
  overrides: WordPressServiceSection[]
): ServiceSection[] {
  const porId = new Map(overrides.map((o) => [o.id_secao, o]));

  return secoes.map((secao) => {
    const over = porId.get(secao.id);
    if (!over) return secao;

    const checklist = linesToList(over.checklist);
    return {
      ...secao,
      titleStart: over.titulo_inicio?.trim() || secao.titleStart,
      titleHighlight: over.titulo_destaque?.trim() || secao.titleHighlight,
      description: over.descricao?.trim() || secao.description,
      checklist: checklist.length > 0 ? checklist : secao.checklist,
    };
  });
}

/** Os três blocos da página /ppf. */
export const getPpfSections = cache(async (): Promise<ServiceSection[]> => {
  const overrides = await wpGetServiceSections(WP_PAGE_IDS.ppf);
  return aplicarBlocosServico([aboutPpf, parabrisa, kitInterno], overrides);
});
