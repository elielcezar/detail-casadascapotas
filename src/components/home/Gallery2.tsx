"use client";

import { useMemo, useState } from "react";
import { ZoomIn } from "lucide-react";
import AppImage from "@/components/shared/AppImage";
import Lightbox from "@/components/shared/Lightbox";
import { galleryCategories, type GalleryPhoto } from "@/data/gallery2";
import styles from "./Gallery2.module.css";

/**
 * Define a forma da célula a partir da proporção real da foto — fotos
 * nitidamente horizontais ganham uma célula "wide" (2 colunas, altura
 * normal); nitidamente verticais ganham "tall" (2 linhas, largura normal).
 * Assim o recorte do object-fit:cover acompanha a orientação da imagem em
 * vez de forçar um padrão fixo por posição.
 */
function shapeFor(photo: GalleryPhoto): "" | "wide" | "tall" {
  const ratio = photo.width / photo.height;
  if (ratio >= 1.3) return "wide";
  if (ratio <= 0.77) return "tall";
  return "";
}

/**
 * Modelo alternativo de galeria em teste: grade filtrável por categoria,
 * largura total (sem .container). Convive com o GalleryCarousel — nenhum
 * dos dois foi removido, apenas este é o exibido na página no momento.
 */
export default function Gallery2() {
  const [active, setActive] = useState<string>("todos");

  const photos: GalleryPhoto[] = useMemo(() => {
    if (active === "todos") return galleryCategories.flatMap((c) => c.photos);
    return galleryCategories.find((c) => c.slug === active)?.photos ?? [];
  }, [active]);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <div className={styles.filters} role="group" aria-label="Filtrar galeria por categoria">
        <button
          type="button"
          className={active === "todos" ? `${styles.filter} ${styles.filterActive}` : styles.filter}
          onClick={() => setActive("todos")}
        >
          Todos
        </button>
        {galleryCategories.map((cat) => (
          <button
            key={cat.slug}
            type="button"
            className={active === cat.slug ? `${styles.filter} ${styles.filterActive}` : styles.filter}
            onClick={() => setActive(cat.slug)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {photos.map((photo, i) => {
          const shape = shapeFor(photo);
          return (
            <button
              key={photo.src}
              type="button"
              className={shape ? `${styles.cell} ${styles[shape]}` : styles.cell}
              onClick={() => setLightboxIndex(i)}
              aria-label={`Ampliar foto: ${photo.alt}`}
            >
              <AppImage
                src={photo.src}
                width={photo.width}
                height={photo.height}
                alt=""
                sizes="(max-width: 768px) 50vw, 25vw"
                className={styles.photo}
              />
              <span className={styles.overlay} aria-hidden="true">
                <ZoomIn size={26} />
              </span>
            </button>
          );
        })}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={photos}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(dir) =>
            setLightboxIndex(((lightboxIndex + dir) % photos.length + photos.length) % photos.length)
          }
        />
      )}
    </>
  );
}
