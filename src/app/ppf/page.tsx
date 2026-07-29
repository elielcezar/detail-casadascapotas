import type { Metadata } from "next";
import CatalogBlock from "@/components/shared/CatalogBlock";
import ServiceShowcase from "@/components/home/ServiceShowcase";
import CtaSection from "@/components/shared/CtaSection";
import ImageTitleGrid from "@/components/shared/ImageTitleGrid";
import PageHero from "@/components/shared/PageHero";
import PPFLogosSection from "@/components/shared/PPFLogosSection";
import { aboutPpf, kitInterno, parabrisa, ppfLines, ppfLogos, ppfSections } from "@/data/ppf";

export const metadata: Metadata = {
  title: "Portfólio de PPF",
  description:
    "Portfólio de PPF - Paint Protection Film: Linha Premium e Linha Standard, com cobertura em PPF Frontal, Quina e Concha ou Full PPF. Proteção de até 10 anos para a pintura do seu veículo.",
};

export default function PpfPage() {
  return (
    <>
      <PageHero
        start="Portfólio de"
        highlight="PPF"
        text="Paint Protection Film: proteção invisível contra riscos, pedras e desgaste do dia a dia — para a pintura, os vidros e o interior do seu veículo."
      />
      <ServiceShowcase service={aboutPpf} />
      {ppfSections.map((section, i) => (
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
