import React from 'react';
import MediaRenderer from '../MediaRenderer';

export interface ArticleLayoutProps {
    title: string;
    hookContent: React.ReactNode;
    beforeImageSrc: string;
    beforeImageAlt: string;
    breakdownContent: React.ReactNode;
    afterChartContent: React.ReactNode; // Can be a react component or an image
}

export const StandardArticleLayout: React.FC<ArticleLayoutProps> = ({
    title,
    hookContent,
    beforeImageSrc,
    beforeImageAlt,
    breakdownContent,
    afterChartContent
}) => {
    return (
        <article className="standard-article" style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
            <header style={{ marginBottom: '48px' }}>
                <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '24px' }}>
                    {title}
                </h1>
                <div className="article-hook" style={{ fontSize: '20px', color: 'var(--muted)', lineHeight: 1.6 }}>
                    {hookContent}
                </div>
            </header>

            <section className="article-before" style={{ marginBottom: '64px' }}>
                <h2 style={{ fontSize: '24px', marginBottom: '16px', color: 'var(--accent)' }}>The "Before"</h2>
                <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--surface)' }}>
                    <MediaRenderer 
                        src={beforeImageSrc} 
                        alt={beforeImageAlt} 
                        style={{ width: '100%', display: 'block' }} 
                    />
                </div>
            </section>

            <section className="article-breakdown" style={{ marginBottom: '64px', paddingLeft: '24px', borderLeft: '3px solid var(--border)' }}>
                <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>What went wrong?</h2>
                <div style={{ fontSize: '18px', lineHeight: 1.7 }}>
                    {breakdownContent}
                </div>
            </section>

            <section className="article-after" style={{ marginBottom: '64px' }}>
                <h2 style={{ fontSize: '24px', marginBottom: '16px', color: 'var(--primary)' }}>The "After" (Fixes applied)</h2>
                <div style={{ padding: '24px', borderRadius: '12px', background: 'var(--surface)', border: '1px solid var(--border)' }}>
                    {afterChartContent}
                </div>
            </section>
        </article>
    );
};
