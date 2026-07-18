import Counters from "@/components/home/Counters";
import Features from "@/components/home/Features";
import GallerySection from "@/components/home/GallerySection";
import HeroCarousel from "@/components/home/HeroCarousel";
import ServiceShowcase from "@/components/home/ServiceShowcase";
import CtaSection from "@/components/shared/CtaSection";
import TeamSection from "@/components/shared/TeamSection";
import { serviceSections } from "@/data/home";

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <Features />
      {serviceSections.map((service) => (
        <ServiceShowcase key={service.id} service={service} />
      ))}
      <Counters />
      <TeamSection id="equipe" showSalesTeam />
      <GallerySection />
      <CtaSection
        id="contato"
        titleStart="Agende Seu"
        titleStrong="Serviço"
        text="Entre em contato conosco e descubra a melhor solução para proteger e valorizar o seu veículo."
        whatsappLabel="WhatsApp"
        whatsappMessage="Olá! Gostaria de agendar um serviço."
        phoneLabel="Ligar Agora"
        showContactInfo
      />
    </>
  );
}
