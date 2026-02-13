# Project Article Formats Guide

This guide shows how to format different elements in project articles using the available CSS classes.

## Basic Structure

```html
<div class="article-layout">
  <article class="article-content">
    <!-- Your content here -->
  </article>
</div>
```

## Text Elements

### Headings
```html
<h2>Section Heading</h2>
<h3>Subsection Heading</h3>
```

### Paragraphs
```html
<p>Regular paragraph text with 18px font size and 1.7 line height.</p>
```

## Special Elements

### Pull Quotes
```html
<blockquote class="article-pullquote">
  "This is a highlighted quote that stands out from regular text."
</blockquote>
```

### Feature Boxes
```html
<div class="article-features">
  <h3>Key Features</h3>
  <ul>
    <li><strong>Feature 1:</strong> Description of the feature</li>
    <li><strong>Feature 2:</strong> Description of the feature</li>
  </ul>
</div>
```

### Tech Stack
```html
<div class="tech-stack">
  <h3>Technology Stack</h3>
  <ul>
    <li><strong>Frontend:</strong> React, D3.js</li>
    <li><strong>Backend:</strong> Node.js, Express</li>
    <li><strong>Database:</strong> PostgreSQL</li>
  </ul>
</div>
```

## Images

### Article Images with Captions
```html
<div class="article-image">
  <img src="path/to/image.jpg" alt="Description of image">
  <p class="image-caption">This is the image caption that appears below the image.</p>
</div>
```

### Hero Images (at top of article)
```html
<div class="article-hero">
  <img src="path/to/hero.jpg" alt="Hero image" class="article-hero-image">
  <div class="article-hero-caption">
    <p>Hero image caption text.</p>
  </div>
</div>
```

## Metrics and Results

### Results Grid
```html
<div class="results-metrics">
  <div class="metric">
    <div class="metric-number">40%</div>
    <div class="metric-label">Reduced exploration time</div>
  </div>
  <div class="metric">
    <div class="metric-number">3x</div>
    <div class="metric-label">Increased engagement</div>
  </div>
  <div class="metric">
    <div class="metric-number">5+</div>
    <div class="metric-label">Departments adopted</div>
  </div>
</div>
```

## Sidebar Elements (moved to bottom)

### Project Details
```html
<div class="article-sidebar-content">
  <div class="sidebar-section">
    <h3>Project Details</h3>
    <dl class="project-details">
      <dt>Client</dt>
      <dd>Company Name</dd>
      <dt>Duration</dt>
      <dd>2 weeks</dd>
      <dt>Role</dt>
      <dd>Lead Developer</dd>
    </dl>
  </div>
</div>
```

### Action Links
```html
<div class="sidebar-section">
  <h3>Quick Actions</h3>
  <div class="action-links">
    <a href="#" class="button button-primary">View Live Demo</a>
    <a href="#" class="button">View Source</a>
    <a href="mailto:email@example.com" class="text-link">Contact Us</a>
  </div>
</div>
```

### Related Projects
```html
<div class="sidebar-section">
  <h3>Related Work</h3>
  <div class="related-projects">
    <a href="other-project.html" class="related-project">
      <img src="path/to/thumb.jpg" alt="Project thumbnail">
      <span>Project Name</span>
    </a>
  </div>
</div>
```

## Lists

### Regular Lists
```html
<ul>
  <li>Regular list item</li>
  <li>Another list item</li>
</ul>
```

### Styled Lists in Boxes
```html
<div class="article-features">
  <h3>Features</h3>
  <ul>
    <li><strong>Bold Feature:</strong> Description</li>
    <li><strong>Another Feature:</strong> Description</li>
  </ul>
</div>
```

## Complete Example

```html
<div class="article-layout">
  <article class="article-content">
    <!-- Hero Image -->
    <div class="article-hero">
      <img src="hero.jpg" alt="Project hero" class="article-hero-image">
      <div class="article-hero-caption">
        <p>Project hero image caption.</p>
      </div>
    </div>

    <!-- Section with heading and content -->
    <section class="article-section">
      <h2>The Challenge</h2>
      <p>Describe the problem or challenge.</p>
      
      <blockquote class="article-pullquote">
        "Key insight or quote from the project."
      </blockquote>
      
      <p>More content about the challenge.</p>
    </section>

    <!-- Section with features -->
    <section class="article-section">
      <h2>Key Features</h2>
      <div class="article-features">
        <h3>Main Features</h3>
        <ul>
          <li><strong>Feature 1:</strong> Description</li>
          <li><strong>Feature 2:</strong> Description</li>
        </ul>
      </div>
    </section>

    <!-- Section with image -->
    <section class="article-section">
      <h2>Implementation</h2>
      <div class="article-image">
        <img src="implementation.jpg" alt="Implementation screenshot">
        <p class="image-caption">Implementation details shown in the screenshot.</p>
      </div>
    </section>

    <!-- Section with results -->
    <section class="article-section">
      <h2>Results</h2>
      <div class="results-metrics">
        <div class="metric">
          <div class="metric-number">50%</div>
          <div class="metric-label">Improvement</div>
        </div>
        <div class="metric">
          <div class="metric-number">2x</div>
          <div class="metric-label">Speed increase</div>
        </div>
      </div>
    </section>
  </article>

  <!-- Sidebar content at bottom -->
  <div class="article-sidebar-content">
    <div class="sidebar-section">
      <h3>Project Details</h3>
      <dl class="project-details">
        <dt>Client</dt>
        <dd>Client Name</dd>
        <dt>Duration</dt>
        <dd>3 weeks</dd>
      </dl>
    </div>
  </div>
</div>
```

## Gallery Grid for "More Projects"

```html
<div class="gallery-grid">
  <article class="gallery-item">
    <a href="project-page.html" class="gallery-link">
      <img src="project-thumb.jpg" alt="Project name" class="gallery-image">
      <div class="gallery-content">
        <h3 class="gallery-title">Project Name</h3>
        <p class="gallery-description">Brief project description.</p>
        <div class="gallery-meta">
          <span class="mono">Type</span>
          <span class="pill">Technology</span>
        </div>
      </div>
    </a>
  </article>
</div>
```

## Tips

1. **Use semantic HTML5 tags** like `<section>`, `<article>`, `<blockquote>`
2. **Keep paragraphs concise** - 2-4 sentences max
3. **Use pull quotes sparingly** - for key insights only
4. **Include alt text** for all images
5. **Use metric numbers** to quantify results
6. **Keep section headings clear** and descriptive
7. **Use feature boxes** to organize lists of items
8. **Place sidebar content at the bottom** for single-column layout
