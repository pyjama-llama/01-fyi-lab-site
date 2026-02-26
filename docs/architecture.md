# Architecture

## Directory Layout

```
fyi-lab-react/
├── docs/                  ← You are here
├── public/
│   └── images/            ← Static project images & slider assets
├── src/
│   ├── components/        ← Shared UI components (Header, Footer, cards…)
│   ├── data/
│   │   └── projects.ts    ← Single source of truth for all project data
│   ├── locales/
│   │   ├── en.json        ← English copy
│   │   └── is.json        ← Icelandic copy
│   ├── views/             ← One file per page/route
│   ├── App.tsx            ← Router definition
│   ├── i18n.ts            ← i18next configuration
│   ├── index.css          ← Global CSS (CSS variables, layout classes)
│   └── main.tsx           ← App entry point
└── index.html             ← Root HTML (Google Fonts live here)
```

## Key Components

| File | Role |
|---|---|
| `App.tsx` | Defines all routes (`/`, `/projects`, `/projects/:id`, `/about`, `/writing`, `/zen`) |
| `MainLayout.tsx` | Wraps every page with Header, Footer, and the network background canvas |
| `AnimatedBackground.tsx` | Canvas-based node-network animation. Nodes react to mouse, form geometric shapes |
| `Header.tsx` | Sticky nav with theme toggle and EN/IS language toggle |
| `ProjectCard.tsx` | Reusable card used on both the home feed and the projects page |
| `BeforeAfterSlider.tsx` | Drag-to-compare chart makeover slider |
| `data/projects.ts` | Central project data — add new projects here |

## Routing Map

| Path | View |
|---|---|
| `/` | Home (hero + featured projects + services + slider) |
| `/projects` | Project grid |
| `/projects/:id` | Project detail page |
| `/about` | About |
| `/writing` | Writing (hidden from nav until ready) |
| `/zen` | Zen Garden — meditation timer + ambient audio |

## Internationalization (i18n)

All user-visible strings go through `react-i18next`. 

- English strings: `src/locales/en.json`
- Icelandic strings: `src/locales/is.json`
- Toggle is in the `<Header>` component (EN / IS button)
- Hook: `const { t } = useTranslation();` then `{t('key.name')}`

## CSS System

Global design tokens live as CSS variables in `src/index.css`:

```css
--bg, --surface, --surface-2   /* backgrounds */
--text, --muted                /* typography */
--border, --shadow             /* depth */
--accent, --accent-2           /* interactive elements */
--sans, --mono                 /* typefaces */
--radius, --radius-sm          /* border radii */
--maxw                         /* 1080px container cap */
```

Dark mode is activated by setting `data-theme="dark"` on `<html>`.
