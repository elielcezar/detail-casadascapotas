import { Award, Shield, Users } from "lucide-react";
import FadeIn from "@/components/shared/FadeIn";
import RichText from "@/components/shared/RichText";
import { type Feature } from "@/data/home";
import { getHome } from "@/lib/content";
import styles from "./Features.module.css";

const icons: Record<Feature["icon"], typeof Award> = {
  award: Award,
  users: Users,
  shield: Shield,
};

/** Cards de diferenciais logo abaixo do hero. */
export default async function Features() {
  const { features } = await getHome();

  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.grid}>
          {features.map((feature) => {
            const Icon = icons[feature.icon];
            return (
              <FadeIn key={feature.title} className={styles.card}>
                <div className={styles.icon} aria-hidden="true">
                  <Icon size={28} />
                </div>
                <h2>{feature.title}</h2>
                <RichText text={feature.text} />
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
