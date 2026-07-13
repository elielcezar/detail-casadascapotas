"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Film, Wrench } from "lucide-react";
import Button from "@/components/shared/Button";
import WhatsAppIcon from "@/components/shared/WhatsAppIcon";
import { heroSlides } from "@/data/home";
import { whatsappLink } from "@/data/site";
import styles from "./HeroCarousel.module.css";

const icons = { tools: Wrench, film: Film };

const AUTOPLAY_MS = 8000;

/** Carrossel de destaque do topo da home, com autoplay e navegação. */
export default function HeroCarousel() {
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const count = heroSlides.length;

  const startAutoplay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
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
    <section
      className={styles.hero}
      id="inicio"
      aria-roledescription="carrossel"
      aria-label="Destaques"
    >
      <div className={styles.carousel}>
        {heroSlides.map((slide, i) => {
          const isActive = i === active;
          // Só o primeiro slide leva o h1 da página; os demais usam <p>
          const TitleTag: "h1" | "p" = i === 0 ? "h1" : "p";
          return (
            <div
              key={slide.titleHighlight}
              className={isActive ? `${styles.slide} ${styles.slideActive}` : styles.slide}
              inert={!isActive}
            >
              <div
                className={styles.bg}
                style={{ backgroundImage: `url('${slide.background}')` }}
                aria-hidden="true"
              />
              <div className="container">
                <div className={styles.content}>
                  <TitleTag className={`${styles.title} ${styles.layerTitle}`}>
                    {slide.titleStart} <span>{slide.titleHighlight}</span>
                    {slide.titleEnd ? ` ${slide.titleEnd}` : ""}
                  </TitleTag>
                  <p className={`${styles.subtitle} ${styles.layerSubtitle}`}>{slide.subtitle}</p>
                  <div className={`${styles.buttons} ${styles.layerButtons}`}>
                    {slide.buttons.map((btn) => {
                      const isWhatsApp = btn.whatsappMessage !== undefined;
                      const href = isWhatsApp
                        ? whatsappLink(btn.whatsappMessage || undefined)
                        : btn.href;
                      const Icon =
                        btn.icon && btn.icon !== "whatsapp" ? icons[btn.icon] : null;
                      return (
                        <Button key={btn.label} href={href} variant={btn.variant} external={isWhatsApp}>
                          {btn.icon === "whatsapp" && <WhatsAppIcon size={16} />}
                          {Icon && <Icon size={16} aria-hidden="true" />}
                          {btn.label}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        className={`${styles.control} ${styles.prev}`}
        onClick={() => goTo(active - 1)}
        aria-label="Slide anterior"
      >
        <ChevronLeft aria-hidden="true" />
      </button>
      <button
        type="button"
        className={`${styles.control} ${styles.next}`}
        onClick={() => goTo(active + 1)}
        aria-label="Próximo slide"
      >
        <ChevronRight aria-hidden="true" />
      </button>

      <div className={styles.dots}>
        {heroSlides.map((slide, i) => (
          <button
            key={slide.titleHighlight}
            type="button"
            className={i === active ? `${styles.dot} ${styles.dotActive}` : styles.dot}
            onClick={() => goTo(i)}
            aria-label={`Ir para o slide ${i + 1}`}
            aria-current={i === active}
          />
        ))}
      </div>

      <div className={styles.stripe} aria-hidden="true" />
    </section>
  );
}
