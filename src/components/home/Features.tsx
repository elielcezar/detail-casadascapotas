import { Award, Shield, Users } from "lucide-react";
import FadeIn from "@/components/shared/FadeIn";
import { features, type Feature } from "@/data/home";
import styles from "./Features.module.css";

const icons: Record<Feature["icon"], typeof Award> = {
  award: Award,
  users: Users,
  shield: Shield,
};

/** Cards de diferenciais logo abaixo do hero. */
export default function Features() {
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
                <p>{feature.text}</p>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
