import React from 'react';

interface MediaRendererProps {
    src: string;
    alt: string;
    className?: string;
    style?: React.CSSProperties;
    onError?: (e: React.SyntheticEvent<HTMLImageElement | HTMLVideoElement, Event>) => void;
}

const MediaRenderer: React.FC<MediaRendererProps> = ({ src, alt, className, style, onError }) => {
    const isVideo = src.match(/\.(mp4|webm)$/i);

    if (isVideo) {
        return (
            <video
                src={src}
                className={className}
                style={style}
                autoPlay
                loop
                muted
                playsInline
                onError={onError}
            />
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            style={style}
            onError={onError as React.ReactEventHandler<HTMLImageElement>}
        />
    );
};

export default MediaRenderer;
