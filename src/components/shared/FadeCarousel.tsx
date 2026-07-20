"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AppImage from "./AppImage";
import styles from "./FadeCarousel.module.css";

interface FadeCarouselImage {
  src: string;
  width: number;
  height: number;
  alt: string;
}

const AUTOPLAY_MS = 4000;

/** Carrossel de imagens com transição por fade, setas e bolinhas, usado nos cards de Proteção Premium. */
export default function FadeCarousel({ images }: { images: FadeCarouselImage[] }) {
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const count = images.length;

  const startAutoplay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timerRef.current = setInterval(() => {
      setActive((current) => (current + 1) % count);
    }, AUTOPLAY_MS);
  }, [count]);

  useEffect(() => {
    startAutoplay();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startAutoplay]);

  const goTo = (index: number) => {
    setActive(((index % count) + count) % count);
    startAutoplay();
  };

  return (
    <div className={styles.carousel}>
      {images.map((image, i) => (
        <AppImage
          key={image.src}
          src={image.src}
          alt={image.alt}
          fill
          className={i === active ? `${styles.slide} ${styles.slideActive}` : styles.slide}
          sizes="(max-width: 900px) 100vw, 50vw"
        />
      ))}

      {count > 1 && (
        <>
          <button
            type="button"
            className={`${styles.control} ${styles.prev}`}
            onClick={() => goTo(active - 1)}
            aria-label="Foto anterior"
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            className={`${styles.control} ${styles.next}`}
            onClick={() => goTo(active + 1)}
            aria-label="Próxima foto"
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>

          <div className={styles.dots}>
            {images.map((image, i) => (
              <button
                key={image.src}
                type="button"
                className={i === active ? `${styles.dot} ${styles.dotActive}` : styles.dot}
                onClick={() => goTo(i)}
                aria-label={`Ir para a foto ${i + 1}`}
                aria-current={i === active}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
