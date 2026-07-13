import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Export estático: `npm run build` gera a pasta `out/` pronta para
  // upload em qualquer hospedagem (cPanel, Hostinger, Netlify, etc.)
  output: "export",
  // Gera /peliculas/index.html em vez de /peliculas.html — URLs com barra
  // final funcionam em qualquer servidor estático sem configuração extra
  trailingSlash: true,
  images: {
    // Sem servidor Node não há otimizador de imagens em tempo real;
    // as imagens já são comprimidas manualmente em public/img
    unoptimized: true,
  },
};

export default nextConfig;
