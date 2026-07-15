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
        image={{
          src: "/img/3m-header.jpg",
          width: 2498,
          height: 310,
          alt: "3M — Tecnologia, Proteção e Performance",
          mobileSrc: "/img/3m-header-mob.jpg",
        }}
      />
      {filmSections.map((section, i) => (
        <CatalogBlock key={section.titleHighlight} section={section} alt={i % 2 === 1} wide />
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
