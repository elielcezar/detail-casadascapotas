import type { CatalogSection } from "@/data/types";
import FilmCard from "./FilmCard";
import SectionTitle from "./SectionTitle";
import styles from "./CatalogBlock.module.css";

/** Seção de catálogo: título centralizado + grade de cards. */
export default function CatalogBlock({
  section,
  alt = false,
}: {
  section: CatalogSection;
  alt?: boolean;
}) {
  return (
    <section className={alt ? `${styles.section} ${styles.alt}` : styles.section}>
      <div className="container">
        <SectionTitle
          variant="category"
          start={section.titleStart}
          highlight={section.titleHighlight}
          text={section.description}
        />
        <div className={styles.cards}>
          {section.cards.map((card) => (
            <FilmCard key={card.title} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
