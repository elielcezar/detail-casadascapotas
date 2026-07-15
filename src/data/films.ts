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
        ],
        table: {
          columns: ["FX 5", "FX 20", "FX 35", "FX 50", "FX 70"],
          rows: [
            { label: "VLT", values: ["4%", "20%", "28%", "45%", "59%"] },
            { label: "Bloqueio UV", values: ["99%", "99%", "99%", "99%", "99%"] },
            { label: "Red. Ofuscamento", values: ["95%", "74%", "63%", "40%", "21%"] },
            { label: "TSER", values: ["61%", "57%", "54%", "50%", "46%"] },
          ],
        },
        shades: [
          { color: "#111", label: "FX 5" },
          { color: "#333", label: "FX 20" },
          { color: "#555", label: "FX 35" },
          { color: "#888", label: "FX 50" },
          { color: "#bbb", label: "FX 70" },
        ],
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
        ],
        table: {
          columns: ["SAS 5", "SAS 20", "SAS 35"],
          rows: [
            { label: "VLT", values: ["5%", "17%", "27%"] },
            { label: "Bloqueio UV", values: ["99%", "99%", "99%"] },
            { label: "Red. Ofuscamento", values: ["94%", "78%", "65%"] },
            { label: "TSER", values: ["60%", "58%", "55%"] },
          ],
        },
        shades: [
          { color: "#111", label: "SAS 5" },
          { color: "#333", label: "SAS 20" },
          { color: "#555", label: "SAS 35" },
        ],
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
        ],
        table: {
          columns: ["CS IR 5", "CS IR 15", "CS IR 35", "CS IR 50", "CS IR 70"],
          rows: [
            { label: "VLT", values: ["7%", "14%", "32%", "46%", "58%"] },
            { label: "Bloqueio UV", values: ["99,9%", "99,8%", "99,7%", "99,7%", "99,7%"] },
            { label: "Red. Ofuscamento", values: ["91%", "81%", "57%", "37%", "21%"] },
            { label: "TSER", values: ["64%", "63%", "57%", "54%", "50%"] },
          ],
        },
        shades: [
          { color: "#111", label: "CS IR 5" },
          { color: "#2a2a2a", label: "CS IR 15" },
          { color: "#555", label: "CS IR 35" },
          { color: "#888", label: "CS IR 50" },
          { color: "#bbb", label: "CS IR 70" },
        ],
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
        ],
        table: {
          columns: ["CIR 5", "CIR 15", "CIR 35", "CIR 50"],
          rows: [
            { label: "VLT", values: ["5%", "16%", "37%", "5%"] },
            { label: "Bloqueio UV", values: ["99,9%", "99,9%", "99,8%", "99,8%"] },
            { label: "Red. Ofuscamento", values: ["93%", "78%", "49%", "32%"] },
            { label: "TSER", values: ["66%", "63%", "58%", "54%"] },
          ],
        },
        shades: [
          { color: "#111", label: "CIR 5" },
          { color: "#2a2a2a", label: "CIR 15" },
          { color: "#666", label: "CIR 35" },
          { color: "#111", label: "CIR 50" },
        ],
      },
      {
        title: "Crystalline",
        subtitle: "Super Premium — Nano Cerâmica",
        brandLogo: logo3M,
        benefits: [
          "Linha topo de mercado da 3M",
          "Máxima rejeição de calor com altíssima transparência",
          "Proteção UV com FPS altíssimo",
          "Não altera a estética do vidro",
          "Não desbota e não perde performance com o tempo",
          "Garantia de fábrica",
        ],
        table: {
          columns: ["CR 20", "CR 40", "CR 70", "CR 90"],
          rows: [
            { label: "VLT", values: ["20%", "39%", "69%", "86%"] },
            { label: "Bloqueio UV", values: ["99%", "99%", "99%", "99%"] },
            { label: "Red. Ofuscamento", values: ["77%", "55%", "22%", "3%"] },
            { label: "TSER", values: ["62%", "60%", "50%", "34%"] },
          ],
        },
        shades: [
          { color: "#444", label: "CR 20" },
          { color: "#777", label: "CR 40" },
          { color: "#bbb", label: "CR 70" },
          { color: "#e8e8e8", label: "CR 90" },
        ],
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
        benefits: ["Tecnologia nano cerâmica", "Visibilidade de 75%", "Cor fundo azul"],
      },
      {
        title: "Sunblue Nano com PS 4mil",
        subtitle: "Nano Carbono",
        benefits: ["Tecnologia nano carbono", "Cor fundo azul"],
        table: {
          columns: ["PS 4mil"],
          rows: [
            { label: "Visibilidade", values: ["73%"] },
            { label: "Bloqueio UV", values: ["99%"] },
            { label: "Bloq. Infravermelho", values: ["87%"] },
          ],
        },
      },
      {
        title: "Sunblack Nano Ceramic",
        subtitle: "Nano Cerâmica",
        benefits: [
          "Tecnologia nano cerâmica",
          "Bloqueio UV de 99,9%",
          "Bloqueio infravermelho de 95%",
        ],
        table: {
          columns: ["5%", "20%", "35%"],
          rows: [
            { label: "Visibilidade", values: ["5%", "20%", "35%"] },
            { label: "Bloqueio UV", values: ["99,9%", "99,9%", "99,9%"] },
            { label: "Bloq. Infravermelho", values: ["95%", "95%", "95%"] },
          ],
        },
        shades: [
          { color: "#111", label: "5%" },
          { color: "#333", label: "20%" },
          { color: "#555", label: "35%" },
        ],
      },
      {
        title: "Sunblock Nano",
        subtitle: "Nano Carbono",
        benefits: [
          "Tecnologia nano carbono",
          "Bloqueio UV de 100%",
          "Boa rejeição de infravermelho",
        ],
        table: {
          columns: ["5%", "20%", "35%"],
          rows: [
            { label: "Visibilidade", values: ["5%", "20%", "35%"] },
            { label: "Bloqueio UV", values: ["100%", "100%", "100%"] },
            { label: "Bloq. Infravermelho", values: ["60%", "55%", "40%"] },
          ],
        },
        shades: [
          { color: "#111", label: "5%" },
          { color: "#333", label: "20%" },
          { color: "#555", label: "35%" },
        ],
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
          "Cor fundo verde e grafite",
        ],
        tables: [
          {
            label: "Fundo Verde",
            table: {
              columns: ["5%", "20%", "35%", "50%"],
              rows: [
                { label: "Visibilidade", values: ["5%", "20%", "35%", "50%"] },
                { label: "Bloqueio UV", values: ["100%", "99%", "99%", "99%"] },
                { label: "Bloq. Infravermelho", values: ["30%", "22%", "18%", "0%"] },
              ],
            },
          },
          {
            label: "Fundo Grafite",
            table: {
              columns: ["5%", "20%", "35%", "50%"],
              rows: [
                { label: "Visibilidade", values: ["5%", "20%", "35%", "50%"] },
                { label: "Bloqueio UV", values: ["99%", "99%", "99%", "99%"] },
                { label: "Bloq. Infravermelho", values: ["76%", "58%", "42%", "0%"] },
              ],
            },
          },
        ],
      },
    ],
  },
];
