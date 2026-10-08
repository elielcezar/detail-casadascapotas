# Prompts para disparar cada fase

Copie, troque os `<…>` e cole numa sessão nova do Claude Code aberta na raiz do
projeto alvo. Cada prompt para no fim da fase para revisão.

---

## Kickoff (Fase 0 + Fase 1)

```
Use a skill code-to-figma-design-system.
Arquivo Figma: <URL do arquivo com as páginas Cover, Foundations, Components, Screens>
Telas a montar: <Home 1440 + 390>, <Página X 1440>, <Página Y 1440>.

Fase 0: crie docs/figma-design-system-plano.md a partir do template, inicie o
`npm run dev` em background e faça um teste de escrita no Figma criando uma única
variável de cor (<cor da marca>) na coleção Primitives. Se funcionar, siga para a
Fase 1 (auditoria só no código) e me traga a proposta de tokens e o inventário de
componentes para eu revisar antes de mexer no Figma.
```

## Fase 2

```
Respostas: 1. <arredonde> 2. <consolide> 3. <siga a recomendação> 4. <…>
Prossiga com a Fase 2 (Foundations).
```

## Fase 3

```
Revisei a Foundations, prossiga com a Fase 3 (Components).
```

## Fase 4

```
Aprovado, prossiga com a Fase 4 (Screens): capture as telas do site rodando como
referência, monte cada tela só com instâncias e valide seção por seção.
```

## Fase 5

```
Prossiga com a Fase 5: capa, página de case e organização/nomes de camadas.
Não porte tokens para o código e não commite nada.
```

## Retomar uma sessão interrompida

```
Use a skill code-to-figma-design-system. Estou retomando o projeto <nome>:
Figma <URL>, plano em docs/figma-design-system-plano.md, auditoria em
docs/figma-fase1-auditoria.md. Rode a inspeção do arquivo (scripts/figma/inspect-file.js
e uma listagem de componentes por página), reconstrua o ledger e continue da fase <N>.
```
