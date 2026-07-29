import AppImage from "./AppImage";
import styles from "./PPFLogosSection.module.css";

interface Logo {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export default function PPFLogosSection({ logos }: { logos: Logo[] }) {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.logosGrid}>
          {logos.map((logo) => (
            <div key={logo.src} className={styles.logoItem}>
              <AppImage src={logo.src} width={logo.width} height={logo.height} alt={logo.alt} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
