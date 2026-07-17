import type { CatalogSection } from "./types";

const logo3M = { src: "/img/3m-white.png", width: 346, height: 183, alt: "Logo 3M" };
const logoAntishock = {
  src: "/img/antishock-w.png",
  width: 143,
  height: 42,
  alt: "Logo Antishock",
  displayHeight: 42,
};

/** Acabamentos disponíveis nas linhas de PPF (Matte / Gloss / Black Piano). */
const ppfFinishes = [
  { hex: "#1b1f22", label: "Matte" },
  { hex: "#838687", label: "Gloss" },
  { hex: "#000001", label: "Black Piano" },
];

/**
 * Portfólio de PPF — Paint Protection Film (página /ppf).
 * Para alterar marcas, coberturas ou acabamentos, edite apenas este arquivo.
 */
export const ppfSections: CatalogSection[] = [
  {
    titleStart: "PPF –",
    titleHighlight: "Paint Protection Film",
    description:
      "Aplicação em todas as superfícies externas pintadas do veículo, exceto em peças plásticas sem pintura, superfícies porosas e acabamentos cromados.\n\nAplicação nas superfícies internas de alto contato, como tela multimídia, painel de instrumentos, quadro de instrumentos e console central (exceto acabamentos plásticos texturizados ou porosos).",
    cardsTitle: "Marcas de PPF",
    cards: [
      {
        title: "Linha Premium",
        brandLogo: logo3M,
        benefits: ["Produto 3M", "256 micras", "10 anos de proteção"],
        groups: [
          {
            title: "Linhas",
            swatches: ppfFinishes,
          },
        ],
        cta: {
          label: "Solicitar Orçamento",
          message: "Olá! Gostaria de um orçamento da Linha Premium de PPF.",
        },
      },
      {
        title: "Linha Standart",
        brandLogo: logoAntishock,
        benefits: ["190 micras", "Anti Shock", "7 anos de proteção"],
        groups: [
          {
            title: "Linhas",
            swatches: ppfFinishes,
          },
        ],
        cta: {
          label: "Falar com Especialista",
          message: "Olá! Gostaria de saber mais sobre a Linha Standart de PPF.",
        },
      },
    ],
  },
];

/** Blocos "Coberturas de PPF" (imagem + título), exibidos lado a lado em fundo escuro. */
export const ppfLines: {
  image: { src: string; width: number; height: number; alt: string };
  title: string;
}[] = [
  {
    image: {
      src: "/img/carro-frontal.jpg",
      width: 1126,
      height: 518,
      alt: "PPF Frontal aplicado no veículo",
    },
    title: "PPF Frontal",
  },
  {
    image: {
      src: "/img/carro-quina.jpg",
      width: 1126,
      height: 518,
      alt: "PPF Quina e Concha aplicado no veículo",
    },
    title: "PPF Quina e Concha",
  },
  {
    image: {
      src: "/img/carro-fullppf.jpg",
      width: 1126,
      height: 518,
      alt: "Full PPF aplicado no veículo",
    },
    title: "Full PPF",
  },
];
