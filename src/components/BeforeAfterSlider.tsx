import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

interface BeforeAfterSliderProps {
    beforeImage: string;
    afterImage: string;
    beforeLabel: string;
    afterLabel: string;
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
    beforeImage,
    afterImage,
    beforeLabel,
    afterLabel
}) => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        handlePointerMove(e);
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;

        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
            const percentage = (x / rect.width) * 100;
            setSliderPosition(percentage);
        }
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        e.currentTarget.releasePointerCapture(e.pointerId);
    };

    return (
        <div
            className="comparison-slider"
            ref={containerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ touchAction: 'none', cursor: 'ew-resize' }}
        >
            <div className="comparison-before">
                <img src={beforeImage} alt="Before" className="comparison-image" draggable="false" />
                <span className="comparison-label" style={{ opacity: isHovered ? 1 : 0.7, transition: 'opacity 0.2s' }}>{beforeLabel}</span>
            </div>

            <div
                className="comparison-after"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
                <img src={afterImage} alt="After" className="comparison-image" draggable="false" />
                <span className="comparison-label" style={{ opacity: isHovered ? 1 : 0.7, transition: 'opacity 0.2s' }}>{afterLabel}</span>
            </div>

            <div
                className="slider-handle"
                style={{ left: `${sliderPosition}%`, background: isHovered ? 'var(--accent)' : 'var(--muted)' }}
            >
                <div style={{
                    width: '32px',
                    height: '32px',
                    background: 'white',
                    color: 'black',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                    fontSize: '14px',
                    marginLeft: '-14px' // Center the circle on the 4px line
                }}>
                    ↔
                </div>
            </div>
        </div>
    );
};

export default BeforeAfterSlider;
