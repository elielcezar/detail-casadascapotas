"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AppImage from "@/components/shared/AppImage";
import { navItems } from "@/data/navigation";
import { site } from "@/data/site";
import { withBasePath } from "@/lib/basePath";
import styles from "./Header.module.css";

/**
 * Cabeçalho fixo com menu responsivo.
 * Na home começa expandido e encolhe ao rolar; nas páginas internas
 * já começa compacto (equivalente à classe "scrolled" do protótipo).
 */
export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fecha o menu mobile ao trocar de página
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isHome = pathname === "/";
  const currentPath = pathname.replace(/\/$/, "") || "/";

  const headerCls = [styles.header, (scrolled || !isHome) && styles.scrolled, menuOpen && styles.menuOpen]
    .filter(Boolean)
    .join(" ");

  return (
    <header
      className={headerCls}
      style={{ backgroundImage: `url('${withBasePath("/img/bg-header.png")}')` }}
    >
      <div className={`container ${styles.inner}`}>
        {/*
          O logo aponta para o site da Casa das Capotas, não para a home
          deste site — pedido do cliente. Abre em nova aba, seguindo a mesma
          convenção dos links externos do rodapé, para não tirar o visitante
          daqui. Por ser link externo usa <a>, não next/link.
        */}
        <a
          href={site.parentWebsiteUrl}
          className={styles.logo}
          target="_blank"
          rel="noopener noreferrer"
        >
          <AppImage
            src="/img/logo.png"
            alt="Detail Estética Automotiva — ir para o site da Casa das Capotas"
            width={413}
            height={25}
            priority
          />
        </a>

        <nav
          id="menu-principal"
          className={menuOpen ? `${styles.nav} ${styles.navOpen}` : styles.nav}
          aria-label="Menu principal"
        >
          {navItems.map((item) => {
            const itemPath = item.href.split("#")[0].replace(/\/$/, "") || "/";
            const isActive = !item.href.includes("#") && currentPath === itemPath;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={isActive ? styles.active : undefined}
                aria-current={isActive ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className={menuOpen ? `${styles.toggle} ${styles.toggleActive}` : styles.toggle}
          aria-expanded={menuOpen}
          aria-controls="menu-principal"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
