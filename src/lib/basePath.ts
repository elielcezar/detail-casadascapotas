/**
 * Prefixa um caminho absoluto (ex.: "/img/logo.png") com o basePath do build atual.
 *
 * O Next.js aplica o basePath automaticamente a next/image, next/link e
 * next/script, mas NÃO a URLs escritas à mão em CSS (url(...)) ou em estilos
 * inline — por isso qualquer background-image montado manualmente precisa
 * passar por aqui.
 */
export function withBasePath(path: string): string {
  // URL absoluta (imagem vinda do WordPress) já aponta para outro domínio:
  // prefixar o basePath geraria "/detail/https://detail.ecwd.cloud/...".
  if (/^(https?:)?\/\//.test(path) || path.startsWith("data:")) return path;
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}
