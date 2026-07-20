import { Check } from "lucide-react";
import type { CatalogCard } from "@/data/types";
import { whatsappLink } from "@/data/site";
import Button from "./Button";
import FadeCarousel from "./FadeCarousel";
import FadeIn from "./FadeIn";
import WhatsAppIcon from "./WhatsAppIcon";
import styles from "./PremiumCard.module.css";

/** Card da Proteção Premium: texto + carrossel de fotos em colunas, lado alternado por card. */
export default function PremiumCard({
  card,
  textSide = "left",
}: {
  card: CatalogCard;
  textSide?: "left" | "right";
}) {
  const cls = textSide === "right" ? `${styles.card} ${styles.reversed}` : styles.card;

  return (
    <FadeIn className={cls}>
      <div className={styles.textCol}>
        <h3>{card.title}</h3>
        {card.subtitle && <span className={styles.subtitle}>{card.subtitle}</span>}

        {card.benefits && (
          <ul className={styles.benefits}>
            {card.benefits.map((item) => (
              <li key={item}>
                <Check className={styles.check} size={13} strokeWidth={3} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        )}

        {card.table && (
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col" />
                {card.table.columns.map((col, i) => (
                  <th scope="col" key={`${col}-${i}`}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {card.table.rows.map((row) => (
                <tr key={row.label}>
                  <td>{row.label}</td>
                  {row.values.map((value, i) => (
                    <td key={i}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {card.cta && (
          <Button href={whatsappLink(card.cta.message)} external>
            <WhatsAppIcon size={16} /> {card.cta.label}
          </Button>
        )}
      </div>

      <div className={styles.imageCol}>
        {card.images && <FadeCarousel images={card.images} />}
      </div>
    </FadeIn>
  );
}
