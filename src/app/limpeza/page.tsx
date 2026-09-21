import type { Metadata } from "next";
import { WP_PAGE_IDS } from "@/lib/wordpress";
import { pageSeo } from "@/data/seo";
import CatalogBlock from "@/components/shared/CatalogBlock";
import CtaSection from "@/components/shared/CtaSection";
import PageHero from "@/components/shared/PageHero";
import { cleaningSections } from "@/data/cleaning";
import { getPageSeo, overlayCatalog } from "@/lib/content";

/**
 * Título e descrição vêm do WordPress, com o texto abaixo como padrão.
 * Metadata vazia é pior que desatualizada: sem ela o Google inventa a
 * sua própria a partir do conteúdo da página.
 */
export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo(WP_PAGE_IDS.limpeza);
  return {
    title: seo.title ?? pageSeo.limpeza.title,
    description: seo.description ?? pageSeo.limpeza.description,
  };
}

export default async function LimpezaPage() {
  const sections = await overlayCatalog(cleaningSections);

  return (
    <>
      <PageHero
        start="Portfólio de"
        highlight="Limpeza"
        text="Conheça nossos pacotes de limpeza automotiva. Da manutenção periódica à revitalização completa, cuidado profissional em cada detalhe."
      />
      {sections.map((section) => (
        <CatalogBlock key={section.titleHighlight} section={section} />
      ))}
      <CtaSection
        titleStart="Ficou com"
        titleStrong="Dúvida?"
        text="Nossa equipe está pronta para ajudar você a escolher o pacote de limpeza ideal para o seu veículo."
        whatsappLabel="Falar com Especialista"
        whatsappMessage="Olá! Vi o portfólio de limpeza e gostaria de mais informações."
      />
    </>
  );
}
