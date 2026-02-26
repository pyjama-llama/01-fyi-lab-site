import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    const { t } = useTranslation();

    return (
        <footer className="site-footer">
            <div className="container footer-inner">
                <div>
                    <div className="footer-brand">FYI Lab</div>
                    <div className="footer-meta">{t('footer.location')}</div>
                    <p className="footer-copy" style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '4px' }}>
                        {t('footer.copy')}
                    </p>
                </div>
                <div className="footer-links">
                    <a className="text-link" href="mailto:hello@fyilab.is">hello@fyilab.is</a>
                    <Link className="text-link" to="/projects">{t('nav.projects')}</Link>
                    <Link className="text-link" to="/about">{t('nav.about')}</Link>
                    <Link
                        to="/zen"
                        style={{ color: 'var(--muted)', fontSize: '12px', opacity: 0.5 }}
                        title="Zen Garden — take a breath"
                    >
                        ✦ Zen
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
