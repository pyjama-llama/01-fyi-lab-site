import React from 'react';
import { Link } from 'react-router-dom';

interface ProjectCardProps {
    title: string;
    description: string;
    imageSrc: string;
    link: string;
    tags: string[];
    type?: string;
    layout?: 'standard' | 'wide';
}

const ProjectCard: React.FC<ProjectCardProps> = ({
    title,
    description,
    imageSrc,
    link,
    tags,
    type = "Interactive",
    layout = 'standard'
}) => {
    const isExternal = link.startsWith('http');

    const cardContent = (
        <>
            <img src={imageSrc} alt={`${title} preview`} className="card-image" />
            <div className="card-top">
                <span className="mono">{type}</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                    {tags.map(tag => (
                        <span key={tag} className="pill">{tag}</span>
                    ))}
                </div>
            </div>
            <h2 className="card-title">{title}</h2>
            <p className="card-body">{description}</p>
        </>
    );

    const cardClass = `card card-with-image ${layout === 'wide' ? 'card-wide' : ''}`;

    return (
        <article className={cardClass} style={layout === 'standard' ? { maxWidth: '340px' } : {}}>
            {isExternal ? (
                <a href={link} className="card-link" target="_blank" rel="noopener noreferrer">
                    {cardContent}
                </a>
            ) : (
                <Link to={link} className="card-link">
                    {cardContent}
                </Link>
            )}
        </article>
    );
};

export default ProjectCard;
