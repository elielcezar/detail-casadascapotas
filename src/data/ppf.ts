import type { CatalogSection } from "./types";

const logo3M = { src: "/img/3m-white.png", width: 346, height: 183, alt: "Logo 3M" };

/**
 * Portfólio de PPF — Paint Protection Film (página /ppf).
 * Para alterar marcas, coberturas ou acabamentos, edite apenas este arquivo.
 */
export const ppfSections: CatalogSection[] = [
  {
    titleStart: "Superfícies",
    titleHighlight: "Protegidas",
    description:
      "Aplicação em todas as superfícies externas pintadas do veículo, exceto em peças plásticas sem pintura, superfícies porosas e acabamentos cromados.\n\nAplicação nas superfícies internas de alto contato, como tela multimídia, painel de instrumentos, quadro de instrumentos e console central (exceto acabamentos plásticos texturizados ou porosos).",
    cards: [
      {
        title: "PPF Frontal",
        subtitle: "Proteção de Pintura",
        badge: "até 10 anos",
        groups: [
          {
            title: "Áreas de aplicação",
            items: [
              "Capô",
              "Parachoque",
              "Faróis",
              "Retrovisores",
              "Parte frontal completa",
            ],
          },
          {
            title: "Coberturas disponíveis",
            items: ["PPF Frontal", "PPF Quina e Concha", "Full PPF"],
          },
        ],
        cta: {
          label: "Solicitar Orçamento",
          message: "Olá! Gostaria de um orçamento de PPF Frontal.",
        },
      },
      {
        title: "Marcas e Acabamentos",
        subtitle: "Linhas de PPF",
        badgeIcon: "layers",
        brandLogo: logo3M,
        table: {
          columns: ["New X", "Anti Shock"],
          rows: [
            { label: "Proteção", values: ["10 anos", "7 anos"] },
            { label: "Espessura", values: ["265 micras", "190 micras"] },
          ],
        },
        groups: [
          {
            title: "Marcas",
            items: ["New X — Linha Premium", "Anti Shock — Linha Standard"],
          },
          {
            title: "Acabamentos",
            items: ["Fosco", "Auto brilho", "Black piano"],
          },
        ],
        cta: {
          label: "Falar com Especialista",
          message: "Olá! Gostaria de saber mais sobre as linhas e acabamentos de PPF.",
        },
      },
    ],
  },
  {
    titleStart: "Outras",
    titleHighlight: "Aplicações",
    description:
      "A proteção do PPF vai além da pintura: soluções também para vidros e para o interior do veículo.",
    cards: [
      {
        title: "PPF Para-brisa",
        subtitle: "Película de Segurança para Vidros",
        badgeIcon: "shield",
        benefits: [
          "Aumenta a resistência do vidro",
          "Ajuda contra estilhaçamento",
          "Uso automotivo",
        ],
        cta: {
          label: "Solicitar Orçamento",
          message: "Olá! Gostaria de um orçamento de PPF para para-brisa.",
        },
      },
      {
        title: "PPF Kit Interno",
        subtitle: "Console / Painel / Multimídia",
        badgeIcon: "tablet",
        benefits: [
          "Película protetora para multimídia, console e painel",
          "Aumenta a proteção contra riscos e danos do dia a dia",
          "Ajuda contra o desgaste natural",
          "Cliente pode escolher o PPF Gloss ou Fosco",
        ],
        note: "*Necessário análise de viabilidade em áreas em Black piano — não é possível aplicar em partes plásticas.",
        cta: {
          label: "Solicitar Orçamento",
          message: "Olá! Gostaria de um orçamento do PPF Kit Interno.",
        },
      },
    ],
  },
];
