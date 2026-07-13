"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./FadeIn.module.css";

/**
 * Wrapper que revela o conteúdo com fade + deslize quando entra na tela.
 * Sem JavaScript (ou com "reduzir movimento" ativo) o conteúdo fica
 * visível normalmente.
 */
export default function FadeIn({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const cls = [styles.fadeIn, visible ? styles.visible : "", className ?? ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={ref} className={cls}>
      {children}
    </div>
  );
}
