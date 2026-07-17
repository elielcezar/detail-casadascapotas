import type { CatalogSection } from "./types";

const logo3M = { src: "/img/3m-white.png", width: 346, height: 183, alt: "Logo 3M" };

/**
 * Catálogo de películas (página /peliculas).
 * Para alterar specs, garantias ou benefícios, edite apenas este arquivo.
 */
export const filmSections: CatalogSection[] = [
  {
    titleStart: "Linha",
    titleHighlight: "3M",
    description:
      "Há mais de 100 anos, a 3M é referência mundial em inovação, qualidade e proteção. Suas películas automotivas oferecem controle solar, proteção contra raios UV, conforto térmico e acabamento premium.\n\nA Casa das Capotas é Revendedor e Aplicador Autorizado 3M, unindo produtos originais à experiência de uma equipe especializada para garantir uma instalação precisa e o máximo desempenho em cada projeto.",
    cards: [
      {
        title: "Linha FX",
        subtitle: "Linha de Entrada",
        brandLogo: logo3M,
        benefits: [
          "Película de controle solar",
          "Melhora o conforto térmico",
          "Redução de ofuscamento",
          "Proteção UV",
          "Excelente custo-benefício dentro da 3M",
          "Cor fundo marrom",
          "3 ANOS DE GARANTIA",
        ],
        table: {
          columns: ["FX 5", "FX 20", "FX 35", "FX 50", "FX 70"],
          rows: [
            {
              label: "Energia Solar Total Rejeitada",
              values: ["61%", "57%", "54%", "50%", "46%"],
              highlight: true,
            },
            { label: "VLT", values: ["4%", "20%", "28%", "45%", "59%"] },
            { label: "Bloqueio UV", values: ["99%", "99%", "99%", "99%", "99%"] },
            { label: "Redução de Ofuscamento", values: ["95%", "74%", "63%", "40%", "21%"] },
          ],
        },
      },
      {
        title: "Linha SAS",
        subtitle: "Película de Segurança",
        brandLogo: logo3M,
        benefits: [
          "Película de segurança e proteção",
          "Aumenta a resistência do vidro",
          "Ajuda a segurar estilhaços em caso de quebra",
          "Pode ser usada em veículos, residências e lojas",
          "Cor fundo grafite",
          "3 ANOS DE GARANTIA",
        ],
        table: {
          columns: ["SAS 5", "SAS 20", "SAS 35"],
          rows: [
            {
              label: "Energia Solar Total Rejeitada",
              values: ["60%", "58%", "55%"],
              highlight: true,
            },
            { label: "VLT", values: ["5%", "17%", "27%"] },
            { label: "Bloqueio UV", values: ["99%", "99%", "99%"] },
            { label: "Redução de Ofuscamento", values: ["94%", "78%", "65%"] },
          ],
        },
      },
      {
        title: "Color Stable",
        subtitle: "Premium — Nano Cerâmica",
        brandLogo: logo3M,
        benefits: [
          "Película nano cerâmica",
          "Alta rejeição de calor",
          "Proteção UV",
          "Não desbota / não fica roxa",
          "Excelente equilíbrio entre performance e custo",
          "Melhor visibilidade interna",
          "Cor fundo grafite",
          "10 ANOS DE GARANTIA",
        ],
        table: {
          columns: ["CS IR 5", "CS IR 15", "CS IR 35", "CS IR 50", "CS IR 70"],
          rows: [
            {
              label: "Energia Solar Total Rejeitada",
              values: ["64%", "53%", "57%", "54%", "50%"],
              highlight: true,
            },
            { label: "VLT", values: ["7%", "14%", "32%", "46%", "58%"] },
            { label: "Bloqueio UV", values: ["99,9%", "99,8%", "99,7%", "99,7%", "99,7%"] },
            { label: "Redução de Ofuscamento", values: ["91%", "81%", "57%", "37%", "21%"] },
          ],
        },
      },
      {
        title: "Ceramic IR",
        subtitle: "Premium — Nano Cerâmica",
        brandLogo: logo3M,
        benefits: [
          "Película nano cerâmica de alta performance",
          "Rejeição de calor superior",
          "Alta transparência",
          "Proteção UV",
          "Indicada para quem quer máximo conforto térmico",
          "Cor fundo grafite",
          "12 ANOS DE GARANTIA",
        ],
        table: {
          columns: ["CIR 5", "CIR 15", "CIR 35", "CIR 50"],
          rows: [
            {
              label: "Energia Solar Total Rejeitada",
              values: ["66%", "63%", "58%", "54%"],
              highlight: true,
            },
            { label: "VLT", values: ["5%", "16%", "37%", "5%"] },
            { label: "Bloqueio UV", values: ["99,9%", "99,9%", "99,8%", "99,8%"] },
            { label: "Redução de Ofuscamento", values: ["93%", "78%", "49%", "32%"] },
          ],
        },
      },
      {
        title: "Crystalline",
        subtitle: "Super Premium — Nano Cerâmica",
        brandLogo: logo3M,
        benefits: [
          "Linha topo de mercado da 3M",
          "Máxima rejeição de calor com altíssima transparência",
          "Proteção UV com FPS superior a 1.700",
          "Não altera a estética do vidro",
          "Não desbota e não perde performance com o tempo",
          "15 ANOS DE GARANTIA",
        ],
        table: {
          columns: ["CR 20", "CR 40", "CR 70", "CR 90"],
          rows: [
            {
              label: "Energia Solar Total Rejeitada",
              values: ["62%", "6%", "50%", "34%"],
              highlight: true,
            },
            { label: "VLT", values: ["20%", "39%", "69%", "86%"] },
            { label: "Bloqueio UV", values: ["99%", "99%", "99%", "99%"] },
            { label: "Redução de Ofuscamento", values: ["77%", "55%", "22%", "3%"] },
          ],
        },
      },
    ],
  },
  {
    titleStart: "Solarium Film e",
    titleHighlight: "Antishock",
    description:
      "A Solarium Film e a Antishock oferecem soluções em películas e proteção de superfícies com tecnologia, inovação e alta performance. Seus produtos garantem conforto térmico, proteção contra raios UV, rejeição de calor e preservação da estética, além de alta resistência contra riscos, impactos e agentes externos, proporcionando durabilidade, segurança e qualidade.",
    cards: [
      {
        title: "Sunblue Nano Ceramic",
        subtitle: "Nano Cerâmica",
        benefits: ["Cor fundo azul", "10 ANOS DE GARANTIA"],
        table: {
          hideHeader: true,
          columns: ["Valor"],
          rows: [
            { label: "Visibilidade", values: ["75%"] },
            { label: "Bloqueio UV", values: ["99,9%"] },
            { label: "Bloqueio Infravermelho", values: ["95%"] },
          ],
        },
      },
      {
        title: "Sunblue Nano com PS 4mil",
        subtitle: "Nano Carbono",
        benefits: ["Cor fundo azul", "5 ANOS DE GARANTIA"],
        table: {
          hideHeader: true,
          columns: ["Valor"],
          rows: [
            { label: "Visibilidade", values: ["73%"] },
            { label: "Bloqueio UV", values: ["99%"] },
            { label: "Bloqueio Infravermelho", values: ["87%"] },
          ],
        },
      },
      {
        title: "Sunblack Nano Ceramic",
        subtitle: "Nano Cerâmica",
        benefits: ["Cor fundo grafite", "6 ANOS DE GARANTIA"],
        table: {
          hideHeader: true,
          columns: ["5%", "20%", "35%"],
          rows: [
            { label: "Visibilidade", values: ["5%", "20%", "35%"] },
            { label: "Bloqueio UV", values: ["99,9%", "99,9%", "99,9%"] },
            { label: "Bloqueio Infravermelho", values: ["95%", "95%", "95%"] },
          ],
        },
      },
      {
        title: "Sunblock Nano",
        subtitle: "Nano Carbono",
        benefits: ["Cor fundo grafite", "5 ANOS DE GARANTIA"],
        table: {
          hideHeader: true,
          columns: ["5%", "20%", "35%"],
          rows: [
            { label: "Visibilidade", values: ["5%", "20%", "35%"] },
            { label: "Bloqueio UV", values: ["100%", "100%", "100%"] },
            { label: "Bloqueio Infravermelho", values: ["60%", "55%", "40%"] },
          ],
        },
      },
      {
        title: "PS Clean",
        subtitle: "Anti Vandalismo",
        benefits: [
          "Película de segurança anti-vandalismo",
          "Diversas espessuras disponíveis",
          "Proteção contra quebra e estilhaços",
        ],
        table: {
          hideHeader: true,
          columns: ["4 Mil", "8 Mil", "8 Mil", "11 Mil"],
          rows: [{ label: "Visibilidade", values: ["G20%", "G5%", "20%", "20%"] }],
        },
      },
      {
        title: "Película Diamond",
        subtitle: "Linha Profissional",
        benefits: [
          "Boa qualidade e ótimo custo-benefício",
          "Estética bonita",
          "Redução de calor moderada",
          "Opção mais acessível",
          "Cor fundo grafite",
          "1 ANO DE GARANTIA",
        ],
        tables: [
          {
            label: "Fundo Verde",
            table: {
              hideHeader: true,
              columns: ["5%", "20%", "35%", "50%"],
              rows: [
                { label: "Visibilidade", values: ["5%", "20%", "35%", "50%"] },
                { label: "Bloqueio UV", values: ["100%", "99%", "99%", "99%"] },
                { label: "Bloqueio Infravermelho", values: ["30%", "22%", "18%", "10%"] },
              ],
            },
          },
          {
            label: "Fundo Grafite",
            table: {
              hideHeader: true,
              columns: ["5%", "20%", "35%", "50%"],
              rows: [
                { label: "Visibilidade", values: ["5%", "20%", "35%", "50%"] },
                { label: "Bloqueio UV", values: ["99%", "99%", "99%", "99%"] },
                { label: "Bloqueio Infravermelho", values: ["76%", "58%", "42%", "0%"] },
              ],
            },
          },
        ],
      },
    ],
  },
];
