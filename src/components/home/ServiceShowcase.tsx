import Link from "next/link";
import { ArrowRight, Check, Gem, Phone, Star } from "lucide-react";
import AppImage from "@/components/shared/AppImage";
import Button from "@/components/shared/Button";
import FadeIn from "@/components/shared/FadeIn";
import RichText from "@/components/shared/RichText";
import WhatsAppIcon from "@/components/shared/WhatsAppIcon";
import { type ServiceSection } from "@/data/home";
import { site, whatsappLink } from "@/data/site";
import styles from "./ServiceShowcase.module.css";

/** Seção de serviço da home (Películas / Limpeza / PPF): imagem + conteúdo. */
export default function ServiceShowcase({ service }: { service: ServiceSection }) {
  const sectionCls = service.altBackground ? `${styles.section} ${styles.alt}` : styles.section;
  const rowCls = service.reversed ? `${styles.row} ${styles.reversed}` : styles.row;
  const ctaHref = service.primaryCta.href ?? whatsappLink(service.primaryCta.whatsappMessage);
  const imageCls =
    service.image.orientation === "portrait" ? `${styles.image} ${styles.portrait}` : styles.image;
  const imageStyle = service.image.desktopHeight
    ? ({ "--photo-desktop-height": `${service.image.desktopHeight}px` } as React.CSSProperties)
    : undefined;
  const descriptionCls =
    service.descriptionColor === "blue"
      ? `${styles.description} ${styles.descriptionBlue}`
      : styles.description;

  return (
    <section className={sectionCls} id={service.id}>
      <div className="container">
        <div className={rowCls}>
          <FadeIn className={imageCls} style={imageStyle}>
            <AppImage
              src={service.image.src}
              width={service.image.width}
              height={service.image.height}
              alt={service.image.alt}
              sizes="(max-width: 768px) 100vw, 50vw"
              className={styles.photo}
            />
            {service.imageBadge && (
              <div className={styles.imageBadge}>
                {typeof service.imageBadge === "string" ? (
                  <p>{service.imageBadge}</p>
                ) : (
                  <AppImage
                    src={service.imageBadge.src}
                    width={service.imageBadge.width}
                    height={service.imageBadge.height}
                    alt={service.imageBadge.alt}
                    className={styles.imageBadgeLogo}
                  />
                )}
              </div>
            )}
          </FadeIn>

          <FadeIn className={styles.content}>
            <h2>
              {service.titleStart} <span>{service.titleHighlight}</span>
            </h2>
            {service.description && (
              <RichText text={service.description} className={descriptionCls} />
            )}

            {service.checklist && (
              <ul className={styles.checklist}>
                {service.checklist.map((item) => (
                  <li key={item}>
                    <Check size={16} strokeWidth={3} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            )}

            {service.subSections?.map((sub) => (
              <div className={styles.sub} key={sub.title}>
                <h3>
                  {sub.icon === "star" ? (
                    <Star size={15} aria-hidden="true" />
                  ) : (
                    <Gem size={15} aria-hidden="true" />
                  )}
                  {sub.title}
                </h3>
                <ul className={styles.subItems}>
                  {sub.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}

            {service.note && <RichText text={service.note} className={styles.note} />}

            <div className={styles.actions}>
              <Button href={ctaHref} external={!!service.primaryCta.whatsappMessage}>
                {service.primaryCta.icon === "whatsapp" && <WhatsAppIcon size={16} />}
                {service.primaryCta.label}
              </Button>
              {service.showPhone && (
                <div className={styles.phone}>
                  <Phone size={16} aria-hidden="true" />
                  <span>{site.phone}</span>
                </div>
              )}
            </div>

            {service.link && (
              <Link href={service.link.href} className={styles.link}>
                {service.link.label} <ArrowRight size={14} aria-hidden="true" />
              </Link>
            )}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
