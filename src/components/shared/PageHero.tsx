import RichText from "./RichText";
import styles from "./PageHero.module.css";

interface PageHeroProps {
  start: string;
  highlight: string;
  /** Rich text — ver RichText.tsx */
  text: string;
}

/** Hero das páginas internas: título sobre fundo preto com faixa vermelha diagonal. */
export default function PageHero({ start, highlight, text }: PageHeroProps) {
  return (
    <section className={styles.pageHero}>
      <div className="container">
        <h1>
          {start} <span>{highlight}</span>
        </h1>
        <RichText text={text} />
      </div>
      <div className={styles.stripe} aria-hidden="true" />
    </section>
  );
}
