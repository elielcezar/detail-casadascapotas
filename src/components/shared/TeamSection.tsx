import { salesTeam, team, type TeamMember } from "@/data/home";
import AppImage from "./AppImage";
import FadeIn from "./FadeIn";
import SectionTitle from "./SectionTitle";
import styles from "./TeamSection.module.css";

function TeamGrid({ members }: { members: TeamMember[] }) {
  return (
    <div className={styles.grid}>
      {members.map((member) => (
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
  );
}

interface TeamSectionProps {
  id?: string;
  /** Exibe o time de vendas acima da equipe técnica (usado só na home). */
  showSalesTeam?: boolean;
}

/** Seção "Nossa Equipe" (técnicos), com "Nosso Time" (vendas) opcional acima. */
export default function TeamSection({ id, showSalesTeam = false }: TeamSectionProps) {
  return (
    <section className={styles.team} id={id}>
      <div className="container">
        {showSalesTeam && (
          <div className={styles.group}>
            <SectionTitle
              start="Nosso"
              highlight="Time"
              text="Profissionais dedicados e apaixonados pelo que fazem, prontos para oferecer o melhor atendimento."
            />
            <TeamGrid members={salesTeam} />
          </div>
        )}
        <div className={styles.group}>
          <SectionTitle
            start="Nossa"
            highlight="Equipe"
            text="Técnicos altamente qualificados para garantir um serviço de alta performance. Seu carro em boas mãos."
          />
          <TeamGrid members={team} />
        </div>
      </div>
    </section>
  );
}
