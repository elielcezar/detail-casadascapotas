import SectionTitle from "@/components/shared/SectionTitle";
import Gallery2 from "./Gallery2";
import { getGallery } from "@/lib/content";
import styles from "./GallerySection.module.css";

/**
 * Seção "Nosso Portfólio": título + galeria full-width sobre fundo azul.
 *
 * Busca as categorias no build e passa prontas para o Gallery2, que é um
 * componente de cliente (precisa de estado para o filtro) e por isso não
 * pode fazer a chamada sozinho.
 */
export default async function GallerySection() {
  const categories = await getGallery();

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
      <Gallery2 categories={categories} />
    </section>
  );
}
