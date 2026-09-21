---
name: nextjs-wp-diagnostico
description: Diagnostica um site Next.js estático integrado a WordPress headless que parou de funcionar. Use quando o site não atualiza depois de editar no WordPress, o build do GitHub Actions falha, o webhook diz "deploy disparado" mas nada acontece, aparece 403 ou 400 na REST API do WordPress, imagens da galeria somem, a chave `acf` não vem na resposta, ou o deploy apagou arquivos do servidor. Vai do sintoma à causa na ordem que elimina mais possibilidades por vez.
---

# Diagnóstico da integração Next.js + WordPress

Cada sintoma abaixo tem causas ordenadas por frequência. Confirme uma antes
de passar para a próxima — quase todas se testam com um comando.

## "Editei no WordPress e o site não mudou"

Provável ordem:

**1. O build nem rodou.** Confira as execuções do Actions. Se não há execução
nova, o problema é o webhook — veja a seção do 403 abaixo.

**2. O build rodou e falhou.** Leia o log. Falha de rede na API do WordPress
é o caso comum, e é o comportamento **correto**: o build aborta em vez de
publicar páginas vazias.

**3. O build passou e publicou conteúdo velho.** Esta é a traiçoeira. O
`.next/cache/fetch-cache` guarda as respostas do WordPress entre builds:

```bash
rm -rf .next/cache/fetch-cache && npm run build
```

Se o conteúdo novo aparecer, era isso. A correção permanente é um script
`prebuild` que apague esse diretório, e **nunca** cachear `.next/` no
workflow.

**4. O tipo de conteúdo não está na lista do plugin.** O plugin de deploy só
dispara para os tipos que observa. CPT novo precisa entrar na lista.

**5. Páginas não disparam deploy.** No plugin, o gatilho para `page` costuma
vir desligado por padrão. Se o conteúdo mora numa página, confira a caixa.

**6. Cache do servidor.** LiteSpeed e Cloudflare guardam HTML. Limpe e teste
em aba anônima antes de investigar o build.

## "O plugin diz que disparou, mas não aparece nada no Actions"

O GitHub responde **204 (sucesso)** ao `repository_dispatch` mesmo quando
nada acontece. Causas, em ordem:

**1. Repositório errado.** O plugin costuma vir com o repositório do projeto
de origem como valor padrão. Teste direto:

```bash
curl -s -o /dev/null -w "%{http_code}\n" -X POST \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"event_type":"wordpress_publish"}' \
  https://api.github.com/repos/USUARIO/REPO/dispatches
```

`403 Resource not accessible by personal access token` com token válido é
quase sempre repositório errado, não token errado. Confirme testando o
mesmo token no repositório certo.

**2. Token expirado.** Fine-grained PAT expira. Quando expira, o plugin
registra erro HTTP no log e os deploys param sem ninguém perceber.

**3. `event_type` não bate** com o `types:` do `repository_dispatch` no
workflow.

**4. Workflow desativado.** O GitHub desativa workflows agendados após 60
dias sem commits no repositório.

## "Build falha com `fetch failed` na API do WordPress"

**1. O WordPress está fora do ar?**
```bash
curl -s -o /dev/null -w "%{http_code}\n" https://admin.dominio/wp-json/wp/v2/pages
```

**2. Bloqueio temporário.** O WAF da hospedagem bloqueia rajadas vindas de
IPs de datacenter — e o runner do GitHub é um. Vários builds seguidos
disparam isso. Espere e rode de novo.

**3. As retentativas não estão chegando ao fim.** Se o log alterna entre
retentativas e `took more than 60 seconds ... attempt N of 3`, o timeout de
geração de página do Next está matando a escada de espera pela metade.
Aumente `staticPageGenerationTimeout`; não encurte as retentativas, porque a
espera longa é justamente o que atravessa o bloqueio.

**4. User-Agent barrado.** O `fetch` do Node manda `User-Agent: node`, que
muitos WAFs tratam como bot. Mande um UA que identifique o build.

## "A chave `acf` não vem na resposta"

1. O grupo de campos está com **Show in REST API = Sim**?
2. A requisição tem `acf_format=standard`? Sem isso, campos de imagem e
   galeria voltam como ID em vez de objeto.
3. O CPT tem `show_in_rest => true` e `rest_base` correto?

## "HTTP 400 ao gravar campos ACF via REST"

Leia a mensagem — ela nomeia o campo. Campo marcado como `required` no ACF
é exigido em **qualquer** escrita, inclusive update parcial de um campo só.
Reenvie os obrigatórios junto:

```json
{"acf": {"id_card": "valor-existente", "descricao": "texto novo"}}
```

O admin não sofre com isso porque envia o formulário inteiro. Quem quebra é
script de seed e automação.

## "HTTP 400 em `orderby=menu_order`"

O CPT não declara `page-attributes` em `supports`. O WordPress só aceita
esse `orderby` quando o tipo suporta atributos de página.

## "As imagens somem / aparecem quebradas"

**1. Caminho com basePath duplicado.** Se o projeto prefixa `basePath` em
URLs escritas à mão, uma URL absoluta do WordPress vira
`/subpasta/https://admin.dominio/...`. A função que aplica o prefixo precisa
ignorar URL absoluta.

**2. Duas fontes de imagem para o mesmo conteúdo.** Se a listagem usa a
galeria do ACF e o detalhe cai na imagem destacada, o mesmo item aparece
diferente em cada tela. Escolha uma fonte por tipo de conteúdo e não
ofereça a outra no admin.

**3. O WordPress mudou de domínio.** As URLs ficam gravadas no HTML
publicado. Se existe a variável de ambiente de origem de mídia, troque e
rebuilde; se não existe, é hora de criá-la.

## "O deploy apagou arquivos do servidor"

A action de FTP **apaga do servidor tudo que não existe no diretório local**.

Verifique, nesta ordem:

1. **O diretório de destino está certo?** Conta de FTP costuma cair no home
   da hospedagem, não na raiz do site. Apontar para `/` faz o deploy apagar
   `mail/`, `ssl/`, `logs/` — e-mails e certificados do cliente.
2. **`.well-known/` está no `exclude`?** É onde o Let's Encrypt valida a
   renovação. Apagar derruba o HTTPS em algumas semanas.
3. **Que mais existe naquela pasta que não vem do build?**

Antes de qualquer deploy automático novo, compare:

```bash
# lista o servidor e o build, e mostra só o que seria removido
comm -23 <(listagem_do_servidor | sort) <(ls -A out/ | sort)
```

E rode o workflow uma vez com `dry-run: true`: o log diz quantos bytes ele
apagaria. `Deleting: 0 B` é o que você quer ver.

## Quando nada acima explica

Reproduza fora do CI. A maioria dos problemas aparece localmente:

```bash
rm -rf .next/cache/fetch-cache
NEXT_PUBLIC_WP_API_URL=https://admin.dominio/wp-json/wp/v2 npm run build
grep -c "algum-trecho-do-conteudo" out/index.html
```

Se passa local e falha no CI, a diferença é rede (bloqueio por IP) ou
variável de ambiente (secret ausente ou com valor errado).
