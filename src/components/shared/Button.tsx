import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  href: string;
  /** primary = vermelho, outline = contorno branco, dark = preto */
  variant?: "primary" | "outline" | "dark";
  /** Ocupa a largura total do container (usado nos cards) */
  block?: boolean;
  /** Abre em nova aba (links externos como WhatsApp) */
  external?: boolean;
  children: ReactNode;
}

/** Botão-link com os estilos padrão do site. */
export default function Button({
  href,
  variant = "primary",
  block = false,
  external = false,
  children,
}: ButtonProps) {
  const className = [styles.btn, styles[variant], block ? styles.block : ""]
    .filter(Boolean)
    .join(" ");

  // Rotas internas usam <Link> (navegação sem recarregar a página)
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={className}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
    >
      {children}
    </a>
  );
}
