"use client";

import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryImage } from "@/data/home";
import AppImage from "./AppImage";
import styles from "./Lightbox.module.css";

interface LightboxProps {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  /** Navega para a foto vizinha (dir = -1 ou +1) */
  onNavigate: (dir: number) => void;
}

/**
 * Visualizador de foto ampliada usando <dialog> nativo:
 * foco preso, Esc fecha, setas do teclado navegam.
 */
export default function Lightbox({ images, index, onClose, onNavigate }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") onNavigate(-1);
      if (e.key === "ArrowRight") onNavigate(1);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onNavigate]);

  const image = images[index];

  return (
    <dialog
      ref={dialogRef}
      className={styles.lightbox}
      aria-label="Foto ampliada da galeria"
      onCancel={onClose}
      onClick={(e) => {
        // Clique no backdrop (fora da imagem/botões) fecha
        if (e.target === dialogRef.current) onClose();
      }}
    >
      <button type="button" className={styles.close} onClick={onClose} aria-label="Fechar">
        <X size={28} aria-hidden="true" />
      </button>
      <button
        type="button"
        className={`${styles.nav} ${styles.navPrev}`}
        onClick={() => onNavigate(-1)}
        aria-label="Foto anterior"
      >
        <ChevronLeft size={32} aria-hidden="true" />
      </button>
      <AppImage
        src={image.src}
        width={image.width}
        height={image.height}
        alt={image.alt}
        className={styles.image}
        sizes="90vw"
      />
      <button
        type="button"
        className={`${styles.nav} ${styles.navNext}`}
        onClick={() => onNavigate(1)}
        aria-label="Próxima foto"
      >
        <ChevronRight size={32} aria-hidden="true" />
      </button>
    </dialog>
  );
}
