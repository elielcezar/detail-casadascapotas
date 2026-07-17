/**
 * Tipos compartilhados pelos catálogos (películas, limpeza, PPF).
 *
 * Campos marcados como "rich text" aceitam <strong>/<b> para negrito, linha
 * em branco para novo parágrafo e quebra de linha simples para <br>
 * (renderizados por src/components/shared/RichText.tsx).
 */

/** Tabela de especificações técnicas de um card. */
export interface SpecTable {
  /** Cabeçalhos das colunas de valores (a célula da primeira coluna fica vazia) */
  columns: string[];
  /** Oculta a linha de cabeçalho por completo (tabelas de uma coluna só) */
  hideHeader?: boolean;
  rows: {
    label: string;
    values: string[];
    /** Destaca a linha (fundo branco, texto azul) — ex.: energia solar total rejeitada */
    highlight?: boolean;
  }[];
}

/** Bolinha de tonalidade exibida abaixo da tabela. */
export interface Shade {
  /** Cor CSS (ex.: "#111") */
  color: string;
  /** Rótulo exibido no tooltip (ex.: "FX 5") */
  label: string;
}

/** Grupo de itens com título (ex.: "Exterior", "Interior"). */
export interface ItemGroup {
  title: string;
  /** Lista simples de itens (com check) */
  items?: string[];
  /** Tons de cor (ex.: Matte/Gloss/Black Piano) — alternativa a items */
  swatches?: { hex: string; label: string }[];
}

/** Ícones disponíveis para o selo do card (mapeados em FilmCard.tsx). */
export type BadgeIcon = "star" | "gem" | "layers" | "shield" | "tablet";

/** Logo de marca (ex.: 3M) exibido em um card ou no topo de uma seção. */
export interface BrandLogo {
  src: string;
  width: number;
  height: number;
  /** Altura exibida no header do card, em px (padrão: 22px) */
  displayHeight?: number;
  alt: string;
}

/** Um card de catálogo (película, pacote de limpeza ou serviço de PPF). */
export interface CatalogCard {
  title: string;
  subtitle?: string;
  /** Selo de texto no canto do card (ex.: "3 anos", "até 10 anos") */
  badge?: string;
  /** Selo com ícone, alternativa ao texto */
  badgeIcon?: BadgeIcon;
  /** Logo de marca exibido no header do card (ex.: logo 3M) */
  brandLogo?: BrandLogo;
  /** Lista simples de benefícios (com check vermelho) */
  benefits?: string[];
  /** Grupos de itens com título (Exterior / Interior / Acabamentos...) */
  groups?: ItemGroup[];
  /** Tabela única de especificações */
  table?: SpecTable;
  /** Múltiplas tabelas rotuladas (ex.: variantes "Fundo Verde" / "Fundo Grafite") */
  tables?: { label: string; table: SpecTable }[];
  shades?: Shade[];
  /** Nota em itálico ao final do card (rich text) */
  note?: string;
  /** Botão de WhatsApp ao final do card */
  cta?: {
    label: string;
    /** Mensagem pré-preenchida no WhatsApp */
    message: string;
  };
}

/** Uma seção de página de catálogo (título + cards). */
export interface CatalogSection {
  titleStart: string;
  titleHighlight: string;
  /** Rich text — ver nota no topo do arquivo */
  description: string;
  /** Logo de marca exibido acima do título da seção (ex.: logo 3M) */
  logo?: BrandLogo;
  /** Título exibido imediatamente acima da grade de cards (ex.: "Marcas de PPF") */
  cardsTitle?: string;
  cards: CatalogCard[];
}
