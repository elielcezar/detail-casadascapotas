import { Check, Gem, Layers, Shield, Star, Tablet } from "lucide-react";
import type { BadgeIcon, CatalogCard, SpecTable } from "@/data/types";
import { whatsappLink } from "@/data/site";
import AppImage from "./AppImage";
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

function SwatchTableEl({ swatches }: { swatches: { hex: string; label: string }[] }) {
  return (
    <table className={`${styles.table} ${styles.swatchTable}`}>
      <tbody>
        {swatches.map((s) => (
          <tr key={s.hex}>
            <td>{s.label}</td>
            <td>
              <span className={styles.swatchBar} style={{ background: s.hex }} aria-hidden="true" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function SpecTableEl({ table, label }: { table: SpecTable; label?: string }) {
  return (
    <>
      {label && <h4 className={styles.tableLabel}>{label}</h4>}
      <table className={styles.table}>
        {!table.hideHeader && (
          <thead>
            <tr>
              {/* Célula do canto vazia: a primeira coluna já tem os rótulos das linhas */}
              <th scope="col" />
              {table.columns.map((col, i) => (
                <th scope="col" key={`${col}-${i}`}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {table.rows.map((row) => (
            <tr key={row.label} className={row.highlight ? styles.rowHighlight : undefined}>
              <td>{row.label}</td>
              {row.values.map((value, i) => (
                <td key={i}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
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
          {card.subtitle && <span className={styles.subtitle}>{card.subtitle}</span>}
        </div>
        <div className={styles.headerSide}>
          {card.brandLogo && (
            <AppImage
              src={card.brandLogo.src}
              width={card.brandLogo.width}
              height={card.brandLogo.height}
              alt={card.brandLogo.alt}
              className={styles.brandLogo}
              style={
                card.brandLogo.displayHeight
                  ? ({ "--brand-logo-height": `${card.brandLogo.displayHeight}px` } as React.CSSProperties)
                  : undefined
              }
            />
          )}
          {card.badge && <span className={styles.badge}>{card.badge}</span>}
          {Icon && (
            <span className={styles.badge}>
              <Icon size={14} aria-hidden="true" />
            </span>
          )}
        </div>
      </header>

      <div className={styles.body}>
        {card.benefits && <BenefitList items={card.benefits} />}

        {card.table && <SpecTableEl table={card.table} />}

        {card.tables?.map((t) => <SpecTableEl key={t.label} table={t.table} label={t.label} />)}

        {card.groups?.map((group) => (
          <div className={styles.group} key={group.title}>
            <h4>{group.title}</h4>
            {group.items && <BenefitList items={group.items} />}
            {group.swatches && <SwatchTableEl swatches={group.swatches} />}
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
