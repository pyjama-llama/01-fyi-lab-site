export interface GalleryItem {
    id: string;
    title: string;
    description: string;
    imageSrc: string;
    link: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
    {
        id: 'hvad-kemur-fylgid',
        title: 'Hvaðan kemur fylgið?',
        description: 'An interactive chord diagram showing voter flow between Reykjavík city council elections (2022 to 2026).',
        imageSrc: '/images/projects/3-borgarstjornkosningar-2026/01_chord_hverjir_halda.png',
        link: 'https://borgarstjornarkosningar-2026.fyi-lab.is'
    },
    {
        id: 'epstein-forensic',
        title: 'Forensic Financial Network',
        description: 'An interactive mapping of $557M in documented wire transfers across 141 entities over a decade.',
        imageSrc: '/images/projects/epstein-forensic/01_overview.png',
        link: '/projects/epstein-forensic'
    },
    {
        id: 'upset-plot',
        title: 'Coalition Viability (UpSet Plot)',
        description: 'A visualization technique designed to handle complex intersecting sets without the illegibility of Venn diagrams.',
        imageSrc: '/images/projects/project-1/03_upset_plot_coaltion.png',
        link: '/projects/upset-plot-analysis'
    },
    {
        id: 'house-effects',
        title: 'House Effects Small Multiples',
        description: 'Using small multiples to reveal structural polling biases that are hidden when looking only at aggregates.',
        imageSrc: '/images/projects/project-1/06_house_effects_small_multiples.png',
        link: '/projects/house-effects-small-multiples'
    },
    {
        id: 'kjorklefinn-overview',
        title: 'Kjörklefinn Overview',
        description: 'Animated election polling data overview.',
        imageSrc: '/images/projects/project-1/01_overview.png',
        link: '/projects/the-voting-booth'
    },
    {
        id: 'coalition-following',
        title: 'Coalition Viability Over Time',
        description: 'Interactive tracker showing how different political coalitions are polling over time.',
        imageSrc: '/images/projects/project-1/02_coalition_viability.png',
        link: '/projects/the-voting-booth'
    },
    {
        id: 'animated-loess',
        title: 'Animated Loess Smoothing',
        description: 'Non-parametric method for smoothing data to show the direction a bunch of data is trending.',
        imageSrc: '/images/projects/project-1/04_loess_animated.png',
        link: '/projects/animated-loess-smoothing'
    },
    {
        id: 'house-effect-box',
        title: 'Polling Data Bias Analysis',
        description: 'Box plot analysis of the "House Effect" comparing different pollsters.',
        imageSrc: '/images/projects/project-1/05_house_effect_box_plot.png',
        link: '/projects/the-voting-booth'
    },
    {
        id: 'interactive-chord',
        title: 'Interactive Chord Diagram',
        description: 'Shows party retention rates and how voters would vote today vs the last election.',
        imageSrc: '/images/projects/project-1/07_chord.png',
        link: '/projects/the-voting-booth'
    },
    {
        id: 'variance-heatmap',
        title: 'Variance Heatmap',
        description: 'Comparing a party\'s average vote to the demographic vote to show over vs under indexing.',
        imageSrc: '/images/projects/project-1/09_heatmap_frávik.png',
        link: '/projects/the-voting-booth'
    },
    {
        id: 'landsbanki-forecast-remake',
        title: '[LAB] Forecast vs. Actuals',
        description: 'Work in Progress: A laboratory experiment remaking corporate financial forecasts. Exploring high-density alternatives to traditional banking charts. (Landsbankinn Case Study)',
        imageSrc: '/images/projects/4-Landsbanki-data-remixes/actuals_vs_forecast_2026-05-08_12-47.png',
        link: '/projects/landsbanki-remake'
    }
];
