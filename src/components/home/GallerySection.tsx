import SectionTitle from "@/components/shared/SectionTitle";
import Gallery2 from "./Gallery2";
import styles from "./GallerySection.module.css";

// import GalleryCarousel from "./GalleryCarousel";

/**
 * Seção "Nosso Portfólio": título + galeria full-width sobre fundo azul.
 *
 * Há dois modelos de galeria em teste, para o cliente comparar e escolher:
 * Gallery2 (grade filtrável por categoria, em uso agora) e GalleryCarousel
 * (carrossel com autoplay/arrasto, código preservado, import comentado
 * acima). Para voltar ao carrossel, troque `<Gallery2 />` por
 * `<GalleryCarousel />` abaixo e descomente o import.
 */
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
      <Gallery2 />
    </section>
  );
}
