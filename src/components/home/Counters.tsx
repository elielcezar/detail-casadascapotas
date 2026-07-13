"use client";

import { useEffect, useRef, useState } from "react";
import FadeIn from "@/components/shared/FadeIn";
import { counters } from "@/data/home";
import styles from "./Counters.module.css";

const DURATION_MS = 2000;

/** Contadores animados sobre foto escurecida da oficina. */
export default function Counters() {
  const sectionRef = useRef<HTMLElement>(null);
  const startedRef = useRef(false);
  const [values, setValues] = useState(() => counters.map(() => 0));

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const start = () => {
      if (startedRef.current) return;
      startedRef.current = true;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setValues(counters.map((c) => c.target));
        return;
      }

      let startTime: number | null = null;
      const tick = (timestamp: number) => {
        if (startTime === null) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / DURATION_MS, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValues(counters.map((c) => Math.floor(eased * c.target)));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    if (typeof IntersectionObserver === "undefined") {
      start();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            start();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.counters} ref={sectionRef}>
      <div
        className={styles.bg}
        style={{ backgroundImage: "url('/img/ferrari-oficina.jpg')" }}
        aria-hidden="true"
      />
      <div className="container">
        <div className={styles.grid}>
          {counters.map((counter, i) => (
            <FadeIn key={counter.label} className={styles.item}>
              <div className={styles.number} aria-hidden="true">
                {values[i].toLocaleString("pt-BR")}
                <span>+</span>
              </div>
              <span className="sr-only">{counter.target.toLocaleString("pt-BR")}+</span>
              <div className={styles.label}>{counter.label}</div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
