# Deployment & GitHub

## First-Time GitHub Setup

```bash
# 1. Create a repo on github.com (empty, no README)
# 2. Then in this folder:

cd /Users/victorb/Documents/17_fyi-lab-site/fyi-lab-react

git init
git add .
git commit -m "initial: react + vite fyi lab site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your GitHub details.

---

## Day-to-Day Workflow

```bash
# After making changes:
git add .
git commit -m "describe what you changed"
git push
```

---

## Recommended Hosting: Vercel (Free)

Vercel is the simplest way to deploy this React + Vite app.

```bash
npm install -g vercel
vercel        # Follow the prompts — pick your GitHub repo
```

Or go to [vercel.com](https://vercel.com) → "Add New Project" → import from GitHub.

**Vercel auto-detects Vite** — no config needed. Every `git push` to `main` triggers a new deploy automatically.

> **SPA Routing note:** Add a `vercel.json` in the project root so direct `/projects/id` links don't 404:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

---

## Alternative: Netlify

```bash
npm run build          # Creates dist/
# Upload dist/ to netlify.com via drag-and-drop
```

For continuous deploy, connect your GitHub repo from the Netlify dashboard.
Add a `_redirects` file in `public/`:
```
/*  /index.html  200
```

---

## Environment Variables

Currently there are none. If you add a contact form via Resend, create a `.env` file:

```
VITE_RESEND_API_KEY=re_xxxxxxxxxxxxxxxx
```

Add `.env` to `.gitignore` — it is already ignored by default.
