import type { Metadata } from "next";
import { WP_PAGE_IDS } from "@/lib/wordpress";
import { pageSeo } from "@/data/seo";
import CatalogBlock from "@/components/shared/CatalogBlock";
import ServiceShowcase from "@/components/home/ServiceShowcase";
import CtaSection from "@/components/shared/CtaSection";
import ImageTitleGrid from "@/components/shared/ImageTitleGrid";
import PageHero from "@/components/shared/PageHero";
import PPFLogosSection from "@/components/shared/PPFLogosSection";
import { ppfLines, ppfLogos, ppfSections } from "@/data/ppf";
import { getPageSeo, getPpfSections, overlayCatalog } from "@/lib/content";

/**
 * Título e descrição vêm do WordPress, com o texto abaixo como padrão.
 * Metadata vazia é pior que desatualizada: sem ela o Google inventa a
 * sua própria a partir do conteúdo da página.
 */
export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo(WP_PAGE_IDS.ppf);
  return {
    title: seo.title ?? pageSeo.ppf.title,
    description: seo.description ?? pageSeo.ppf.description,
  };
}

export default async function PpfPage() {
  // Os três blocos vêm na ordem em que aparecem na página
  const [sobre, parabrisa, kitInterno] = await getPpfSections();
  const sections = await overlayCatalog(ppfSections);

  return (
    <>
      <PageHero
        start="Portfólio de"
        highlight="PPF"
        text="Paint Protection Film: proteção invisível contra riscos, pedras e desgaste do dia a dia — para a pintura, os vidros e o interior do seu veículo."
      />
      <ServiceShowcase service={sobre} />
      {sections.map((section, i) => (
        <CatalogBlock key={section.titleHighlight} section={section} alt={i % 2 === 1} />
      ))}
      <PPFLogosSection logos={ppfLogos} />
      <ImageTitleGrid slides={ppfLines} />
      <ServiceShowcase service={parabrisa} />
      <ServiceShowcase service={kitInterno} />
      <CtaSection
        titleStart="Ficou com"
        titleStrong="Dúvida?"
        text="Nossa equipe está pronta para ajudar você a escolher a proteção PPF ideal para o seu veículo."
        whatsappLabel="Falar com Especialista"
        whatsappMessage="Olá! Vi o portfólio de PPF e gostaria de mais informações."
      />
    </>
  );
}
