# Convite — Luiza & Henrique

Site de casamento em arquivo único (`casamento.html`) mais a pasta `assets/`.
Sem framework, sem build, sem dependência além do Google Fonts. Abre com duplo
clique, sobe em qualquer host estático e entra no Framer sem adaptação.

`index.html` é uma cópia idêntica de `casamento.html` — é o nome que o GitHub
Pages procura. **Ao editar, edite `casamento.html` e depois copie por cima:**

```bash
cp casamento.html index.html
```

## A abertura: o envelope

A primeira dobra não é o site — é um envelope lacrado com laço de cetim e um
lacre de cera com o monograma. O visitante rola, o laço se desfaz, a aba gira,
o cartão sobe de dentro e cresce até virar a tela. Só então o site começa.

A cena é **CSS 3D**, não WebGL. Papel dobrado é plano girando no espaço, que é
exatamente o que `transform-style: preserve-3d` faz — na GPU e com o texto
vetorial. Um engine 3D custaria centenas de KB para reproduzir isso, e o
convite precisa abrir rápido no 4G de quem recebeu o link.

Todo o movimento sai de **um único valor de progresso de 0 a 1**, calculado a
partir do scroll. Cada peça (laço, aba, cartão, escala) lê uma faixa desse
valor. Para mexer no ritmo, ajuste as faixas dentro de `Envelope.atualizar` —
por exemplo, `trecho(p, .26, .52)` é quando a aba gira.

- **Duração da cena** — `.cena-espaco { height }` no CSS: 280vh no desktop,
  220vh no celular. Menos deixa a abertura apressada; mais cansa.
- **Cor da fita** — os gradientes `#cetim` e `#cetim-laco` dentro do SVG do laço.
- **O que está escrito no cartão** — o bloco `.env-cartao` no HTML.

O cartão é papel creme com o monograma, não uma foto cheia. Isso é o que um
convite impresso realmente é, e resolve a transição: cartão e hero enquadram a
ilustração de formas diferentes (no retrato o hero usa outro encaixe), então
arte cheia contra arte cheia deixava o rosto da noiva duplicado no dissolve.
Creme dissolvendo em arte não tem esse problema, em nenhuma proporção de tela.

Quem tem `prefers-reduced-motion` ligado no sistema não vê a cena: ela é
removida e o espaçador zera, entregando o site direto. Sem JavaScript, um
`<noscript>` faz o mesmo — sem isso a cena, que é fixa e opaca, trancaria o
convite.

## Os assets

| Arquivo | O que é | Onde aparece |
|---|---|---|
| `hero-fundo` | a ilustração em aquarela de vocês | fundo da primeira dobra |
| `hero-fundo-sm` | a mesma, em 1100px | fundo no celular (60KB no lugar de 180KB) |
| `flores` | a guirlanda de peônias e rosas (com transparência) | pé do hero e divisores entre seções |
| `logo` | o monograma L&H | preloader, cabeçalho, cartão do envelope e rodapé |
| `foto-serra` | montanhas de Portugal | galeria |
| `foto-gala` | o dia da farda | galeria |
| `foto-castelo` | o castelo, em Paris | galeria |
| `foto-louvre` | o Louvre | galeria |

Cada imagem existe em duas versões: `.webp` (a que os navegadores baixam) e
`.jpg`/`.png` (reserva para navegador antigo). O site pede sempre a WebP e cai
na outra sozinho. **Ao trocar uma foto, gere as duas** — só o `.jpg` não basta,
porque a WebP antiga continuaria sendo servida:

```bash
ffmpeg -i foto-nova.jpg -vf scale=900:-1 -c:v libwebp -quality 78 foto-serra.webp
```

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

- **Primeira dobra** (depois do envelope): no desktop a ilustração preenche a tela (`cover`); no
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

## Peso e desempenho

As imagens somavam 2,5 MB e agora somam 910 KB, com a mesma qualidade. O que
entra antes de qualquer rolagem são só três arquivos: **338 KB no desktop e
218 KB no celular** — as fotos da galeria carregam sob demanda, quando o
visitante chega perto delas.

O que faz isso funcionar, e que vale preservar ao mexer:

- **WebP com reserva.** `<picture>` nas fotos e `image-set()` nos fundos CSS.
- **Versão menor da ilustração no celular.** Uma tela de 375px não precisa de
  uma imagem de 2200px.
- **`loading="lazy"` nas fotos** e `width`/`height` declarados em toda imagem,
  para a página não pular enquanto carrega.
- **Preload do monograma e da guirlanda**, que aparecem antes de tudo.

Uma pegadinha que já custou caro aqui: declarar `width`/`height` no `<img>` e
depois definir só a largura no CSS faz o navegador usar a altura do atributo
como altura fixa, e a imagem estica. Sempre acompanhe de `height:auto`.
