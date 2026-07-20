import type { Metadata } from "next";
import CatalogBlock from "@/components/shared/CatalogBlock";
import CtaSection from "@/components/shared/CtaSection";
import PageHero from "@/components/shared/PageHero";
import { cleaningSections } from "@/data/cleaning";

export const metadata: Metadata = {
  title: "Portfólio de Limpeza",
  description:
    "Portfólio de limpeza automotiva profissional: Limpeza Clássica e Limpeza Técnica. Lavagem detalhada, descontaminação, selante de pintura e mais.",
};

export default function LimpezaPage() {
  return (
    <>
      <PageHero
        start="Portfólio de"
        highlight="Limpeza"
        text="Conheça nossos pacotes de limpeza automotiva. Da manutenção periódica à revitalização completa, cuidado profissional em cada detalhe."
      />
      {cleaningSections.map((section) => (
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
