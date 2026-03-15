import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const AboutView: React.FC = () => {
    const { t } = useTranslation();

    return (
        <main id="content" className="page">
            <section style={{ padding: '80px 0 40px' }}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                    >
                        <p className="kicker">{t('about.kicker') || 'The Background'}</p>
                        <h1 style={{ fontSize: 'clamp(40px, 6vw, 64px)', letterSpacing: '-0.04em', margin: '0 0 24px', maxWidth: '800px', lineHeight: 1.1 }}>
                            {t('about.title', 'I spent the last decade building data narratives for the world\'s largest companies.')}
                        </h1>
                    </motion.div>
                </div>
            </section>

            <section className="section" style={{ paddingTop: '20px' }}>
                <div className="container" style={{ maxWidth: '750px', margin: '0 auto' }}>

                    {/* Story Section 1: Vodafone */}
                    <div style={{ marginBottom: '60px' }}>
                        <h3 className="section-impact" style={{ fontSize: '24px', marginBottom: '16px' }}>
                            {t('about.vodafone_impact', 'From anonymized pings to saving lives.')}
                        </h3>
                        <p style={{ fontSize: '18px', lineHeight: 1.6, color: 'var(--text)', marginBottom: '16px' }}>
                            {t('about.vodafone_p1', 'At Vodafone Global Enterprise, I worked as a Global Proposition Development Manager. My job was to take billions of anonymized mobile location data points and turn them into solutions that people could actually understand and use.')}
                        </p>
                        <p style={{ fontSize: '18px', lineHeight: 1.6, color: 'var(--text)', marginBottom: '16px' }}>
                            {t('about.vodafone_p2', 'This meant building partnerships with global giants like JCDecaux to analyze out-of-home media, and breaking down demographic movements across major transit hubs.')}
                        </p>
                        <div style={{
                            padding: '24px',
                            background: 'var(--surface-2)',
                            borderRadius: '8px',
                            borderLeft: '4px solid var(--accent)',
                            marginTop: '24px'
                        }}>
                            <p style={{ fontSize: '16px', lineHeight: 1.6, color: 'var(--text)', margin: 0, fontStyle: 'italic' }}>
                                {t('about.vodafone_highlight', '"One of my proudest moments was using location data to improve cyclist safety along London\'s Super Cycle Highway for Transport for London. Seeing data translate directly into saved lives is exactly why I dedicate a portion of my time to social good initiatives today."')}
                            </p>
                        </div>
                    </div>

                    {/* Story Section 2: Facebook */}
                    <div style={{ marginBottom: '60px' }}>
                        <h3 className="section-impact" style={{ fontSize: '24px', marginBottom: '16px' }}>
                            {t('about.fb_impact', 'Reporting at a $35 billion scale.')}
                        </h3>
                        <p style={{ fontSize: '18px', lineHeight: 1.6, color: 'var(--text)', marginBottom: '16px' }}>
                            {t('about.fb_p1', 'Later, as a Global Insights, Analytics and Reporting Manager at Facebook, I had to figure out how to communicate massive, complex metrics to the C-suite and enterprise partners.')}
                        </p>
                        <ul style={{ fontSize: '16px', lineHeight: 1.6, color: 'var(--text)', marginBottom: '24px', paddingLeft: '24px' }}>
                            <li style={{ marginBottom: '8px' }}>{t('about.fb_bullet1', 'Created the first new section in 6 years for the global quarterly report deck.')}</li>
                            <li style={{ marginBottom: '8px' }}>{t('about.fb_bullet2', 'Built bespoke spending analysis workflows for enterprise customers over Cyber Weekend.')}</li>
                            <li style={{ marginBottom: '8px' }}>{t('about.fb_bullet3', 'Analyzed credit utilization rates across a massive $35bn portfolio.')}</li>
                        </ul>
                    </div>

                    {/* Story Section 3: The Pitch */}
                    <div style={{ padding: '40px', background: 'var(--accent)', color: 'var(--bg)', borderRadius: '16px' }}>
                        <h3 style={{ fontSize: '28px', marginBottom: '16px', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                            {t('about.pitch_title', 'Now, I want to bring that enterprise-grade rigor to your project.')}
                        </h3>
                        <p style={{ fontSize: '18px', lineHeight: 1.6, marginBottom: '24px', opacity: 0.9 }}>
                            {t('about.pitch_body', 'Whether you\'re a lean startup, a growing NGO, or a researcher with a breakthrough—you deserve the same level of clarity and visual storytelling that the Fortune 500 rely on.')}
                        </p>
                        <a className="button" style={{ background: 'var(--bg)', color: 'var(--accent-2)', border: 'none' }} href="mailto:victor.blaer@fyi-lab.is">
                            {t('about.cta', 'Let\'s talk about your data')}
                        </a>
                    </div>

                </div>
            </section>
        </main>
    );
};

export default AboutView;
