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

## 2. Gather The Visuals (The Golden Rule Workflow)

To keep the website repository lightweight and fast, **never bulk-drop your raw or working files directly into the React codebase.** Instead, follow this exact workflow:

1. **Establish a Master Folder (Outside the Codebase):**
   Keep all your high-res originals, working files, and dozens of screenshots in a completely separate folder on your hard drive (e.g., `02_victor_images.../[project-name]/`). Keep this messy.
2. **Curate and Rename:**
   Review your master folder and select *only* the final, polished images you actually want to display on the live site. Rename them cleanly (e.g., `01_overview.png`, `02_house_effects.png`).
3. **Copy to Production:**
   Copy *only* those final, curated images into the actual React repository: 
   `fyi-lab-react/public/images/projects/[project-name]/`

**What kind of images do you need?**
- **Hero Image (Required):** A high-res, clean screenshot of the final product to use as the main card image.
- **Detail Shots:** Zoomed-in shots of interesting charts, tooltips, or UI elements.
- **Before/After (Highly Recommended):** If you improved an existing messy spreadsheet or dashboard, grab a "before" screenshot so we can put it in the interactive slider!

## 3. Handoff to Me
Once you have the text drafted in your notes and the images saved, simply tell me: *"I've got the assets for [Project Name] ready."* 

I will then take over and:
1. Wire up the data in `src/data/projects.ts`.
2. Automatically generate the new `/projects/[id]` route.
3. Build out any custom layout blocks (like the before/after slider or embedded interactive charts) specifically for that project.

## 4. Version Control (Strict Branching)
- **Do not work on the `main` branch.** All changes (code, copy, or UI) must be executed on a dedicated feature branch (e.g., `feature/add-project-name`).
- AI agents are explicitly forbidden from pushing directly to the `main` branch remotely.
- Agents must push the feature branch to GitHub, then notify the user. **Only the user** has the final authority to merge changes into the `main` branch to ensure absolute stability of the live site.
