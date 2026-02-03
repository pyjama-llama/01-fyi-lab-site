# FYI Lab — Data Visualization

A clean, responsive portfolio site for FYI Lab, a one‑person data visualization company based in Reykjavík, Iceland.

## Live preview

- **GitHub Pages:** https://pyjama-llama.github.io/01-fyi-lab-site  
  *(Enable via Settings → Pages → Deploy from branch → main → /(root))*

## Features

- **Grey/Dark theme toggle** (persists in `localStorage`)
- **Aurora‑style particle network** with subtle morphing into “FYI” and Iceland outline
- **Mouse‑responsive particles** (attraction/repulsion)
- **Responsive design** (mobile‑friendly)
- **Static site** (no build step; just HTML/CSS/JS)

## Tech

- HTML5, CSS3, vanilla JavaScript
- Canvas API for the background animation
- `prefers-reduced-motion` support

## Local development

Open any HTML file in a browser—no server required.  
For live reload during edits, use any static dev server, e.g.:

```bash
npx serve .
# or
python3 -m http.server 8000
```

## Custom domain (future)

When you’re ready to use a custom domain:

1. In this repo, go to **Settings → Pages → Custom domain**
2. Add your domain (e.g., `fyilab.is`)
3. Configure DNS per GitHub’s instructions (CNAME or A records)
4. GitHub will provision HTTPS automatically

## License

MIT — feel free to use as a starting point for your own portfolio.
