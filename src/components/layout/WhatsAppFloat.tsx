import { whatsappLink } from "@/data/site";
import { getSettings } from "@/lib/content";
import WhatsAppIcon from "@/components/shared/WhatsAppIcon";
import styles from "./WhatsAppFloat.module.css";

/** Botão flutuante de WhatsApp, presente em todas as páginas. */
export default async function WhatsAppFloat() {
  const { whatsapp } = await getSettings();

  return (
    <a
      href={whatsappLink({ whatsapp })}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.float}
      aria-label="Falar com a Detail no WhatsApp"
    >
      <WhatsAppIcon size={30} />
    </a>
  );
}
