# MOCI nas Ocorrências

Apresentação animada, com trilha sonora, do **Sistema MOCI** (Mapa de Ocupações
Contra Incêndio) para os grupamentos do CBMPE que atendem ocorrências. Foi feita
pelo CAT Sertão, na versão do 4º GB, em 22/10/2026.

- **Site:** https://catsertao.github.io/moci-apresentacao/
- **Acesso:** só com a chave. O conteúdo está **cifrado** (AES-256-GCM)
  dentro do `index.html`. A chave fica só no final do link completo, depois do
  `#`. O navegador não envia essa parte ao servidor, e ela não fica neste
  repositório. Sem a chave, a página mostra apenas um aviso.
- **Navegador que já abriu:** quem abre o link completo uma vez fica com a chave
  guardada no próprio navegador (`localStorage`, origem `catsertao.github.io`).
  Daí em diante, o endereço curto abre direto. É assim que o botão do menu
  "Apresentações do MOCI" funciona sem pôr a chave no código público.
- **Buscadores:** a página tem `noindex`, para não aparecer no Google.

## Como passar a apresentação

Clique em **Iniciar apresentação** para liberar o som. Depois:

- **Avançar:** seta →, clique, ou o passador.
- **Voltar:** seta ←.
- **N:** notas do apresentador.
- **M:** liga e desliga o som.
- **F:** tela cheia.

## Como atualizar

1. Gere a apresentação nova completa (`.html` avulso). As fontes (modelo,
   imagens e montador) ficam fora deste repositório, porque ele é público.
   Elas estão no Drive pessoal do administrador geral, ao lado do arquivo do link.
2. Rode o comando abaixo:

   ```bash
   node ferramentas/cifrar.mjs <apresentacao.html> <arquivo-do-link.txt>
   ```

   O `<arquivo-do-link.txt>` fica **fora do repositório**, no Drive pessoal do
   administrador geral.
   - Se ele já existir, a chave dele é reaproveitada, e o link continua o mesmo.
   - Se não existir, o comando cria uma chave nova e grava o link nele.
3. Faça o commit só do `index.html`.

**Para trocar a chave** (por exemplo, se o link vazar), rode o comando apontando
para um arquivo de link que ainda não existe. Ele cria uma chave nova e grava o
link novo nesse arquivo. Depois publique o `index.html`. Nos navegadores, a chave antiga
guardada deixa de abrir e é descartada sozinha.

**Nunca ponha o link completo nem a chave em arquivo do repositório**, nem no
repositório `moci-catsertao`, que é público.
