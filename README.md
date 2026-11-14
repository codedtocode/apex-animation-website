# Apex Animator website

The landing page for [Apex Animator](https://create.roblox.com/store/asset/122196150020773/Apex-Animator), a free animation plugin for Roblox Studio with physics, live recording, dynamic rig parenting, face animation, IK/FK and much more.

The site shows the plugin in action, with community animations in the showcase and a demo clip for every feature. It also covers the ApexEngine API, the Apex Themes support perk, the Apex family of plugins and an FAQ.

**Live at [apexanimator.com](https://apexanimator.com)**

## Built with

- [React 19](https://react.dev) and [Vite](https://vite.dev)
- [Tailwind CSS v4](https://tailwindcss.com), with the theme colours and fonts in `src/index.css`
- [Lucide](https://lucide.dev) icons

It is a static site with no backend. The plugin's latest version number is read from the Creator Store through [RoProxy](https://roproxy.com), and every page is a `#hash` on a single HTML file.

## Getting started

You need [Node.js](https://nodejs.org) 20.19 or newer.

```bash
npm install
npm run dev
```

The dev server runs at http://localhost:5173 and reloads as you edit.

## Scripts

| Command                | What it does                                                                   |
| ---------------------- | ------------------------------------------------------------------------------ |
| `npm run dev`          | Starts the dev server with hot reload                                          |
| `npm run build`        | Builds the production site into `dist/`                                        |
| `npm run preview`      | Serves the `dist/` build locally to check it before deploying                  |
| `npm run lint`         | Checks the code with ESLint                                                    |
| `npm run format`       | Formats everything with Prettier, including Tailwind class order               |
| `npm run format:check` | Checks the formatting without changing anything                                |
| `npm run deploy`       | Builds the site and publishes it to GitHub Pages (see [Deploying](#deploying)) |

## Project structure

```
src/
  data/          The site's content: text, links, features and media lists
  components/
    layout/      Navbar, footer and the animated Roblox Studio backdrop
    sections/    One file per page section
    ui/          Shared pieces: buttons, video player, lightbox, pager, icons
  hooks/         Shared behaviour: scroll reveal, swipe, viewport, plugin version
  lib/           Helpers: Lua syntax highlighting, R6 rig, motion settings
  assets/        Encoded clips and images the code imports
images/          Logos and icons the code imports
```

Imports use `@/` for `src/` and `@images/` for `images/`.

## Editing content

| To change                                       | Edit                        |
| ----------------------------------------------- | --------------------------- |
| Links, download count, rating, fallback version | `src/data/site.js`          |
| Features, their tags and details                | `src/data/features.js`      |
| Feature demo clips                              | `src/data/featureClips.js`  |
| Showcase animations and their creators          | `src/data/media.js`         |
| API reference                                   | `src/data/api.js`           |
| FAQ                                             | `src/data/faq.js`           |
| Colours and fonts                               | `@theme` in `src/index.css` |

### Adding a clip

Clips are encoded to MP4 with [FFmpeg](https://ffmpeg.org) and saved next to a JPG poster frame. Both get imported in the matching data file. Keep the raw recordings in `images/features gif/` or `images/showcase others/`, which git ignores, so only the encoded clips are committed.

A feature clip goes in `src/assets/features/` and plays slightly faster than the recording:

```bash
ffmpeg -i recording.mp4 \
  -vf "mpdecimate=max=1,setpts=N/(30*1.2)/TB,fps=30,scale='trunc(min(1600,iw)/2)*2':-2:flags=lanczos,setsar=1,format=yuv420p" \
  -c:v libx264 -preset veryslow -crf 26 -g 90 -movflags +faststart -an src/assets/features/my-clip.mp4
ffmpeg -ss 1 -i src/assets/features/my-clip.mp4 -frames:v 1 -q:v 4 src/assets/features/my-clip.jpg
```

Then add it to `CLIPS` in `src/data/featureClips.js` and to the feature's `clips` in `src/data/features.js`.

A showcase animation goes in `src/assets/demos/` and keeps its real speed. Crop away the Studio interface around the viewport with `crop=width:height:x:y`:

```bash
ffmpeg -i recording.mp4 \
  -vf "crop=1280:564:0:124,scale='trunc(min(1600,iw)/2)*2':-2:flags=lanczos,setsar=1,format=yuv420p" \
  -c:v libx264 -preset slow -crf 24 -g 90 -movflags +faststart -an src/assets/demos/my-animation.mp4
ffmpeg -ss 1 -i src/assets/demos/my-animation.mp4 -frames:v 1 -q:v 4 src/assets/demos/my-animation.jpg
```

Then add it to `COMMUNITY` in `src/data/media.js`, with the creator's name as its `credit`, and place it in one of the `SHOWCASE_ROWS`. Each row sizes its clips so they all share one height. On phones the showcase turns into a swipeable carousel.

## Deploying

The site is hosted on GitHub Pages. `npm run deploy` builds it and pushes `dist/` to the `gh-pages` branch, with a `CNAME` file for `apexanimator.com`.

The first time, set the repository up once:

1. In **Settings → Pages**, set the source to **Deploy from a branch**, then `gh-pages` / `(root)`.
2. Point the domain's DNS at GitHub Pages:

   | Type  | Name  | Value                                                                      |
   | ----- | ----- | -------------------------------------------------------------------------- |
   | A     | `@`   | `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` |
   | CNAME | `www` | `<github-user>.github.io`                                                  |

3. Once GitHub has issued the certificate, tick **Enforce HTTPS**.

Asset paths are relative (`base: './'` in `vite.config.js`), so the same build also works from the repository's `github.io` address.
