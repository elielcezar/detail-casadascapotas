import type { CatalogSection } from "./types";

/**
 * Catálogo de películas (página /peliculas).
 * Para alterar specs, garantias ou benefícios, edite apenas este arquivo.
 */
export const filmSections: CatalogSection[] = [
  {
    titleStart: "Linha",
    titleHighlight: "3M",
    description:
      "Referência mundial em películas automotivas. Tecnologia, durabilidade e garantia de fábrica.",
    cards: [
      {
        title: "Linha FX",
        subtitle: "Linha de Entrada",
        badge: "3 anos",
        benefits: [
          "Película de controle solar",
          "Melhora o conforto térmico",
          "Redução de ofuscamento",
          "Proteção UV",
          "Excelente custo-benefício dentro da 3M",
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
        badge: "3 anos",
        benefits: [
          "Película de segurança e proteção",
          "Aumenta a resistência do vidro",
          "Ajuda a segurar estilhaços em caso de quebra",
          "Pode ser usada em veículos, residências e lojas",
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
        badge: "10 anos",
        benefits: [
          "Película nano cerâmica",
          "Alta rejeição de calor",
          "Proteção UV",
          "Não desbota / não fica roxa",
          "Excelente equilíbrio entre performance e custo",
          "Melhor visibilidade interna",
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
        badge: "12 anos",
        benefits: [
          "Película nano cerâmica de alta performance",
          "Rejeição de calor superior",
          "Alta transparência",
          "Proteção UV",
          "Indicada para quem quer máximo conforto térmico",
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
        badge: "15 anos",
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
    titleStart: "Outras",
    titleHighlight: "Linhas",
    description:
      "Películas de alta qualidade de marcas selecionadas para diferentes necessidades e orçamentos.",
    cards: [
      {
        title: "Sunblack Nano Ceramic",
        subtitle: "Nano Cerâmica",
        badge: "6 anos",
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
        title: "Sunblur Nano Ceramic",
        subtitle: "Nano Cerâmica",
        badge: "10 anos",
        benefits: [
          "Tecnologia nano cerâmica",
          "Bloqueio UV de 99,9%",
          "Bloqueio infravermelho de 95%",
        ],
        table: {
          columns: ["5%"],
          rows: [
            { label: "Visibilidade", values: ["5%"] },
            { label: "Bloqueio UV", values: ["99,9%"] },
            { label: "Bloq. Infravermelho", values: ["95%"] },
          ],
        },
        shades: [{ color: "#111", label: "5%" }],
      },
      {
        title: "Sunblock Nano",
        subtitle: "Nano Carbono",
        badge: "5 anos",
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
            { label: "Bloq. Infravermelho", values: ["65%", "55%", "10%"] },
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
        badge: "5 anos",
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
        badge: "1 ano",
        benefits: [
          "Boa qualidade e ótimo custo-benefício",
          "Estética bonita",
          "Redução de calor moderada",
          "Opção mais acessível",
        ],
      },
    ],
  },
];
