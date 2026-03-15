import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import { motion } from 'framer-motion';
import { PROJECTS } from '../data/projects';

const HomeView: React.FC = () => {
    const { t } = useTranslation();

    return (
        <main id="content">
            <section className="hero">
                <div className="container hero-inner">
                    <motion.div
                        className="hero-copy"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="kicker">{t('hero.kicker', 'One-person data viz studio')}</p>
                        <h1 className="hero-title">{t('hero.title', 'FYI Lab')}</h1>
                        <p className="hero-subtitle" dangerouslySetInnerHTML={{ __html: t('hero.subtitle', 'The problem is you\'re right. You\'re just not convincing. Let me help you translate your complex research into a clear, compelling narrative that drives action.').replace('Reykjavík, Iceland.', '<strong>Reykjavík, Iceland</strong>.') }} />

                        <div className="hero-cta">
                            <Link className="button button-primary" to="/projects">{t('hero.cta_projects')}</Link>
                            <Link className="button" to="/about">{t('hero.cta_about')}</Link>
                        </div>

                        <div className="hero-meta" role="list">
                            <div className="meta-item" role="listitem">
                                <span className="meta-label">{t('hero.focus_label')}</span>
                                <span className="meta-value">{t('hero.focus_value')}</span>
                            </div>
                            <div className="meta-item" role="listitem">
                                <span className="meta-label">{t('hero.tools_label')}</span>
                                <span className="meta-value">{t('hero.tools_value')}</span>
                            </div>
                            <div className="meta-item" role="listitem">
                                <span className="meta-label">{t('hero.timezone_label')}</span>
                                <span className="meta-value">{t('hero.timezone_value')}</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 01 Featured Projects Section */}
            <section className="section">
                <div className="container">
                    <div className="section-head">
                        <h2 className="section-title">{t('home.featured_title')}</h2>
                        <h3 className="section-impact">{t('home.featured_impact')}</h3>
                        <p className="section-subtitle">{t('home.featured_subtitle1')}</p>
                        <p className="section-subtitle">{t('home.featured_subtitle2')}</p>
                        <Link className="section-link" to="/projects">{t('home.browse_link')}</Link>
                    </div>

                    <div className="cards">
                        {PROJECTS.slice(0, 3).map((project, i) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: i * 0.1 }}
                            >
                                <ProjectCard
                                    title={project.title}
                                    description={project.tagline}
                                    type={project.type}
                                    tags={project.tags}
                                    imageSrc={project.imageSrc}
                                    link={`/projects/${project.id}`}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 02 Personas Section */}
            <section className="section section-muted">
                <div className="container">
                    <div className="section-head" style={{ marginBottom: '40px' }}>
                        <h2 className="section-title">{t('home.personas_title')}</h2>
                        <h3 className="section-impact" style={{ maxWidth: '800px' }}>{t('home.personas_impact')}</h3>
                        <p className="section-subtitle" style={{ maxWidth: '700px', fontSize: '18px' }}>{t('home.personas_subtitle')}</p>
                    </div>

                    <div className="cards">
                        {[
                            { id: 'researcher', icon: '🔬' },
                            { id: 'executive', icon: '📈' },
                            { id: 'policy', icon: '🏛️' },
                            { id: 'law', icon: '⚖️' }
                        ].map((persona, i) => (
                            <motion.div
                                key={persona.id}
                                className="card card-with-image"
                                style={{ padding: '32px 24px', textAlign: 'left', background: 'var(--surface)' }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.4, delay: i * 0.1 }}
                            >
                                <div style={{ fontSize: '32px', marginBottom: '16px' }}>{persona.icon}</div>
                                <h3 className="card-title" style={{ fontSize: '22px', marginBottom: '12px' }}>
                                    {t(`personas.${persona.id}_title`)}
                                </h3>
                                <p className="card-body" style={{ marginBottom: '24px', flexGrow: 1 }}>
                                    {t(`personas.${persona.id}_problem`)}
                                </p>
                                <div style={{
                                    padding: '16px',
                                    background: 'var(--surface-2)',
                                    borderRadius: '8px',
                                    borderLeft: '4px solid var(--accent)',
                                    fontStyle: 'italic',
                                    fontSize: '15px'
                                }}>
                                    {t(`personas.${persona.id}_solution`)}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 03 Services Section - UX Improved */}
            <section className="section">
                <div className="container">
                    <div className="section-head" style={{ marginBottom: '32px' }}>
                        <h2 className="section-title">{t('home.services_title')}</h2>
                        <h3 className="section-impact">{t('home.services_impact')}</h3>
                        <p className="section-subtitle">{t('home.services_subtitle')}</p>
                    </div>

                    <div className="two-col" style={{ gap: '32px' }}>
                        <div className="stack" style={{ gap: '20px' }}>
                            <motion.div
                                className="service"
                                style={{ padding: '24px', position: 'relative', overflow: 'hidden' }}
                                whileHover={{ y: -4, boxShadow: '0 20px 40px var(--shadow)' }}
                            >
                                <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--accent)' }} />
                                <span className="kicker" style={{ color: 'var(--accent)', marginBottom: '8px', display: 'block' }}>CHAOS TO CLARITY</span>
                                <h3 className="service-title">{t('services.custom_title')}</h3>
                                <p className="service-body">{t('services.custom_body').replace('From chaos to clarity: ', '')}</p>
                            </motion.div>

                            <motion.div
                                className="service"
                                style={{ padding: '24px', position: 'relative', overflow: 'hidden' }}
                                whileHover={{ y: -4, boxShadow: '0 20px 40px var(--shadow)' }}
                            >
                                <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--accent)' }} />
                                <span className="kicker" style={{ color: 'var(--accent)', marginBottom: '8px', display: 'block' }}>INPUT TO IMPACT</span>
                                <h3 className="service-title">{t('services.dashboard_title')}</h3>
                                <p className="service-body">{t('services.dashboard_body').replace('From input to impact: ', '')}</p>
                            </motion.div>

                            <motion.div
                                className="service"
                                style={{ padding: '24px', position: 'relative', overflow: 'hidden' }}
                                whileHover={{ y: -4, boxShadow: '0 20px 40px var(--shadow)' }}
                            >
                                <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--accent)' }} />
                                <span className="kicker" style={{ color: 'var(--accent)', marginBottom: '8px', display: 'block' }}>COMPLEXITY TO NARRATIVE</span>
                                <h3 className="service-title">{t('services.story_title')}</h3>
                                <p className="service-body">{t('services.story_body')}</p>
                            </motion.div>

                            <motion.div
                                className="service"
                                style={{ padding: '24px', position: 'relative', overflow: 'hidden' }}
                                whileHover={{ y: -4, boxShadow: '0 20px 40px var(--shadow)' }}
                            >
                                <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--accent)' }} />
                                <span className="kicker" style={{ color: 'var(--accent)', marginBottom: '8px', display: 'block' }}>IDEAS TO CAPABILITY</span>
                                <h3 className="service-title">{t('services.workshop_title')}</h3>
                                <p className="service-body">{t('services.workshop_body')}</p>
                            </motion.div>
                        </div>

                        <div className="callout" style={{ position: 'sticky', top: '100px' }}>
                            <h3 className="callout-title">{t('services.availability_title')}</h3>
                            <p className="callout-body">{t('services.availability_body')}</p>
                            <a className="button button-primary" href="mailto:victor.blaer@fyi-lab.is?subject=FYI%20Lab%20project">Email victor.blaer@fyi-lab.is</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* 03 Chart Makeovers Section */}
            <section className="section">
                <div className="container">
                    <div className="section-head">
                        <h2 className="section-title">{t('home.makeover_title')}</h2>
                        <h3 className="section-impact">{t('home.makeover_impact')}</h3>
                        <p className="section-subtitle">{t('home.makeover_subtitle')}</p>
                    </div>

                    <div className="makeover-slider">
                        <div className="makeover-item">
                            <h3 style={{ marginBottom: '16px' }}>The "Everything Dashboard" → Focused Insights</h3>
                            <BeforeAfterSlider
                                beforeImage="/images/before-dashboard.png"
                                afterImage="/images/after-dashboard.png"
                                beforeLabel="Before: 20+ metrics, no focus"
                                afterLabel="After: 3 key metrics, clear hierarchy"
                            />
                            <p className="makeover-result"><strong>Result:</strong> 80% reduction in cognitive load, faster decision-making</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section section-muted">
                <div className="container text-center" style={{ textAlign: 'center' }}>
                    <div className="section-head" style={{ display: 'block' }}>
                        <h2 className="section-title">{t('home.cta_footer_title')}</h2>
                        <p className="section-subtitle" style={{ marginTop: '8px', marginBottom: '24px' }}>{t('home.cta_footer_subtitle')}</p>
                    </div>
                    <div className="hero-cta" style={{ justifyContent: 'center' }}>
                        <a className="button button-primary" href="mailto:victor.blaer@fyi-lab.is?subject=Chart%20Makeover%20Request">Get your free makeover</a>
                        <Link className="button" to="/about">See my process</Link>
                    </div>
                </div>
            </section>

        </main>
    );
};

export default HomeView;
