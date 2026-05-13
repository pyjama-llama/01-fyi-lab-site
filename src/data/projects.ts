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
    fallbackImageSrc?: string; // Fallback image for video thumbnails (.mp4/.webm)
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
    deconstruction?: {
        feature: string,
        problem: string,
        solution: string
    }[]; // Table for "Lab" projects deconstructing bad charts
}

export const PROJECTS: Project[] = [
    {
        id: 'sveitakosningar-2026',
        title: 'Borgarstjórnarkosningar 2026',
        type: 'Interactive',
        tags: ['D3.js', 'Vanilla JS', 'Scrollytelling'],
        tagline: 'Hvaðan kemur fylgið? A visual breakdown of voter flow.',
        description: 'An interactive scrollytelling chord diagram tracking voter intent from the 2022 Reykjavík city elections. It visualizes the flow of voters between different political parties over a 4-year period.',
        imageSrc: '/images/projects/3-borgarstjornkosningar-2026/02_welcome_page.png',
        challenge: 'Tracking complex voter shifts between 9 political parties over 4 years without overwhelming the reader.',
        solution: 'A scrollytelling chord diagram that guides the user step-by-step through the major political shifts before showing the final complex voter flow.',
        result: 'A highly engaging editorial piece that makes a complex matrix of voter transitions immediately legible.',
        tools: ['D3.js', 'Vanilla JS', 'Scrollama'],
        externalUrl: 'https://borgarstjornarkosningar-2026.fyi-lab.is',
        charts: [
            {
                title: 'Hvaðan kemur fylgið?',
                caption: 'The final interactive chord diagram showing all voter transitions between 2022 and 2026.',
                imageSrc: '/images/projects/3-borgarstjornkosningar-2026/01_chord_hverjir_halda.png'
            }
        ]
    },
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
        id: 'upset-plot-analysis',
        title: 'Visualizing Coalition Viability (UpSet Plot)',
        type: 'Chart Deep Dive',
        tags: ['React', 'D3.js', 'Dataviz Theory'],
        tagline: 'Why traditional Venn diagrams fail, and how UpSet plots solve the problem.',
        description: 'During the Kjörklefinn project, I needed to show voters how different political coalitions overlap. Traditional Venn diagrams become an illegible mess with more than three sets. To solve this, I implemented an UpSet plot—a visualization technique specifically designed for complex intersections.',
        imageSrc: '/images/projects/project-1/03_upset_plot_coaltion.png', // Assuming user will drop the Kjörklefinn image here
        challenge: 'Visualizing the intersecting possibilities of a 9-party political system where voters need to see exactly which combinations of parties can form a majority government.',
        solution: 'I built an interactive UpSet plot. Instead of overlapping circles, it uses a matrix of dots to show exactly which parties are involved in a coalition, paired with a bar chart showing their combined polling strength.',
        result: 'The visualization was so effective at handling complexity that UpSet plots (the underlying technique) were awarded the IEEE InfoVis 10-year Test of Time Award in 2024. It completely eliminated the cognitive overload of traditional set visualization.',
        tools: ['D3.js', 'React', 'UpSet Theory'],
        externalUrl: 'https://kjorklefinn.is',
    },
    {
        id: 'animated-loess-smoothing',
        title: 'Animated Loess Smoothing',
        type: 'Chart Deep Dive',
        tags: ['D3.js', 'Animation', 'Statistics'],
        tagline: 'Cutting through the noise of daily polling data with non-parametric smoothing.',
        description: 'Raw polling data is incredibly noisy. If a party drops 1% in a single poll, the press often reports it as a crisis. To counteract this narrative whiplash for the Kjörklefinn project, I implemented an animated Loess (Locally Estimated Scatterplot Smoothing) curve.',
        imageSrc: '/images/projects/project-1/04_loess_animated.mp4', 
        fallbackImageSrc: '/images/projects/project-1/04_loess_animated.png',
        challenge: 'The general public struggles to separate statistically significant trends from daily polling noise, leading to false narratives and confusion.',
        solution: 'I used Loess to draw a trendline that heavily weights recent, local data points while ignoring extreme outliers. To make this statistical concept approachable, I animated the curve drawing itself over the raw data points.',
        result: 'The animation instantly communicates direction and momentum without requiring the viewer to understand the underlying math. It prevents viewers from hyper-fixating on single, anomalous polls.',
        tools: ['D3.js', 'R (for initial algorithm)', 'React'],
        externalUrl: 'https://kjorklefinn.is',
    },
    {
        id: 'house-effects-small-multiples',
        title: 'What the Aggregate Hides (House Effects)',
        type: 'Explainer',
        tags: ['D3.js', 'Data Bias', 'Small Multiples'],
        tagline: 'An annotated visual essay showing how aggregate statistics conceal structural polling bias.',
        description: 'A long-form visual explainer commissioned to highlight "House Effects"—the consistent statistical bias different polling companies have toward specific parties. The goal was to make this statistical argument legible to a non-quantitative public audience.',
        imageSrc: '/images/projects/project-1/06_house_effects_small_multiples.png',
        challenge: 'Previous aggregate analysis tracked the problem clearly in data, but the public barrier was comprehension, not access — traditional error margins required prior statistical knowledge to interpret correctly.',
        solution: 'Rebuilt the argument using a "Small Multiples" approach. By splitting the pollsters into their own individual, identical mini-charts, the structural polling biases became instantly apparent without requiring any statistical training.',
        result: 'The visualization successfully educated viewers on why different polls from the exact same week showed wildly varying results, increasing overall data literacy surrounding the election cycle.',
        tools: ['D3.js', 'Python (data)'],
        externalUrl: 'https://kjorklefinn.is',
    },
    {
        id: 'landsbanki-forecast-remake',
        title: 'Landsbanki Forecast Remake',
        type: 'Laboratory Experiment',
        tags: ['R', 'ggplot2', 'Financial Dataviz', 'Lab'],
        tagline: 'Laboratory Work: Snapshot deconstruction of corporate financial reporting.',
        description: 'A laboratory case study remaking a "Forecast vs. Actuals" snapshot from a standard banking report. This experiment focuses on "After vs. Before" deconstruction—prioritizing legibility, horizontal label orientation, and high-contrast accessibility over traditional corporate aesthetics.',
        imageSrc: '/images/projects/4-Landsbanki-data-remixes/actuals_vs_forecast_2026-05-08_12-47.png',
        challenge: 'The original chart suffered from "Confused Puppy" syndrome due to diagonal category labels, making it physically taxing to read. Additionally, low-contrast colors (dark blue and yellow) made it difficult to quickly distinguish between forecast cycles.',
        solution: 'I rebuilt the chart in R using a dumbbell/dot plot style. I flipped the orientation to horizontal for instant readability, used a high-contrast palette, and applied editorialized headlines to communicate insights rather than just describing the data.',
        result: 'A significantly more accessible and editorialized visualization that communicates the "So what?" immediately, without requiring the reader to tilt their head or struggle with color differentiation.',
        tools: ['R', 'ggplot2', 'Quarto', 'Patchwork'],
        makeovers: [
            {
                afterImage: '/images/projects/4-Landsbanki-data-remixes/actuals_vs_forecast_2026-05-08_12-47.png',
                beforeImage: '/images/projects/4-Landsbanki-data-remixes/landsbanki_actual_vs_forecast_mars2026.png',
                afterLabel: 'After: FYI Lab Editorial Remake',
                beforeLabel: 'Before: Standard Corporate Snapshot',
                result: 'Switching to horizontal labels and a dumbbell plot style eliminated the cognitive load of the original. The high-contrast palette and editorialized title ensure the chart tells a clear story at a glance.'
            }
        ],
        deconstruction: [
            {
                feature: 'Label Orientation',
                problem: 'Diagonal labels cause "Confused Puppy" syndrome (neck tilt required).',
                solution: 'Horizontal alignment for instant, natural readability.'
            },
            {
                feature: 'Color Contrast',
                problem: 'Dark blue and yellow markers are hard to differentiate at a glance.',
                solution: 'High-contrast, accessible palette clearly separating forecast vs. actuals.'
            },
            {
                feature: 'Titling',
                problem: 'Purely descriptive titles (e.g., "Framlag undirliða") lack context.',
                solution: 'Editorialized headlines that communicate the "So what?" immediately.'
            },
            {
                feature: 'Data Encoding',
                problem: 'The original layout made it hard to see the exact "delta" between values.',
                solution: 'Dumbbell / Dot plot style to focus on the precision of the gap.'
            }
        ]
    }
];
