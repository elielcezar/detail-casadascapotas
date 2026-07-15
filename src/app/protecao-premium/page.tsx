import type { Metadata } from "next";
import CatalogBlock from "@/components/shared/CatalogBlock";
import CtaSection from "@/components/shared/CtaSection";
import PageHero from "@/components/shared/PageHero";
import { premiumSections } from "@/data/premium";

export const metadata: Metadata = {
  title: "Proteção Premium",
  description:
    "Revestimentos nano cerâmicos de alta tecnologia: Vitrificação, Glasshield, Leatherboost e Cabincare. Proteção premium para pintura, vidros, couro e estofados.",
};

export default function ProtecaoPremiumPage() {
  return (
    <>
      <PageHero
        start="Proteção"
        highlight="Premium"
        text="Revestimentos nano cerâmicos de alta tecnologia para proteger cada detalhe do seu veículo, por dentro e por fora."
      />
      {premiumSections.map((section, i) => (
        <CatalogBlock
          key={section.titleHighlight}
          section={section}
          alt={i % 2 === 1}
          columns={2}
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
