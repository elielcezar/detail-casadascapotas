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
        images: [
          { src: "/img/protecao/vitrificacao/IMG_0164.jpg", width: 600, height: 400, alt: "Vitrificação — foto 1" },
          { src: "/img/protecao/vitrificacao/IMG_3195.jpg", width: 600, height: 400, alt: "Vitrificação — foto 2" },
          { src: "/img/protecao/vitrificacao/IMG_3731.jpg", width: 600, height: 717, alt: "Vitrificação — foto 3" },
        ],
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
        images: [
          { src: "/img/protecao/glassshield/IMG_3829.jpg", width: 600, height: 400, alt: "Glasshield — foto 1" },
          { src: "/img/protecao/glassshield/222IMG_3829.jpg", width: 600, height: 400, alt: "Glasshield — foto 2" },
          { src: "/img/protecao/glassshield/Cópia-de-_MG_3171.jpg", width: 600, height: 400, alt: "Glasshield — foto 3" },
        ],
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
        images: [
          { src: "/img/protecao/leatherboost/IMG_0113.jpg", width: 600, height: 400, alt: "Leatherboost — foto 1" },
          { src: "/img/protecao/leatherboost/IMG_3897.jpg", width: 600, height: 400, alt: "Leatherboost — foto 2" },
          { src: "/img/protecao/leatherboost/IMG_4046.jpg", width: 600, height: 400, alt: "Leatherboost — foto 3" },
        ],
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
        images: [
          { src: "/img/protecao/cabincare/IMG_4098.jpg", width: 600, height: 400, alt: "Cabincare — foto 1" },
          { src: "/img/protecao/cabincare/IMG_4289.jpg", width: 600, height: 400, alt: "Cabincare — foto 2" },
          { src: "/img/protecao/cabincare/d2c37410-d8f5-4d88-8a5f-3cecd713f879.jpg", width: 600, height: 450, alt: "Cabincare — foto 3" },
        ],
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
