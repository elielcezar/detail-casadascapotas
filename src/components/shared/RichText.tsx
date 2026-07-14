import { Fragment, type ReactNode } from "react";
import styles from "./RichText.module.css";

/**
 * Renderiza texto de conteúdo (vindo de src/data/*.ts) suportando um
 * conjunto mínimo de marcações, sem usar dangerouslySetInnerHTML — cada nó
 * é construído explicitamente pelo React, então não há risco de HTML
 * arbitrário ser injetado:
 *
 * - Linha em branco  → novo parágrafo (<p>)
 * - Quebra de linha simples → <br />
 * - <strong>texto</strong> ou <b>texto</b> → negrito
 *
 * Exemplo: "Proteção total <strong>com garantia de 15 anos</strong>.\n\nFale com a gente."
 */
function parseInline(text: string, keyPrefix: string): ReactNode {
  const parts = text.split(/(<(?:strong|b)>[\s\S]*?<\/(?:strong|b)>)/g);
  return parts
    .filter((part) => part.length > 0)
    .map((part, i) => {
      const match = part.match(/^<(?:strong|b)>([\s\S]*)<\/(?:strong|b)>$/);
      if (match) {
        return <strong key={`${keyPrefix}-${i}`}>{match[1]}</strong>;
      }
      return <Fragment key={`${keyPrefix}-${i}`}>{part}</Fragment>;
    });
}

interface RichTextProps {
  text: string;
  /** Classe aplicada ao container externo (mantém o estilo do chamador) */
  className?: string;
}

export default function RichText({ text, className }: RichTextProps) {
  const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim().length > 0);

  return (
    <div className={className}>
      {paragraphs.map((paragraph, pi) => (
        <p key={pi} className={styles.paragraph}>
          {paragraph.split("\n").map((line, li, arr) => (
            <Fragment key={li}>
              {parseInline(line, `p${pi}l${li}`)}
              {li < arr.length - 1 && <br />}
            </Fragment>
          ))}
        </p>
      ))}
    </div>
  );
}
