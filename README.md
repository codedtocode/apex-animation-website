# Apex Animator — Landing page

Landing page do plugin Apex Animator para Roblox Studio. React + Vite + Tailwind CSS v4, só frontend.

## Rodando

```bash
npm install
npm run dev           # http://localhost:5173
npm run build         # gera a versão de produção em dist/
npm run preview       # serve o dist/ localmente
npm run lint          # ESLint
npm run format        # formata tudo com Prettier (inclui a ordem das classes do Tailwind)
npm run format:check  # só verifica a formatação
```

O conteúdo de `dist/` pode ser publicado em qualquer hospedagem estática (Vercel, Netlify, GitHub Pages, Cloudflare Pages).

## Estrutura

```
src/
  data/                textos e conteúdo do site
    site.js            links, versão atual, números (downloads/rating), menu
    features.js        features, tags, marquee, compatibilidade, Native x Engine
    media.js           vídeos e prints do Showcase e do topo da página
    updates.js         timeline e cards da seção Updates
    faq.js             perguntas e respostas
  components/
    layout/            Navbar e Footer
    sections/          uma seção da página por arquivo
    ui/                peças reutilizáveis (botões, vídeo, lightbox, ícones...)
  hooks/               lógica reutilizável (viewport, scroll, tecla Esc, clique em link)
  lib/                 funções utilitárias
  assets/              vídeos convertidos e imagens usadas pelo código
images/                arquivos originais (logos, prints, GIFs)
```

Os imports usam os atalhos `@/` para `src/` e `@images/` para `images/`.

- **Atualizar downloads, rating ou versão:** `src/data/site.js`
- **Cores e fontes:** bloco `@theme` em `src/index.css`

## Vídeos de demonstração

Os GIFs foram convertidos para MP4 em `src/assets/demos/`, que fica muito menor que o GIF. Quando existir uma versão em `images/gifs-hq/`, ela é usada no lugar da de `images/gifs/`. Para adicionar um novo:

```bash
ffmpeg -i images/gifs-hq/NOVO.gif -vf "scale='min(1600,iw)':-2:flags=lanczos,format=yuv420p" \
  -c:v libx264 -preset slow -crf 20 -movflags +faststart -an src/assets/demos/novo.mp4
ffmpeg -ss 1 -i src/assets/demos/novo.mp4 -frames:v 1 -q:v 4 src/assets/demos/novo.jpg
```

Depois importe os dois arquivos em `src/data/media.js`, crie um item em `MEDIA` e coloque-o em uma das linhas de `SHOWCASE_ROWS`. Cada linha se ajusta sozinha para que todos os itens fiquem com a mesma altura, sem cortar nada. O vídeo e o print do topo da página ficam em `HERO_MEDIA`.
