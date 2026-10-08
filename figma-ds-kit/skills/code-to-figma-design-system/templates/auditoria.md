# Fase 1 — Auditoria do código → proposta de tokens e inventário

Fonte: <N> arquivos de estilo + <arquivo global> + props dos componentes.
Conversão: 1rem = 16px. Contagens = ocorrências nos módulos.

## 1. Cores

### Primitives (coleção `Primitives`, 1 modo, scopes vazios)
| Variável | Valor | Origem (custom property / uso) |
|---|---|---|

Alfas (variáveis próprias — o Figma não aplica opacidade sobre alias):
| Variável | Valor | Uso |
|---|---|---|

### Semantic (coleção `Semantic`, aliases)
| Grupo | Token → primitive |
|---|---|
| `bg/` | |
| `text/` | |
| `icon/` | |
| `border/` | |
| `action/` | |
| `focus/` | |

## 2. Espaçamento
Valores encontrados: <…>. Escala proposta:
| Token | px | Uso típico |
|---|---|---|
Fora da escala (locais ou tokens pontuais): <…>.

## 3. Radius
| Token | px | Uso |
|---|---|---|

## 4. Tipografia
Fontes e herança (quem herda line-height do body, o que é `<button>`, quem não define font-family):
| Text style | Fonte / peso | Desktop | Mobile | Extras (lh, ls, upper) | Uso |
|---|---|---|---|---|---|
Arredondamentos: <…>.

## 5. Efeitos, layout e motion
| Style | Valor | Uso |
|---|---|---|
Container, breakpoints, larguras de tela no Figma, transições e hovers.

## 6. Coleção Responsive (Desktop / Mobile)
O que entra: font-size de todos os estilos + paddings/tamanhos que mudam.

## 7. Inventário de componentes
### Átomos / moléculas
| Componente | Variantes / props | Estados |
|---|---|---|
### Cards
| Componente | Variantes / props | Estados |
|---|---|---|
### Blocos
| Bloco | Variantes |
|---|---|
Fora do Figma (só comportamento): <…>.

## 8. Achados
1. Contraste: <pares abaixo de 4,5:1>.
2. Valores fixos fora dos tokens: <…>.
3. Comentários/nomes desatualizados: <…>.

## 9. Adições durante a Fase 3
| Tipo | Adicionado | Motivo |
|---|---|---|

## 10. Ajustes descobertos na Fase 4
| Ajuste | Por quê |
|---|---|
Validação final (altura total, montado × site): <…>.
