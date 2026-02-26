import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const AboutView: React.FC = () => {
    const { t, i18n } = useTranslation();
    const isEnglish = i18n.language.startsWith('en');

    return (
        <main id="content" className="page">
            <section className="page-head">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                    >
                        <p className="kicker">{isEnglish ? 'About' : 'Um mig'}</p>
                        <h1 className="page-title">{t('hero.title')}</h1>
                        <p className="page-subtitle">
                            {isEnglish
                                ? 'I specialize in transforming complex datasets into clear, interactive, and actionable visual stories.'
                                : 'Ég sérhæfi mig í að umbreyta flóknum gögnum í skýrar, gagnvirkar og nýtanlegar sjónrænar sögur.'}
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="section">
                <div className="container prose">
                    <h2>{isEnglish ? 'My Process' : 'Vinnulag'}</h2>
                    <p>
                        {isEnglish
                            ? 'I work directly with domain experts to uncover the most important narratives hidden within their data. My approach prioritizes clarity, performance, and accessibility.'
                            : 'Ég vinn náið með sérfræðingum til að kalla fram mikilvægustu sögurnar úr gögnunum. Áherslan er alltaf á skýrleika, hraða og aðgengi.'}
                    </p>

                    <div className="divider" style={{ margin: '32px 0' }}></div>

                    <h2>{isEnglish ? 'Contact' : 'Hafa samband'}</h2>
                    <p>
                        {t('services.availability_body')}
                    </p>
                    <a className="button button-primary" style={{ marginTop: '16px' }} href="mailto:hello@fyilab.is">
                        hello@fyilab.is
                    </a>
                </div>
            </section>
        </main>
    );
};

export default AboutView;
