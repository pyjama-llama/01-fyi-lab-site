const STORAGE_KEY = "fyi-lab-theme";

const ORIGAMI_SHAPE = "crane";

const prefersReducedMotion = window.matchMedia
  ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
  : false;

let aurora = null;

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const label = document.querySelector("[data-theme-label]");
  if (label) {
    label.textContent = theme === "dark" ? "Dark" : "Grey";
  }
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    return;
  }

  if (aurora) {
    aurora.requestRedraw();
  }
}

function getSavedTheme() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function initTheme() {
  const saved = getSavedTheme();
  const theme = saved === "dark" ? "dark" : "grey";
  setTheme(theme);
}

function initToggle() {
  const btn = document.querySelector("[data-theme-toggle]");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const current = document.documentElement.dataset.theme;
    const next = current === "dark" ? "grey" : "dark";
    setTheme(next);
  });
}

function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function createAuroraBackground() {
  const canvas = document.createElement("canvas");
  canvas.className = "bg-canvas";
  canvas.setAttribute("aria-hidden", "true");
  canvas.tabIndex = -1;

  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return null;

  const state = {
    canvas,
    ctx,
    dpr: 1,
    width: 0,
    height: 0,
    nodes: [],
    mesh: {
      cols: 0,
      rows: 0,
      points: [],
      shape: {
        name: ORIGAMI_SHAPE,
        meshW: 0,
        meshH: 0,
        outline: [],
        creases: [],
      },
      pose: {
        x: 0,
        y: 0,
        rot: 0,
        alpha: 0,
      },
      motion: {
        fromX: 0,
        fromY: 0,
        fromRot: 0,
        toX: 0,
        toY: 0,
        toRot: 0,
        segStart: 0,
        fadeInMs: 0,
        holdMs: 0,
        fadeOutMs: 0,
        hiddenMs: 0,
      },
    },
    targets: {
      fyiNorm: [],
      icelandNorm: [],
      current: [],
    },
    morph: {
      mode: "none",
      phaseStart: 0,
      inMs: 0,
      holdMs: 0,
      outMs: 0,
      strength: 0,
      seed: 0,
      participation: 0.38,
    },
    nextFYIAt: 0,
    nextIcelandAt: 0,
    rafId: null,
    running: false,
    t: 0,
    needsRedraw: true,
    mouse: {
      x: 0,
      y: 0,
      active: false,
    },
  };

  function getTheme() {
    return document.documentElement.dataset.theme === "dark" ? "dark" : "grey";
  }

  function getParams() {
    const theme = getTheme();
    return {
      theme,
      backgroundAlpha: theme === "dark" ? 0.55 : 0.42,
      nodeAlpha: theme === "dark" ? 0.55 : 0.45,
      lineAlpha: theme === "dark" ? 0.18 : 0.14,
      meshAlpha: theme === "dark" ? 0.20 : 0.14,
      maxDist: theme === "dark" ? 150 : 140,
      nodeCountScale: theme === "dark" ? 1.0 : 0.95,
    };
  }

  function getOrigamiShape(name, meshW, meshH) {
    if (name === "diamond") {
      return {
        outline: [
          { x: 0.0 * meshW, y: -0.46 * meshH },
          { x: 0.64 * meshW, y: 0.0 * meshH },
          { x: 0.0 * meshW, y: 0.46 * meshH },
          { x: -0.64 * meshW, y: 0.0 * meshH },
        ],
        creases: [
          [{ x: 0.0 * meshW, y: -0.46 * meshH }, { x: 0.0 * meshW, y: 0.46 * meshH }],
          [{ x: -0.64 * meshW, y: 0.0 * meshH }, { x: 0.64 * meshW, y: 0.0 * meshH }],
          [{ x: -0.32 * meshW, y: -0.23 * meshH }, { x: 0.32 * meshW, y: 0.23 * meshH }],
          [{ x: -0.32 * meshW, y: 0.23 * meshH }, { x: 0.32 * meshW, y: -0.23 * meshH }],
        ],
      };
    }

    if (name === "plane") {
      return {
        outline: [
          { x: -0.56 * meshW, y: -0.05 * meshH },
          { x: 0.68 * meshW, y: -0.26 * meshH },
          { x: 0.12 * meshW, y: 0.0 * meshH },
          { x: 0.68 * meshW, y: 0.26 * meshH },
          { x: -0.56 * meshW, y: 0.05 * meshH },
        ],
        creases: [
          [{ x: -0.56 * meshW, y: -0.05 * meshH }, { x: 0.12 * meshW, y: 0.0 * meshH }],
          [{ x: 0.12 * meshW, y: 0.0 * meshH }, { x: 0.68 * meshW, y: -0.26 * meshH }],
          [{ x: 0.12 * meshW, y: 0.0 * meshH }, { x: 0.68 * meshW, y: 0.26 * meshH }],
          [{ x: -0.56 * meshW, y: 0.05 * meshH }, { x: 0.12 * meshW, y: 0.0 * meshH }],
        ],
      };
    }

    if (name === "iceland") {
      const pts = [
        [0.10, 0.42],
        [0.16, 0.32],
        [0.26, 0.22],
        [0.40, 0.20],
        [0.52, 0.16],
        [0.64, 0.18],
        [0.76, 0.22],
        [0.88, 0.30],
        [0.86, 0.44],
        [0.78, 0.56],
        [0.82, 0.70],
        [0.72, 0.78],
        [0.60, 0.82],
        [0.46, 0.84],
        [0.34, 0.80],
        [0.24, 0.74],
        [0.18, 0.64],
        [0.12, 0.56],
      ];

      const sx = 1.12;
      const sy = 1.22;
      const outline = pts.map((p) => ({
        x: (p[0] - 0.5) * meshW * sx,
        y: (p[1] - 0.5) * meshH * sy,
      }));

      const creases = [
        [{ x: -0.45 * meshW, y: -0.10 * meshH }, { x: 0.50 * meshW, y: 0.12 * meshH }],
        [{ x: -0.38 * meshW, y: 0.18 * meshH }, { x: 0.44 * meshW, y: -0.18 * meshH }],
        [{ x: -0.10 * meshW, y: -0.46 * meshH }, { x: 0.10 * meshW, y: 0.46 * meshH }],
      ];

      return { outline, creases };
    }

    return {
      outline: [
        { x: 0.98 * meshW, y: 0.0 * meshH },
        { x: 0.80 * meshW, y: -0.05 * meshH },
        { x: 0.62 * meshW, y: -0.14 * meshH },
        { x: 0.36 * meshW, y: -0.44 * meshH },
        { x: 0.10 * meshW, y: -0.10 * meshH },
        { x: -0.72 * meshW, y: -0.26 * meshH },
        { x: -0.86 * meshW, y: 0.0 * meshH },
        { x: -0.72 * meshW, y: 0.26 * meshH },
        { x: 0.10 * meshW, y: 0.10 * meshH },
        { x: 0.36 * meshW, y: 0.44 * meshH },
        { x: 0.62 * meshW, y: 0.14 * meshH },
        { x: 0.80 * meshW, y: 0.05 * meshH },
      ],
      creases: [
        [{ x: -0.86 * meshW, y: 0.0 * meshH }, { x: 0.98 * meshW, y: 0.0 * meshH }],
        [{ x: 0.10 * meshW, y: 0.0 * meshH }, { x: 0.36 * meshW, y: -0.44 * meshH }],
        [{ x: 0.10 * meshW, y: 0.0 * meshH }, { x: 0.36 * meshW, y: 0.44 * meshH }],
        [{ x: 0.62 * meshW, y: -0.14 * meshH }, { x: 0.80 * meshW, y: -0.05 * meshH }],
        [{ x: 0.62 * meshW, y: 0.14 * meshH }, { x: 0.80 * meshW, y: 0.05 * meshH }],
        [{ x: -0.72 * meshW, y: -0.26 * meshH }, { x: -0.72 * meshW, y: 0.26 * meshH }],
        [{ x: 0.10 * meshW, y: -0.10 * meshH }, { x: 0.10 * meshW, y: 0.10 * meshH }],
      ],
    };
  }

  function setOrigamiShape(name) {
    const meshW = state.mesh.shape.meshW;
    const meshH = state.mesh.shape.meshH;
    const shape = getOrigamiShape(name, meshW, meshH);
    state.mesh.shape.name = name;
    state.mesh.shape.outline = shape.outline;
    state.mesh.shape.creases = shape.creases;
  }

  function nextOrigamiShapeName(current) {
    if (current === "crane") return "iceland";
    return "crane";
  }

  function createOffscreen(w, h) {
    const c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    const cctx = c.getContext("2d", { willReadFrequently: true });
    if (!cctx) return null;
    return { c, cctx };
  }

  function samplePointsFromCanvas(cctx, w, h, count) {
    const img = cctx.getImageData(0, 0, w, h);
    const data = img.data;

    const candidates = [];
    for (let y = 0; y < h; y += 2) {
      for (let x = 0; x < w; x += 2) {
        const a = data[(y * w + x) * 4 + 3];
        if (a > 40) {
          candidates.push({
            x: (x + Math.random()) / w,
            y: (y + Math.random()) / h,
          });
        }
      }
    }

    if (candidates.length === 0) return [];

    const out = [];
    for (let i = 0; i < count; i++) {
      out.push(candidates[i % candidates.length]);
    }
    return out;
  }

  function buildFYITargets(count) {
    const off = createOffscreen(420, 180);
    if (!off) return [];

    const { cctx } = off;
    cctx.clearRect(0, 0, 420, 180);
    cctx.fillStyle = "#000";
    cctx.textAlign = "center";
    cctx.textBaseline = "middle";
    cctx.font = "800 120px Inter, system-ui, sans-serif";
    cctx.fillText("FYI", 210, 96);

    return samplePointsFromCanvas(cctx, 420, 180, count);
  }

  function buildIcelandTargets(count) {
    const off = createOffscreen(360, 240);
    if (!off) return [];

    const { cctx } = off;
    cctx.clearRect(0, 0, 360, 240);
    cctx.fillStyle = "#000";

    const pts = [
      [0.10, 0.42],
      [0.16, 0.32],
      [0.26, 0.22],
      [0.40, 0.20],
      [0.52, 0.16],
      [0.64, 0.18],
      [0.76, 0.22],
      [0.88, 0.30],
      [0.86, 0.44],
      [0.78, 0.56],
      [0.82, 0.70],
      [0.72, 0.78],
      [0.60, 0.82],
      [0.46, 0.84],
      [0.34, 0.80],
      [0.24, 0.74],
      [0.18, 0.64],
      [0.12, 0.56],
    ];

    cctx.beginPath();
    for (let i = 0; i < pts.length; i++) {
      const x = pts[i][0] * 360;
      const y = pts[i][1] * 240;
      if (i === 0) cctx.moveTo(x, y);
      else cctx.lineTo(x, y);
    }
    cctx.closePath();
    cctx.fill();

    return samplePointsFromCanvas(cctx, 360, 240, count);
  }

  function mapTargetsToViewport(normPts, box) {
    const { cx, cy, w, h } = box;
    const out = [];
    for (let i = 0; i < normPts.length; i++) {
      const p = normPts[i];
      out.push({
        x: cx + (p.x - 0.5) * w,
        y: cy + (p.y - 0.5) * h,
      });
    }
    return out;
  }

  function pickFrom(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function randomBoxForMode(mode) {
    const w = state.width;
    const h = state.height;

    if (mode === "iceland") {
      const anchors = [
        { cx: 0.48, cy: 0.62 },
        { cx: 0.56, cy: 0.58 },
        { cx: 0.42, cy: 0.66 },
        { cx: 0.62, cy: 0.70 },
        { cx: 0.38, cy: 0.72 },
      ];
      const a = pickFrom(anchors);
      return {
        cx: w * (a.cx + (Math.random() - 0.5) * 0.06),
        cy: h * (a.cy + (Math.random() - 0.5) * 0.06),
        w: w * (0.58 + Math.random() * 0.10),
        h: h * (0.40 + Math.random() * 0.08),
      };
    }

    const anchors = [
      { cx: 0.35, cy: 0.28 },
      { cx: 0.50, cy: 0.30 },
      { cx: 0.65, cy: 0.26 },
      { cx: 0.40, cy: 0.40 },
      { cx: 0.62, cy: 0.42 },
    ];
    const a = pickFrom(anchors);
    return {
      cx: w * (a.cx + (Math.random() - 0.5) * 0.06),
      cy: h * (a.cy + (Math.random() - 0.5) * 0.06),
      w: w * (0.52 + Math.random() * 0.10),
      h: h * (0.22 + Math.random() * 0.06),
    };
  }

  function setTargetsForMode(mode) {
    const norm = mode === "iceland" ? state.targets.icelandNorm : state.targets.fyiNorm;
    if (!norm || norm.length === 0) {
      state.targets.current = [];
      return;
    }
    state.targets.current = mapTargetsToViewport(norm, randomBoxForMode(mode));
  }

  function startMorph(mode, now, opts) {
    setTargetsForMode(mode);
    state.morph.mode = mode;
    state.morph.phaseStart = now;
    state.morph.inMs = opts.inMs;
    state.morph.holdMs = opts.holdMs;
    state.morph.outMs = opts.outMs;
    state.morph.strength = opts.strength;
    state.morph.seed = Math.floor(Math.random() * 1_000_000);
    state.needsRedraw = true;
  }

  function morphWeight(now) {
    if (state.morph.mode === "none") return 0;
    const t = now - state.morph.phaseStart;
    const inMs = state.morph.inMs;
    const holdMs = state.morph.holdMs;
    const outMs = state.morph.outMs;

    if (t < 0) return 0;
    if (t <= inMs) return easeInOutCubic(t / inMs);
    if (t <= inMs + holdMs) return 1;
    if (t <= inMs + holdMs + outMs) {
      const u = (t - inMs - holdMs) / outMs;
      return 1 - easeInOutCubic(u);
    }

    state.morph.mode = "none";
    return 0;
  }

  function initMesh() {
    const { width: w, height: h } = state;

    const cols = Math.floor(clamp(w / 130, 7, 11));
    const rows = Math.floor(clamp(h / 160, 6, 10));
    const points = [];

    const meshW = clamp(Math.min(w, h) * 0.72, 240, 560);
    const meshH = meshW * 0.62;

    state.mesh.shape.meshW = meshW;
    state.mesh.shape.meshH = meshH;
    setOrigamiShape(state.mesh.shape.name);

    const motion = state.mesh.motion;
    const now = performance.now();
    const initial = randomMeshPose(w, h);
    const next = randomMeshPose(w, h);
    motion.fromX = initial.x;
    motion.fromY = initial.y;
    motion.fromRot = initial.rot;
    motion.toX = next.x;
    motion.toY = next.y;
    motion.toRot = next.rot;
    motion.segStart = now;
    motion.fadeInMs = 1200;
    motion.holdMs = 5200 + Math.random() * 5200;
    motion.fadeOutMs = 1400;
    motion.hiddenMs = 1200 + Math.random() * 2400;

    state.mesh.pose.x = initial.x;
    state.mesh.pose.y = initial.y;
    state.mesh.pose.rot = initial.rot;
    state.mesh.pose.alpha = prefersReducedMotion ? 0.55 : 0;

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const nx = cols === 1 ? 0.5 : x / (cols - 1);
        const ny = rows === 1 ? 0.5 : y / (rows - 1);

        const px = (nx - 0.5) * meshW + (Math.random() - 0.5) * 18;
        const py = (ny - 0.5) * meshH + (Math.random() - 0.5) * 18;

        points.push({
          baseX: px,
          baseY: py,
          x: 0,
          y: 0,
          ax: 10 + Math.random() * 14,
          ay: 10 + Math.random() * 14,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    state.mesh.cols = cols;
    state.mesh.rows = rows;
    state.mesh.points = points;
    

    if (prefersReducedMotion) {
      const cos = Math.cos(state.mesh.pose.rot);
      const sin = Math.sin(state.mesh.pose.rot);
      const cx = state.mesh.pose.x;
      const cy = state.mesh.pose.y;

      for (let i = 0; i < state.mesh.points.length; i++) {
        const p = state.mesh.points[i];
        const lx = p.baseX;
        const ly = p.baseY;
        p.x = cx + lx * cos - ly * sin;
        p.y = cy + lx * sin + ly * cos;
      }
    }
  }

  function randomMeshPose(w, h) {
    const anchors = [
      { x: 0.28, y: 0.26 },
      { x: 0.72, y: 0.26 },
      { x: 0.22, y: 0.52 },
      { x: 0.78, y: 0.52 },
      { x: 0.34, y: 0.78 },
      { x: 0.66, y: 0.78 },
    ];
    const a = pickFrom(anchors);
    const jitter = 0.05;
    const px = w * (a.x + (Math.random() - 0.5) * jitter);
    const py = h * (a.y + (Math.random() - 0.5) * jitter);
    const rot = (Math.random() - 0.5) * 1.4;
    return { x: px, y: py, rot };
  }

  function updateMesh(t) {
    if (prefersReducedMotion) return;

    const m = state.mesh.motion;

    const elapsed = t - m.segStart;
    const moveMs = m.fadeInMs + m.holdMs + m.fadeOutMs;
    const totalMs = moveMs + m.hiddenMs;

    if (elapsed > totalMs) {
      setOrigamiShape(nextOrigamiShapeName(state.mesh.shape.name));
      m.fromX = m.toX;
      m.fromY = m.toY;
      m.fromRot = m.toRot;
      const next = randomMeshPose(state.width, state.height);
      m.toX = next.x;
      m.toY = next.y;
      m.toRot = next.rot;
      m.segStart = t;
      m.fadeInMs = 1200;
      m.holdMs = 5200 + Math.random() * 5200;
      m.fadeOutMs = 1400;
      m.hiddenMs = 1200 + Math.random() * 2400;
    }

    const uMove = easeInOutCubic(clamp(elapsed / moveMs, 0, 1));
    const cx = lerp(m.fromX, m.toX, uMove);
    const cy = lerp(m.fromY, m.toY, uMove);
    const rot = lerp(m.fromRot, m.toRot, uMove);
    const cos = Math.cos(rot);
    const sin = Math.sin(rot);

    let fade = 0;
    if (elapsed < m.fadeInMs) {
      fade = easeInOutCubic(clamp(elapsed / m.fadeInMs, 0, 1));
    } else if (elapsed < m.fadeInMs + m.holdMs) {
      fade = 1;
    } else if (elapsed < m.fadeInMs + m.holdMs + m.fadeOutMs) {
      const uOut = (elapsed - m.fadeInMs - m.holdMs) / m.fadeOutMs;
      fade = 1 - easeInOutCubic(clamp(uOut, 0, 1));
    } else {
      fade = 0;
    }

    state.mesh.pose.x = cx;
    state.mesh.pose.y = cy;
    state.mesh.pose.rot = rot;
    state.mesh.pose.alpha = fade;

    const speed = 0.00035;
    for (let i = 0; i < state.mesh.points.length; i++) {
      const p = state.mesh.points[i];
      const lx = p.baseX + Math.sin(t * speed + p.phase) * p.ax;
      const ly = p.baseY + Math.cos(t * speed * 0.9 + p.phase) * p.ay;
      p.x = cx + lx * cos - ly * sin;
      p.y = cy + lx * sin + ly * cos;
    }
  }

  function drawMesh(hue, params) {
    const { cols, rows, points } = state.mesh;
    if (!cols || !rows || points.length === 0) return;

    const fade = prefersReducedMotion ? 0.55 : state.mesh.pose.alpha;
    if (fade <= 0.01) return;

    const theme = params.theme;
    const alpha = params.meshAlpha * fade;
    const light = theme === "dark" ? 62 : 52;

    const cos = Math.cos(state.mesh.pose.rot);
    const sin = Math.sin(state.mesh.pose.rot);
    const cx = state.mesh.pose.x;
    const cy = state.mesh.pose.y;

    const outline = state.mesh.shape.outline;
    if (!outline || outline.length < 3) return;

    const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(state.width, state.height) * 0.16);
    glow.addColorStop(0, `hsla(${hue + 35}, 85%, ${theme === "dark" ? 62 : 58}%, ${0.18 * fade})`);
    glow.addColorStop(0.55, `hsla(${hue + 70}, 85%, ${theme === "dark" ? 58 : 56}%, ${0.07 * fade})`);
    glow.addColorStop(1, "rgba(0,0,0,0)");
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(cx, cy, Math.max(state.width, state.height) * 0.16, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.save();

    ctx.beginPath();
    for (let i = 0; i < outline.length; i++) {
      const p = outline[i];
      const x = cx + p.x * cos - p.y * sin;
      const y = cy + p.x * sin + p.y * cos;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();

    ctx.fillStyle = `hsla(${hue + 24}, 72%, ${theme === "dark" ? 62 : 54}%, ${0.14 * fade})`;
    ctx.fill();

    ctx.clip();

    ctx.lineWidth = 1.05;
    ctx.strokeStyle = `hsla(${hue + 40}, 60%, ${light}%, ${alpha})`;

    const idx = (x, y) => y * cols + x;

    for (let y = 0; y < rows - 1; y++) {
      for (let x = 0; x < cols - 1; x++) {
        const p00 = points[idx(x, y)];
        const p10 = points[idx(x + 1, y)];
        const p01 = points[idx(x, y + 1)];
        const p11 = points[idx(x + 1, y + 1)];

        ctx.beginPath();
        ctx.moveTo(p00.x, p00.y);
        ctx.lineTo(p10.x, p10.y);
        ctx.lineTo(p01.x, p01.y);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(p10.x, p10.y);
        ctx.lineTo(p11.x, p11.y);
        ctx.lineTo(p01.x, p01.y);
        ctx.closePath();
        ctx.stroke();
      }
    }

    ctx.restore();

    const outlineAlpha = Math.min(0.55, alpha * 2.2);
    ctx.lineWidth = 1.6;
    ctx.strokeStyle = `hsla(${hue + 35}, 70%, ${theme === "dark" ? 70 : 55}%, ${outlineAlpha})`;
    ctx.beginPath();
    for (let i = 0; i < outline.length; i++) {
      const p = outline[i];
      const x = cx + p.x * cos - p.y * sin;
      const y = cy + p.x * sin + p.y * cos;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();

    const creaseAlpha = Math.min(0.4, alpha * 1.6);
    ctx.lineWidth = 1.15;
    ctx.strokeStyle = `hsla(${hue + 10}, 55%, ${theme === "dark" ? 68 : 54}%, ${creaseAlpha})`;
    const creases = state.mesh.shape.creases;
    for (let i = 0; i < creases.length; i++) {
      const a = creases[i][0];
      const b = creases[i][1];
      const ax = cx + a.x * cos - a.y * sin;
      const ay = cy + a.x * sin + a.y * cos;
      const bx = cx + b.x * cos - b.y * sin;
      const by = cy + b.x * sin + b.y * cos;
      ctx.beginPath();
      ctx.moveTo(ax, ay);
      ctx.lineTo(bx, by);
      ctx.stroke();
    }
  }

  function initNodes() {
    const { width: w, height: h } = state;
    const params = getParams();

    const target = Math.floor(clamp((w * h) / 18000, 26, 90) * params.nodeCountScale);
    const count = prefersReducedMotion ? Math.min(24, target) : target;

    const next = [];
    for (let i = 0; i < count; i++) {
      next.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: 1 + Math.random() * 1.6,
        tx: null,
        ty: null,
      });
    }
    state.nodes = next;
  }

  function buildTargets() {
    const count = state.nodes.length;
    if (count === 0) return;

    state.targets.fyiNorm = buildFYITargets(count);
    state.targets.icelandNorm = buildIcelandTargets(count);

    if (state.morph.mode !== "none") {
      setTargetsForMode(state.morph.mode);
    }
  }

  function resize() {
    const dpr = clamp(window.devicePixelRatio || 1, 1, 2);
    const w = Math.floor(window.innerWidth);
    const h = Math.floor(window.innerHeight);

    state.dpr = dpr;
    state.width = w;
    state.height = h;

    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    initNodes();
    buildTargets();
    state.needsRedraw = true;
  }

  function auroraHue(t) {
    const base = 170;
    const swing = 95;
    return base + swing * Math.sin(t * 0.00035);
  }

  function drawBackgroundGlow(hue, params) {
    const { width: w, height: h } = state;

    const g1 = ctx.createRadialGradient(w * 0.7, h * 0.15, 0, w * 0.7, h * 0.15, Math.max(w, h) * 0.55);
    g1.addColorStop(0, `hsla(${hue}, 85%, 60%, ${0.14 * params.backgroundAlpha})`);
    g1.addColorStop(0.6, `hsla(${hue + 25}, 80%, 55%, ${0.06 * params.backgroundAlpha})`);
    g1.addColorStop(1, "rgba(0,0,0,0)");

    const g2 = ctx.createRadialGradient(w * 0.25, h * 0.65, 0, w * 0.25, h * 0.65, Math.max(w, h) * 0.55);
    g2.addColorStop(0, `hsla(${hue + 80}, 85%, 62%, ${0.12 * params.backgroundAlpha})`);
    g2.addColorStop(0.7, `hsla(${hue + 35}, 80%, 56%, ${0.05 * params.backgroundAlpha})`);
    g2.addColorStop(1, "rgba(0,0,0,0)");

    ctx.fillStyle = g1;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = g2;
    ctx.fillRect(0, 0, w, h);
  }

  function render() {
    if (!state.needsRedraw && prefersReducedMotion) return;
    state.needsRedraw = false;

    const params = getParams();
    const { width: w, height: h, nodes } = state;
    const theme = params.theme;

    ctx.clearRect(0, 0, w, h);

    const hue = auroraHue(state.t);
    drawBackgroundGlow(hue, params);

    const maxDist = params.maxDist;
    const maxDist2 = maxDist * maxDist;
    const mx = state.mouse.x;
    const my = state.mouse.y;
    const mouseActive = state.mouse.active;
    const mouseRadius = 150;
    const mouseRadius2 = mouseRadius * mouseRadius;

    const mw = prefersReducedMotion ? 0 : morphWeight(state.t);
    const targets = mw > 0.001 ? state.targets.current : null;

    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];

      if (!prefersReducedMotion) {
        if (targets && targets[i]) {
          const pick = (((i * 9301 + state.morph.seed) >>> 0) % 10_000) / 10_000;
          if (pick < state.morph.participation) {
            const tx = targets[i].x;
            const ty = targets[i].y;
            const k = state.morph.strength * mw;
            n.vx += (tx - n.x) * k;
            n.vy += (ty - n.y) * k;
          }
        }

        if (mouseActive) {
          const dx = n.x - mx;
          const dy = n.y - my;
          const d2 = dx * dx + dy * dy;
          if (d2 < mouseRadius2 && d2 > 0.0001) {
            const d = Math.sqrt(d2);
            const strength = (1 - d / mouseRadius) * 0.018;
            n.vx += (dx / d) * strength;
            n.vy += (dy / d) * strength;
          }
        }

        n.x += n.vx;
        n.y += n.vy;

        const maxV = 1.25;
        const v2 = n.vx * n.vx + n.vy * n.vy;
        if (v2 > maxV * maxV) {
          const s = maxV / Math.sqrt(v2);
          n.vx *= s;
          n.vy *= s;
        }
        n.vx *= 0.985;
        n.vy *= 0.985;

        if (n.x < -40) n.x = w + 40;
        if (n.x > w + 40) n.x = -40;
        if (n.y < -40) n.y = h + 40;
        if (n.y > h + 40) n.y = -40;
      }
    }

    ctx.lineWidth = 1;
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 > maxDist2) continue;

        const d = Math.sqrt(d2);
        const t = 1 - d / maxDist;
        const alpha = t * t * params.lineAlpha;

        const lineHue = hue + (j % 3 === 0 ? 70 : 0);
        ctx.strokeStyle = `hsla(${lineHue}, 85%, ${theme === "dark" ? 62 : 56}%, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }

    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      const wobble = 10 * Math.sin(state.t * 0.0006 + i);
      const nodeHue = hue + wobble;
      ctx.fillStyle = `hsla(${nodeHue}, 90%, ${theme === "dark" ? 70 : 62}%, ${params.nodeAlpha})`;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function tick(now) {
    state.rafId = requestAnimationFrame(tick);
    if (!state.running) return;
    state.t = now;

    if (!prefersReducedMotion) {
      if (state.morph.mode === "none") {
        if (state.nextIcelandAt && now > state.nextIcelandAt) {
          startMorph("iceland", now, {
            inMs: 4200,
            holdMs: 2400,
            outMs: 6200,
            strength: 0.0021,
          });
          state.nextIcelandAt = now + 55_000 + Math.random() * 35_000;
        } else if (state.nextFYIAt && now > state.nextFYIAt) {
          startMorph("fyi", now, {
            inMs: 3800,
            holdMs: 1900,
            outMs: 5600,
            strength: 0.0023,
          });
          state.nextFYIAt = now + 70_000 + Math.random() * 50_000;
        }
      }
    }

    render();
  }

  function start() {
    if (state.running) return;
    state.running = true;
    if (state.rafId == null) {
      state.rafId = requestAnimationFrame(tick);
    }
  }

  function stop() {
    state.running = false;
  }

  function requestRedraw() {
    state.needsRedraw = true;
    if (prefersReducedMotion) {
      render();
    }
  }

  resize();

  if (!prefersReducedMotion) {
    const now = performance.now();
    state.nextIcelandAt = now + 30_000;
    state.nextFYIAt = now + 12_000;
  }

  const onResize = () => resize();
  window.addEventListener("resize", onResize, { passive: true });

  const onPointerMove = (e) => {
    state.mouse.active = true;
    state.mouse.x = e.clientX;
    state.mouse.y = e.clientY;
  };
  const onPointerLeave = () => {
    state.mouse.active = false;
  };
  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("pointerleave", onPointerLeave, { passive: true });

  const onVisibilityChange = () => {
    if (document.hidden) {
      stop();
    } else {
      requestRedraw();
      start();
    }
  };
  document.addEventListener("visibilitychange", onVisibilityChange);

  if (prefersReducedMotion) {
    state.t = performance.now();
    render();
    stop();
  } else {
    start();
  }

  return {
    canvas,
    requestRedraw,
  };
}

function initBackground() {
  if (document.querySelector(".bg-canvas")) return;
  const bg = createAuroraBackground();
  if (!bg) return;
  document.body.prepend(bg.canvas);
  aurora = bg;
}

initTheme();
initToggle();
initBackground();
