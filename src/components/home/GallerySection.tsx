import SectionTitle from "@/components/shared/SectionTitle";
import GalleryCarousel from "./GalleryCarousel";
import styles from "./GallerySection.module.css";

/** Seção "Nosso Portfólio": título + carrossel full-width sobre fundo preto. */
export default function GallerySection() {
  return (
    <section className={styles.gallery} id="galeria">
      <div className="container">
        <SectionTitle
          light
          start="Nosso"
          highlight="Portfólio"
          text="Confira alguns dos nossos trabalhos realizados com excelência e atenção aos detalhes."
        />
      </div>
      <GalleryCarousel />
    </section>
  );
}
