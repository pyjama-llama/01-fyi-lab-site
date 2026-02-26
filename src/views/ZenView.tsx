import { useState, useEffect, useRef, useCallback } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────
type Duration = 1 | 2 | 5;
type Sound = 'wind' | 'rain' | 'space' | 'silence';
type Phase = 'idle' | 'inhale' | 'hold' | 'exhale' | 'rest' | 'complete';

// ─── Guided meditation steps ───────────────────────────────────────────────────
interface Step {
    phase: Phase;
    text: string;
    duration: number; // seconds
}

function buildSteps(totalMinutes: Duration): Step[] {
    const cycles = totalMinutes === 1 ? 3 : totalMinutes === 2 ? 7 : 18;
    const breathCycle: Step[] = [
        { phase: 'inhale', text: 'Breathe in…', duration: 4 },
        { phase: 'hold', text: 'Hold…', duration: 2 },
        { phase: 'exhale', text: 'Breathe out…', duration: 6 },
        { phase: 'rest', text: '…', duration: 2 },
    ];
    const intro: Step[] = [
        {
            phase: 'idle', text: 'Find a comfortable position.\nClose your eyes if you like.', duration: 4
        },
        { phase: 'idle', text: 'Let go of whatever you were doing.\nYou are here now.', duration: 5 },
    ];
    const outro: Step[] = [
        { phase: 'idle', text: 'Gently return to the room.', duration: 4 },
        { phase: 'complete', text: 'You did well.\nTake your time.', duration: 9999 },
    ];
    const repeated: Step[] = Array.from({ length: cycles }).flatMap(() => breathCycle);
    return [...intro, ...repeated, ...outro];
}

// ─── Aurora canvas ─────────────────────────────────────────────────────────────
function useAurora(canvasRef: React.RefObject<HTMLCanvasElement | null>, active: boolean) {
    const animRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
        resize();
        window.addEventListener('resize', resize);

        const waves = Array.from({ length: 4 }, (_, i) => ({
            baseY: canvas.height * (0.3 + i * 0.12),
            amplitude: 80 + i * 30,
            speed: 0.00008 + i * 0.00005,  // much slower — dreamlike drift
            hue: 160 + i * 40,
            phase: Math.random() * Math.PI * 2,
        }));

        let t = 0;
        const draw = () => {
            if (!active) { animRef.current = requestAnimationFrame(draw); return; }
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            waves.forEach(w => {
                ctx.beginPath();
                for (let x = 0; x <= canvas.width; x += 4) {
                    const y = w.baseY + Math.sin(x * 0.006 + t * w.speed * 180 + w.phase) * w.amplitude
                        + Math.sin(x * 0.002 + t * w.speed * 70) * w.amplitude * 0.35;
                    x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
                }
                ctx.lineTo(canvas.width, canvas.height);
                ctx.lineTo(0, canvas.height);
                ctx.closePath();
                const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
                grad.addColorStop(0, `hsla(${w.hue}, 80%, 65%, 0.07)`);
                grad.addColorStop(0.5, `hsla(${w.hue + 20}, 70%, 55%, 0.12)`);
                grad.addColorStop(1, `hsla(${w.hue + 40}, 60%, 45%, 0.04)`);
                ctx.fillStyle = grad;
                ctx.fill();
            });

            t++;
            animRef.current = requestAnimationFrame(draw);
        };

        animRef.current = requestAnimationFrame(draw);
        return () => { cancelAnimationFrame(animRef.current); window.removeEventListener('resize', resize); };
    }, [active]);
}

// ─── Synthesized ambient audio ─────────────────────────────────────────────────
function useAmbientAudio(sound: Sound, active: boolean) {
    const ctxRef = useRef<AudioContext | null>(null);
    const nodesRef = useRef<AudioNode[]>([]);

    const stop = useCallback(() => {
        nodesRef.current.forEach(n => { try { (n as AudioScheduledSourceNode).stop?.(); } catch { } });
        nodesRef.current = [];
        ctxRef.current?.close();
        ctxRef.current = null;
    }, []);

    const start = useCallback(() => {
        stop();
        if (sound === 'silence') return;

        const ac = new AudioContext();
        ctxRef.current = ac;

        if (sound === 'rain') {
            // White noise → highpass filter → reverb-like gain
            const buf = ac.createBuffer(1, ac.sampleRate * 2, ac.sampleRate);
            const data = buf.getChannelData(0);
            for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * 0.15;
            const src = ac.createBufferSource();
            src.buffer = buf; src.loop = true;
            const hp = ac.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 3000;
            const lp = ac.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 8000;
            const gain = ac.createGain(); gain.gain.value = 0.4;
            src.connect(hp).connect(lp).connect(gain).connect(ac.destination);
            src.start();
            nodesRef.current = [src];
        }

        if (sound === 'wind') {
            // Filtered noise + slow LFO modulation
            const buf = ac.createBuffer(1, ac.sampleRate * 3, ac.sampleRate);
            const data = buf.getChannelData(0);
            for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1);
            const src = ac.createBufferSource();
            src.buffer = buf; src.loop = true;
            const bp = ac.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 400; bp.Q.value = 0.5;
            const gain = ac.createGain(); gain.gain.value = 0.18;
            // LFO on gain for gusting
            const lfo = ac.createOscillator(); lfo.frequency.value = 0.08;
            const lfoGain = ac.createGain(); lfoGain.gain.value = 0.08;
            lfo.connect(lfoGain).connect(gain.gain);
            lfo.start(); src.start();
            src.connect(bp).connect(gain).connect(ac.destination);
            nodesRef.current = [src, lfo];
        }

        if (sound === 'space') {
            // Very low drone + slow oscillator harmonics
            [55, 110, 165].forEach((freq, i) => {
                const osc = ac.createOscillator();
                osc.type = 'sine'; osc.frequency.value = freq;
                const gain = ac.createGain(); gain.gain.value = 0.06 - i * 0.015;
                // Slow tremolo
                const lfo = ac.createOscillator(); lfo.frequency.value = 0.05 + i * 0.03;
                const lg = ac.createGain(); lg.gain.value = 0.03;
                lfo.connect(lg).connect(gain.gain);
                osc.connect(gain).connect(ac.destination);
                osc.start(); lfo.start();
                nodesRef.current.push(osc, lfo);
            });
        }
    }, [sound, stop]);

    useEffect(() => {
        if (active) start(); else stop();
        return stop;
    }, [active, start, stop]);
}

// ─── Component ────────────────────────────────────────────────────────────────
const ZenView: React.FC = () => {
    const [duration, setDuration] = useState<Duration>(5);
    const [sound, setSound] = useState<Sound>('rain');
    const [running, setRunning] = useState(false);
    const [stepIndex, setStepIndex] = useState(0);
    const [steps, setSteps] = useState<Step[]>([]);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    useAurora(canvasRef, running);
    useAmbientAudio(sound, running);

    // Timer tick — advance to next step after the current step's duration
    useEffect(() => {
        if (!running || steps.length === 0) return;
        const current = steps[stepIndex];
        if (!current || current.phase === 'complete') return;

        const timer = setTimeout(() => {
            setStepIndex(i => Math.min(i + 1, steps.length - 1));
        }, current.duration * 1000);

        return () => clearTimeout(timer);
    }, [running, stepIndex, steps]);

    const handleStart = () => {
        const s = buildSteps(duration);
        setSteps(s);
        setStepIndex(0);
        setRunning(true);
    };

    const handleStop = () => {
        setRunning(false);
        setStepIndex(0);
        setSteps([]);
    };

    const currentStep = steps[stepIndex];
    const isComplete = currentStep?.phase === 'complete';

    // Breathing ring scale
    const breathScale = currentStep?.phase === 'inhale' ? 1.6
        : currentStep?.phase === 'hold' ? 1.55
            : currentStep?.phase === 'exhale' ? 1.0
                : 1.0;

    return (
        <div style={{
            position: 'relative',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
        }}>
            {/* Aurora background */}
            <canvas ref={canvasRef} aria-hidden="true" style={{
                position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none',
            }} />

            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '40px 24px', maxWidth: '520px' }}>

                {!running ? (
                    // ── Setup screen ──────────────────────────────────────────────────
                    <>
                        <p className="kicker" style={{ letterSpacing: '0.2em', opacity: 0.6 }}>ZEN GARDEN</p>
                        <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', letterSpacing: '-0.04em', margin: '12px 0 8px', fontWeight: 700 }}>
                            Take a breath.
                        </h1>
                        <p style={{ color: 'var(--muted)', fontSize: '17px', lineHeight: 1.65, marginBottom: '40px' }}>
                            A short, guided meditation. Choose how long, pick a sound, and let go.
                        </p>

                        {/* Duration */}
                        <div style={{ marginBottom: '24px' }}>
                            <p style={{ fontSize: '12px', fontFamily: 'var(--mono)', letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: '10px' }}>
                                DURATION
                            </p>
                            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                                {([1, 2, 5] as Duration[]).map(d => (
                                    <button
                                        key={d}
                                        onClick={() => setDuration(d)}
                                        style={{
                                            padding: '10px 22px',
                                            borderRadius: '999px',
                                            border: `1px solid ${duration === d ? 'var(--text)' : 'var(--border)'}`,
                                            background: duration === d ? 'var(--text)' : 'color-mix(in oklab, var(--surface) 90%, transparent)',
                                            color: duration === d ? 'var(--bg)' : 'var(--text)',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            fontSize: '15px',
                                        }}
                                    >
                                        {d} min
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Sound */}
                        <div style={{ marginBottom: '40px' }}>
                            <p style={{ fontSize: '12px', fontFamily: 'var(--mono)', letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: '10px' }}>
                                AMBIENT SOUND
                            </p>
                            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                                {(['wind', 'rain', 'space', 'silence'] as Sound[]).map(s => (
                                    <button
                                        key={s}
                                        onClick={() => setSound(s)}
                                        style={{
                                            padding: '10px 18px',
                                            borderRadius: '999px',
                                            border: `1px solid ${sound === s ? 'var(--text)' : 'var(--border)'}`,
                                            background: sound === s ? 'var(--text)' : 'color-mix(in oklab, var(--surface) 90%, transparent)',
                                            color: sound === s ? 'var(--bg)' : 'var(--text)',
                                            fontWeight: 500,
                                            cursor: 'pointer',
                                            fontSize: '13px',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '7px',
                                            letterSpacing: '0.02em',
                                        }}
                                    >
                                        {/* Inline SVG icons — minimal, organic, no emoji */}
                                        {s === 'wind' && (
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                                                <path d="M3 8c0 0 4-3 8 0s8 0 8 0" />
                                                <path d="M3 13c0 0 5-2 9 1" />
                                                <path d="M3 18c0 0 3-2 6 0" />
                                            </svg>
                                        )}
                                        {s === 'rain' && (
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                                                <path d="M4 14 Q6 8 12 8 Q18 8 20 14" />
                                                <line x1="8" y1="18" x2="7" y2="21" />
                                                <line x1="12" y1="18" x2="11" y2="21" />
                                                <line x1="16" y1="18" x2="15" y2="21" />
                                            </svg>
                                        )}
                                        {s === 'space' && (
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                                                <circle cx="12" cy="12" r="2" />
                                                <ellipse cx="12" cy="12" rx="9" ry="4" />
                                                <line x1="12" y1="3" x2="12" y2="5" />
                                                <line x1="12" y1="19" x2="12" y2="21" />
                                            </svg>
                                        )}
                                        {s === 'silence' && (
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                                                <path d="M3 12 Q6 8 9 12 Q12 16 15 12" strokeOpacity="0.4" />
                                                <line x1="17" y1="8" x2="21" y2="16" />
                                                <line x1="21" y1="8" x2="17" y2="16" />
                                            </svg>
                                        )}
                                        {s.charAt(0).toUpperCase() + s.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>


                        <button
                            onClick={handleStart}
                            style={{
                                padding: '14px 40px',
                                borderRadius: '999px',
                                border: '1px solid var(--border)',
                                background: 'var(--text)',
                                color: 'var(--bg)',
                                fontWeight: 700,
                                fontSize: '17px',
                                cursor: 'pointer',
                                letterSpacing: '-0.01em',
                            }}
                        >
                            Begin
                        </button>
                    </>
                ) : (
                    // ── Active meditation ───────────────────────────────────────────────
                    <>
                        {/* Breathing ring */}
                        {!isComplete && (
                            <div style={{
                                width: '140px', height: '140px',
                                borderRadius: '50%',
                                border: '2px solid rgba(150,220,200,0.4)',
                                margin: '0 auto 48px',
                                transform: `scale(${breathScale})`,
                                transition: `transform ${currentStep?.duration ?? 4}s ease-in-out`,
                                boxShadow: `0 0 40px rgba(150,220,200,0.15)`,
                            }} />
                        )}

                        {/* Instruction text */}
                        <p style={{
                            fontSize: 'clamp(22px, 4vw, 34px)',
                            fontWeight: 600,
                            letterSpacing: '-0.03em',
                            lineHeight: 1.4,
                            margin: '0 0 32px',
                            whiteSpace: 'pre-line',
                            minHeight: '3em',
                            transition: 'opacity 0.6s ease',
                        }}>
                            {currentStep?.text ?? ''}
                        </p>

                        {isComplete ? (
                            <button
                                onClick={handleStop}
                                style={{
                                    marginTop: '32px',
                                    padding: '12px 32px',
                                    borderRadius: '999px',
                                    border: '1px solid var(--border)',
                                    background: 'transparent',
                                    color: 'var(--muted)',
                                    fontSize: '15px',
                                    cursor: 'pointer',
                                }}
                            >
                                Return to site
                            </button>
                        ) : (
                            <button
                                onClick={handleStop}
                                style={{
                                    display: 'block',
                                    margin: '0 auto',
                                    padding: '10px 24px',
                                    borderRadius: '999px',
                                    border: '1px solid var(--border)',
                                    background: 'transparent',
                                    color: 'var(--muted)',
                                    fontSize: '13px',
                                    cursor: 'pointer',
                                }}
                            >
                                End session
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ZenView;
