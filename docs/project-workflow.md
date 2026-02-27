# Project Content Workflow

To get your projects added to the site efficiently and with maximum impact, follow this streamlined workflow for gathering your assets.

## 1. Gather The Text (The Story)
Rather than writing an academic summary, focus on the narrative. Open `docs/website-copy.md` and draft a new block answering these core questions:

- **Title:** The name of the project.
- **Tagline:** A punchy one-liner (e.g., "Mapping global shipping routes").
- **The Problem:** What was the client/user struggling with? (e.g., "The board couldn't understand the Excel dumps.")
- **The Solution:** What did you build? How did it solve the problem?
- **The Impact:** What was the result? (e.g., "Reduced reporting time by 10 hours a week").
- **The Tech (Optional):** Tools used (React, D3, Python, etc.).

## 2. Gather The Visuals
Visuals are the most important part of a data visualization portfolio. Gather 2-4 high-quality assets and place them in the `public/images/` folder:

- **Hero Image (Required):** A high-res, clean screenshot of the final product to use as the main card image.
- **Detail Shots:** 1-2 zoomed-in shots of interesting charts, tooltips, or UI elements.
- **Before/After (Highly Recommended):** If you improved an existing messy spreadsheet or dashboard, grab a "before" screenshot. We can put it in the interactive slider!
- **GIFs/Videos (Optional):** If the project is highly interactive, take a short 5-10 second screen recording (mp4 or gif) showing the hover effects or animations.

## 3. Handoff to Me
Once you have the text drafted in your notes and the images saved, simply tell me: *"I've got the assets for [Project Name] ready."* 

I will then take over and:
1. Wire up the data in `src/data/projects.ts`.
2. Automatically generate the new `/projects/[id]` route.
3. Build out any custom layout blocks (like the before/after slider or embedded interactive charts) specifically for that project.
