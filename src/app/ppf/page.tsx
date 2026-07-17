import type { Metadata } from "next";
import CatalogBlock from "@/components/shared/CatalogBlock";
import ServiceShowcase from "@/components/home/ServiceShowcase";
import CtaSection from "@/components/shared/CtaSection";
import ImageTitleGrid from "@/components/shared/ImageTitleGrid";
import PageHero from "@/components/shared/PageHero";
import type { ServiceSection } from "@/data/home";
import { ppfLines, ppfSections } from "@/data/ppf";

export const metadata: Metadata = {
  title: "Portfólio de PPF",
  description:
    "Portfólio de PPF - Paint Protection Film: Linha Premium e Linha Standart, com cobertura em PPF Frontal, Quina e Concha ou Full PPF. Proteção de até 10 anos para a pintura do seu veículo.",
};

/** Bloco "O que é o PPF" — mesmo modelo de texto+imagem usado na home. */
const aboutPpf: ServiceSection = {
  id: "sobre-ppf",
  altBackground: true,
  reversed: true,
  image: {
    src: "/img/ppf-luvas.jpg",
    width: 941,
    height: 1672,
    alt: "Profissional aplicando PPF com luvas no farol do veículo",
    orientation: "portrait",
  },
  imageBadge: "Proteção Invisível",
  titleStart: "Entenda o",
  titleHighlight: "PPF",
  descriptionColor: "blue",
  description:
    "<strong>O que é o PPF?</strong>\nO PPF é uma película transparente de alta tecnologia que protege a pintura do seu veículo sem alterar a cor ou o brilho original.\n\n<strong>Para o que serve?</strong>\nCria uma barreira de proteção contra riscos, pedras, arranhões, manchas e raios UV, preservando a aparência de veículo novo por muito mais tempo.\n\n<strong>Qual dor do cliente soluciona?</strong>\nEvita prejuízos com retoques e repinturas, ajuda a preservar o valor de revenda do veículo e garante mais tranquilidade para você aproveitar seu carro sem se preocupar com os pequenos danos do dia a dia.",
  primaryCta: {
    label: "Solicitar Orçamento",
    whatsappMessage: "Olá! Gostaria de saber mais sobre PPF.",
    icon: "whatsapp",
  },
  showPhone: false,
};

/** Bloco "PPF Para-brisa" — texto à esquerda, imagem à direita. */
const parabrisa: ServiceSection = {
  id: "ppf-parabrisa",
  altBackground: false,
  reversed: true,
  image: {
    src: "/img/carro-parabrisa.jpg",
    width: 1126,
    height: 518,
    alt: "Para-brisa de veículo com aplicação de PPF",
  },
  titleStart: "PPF –",
  titleHighlight: "Para-brisa",
  checklist: [
    "Película de Segurança para Vidros",
    "Aumenta a resistência do vidro",
    "Ajuda contra estilhaçamento",
    "Uso automotivo",
  ],
  primaryCta: {
    label: "Solicitar Orçamento",
    whatsappMessage: "Olá! Gostaria de um orçamento de PPF para o para-brisa.",
    icon: "whatsapp",
  },
  showPhone: false,
};

/** Bloco "PPF Kit Interno" — imagem à esquerda, texto à direita. */
const kitInterno: ServiceSection = {
  id: "ppf-kit-interno",
  altBackground: true,
  reversed: false,
  image: {
    src: "/img/carro-interno.jpg",
    width: 1416,
    height: 654,
    alt: "Console e painel interno do veículo com aplicação de PPF",
  },
  titleStart: "PPF –",
  titleHighlight: "Kit Interno",
  description: "Console/Painel",
  checklist: [
    "Película de protetora para multimídia, console, painel",
    "Aumenta a proteção de riscos e danos do dia a dia",
    "Ajuda contra desgaste natural",
    "O cliente pode escolher o PPF Gloss ou Fosco",
  ],
  note: "**Necessário análise de viabilidade em áreas em Black piano e não é possível aplicar em partes plásticas.",
  primaryCta: {
    label: "Solicitar Orçamento",
    whatsappMessage: "Olá! Gostaria de um orçamento do PPF Kit Interno.",
    icon: "whatsapp",
  },
  showPhone: false,
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
