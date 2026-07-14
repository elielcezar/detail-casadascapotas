/**
 * Conteúdo da página inicial: hero, diferenciais, seções de serviço,
 * contadores, equipe e galeria.
 *
 * Campos marcados como "rich text" aceitam <strong>/<b> para negrito, linha
 * em branco para novo parágrafo e quebra de linha simples para <br>
 * (renderizados por src/components/shared/RichText.tsx).
 */

export interface HeroSlide {
  /** Imagem de fundo (em public/img) */
  background: string;
  titleStart: string;
  titleHighlight: string;
  /** Texto após o destaque (opcional) */
  titleEnd?: string;
  /** Rich text */
  subtitle: string;
  buttons: {
    label: string;
    href: string;
    variant: "primary" | "outline";
    icon?: "tools" | "whatsapp" | "film";
    /** Se definido, o href vira um link de WhatsApp com esta mensagem */
    whatsappMessage?: string;
  }[];
}

export const heroSlides: HeroSlide[] = [
  {
    background: "/img/ferrari-oficina.jpg",
    titleStart: "Excelência em",
    titleHighlight: "Estética Automotiva",
    subtitle:
      "Proteção, beleza e cuidado profissional para o seu veículo. Trabalhamos com as melhores marcas do mercado para entregar resultados que superam expectativas.",
    buttons: [
      { label: "Nossos Serviços", href: "/#servicos", variant: "primary", icon: "tools" },
      { label: "Fale Conosco", href: "", variant: "outline", icon: "whatsapp", whatsappMessage: "" },
    ],
  },
  {
    background: "/img/hero-pelicula.jpg",
    titleStart: "Proteção",
    titleHighlight: "Total",
    titleEnd: "para seu Veículo",
    subtitle:
      "Películas 3M, PPF e limpeza profissional. De dentro para fora, cuidamos de cada detalhe com tecnologia de ponta e garantia de até 15 anos.",
    buttons: [
      { label: "Ver Películas", href: "/peliculas", variant: "primary", icon: "film" },
      { label: "Agendar Agora", href: "", variant: "outline", icon: "whatsapp", whatsappMessage: "" },
    ],
  },
];

export interface Feature {
  icon: "award" | "users" | "shield";
  title: string;
  /** Rich text */
  text: string;
}

export const features: Feature[] = [
  {
    icon: "award",
    title: "Produtos Premium",
    text: "Utilizamos películas 3M e produtos de alta performance reconhecidos mundialmente pela qualidade e durabilidade.",
  },
  {
    icon: "users",
    title: "Equipe Especializada",
    text: "Profissionais treinados e certificados, com anos de experiência em estética e proteção automotiva.",
  },
  {
    icon: "shield",
    title: "Garantia de Serviço",
    text: "Todos os nossos serviços possuem garantia. Películas com até 15 anos de garantia de fábrica.",
  },
];

export interface ServiceSection {
  /** Âncora da seção (ex.: "servicos" vira /#servicos) */
  id: string;
  /** Fundo cinza-claro alternado */
  altBackground: boolean;
  /** Imagem à direita do texto */
  reversed: boolean;
  image: {
    src: string;
    width: number;
    height: number;
    alt: string;
    /** "portrait" mantém a proporção vertical da foto em vez do recorte padrão 400px */
    orientation?: "landscape" | "portrait";
    /** Altura da foto em telas desktop (>=769px); no mobile usa o padrão da orientação */
    desktopHeight?: number;
  };
  /** Selo sobre a foto: texto (padrão) ou logo (ex.: 3M) */
  imageBadge: string | { src: string; width: number; height: number; alt: string };
  titleStart: string;
  titleHighlight: string;
  /** Rich text */
  description: string;
  checklist?: string[];
  subSections?: {
    icon: "star" | "gem";
    title: string;
    items: string[];
  }[];
  primaryCta: {
    label: string;
    href?: string;
    whatsappMessage?: string;
    icon: "whatsapp" | "none";
  };
  showPhone: boolean;
  link?: {
    label: string;
    href: string;
  };
}

export const serviceSections: ServiceSection[] = [
  {
    id: "servicos",
    altBackground: true,
    reversed: false,
    image: {
      src: "/img/portfolio-pelicula-3.jpg",
      width: 1081,
      height: 525,
      alt: "Aplicação de película automotiva",
    },
    imageBadge: "Proteção e Conforto para seu Veículo",
    titleStart: "Películas de",
    titleHighlight: "Controle Solar",
    description:
      "Amplo portfólio de películas das melhores marcas do mercado. Da linha de entrada até a super premium, temos a solução ideal para cada necessidade e orçamento.",
    checklist: [
      "Linha 3M completa: FX, Color Stable, Ceramic IR e Crystalline",
      "Bloqueio UV de até 99,9% e rejeição de calor superior",
      "Películas de segurança anti-vandalismo",
      "Garantia de fábrica de até 15 anos",
    ],
    primaryCta: { label: "Ver Catálogo", href: "/peliculas", icon: "none" },
    showPhone: true,
    link: { label: "Ver catálogo completo de películas", href: "/peliculas" },
  },
  {
    id: "limpeza",
    altBackground: false,
    reversed: true,
    image: {
      src: "/img/limpeza-profissional.jpg",
      width: 1080,
      height: 1920,
      alt: "Detalhamento do painel interno com pincel e espuma de limpeza",
      orientation: "portrait",
      desktopHeight: 650,
    },
    imageBadge: "Cuidado em Cada Detalhe",
    titleStart: "Limpeza",
    titleHighlight: "Profissional",
    description:
      "Dois pacotes desenvolvidos para atender desde a manutenção periódica até a revitalização completa do seu veículo.",
    subSections: [
      {
        icon: "star",
        title: "Limpeza Clássica",
        items: [
          "Pré-lavagem em espuma",
          "Lavagem com luva de microfibra",
          "Rodas e caixas com pincéis",
          "Detalhamento em borrachas e frisos",
          "Secagem com toalhas + jato de ar",
          "Aspiração + limpeza interna",
          "Vidros e revitalizador de pneus",
        ],
      },
      {
        icon: "gem",
        title: "Limpeza Técnica",
        items: [
          "Todos os itens da Clássica",
          "Descontaminação com clay bar",
          "Selante de pintura (até 3 meses)",
          "Condicionamento de plásticos externos",
          "Secagem controlada",
        ],
      },
    ],
    primaryCta: {
      label: "Agendar",
      whatsappMessage: "Olá! Gostaria de saber mais sobre os serviços de limpeza.",
      icon: "whatsapp",
    },
    showPhone: false,
    link: { label: "Ver portfólio completo de limpeza", href: "/limpeza" },
  },
  {
    id: "ppf",
    altBackground: true,
    reversed: false,
    image: {
      src: "/img/ppf.jpg",
      width: 1200,
      height: 800,
      alt: "Profissional aplicando película PPF no farol do veículo",
      desktopHeight: 450,
    },
    imageBadge: { src: "/img/3m-white.png", width: 346, height: 183, alt: "Logo 3M" },
    titleStart: "PPF —",
    titleHighlight: "Paint Protection Film",
    description:
      "Película de proteção de pintura transparente <strong>3M</strong> que preserva a estética original do veículo contra riscos, pedras, insetos e intempéries do dia a dia. Nossos técnicos possuem <strong>certificação da 3M do Brasil.</strong>",  
    checklist: [
      "Proteção contra riscos, pedras e detritos da estrada",
      "Película transparente que não altera a cor original",
      "Auto-regeneração: riscos leves desaparecem com calor",
      "Proteção UV que previne desbotamento da pintura",
      "Facilita a limpeza e manutenção do veículo",
    ],
    primaryCta: {
      label: "Solicitar Orçamento",
      whatsappMessage: "Olá! Gostaria de saber mais sobre PPF.",
      icon: "whatsapp",
    },
    showPhone: true,
    link: { label: "Ver portfólio completo de PPF", href: "/ppf" },
  },
];

export interface Counter {
  target: number;
  /** Exibido após o número animado (padrão: "+") */
  suffix?: string;
  label: string;
}

export const counters: Counter[] = [
  { target: 200000, label: "Clientes Atendidos" },
  { target: 56, label: "Anos de Experiência" },
  { target: 200000, label: "Serviços Realizados" },
  { target: 28, label: "Fornecedores Parceiros" },
];

export interface TeamMember {
  name: string;
  role: string;
  photo: {
    src: string;
    width: number;
    height: number;
  };
}

export const team: TeamMember[] = [
  { name: "Josoé", role: "Especialista", photo: { src: "/img/josoe.jpg", width: 630, height: 631 } },
  { name: "Lorran", role: "Especialista", photo: { src: "/img/lorran.jpg", width: 630, height: 631 } },
  { name: "Matheus", role: "Especialista", photo: { src: "/img/matheus.jpg", width: 630, height: 631 } },
];

export interface GalleryImage {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export const galleryImages: GalleryImage[] = [
  { src: "/img/galeria/galeria-01.jpg", width: 1080, height: 1920, alt: "Detalhe da grade frontal com emblema R/T de picape preta" },
  { src: "/img/galeria/galeria-02.jpg", width: 1920, height: 1280, alt: "Profissional da Detail aplicando proteção na lateral de uma Ford Ranger Storm cinza" },
  { src: "/img/galeria/galeria-03.jpg", width: 1280, height: 1920, alt: "Profissional instalando acessório no retrovisor de um veículo" },
  { src: "/img/galeria/galeria-04.jpg", width: 1280, height: 1920, alt: "Frente de Land Rover preta polida, com placa personalizada Detail Casa das Capotas" },
  { src: "/img/galeria/galeria-05.jpg", width: 1920, height: 1280, alt: "Land Rover Defender preta finalizada na oficina, com rolos de película ao fundo" },
  { src: "/img/galeria/galeria-06.jpg", width: 1920, height: 1280, alt: "Volkswagen Jetta cinza com o para-choque removido durante serviço de proteção" },
  { src: "/img/galeria/galeria-07.jpg", width: 1280, height: 1920, alt: "Profissional aplicando película de proteção de pintura no farol de um veículo preto" },
  { src: "/img/galeria/galeria-08.jpg", width: 1440, height: 1920, alt: "Detalhe do emblema BMW no capô de um veículo preto recém-polido" },
  { src: "/img/galeria/galeria-09.jpg", width: 1440, height: 1920, alt: "Interior de couro caramelo com acabamento em diamante de um veículo detalhado" },
  { src: "/img/galeria/galeria-10.jpg", width: 1440, height: 1920, alt: "BMW preta finalizada em box iluminado da oficina Detail" },
];
