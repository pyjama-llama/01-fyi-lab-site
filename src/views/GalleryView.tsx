import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const GALLERY_ITEMS = [
    {
        id: 'chart-1',
        title: 'Placeholder Chart 1',
        description: 'A brief description of this standalone chart.',
        imageSrc: 'https://placehold.co/600x400/1e1e1e/888888?text=Chart+1',
        link: '#'
    },
    {
        id: 'chart-2',
        title: 'Placeholder Chart 2',
        description: 'Another interesting visualization.',
        imageSrc: 'https://placehold.co/600x400/1e1e1e/888888?text=Chart+2',
        link: '#'
    },
    {
        id: 'chart-3',
        title: 'Placeholder Chart 3',
        description: 'More data insights.',
        imageSrc: 'https://placehold.co/600x400/1e1e1e/888888?text=Chart+3',
        link: '#'
    }
];

const GalleryView: React.FC = () => {
    const { t } = useTranslation();

    return (
        <main id="content" className="page">
            <section style={{ padding: '80px 0 40px' }}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <p className="kicker">{t('gallery.kicker') || 'Selected Visuals'}</p>
                        <h1 style={{ fontSize: 'clamp(40px, 6vw, 64px)', letterSpacing: '-0.04em', margin: '0 0 16px' }}>
                            {t('gallery.title') || 'Chart Gallery'}
                        </h1>
                        <p style={{ fontSize: '18px', color: 'var(--muted)', margin: 0, maxWidth: '56ch' }}>
                            {t('gallery.subtitle') || 'A curated collection of standalone charts, visual experiments, and snippets from larger projects.'}
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="section" style={{ paddingTop: '40px' }}>
                <div className="container">
                    <div className="cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                        {GALLERY_ITEMS.map((item, i) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: i * 0.1 }}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    border: '1px solid var(--border)',
                                    background: 'var(--surface)'
                                }}
                            >
                                <a href={item.link} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                                    <div style={{ width: '100%', aspectRatio: '3/2', overflow: 'hidden' }}>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={item.imageSrc}
                                            alt={item.title}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div style={{ padding: '20px' }}>
                                        <h3 style={{ margin: '0 0 8px 0', fontSize: '20px' }}>{item.title}</h3>
                                        <p style={{ margin: 0, color: 'var(--muted)', fontSize: '15px' }}>{item.description}</p>
                                    </div>
                                </a>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default GalleryView;
