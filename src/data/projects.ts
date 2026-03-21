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
    charts?: { title: string, caption: string, imageSrc: string }[]; // Custom charts for detail view
    makeovers?: {
        beforeImage: string,
        afterImage: string,
        beforeLabel: string,
        afterLabel: string,
        result: string
    }[]; // Interactive before/after sliders
}

export const PROJECTS: Project[] = [
    {
        id: 'the-voting-booth',
        title: 'The Voting Booth (Kjörklefinn)',
        type: 'Interactive',
        tags: ['React', 'D3.js', 'R'],
        tagline: 'Making election polling data accessible to everyone.',
        description:
            'A volunteer project for the people of Iceland, including the blind and seeing disabled. Existing polling visualizations were poor at communicating their message, especially for people with ADHD as the high cognitive load is hard to handle. I built an entire menu of visual delicacies that should satisfy everyone’s appetite.',
        imageSrc: '/images/projects/project-1/01_overview.png',
        challenge:
            'Existing polling visualizations are poor at communicating their message. Especially for people with ADHD as the high cognitive load is hard to handle.',
        solution:
            'I built an entire menu of visual delicacies that should satisfy everyone’s appetite. I\'ve animated the charts to make them more engaging and easier to understand. I\'ve also added a lot of interactivity. I\'ve strived to make the charts ARIA web content accessible, even adding a button for audio frequencies reflecting the data.',
        result:
            'An accessible, highly interactive suite of visualizations bridging the gap between raw polling data and public understanding.',
        tools: ['React', 'D3.js', 'R'],
        externalUrl: 'https://kjorklefinn.is',
        charts: [
            {
                title: 'Overview',
                caption: 'Animated election polling data overview.',
                imageSrc: '/images/projects/project-1/01_overview.png'
            },
            {
                title: 'Coalition % following over time',
                caption: 'On the interactive website, users can select different coalitions and see how they are polling over time.',
                imageSrc: '/images/projects/project-1/02_coalition_viability.png'
            },
            {
                title: 'Visualizing Coalition Viability',
                caption: 'An award winning plot for visualizing sets, different coalitions, and their intersections. UpSet, a popular data visualization technique for displaying intersecting sets, was awarded the IEEE InfoVis 10-year Test of Time Award in 2024.',
                imageSrc: '/images/projects/project-1/03_upset_plot_coaltion.png'
            },
            {
                title: 'Animated Loess smoothing of different election polls',
                caption: 'Loess is a way to show you the direction a bunch of data is trending. (It\'s a non-parametric method for smoothing data).',
                imageSrc: '/images/projects/project-1/04_loess_animated.png'
            },
            {
                title: 'Polling data bias analysis (aka the "House Effect")',
                caption: 'The Independence party consistently polls higher with Gallup than with other pollsters, whereas they have Liberal Reform lower than other pollsters.',
                imageSrc: '/images/projects/project-1/05_house_effect_box_plot.png'
            },
            {
                title: 'House Effect Small Multiples',
                caption: 'Seeing how different pollsters poll political parties over time.',
                imageSrc: '/images/projects/project-1/06_house_effects_small_multiples.png'
            },
            {
                title: 'Animated & Interactive Chord Diagram',
                caption: 'Shows party retention rates and how they would vote today vs last election. This is a fun chart.',
                imageSrc: '/images/projects/project-1/07_chord.png'
            },
            {
                title: 'Variance heatmap by party and demographic',
                caption: 'We look at the party\'s average vote and compare it to the % vote in that demographic, to show over vs under indexed. This table of table heatmap is great for quickly seeing where you are performing well or poorly.',
                imageSrc: '/images/projects/project-1/09_heatmap_frávik.png'
            }
        ],
        makeovers: [
            {
                beforeImage: '/images/projects/project-1/11_before_demographics_maskina.png',
                afterImage: '/images/projects/project-1/14_demographics_two_party.png',
                beforeLabel: 'Before: Difficult to understand what the chart is saying',
                afterLabel: 'After: Easy to have a conversation with the chart',
                result: '95% reduction in cognitive load. People can now have a conversation with the chart instead of struggling to understand it. Tested well with people with ADHD because the chart wasn\'t overwhelming / yelling at the user all at once.'
            },
            {
                beforeImage: '/images/projects/project-1/13_gallup_fylgi_flokka.png',
                afterImage: '/images/projects/project-1/15_fylgi_flokka.png',
                beforeLabel: 'Before: Rotated date labels and legend far away from the data',
                afterLabel: 'After: Legend close to the data and proper date labels',
                result: '99% reduction in cognitive load. Performed test using before and after chart, asking users to "find the latest poll for each party, arrange it in descending order of support".'
            }
        ]
    },
    {
        id: 'epstein-forensic',
        title: 'Epstein Network — Forensic Financial Analysis',
        type: 'Interactive',
        tags: ['D3.js', 'Vite', 'Network Graph'],
        tagline: 'An interactive forensic financial network graph mapping $557M in documented wire transfers.',
        description: 'An interactive forensic financial network graph mapping $557,952,981 in documented wire transfers across 141 entities and 382 transactions (2009–2019) connected to the Jeffrey Epstein financial network. The forensic financial data and analysis were produced by R.S. Taylor.',
        imageSrc: '/images/projects/epstein-forensic/01_overview.png',
        challenge: 'Visualizing a highly complex and sensitive financial network comprising hundreds of transactions and entities over a decade to allow for forensic analysis.',
        solution: 'Built an interactive network visualization with interactive zooming, filtering, and entity search capabilities to explore the money flow transparently.',
        result: 'A performant and accessible investigative tool that makes half a billion dollars of complex wire transfers explorable.',
        tools: ['D3.js', 'Fuse.js', 'Vite', 'React'],
        externalUrl: 'https://pyjama-llama.github.io/epstein-network-financial-forensic-dashboard/index.html',
        charts: [
            {
                title: 'Forensic Network Overview',
                caption: 'An interactive mapping of $557,952,981 in documented wire transfers across 141 entities and 382 transactions between 2009 and 2019.',
                imageSrc: '/images/projects/epstein-forensic/01_overview.png'
            },
            {
                title: 'Transaction Entity Analysis',
                caption: 'Tracking the flow and volume of transactions across the network\'s most heavily utilized financial nodes over time.',
                imageSrc: '/images/projects/epstein-forensic/02_small_multiples.png'
            }
        ]
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
    }
];
