import { Check, Gem, Layers, Shield, Star, Tablet } from "lucide-react";
import type { CatalogCard, BadgeIcon } from "@/data/types";
import { whatsappLink } from "@/data/site";
import Button from "./Button";
import FadeIn from "./FadeIn";
import RichText from "./RichText";
import WhatsAppIcon from "./WhatsAppIcon";
import styles from "./FilmCard.module.css";

const badgeIcons: Record<BadgeIcon, typeof Star> = {
  star: Star,
  gem: Gem,
  layers: Layers,
  shield: Shield,
  tablet: Tablet,
};

function BenefitList({ items }: { items: string[] }) {
  return (
    <ul className={styles.benefits}>
      {items.map((item) => (
        <li key={item}>
          <Check className={styles.check} size={13} strokeWidth={3} aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}

/** Card de catálogo usado nas páginas de películas, limpeza e PPF. */
export default function FilmCard({ card }: { card: CatalogCard }) {
  const Icon = card.badgeIcon ? badgeIcons[card.badgeIcon] : null;

  return (
    <FadeIn className={styles.card}>
      <header className={styles.header}>
        <div>
          <h3>{card.title}</h3>
          <span className={styles.subtitle}>{card.subtitle}</span>
        </div>
        {card.badge && <span className={styles.badge}>{card.badge}</span>}
        {Icon && (
          <span className={styles.badge}>
            <Icon size={14} aria-hidden="true" />
          </span>
        )}
      </header>

      <div className={styles.body}>
        {card.benefits && <BenefitList items={card.benefits} />}

        {card.table && (
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">Spec</th>
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

        {card.groups?.map((group) => (
          <div className={styles.group} key={group.title}>
            <h4>{group.title}</h4>
            <BenefitList items={group.items} />
          </div>
        ))}

        {card.shades && (
          <div className={styles.shades}>
            {card.shades.map((shade, i) => (
              <div
                key={`${shade.label}-${i}`}
                className={styles.shadeDot}
                style={{ background: shade.color }}
                title={shade.label}
              />
            ))}
          </div>
        )}

        {card.note && <RichText text={card.note} className={styles.note} />}

        {card.cta && (
          <Button href={whatsappLink(card.cta.message)} external block>
            <WhatsAppIcon size={16} /> {card.cta.label}
          </Button>
        )}
      </div>
    </FadeIn>
  );
}
