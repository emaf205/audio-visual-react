/**
 * BROADCAST LIVE — 3D Geometric Audio-Reactive Studio Visualizer (v4.3.0)
 * 3 Pure, Monumental 3D Geometric Engines (Swiss Precision & Demoscene Kinetic Rigor):
 * 
 * 1. CH 01 // 3D GEODESIC SPECTRUM (Polyhedral Geodesic Sphere with Dual Orbital Gimbal Rings)
 * 2. CH 02 // 3D HYPER TESSERACT (4D-to-3D Stereographic Wireframe Hypercube with Quantum Shockwaves)
 * 3. CH 03 // 3D CYBER WARP TUNNEL (Infinite Hyperbolic Geometric Tunnel with Kinetic Audio Warp)
 * 
 * Zero Text on Canvas — Pure Hypnotic 3D Geometry — 60 FPS
 * Author: Emanuele BDC (EmaF205)
 */

class VisualEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.time = 0;
    this.themeIndex = 0;

    // 7 Curated Atmospheric Palettes with Rich Non-Black Backgrounds (emaf205 Art Direction)
    this.themes = [
      {
        name: 'COBALT HORIZON',
        primary: '#E2F1FF',      // Luminous Ice White
        secondary: '#00D4FF',    // Electric Cyan
        accent: '#64B5F6',       // Deep Sky Blue
        glow: 'rgba(0, 212, 255, 0.40)',
        bgTop: '#10223b',        // Deep Architectural Cobalt
        bgBottom: '#050d18'
      },
      {
        name: 'CAMPARI NOCTURNE',
        primary: '#FFF0F3',      // Soft Quartz
        secondary: '#FF0055',    // Intense Campari Magenta
        accent: '#FFA8B6',       // Rose Blush
        glow: 'rgba(255, 0, 85, 0.42)',
        bgTop: '#2e040c',        // Deep Burgundy Atmosphere
        bgBottom: '#100104'
      },
      {
        name: 'EMERALD SANCTUARY',
        primary: '#E8FFF5',      // Mint Optic White
        secondary: '#00FF9D',    // Neon Emerald
        accent: '#80E5B8',       // Seafoam Cyan
        glow: 'rgba(0, 255, 157, 0.40)',
        bgTop: '#06261a',        // Nordic Deep Pine
        bgBottom: '#010f0a'
      },
      {
        name: 'ELECTRIC INDIGO',
        primary: '#F5E8FF',      // Star White
        secondary: '#B829FF',    // Ultraviolet
        accent: '#00F5FF',       // Laser Cyan
        glow: 'rgba(184, 41, 255, 0.42)',
        bgTop: '#1e0c38',        // Cosmic Violet
        bgBottom: '#090314'
      },
      {
        name: 'SOLAR TITANIUM',
        primary: '#FFF8E7',      // Warm Cream White
        secondary: '#FF9100',    // Hyper Solar Amber
        accent: '#FFD166',       // Radiant Gold
        glow: 'rgba(255, 145, 0, 0.42)',
        bgTop: '#2c1505',        // Roasted Mocha
        bgBottom: '#0d0500'
      },
      {
        name: 'SWISS PAPER WHITE',
        isLight: true,
        primary: '#0A0A0A',      // Architectural Indian Ink
        secondary: '#E63946',    // Swiss Bauhaus Red
        accent: '#457B9D',       // Technical Drafting Blue
        glow: 'rgba(0, 0, 0, 0.15)',
        bgTop: '#F5F2EB',        // Warm Museum Paper
        bgBottom: '#E8E4DA'
      },
      {
        name: 'ACID OBSIDIAN',
        primary: '#CCFF00',      // Acid Lime
        secondary: '#FFFFFF',    // Optic White
        accent: '#00FF88',       // Neon Mint
        glow: 'rgba(204, 255, 0, 0.42)',
        bgTop: '#0c120c',        // Deep Forest Slate
        bgBottom: '#020502'
      }
    ];

    // 5 Pure 3D Geometric Engines (Selected for Maximum Kinetic Impact & Swiss Rigor)
    this.scenes = [
      { id: 'geodesic',    name: 'CH 01 // 3D GEODESIC SPECTRUM' },
      { id: 'tesseract',   name: 'CH 02 // 3D HYPER TESSERACT' },
      { id: 'tunnel',      name: 'CH 03 // 3D CYBER WARP TUNNEL' },
      { id: 'synchrotron', name: 'CH 04 // 3D QUANTUM SYNCHROTRON' },
      { id: 'monolith',    name: 'CH 05 // 3D MATRIX MONOLITH' }
    ];
    this.currentScene = 0;

    // Smoothed Audio Physics
    this.smoothVol = 0;
    this.smoothBass = 0;
    this.smoothMid = 0;
    this.smoothHigh = 0;

    // Motion Style Mode ('turbo' vs 'minimal')
    this.motionStyle = 'turbo';

    // Auto-random rotation timer
    this.isAutoRotate = false;
    this.autoRotateTimer = null;

    // Cinematic Engine Features (emaf205-web-cinematografico)
    this.transitionProgress = 0;
    this.grainPattern = null;
    this.initFilmGrain();

    // Initialize 3D Geometries
    this.initGeodesicSphere();
    this.initTesseract();
    this.initCyberTunnel();
    this.initSynchrotron();
    this.initMatrixMonolith();

    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  setMotionStyle(style) {
    this.motionStyle = (style === 'minimal') ? 'minimal' : 'turbo';
    return this.motionStyle;
  }

  // --- CINEMATIC FILM GRAIN BUFFER (Zero-CPU Tiled Pattern) ---
  initFilmGrain() {
    try {
      const gCanvas = document.createElement('canvas');
      gCanvas.width = 128;
      gCanvas.height = 128;
      const gCtx = gCanvas.getContext('2d');
      const imgData = gCtx.createImageData(128, 128);
      const buf = new Uint32Array(imgData.data.buffer);
      for (let i = 0; i < buf.length; i++) {
        // Monochrome analog grain with subtle alpha variation
        const val = Math.floor(Math.random() * 255);
        buf[i] = (45 << 24) | (val << 16) | (val << 8) | val;
      }
      gCtx.putImageData(imgData, 0, 0);
      this.grainPattern = this.ctx.createPattern(gCanvas, 'repeat');
    } catch (_) {
      this.grainPattern = null;
    }
  }

  get theme() {
    return this.themes[this.themeIndex];
  }

  get currentSceneInfo() {
    return this.scenes[this.currentScene];
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = Math.floor(this.width * this.dpr);
    this.canvas.height = Math.floor(this.height * this.dpr);
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(this.dpr, this.dpr);
    this.initFilmGrain();
  }

  // --- SCENE SWITCHING CONTROLS (With Cinematic Transition Pulse) ---
  setScene(index) {
    this.currentScene = ((index % this.scenes.length) + this.scenes.length) % this.scenes.length;
    this.transitionProgress = 1.0;
    return this.scenes[this.currentScene];
  }

  nextScene() {
    this.currentScene = (this.currentScene + 1) % this.scenes.length;
    this.transitionProgress = 1.0;
    return this.scenes[this.currentScene];
  }

  prevScene() {
    this.currentScene = (this.currentScene - 1 + this.scenes.length) % this.scenes.length;
    this.transitionProgress = 1.0;
    return this.scenes[this.currentScene];
  }

  randomScene() {
    this.currentScene = Math.floor(Math.random() * this.scenes.length);
    this.transitionProgress = 1.0;
    return this.scenes[this.currentScene];
  }

  randomize() {
    this.randomScene();
    this.themeIndex = Math.floor(Math.random() * this.themes.length);
    this.transitionProgress = 1.0;
    return {
      scene: this.scenes[this.currentScene].name,
      theme: this.theme.name
    };
  }

  nextTheme() {
    this.themeIndex = (this.themeIndex + 1) % this.themes.length;
    return this.theme;
  }

  toggleAutoRotate(callback) {
    this.isAutoRotate = !this.isAutoRotate;
    if (this.autoRotateTimer) {
      clearInterval(this.autoRotateTimer);
      this.autoRotateTimer = null;
    }
    if (this.isAutoRotate) {
      this.autoRotateTimer = setInterval(() => {
        const sc = this.nextScene();
        if (callback) callback(sc);
      }, 25000);
    }
    return this.isAutoRotate;
  }

  // --- 1. 3D GEODESIC SPECTRUM INITIALIZATION (Nested Dual-Polyhedron & Orbital Swarm) ---
  initGeodesicSphere() {
    const phi = (1 + Math.sqrt(5)) * 0.5;
    const baseVerts = [
      [-1,  phi,  0], [ 1,  phi,  0], [-1, -phi,  0], [ 1, -phi,  0],
      [ 0, -1,  phi], [ 0,  1,  phi], [ 0, -1, -phi], [ 0,  1, -phi],
      [ phi,  0, -1], [ phi,  0,  1], [-phi,  0, -1], [-phi,  0,  1]
    ];

    const norm = (v) => {
      const len = Math.hypot(v[0], v[1], v[2]) || 1;
      return [v[0] / len, v[1] / len, v[2] / len];
    };
    const verts = baseVerts.map(norm);

    const faces = [
      [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
      [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
      [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
      [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1]
    ];

    const midCache = new Map();
    const getMidpoint = (i1, i2) => {
      const key = i1 < i2 ? `${i1}_${i2}` : `${i2}_${i1}`;
      if (midCache.has(key)) return midCache.get(key);
      const v1 = verts[i1];
      const v2 = verts[i2];
      const mid = norm([(v1[0] + v2[0]) * 0.5, (v1[1] + v2[1]) * 0.5, (v1[2] + v2[2]) * 0.5]);
      verts.push(mid);
      const idx = verts.length - 1;
      midCache.set(key, idx);
      return idx;
    };

    const subFaces = [];
    for (const [a, b, c] of faces) {
      const ab = getMidpoint(a, b);
      const bc = getMidpoint(b, c);
      const ca = getMidpoint(c, a);
      subFaces.push([a, ab, ca]);
      subFaces.push([b, bc, ab]);
      subFaces.push([c, ca, bc]);
      subFaces.push([ab, bc, ca]);
    }

    this.geodesicVertices = verts;
    this.geodesicFaces = subFaces;

    const edgeSet = new Set();
    this.geodesicEdges = [];
    for (const [a, b, c] of subFaces) {
      const addEdge = (v1, v2) => {
        const k = v1 < v2 ? `${v1}_${v2}` : `${v2}_${v1}`;
        if (!edgeSet.has(k)) {
          edgeSet.add(k);
          this.geodesicEdges.push([v1, v2]);
        }
      };
      addEdge(a, b);
      addEdge(b, c);
      addEdge(c, a);
    }

    // Inner Counter-Rotating Core (12 vertices of inner icosahedral seed)
    this.innerCoreVertices = baseVerts.map(norm);
    this.innerCoreEdges = [
      [0, 1], [0, 5], [0, 7], [0, 10], [0, 11],
      [1, 5], [1, 7], [1, 8], [1, 9],
      [2, 3], [2, 4], [2, 6], [2, 10], [2, 11],
      [3, 4], [3, 6], [3, 8], [3, 9],
      [4, 5], [4, 9], [4, 11],
      [5, 9], [5, 11],
      [6, 7], [6, 8], [6, 10],
      [7, 8], [7, 10],
      [8, 9], [10, 11]
    ];

    // Orbital Quantum Swarm: 48 kinetic micro-satellites on 3D Keplerian orbits
    this.orbitalSwarm = [];
    for (let i = 0; i < 48; i++) {
      this.orbitalSwarm.push({
        radiusMult: 1.14 + Math.random() * 0.60,
        speed: (0.35 + Math.random() * 0.85) * (i % 2 === 0 ? 1 : -1),
        phase: Math.random() * Math.PI * 2,
        inclination: (Math.random() - 0.5) * Math.PI * 0.9,
        roll: (Math.random() - 0.5) * Math.PI * 0.9,
        size: 1.4 + Math.random() * 2.2,
        colorIndex: i % 3
      });
    }
  }

  // --- 2. 4D TESSERACT INITIALIZATION ---
  initTesseract() {
    this.tesseractVertices = [];
    for (let i = 0; i < 16; i++) {
      this.tesseractVertices.push([
        (i & 1) ? 1 : -1,
        (i & 2) ? 1 : -1,
        (i & 4) ? 1 : -1,
        (i & 8) ? 1 : -1
      ]);
    }

    this.tesseractEdges = [];
    for (let i = 0; i < 16; i++) {
      for (let j = i + 1; j < 16; j++) {
        let diff = 0;
        for (let k = 0; k < 4; k++) {
          if (this.tesseractVertices[i][k] !== this.tesseractVertices[j][k]) diff++;
        }
        if (diff === 1) {
          this.tesseractEdges.push([i, j]);
        }
      }
    }

    // Define 24 square faces of the hypercube for transparent volumetric facets
    this.tesseractFaces = [
      // Inner cube faces (w = -1)
      [0, 1, 3, 2], [4, 5, 7, 6], [0, 1, 5, 4], [2, 3, 7, 6], [0, 2, 6, 4], [1, 3, 7, 5],
      // Outer cube faces (w = 1)
      [8, 9, 11, 10], [12, 13, 15, 14], [8, 9, 13, 12], [10, 11, 15, 14], [8, 10, 14, 12], [9, 11, 15, 13]
    ];

    // Shockwave pulse rings array
    this.tesseractShockwaves = [];
  }

  // --- 3. 3D CYBER WARP TUNNEL INITIALIZATION (Curved Wormhole & Truss Lattice) ---
  initCyberTunnel() {
    this.tunnelRingsCount = 32;
    this.tunnelSides = 10; // Decagonal structural cross-section for maximum visual density
    this.tunnelZOffset = 0;
    this.tunnelSpacing = 115;
    this.tunnelMaxZ = this.tunnelRingsCount * this.tunnelSpacing;

    // Enhanced 3D Starfield & Hyperspace Warp Streaks
    this.tunnelStars = [];
    const starCount = 140;
    for (let i = 0; i < starCount; i++) {
      this.tunnelStars.push({
        x: (Math.random() - 0.5) * 2400,
        y: (Math.random() - 0.5) * 2400,
        z: Math.random() * this.tunnelMaxZ,
        size: 1.5 + Math.random() * 2.8,
        speedFactor: 0.7 + Math.random() * 0.9,
        trailLength: 25 + Math.random() * 75
      });
    }
  }

  // --- MAIN RENDER PIPELINE ---
  render(audio, dt) {
    this.time += dt;

    // Organic Audio Physics Smoothing
    const targetVol = audio ? (audio.volume || 0) : 0;
    const targetBass = audio ? (audio.bass || 0) : 0;
    const targetMid = audio ? (audio.mid || 0) : 0;
    const targetHigh = audio ? (audio.high || 0) : 0;

    const attack = 0.40;
    const decay = 0.08;
    this.smoothVol += (targetVol - this.smoothVol) * (targetVol > this.smoothVol ? attack : decay);
    this.smoothBass += (targetBass - this.smoothBass) * (targetBass > this.smoothBass ? attack : decay);
    this.smoothMid += (targetMid - this.smoothMid) * (targetMid > this.smoothMid ? attack : decay);
    this.smoothHigh += (targetHigh - this.smoothHigh) * (targetHigh > this.smoothHigh ? attack : decay);

    const ctx = this.ctx;
    const W = this.width;
    const H = this.height;
    const theme = this.theme;

    // 1. Deep Space Atmospheric Gradient Background
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, theme.bgTop);
    bg.addColorStop(1, theme.bgBottom);
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // Subtle Cinematic Camera Shake on heavy bass kick
    const bassImpulse = Math.max(0, this.smoothBass - 0.52);
    const kick = bassImpulse * 4.5;
    const shakeX = kick > 0.05 ? (Math.random() - 0.5) * kick : 0;
    const shakeY = kick > 0.05 ? (Math.random() - 0.5) * kick : 0;

    ctx.save();
    if (shakeX !== 0 || shakeY !== 0) {
      ctx.translate(shakeX, shakeY);
    }

    // 2. Dispatch Active 3D Geometric Engine
    switch (this.currentScene) {
      case 0:
        this.render3DGeodesicSpectrum(ctx, W, H, theme, audio, dt);
        break;
      case 1:
        this.render3DHyperTesseract(ctx, W, H, theme, audio, dt);
        break;
      case 2:
        this.render3DCyberWarpTunnel(ctx, W, H, theme, audio, dt);
        break;
      case 3:
        this.render3DSynchrotron(ctx, W, H, theme, audio, dt);
        break;
      case 4:
        this.render3DMatrixMonolith(ctx, W, H, theme, audio, dt);
        break;
    }

    ctx.restore();

    // 3. Cinematic Quantum Warp Pulse on Scene Transition
    if (this.transitionProgress > 0.01) {
      this.renderCinematicWarp(ctx, W, H, theme);
      this.transitionProgress = Math.max(0, this.transitionProgress - dt * 2.8);
    }

    // 4. Procedural Film Grain Overlay (Warm 35mm Analog Atmosphere)
    if (this.grainPattern) {
      ctx.save();
      ctx.globalAlpha = 0.034;
      ctx.fillStyle = this.grainPattern;
      ctx.fillRect(0, 0, W, H);
      ctx.restore();
    }
  }

  // --- CINEMATIC QUANTUM WARP FLASH & APERTURE SHUTTER ---
  renderCinematicWarp(ctx, W, H, theme) {
    const p = this.transitionProgress;
    ctx.save();
    
    // Central radial energy burst
    const cx = W * 0.5;
    const cy = H * 0.5;
    const radius = Math.max(W, H) * (1.1 - p * 0.7);
    const burst = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
    burst.addColorStop(0, `rgba(255, 255, 255, ${p * 0.35})`);
    burst.addColorStop(0.3, `${theme.secondary}22`);
    burst.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = burst;
    ctx.fillRect(0, 0, W, H);

    // Laser aperture line scan
    const lineAlpha = Math.sin(p * Math.PI) * 0.55;
    ctx.strokeStyle = theme.primary;
    ctx.globalAlpha = lineAlpha;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, cy);
    ctx.lineTo(W, cy);
    ctx.stroke();

    ctx.restore();
  }

  // =========================================================================
  // SCENE 01 // 3D GEODESIC SPECTRUM (Multi-Layered Articulated Quantum Lattice)
  // =========================================================================
  render3DGeodesicSpectrum(ctx, W, H, theme, audio, dt) {
    ctx.save();
    const cx = W * 0.5;
    const cy = H * 0.5;
    const baseRadius = Math.min(W, H) * 0.36;
    const fov = Math.min(W, H) * 1.15;

    // 3D Euler Angles driven by smooth audio energy and speech dynamics
    const rotSpeed = 0.55 + this.smoothVol * 1.1;
    const angX = this.time * 0.34 * rotSpeed;
    const angY = this.time * 0.58 * rotSpeed;
    const angZ = this.time * 0.20;

    const cosX = Math.cos(angX), sinX = Math.sin(angX);
    const cosY = Math.cos(angY), sinY = Math.sin(angY);
    const cosZ = Math.cos(angZ), sinZ = Math.sin(angZ);

    // Counter-rotation 3D Euler Angles for Inner Stellated Core
    const inAngX = -this.time * 0.62 * rotSpeed;
    const inAngY = -this.time * 0.85 * rotSpeed;
    const inAngZ = this.time * 0.42;

    const inCosX = Math.cos(inAngX), inSinX = Math.sin(inAngX);
    const inCosY = Math.cos(inAngY), inSinY = Math.sin(inAngY);
    const inCosZ = Math.cos(inAngZ), inSinZ = Math.sin(inAngZ);

    const freq = audio && audio.rawFreq ? audio.rawFreq : null;

    // --- 1. TRANSFORM & PROJECT INNER COUNTER-ROTATING CORE ---
    const innerProjected2D = [];
    const innerRadius = baseRadius * (0.38 + this.smoothBass * 0.28);

    for (let i = 0; i < this.innerCoreVertices.length; i++) {
      const iv = this.innerCoreVertices[i];
      const ix = iv[0] * innerRadius;
      const iy = iv[1] * innerRadius;
      const iz = iv[2] * innerRadius;

      // 3D Rotation (ZYX) for inner core
      const ix1 = ix * inCosY + iz * inSinY;
      const iz1 = -ix * inSinY + iz * inCosY;
      const iy2 = iy * inCosX - iz1 * inSinX;
      const iz2 = iy * inSinX + iz1 * inCosX;
      const ix3 = ix1 * inCosZ - iy2 * inSinZ;
      const iy3 = ix1 * inSinZ + iy2 * inCosZ;

      const zCam = iz2 + 560;
      const scale = fov / (fov + zCam);
      const px = cx + ix3 * scale;
      const py = cy + iy3 * scale;
      const depth = iz2 / innerRadius;

      innerProjected2D.push({ px, py, depth, x3: ix3, y3: iy3, z2: iz2 });
    }

    // --- 2. TRANSFORM & PROJECT 42 OUTER GEODESIC VERTICES WITH HARMONIC NOISE ---
    const projected2D = [];
    for (let i = 0; i < this.geodesicVertices.length; i++) {
      const v = this.geodesicVertices[i];
      let amp = 0;
      if (freq && freq.length > 0) {
        const bin = Math.floor((i / this.geodesicVertices.length) * 48) % freq.length;
        amp = (freq[bin] / 255.0);
      } else {
        amp = Math.sin(this.time * 3.5 + i * 0.6) * 0.5 + 0.5;
      }

      // Organic multi-octave harmonic noise turbulence (Randomic / Generative Lattice)
      const turbulence = Math.sin(this.time * 2.6 + v[0] * 3.6 + v[1] * 2.2) 
                       * Math.cos(this.time * 1.9 + v[2] * 3.4 + v[0] * 1.5)
                       + Math.sin(this.time * 5.0 + (v[1] + v[2]) * 4.2) * 0.35;

      const r = baseRadius * (1.0 + amp * 0.55 + this.smoothBass * 0.42 + turbulence * (0.10 + this.smoothVol * 0.32));
      const x = v[0] * r;
      const y = v[1] * r;
      const z = v[2] * r;

      // 3D Euler Rotation (ZYX) for outer shell
      const x1 = x * cosY + z * sinY;
      const z1 = -x * sinY + z * cosY;
      const y2 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;
      const x3 = x1 * cosZ - y2 * sinZ;
      const y3 = x1 * sinZ + y2 * cosZ;

      const zCam = z2 + 560;
      const scale = fov / (fov + zCam);
      const px = cx + x3 * scale;
      const py = cy + y3 * scale;
      const depth = z2 / baseRadius;

      projected2D.push({ px, py, z2, depth, amp, x3, y3 });
    }

    // --- 3. INTERNAL QUANTUM TENSION STRUTS (Bridging Inner Core to Outer Shell) ---
    for (let i = 0; i < Math.min(innerProjected2D.length, 12); i++) {
      const ip = innerProjected2D[i];
      const op = projected2D[i];
      if (!op || !ip) continue;

      const isVisible = (ip.depth + op.depth) * 0.5 > -0.4;
      if (isVisible) {
        ctx.strokeStyle = theme.accent;
        ctx.lineWidth = 1.0;
        ctx.globalAlpha = Math.max(0.08, Math.min(0.55, 0.20 + this.smoothBass * 0.35));
        ctx.beginPath();
        ctx.moveTo(ip.px, ip.py);
        ctx.lineTo(op.px, op.py);
        ctx.stroke();

        // Pulsating photon on the strut
        const progress = ((this.time * 1.8 + i * 0.15) % 1.0);
        const strutPx = ip.px + (op.px - ip.px) * progress;
        const strutPy = ip.py + (op.py - ip.py) * progress;
        ctx.fillStyle = '#FFFFFF';
        ctx.globalAlpha = 0.85;
        ctx.beginPath();
        ctx.arc(strutPx, strutPy, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // --- 4. DRAW INNER STELLATED CORE EDGES ---
    for (const [a, b] of this.innerCoreEdges) {
      const p1 = innerProjected2D[a];
      const p2 = innerProjected2D[b];
      if (!p1 || !p2) continue;

      const avgDepth = (p1.depth + p2.depth) * 0.5;
      const alpha = Math.max(0.18, Math.min(0.85, 0.45 + avgDepth * 0.35 + this.smoothBass * 0.3));

      ctx.strokeStyle = theme.primary;
      ctx.lineWidth = 1.4 + this.smoothBass * 1.6;
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.moveTo(p1.px, p1.py);
      ctx.lineTo(p2.px, p2.py);
      ctx.stroke();
    }

    // Inner Core Nodes
    for (const ip of innerProjected2D) {
      if (ip.depth > -0.3) {
        ctx.fillStyle = theme.secondary;
        ctx.globalAlpha = 0.90;
        ctx.beginPath();
        ctx.arc(ip.px, ip.py, 2.0 + this.smoothMid * 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // --- 5. SHADED TRANSLUCENT TRIANGULAR FACETS (With Surface Normal Light Shading) ---
    for (const [a, b, c] of this.geodesicFaces) {
      const p1 = projected2D[a];
      const p2 = projected2D[b];
      const p3 = projected2D[c];

      // Back-face culling via 2D cross product
      const cross = (p2.px - p1.px) * (p3.py - p1.py) - (p2.py - p1.py) * (p3.px - p1.px);
      if (cross > 0) {
        const avgDepth = (p1.depth + p2.depth + p3.depth) / 3;
        const avgAmp = (p1.amp + p2.amp + p3.amp) / 3;

        // Dynamic 3D Normal light reflection
        const nx = (p2.y3 - p1.y3) * (p3.z2 - p1.z2) - (p2.z2 - p1.z2) * (p3.y3 - p1.y3);
        const ny = (p2.z2 - p1.z2) * (p3.x3 - p1.x3) - (p2.x3 - p1.x3) * (p3.z2 - p1.z2);
        const nz = (p2.x3 - p1.x3) * (p3.y3 - p1.y3) - (p2.y3 - p1.y3) * (p3.x3 - p1.x3);
        const nLen = Math.hypot(nx, ny, nz) || 1;
        const lightDot = Math.max(0, (nx * 0.5 + ny * -0.5 + nz * 0.707) / nLen);

        const faceAlpha = Math.max(0.04, Math.min(0.32, 0.08 + avgDepth * 0.08 + avgAmp * 0.18 + lightDot * 0.12));

        ctx.fillStyle = avgAmp > 0.45 ? theme.secondary : (lightDot > 0.4 ? theme.primary : theme.accent);
        ctx.globalAlpha = faceAlpha;
        ctx.beginPath();
        ctx.moveTo(p1.px, p1.py);
        ctx.lineTo(p2.px, p2.py);
        ctx.lineTo(p3.px, p3.py);
        ctx.closePath();
        ctx.fill();
      }
    }

    // --- 6. WIREFRAME GEODESIC EDGES ---
    for (const [i1, i2] of this.geodesicEdges) {
      const p1 = projected2D[i1];
      const p2 = projected2D[i2];
      const avgDepth = (p1.depth + p2.depth) * 0.5;
      const isFront = avgDepth > -0.25;
      const avgAmp = (p1.amp + p2.amp) * 0.5;

      ctx.strokeStyle = isFront ? (avgAmp > 0.38 ? theme.primary : theme.secondary) : theme.accent;
      ctx.lineWidth = isFront ? (1.8 + avgAmp * 2.2) : 1.0;
      ctx.globalAlpha = isFront ? Math.min(1.0, 0.45 + (avgDepth + 1) * 0.35) : 0.16;

      ctx.beginPath();
      ctx.moveTo(p1.px, p1.py);
      ctx.lineTo(p2.px, p2.py);
      ctx.stroke();
    }

    // --- 7. GLOWING QUANTUM NODES ON VERTICES ---
    for (const p of projected2D) {
      if (p.depth > -0.2) {
        ctx.fillStyle = '#FFFFFF';
        ctx.globalAlpha = Math.min(1.0, 0.55 + (p.depth + 1) * 0.25 + p.amp * 0.45);
        ctx.beginPath();
        ctx.arc(p.px, p.py, 2.6 + p.amp * 3.8, 0, Math.PI * 2);
        ctx.fill();

        // Pulsating halo on excited nodes
        if (p.amp > 0.35) {
          ctx.strokeStyle = theme.secondary;
          ctx.lineWidth = 1.0;
          ctx.globalAlpha = p.amp * 0.65;
          ctx.beginPath();
          ctx.arc(p.px, p.py, 5.0 + p.amp * 7.0, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
    }

    // --- 8. TRIPLE ARTICULATED PRECISION GIMBAL GYROSCOPE SYSTEM ---
    const drawPrecisionGimbal = (radiusMult, pitchAng, rollAng, speedMult, color, segments, drawVernier = false) => {
      const r = baseRadius * radiusMult * (1.0 + this.smoothBass * 0.18);
      const t = this.time * speedMult;
      const ringPts = [];

      const cosP = Math.cos(pitchAng), sinP = Math.sin(pitchAng);
      const cosR = Math.cos(rollAng), sinR = Math.sin(rollAng);

      for (let s = 0; s <= segments; s++) {
        const theta = (s / segments) * Math.PI * 2 + t;
        const rx = Math.cos(theta) * r;
        const ry = 0;
        const rz = Math.sin(theta) * r;

        const y1 = ry * cosP - rz * sinP;
        const z1 = ry * sinP + rz * cosP;
        const x2 = rx * cosR - y1 * sinR;
        const y2 = rx * sinR + y1 * cosR;

        const xRot = x2 * cosY + z1 * sinY;
        const zRot = -x2 * sinY + z1 * cosY;
        const yRot = y2 * cosX - zRot * sinX;
        const zFinal = y2 * sinX + zRot * cosX;

        const zCam = zFinal + 560;
        const scale = fov / (fov + zCam);
        const px = cx + xRot * scale;
        const py = cy + yRot * scale;

        ringPts.push({ px, py, zFinal, theta });
      }

      // Draw Main Gimbal Ring Contour
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.55 + this.smoothBass * 0.35;
      ctx.beginPath();
      for (let i = 0; i < ringPts.length; i++) {
        if (i === 0) ctx.moveTo(ringPts[i].px, ringPts[i].py);
        else ctx.lineTo(ringPts[i].px, ringPts[i].py);
      }
      ctx.stroke();

      // Precision Vernier Scale / Ticks
      const tickStep = drawVernier ? 3 : 6;
      for (let i = 0; i < ringPts.length; i += tickStep) {
        const pt = ringPts[i];
        if (pt.zFinal > -60) {
          ctx.fillStyle = '#FFFFFF';
          ctx.globalAlpha = Math.min(1.0, 0.45 + (pt.zFinal / r + 1) * 0.4);
          const isMajor = i % (tickStep * 2) === 0;
          const tickSize = isMajor ? (2.8 + this.smoothMid * 2.2) : 1.6;
          ctx.beginPath();
          ctx.arc(pt.px, pt.py, tickSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Orbiting Laser Satellite Beacon along this ring
      const satIdx = Math.floor(((this.time * speedMult * 12) % ringPts.length) + ringPts.length) % ringPts.length;
      const sat = ringPts[satIdx];
      if (sat && sat.zFinal > -80) {
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowColor = theme.secondary;
        ctx.shadowBlur = 10;
        ctx.globalAlpha = 0.95;
        const satSize = 3.6 + this.smoothHigh * 4.0;
        // Diamond satellite
        ctx.beginPath();
        ctx.moveTo(sat.px, sat.py - satSize);
        ctx.lineTo(sat.px + satSize, sat.py);
        ctx.lineTo(sat.px, sat.py + satSize);
        ctx.lineTo(sat.px - satSize, sat.py);
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    };

    // 1. Equatorial Gimbal Ring with Vernier Scale
    drawPrecisionGimbal(1.20, 0.50, 0.22, 0.42, theme.secondary, 60, true);
    // 2. Meridian Gimbal Ring with Counter-Rotation
    drawPrecisionGimbal(1.36, -0.80, 0.90, -0.32, theme.primary, 48, false);
    // 3. Polar Azimuth Gimbal Ring
    drawPrecisionGimbal(1.52, 0.20, -0.75, 0.22, theme.accent, 48, true);

    // --- 9. ORBITAL QUANTUM SWARM (48 Keplerian Micro-Particles) ---
    for (let i = 0; i < this.orbitalSwarm.length; i++) {
      const p = this.orbitalSwarm[i];
      const theta = p.phase + this.time * p.speed;
      const pr = baseRadius * p.radiusMult * (1.0 + this.smoothBass * 0.25);

      const rx = Math.cos(theta) * pr;
      const ry = 0;
      const rz = Math.sin(theta) * pr;

      const cosI = Math.cos(p.inclination), sinI = Math.sin(p.inclination);
      const cosR = Math.cos(p.roll), sinR = Math.sin(p.roll);

      const y1 = ry * cosI - rz * sinI;
      const z1 = ry * sinI + rz * cosI;
      const x2 = rx * cosR - y1 * sinR;
      const y2 = rx * sinR + y1 * cosR;

      const xRot = x2 * cosY + z1 * sinY;
      const zRot = -x2 * sinY + z1 * cosY;
      const yRot = y2 * cosX - zRot * sinX;
      const zFinal = y2 * sinX + zRot * cosX;

      const zCam = zFinal + 560;
      const scale = fov / (fov + zCam);
      const px = cx + xRot * scale;
      const py = cy + yRot * scale;

      if (zFinal > -120) {
        const pAlpha = Math.min(1.0, 0.35 + (zFinal / pr + 1) * 0.45);
        ctx.fillStyle = p.colorIndex === 0 ? '#FFFFFF' : (p.colorIndex === 1 ? theme.primary : theme.secondary);
        ctx.globalAlpha = pAlpha;
        const pSize = p.size * (0.8 + this.smoothHigh * 0.8) * scale * 1.6;
        ctx.beginPath();
        ctx.arc(px, py, Math.max(1.2, pSize), 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // --- 10. PULSATING QUANTUM SINGULARITY (Core Diamond) ---
    const coreR = baseRadius * (0.24 + this.smoothBass * 0.26);
    ctx.strokeStyle = theme.primary;
    ctx.lineWidth = 1.8;
    ctx.globalAlpha = 0.85;
    ctx.beginPath();
    ctx.arc(cx, cy, coreR * 0.5, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();
  }

  // =========================================================================
  // SCENE 02 // 3D HYPER TESSERACT (4D Hypercube with Volumetric Facets & Shockwaves)
  // =========================================================================
  render3DHyperTesseract(ctx, W, H, theme, audio, dt) {
    ctx.save();
    const cx = W * 0.5;
    const cy = H * 0.5;
    const fov = Math.max(W, H) * 1.1;

    // 4D Plane Rotation Angles with kinetic responsiveness
    const angXW = this.time * 0.82 + this.smoothBass * 0.7;
    const angYZ = this.time * 0.60 + this.smoothMid * 0.55;
    const angZW = this.time * 0.40;
    const angXY = this.time * 0.28;

    const cosXW = Math.cos(angXW), sinXW = Math.sin(angXW);
    const cosYZ = Math.cos(angYZ), sinYZ = Math.sin(angYZ);
    const cosZW = Math.cos(angZW), sinZW = Math.sin(angZW);
    const cosXY = Math.cos(angXY), sinXY = Math.sin(angXY);

    // 4D Distance & 3D Scale
    const d4 = 2.40 + this.smoothBass * 0.5;
    const scale3D = Math.min(W, H) * 0.72;

    // Transform and project 16 4D vertices into 3D camera space
    const projected2D = [];
    for (let i = 0; i < 16; i++) {
      let [x, y, z, w] = this.tesseractVertices[i];

      // 1. Rotate in XW plane
      const x1 = x * cosXW - w * sinXW;
      const w1 = x * sinXW + w * cosXW;

      // 2. Rotate in YZ plane
      const y2 = y * cosYZ - z * sinYZ;
      const z2 = y * sinYZ + z * cosYZ;

      // 3. Rotate in ZW plane
      const z3 = z2 * cosZW - w1 * sinZW;
      const w3 = z2 * sinZW + w1 * cosZW;

      // 4. Rotate in XY plane
      const x4 = x1 * cosXY - y2 * sinXY;
      const y4 = x1 * sinXY + y2 * cosXY;

      // 5. Stereographic 4D-to-3D projection
      const factor4D = 1.0 / Math.max(0.2, (d4 - w3));
      const x3D = x4 * factor4D * scale3D;
      const y3D = y4 * factor4D * scale3D;
      const z3D = z3 * factor4D * scale3D;

      // 6. 3D Camera Rotation and Perspective Projection to 2D
      const rotY = this.time * 0.32;
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      const rx = x3D * cosY + z3D * sinY;
      const rz = -x3D * sinY + z3D * cosY;

      const zCam = rz + 500;
      const scale2D = fov / (fov + zCam);
      const px = cx + rx * scale2D;
      const py = cy + y3D * scale2D;
      const depth = rz / scale3D;

      projected2D.push({ px, py, depth, isInner: i < 8 });
    }

    // 1. Trigger Concentric Shockwaves on Bass Hits
    if (this.smoothBass > 0.45 && Math.random() < 0.25) {
      this.tesseractShockwaves.push({
        radius: 30,
        maxRadius: Math.min(W, H) * 0.7,
        alpha: 0.85,
        color: theme.secondary
      });
    }

    // Update and draw shockwaves
    for (let i = this.tesseractShockwaves.length - 1; i >= 0; i--) {
      const sw = this.tesseractShockwaves[i];
      sw.radius += (sw.maxRadius - sw.radius) * 0.12 + 4;
      sw.alpha *= 0.93;

      if (sw.alpha < 0.03 || sw.radius >= sw.maxRadius) {
        this.tesseractShockwaves.splice(i, 1);
        continue;
      }

      ctx.strokeStyle = sw.color;
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = sw.alpha;
      ctx.beginPath();
      // Octagonal geometric shockwave
      const sides = 8;
      for (let s = 0; s <= sides; s++) {
        const th = (s / sides) * Math.PI * 2 + this.time * 0.5;
        const sx = cx + Math.cos(th) * sw.radius;
        const sy = cy + Math.sin(th) * sw.radius;
        if (s === 0) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      }
      ctx.stroke();
    }

    // 2. Shaded Translucent Volumetric Facets
    for (const [a, b, c, d] of this.tesseractFaces) {
      const p1 = projected2D[a];
      const p2 = projected2D[b];
      const p3 = projected2D[c];
      const p4 = projected2D[d];

      const avgDepth = (p1.depth + p2.depth + p3.depth + p4.depth) * 0.25;
      if (avgDepth > -0.3) {
        ctx.fillStyle = theme.secondary;
        ctx.globalAlpha = Math.max(0.03, Math.min(0.18, 0.05 + avgDepth * 0.06 + this.smoothVol * 0.12));
        ctx.beginPath();
        ctx.moveTo(p1.px, p1.py);
        ctx.lineTo(p2.px, p2.py);
        ctx.lineTo(p3.px, p3.py);
        ctx.lineTo(p4.px, p4.py);
        ctx.closePath();
        ctx.fill();
      }
    }

    // 3. Render 32 4D Hypercube Wireframe Edges
    for (const [v1, v2] of this.tesseractEdges) {
      const p1 = projected2D[v1];
      const p2 = projected2D[v2];
      const avgDepth = (p1.depth + p2.depth) * 0.5;
      const alpha = Math.max(0.22, Math.min(1.0, 0.65 + avgDepth * 0.35));

      if (v1 < 8 && v2 < 8) {
        ctx.strokeStyle = theme.primary;
        ctx.lineWidth = Math.max(1.4, (2.6 + this.smoothBass * 2.2) * alpha);
      } else if (v1 >= 8 && v2 >= 8) {
        ctx.strokeStyle = theme.secondary;
        ctx.lineWidth = Math.max(1.2, (2.2 + this.smoothMid * 1.8) * alpha);
      } else {
        ctx.strokeStyle = theme.accent;
        ctx.lineWidth = Math.max(1.0, 1.5 * alpha);
      }
      ctx.globalAlpha = alpha;

      ctx.beginPath();
      ctx.moveTo(p1.px, p1.py);
      ctx.lineTo(p2.px, p2.py);
      ctx.stroke();
    }

    // 4. Render Glowing Diamond Vertices
    for (const p of projected2D) {
      ctx.fillStyle = '#FFFFFF';
      ctx.globalAlpha = 0.95;
      const size = 3.2 + this.smoothHigh * 4.0;
      // Diamond shape
      ctx.beginPath();
      ctx.moveTo(p.px, p.py - size);
      ctx.lineTo(p.px + size, p.py);
      ctx.lineTo(p.px, p.py + size);
      ctx.lineTo(p.px - size, p.py);
      ctx.closePath();
      ctx.fill();
    }

    ctx.restore();
  }

  // =========================================================================
  // SCENE 03 // 3D CYBER WARP TUNNEL (Curving Wormhole with Geodesic Truss & Warp Streaks)
  // =========================================================================
  render3DCyberWarpTunnel(ctx, W, H, theme, audio, dt) {
    ctx.save();
    const cx = W * 0.5;
    const cy = H * 0.5;
    const fov = Math.max(W, H) * 0.88;

    // Warp speed boosted by speech energy and bass kick
    const baseSpeed = 180;
    const audioSpeed = this.smoothVol * 420 + this.smoothBass * 580;
    const currentSpeed = baseSpeed + audioSpeed;

    this.tunnelZOffset = (this.tunnelZOffset + currentSpeed * dt) % this.tunnelSpacing;

    const ringCount = this.tunnelRingsCount;
    const spacing = this.tunnelSpacing;
    const maxZ = this.tunnelMaxZ;
    const sides = this.tunnelSides;

    // Procedural 3D Wormhole Flight Path (Non-linear curving trajectory)
    const getWormholeCenter = (z, time) => {
      const nz = z * 0.0014;
      const offX = Math.sin(time * 0.68 + nz) * (145 + this.smoothBass * 95)
                 + Math.cos(time * 1.38 - nz * 1.5) * 65;
      const offY = Math.cos(time * 0.58 + nz * 0.85) * (115 + this.smoothVol * 85)
                 + Math.sin(time * 1.18 + nz * 2.0) * 55;
      const roll = Math.sin(time * 0.48 + nz * 0.75) * 0.38 + (this.smoothBass - 0.5) * 0.22;
      return { offX, offY, roll };
    };

    // Twist angular speed along Z
    const globalTwist = this.time * 0.48;

    // --- 1. RENDER KINETIC RELATIVISTIC WARP STREAKS (Hyperspace Particle Trails) ---
    for (const star of this.tunnelStars) {
      star.z -= currentSpeed * star.speedFactor * dt;
      if (star.z <= 15) {
        star.z += maxZ;
        star.x = (Math.random() - 0.5) * 2400;
        star.y = (Math.random() - 0.5) * 2400;
      }

      const { offX, offY } = getWormholeCenter(star.z, this.time);
      const zScale = fov / (fov + star.z);
      const px = cx + (star.x + offX) * zScale;
      const py = cy + (star.y + offY) * zScale;

      if (px >= -50 && px <= W + 50 && py >= -50 && py <= H + 50) {
        const normZ = star.z / maxZ;
        const alpha = Math.min(1.0, (1.0 - normZ) * 1.3);

        // Calculate motion streak trail pointing outward from flight vector
        const streakFactor = (12 + this.smoothBass * 45 + this.smoothVol * 35) * zScale * star.speedFactor;
        const dirX = (px - cx) * 0.06;
        const dirY = (py - cy) * 0.06;

        ctx.strokeStyle = star.speedFactor > 1.2 ? theme.secondary : '#FFFFFF';
        ctx.lineWidth = Math.max(1.0, star.size * zScale * 1.8);
        ctx.globalAlpha = alpha;

        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(px + dirX * streakFactor, py + dirY * streakFactor);
        ctx.stroke();

        // Tip diamond spark
        if (normZ < 0.6) {
          ctx.fillStyle = '#FFFFFF';
          ctx.globalAlpha = Math.min(1.0, alpha * 1.2);
          const dSize = star.size * zScale * 1.8;
          ctx.beginPath();
          ctx.arc(px, py, dSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // --- 2. COMPUTE 3D COORDINATES FOR BOTH OUTER TRUSS RINGS & INNER CONDUIT ---
    const rings2D = [];
    const baseTunnelRadius = Math.min(W, H) * 0.50;
    const innerRadiusRatio = 0.38 + this.smoothBass * 0.12;

    for (let r = 0; r < ringCount; r++) {
      const z = (r * spacing) - this.tunnelZOffset;
      if (z <= 10) continue; // Behind camera

      const normZ = z / maxZ;
      const zScale = fov / (fov + z);

      // Trajectory center offset & banking roll
      const { offX, offY, roll } = getWormholeCenter(z, this.time);

      // Kinetic spiral twist along depth
      const twist = globalTwist + normZ * 2.8 + Math.sin(this.time * 1.6 + normZ * 5.2) * 0.38 + roll;

      // Audio harmonic wave propagating along tunnel walls
      const waveAmp = Math.sin(this.time * 6.5 - normZ * 8.5) * (0.08 + this.smoothBass * 0.22);
      const ringRadius = baseTunnelRadius * (1.0 + waveAmp);

      // Outer Decagonal Ring Points
      const ringPts = [];
      for (let s = 0; s < sides; s++) {
        const theta = (s / sides) * Math.PI * 2 + twist;
        const x3D = Math.cos(theta) * ringRadius + offX;
        const y3D = Math.sin(theta) * ringRadius + offY;

        const px = cx + x3D * zScale;
        const py = cy + y3D * zScale;

        ringPts.push({ px, py, x3D, y3D, z });
      }

      // Inner Counter-Rotating Hexagonal Conduit Points (6 sides)
      const innerSides = 6;
      const innerTwist = -globalTwist * 1.3 + normZ * 3.5;
      const innerPts = [];
      const innerR = ringRadius * innerRadiusRatio;

      for (let is = 0; is < innerSides; is++) {
        const iTheta = (is / innerSides) * Math.PI * 2 + innerTwist;
        const ix3D = Math.cos(iTheta) * innerR + offX;
        const iy3D = Math.sin(iTheta) * innerR + offY;

        const ipx = cx + ix3D * zScale;
        const ipy = cy + iy3D * zScale;

        innerPts.push({ px: ipx, py: ipy, z });
      }

      const isBulkhead = (r % 6 === 0);
      rings2D.push({ pts: ringPts, innerPts, z, normZ, r, isBulkhead });
    }

    // --- 3. DRAW SELECTIVE TRANSLUCENT HULL PANELS (Physical Depth Walls) ---
    for (let r = rings2D.length - 2; r >= 0; r--) {
      const ringA = rings2D[r + 1];
      const ringB = rings2D[r];
      const normZ = ringB.normZ;
      if (normZ > 0.85) continue;

      for (let s = 0; s < sides; s++) {
        // Generative panel pattern: alternate sectors with depth breathing
        const isPanelActive = ((s + r) % 3 === 0) || (s % 2 === 0 && r % 2 === 0);
        if (isPanelActive) {
          const sNext = (s + 1) % sides;
          const p1 = ringA.pts[s];
          const p2 = ringA.pts[sNext];
          const p3 = ringB.pts[sNext];
          const p4 = ringB.pts[s];

          const panelAlpha = Math.max(0.03, Math.min(0.22, (1.0 - normZ) * 0.16 + this.smoothVol * 0.12));
          ctx.fillStyle = (s % 2 === 0) ? theme.secondary : theme.accent;
          ctx.globalAlpha = panelAlpha;

          ctx.beginPath();
          ctx.moveTo(p1.px, p1.py);
          ctx.lineTo(p2.px, p2.py);
          ctx.lineTo(p3.px, p3.py);
          ctx.lineTo(p4.px, p4.py);
          ctx.closePath();
          ctx.fill();
        }
      }
    }

    // --- 4. DRAW GEODESIC DIAGONAL CROSS-TRUSS STRUTS (/\/\/\ Lattice) ---
    for (let r = rings2D.length - 2; r >= 0; r--) {
      const ringA = rings2D[r + 1];
      const ringB = rings2D[r];
      const normZ = ringB.normZ;
      const alpha = Math.max(0.08, (1.0 - normZ) * 0.55);

      ctx.strokeStyle = theme.accent;
      ctx.lineWidth = 1.0;
      ctx.globalAlpha = alpha;

      ctx.beginPath();
      for (let s = 0; s < sides; s++) {
        const sNext = (s + 1) % sides;
        // Diagonal truss 1: A[s] -> B[sNext]
        ctx.moveTo(ringA.pts[s].px, ringA.pts[s].py);
        ctx.lineTo(ringB.pts[sNext].px, ringB.pts[sNext].py);
      }
      ctx.stroke();
    }

    // --- 5. DRAW LONGITUDINAL PERSPECTIVE RAILS (Connecting rings along depth) ---
    for (let s = 0; s < sides; s++) {
      ctx.strokeStyle = (s % 2 === 0) ? theme.primary : theme.secondary;
      ctx.lineWidth = 1.5;
      ctx.beginPath();

      let started = false;
      for (let r = rings2D.length - 1; r >= 0; r--) {
        const pt = rings2D[r].pts[s];
        const normZ = rings2D[r].normZ;
        ctx.globalAlpha = Math.max(0.12, (1.0 - normZ) * 0.85);

        if (!started) {
          ctx.moveTo(pt.px, pt.py);
          started = true;
        } else {
          ctx.lineTo(pt.px, pt.py);
        }
      }
      ctx.stroke();
    }

    // --- 6. DRAW TRANSVERSE OUTER RINGS & REINFORCED BULKHEAD PORTALS (Back to Front) ---
    for (let r = rings2D.length - 1; r >= 0; r--) {
      const ring = rings2D[r];
      const normZ = ring.normZ;
      const alpha = Math.max(0.15, Math.pow(1.0 - normZ, 1.35));

      const isFore = r === 0 || r === 1;
      const isBulk = ring.isBulkhead;

      ctx.strokeStyle = isBulk ? theme.secondary : (isFore ? theme.primary : (r % 3 === 0 ? theme.secondary : theme.accent));
      ctx.lineWidth = isBulk ? (3.5 + this.smoothBass * 2.8) : (isFore ? (2.8 + this.smoothBass * 2.0) : Math.max(1.0, 2.2 * (1.0 - normZ * 0.5)));
      ctx.globalAlpha = isBulk ? Math.min(1.0, alpha * 1.5) : alpha;

      ctx.beginPath();
      for (let s = 0; s <= sides; s++) {
        const pt = ring.pts[s % sides];
        if (s === 0) ctx.moveTo(pt.px, pt.py);
        else ctx.lineTo(pt.px, pt.py);
      }
      ctx.stroke();

      // Bulkhead Reinforced Outer Ring (Double Contour)
      if (isBulk && normZ < 0.75) {
        ctx.strokeStyle = theme.primary;
        ctx.lineWidth = 1.2;
        ctx.globalAlpha = alpha * 0.75;
        ctx.beginPath();
        for (let s = 0; s <= sides; s++) {
          const pt = ring.pts[s % sides];
          const scaleOut = 1.08;
          const { offX, offY } = getWormholeCenter(ring.z, this.time);
          const zScale = fov / (fov + ring.z);
          const bpx = cx + (pt.x3D - offX) * scaleOut * zScale + offX * zScale;
          const bpy = cy + (pt.y3D - offY) * scaleOut * zScale + offY * zScale;

          if (s === 0) ctx.moveTo(bpx, bpy);
          else ctx.lineTo(bpx, bpy);
        }
        ctx.stroke();
      }

      // Vertex Corner Marker Diamonds on rings
      if ((isBulk || r % 2 === 0) && normZ < 0.8) {
        for (let s = 0; s < sides; s++) {
          const pt = ring.pts[s];
          ctx.fillStyle = '#FFFFFF';
          ctx.globalAlpha = Math.min(1.0, alpha * 1.3);
          const vSize = Math.max(1.6, 3.8 * (1.0 - normZ * 0.6) + this.smoothHigh * 2.2);
          ctx.beginPath();
          ctx.arc(pt.px, pt.py, vSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // --- 7. DRAW INNER COUNTER-ROTATING ENERGY CONDUIT (Inner Hexagonal Core) ---
    for (let r = rings2D.length - 1; r >= 0; r--) {
      const ring = rings2D[r];
      const normZ = ring.normZ;
      if (normZ > 0.8) continue;

      const alpha = Math.max(0.12, (1.0 - normZ) * 0.65);
      ctx.strokeStyle = theme.secondary;
      ctx.lineWidth = 1.2;
      ctx.globalAlpha = alpha;

      ctx.beginPath();
      const inSides = ring.innerPts.length;
      for (let is = 0; is <= inSides; is++) {
        const pt = ring.innerPts[is % inSides];
        if (is === 0) ctx.moveTo(pt.px, pt.py);
        else ctx.lineTo(pt.px, pt.py);
      }
      ctx.stroke();

      // Energy Core Nodes
      for (let is = 0; is < inSides; is++) {
        const pt = ring.innerPts[is];
        ctx.fillStyle = theme.primary;
        ctx.globalAlpha = alpha * 0.9;
        ctx.beginPath();
        ctx.arc(pt.px, pt.py, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // --- 8. TACTICAL FLIGHT HORIZON RETICLE (Dynamic Wormhole Vanishing Point) ---
    const horizonZ = maxZ * 0.95;
    const { offX: hOffX, offY: hOffY, roll: hRoll } = getWormholeCenter(horizonZ, this.time);
    const hScale = fov / (fov + horizonZ);
    const horizonCx = cx + hOffX * hScale;
    const horizonCy = cy + hOffY * hScale;

    const reticleRadius = 26 + this.smoothBass * 18;
    ctx.strokeStyle = theme.secondary;
    ctx.lineWidth = 1.6;
    ctx.globalAlpha = 0.90;

    // Crosshairs with Flight Bank Angle
    ctx.save();
    ctx.translate(horizonCx, horizonCy);
    ctx.rotate(hRoll);

    // Artificial Horizon Line
    ctx.beginPath();
    ctx.moveTo(-reticleRadius - 28, 0);
    ctx.lineTo(-reticleRadius + 6, 0);
    ctx.moveTo(reticleRadius - 6, 0);
    ctx.lineTo(reticleRadius + 28, 0);
    ctx.moveTo(0, -reticleRadius - 20);
    ctx.lineTo(0, -reticleRadius + 6);
    ctx.moveTo(0, reticleRadius - 6);
    ctx.lineTo(0, reticleRadius + 20);
    ctx.stroke();

    // Pitch Ladder Notches
    const ladderSpan = 18;
    ctx.strokeStyle = theme.primary;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(-ladderSpan, -14); ctx.lineTo(-ladderSpan + 8, -14);
    ctx.moveTo(ladderSpan - 8, -14); ctx.lineTo(ladderSpan, -14);
    ctx.moveTo(-ladderSpan, 14); ctx.lineTo(-ladderSpan + 8, 14);
    ctx.moveTo(ladderSpan - 8, 14); ctx.lineTo(ladderSpan, 14);
    ctx.stroke();

    // Rotating Precision Azimuth Compass Ring
    const compassAngle = this.time * 0.8;
    ctx.strokeStyle = theme.accent;
    ctx.lineWidth = 1.0;
    ctx.beginPath();
    ctx.arc(0, 0, reticleRadius, 0, Math.PI * 2);
    ctx.stroke();

    for (let c = 0; c < 12; c++) {
      const cTheta = (c / 12) * Math.PI * 2 + compassAngle;
      const c1x = Math.cos(cTheta) * reticleRadius;
      const c1y = Math.sin(cTheta) * reticleRadius;
      const c2x = Math.cos(cTheta) * (reticleRadius - (c % 3 === 0 ? 5 : 2.5));
      const c2y = Math.sin(cTheta) * (reticleRadius - (c % 3 === 0 ? 5 : 2.5));
      ctx.beginPath();
      ctx.moveTo(c1x, c1y);
      ctx.lineTo(c2x, c2y);
      ctx.stroke();
    }

    // Vanishing Point Quantum Diamond
    ctx.fillStyle = '#FFFFFF';
    ctx.globalAlpha = 0.95;
    const centerDiamond = 4.2 + this.smoothHigh * 4.5;
    ctx.beginPath();
    ctx.moveTo(0, -centerDiamond);
    ctx.lineTo(centerDiamond, 0);
    ctx.lineTo(0, centerDiamond);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
    ctx.restore();
  }

  // =========================================================================
  // SCENE 04 // 3D QUANTUM SYNCHROTRON (Tri-Toroidal Relativistic Accelerator)
  // =========================================================================
  initSynchrotron() {
    this.torusRings = [
      { majorR: 1.0, minorR: 0.22, uSteps: 24, vSteps: 8, tiltX: 0.15, tiltY: 0, tiltZ: 0, speed: 0.65 },
      { majorR: 0.72, minorR: 0.16, uSteps: 20, vSteps: 8, tiltX: 0.85, tiltY: 0.45, tiltZ: 0.35, speed: -0.95 },
      { majorR: 0.46, minorR: 0.11, uSteps: 16, vSteps: 6, tiltX: 1.57, tiltY: 0.20, tiltZ: 0.80, speed: 1.35 }
    ];

    // Relativistic photon flux particles
    this.synchrotronParticles = [];
    for (let i = 0; i < 54; i++) {
      this.synchrotronParticles.push({
        ringIdx: i % 3,
        u: Math.random() * Math.PI * 2,
        v: Math.random() * Math.PI * 2,
        speed: 1.5 + Math.random() * 2.5,
        energy: Math.random(),
        size: 2.0 + Math.random() * 2.5
      });
    }
  }

  render3DSynchrotron(ctx, W, H, theme, audio, dt) {
    ctx.save();
    const cx = W * 0.5;
    const cy = H * 0.5;
    const baseScale = Math.min(W, H) * 0.38;
    const fov = Math.min(W, H) * 1.2;

    const rotMaster = this.time * 0.42 * (1.0 + this.smoothVol * 0.8);
    const mCosX = Math.cos(rotMaster * 0.6), mSinX = Math.sin(rotMaster * 0.6);
    const mCosY = Math.cos(rotMaster), mSinY = Math.sin(rotMaster);

    const freq = audio && audio.rawFreq ? audio.rawFreq : null;

    // Render Each Concentric Toroidal Accelerator Ring
    this.torusRings.forEach((ring, rIdx) => {
      const ringTime = this.time * ring.speed * (1.0 + this.smoothBass * 0.9);
      const rCosU = Math.cos(ringTime), rSinU = Math.sin(ringTime);
      const rMajor = ring.majorR * baseScale * (1.0 + this.smoothBass * 0.25);
      const rMinor = ring.minorR * baseScale * (1.0 + this.smoothMid * 0.35);

      const grid2D = [];
      for (let u = 0; u < ring.uSteps; u++) {
        grid2D[u] = [];
        const uAngle = (u / ring.uSteps) * Math.PI * 2;
        
        // Dynamic harmonic ripple along torus tube
        const uHarmonic = Math.sin(uAngle * 3 + ringTime * 2.5) * (this.smoothBass * 18);
        const effectiveMajor = rMajor + uHarmonic;

        for (let v = 0; v < ring.vSteps; v++) {
          const vAngle = (v / ring.vSteps) * Math.PI * 2;
          
          // Torus Parametric Equation
          let tx = (effectiveMajor + rMinor * Math.cos(vAngle)) * Math.cos(uAngle);
          let ty = (effectiveMajor + rMinor * Math.cos(vAngle)) * Math.sin(uAngle);
          let tz = rMinor * Math.sin(vAngle);

          // Apply Ring's inherent tilt
          const t1y = ty * Math.cos(ring.tiltX) - tz * Math.sin(ring.tiltX);
          const t1z = ty * Math.sin(ring.tiltX) + tz * Math.cos(ring.tiltX);
          const t2x = tx * Math.cos(ring.tiltY) + t1z * Math.sin(ring.tiltY);
          const t2z = -tx * Math.sin(ring.tiltY) + t1z * Math.cos(ring.tiltY);

          // Apply Global 3D Rotation
          const x1 = t2x * mCosY + t2z * mSinY;
          const z1 = -t2x * mSinY + t2z * mCosY;
          const y2 = t1y * mCosX - z1 * mSinX;
          const z2 = t1y * mSinX + z1 * mCosX;

          const zCam = z2 + 620;
          const scale = fov / (fov + zCam);
          const px = cx + x1 * scale;
          const py = cy + y2 * scale;

          grid2D[u][v] = { px, py, z2, scale };
        }
      }

      // Render Torus Wireframe Latitudes & Longitudes
      ctx.lineWidth = rIdx === 0 ? 1.4 : 1.1;
      ctx.strokeStyle = rIdx === 0 ? theme.primary : (rIdx === 1 ? theme.secondary : theme.accent);
      ctx.globalAlpha = 0.55 + (rIdx === 0 ? this.smoothVol * 0.4 : 0.2);

      // Longitude ribs (circles)
      for (let u = 0; u < ring.uSteps; u++) {
        ctx.beginPath();
        for (let v = 0; v <= ring.vSteps; v++) {
          const pt = grid2D[u][v % ring.vSteps];
          if (v === 0) ctx.moveTo(pt.px, pt.py);
          else ctx.lineTo(pt.px, pt.py);
        }
        ctx.stroke();
      }

      // Latitude rings
      for (let v = 0; v < ring.vSteps; v += 2) {
        ctx.beginPath();
        for (let u = 0; u <= ring.uSteps; u++) {
          const pt = grid2D[u % ring.uSteps][v];
          if (u === 0) ctx.moveTo(pt.px, pt.py);
          else ctx.lineTo(pt.px, pt.py);
        }
        ctx.stroke();
      }

      // Shaded Volumetric Quads on Front Hemispheres
      for (let u = 0; u < ring.uSteps; u += 2) {
        const nextU = (u + 1) % ring.uSteps;
        for (let v = 0; v < ring.vSteps; v += 2) {
          const nextV = (v + 1) % ring.vSteps;
          const p1 = grid2D[u][v];
          const p2 = grid2D[nextU][v];
          const p3 = grid2D[nextU][nextV];
          const p4 = grid2D[u][nextV];

          const avgZ = (p1.z2 + p2.z2 + p3.z2 + p4.z2) * 0.25;
          if (avgZ < 0) { // Facing camera
            const alpha = Math.min(0.28, Math.abs(avgZ / (baseScale * 1.5)) * 0.28 + this.smoothVol * 0.15);
            ctx.fillStyle = theme.isLight ? `rgba(0, 0, 0, ${alpha * 0.6})` : (rIdx === 0 ? theme.secondary : theme.primary);
            ctx.globalAlpha = alpha;
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.lineTo(p3.px, p3.py);
            ctx.lineTo(p4.px, p4.py);
            ctx.closePath();
            ctx.fill();
          }
        }
      }
    });

    // Relativistic Particle Synchrotron Flow
    ctx.globalAlpha = 0.9;
    this.synchrotronParticles.forEach((p) => {
      p.u += dt * p.speed * (1.2 + this.smoothVol * 2.2);
      const ring = this.torusRings[p.ringIdx];
      const rMajor = ring.majorR * baseScale;
      const rMinor = ring.minorR * baseScale;

      const tx = (rMajor + rMinor * Math.cos(p.v)) * Math.cos(p.u);
      const ty = (rMajor + rMinor * Math.cos(p.v)) * Math.sin(p.u);
      const tz = rMinor * Math.sin(p.v);

      const t1y = ty * Math.cos(ring.tiltX) - tz * Math.sin(ring.tiltX);
      const t1z = ty * Math.sin(ring.tiltX) + tz * Math.cos(ring.tiltX);
      const t2x = tx * Math.cos(ring.tiltY) + t1z * Math.sin(ring.tiltY);
      const t2z = -tx * Math.sin(ring.tiltY) + t1z * Math.cos(ring.tiltY);

      const x1 = t2x * mCosY + t2z * mSinY;
      const z1 = -t2x * mSinY + t2z * mCosY;
      const y2 = t1y * mCosX - z1 * mSinX;
      const z2 = t1y * mSinX + z1 * mCosX;

      const zCam = z2 + 620;
      const scale = fov / (fov + zCam);
      const px = cx + x1 * scale;
      const py = cy + y2 * scale;

      const pSize = Math.max(1.2, p.size * scale * (1.0 + this.smoothBass * 0.8));
      ctx.fillStyle = theme.isLight ? '#000000' : '#FFFFFF';
      ctx.beginPath();
      ctx.arc(px, py, pSize, 0, Math.PI * 2);
      ctx.fill();

      // Motion Trail
      const trailDx = -Math.sin(p.u) * (14 * scale);
      const trailDy = Math.cos(p.u) * (14 * scale);
      ctx.strokeStyle = ring.majorR > 0.8 ? theme.secondary : theme.accent;
      ctx.lineWidth = 1.0;
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(px + trailDx, py + trailDy);
      ctx.stroke();
    });

    // Central Singularity Quantum Beacon
    const beaconSize = (10 + this.smoothBass * 28) * (fov / (fov + 620));
    ctx.strokeStyle = theme.primary;
    ctx.lineWidth = 2.0;
    ctx.globalAlpha = 0.9;
    ctx.beginPath();
    ctx.arc(cx, cy, beaconSize, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = theme.secondary;
    ctx.beginPath();
    ctx.arc(cx, cy, Math.max(2, beaconSize * 0.35), 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  // =========================================================================
  // SCENE 05 // 3D MATRIX MONOLITH (Brutalist Obelisk & Audio Terrain Grid)
  // =========================================================================
  initMatrixMonolith() {
    // 3D Brutalist Obelisk Geometry (8 Vertices + Inner Conduit)
    const mw = 45, mh = 175, md = 45;
    this.monolithVerts = [
      [-mw, -mh, -md], [ mw, -mh, -md], [ mw, -mh,  md], [-mw, -mh,  md], // Top
      [-mw * 1.35, mh, -md * 1.35], [ mw * 1.35, mh, -md * 1.35], // Bottom
      [ mw * 1.35, mh,  md * 1.35], [-mw * 1.35, mh,  md * 1.35]
    ];

    this.monolithFaces = [
      [0, 1, 2, 3], // Top
      [4, 7, 6, 5], // Bottom
      [0, 1, 5, 4], // Front
      [1, 2, 6, 5], // Right
      [2, 3, 7, 6], // Back
      [3, 0, 4, 7]  // Left
    ];

    // Terrain Mesh Dimensions (20 x 16 Grid)
    this.terrainCols = 20;
    this.terrainRows = 16;
    this.terrainSpacingX = 85;
    this.terrainSpacingZ = 95;
    this.terrainOriginZ = -100;
  }

  render3DMatrixMonolith(ctx, W, H, theme, audio, dt) {
    ctx.save();
    const cx = W * 0.5;
    const cy = H * 0.44; // Raised slightly above the terrain horizon
    const fov = Math.min(W, H) * 1.1;

    const rotY = this.time * 0.55 * (1.0 + this.smoothVol * 0.7);
    const rotPitch = Math.sin(this.time * 0.8) * 0.12 + (this.smoothBass * 0.18);
    const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
    const cosX = Math.cos(rotPitch), sinX = Math.sin(rotPitch);

    const freq = audio && audio.rawFreq ? audio.rawFreq : null;

    // --- 1. RENDER 3D AUDIO TERRAIN HORIZON MESH ---
    const groundY = H * 0.22; // Physical baseline elevation
    const terrain2D = [];

    for (let r = 0; r < this.terrainRows; r++) {
      terrain2D[r] = [];
      const worldZ = this.terrainOriginZ + r * this.terrainSpacingZ;
      const binIdx = Math.floor((r / this.terrainRows) * 32);
      const rowFreq = freq && freq.length > binIdx ? (freq[binIdx] / 255.0) : (Math.sin(this.time * 3 + r * 0.5) * 0.5 + 0.5);

      for (let c = 0; c < this.terrainCols; c++) {
        const worldX = (c - this.terrainCols * 0.5) * this.terrainSpacingX;
        
        // Elevation wave generated by distance + audio reactivity
        const distFromCenter = Math.hypot(worldX, worldZ - 300);
        const wave = Math.sin(worldX * 0.012 + this.time * 2.5) * Math.cos(worldZ * 0.01 + this.time * 1.8);
        const worldY = groundY + wave * (15 + this.smoothVol * 25) - rowFreq * 85 * (1.0 - Math.min(1.0, Math.abs(c - this.terrainCols * 0.5) / 10));

        // Perspective Projection
        const zCam = worldZ + 450;
        const scale = fov / (fov + zCam);
        const px = cx + worldX * scale;
        const py = cy + worldY * scale;

        terrain2D[r][c] = { px, py, zCam, scale };
      }
    }

    // Draw Terrain Longitudinal & Latitudinal Lines
    ctx.lineWidth = 1.0;
    ctx.strokeStyle = theme.accent;

    for (let r = 0; r < this.terrainRows; r++) {
      const depthAlpha = Math.max(0.08, 1.0 - (r / this.terrainRows) * 0.85);
      ctx.globalAlpha = depthAlpha * 0.65;
      ctx.beginPath();
      for (let c = 0; c < this.terrainCols; c++) {
        const pt = terrain2D[r][c];
        if (c === 0) ctx.moveTo(pt.px, pt.py);
        else ctx.lineTo(pt.px, pt.py);
      }
      ctx.stroke();
    }

    for (let c = 0; c < this.terrainCols; c += 2) {
      ctx.globalAlpha = 0.35;
      ctx.beginPath();
      for (let r = 0; r < this.terrainRows; r++) {
        const pt = terrain2D[r][c];
        if (r === 0) ctx.moveTo(pt.px, pt.py);
        else ctx.lineTo(pt.px, pt.py);
      }
      ctx.stroke();
    }

    // Atmospheric Horizon Laser Pylons (Vertical Energy Columns)
    for (let p = 2; p < this.terrainCols; p += 4) {
      const basePt = terrain2D[this.terrainRows - 2][p];
      const pylonH = (70 + this.smoothHigh * 120) * basePt.scale;
      ctx.strokeStyle = theme.secondary;
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.65;
      ctx.beginPath();
      ctx.moveTo(basePt.px, basePt.py);
      ctx.lineTo(basePt.px, basePt.py - pylonH);
      ctx.stroke();

      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(basePt.px, basePt.py - pylonH, 2.5 * basePt.scale, 0, Math.PI * 2);
      ctx.fill();
    }

    // --- 2. RENDER HOVERING BRUTALIST MONOLITH OBELISK ---
    const bobY = Math.sin(this.time * 2.2) * (14 + this.smoothBass * 20) - (this.smoothVol * 18);
    const monolithProjected = [];

    for (let i = 0; i < this.monolithVerts.length; i++) {
      const v = this.monolithVerts[i];
      let x = v[0];
      let y = v[1] + bobY;
      let z = v[2];

      // Yaw + Pitch Rotation
      const x1 = x * cosY + z * sinY;
      const z1 = -x * sinY + z * cosY;
      const y2 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;

      const zCam = z2 + 580;
      const scale = fov / (fov + zCam);
      const px = cx + x1 * scale;
      const py = cy + y2 * scale;

      monolithProjected.push({ px, py, z2, x1, y2 });
    }

    // Shaded Monolith Facets with Surface Normals & Metallic Contrast
    this.monolithFaces.forEach((face, fIdx) => {
      const p0 = monolithProjected[face[0]];
      const p1 = monolithProjected[face[1]];
      const p2 = monolithProjected[face[2]];
      const p3 = monolithProjected[face[3]];

      // Cross Product 2D for Back-face Culling
      const cp = (p1.px - p0.px) * (p2.py - p0.py) - (p1.py - p0.py) * (p2.px - p0.px);
      if (cp > 0) { // Visible front facet
        const avgZ = (p0.z2 + p1.z2 + p2.z2 + p3.z2) * 0.25;
        const shade = Math.max(0.12, Math.min(0.85, 0.45 + (fIdx % 2 === 0 ? 0.25 : -0.15) + this.smoothVol * 0.3));

        ctx.fillStyle = theme.isLight 
          ? `rgba(10, 10, 10, ${shade * 0.85})` 
          : `rgba(${parseInt(theme.primary.slice(1,3),16) || 255}, ${parseInt(theme.primary.slice(3,5),16) || 255}, ${parseInt(theme.primary.slice(5,7),16) || 255}, ${shade * 0.35})`;
        ctx.beginPath();
        ctx.moveTo(p0.px, p0.py);
        ctx.lineTo(p1.px, p1.py);
        ctx.lineTo(p2.px, p2.py);
        ctx.lineTo(p3.px, p3.py);
        ctx.closePath();
        ctx.fill();

        // Facet Hairline Outline
        ctx.strokeStyle = theme.primary;
        ctx.lineWidth = 1.6;
        ctx.globalAlpha = 0.9;
        ctx.stroke();
      }
    });

    // Ascending Runic Energy Rings Encircling the Monolith
    const ringCount = 5;
    for (let r = 0; r < ringCount; r++) {
      const rProgress = ((this.time * 0.8 + r * (1 / ringCount)) % 1.0);
      const rY = (rProgress - 0.5) * 320 + bobY;
      const rRadius = (68 + Math.sin(rProgress * Math.PI) * 22) * (1.0 + this.smoothBass * 0.4);

      ctx.strokeStyle = theme.secondary;
      ctx.lineWidth = 1.8;
      ctx.globalAlpha = Math.sin(rProgress * Math.PI) * (0.45 + this.smoothVol * 0.5);

      // Project circle in 3D around Monolith Y axis
      ctx.beginPath();
      const circlePts = 18;
      for (let a = 0; a <= circlePts; a++) {
        const theta = (a / circlePts) * Math.PI * 2;
        const rx = Math.cos(theta) * rRadius;
        const rz = Math.sin(theta) * rRadius;

        const rx1 = rx * cosY + rz * sinY;
        const rz1 = -rx * sinY + rz * cosY;
        const ry2 = rY * cosX - rz1 * sinX;
        const rz2 = rY * sinX + rz1 * cosX;

        const zCam = rz2 + 580;
        const scale = fov / (fov + zCam);
        const px = cx + rx1 * scale;
        const py = cy + ry2 * scale;

        if (a === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
    }

    ctx.restore();
  }
}

// Global scope availability
window.VisualEngine = VisualEngine;

