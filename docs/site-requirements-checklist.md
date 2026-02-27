# Website Launch Requirements Checklist

*This document outlines the standard legal, operational, and user-facing documents your domain (`fyilab.is`) should have configured before or shortly after launching publicly, especially considering operations in Iceland/Europe (GDPR compliance).*

## Legal & Compliance

- [ ] **Privacy Policy (`/privacy`)**
  - **Why you need it:** Required by GDPR if you collect any analytics, use tracking cookies, or simply provide a contact email. 
  - **What it needs:** State what data you collect (even if it's just basic analytics), what you use it for, and who you share it with (e.g., Vercel logging, Google Analytics).

- [ ] **Terms of Service (`/terms`)** 
  - **Why you need it:** Protects your intellectual property (the charts, images, and content you display) and limits your liability if someone misinterprets your data dashboards or exploratory analyses.
  - **What it needs:** A disclaimer that the case studies are for portfolio purposes and a copyright notice.

- [ ] **Cookie Consent Banner**
  - **Why you need it:** If you add Google Analytics, Vercel Web Analytics, or any tracking pixel, EU law requires a banner asking for user consent *before* the cookies drop.
  - **What it needs:** A simple "Accept/Reject" banner component. If you use strictly necessary/anonymous tracking (like Plausible Analytics), you might be able to skip the banner entirely.

## Operational & User Trust

- [ ] **Open Source Attribution / LICENSES**
  - **Why you need it:** You use React, Framer Motion, D3.js, and other open-source libraries. While most are MIT-licensed (requiring no public attribution on the UI), it is good practice to include a generic copyright/license notice in your compiled build or a small note in the footer.
  - **What it needs:** A simple "Built with React and D3" in the about page handles this gracefully.

- [ ] **Accessibility (a11y) Statement**
  - **Why you need it:** Building public-facing dashboards often requires meeting WCAG (Web Content Accessibility Guidelines). Having a statement shows you take accessibility seriously.
  - **What it needs:** A short paragraph on the `/about` page detailing your commitment to contrast ratios, alt-text (which you are already using!), and accessible charts.

## Infrastructure & Hosting Docs

- [ ] **Deployment Instructions (`docs/deployment.md`)**
  - **Why you need it:** If you ever need to move hosts or if disaster strikes.
  - **What it needs:** The exact environment variables, node version, and build commands (`npm run build`) required to deploy the Vite SPA.

- [ ] **Architectural Decision Records (ADRs) (`docs/architecture/`)**
  - **Why you need it:** To remember *why* you made certain technical choices a year from now.
  - **What it needs:** Simply write down why you chose Vite over Next.js, or why you chose a static `projects.ts` file instead of a headless CMS.
