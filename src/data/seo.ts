/**
 * Título e descrição de cada página para buscadores.
 *
 * São o padrão: o WordPress sobrescreve quando o campo está preenchido, e
 * campo vazio no admin volta para o texto daqui.
 *
 * Ficam neste arquivo, e não dentro de cada `page.tsx`, para que o script de
 * seed possa ler da mesma fonte — duplicar a string nos dois lugares faria
 * um sair de sincronia com o outro na primeira alteração.
 *
 * `title` entra no template definido em `app/layout.tsx`, que acrescenta o
 * nome do site: o valor aqui é só a parte específica da página. A home é a
 * exceção e usa título absoluto, porque o padrão dela já vem do layout.
 */
export interface PageSeo {
  /** Chave em WP_PAGE_IDS, usada para achar a página no WordPress */
  pagina: "home" | "peliculas" | "limpeza" | "ppf" | "protecaoPremium";
  title: string;
  description: string;
}

export const pageSeo: Record<PageSeo["pagina"], Omit<PageSeo, "pagina">> = {
  home: {
    title: "Detail | Estética Automotiva em Curitiba",
    description:
      "Películas, PPF e limpeza automotiva profissional em Curitiba. Produtos 3M, garantia e equipe especializada.",
  },
  peliculas: {
    title: "Catálogo de Películas",
    description:
      "Catálogo completo de películas automotivas: 3M FX, Color Stable, Ceramic IR, Crystalline, Sunblack, Sunblock e mais. Garantia de fábrica de até 15 anos.",
  },
  limpeza: {
    title: "Portfólio de Limpeza",
    description:
      "Portfólio de limpeza automotiva profissional: Limpeza Clássica e Limpeza Técnica. Lavagem detalhada, descontaminação, selante de pintura e mais.",
  },
  ppf: {
    title: "Portfólio de PPF",
    description:
      "Portfólio de PPF - Paint Protection Film: Linha Premium e Linha Standard, com cobertura em PPF Frontal, Quina e Concha ou Full PPF. Proteção de até 10 anos para a pintura do seu veículo.",
  },
  protecaoPremium: {
    title: "Proteção Premium",
    description:
      "Revestimentos nano cerâmicos de alta tecnologia: Vitrificação, Glasshield, Leatherboost e Cabincare. Proteção premium para pintura, vidros, couro e estofados.",
  },
};
