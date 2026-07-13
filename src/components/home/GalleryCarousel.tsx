"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import AppImage from "@/components/shared/AppImage";
import Lightbox from "@/components/shared/Lightbox";
import { galleryImages } from "@/data/home";
import styles from "./GalleryCarousel.module.css";

/**
 * Carrossel infinito da galeria, com autoplay, setas, arrasto (mouse/touch)
 * e zoom no item central. Clones nas duas pontas da trilha permitem o loop
 * sem "rebobinar": ao alcançar um clone, o índice salta silenciosamente
 * para o slide real equivalente.
 */
const CLONES = 4;
const AUTOPLAY_MS = 3500;
const REAL_COUNT = galleryImages.length;

const trackSlides = [
  ...galleryImages
    .slice(-CLONES)
    .map((image, i) => ({ image, realIndex: REAL_COUNT - CLONES + i, clone: true })),
  ...galleryImages.map((image, realIndex) => ({ image, realIndex, clone: false })),
  ...galleryImages.slice(0, CLONES).map((image, realIndex) => ({ image, realIndex, clone: true })),
];

// Evita o aviso de useLayoutEffect no render do servidor
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function GalleryCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef(CLONES);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const draggingRef = useRef(false);
  const dragMovedRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragBaseOffsetRef = useRef(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const getSlideEls = () =>
    Array.from(trackRef.current?.children ?? []) as HTMLElement[];

  const update = (animate: boolean) => {
    const track = trackRef.current;
    const carousel = carouselRef.current;
    if (!track || !carousel) return;
    const slideEls = getSlideEls();

    // Normaliza o índice caso saia da faixa de slides existentes
    if (!slideEls[currentRef.current]) {
      currentRef.current =
        ((((currentRef.current - CLONES) % REAL_COUNT) + REAL_COUNT) % REAL_COUNT) + CLONES;
      animate = false;
    }

    const slide = slideEls[currentRef.current];
    const offset = slide.offsetLeft - (carousel.clientWidth - slide.offsetWidth) / 2;
    if (!animate) track.classList.add(styles.noAnim);
    track.style.transform = `translateX(${-offset}px)`;
    slideEls.forEach((el) => el.classList.remove(styles.active));
    slide.classList.add(styles.active);
    if (!animate) {
      void track.offsetWidth;
      track.classList.remove(styles.noAnim);
    }
  };

  // Ao alcançar os clones das pontas, salta (sem animação) para o slide
  // real equivalente — o visual é idêntico e o loop nunca quebra
  const normalize = () => {
    if (currentRef.current >= CLONES + REAL_COUNT || currentRef.current < CLONES) {
      currentRef.current =
        ((((currentRef.current - CLONES) % REAL_COUNT) + REAL_COUNT) % REAL_COUNT) + CLONES;
      update(false);
    }
  };

  const step = (dir: number) => {
    normalize();
    currentRef.current += dir;
    update(true);
  };

  const stopAutoplay = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  };

  const startAutoplay = () => {
    stopAutoplay();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timerRef.current = setInterval(() => step(1), AUTOPLAY_MS);
  };

  useIsomorphicLayoutEffect(() => {
    update(false);
    startAutoplay();

    const onResize = () => update(false);
    const onVisibility = () => {
      if (document.hidden) {
        stopAutoplay();
      } else {
        update(false);
        startAutoplay();
      }
    };
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stopAutoplay();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  // --- Arrastar (mouse e touch) ---
  const onPointerDown = (e: ReactPointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    stopAutoplay();
    normalize();
    const carousel = carouselRef.current;
    const slide = getSlideEls()[currentRef.current];
    if (!carousel || !slide) return;
    dragBaseOffsetRef.current =
      slide.offsetLeft - (carousel.clientWidth - slide.offsetWidth) / 2;
    dragStartXRef.current = e.clientX;
    draggingRef.current = true;
    dragMovedRef.current = false;
  };

  const onPointerMove = (e: ReactPointerEvent) => {
    if (!draggingRef.current) return;
    const track = trackRef.current;
    if (!track) return;
    const dx = e.clientX - dragStartXRef.current;
    // Só entra em modo arrasto (e captura o ponteiro) após mover 5px —
    // capturar no pointerdown desviaria o clique e quebraria o lightbox
    if (!dragMovedRef.current && Math.abs(dx) > 5) {
      dragMovedRef.current = true;
      track.classList.add(styles.noAnim, styles.dragging);
      track.setPointerCapture?.(e.pointerId);
    }
    if (dragMovedRef.current) {
      track.style.transform = `translateX(${-dragBaseOffsetRef.current + dx}px)`;
    }
  };

  const endDrag = (e: ReactPointerEvent) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    if (!dragMovedRef.current) {
      startAutoplay();
      return;
    }
    const track = trackRef.current;
    const slide = getSlideEls()[currentRef.current];
    if (track) track.classList.remove(styles.noAnim, styles.dragging);
    const dx = e.clientX - dragStartXRef.current;
    let moved = slide ? Math.round(-dx / (slide.offsetWidth + 2)) : 0;
    if (moved === 0 && Math.abs(dx) > 50) moved = dx < 0 ? 1 : -1;
    moved = Math.max(-CLONES, Math.min(CLONES, moved));
    currentRef.current += moved;
    update(true);
    startAutoplay();
  };

  // Suprime o clique (lightbox) quando houve arrasto
  const onClickCapture = (e: ReactMouseEvent) => {
    if (dragMovedRef.current) {
      e.stopPropagation();
      e.preventDefault();
      dragMovedRef.current = false;
    }
  };

  return (
    <>
      <div
        className={styles.carousel}
        ref={carouselRef}
        aria-roledescription="carrossel"
        aria-label="Fotos do portfólio"
        onMouseEnter={stopAutoplay}
        onMouseLeave={() => {
          if (!draggingRef.current) startAutoplay();
        }}
      >
        <div
          className={styles.track}
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onClickCapture={onClickCapture}
          onDragStart={(e) => e.preventDefault()}
        >
          {trackSlides.map((slide, i) =>
            slide.clone ? (
              <div
                key={`clone-${i}`}
                className={i === CLONES ? `${styles.slide} ${styles.active}` : styles.slide}
                aria-hidden="true"
                onClick={() => setLightboxIndex(slide.realIndex)}
              >
                <AppImage
                  src={slide.image.src}
                  width={slide.image.width}
                  height={slide.image.height}
                  alt=""
                  sizes="(max-width: 480px) 85vw, (max-width: 768px) 70vw, 30vw"
                />
                <span className={styles.overlay}>
                  <ZoomIn size={30} />
                </span>
              </div>
            ) : (
              <button
                key={slide.image.src}
                type="button"
                className={i === CLONES ? `${styles.slide} ${styles.active}` : styles.slide}
                onClick={() => setLightboxIndex(slide.realIndex)}
                aria-label={`Ampliar foto: ${slide.image.alt}`}
              >
                <AppImage
                  src={slide.image.src}
                  width={slide.image.width}
                  height={slide.image.height}
                  alt=""
                  sizes="(max-width: 480px) 85vw, (max-width: 768px) 70vw, 30vw"
                />
                <span className={styles.overlay} aria-hidden="true">
                  <ZoomIn size={30} />
                </span>
              </button>
            )
          )}
        </div>

        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowPrev}`}
          onClick={() => {
            step(-1);
            startAutoplay();
          }}
          aria-label="Slide anterior"
        >
          <ChevronLeft aria-hidden="true" />
        </button>
        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowNext}`}
          onClick={() => {
            step(1);
            startAutoplay();
          }}
          aria-label="Próximo slide"
        >
          <ChevronRight aria-hidden="true" />
        </button>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={galleryImages}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(dir) =>
            setLightboxIndex(((lightboxIndex + dir) % REAL_COUNT + REAL_COUNT) % REAL_COUNT)
          }
        />
      )}
    </>
  );
}
