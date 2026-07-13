import Image, { type ImageProps } from "next/image";
import { withBasePath } from "@/lib/basePath";

/**
 * Substituto de next/image que aplica o basePath ao src.
 *
 * Com `images.unoptimized` (necessário no export estático), o next/image
 * não prefixa o basePath automaticamente como faz com _next/static, CSS e
 * favicon — por isso todo <Image> local do site deve passar por aqui.
 */
export default function AppImage({ src, alt, ...props }: ImageProps) {
  const resolvedSrc = typeof src === "string" ? withBasePath(src) : src;
  return <Image src={resolvedSrc} alt={alt} {...props} />;
}
