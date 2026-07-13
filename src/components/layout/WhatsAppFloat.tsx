import { whatsappLink } from "@/data/site";
import WhatsAppIcon from "@/components/shared/WhatsAppIcon";
import styles from "./WhatsAppFloat.module.css";

/** Botão flutuante de WhatsApp, presente em todas as páginas. */
export default function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.float}
      aria-label="Falar com a Detail no WhatsApp"
    >
      <WhatsAppIcon size={30} />
    </a>
  );
}
