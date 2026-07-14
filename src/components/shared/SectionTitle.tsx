import FadeIn from "./FadeIn";
import RichText from "./RichText";
import styles from "./SectionTitle.module.css";

interface SectionTitleProps {
  start: string;
  highlight: string;
  text?: string;
  /** "section" = títulos da home (2.5rem) · "category" = páginas de catálogo (2rem) */
  variant?: "section" | "category";
  /** Título branco para seções de fundo escuro */
  light?: boolean;
}

/** Título centralizado de seção, com destaque vermelho e linha decorativa. */
export default function SectionTitle({
  start,
  highlight,
  text,
  variant = "section",
  light = false,
}: SectionTitleProps) {
  const cls = [
    styles.wrap,
    variant === "category" ? styles.category : "",
    light ? styles.light : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <FadeIn className={cls}>
      <h2>
        {start} <span>{highlight}</span>
      </h2>
      {text && <RichText text={text} />}
      <div className={styles.line} aria-hidden="true" />
    </FadeIn>
  );
}
