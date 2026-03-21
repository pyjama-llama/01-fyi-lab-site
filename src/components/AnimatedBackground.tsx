import { useEffect, useRef } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Node {
    x: number;
    y: number;
    tx: number;  // target x (used during shape formation)
    ty: number;  // target y
    baseX: number;
    baseY: number;
    vx: number;
    vy: number;
    radius: number;
    opacity: number;
    lerping: boolean; // true while forming a shape
}

// ─── Constants ────────────────────────────────────────────────────────────────
const NODE_COUNT = 60;
const CONNECTION_DIST = 150;
const SPEED = 0.25;
const MOUSE_REPEL_RADIUS = 120;
const MOUSE_REPEL_STRENGTH = 2.5;
const SHAPE_INTERVAL_MS = 8000;   // form a shape every 8s
const SHAPE_DURATION_MS = 3000;   // hold shape for 3s
const LERP_SPEED = 0.04;

// ─── Shape generators ─────────────────────────────────────────────────────────
function polygonPoints(n: number, cx: number, cy: number, r: number) {
    return Array.from({ length: n }, (_, i) => {
        const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
        return { x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r };
    });
}

function starPoints(cx: number, cy: number, outerR: number, innerR: number, points: number) {
    return Array.from({ length: points * 2 }, (_, i) => {
        const angle = (i / (points * 2)) * Math.PI * 2 - Math.PI / 2;
        const r = i % 2 === 0 ? outerR : innerR;
        return { x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r };
    });
}

function dnaPoints(cx: number, cy: number, count: number) {
    return Array.from({ length: count }, (_, i) => {
        const t = (i / count) * Math.PI * 4;
        const side = i % 2 === 0 ? 1 : -1;
        return {
            x: cx + side * 70 * Math.cos(t * 0.25),
            y: cy - 200 + (i / count) * 400,
        };
    });
}

function globePoints(cx: number, cy: number, radius: number, count: number) {
    return Array.from({ length: count }, (_, i) => {
        // Fibonacci sphere point distribution, mapped to 2D orthographic projection
        const phi = Math.acos(1 - 2 * (i + 0.5) / count);
        const theta = Math.PI * (1 + Math.sqrt(5)) * i;

        const x3d = Math.cos(theta) * Math.sin(phi);
        const y3d = Math.sin(theta) * Math.sin(phi);
        // z3d represents depth: Math.cos(phi), ignored for 2D orthographic projection

        return {
            x: cx + x3d * radius,
            y: cy + y3d * radius
        };
    });
}

function getShapeTargets(count: number, w: number, h: number, cx: number, cy: number): { x: number; y: number }[] {
    const idx = Math.floor(Math.random() * 5);
    switch (idx) {
        case 0: return polygonPoints(6, cx, cy, Math.min(w, h) * 0.22);       // hexagon
        case 1: return polygonPoints(3, cx, cy, Math.min(w, h) * 0.24);       // triangle
        case 2: return starPoints(cx, cy, Math.min(w, h) * 0.22, Math.min(w, h) * 0.1, 5); // star
        case 3: return dnaPoints(cx, cy, count);                                // double helix
        case 4: return globePoints(cx, cy, Math.min(w, h) * 0.22, count);    // globe
        default: return polygonPoints(6, cx, cy, Math.min(w, h) * 0.22);
    }
}

// ─── Component ────────────────────────────────────────────────────────────────
const NetworkBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const nodesRef = useRef<Node[]>([]);
    const animRef = useRef<number>(0);
    const mouseRef = useRef({ x: -9999, y: -9999 });
    const shapingRef = useRef(false);
    const shapeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initNodes();
        };

        const initNodes = () => {
            nodesRef.current = Array.from({ length: NODE_COUNT }, () => {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                return {
                    x, y, tx: x, ty: y, baseX: x, baseY: y,
                    vx: (Math.random() - 0.5) * SPEED,
                    vy: (Math.random() - 0.5) * SPEED,
                    radius: Math.random() * 1.8 + 0.6,
                    opacity: Math.random() * 0.45 + 0.15,
                    lerping: false,
                };
            });
        };

        resize();
        window.addEventListener('resize', resize);

        // Mouse tracking
        const onMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };
        const onMouseLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseleave', onMouseLeave);

        // Shape formation cycle
        const triggerShape = () => {
            if (!canvas) return;
            shapingRef.current = true;

            // Allow the shapes to form anywhere within a safe 20% margin of the screen edges
            const marginX = canvas.width * 0.2;
            const marginY = canvas.height * 0.2;
            const cx = marginX + Math.random() * (canvas.width - 2 * marginX);
            const cy = marginY + Math.random() * (canvas.height - 2 * marginY);

            const targets = getShapeTargets(NODE_COUNT, canvas.width, canvas.height, cx, cy);
            nodesRef.current.forEach((n, i) => {
                const t = targets[i % targets.length];
                n.tx = t.x;
                n.ty = t.y;
                n.lerping = true;
            });
            shapeTimerRef.current = setTimeout(() => {
                // Release back to wandering
                nodesRef.current.forEach(n => {
                    n.tx = n.baseX;
                    n.ty = n.baseY;
                    n.lerping = false;
                });
                shapingRef.current = false;
                shapeTimerRef.current = setTimeout(triggerShape, SHAPE_INTERVAL_MS);
            }, SHAPE_DURATION_MS);
        };
        shapeTimerRef.current = setTimeout(triggerShape, SHAPE_INTERVAL_MS);

        const isDark = () => document.documentElement.getAttribute('data-theme') === 'dark';

        const draw = () => {
            if (!canvas || !ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const dark = isDark();
            const nodeRGB = dark ? '200,210,225' : '51,65,85';
            const mouse = mouseRef.current;
            const nodes = nodesRef.current;

            nodes.forEach(n => {
                if (n.lerping) {
                    // Lerp toward shape target
                    n.x += (n.tx - n.x) * LERP_SPEED;
                    n.y += (n.ty - n.y) * LERP_SPEED;
                } else {
                    // Wander
                    n.x += n.vx;
                    n.y += n.vy;
                    if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
                    if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
                    // Update base so release target is current position
                    n.baseX = n.x;
                    n.baseY = n.y;

                    // Mouse repulsion
                    const dx = n.x - mouse.x;
                    const dy = n.y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < MOUSE_REPEL_RADIUS && dist > 0) {
                        const force = (1 - dist / MOUSE_REPEL_RADIUS) * MOUSE_REPEL_STRENGTH;
                        n.x += (dx / dist) * force;
                        n.y += (dy / dist) * force;
                    }
                }
            });

            // Draw edges
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < CONNECTION_DIST) {
                        const alpha = (1 - dist / CONNECTION_DIST) * (shapingRef.current ? 0.35 : 0.18);
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.strokeStyle = `rgba(${nodeRGB},${alpha})`;
                        ctx.lineWidth = shapingRef.current ? 1.2 : 0.8;
                        ctx.stroke();
                    }
                }
            }

            // Draw nodes — glow when shaping
            nodes.forEach(n => {
                if (shapingRef.current) {
                    ctx.shadowBlur = 8;
                    ctx.shadowColor = `rgba(${nodeRGB},0.5)`;
                }
                ctx.beginPath();
                ctx.arc(n.x, n.y, n.radius * (shapingRef.current ? 1.6 : 1), 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${nodeRGB},${n.opacity})`;
                ctx.fill();
                ctx.shadowBlur = 0;
            });

            animRef.current = requestAnimationFrame(draw);
        };

        animRef.current = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(animRef.current);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseleave', onMouseLeave);
            if (shapeTimerRef.current) clearTimeout(shapeTimerRef.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            style={{
                position: 'fixed',
                top: 0, left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 0,
                pointerEvents: 'none',
                opacity: 0.85,
            }}
        />
    );
};

export default NetworkBackground;
