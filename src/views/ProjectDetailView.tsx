import { useParams, Link, Navigate } from 'react-router-dom';
import { PROJECTS } from '../data/projects';
import { useState } from 'react';

const ProjectDetailView: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const project = PROJECTS.find(p => p.id === id);
    const [lightboxOpen, setLightboxOpen] = useState(false);

    if (!project) {
        return <Navigate to="/projects" replace />;
    }

    const heroSrc = project.heroSrc ?? project.imageSrc;

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
                    onClick={() => setLightboxOpen(true)}
                >
                    <img
                        src={heroSrc}
                        alt={project.title}
                        style={{
                            width: '100%',
                            height: 'auto',
                            display: 'block',
                        }}
                    />
                </div>

                {/* Lightbox */}
                {lightboxOpen && (
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
                        onClick={() => setLightboxOpen(false)}
                    >
                        <img
                            src={heroSrc}
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

                {/* Tagline */}
                <p style={{
                    fontSize: '20px',
                    color: 'var(--muted)',
                    lineHeight: 1.6,
                    margin: '0 0 48px',
                    borderLeft: '3px solid var(--border)',
                    paddingLeft: '20px',
                }}>
                    {project.description}
                </p>

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
                    <a className="button" href="mailto:hello@fyilab.is?subject=Project%20Inquiry">
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
