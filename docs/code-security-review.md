# Code & Security Review: FYI Lab Website

**Date of Audit:** $(date +%F)
**Stack:** React 19, Vite, TypeScript, Framer Motion, React Router DOM v7

## Architecture Overview
The FYI Lab website is built as a static Single Page Application (SPA). It does not currently utilize a backend server, database, or authentication system. All project data is stored statically within the repository (`src/data/projects.ts`). 

Because there is no backend surface area, the risk profile of this application is extremely low. Moving forward, the primary security concerns revolve around client-side vulnerabilities, dependency supply chain, and deployment configuration.

---

## 1. Security Analysis

### Cross-Site Scripting (XSS)
- **Status:** **Low Risk (Controlled)**
- **Finding:** The application uses React's `dangerouslySetInnerHTML` in two places:
    1. Parsing HTML tags in the Hero subtitle (`HomeView.tsx`).
    2. Rendering custom HTML paragraphs in chart captions (`ProjectDetailView.tsx`).
- **Mitigation:** Currently, all data fed into these dangerously set HTML blocks comes from static, hardcoded files (`projects.ts` and `en.json`) that are only editable by the repository owner. There are no user inputs (e.g., comments, forms) that are rendered to the screen. 
- **Action Item:** If you ever introduce a CMS (Content Management System) or external database to power the `projects.ts` file, you *must* sanitize the incoming HTML payloads using a library like `DOMPurify` before passing it to `dangerouslySetInnerHTML`.

### Dependency Supply Chain
- **Status:** **Healthy**
- **Finding:** The project uses modern, standard packages (`react`, `framer-motion`, `react-router-dom`). The `package-lock.json` secures exact versions.
- **Action Item:** Run `npm audit` monthly to check for known vulnerabilities in downstream node modules. Set up GitHub Dependabot to automate this.

### Client-Side Routing
- **Status:** **Secure**
- **Finding:** React Router is handling all URL slugs cleanly. If a user navigates to a project ID that doesn't exist (e.g., `/projects/does-not-exist`), the `Navigate` component correctly intercepts and redirects them back to `/projects` instead of throwing an unhandled error.

---

## 2. Code Quality & Performance

### Image Staging and Optimization
- **Status:** **Excellent Workflow Established**
- **Finding:** By adhering to the workflow established in `project-workflow.md` (curating images before committing them to `/public`), the repository size remains incredibly lean.
- **Action Item:** To further optimize page load times, consider running final `.png` assets through an optimizer like ImageOptim, or convert them to modern `.webp` formats before committing.

### Type Safety
- **Status:** **Strong**
- **Finding:** The `projects.ts` data structure implements a strictly typed `Project` interface. This ensures that properties like `externalUrl` or `charts` cannot break the UI with malformed data.
- **Action Item:** As the application grows, consider extracting the `Project` interface into a dedicated `/types/index.ts` file for broader reusability across components.

### Component Reusability
- **Status:** **Good**
- **Finding:** Core UI elements (`ProjectCard`, `BeforeAfterSlider`) are nicely decoupled. 
- **Action Item:** The `dangerouslySetInnerHTML` pattern could be wrapped into a reusable `<RichText content={string} />` component to centralize the XSS oversight.

---

## Deployment Recommendations (Vercel / Netlify)

When deploying this static bundle, ensure the host is configured to send the following HTTP Security Headers:

1. **Strict-Transport-Security (HSTS):** Enforces HTTPS connections.
2. **X-Frame-Options: DENY:** Prevents Clickjacking (disallows FYI Lab from being embedded in an iframe on another site).
3. **X-Content-Type-Options: nosniff:** Prevents MIME-type sniffing.
4. **Referrer-Policy: strict-origin-when-cross-origin:** Protects URL privacy.
