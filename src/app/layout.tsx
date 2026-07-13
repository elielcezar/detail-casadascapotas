import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import { site } from "@/data/site";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-heading",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.shortName} | Estética Automotiva em Curitiba`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  alternates: {
    canonical: "./",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.name,
    images: ["/img/ferrari-oficina.jpg"],
  },
};

/** Dados estruturados para o Google (negócio local). */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  name: site.name,
  description: site.description,
  url: site.url,
  telephone: site.phoneHref,
  email: site.email,
  image: `${site.url}/img/ferrari-oficina.jpg`,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    addressCountry: "BR",
  },
  openingHours: "Mo-Fr 08:00-18:00",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} ${openSans.variable}`}>
      <body>
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
