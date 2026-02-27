# Project 1: [Insert Name Here]

*Instructions: Fill out this template with the text for your first project. Once you're done, let me know, and I will integrate it into the site!*

## High-Level Overview
- **Project Title:** The Voting Booth (Kjörklefinn).
- **Tagline (1 sentence):** Making election polling data accessible to everyone.
- **Client/Persona (Optional):** Volunteer project for the people of Iceland including the blind and seeing disabled.
- **The Core Problem:** Existing polling visualizations are poor at communicating their message. Especially for people with ADHD as the high cognitive load is hard to handle.
- **The Solution/Impact:** I built an entire menu of visual delicacies that should satisfy everyone’s appetite. I've animated the charts to make them more engaging and easier to understand. I've also added a lot of interactivity to make it more engaging. I've strived to make the charts ARIA web content accessible, even adding a button for audio frequencies reflecting the data.
- **Tools Used:** React, D3.js, R for prototyping.

---

## The Charts / Visuals
*For each screenshot or chart you want to display, give it a quick title and an explanatory caption. Since you have ~10 images, just list them out below!*

### Chart 1: [Overview]
- **Image Filename:** `/images/projects/project-1/[01_overview.png]`
- **Caption:** [Animated election polling data overview.]

### Chart 2: [Coalition % following over time]
- **Image Filename:** `/images/projects/project-1/[02_coalition_viability.png]`
- **Caption:** [On the interactive website, users can select different coalitions and see how they are polling over time.]

### Chart 3: [Visualizing Coalition Viability]
- **Image Filename:** `/images/projects/project-1/[03_upset_plot_coaltion.png]`
- **Caption:** [An award winning plot for visualizing sets, different coalitions, and their intersections. ]
UpSet, a popular data visualization technique for displaying intersecting sets, was awarded the IEEE InfoVis 10-year Test of Time Award in 2024
*(Keep copying that format for Charts 4 through 10!)*


### Chart 4: [Animated Loess smoothing of different election polls]
- **Image Filename:** `/images/projects/project-1/[04_loess_animated.png]`
- **Caption:** [Loess is a way to show you the direction a bunch of data is trending. (It's a non-parametric method for smoothing data).]

### Chart 5: [Polling data bias analysis (aka the "House Effect")]
- **Image Filename:** `/images/projects/project-1/[05_house_effect_box_plot.png.png]`
- **Caption:** [The Independence party consistently polls higher with Gallup than with other pollsters, whereas they have Liberal Reform lower higher than other pollsters]

### Chart 6: [House Effect Small Multiples]
- **Image Filename:** `/images/projects/project-1/[06_house_effects_small_multiples.png]`
- **Caption:** [Seeing how different pollsters poll political parties over time.]

### Chart 7: [Animated & Interactive Chord Diagram]
- **Image Filename:** `/images/projects/project-1/[07_chord.png]`
- **Caption:** [Shows party retention rates and how they would vote today vs last election.]
This is a fun chart.

### Chart 8: [Variance heatmap by party and demographic.]
- **Image Filename:** `/images/projects/project-1/[09_heatmap_frávik.png]`
- **Caption:** [We look at the party's average vote and compare it to the % vote in that demographic, to show over vs under indexed.]
This table of table heatmap is great for quickly seeing where you are performing well or poorly.




## The "Before & After" Makeovers
*List your before/after pairs here.*

### Makeover 1
- **"Before" Image Filename:** `/images/projects/project-1/[11_before_demographics_maskina.png]`
- **"After" Image Filename:** `/images/projects/project-1/[14_demographics_two_party.png]`
- **"Before" Label (Short):** ["Before: Difficult to understand what the chart is saying"]
- **"After" Label (Short):** ["After: Easy to have a conversation with the chart."]
- **The Result (1 sentence):** ["95% reduction in cognitive load. People can now have a conversation with the chart instead of struggling to understand it."]
Tested well with people with ADHD because the chart wasn't overwhelming / yelling at the user all at once.

### Makeover 2 (If applicable)
- **"Before" Image Filename:** `/images/projects/project-1/[13_gallup_fylgi_flokka.png]`
- **"After" Image Filename:** `/images/projects/project-1/[15_gallup_fylgi_flokka.png]`
- **"Before" Label (Short):** ["Rotated date labels and legend far away from the data"]
- **"After" Label (Short):** ["After: Legend close to the data and proper date labels."]
- **The Result (1 sentence):** ["99% reduction in cognitive load."]
Performed test using before and after chart, asking users to "find the latest poll for each party, arrange it in descending order of support".
