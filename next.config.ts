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
  // Gera /peliculas/index.html em vez de /peliculas.html — URLs com barra
  // final funcionam em qualquer servidor estático sem configuração extra
  trailingSlash: true,
  basePath,
  images: {
    // Sem servidor Node não há otimizador de imagens em tempo real;
    // as imagens já são comprimidas manualmente em public/img
    unoptimized: true,
  },
};

export default nextConfig;
