import type { CatalogSection } from "./types";

/**
 * Portfólio de Proteção Premium — revestimentos nano cerâmicos
 * (página /protecao-premium).
 * Para alterar produtos ou durabilidades, edite apenas este arquivo.
 */
export const premiumSections: CatalogSection[] = [
  {
    logo: {
      src: "/img/nasiol.png",
      width: 300,
      height: 172,
      alt: "Logo Nasiol",
      plain: true,
    },
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
        description:
          "Uma das mais avançadas tecnologias para a proteção da pintura de veículos. Cria uma Camada de vidro flexível de alta resistência sobre o verniz do carro.",
        benefits: [
          "Escudo contra raios UV evitando desbotamento e a perda de brilho causados pelo sol.",
          "Protege contra agentes corrosivos do dia a dia, como seiva de árvores e fezes de pássaros.",
          "Resistência a micro-riscos: Minimiza riscos superficiais.",
          "Facilidade extrema de limpeza com repelência à líquidos, lavagens rápidas e economia de produtos de limpeza.",
          "Estética Premium: Brilho profundo, renovação visual, longa duração.",
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
          { src: "/img/protecao/glassshield/00.jpg", width: 600, height: 400, alt: "Glasshield — foto 1" },
          { src: "/img/protecao/glassshield/01.jpg", width: 600, height: 467, alt: "Glasshield — foto 2" },
          { src: "/img/protecao/glassshield/02.jpg", width: 600, height: 606, alt: "Glasshield — foto 3" },
          { src: "/img/protecao/glassshield/03.jpg", width: 600, height: 400, alt: "Glasshield — foto 4" },
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
          { src: "/img/protecao/cabincare/00.jpg", width: 600, height: 600, alt: "Cabincare — foto 1" },
          { src: "/img/protecao/cabincare/01.jpg", width: 600, height: 399, alt: "Cabincare — foto 2" },
          { src: "/img/protecao/cabincare/02.jpg", width: 600, height: 407, alt: "Cabincare — foto 3" },
          { src: "/img/protecao/cabincare/03.jpg", width: 600, height: 400, alt: "Cabincare — foto 4" },
        ],
        benefits: [
          "Para estofos, painéis de portas, forros de teto e capotas de tetos conversíveis",
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
