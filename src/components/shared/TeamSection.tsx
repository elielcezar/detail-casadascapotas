import type { TeamMember } from "@/data/home";
import { getTeam } from "@/lib/content";
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
export default async function TeamSection({ id, showSalesTeam = false }: TeamSectionProps) {
  const { tecnica, vendas } = await getTeam();

  return (
    <section className={styles.team} id={id}>
      <div className="container">
        {showSalesTeam && (
          <div className={styles.group}>
            <SectionTitle
              start="Equipe"
              highlight="Comercial"
              text="Profissionais dedicados e apaixonados pelo que fazem, prontos para oferecer o melhor atendimento."
            />
            <TeamGrid members={vendas} />
          </div>
        )}
        <div className={styles.group}>
          <SectionTitle
            start="Equipe"
            highlight="Técnica"
            text="Técnicos altamente qualificados para garantir um serviço de alta performance. Seu carro em boas mãos."
          />
          <TeamGrid members={tecnica} />
        </div>
      </div>
    </section>
  );
}
