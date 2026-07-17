import SectionTitle from "@/components/shared/SectionTitle";
import Gallery2 from "./Gallery2";
import styles from "./GallerySection.module.css";

/** Seção "Nosso Portfólio": título + galeria full-width sobre fundo azul. */
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
