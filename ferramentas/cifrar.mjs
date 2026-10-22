// Gera o index.html do site: a apresentação vai CIFRADA (AES-256-GCM) dentro de uma página
// que só a decifra com a chave que vem no final do link (#chave). A chave nunca vai para o
// repositório nem para o servidor: o navegador não envia o que vem depois do "#".
//
// Uso: node ferramentas/cifrar.mjs <apresentacao.html> <arquivo-do-link.txt>
//  - <apresentacao.html>: a apresentação completa (a cópia avulsa, com <!doctype>).
//  - <arquivo-do-link.txt>: guardado FORA do repositório (Drive pessoal). Se já existir, reaproveita
//    a chave dele, e o link continua o mesmo; se não existir, cria uma chave nova e grava o link.
import { createCipheriv, randomBytes } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';

const SITE = 'https://catsertao.github.io/moci-apresentacao/';
const [origem, arqLink] = process.argv.slice(2);
if (!origem || !arqLink) throw new Error('uso: node ferramentas/cifrar.mjs <apresentacao.html> <arquivo-do-link.txt>');

let chave;
if (existsSync(arqLink)) {
  const m = readFileSync(arqLink, 'utf8').match(/moci-apresentacao\/#([A-Za-z0-9_-]{43})/);
  if (!m) throw new Error('o arquivo do link existe, mas não tem a chave');
  chave = Buffer.from(m[1], 'base64url');
} else {
  chave = randomBytes(32);
  const link = SITE + '#' + chave.toString('base64url');
  writeFileSync(arqLink, [
    'Link da apresentação animada do MOCI para os grupamentos (site no GitHub).',
    'Só abre com o link COMPLETO, incluindo o que vem depois do #. Quem tiver este link consegue abrir.',
    '',
    link,
    ''
  ].join('\r\n'), 'utf8');
  console.log('chave nova criada; link gravado em', arqLink);
}

const iv = randomBytes(12);
const c = createCipheriv('aes-256-gcm', chave, iv);
const cifrado = Buffer.concat([iv, c.update(readFileSync(origem)), c.final(), c.getAuthTag()]);
const modelo = readFileSync(new URL('./pagina.html', import.meta.url), 'utf8');
const saida = modelo.replace('{{DADOS}}', cifrado.toString('base64'));
writeFileSync(new URL('../index.html', import.meta.url), saida, 'utf8');
console.log('index.html:', (Buffer.byteLength(saida) / 1024).toFixed(0), 'KB (apresentação cifrada)');
