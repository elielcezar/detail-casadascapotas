import AppImage from "./AppImage";
import RichText from "./RichText";
import { withBasePath } from "@/lib/basePath";
import styles from "./PageHero.module.css";

interface PageHeroProps {
  start: string;
  highlight: string;
  /** Rich text — ver RichText.tsx */
  text?: string;
  /** Se definido, substitui o título/texto por um banner de imagem full-width
   *  (o h1 continua no DOM, só visível para leitores de tela, para SEO/a11y) */
  image?: {
    src: string;
    width: number;
    height: number;
    alt: string;
    /** Imagem alternativa para telas <=768px (composição diferente, não só redimensionada) */
    mobileSrc?: string;
    /** "cover" recorta a foto numa altura fixa, em vez de manter a proporção
     *  natural (usado para fotos, ao contrário de banners gráficos já na
     *  proporção certa como o cabeçalho da 3M) */
    fit?: "cover";
  };
}

/** Hero das páginas internas: título sobre fundo preto com faixa vermelha diagonal. */
export default function PageHero({ start, highlight, text, image }: PageHeroProps) {
  if (image) {
    const bannerCls = image.fit === "cover" ? styles.bannerImageCover : styles.bannerImage;
    return (
      <section className={styles.pageHeroImage}>
        <h1 className="sr-only">
          {start} {highlight}
        </h1>
        {image.mobileSrc ? (
          <picture>
            <source media="(max-width: 768px)" srcSet={withBasePath(image.mobileSrc)} />
            <img src={withBasePath(image.src)} alt={image.alt} className={bannerCls} />
          </picture>
        ) : (
          <AppImage
            src={image.src}
            width={image.width}
            height={image.height}
            alt={image.alt}
            priority
            className={bannerCls}
          />
        )}
        <div className={styles.stripe} aria-hidden="true" />
      </section>
    );
  }

  return (
    <section className={styles.pageHero}>
      <div className="container">
        <h1>
          {start} <span>{highlight}</span>
        </h1>
        {text && <RichText text={text} />}
      </div>
      <div className={styles.stripe} aria-hidden="true" />
    </section>
  );
}
