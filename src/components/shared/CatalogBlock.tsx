import type { CatalogSection } from "@/data/types";
import AppImage from "./AppImage";
import FilmCard from "./FilmCard";
import SectionTitle from "./SectionTitle";
import styles from "./CatalogBlock.module.css";

/** Seção de catálogo: título centralizado + grade de cards. */
export default function CatalogBlock({
  section,
  alt = false,
  wide = false,
}: {
  section: CatalogSection;
  alt?: boolean;
  /** Container mais largo (1380px em vez do padrão de 1300px) */
  wide?: boolean;
}) {
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
        <div className={styles.cards}>
          {section.cards.map((card) => (
            <FilmCard key={card.title} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
