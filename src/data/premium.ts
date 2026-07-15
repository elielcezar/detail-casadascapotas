import type { CatalogSection } from "./types";

/**
 * Portfólio de Proteção Premium — revestimentos nano cerâmicos
 * (página /protecao-premium).
 * Para alterar produtos ou durabilidades, edite apenas este arquivo.
 */
export const premiumSections: CatalogSection[] = [
  {
    titleStart: "Nano",
    titleHighlight: "Coatings",
    description:
      "Revestimentos nano cerâmicos de alta tecnologia que elevam a proteção do seu veículo a um novo patamar — da pintura ao couro, dos vidros aos estofados.",
    cards: [
      {
        title: "Vitrificação",
        subtitle: "Revestimento Nano Cerâmico",
        benefits: [
          "Revestimento nano cerâmico de alta tecnologia",
          "Alta repelência contra líquidos e sujeira",
        ],
        table: {
          columns: ["NeoCoat X", "MetalCoat F2", "XR03", "ZR53", "NL272"],
          rows: [
            {
              label: "Durabilidade",
              values: ["6 meses", "1 ano", "1,5 anos", "3 anos", "5 anos"],
            },
          ],
        },
        cta: {
          label: "Solicitar Orçamento",
          message: "Olá! Gostaria de saber mais sobre a Vitrificação.",
        },
      },
      {
        title: "Glasshield",
        subtitle: "Nano Cerâmico para Vidros",
        benefits: [
          "Aumenta a visibilidade em dias de chuva",
          "Aumenta a segurança do condutor e passageiros",
          "Inclui remoção de chuva ácida",
        ],
        cta: {
          label: "Solicitar Orçamento",
          message: "Olá! Gostaria de saber mais sobre o Glasshield.",
        },
      },
      {
        title: "Leatherboost",
        subtitle: "Nano Coating para Couro",
        benefits: [
          "Para couro natural e sintético",
          "Prolonga a vida útil do couro",
          "Protege contra produtos químicos e raios UV",
          "Reduz o desgaste e protege contra manchas",
          "Limpeza super fácil",
          "Repelência à água e óleo",
        ],
        cta: {
          label: "Solicitar Orçamento",
          message: "Olá! Gostaria de saber mais sobre o Leatherboost.",
        },
      },
      {
        title: "Cabincare",
        subtitle: "Nano Coating para Estofados",
        benefits: [
          "Para estofos, painéis de portas, forros de teto e tetos conversíveis",
          "Protege contra derramamentos espontâneos",
          "Aumenta a vida útil dos assentos",
          "Fórmula não alérgica e livre de tóxicos",
          "Repelência à água e óleo",
        ],
        cta: {
          label: "Solicitar Orçamento",
          message: "Olá! Gostaria de saber mais sobre o Cabincare.",
        },
      },
    ],
  },
];
