import type { CatalogSection } from "./types";

/**
 * Pacotes de limpeza (página /limpeza).
 * Para alterar itens dos pacotes, edite apenas este arquivo.
 */
export const cleaningSections: CatalogSection[] = [
  {
    titleStart: "Nossos",
    titleHighlight: "Pacotes",
    description:
      "Dois pacotes desenvolvidos para atender desde a manutenção periódica até a revitalização completa do seu veículo.",
    cards: [
      {
        title: "Limpeza Clássica",
        subtitle: "Manutenção Periódica",
        badgeIcon: "star",
        groups: [
          {
            title: "Exterior",
            items: [
              "Pré-lavagem em espuma",
              "Lavagem com luva de microfibra",
              "Rodas e caixas com pincéis e escovas",
              "Detalhamento (APC) em borrachas, frisos e emblemas",
              "Secagem com toalhas + jato de ar",
            ],
          },
          {
            title: "Interior",
            items: ["Aspiração + limpeza leve", "Vidros veiculares"],
          },
          {
            title: "Acabamentos (externos)",
            items: ["Revitalizador de pneus"],
          },
        ],
        cta: {
          label: "Agendar Limpeza Clássica",
          message: "Olá! Gostaria de agendar uma Limpeza Clássica.",
        },
      },
      {
        title: "Limpeza Técnica",
        subtitle: "Revitalização Completa",
        badgeIcon: "gem",
        groups: [
          {
            title: "Exterior",
            items: [
              "Pré-lavagem em espuma",
              "Lavagem com luva de microfibra",
              "Rodas e caixas com pincéis",
              "Detalhamento (APC) em acabamentos",
              "Descontaminação com clay bar (contaminação leve)",
              "Secagem controlada",
            ],
          },
          {
            title: "Interior",
            items: ["Aspiração + limpeza leve", "Vidros veiculares"],
          },
          {
            title: "Acabamentos (externos)",
            items: [
              "Revitalizador de pneus",
              "Selante de pintura (até 3 meses)",
              "Condicionamento de plásticos externos (até 3 meses)",
            ],
          },
        ],
        note: "*Descontaminação não remove riscos. Em contaminação alta, recomenda-se polimento.",
        cta: {
          label: "Agendar Limpeza Técnica",
          message: "Olá! Gostaria de agendar uma Limpeza Técnica.",
        },
      },
    ],
  },
];
