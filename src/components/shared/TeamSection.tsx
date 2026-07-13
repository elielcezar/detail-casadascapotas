import { User } from "lucide-react";
import { team } from "@/data/home";
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
              <div className={styles.avatar} aria-hidden="true">
                <User size={48} />
              </div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
