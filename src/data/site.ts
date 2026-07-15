/**
 * Dados gerais do site — contatos, redes sociais e domínio.
 *
 * ⚠️ ATENÇÃO: os valores marcados com [PLACEHOLDER] são provisórios.
 * Troque pelos dados reais antes do lançamento — este é o ÚNICO arquivo
 * que precisa ser editado para isso.
 */
export const site = {
  name: "Detail Estética Automotiva",
  shortName: "Detail",
  description:
    "Películas, PPF e limpeza automotiva profissional em Curitiba. Produtos 3M, garantia e equipe especializada.",

  /** [PLACEHOLDER] Domínio final do site (usado em SEO: canonical, sitemap, Open Graph) */
  url: "https://www.detailesteticaautomotiva.com.br",

  /** Telefone fixo exibido no site */
  phone: "(41) 3333-7490",
  /** Telefone em formato de link (tel:) */
  phoneHref: "+554133337490",

  /** Número do WhatsApp com DDI+DDD, só dígitos */
  whatsapp: "554133337490",

  /** [PLACEHOLDER] E-mail de contato */
  email: "contato@casadascapotas.com",

  instagramHandle: "@casadascapotascuritiba",
  parentWebsite: "www.casadascapotas.com",

  address: {
    city: "Curitiba",
    state: "PR",
  },

  hours: "Seg-Sex: 8h às 18h",

  social: {
    instagram: "https://www.instagram.com/casadascapotascuritiba/",
    facebook: "https://www.facebook.com/casadascapotascuritiba",
    youtube: "https://www.youtube.com/@casadascapotascuritiba/videos",
  },
};

/** Monta um link de WhatsApp, opcionalmente com mensagem pré-preenchida. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
