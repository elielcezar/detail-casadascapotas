import type { NextConfig } from "next";

// Define NEXT_PUBLIC_BASE_PATH ao gerar uma build para publicar em uma
// subpasta (ex.: prévia em eliel.dev/detail/). Sem a variável, o build
// assume que o site vive na raiz do domínio — o caso da hospedagem
// definitiva. Precisa do prefixo NEXT_PUBLIC_ porque o valor também é lido
// no navegador (src/lib/basePath.ts), para imagens de fundo que não passam
// pelo next/image.
// Exemplo: NEXT_PUBLIC_BASE_PATH=/detail npm run build
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  // Export estático: `npm run build` gera a pasta `out/` pronta para
  // upload em qualquer hospedagem (cPanel, Hostinger, Netlify, etc.)
  output: "export",
  // O wpFetch de src/lib/wordpress.ts espera 2s, 5s, 15s e 30s entre as
  // retentativas — cerca de 52s só de espera, mais o tempo das requisições.
  // Com o padrão de 60s do Next, a última retentativa (a mais importante,
  // porque é a que sobrevive a um bloqueio temporário de WAF) era cortada no
  // meio e a página reiniciava do zero. Aconteceu em 20/09/2026.
  staticPageGenerationTimeout: 180,
  // Gera /peliculas/index.html em vez de /peliculas.html — URLs com barra
  // final funcionam em qualquer servidor estático sem configuração extra
  trailingSlash: true,
  basePath,
  images: {
    // Sem servidor Node não há otimizador de imagens em tempo real;
    // as imagens já são comprimidas manualmente em public/img
    unoptimized: true,
    // Galeria e equipe vêm da biblioteca de mídia do WordPress. Com
    // `unoptimized` o Next não exige esta lista, mas ela documenta a origem
    // permitida e evita quebra se a otimização for religada um dia.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "detail.ecwd.cloud",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
