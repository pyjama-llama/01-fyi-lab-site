// Central project data model — single source of truth.
// ProjectCard and ProjectDetailView both read from this list.

export interface Project {
    id: string;
    title: string;
    type: string;
    tags: string[];
    tagline: string;           // One-liner for cards
    description: string;       // Longer paragraph for detail page
    imageSrc: string;          // Card thumbnail
    heroSrc?: string;          // Full-width hero (falls back to imageSrc)
    challenge: string;
    solution: string;
    result: string;
    tools: string[];
    externalUrl?: string;      // Link to live project, if applicable
}

export const PROJECTS: Project[] = [
    {
        id: 'climate-explorer',
        title: 'Climate Indicators Explorer',
        type: 'Interactive',
        tags: ['Observable / D3'],
        tagline: 'A fast, readable interface for exploring indicators over time with annotations and small multiples.',
        description:
            'An interactive data explorer letting users navigate hundreds of climate metrics across time and geography. Built for a regional research institute that needed its internal data to be accessible to non-specialist policymakers.',
        imageSrc: '/images/climate-indicators-explorer.png',
        challenge:
            'The raw dataset contained 300+ indicators from 40 countries, updated quarterly. Existing tools (Excel, Power BI) required significant training and produced charts that were inconsistent and hard to share.',
        solution:
            'Built a responsive Observable notebook converted to a standalone React wrapper. Used D3 for rendering with React state for filters. Annotations are stored as a separate JSON layer so researchers can annotate data points without touching code.',
        result:
            'Adopted by three government departments and embedded in two public-facing reports. Time to generate a standard indicator chart dropped from ~45 minutes to under 30 seconds.',
        tools: ['Observable', 'D3.js', 'React', 'Python (data prep)'],
        externalUrl: undefined,
    },
    {
        id: 'performance-dashboard',
        title: 'Performance Monitoring Dashboard',
        type: 'Dashboard',
        tags: ['React / D3'],
        tagline: 'Real-time system health with automated alerts and historical trend analysis.',
        description:
            'A production monitoring dashboard replacing a fragmented tool stack (Grafana + spreadsheets + weekly email summaries) with a single, purpose-built interface designed around how the operations team actually thinks about system health.',
        imageSrc: '/images/performance-dashboard.png',
        challenge:
            'The team was managing 12+ separate Grafana dashboards and struggling to get a holistic picture within a 30-minute incident window. Alert fatigue was high because the thresholds were not contextual.',
        solution:
            'Designed the information architecture around three questions: Is everything OK right now? What changed in the last 24h? What is the trend over the last 30 days? Each layer only shows what matters at that time scale.',
        result:
            'Mean time to resolution (MTTR) for P1 incidents dropped 40%. The team decommissioned 9 of 12 legacy dashboards within the first quarter.',
        tools: ['React', 'D3.js', 'WebSockets', 'PostgreSQL'],
        externalUrl: undefined,
    },
    {
        id: 'distribution-explainer',
        title: 'What the Distribution Hides',
        type: 'Explainer',
        tags: ['D3 / Static'],
        tagline: 'An annotated visual essay showing how aggregate statistics conceal structural inequalities.',
        description:
            'A long-form visual explainer commissioned for an internal leadership offsite. The goal was to make a statistical argument — that average-based reporting masks significant within-group variance — legible to a non-quantitative executive audience.',
        imageSrc: '/images/distribution-explainer.png',
        challenge:
            'Previous internal analysis had shown the problem clearly in data, but the leadership team was not acting. The barrier was comprehension, not access — the charts required prior statistical knowledge to interpret correctly.',
        solution:
            'Rebuilt the argument as a scrollytelling narrative using D3 and step-triggered animations. Each transition in the chart was designed to answer one question before raising the next, moving from aggregates to distributions to individual stories.',
        result:
            'The piece was used in three consecutive quarterly reviews. Two structural reporting changes were implemented directly as a result of the insights it surfaced.',
        tools: ['D3.js', 'Scrollama', 'Python (data)'],
        externalUrl: undefined,
    },
];
