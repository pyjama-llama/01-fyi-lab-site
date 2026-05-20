import { useParams, Link, Navigate } from 'react-router-dom';
import { PROJECTS } from '../data/projects';
import { useState } from 'react';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import MediaRenderer from '../components/MediaRenderer';

const ProjectDetailView: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const project = PROJECTS.find(p => p.id === id);
    const [lightboxImg, setLightboxImg] = useState<string | null>(null);

    if (!project) {
        return <Navigate to="/projects" replace />;
    }

    const heroSrc = project.heroSrc ?? project.imageSrc;
    const heroFallback = project.fallbackImageSrc;

    return (
        <main id="content" className="page">
            {/* Article layout */}
            <div className="container" style={{ maxWidth: '720px', padding: '64px 20px 80px' }}>

                {/* Back navigation */}
                <Link
                    to="/projects"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: 'var(--muted)',
                        fontSize: '14px',
                        fontFamily: 'var(--mono)',
                        letterSpacing: '0.04em',
                        textDecoration: 'none',
                        marginBottom: '40px',
                    }}
                >
                    ← All projects
                </Link>

                {/* Hero image */}
                <div
                    style={{
                        width: '100%',
                        borderRadius: 'var(--radius)',
                        overflow: 'hidden',
                        marginBottom: '48px',
                        cursor: 'zoom-in',
                    }}
                    onClick={() => setLightboxImg(heroSrc)}
                >
                    <MediaRenderer
                        src={heroSrc}
                        poster={heroFallback}
                        alt={project.title}
                        style={{
                            width: '100%',
                            height: 'auto',
                            display: 'block',
                        }}
                    />
                </div>

                {/* Lightbox */}
                {lightboxImg && (
                    <div
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            background: 'rgba(0, 0, 0, 0.8)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 1000,
                            cursor: 'zoom-out',
                        }}
                        onClick={() => setLightboxImg(null)}
                    >
                        <MediaRenderer
                            src={lightboxImg}
                            alt={project.title}
                            style={{
                                maxWidth: '90%',
                                maxHeight: '90%',
                                objectFit: 'contain',
                            }}
                        />
                    </div>
                )}

                {/* Meta row */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
                    <span className="mono">{project.type}</span>
                    {project.tools.map(t => (
                        <span key={t} className="pill">{t}</span>
                    ))}
                </div>

                {/* Title */}
                <h1 style={{
                    fontSize: 'clamp(32px, 5vw, 52px)',
                    lineHeight: 1.05,
                    letterSpacing: '-0.04em',
                    margin: '0 0 20px',
                }}>
                    {project.title}
                </h1>

                {/* Tagline and Live Link */}
                <div style={{ marginBottom: '48px', borderLeft: '3px solid var(--border)', paddingLeft: '20px' }}>
                    <p style={{
                        fontSize: '20px',
                        color: 'var(--muted)',
                        lineHeight: 1.6,
                        margin: project.externalUrl ? '0 0 24px' : '0'
                    }}>
                        {project.description}
                    </p>

                    {project.externalUrl && (
                        <a
                            href={project.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="button button-primary"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginRight: '12px', marginBottom: '12px' }}
                        >
                            View Live Project
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="7" y1="17" x2="17" y2="7"></line>
                                <polyline points="7 7 17 7 17 17"></polyline>
                            </svg>
                        </a>
                    )}

                    {project.downloads && project.downloads.map(download => (
                        <a
                            key={download.url}
                            href={download.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="button button-primary"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginRight: '12px', marginBottom: '12px' }}
                        >
                            {download.label}
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="7 10 12 15 17 10"></polyline>
                                <line x1="12" y1="15" x2="12" y2="3"></line>
                            </svg>
                        </a>
                    ))}
                </div>

                {/* Divider */}
                <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '0 0 48px' }} />

                {/* Challenge */}
                <section style={{ marginBottom: '48px' }}>
                    <p className="kicker" style={{ marginBottom: '12px' }}>The Challenge</p>
                    <p style={{ fontSize: '17px', lineHeight: 1.75, color: 'var(--text)', margin: 0 }}>
                        {project.challenge}
                    </p>
                </section>

                {/* Solution */}
                <section style={{ marginBottom: '48px' }}>
                    <p className="kicker" style={{ marginBottom: '12px' }}>The Approach</p>
                    <p style={{ fontSize: '17px', lineHeight: 1.75, color: 'var(--text)', margin: 0 }}>
                        {project.solution}
                    </p>
                </section>

                {/* Deconstruction Table (for Lab projects) */}
                {project.deconstruction && project.deconstruction.length > 0 && (
                    <section style={{ marginBottom: '56px' }}>
                        <p className="kicker" style={{ marginBottom: '24px' }}>Laboratory Analysis: Deconstructing the Original</p>
                        <div style={{ 
                            overflowX: 'auto', 
                            borderRadius: '12px',
                            border: '1px solid var(--border)',
                            background: 'var(--surface)'
                        }}>
                            <table style={{ 
                                width: '100%', 
                                borderCollapse: 'collapse', 
                                fontSize: '15px',
                                textAlign: 'left'
                            }}>
                                <thead>
                                    <tr style={{ background: 'var(--surface-2)' }}>
                                        <th style={{ padding: '16px', borderBottom: '1px solid var(--border)', width: '25%' }}>Design Feature</th>
                                        <th style={{ padding: '16px', borderBottom: '1px solid var(--border)', width: '35%' }}>Original Problem</th>
                                        <th style={{ padding: '16px', borderBottom: '1px solid var(--border)', color: 'var(--accent)', fontWeight: 'bold' }}>FYI Lab Solution</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {project.deconstruction.map((item, idx) => (
                                        <tr key={idx} style={{ borderBottom: idx === project.deconstruction!.length - 1 ? 'none' : '1px solid var(--border)' }}>
                                            <td style={{ padding: '16px', fontWeight: 600, verticalAlign: 'top' }}>{item.feature}</td>
                                            <td style={{ padding: '16px', color: 'var(--muted)', verticalAlign: 'top', lineHeight: 1.5 }}>{item.problem}</td>
                                            <td style={{ padding: '16px', background: 'color-mix(in oklab, var(--accent) 5%, transparent)', fontWeight: 500, verticalAlign: 'top', lineHeight: 1.5 }}>{item.solution}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                )}

                {/* Result — pull quote treatment */}
                <div style={{
                    borderRadius: 'var(--radius)',
                    border: '1px solid var(--border)',
                    background: 'color-mix(in oklab, var(--surface) 90%, transparent)',
                    padding: '28px 32px',
                    marginBottom: '56px',
                }}>
                    <p className="kicker" style={{ marginBottom: '12px' }}>The Result</p>
                    <p style={{ fontSize: '18px', lineHeight: 1.7, fontWeight: 500, margin: 0 }}>
                        {project.result}
                    </p>
                </div>

                {/* Custom Project Charts */}
                {project.charts && project.charts.length > 0 && (
                    <section style={{ marginBottom: '64px' }}>
                        <h2 style={{ fontSize: '28px', marginBottom: '32px', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>
                            Interactive Views & Analysis
                        </h2>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
                            {project.charts.map((chart, index) => (
                                <div key={index} className="project-chart-block">
                                    <h3 style={{ fontSize: '20px', marginBottom: '16px' }}>{chart.title}</h3>
                                    <div
                                        style={{
                                            borderRadius: 'var(--radius)',
                                            overflow: 'hidden',
                                            border: '1px solid var(--border)',
                                            marginBottom: '16px',
                                            background: 'var(--surface)',
                                            cursor: 'zoom-in'
                                        }}
                                        onClick={() => setLightboxImg(chart.imageSrc)}
                                    >
                                        <MediaRenderer
                                            src={chart.imageSrc}
                                            alt={chart.title}
                                            style={{ width: '100%', height: 'auto', display: 'block' }}
                                            onError={(e) => {
                                                // Helpful fallback if the user hasn't dropped the image in yet
                                                const target = e.target as HTMLImageElement | HTMLVideoElement;
                                                if (target instanceof HTMLImageElement) {
                                                    target.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%23f3f4f6%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20font-family%3D%22sans-serif%22%20font-size%3D%2216%22%20text-anchor%3D%22middle%22%20fill%3D%22%239ca3af%22%3EImage%20placeholder%20for%3A%20' + chart.imageSrc.split('/').pop() + '%3C%2Ftext%3E%3C%2Fsvg%3E';
                                                }
                                            }}
                                        />
                                    </div>
                                    <p
                                        className="chart-caption"
                                        style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: 1.6, margin: 0, fontStyle: 'italic', paddingLeft: '16px', borderLeft: '3px solid var(--accent)' }}
                                        dangerouslySetInnerHTML={{ __html: chart.caption }}
                                    />
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Makeovers / Before & After Slider */}
                {project.makeovers && project.makeovers.length > 0 && (
                    <section style={{ marginBottom: '64px' }}>
                        <h2 style={{ fontSize: '28px', marginBottom: '32px', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>
                            Transformations
                        </h2>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>
                            {project.makeovers.map((makeover, index) => (
                                <div key={index} className="makeover-item">
                                    <BeforeAfterSlider
                                        beforeImage={makeover.beforeImage}
                                        afterImage={makeover.afterImage}
                                        beforeLabel={makeover.beforeLabel}
                                        afterLabel={makeover.afterLabel}
                                    />
                                    <p className="makeover-result" style={{ marginTop: '24px', fontSize: '16px', lineHeight: 1.6 }}>
                                        <strong>Result:</strong> {makeover.result}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Footer actions */}
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    {project.externalUrl && (
                        <a
                            className="button button-primary"
                            href={project.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View live project
                        </a>
                    )}
                    {project.downloads && project.downloads.map(download => (
                        <a
                            key={`footer-${download.url}`}
                            className="button button-primary"
                            href={download.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {download.label}
                        </a>
                    ))}
                    <a className="button" href="mailto:victor.blaer@fyi-lab.is?subject=Project%20Inquiry">
                        Start a similar project
                    </a>
                    <Link className="button" to="/projects">
                        ← Back to projects
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default ProjectDetailView;
