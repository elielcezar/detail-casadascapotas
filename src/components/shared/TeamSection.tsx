import { team } from "@/data/home";
import AppImage from "./AppImage";
import FadeIn from "./FadeIn";
import SectionTitle from "./SectionTitle";
import styles from "./TeamSection.module.css";

/** Seção "Conheça Nossa Equipe", usada na home e na página de limpeza. */
export default function TeamSection({ id }: { id?: string }) {
  return (
    <section className={styles.team} id={id}>
      <div className="container">
        <SectionTitle
          start="Conheça Nossa"
          highlight="Equipe"
          text="Profissionais dedicados e apaixonados pelo que fazem, prontos para oferecer o melhor atendimento."
        />
        <div className={styles.grid}>
          {team.map((member) => (
            <FadeIn key={member.name} className={styles.card}>
              <AppImage
                src={member.photo.src}
                width={member.photo.width}
                height={member.photo.height}
                alt={`Foto de ${member.name}, ${member.role} da Detail`}
                className={styles.avatar}
                sizes="200px"
              />
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
