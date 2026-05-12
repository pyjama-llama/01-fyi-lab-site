import React from 'react';
import { useTranslation } from 'react-i18next';
import ProjectCard from '../components/ProjectCard';
import { motion } from 'framer-motion';
import { PROJECTS } from '../data/projects';

const ProjectsView: React.FC = () => {
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
                        <p className="kicker">{t('projects.kicker')}</p>
                        <h1 style={{ fontSize: 'clamp(40px, 6vw, 64px)', letterSpacing: '-0.04em', margin: '0 0 16px' }}>
                            {t('projects.title')}
                        </h1>
                        <p style={{ fontSize: '18px', color: 'var(--muted)', margin: 0, maxWidth: '56ch' }}>
                            {t('projects.subtitle')}
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="section" style={{ paddingTop: '40px' }}>
                <div className="container">
                    <div className="cards">
                        {PROJECTS.map((project, i) => (
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
                                    fallbackImageSrc={project.fallbackImageSrc}
                                    link={`/projects/${project.id}`}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ProjectsView;
