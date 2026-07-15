import Link from "next/link";
import { Clock, Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { site, whatsappLink } from "@/data/site";
import WhatsAppIcon from "@/components/shared/WhatsAppIcon";
import styles from "./Footer.module.css";

const serviceLinks = [
  { label: "Películas Automotivas", href: "/#servicos" },
  { label: "Limpeza Profissional", href: "/limpeza" },
  { label: "PPF - Proteção de Pintura", href: "/ppf" },
  { label: "Catálogo de Películas", href: "/peliculas" },
  { label: "Proteção Premium", href: "/protecao-premium" },
];

const usefulLinks = [
  { label: "Início", href: "/" },
  { label: "Nossa Equipe", href: "/#equipe" },
  { label: "Portfólio", href: "/#galeria" },
  { label: "Contato", href: "/#contato" },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div>
            <h2 className={styles.colTitle}>{site.shortName}</h2>
            <p>
              Referência em estética automotiva em Curitiba. Oferecemos serviços de películas,
              PPF e limpeza profissional com produtos premium e garantia de qualidade.
            </p>
            <div className={styles.social}>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Instagram size={16} aria-hidden="true" />
              </a>
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <Facebook size={16} aria-hidden="true" />
              </a>
              <a
                href={site.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <Youtube size={16} aria-hidden="true" />
              </a>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <WhatsAppIcon size={16} />
              </a>
            </div>
          </div>

          <nav aria-label="Serviços">
            <h2 className={styles.colTitle}>Serviços</h2>
            <ul>
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Links úteis">
            <h2 className={styles.colTitle}>Links Úteis</h2>
            <ul>
              {usefulLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={styles.colTitle}>Contato</h2>
            <ul className={styles.contact}>
              <li>
                <MapPin size={16} aria-hidden="true" /> {site.address.city} - {site.address.state}
              </li>
              <li>
                <Phone size={16} aria-hidden="true" /> {site.phone}
              </li>
              <li>
                <Mail size={16} aria-hidden="true" /> {site.email}
              </li>
              <li>
                <Clock size={16} aria-hidden="true" /> {site.hours}
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>
            &copy; {new Date().getFullYear()} {site.name}. Todos os direitos reservados.
          </span>          
        </div>
      </div>
    </footer>
  );
}
