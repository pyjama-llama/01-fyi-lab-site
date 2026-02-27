# How To Update Projects

All project information on the FYI Lab website lives in a single, perfectly structured data file. 

Whenever you want to update a project, add a new one, or rewrite the copy, you **do not** need to edit the website's layout components. You just need to update the data file, and the site will rebuild itself around your content.

## Section 1: Where the data lives
Open this file in your code editor:
`src/data/projects.ts`

Inside, you will see an array called `PROJECTS`. Every object inside that array is a full case study on your website.

---

## Section 2: Adding longer text or paragraphs to charts
Right now, your charts have a single `caption` string.

If you want to write a longer, multi-paragraph explanation (like a mini-essay) under a specific chart, you can use **markdown formatting** inside that string, or just use standard HTML tags. React will render basic string text, but if you want real paragraphs and line breaks, the cleanest way is often HTML.

### Example: How to format long text in your charts
Find the `charts` array for your project in `src/data/projects.ts` and format it like this:

```typescript
charts: [
    {
        title: 'Animated & Interactive Chord Diagram',
        caption: 'Shows party retention rates and how they would vote today vs last election. <br/><br/> This is a highly interactive chart where users can hover over individual chords to see the exact migration numbers between, for example, the Independence Party and the Pirate Party. <br/><br/> We built this because standard flow diagrams were too messy to read.',
        imageSrc: '/images/projects/project-1/07_chord.png'
    }
]
```
*(Notice the `<br/><br/>` tags. These will create proper paragraph breaks when the site renders!)*

---

## Section 3: How to add a completely new project
1. Upload your new images to `public/images/projects/[your-new-project-name]/`
2. Open `src/data/projects.ts`
3. Scroll to the bottom of the `PROJECTS` array.
4. Add a new object following the exact same structure as the others.

**Here is the blank template you can copy/paste into `projects.ts`:**

```typescript
{
    id: 'my-new-project', // MUST BE UNIQUE! This becomes the URL (fyilab.is/projects/my-new-project)
    title: 'The Project Title',
    type: 'Interactive', // e.g., Dashboard, Explainer, Print
    tags: ['React', 'D3.js'],
    tagline: 'A punchy one sentence description for the cards.',
    description: 'The longer paragraph that shows up at the very top of the project detail page. This is your hook.',
    imageSrc: '/images/projects/my-new-project/thumbnail.png',
    challenge: 'What was the core problem your client was facing?',
    solution: 'How did you solve it technically and visually?',
    result: 'What was the business or human impact? (e.g. 99% reduction in cognitive load)',
    tools: ['React', 'Python', 'Figma'],
    externalUrl: undefined, // Or put a real link here like 'https://live-site.com'
    
    // THE CUSTOM CHARTS
    charts: [
        {
            title: 'Chart 1 Title',
            caption: 'Explain what is happening here.',
            imageSrc: '/images/projects/my-new-project/chart-1.png'
        }
    ],

    // THE BEFORE & AFTER SLIDERS
    makeovers: [
        {
            beforeImage: '/images/projects/my-new-project/messy-old.png',
            afterImage: '/images/projects/my-new-project/clean-new.png',
            beforeLabel: 'Before: Impossible to read.',
            afterLabel: 'After: Clear focus.',
            result: 'Users found what they needed 10x faster.'
        }
    ]
}
```
If you don't have makeovers or custom charts for a specific project, you can just delete the `makeovers:` or `charts:` arrays from that specific object!
