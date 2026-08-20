# Convite — Luiza & Henrique

Site de casamento em arquivo único (`casamento.html`) mais a pasta `assets/`.
Sem framework, sem build, sem dependência além do Google Fonts. Abre com duplo
clique, sobe em qualquer host estático e entra no Framer sem adaptação.

`index.html` é uma cópia idêntica de `casamento.html` — é o nome que o GitHub
Pages procura. **Ao editar, edite `casamento.html` e depois copie por cima:**

```bash
cp casamento.html index.html
```

## Os assets

| Arquivo | O que é | Onde aparece |
|---|---|---|
| `assets/hero-fundo.jpg` | a ilustração em aquarela de vocês | fundo da primeira dobra |
| `assets/flores.png` | a guirlanda de peônias e rosas (com transparência) | pé do hero e divisores entre seções |
| `assets/logo.png` | o monograma L&H | preloader, cabeçalho e rodapé |
| `assets/foto-serra.jpg` | montanhas de Portugal | galeria |
| `assets/foto-gala.jpg` | o dia da farda | galeria |
| `assets/foto-castelo.jpg` | o castelo, em Paris | galeria |
| `assets/foto-louvre.jpg` | o Louvre | galeria |

Para trocar qualquer imagem, substitua o arquivo mantendo o mesmo nome — o site
não precisa de nenhuma alteração. As fotos foram reduzidas para 1100px de
largura; se colocar originais de celular direto, a página fica pesada.

## Editar o texto

Tudo que muda de casamento para casamento está marcado com `✎ EDITE` no arquivo.

- **Nomes, história, endereços, horários** — direto no HTML, em português.
- **Data da contagem regressiva e música** — no objeto `CONFIG`, no começo do
  `<script>`.
- **Cores** — as variáveis no `:root`. `--paper` (`#FCF1DF`) foi amostrado da
  própria ilustração para o fundo da página emendar com a arte sem costura
  visível; `--brown` (`#573B25`) é o marrom do monograma e carrega todos os
  títulos.

### Música

`CONFIG.MUSICA_URL` vazio = trilha ambiente sintetizada pelo próprio navegador
(pad grave em Fá e arpejo pentatônico com reverb). Zero arquivo para hospedar.

Para usar uma música sua, coloque a URL de um `.mp3`:

```js
MUSICA_URL: "https://seu-dominio.com/trilha.mp3"
```

Nenhum navegador deixa áudio começar sozinho. O site tenta tocar no fim do
preload e, se for bloqueado, arma a trilha para entrar no primeiro toque,
clique ou scroll do visitante — sem pedir nada a ele. O botão no topo direito
liga e desliga a qualquer momento.

## Publicar

O repositório já está no GitHub Pages. Depois de editar:

```bash
cp casamento.html index.html && git add -A && git commit -m "ajustes" && git push
```

O Pages republica sozinho em cerca de um minuto.

## Usar no Framer

**Opção 1 — embutir a URL publicada (recomendada).**
No Framer: `Insert → Embed → URL` e cole o endereço do GitHub Pages. Ou use o
componente pronto em `framer/ConviteEmbed.tsx` (`Insert → Code → New
Component`), que já passa `allow="autoplay"` para o iframe.

**Importante:** deixe o frame do Framer com altura fixa de 100vh e
`Overflow: hidden`. Senão o visitante rola duas coisas ao mesmo tempo — a
página do Framer e o convite dentro dela.

**Opção 2 — colar o HTML.** `Insert → Embed → HTML` e cole o arquivo. Funciona,
mas as imagens precisam virar URLs absolutas e a edição fica desconfortável.

## Detalhes que valem saber

- **Primeira dobra**: no desktop a ilustração preenche a tela (`cover`); no
  celular ela encaixa pela largura e ancora no topo, porque a arte é apaisada e
  um `cover` em tela estreita cortaria justamente o casal. A guirlanda é
  sobreposta ao pé do hero, então a moldura floral existe em qualquer proporção
  de tela mesmo quando o corte come as faixas da própria ilustração.
- **Scroll suave**: o `<body>` mantém a altura real do conteúdo e a `#scroll` é
  interpolada por trás. Barra de rolagem, teclado e âncoras seguem funcionando.
  Em telas de toque o scroll nativo assume, porque transform interpolado
  engasga no celular.
- **Acessibilidade**: `prefers-reduced-motion` desliga pétalas, preloader
  longo e scroll interpolado, e entrega o conteúdo estático. Foco visível em
  todos os controles, e toda imagem tem texto alternativo.
- **Fontes**: Great Vibes (nomes e títulos), Cormorant Garamond (subtítulos e
  etiquetas), EB Garamond (corpo). Todas com fallback para Georgia.

## Arquivos

```
casamento.html   o site (edite aqui)
index.html       cópia para o GitHub Pages
assets/          ilustração, guirlanda, monograma e fotos
framer/          componente de embed para o Framer
LEIA-ME.md       este arquivo
```
