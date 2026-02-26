# Adding Content

## Adding a New Project

All project data lives in **`src/data/projects.ts`**.

1. Open `src/data/projects.ts`
2. Add a new object to the `PROJECTS` array:

```ts
{
  id: 'my-new-project',         // URL slug → /projects/my-new-project
  title: 'My New Project',
  type: 'Dashboard',            // Interactive | Dashboard | Explainer
  tags: ['D3.js'],
  tagline: 'One short line for the card view.',
  description: 'Longer paragraph shown on the detail page.',
  imageSrc: '/images/my-project-thumb.png',
  heroSrc: '/images/my-project-hero.png',  // Optional — falls back to imageSrc
  challenge: 'What was the problem?',
  solution: 'How did you solve it?',
  result: 'What was the measurable outcome?',
  tools: ['React', 'D3.js'],
  externalUrl: 'https://...',   // Optional — shows "View live" button
}
```

3. Drop the image into `public/images/` — no import needed, Vite serves `/public` as `/`.
4. Save — Vite hot-reloads instantly.

The card will appear automatically on the home page and the projects page. The detail page is available at `/projects/my-new-project`.

---

## Adding or Editing Copy (Text)

All text is in `src/locales/en.json` (English) and `src/locales/is.json` (Icelandic).

**Do not hardcode text strings in components.** Always add to the JSON files and use:

```tsx
const { t } = useTranslation();
<p>{t('section.key')}</p>
```

---

## Adding a New Page

1. Create `src/views/MyNewView.tsx`
2. Add the route to `src/App.tsx`:

```tsx
<Route path="my-page" element={<MyNewView />} />
```

3. Optionally add a `<NavLink>` in `src/components/Header.tsx` if it should appear in the navigation.

---

## Updating the Writing Page (Making it Public)

The `/writing` route is live but hidden from the nav. When you're ready:

In `src/components/Header.tsx`, uncomment or add:

```tsx
<NavLink to="/writing" className={...}>
  {t('nav.writing')}
</NavLink>
```
