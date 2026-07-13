import type { Metadata } from "next";
import CatalogBlock from "@/components/shared/CatalogBlock";
import CtaSection from "@/components/shared/CtaSection";
import PageHero from "@/components/shared/PageHero";
import { filmSections } from "@/data/films";

export const metadata: Metadata = {
  title: "Catálogo de Películas",
  description:
    "Catálogo completo de películas automotivas: 3M FX, Color Stable, Ceramic IR, Crystalline, Sunblack, Sunblock e mais. Garantia de fábrica de até 15 anos.",
};

export default function PeliculasPage() {
  return (
    <>
      <PageHero
        start="Catálogo de"
        highlight="Películas"
        text="Conheça todas as linhas de películas que trabalhamos. Da entrada à super premium, temos a solução ideal para você."
      />
      {filmSections.map((section, i) => (
        <CatalogBlock key={section.titleHighlight} section={section} alt={i % 2 === 1} />
      ))}
      <CtaSection
        titleStart="Ficou com"
        titleStrong="Dúvida?"
        text="Nossa equipe está pronta para ajudar você a escolher a película ideal para o seu veículo."
        whatsappLabel="Falar com Especialista"
        whatsappMessage="Olá! Vi o catálogo de películas e gostaria de mais informações."
      />
    </>
  );
}
