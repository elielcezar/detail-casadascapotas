"use client";

import { useMemo, useState } from "react";
import { ZoomIn } from "lucide-react";
import AppImage from "@/components/shared/AppImage";
import Lightbox from "@/components/shared/Lightbox";
import { galleryCategories, type GalleryPhoto } from "@/data/gallery2";
import styles from "./Gallery2.module.css";

/** Galeria em grade filtrável por categoria, largura total (sem .container). */
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
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            className={styles.cell}
            onClick={() => setLightboxIndex(i)}
            aria-label={`Ampliar foto: ${photo.alt}`}
          >
            <AppImage
              src={photo.src}
              width={photo.width}
              height={photo.height}
              alt=""
              sizes="(max-width: 768px) 33vw, 16vw"
              className={styles.photo}
            />
            <span className={styles.overlay} aria-hidden="true">
              <ZoomIn size={26} />
            </span>
          </button>
        ))}
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
