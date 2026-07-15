import type { Metadata } from "next";
import CatalogBlock from "@/components/shared/CatalogBlock";
import CtaSection from "@/components/shared/CtaSection";
import PageHero from "@/components/shared/PageHero";
import SectionTitle from "@/components/shared/SectionTitle";
import { ppfSections } from "@/data/ppf";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Portfólio de PPF",
  description:
    "Portfólio de PPF - Paint Protection Film: PPF Frontal, Quina e Concha, Full PPF, para-brisa e kit interno. Proteção de até 10 anos para a pintura do seu veículo.",
};

const introText =
  "<strong>O que é o PPF?</strong>\nO PPF é uma película transparente de alta tecnologia que protege a pintura do seu veículo sem alterar a cor ou o brilho original.\n\n<strong>Para o que serve?</strong>\nCria uma barreira de proteção contra riscos, pedras, arranhões, manchas e raios UV, preservando a aparência de veículo novo por muito mais tempo.\n\n<strong>Qual dor do cliente soluciona?</strong>\nEvita prejuízos com retoques e repinturas, ajuda a preservar o valor de revenda do veículo e garante mais tranquilidade para você aproveitar seu carro sem se preocupar com os pequenos danos do dia a dia.";

export default function PpfPage() {
  return (
    <>
      <PageHero
        start="Portfólio de"
        highlight="PPF"
        image={{
          src: "/img/galeria/galeria-07.jpg",
          width: 1280,
          height: 1920,
          alt: "Profissional aplicando PPF com luvas no farol do veículo",
          fit: "cover",
        }}
      />
      <section className={styles.intro}>
        <div className="container">
          <SectionTitle
            variant="category"
            start="PPF —"
            highlight="Paint Protection Film"
            text={introText}
          />
        </div>
      </section>
      {ppfSections.map((section, i) => (
        <CatalogBlock key={section.titleHighlight} section={section} alt={i % 2 === 1} />
      ))}
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
