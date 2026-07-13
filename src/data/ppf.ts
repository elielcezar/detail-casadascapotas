import type { CatalogSection } from "./types";

/**
 * Portfólio de PPF — Paint Protection Film (página /ppf).
 * Para alterar marcas, coberturas ou acabamentos, edite apenas este arquivo.
 */
export const ppfSections: CatalogSection[] = [
  {
    titleStart: "Proteção de",
    titleHighlight: "Pintura",
    description:
      "Película transparente que protege a pintura contra riscos, pedras e detritos, preservando a estética original do veículo.",
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
        table: {
          columns: ["New X", "Anti Shock"],
          rows: [
            { label: "Proteção", values: ["10 anos", "7 anos"] },
            { label: "Espessura", values: ["265 micras", "190 micras"] },
          ],
        },
        groups: [
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
          "Uso residencial, comercial e automotivo",
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
        ],
        cta: {
          label: "Solicitar Orçamento",
          message: "Olá! Gostaria de um orçamento do PPF Kit Interno.",
        },
      },
    ],
  },
];
