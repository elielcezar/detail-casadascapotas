import type { Metadata } from "next";
import { WP_PAGE_IDS } from "@/lib/wordpress";
import { pageSeo } from "@/data/seo";
import CatalogBlock from "@/components/shared/CatalogBlock";
import CtaSection from "@/components/shared/CtaSection";
import PageHero from "@/components/shared/PageHero";
import PremiumCard from "@/components/shared/PremiumCard";
import { premiumSections } from "@/data/premium";
import { getPageSeo, overlayCatalog } from "@/lib/content";

/**
 * Título e descrição vêm do WordPress, com o texto abaixo como padrão.
 * Metadata vazia é pior que desatualizada: sem ela o Google inventa a
 * sua própria a partir do conteúdo da página.
 */
export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo(WP_PAGE_IDS.protecaoPremium);
  return {
    title: seo.title ?? pageSeo.protecaoPremium.title,
    description: seo.description ?? pageSeo.protecaoPremium.description,
  };
}

export default async function ProtecaoPremiumPage() {
  const sections = await overlayCatalog(premiumSections);

  return (
    <>
      <PageHero
        start="Proteção"
        highlight="Premium"
        text="Revestimentos nano cerâmicos de alta tecnologia para proteger cada detalhe do seu veículo, por dentro e por fora."
      />
      {sections.map((section, i) => (
        <CatalogBlock
          key={section.titleHighlight}
          section={section}
          alt={i % 2 === 1}
          columns="full"
          renderCard={(card, j) => (
            <PremiumCard card={card} textSide={j % 2 === 0 ? "left" : "right"} />
          )}
        />
      ))}
      <CtaSection
        titleStart="Ficou com"
        titleStrong="Dúvida?"
        text="Nossa equipe está pronta para ajudar você a escolher o revestimento ideal para o seu veículo."
        whatsappLabel="Falar com Especialista"
        whatsappMessage="Olá! Vi a página de Proteção Premium e gostaria de mais informações."
      />
    </>
  );
}
