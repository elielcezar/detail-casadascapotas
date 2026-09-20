import { Globe, Instagram, Phone } from "lucide-react";
import { whatsappLink } from "@/data/site";
import { getSettings } from "@/lib/content";
import Button from "./Button";
import RichText from "./RichText";
import WhatsAppIcon from "./WhatsAppIcon";
import styles from "./CtaSection.module.css";

interface CtaSectionProps {
  id?: string;
  titleStart: string;
  titleStrong: string;
  /** Rich text — ver RichText.tsx */
  text: string;
  whatsappLabel: string;
  whatsappMessage: string;
  /** Rótulo do botão de telefone (padrão: o número) */
  phoneLabel?: string;
  /** Exibe telefone/Instagram/site abaixo dos botões (usado na home) */
  showContactInfo?: boolean;
}

/** Faixa vermelha de chamada para ação, usada em todas as páginas. */
export default async function CtaSection({
  id,
  titleStart,
  titleStrong,
  text,
  whatsappLabel,
  whatsappMessage,
  phoneLabel,
  showContactInfo = false,
}: CtaSectionProps) {
  const settings = await getSettings();

  return (
    <section className={styles.cta} id={id}>
      <div className="container">
        <h2>
          {titleStart} <strong>{titleStrong}</strong>
        </h2>
        <RichText text={text} />
        <div className={styles.buttons}>
          <Button href={whatsappLink({ whatsapp: settings.whatsapp, message: whatsappMessage })} variant="dark" external>
            <WhatsAppIcon size={18} /> {whatsappLabel}
          </Button>
          <Button href={`tel:${settings.phoneHref}`} variant="outline">
            <Phone size={16} aria-hidden="true" /> {phoneLabel ?? settings.phone}
          </Button>
        </div>
        {showContactInfo && (
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <Phone size={16} aria-hidden="true" />
              <span>{settings.phone}</span>
            </div>
            <div className={styles.contactItem}>
              <Instagram size={16} aria-hidden="true" />
              <span>{settings.instagramHandle}</span>
            </div>
            <div className={styles.contactItem}>
              <Globe size={16} aria-hidden="true" />
              <span>{settings.parentWebsite}</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
