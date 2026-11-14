import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFoundView: React.FC = () => {
    const { t } = useTranslation();

    return (
        <main id="content" className="page">
            <section className="page-head">
                <div className="container">
                    <p className="kicker">404</p>
                    <h1 className="page-title">{t('notfound.title')}</h1>
                    <p className="page-subtitle">{t('notfound.body')}</p>
                    <p style={{ marginTop: '24px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        <Link className="button button-primary" to="/">{t('notfound.home')}</Link>
                        <Link className="button" to="/projects">{t('notfound.projects')}</Link>
                    </p>
                </div>
            </section>
        </main>
    );
};

export default NotFoundView;
