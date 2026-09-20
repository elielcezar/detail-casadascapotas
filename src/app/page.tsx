import Counters from "@/components/home/Counters";
import Features from "@/components/home/Features";
import GallerySection from "@/components/home/GallerySection";
import HeroCarousel from "@/components/home/HeroCarousel";
import ServiceShowcase from "@/components/home/ServiceShowcase";
import CtaSection from "@/components/shared/CtaSection";
import TeamSection from "@/components/shared/TeamSection";
import { getHome, getSettings } from "@/lib/content";

export default async function HomePage() {
  const { whatsapp } = await getSettings();
  const { heroSlides, counters, serviceSections } = await getHome();

  return (
    <>
      <HeroCarousel slides={heroSlides} whatsapp={whatsapp} />
      <Features />
      {serviceSections.map((service) => (
        <ServiceShowcase key={service.id} service={service} />
      ))}
      <Counters counters={counters} />
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
