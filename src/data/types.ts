/**
 * Tipos compartilhados pelos catálogos (películas, limpeza, PPF).
 *
 * Campos marcados como "rich text" aceitam <strong>/<b> para negrito, linha
 * em branco para novo parágrafo e quebra de linha simples para <br>
 * (renderizados por src/components/shared/RichText.tsx).
 */

/** Tabela de especificações técnicas de um card. */
export interface SpecTable {
  /** Cabeçalhos das colunas de valores (a primeira coluna é sempre "Spec") */
  columns: string[];
  rows: {
    label: string;
    values: string[];
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
  items: string[];
}

/** Ícones disponíveis para o selo do card (mapeados em FilmCard.tsx). */
export type BadgeIcon = "star" | "gem" | "layers" | "shield" | "tablet";

/** Um card de catálogo (película, pacote de limpeza ou serviço de PPF). */
export interface CatalogCard {
  title: string;
  subtitle: string;
  /** Selo de texto no canto do card (ex.: "3 anos", "até 10 anos") */
  badge?: string;
  /** Selo com ícone, alternativa ao texto */
  badgeIcon?: BadgeIcon;
  /** Lista simples de benefícios (com check vermelho) */
  benefits?: string[];
  /** Grupos de itens com título (Exterior / Interior / Acabamentos...) */
  groups?: ItemGroup[];
  table?: SpecTable;
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
  cards: CatalogCard[];
}
