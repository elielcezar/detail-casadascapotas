import { Fragment } from "react";
import type { CatalogCard, CatalogSection } from "@/data/types";
import AppImage from "./AppImage";
import FilmCard from "./FilmCard";
import SectionTitle from "./SectionTitle";
import styles from "./CatalogBlock.module.css";

/** Seção de catálogo: título centralizado + grade de cards. */
export default function CatalogBlock({
  section,
  alt = false,
  wide = false,
  columns,
  renderCard,
}: {
  section: CatalogSection;
  alt?: boolean;
  /** Container mais largo (1380px em vez do padrão de 1300px) */
  wide?: boolean;
  /** Fixa o número de colunas da grade (padrão: auto-fit a partir de 350px; "full" = 1 coluna) */
  columns?: 2 | "full";
  /** Renderização customizada de cada card, no lugar do FilmCard padrão */
  renderCard?: (card: CatalogCard, index: number) => React.ReactNode;
}) {
  const cardsCls =
    columns === 2
      ? `${styles.cards} ${styles.cardsTwoCol}`
      : columns === "full"
        ? `${styles.cards} ${styles.cardsFull}`
        : styles.cards;

  return (
    <section className={alt ? `${styles.section} ${styles.alt}` : styles.section}>
      <div className={wide ? styles.wideContainer : "container"}>
        {section.logo && (
          <AppImage
            src={section.logo.src}
            width={section.logo.width}
            height={section.logo.height}
            alt={section.logo.alt}
            className={styles.logo}
          />
        )}
        <SectionTitle
          variant="category"
          start={section.titleStart}
          highlight={section.titleHighlight}
          text={section.description}
        />
        {section.cardsTitle && <h3 className={styles.cardsTitle}>{section.cardsTitle}</h3>}
        <div className={cardsCls}>
          {section.cards.map((card, i) =>
            renderCard ? (
              <Fragment key={card.title}>{renderCard(card, i)}</Fragment>
            ) : (
              <FilmCard key={card.title} card={card} />
            )
          )}
        </div>
      </div>
    </section>
  );
}
