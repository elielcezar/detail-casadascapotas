/**
 * Dados gerais do site — contatos, redes sociais e domínio.
 *
 * A partir da Fase 4, telefone, WhatsApp, e-mail, horário e redes passam a
 * ser editáveis no WordPress. Os valores aqui continuam sendo o padrão
 * usado quando o campo correspondente está vazio no admin.
 */
export const site = {
  name: "Detail Estética Automotiva",
  shortName: "Detail",
  description:
    "Películas, PPF e limpeza automotiva profissional em Curitiba. Produtos 3M, garantia e equipe especializada.",

  /** Domínio do site (usado em SEO: canonical, sitemap, Open Graph) */
  url: "https://casadascapotascuritiba.com",

  /** Telefone fixo exibido no site */
  phone: "(41) 3333-7490",
  /** Telefone em formato de link (tel:) */
  phoneHref: "+554133337490",

  /** Número do WhatsApp com DDI+DDD, só dígitos */
  whatsapp: "554133337490",

  /** E-mail de contato */
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

/**
 * Monta um link de WhatsApp, opcionalmente com mensagem pré-preenchida.
 *
 * O número é parâmetro, não lido de `site`, porque a partir da Fase 4 ele
 * pode vir do WordPress. Em componente de servidor use
 * `(await getSettings()).whatsapp`; em componente de cliente, receba por prop.
 *
 * Os argumentos são nomeados de propósito: número e mensagem são os dois
 * `string`, então a forma posicional deixava `whatsappLink(mensagem)`
 * compilar e gerar um link para um número inexistente.
 */
export function whatsappLink({
  whatsapp,
  message,
}: {
  whatsapp: string;
  message?: string;
}): string {
  const base = `https://wa.me/${whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
