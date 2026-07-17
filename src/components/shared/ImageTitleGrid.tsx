import AppImage from "./AppImage";
import styles from "./ImageTitleGrid.module.css";

export interface GridSlide {
  image: { src: string; width: number; height: number; alt: string };
  title: string;
}

/** Grade de 3 blocos (imagem + título grande acima), lado a lado, sobre fundo escuro. */
export default function ImageTitleGrid({ slides }: { slides: GridSlide[] }) {
  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {slides.map((slide) => (
          <div className={styles.item} key={slide.title}>
            <h3 className={styles.title}>{slide.title}</h3>
            <div className={styles.imageWrap}>
              <AppImage
                src={slide.image.src}
                width={slide.image.width}
                height={slide.image.height}
                alt={slide.image.alt}
                sizes="(max-width: 768px) 100vw, 33vw"
                className={styles.photo}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
