# Fase 0 — Preparação

Objetivo: provar que dá para escrever no arquivo e que o site está acessível,
antes de investir em qualquer coisa.

## Checklist

1. **Plano do projeto.** Copie `templates/plano.md` para `docs/figma-design-system-plano.md`
   do projeto alvo e preencha: páginas do site, fontes, onde estão os tokens,
   link do arquivo Figma.
2. **Figma MCP.** `whoami` responde. Liste as páginas com `get_metadata(fileKey)`
   (sem nodeId). Se faltarem páginas, crie `Cover`, `Foundations`, `Components`,
   `Screens` (a página `Case` é criada na Fase 5, logo depois de `Cover`).
3. **Skills do Figma.** Leia `skill://figma/figma-use/SKILL.md` e
   `skill://figma/figma-generate-library/SKILL.md` via `ReadMcpResourceTool`
   (server `figma`). Se existir a skill local `figma-use`, prefira-a.
4. **Dev server.** Inicie em background (`npm run dev`) e **leia o log** para
   saber a porta real (no projeto de referência a 3000 estava ocupada e subiu na
   3001). Rotas com trailing slash podem redirecionar (308) — use a URL final.
5. **Teste de escrita.** Crie a coleção `Primitives` (modo renomeado para `Value`)
   com UMA variável de cor da marca, `scopes = []`, code syntax `var(--nome-real)`.
   Releia o valor e confirme. Lembre o usuário: variáveis são do arquivo, não de
   uma página.
6. **Ledger.** Crie o JSON de estado no scratchpad com fileKey, IDs das páginas e
   da coleção.

## Entregar ao usuário

- Status do teste (ok + ID da variável), porta do dev server.
- Seguir direto para a Fase 1 se o usuário pediu; senão, parar.
