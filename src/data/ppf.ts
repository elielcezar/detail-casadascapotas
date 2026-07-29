import type { CatalogSection } from "./types";
import type { ServiceSection } from "./home";

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
        title: "Linha Standard",
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
          message: "Olá! Gostaria de saber mais sobre a Linha Standard de PPF.",
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

/** Bloco "O que é o PPF" — mesmo modelo de texto+imagem usado na home. */
export const aboutPpf: ServiceSection = {
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
    "<strong>PPF - PAINT PROTECTION FILM</strong>\n\nMais alto nível de Proteção contra arranhões, manchas e danos causados por detritos na estrada. Propriedades auto regenerativas que reparam pequenos arranhões quando expostos ao calor. Proteção aos raios UV e Criação de uma barreira invisível para manter a pintura do veículo impecável.\nTecnologias hidro-repelente (Repelência à água) facilitando a limpeza, impedindo que líquidos grudem na superfície.\n\n<strong>PPF Premium 100% TPU, com garantias a partir de 5 anos.</strong>\n1. Resistência a arranhões e pedriscos.\n2. Resistência a manchas\n3. Proteção contra os raios UV\n4. Resistência a desbotamento\n5. Preserva a pintura do veículo\n6. Acabamento com brilho intenso",
  primaryCta: {
    label: "Solicitar Orçamento",
    whatsappMessage: "Olá! Gostaria de saber mais sobre PPF.",
    icon: "whatsapp",
  },
  showPhone: false,
};

/** Bloco "PPF Para-brisa" — texto à esquerda, imagem à direita. */
export const parabrisa: ServiceSection = {
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
export const kitInterno: ServiceSection = {
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
