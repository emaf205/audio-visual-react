# Changelog

All notable changes to **Audio Visual React** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [5.6.0] - 2026-10-19
### Added
- **Default Clean Canvas on Launch**: Starts with zero overlays on initial boot—only the pure 60 FPS 3D geometric animation is visible, maximizing aesthetic impact and zero visual clutter.
- **Master Action Bar**: Instant 1-tap `⚡ LOAD DEMO` (turns on Title, QR & Media, Digital Clock, and LED Marquee ticker simultaneously) and `↺ RESET SCHERMO` (wipes all overlays back to clean canvas in 1 tap).
- **Streamlined iOS Grouped Settings**: Radically simplified settings drawer inspired by native Apple iOS settings:
  - Single **COSA MOSTRARE SULLO SCHERMO** master section with 6 switch toggles and live active badge counter (`0 ATTIVI` to `6 ATTIVI`).
  - High-performance **iOS Dropdown Menus** (`<select class="ios-dropdown-select">`) for 3D Scenes (CH 01 to CH 07) and Atmosphere Templates (with Light / Dark optgroups).
  - Dedicated **Testi & Dimensioni Overlay** section with dropdowns for Monumental text sizes (XL, XXL, XXXXL) and LED colors (Theme Reactive, Pharmacy Green, Amber, Cyan).
- **Monumental LED Marquee Sizes (XL 52px, XXL 70px, XXXXL 96px)**: Responsive monumental ticker tape with adaptive speed and full theme color reactivity across both dark and light atmosphere templates.
- **12 Curated Atmosphere Templates (6 Light & 6 Dark)**: 6 architectural light modes (Swiss Paper, Nordic Ceramic, Gallery Ecru, Tokyo Mint, Aluminum, Architect Chalk) and 6 nocturnes (Cobalt, Campari, Emerald, Electric Indigo, Solar Titanium, Acid Obsidian) with adaptive canvas pip/vertex contrast.
- **Service Worker Cache-Busting v560**: Upgraded PWA cache to `audio-visual-react-v560` ensuring immediate asset delivery.

## [5.4.0] - 2026-10-19
### Added
- **CH 06 // 3D POLYHEDRAL STELLATION**: Realistic Kepler-Poinsot icosahedral star polyhedra with 60 shaded triangular facets (Lambertian diffuse cosine shading $\mathbf{N} \cdot \mathbf{L}$, specular highlights, depth-sorted Painter's algorithm), audio-reactive radial spike explosion, inner counter-rotating octahedron seed, and an animated background of drifting 3D micro-crystals + radiant energy shockwaves.
- **CH 07 // 3D CYBER HELIX LATTICE**: Monumental 3D double-helical superstructure with parametric polygonal cross-struts and illuminated plates, audio-reactive VU-meter rung lighting & breathing radius, and an animated background of undulating 3D perspective floor/ceiling vector grids + distant horizon data conduit beams.
- **Digital LED Marquee Ticker ("Farmacia" Style)**: Customizable scrolling digital LED ticker tape that floats across the screen above animations, with drawer toggle, message input, color modes (Pharmacy Green `✚`, Theme Reactive `⚡`, Amber `●`, Cyber Cyan `◈`), speed controls (Slow, Normal, Fast), top/bottom positioning, and adaptive auto-docking above the 1/3 spectrogram.
- **1/3 Viewport Height Spectrogram Dock**: Expanded bottom audio spectrogram analyzer height from 1/4 (25vh) to exactly **1/3** (`33.333dvh`) of the video/screen, providing expanded dynamic vertical range for frequency bars and peak detection.

## [5.3.0] - 2026-10-19
### Added
- **Independent QR Code & Custom Image Toggles**: Media card now supports displaying QR code only, custom image only, **both simultaneously** (with adaptive `.dual-media` side-by-side / stacked responsive chassis), or neither.
- **Theme-Reactive Geometric Digital Clock Widget**: Live architectural digital clock widget (`HH:MM:SS`, tabular monospace figures, live pulsing dot, and date/UTC offset indicator) that dynamically inherits active visualizer animation colors (`--clock-accent`, `--clock-glow`, `--clock-primary`).
- **Unified Vertical Draggable Dock (Stack Mode)**: Capability to dock all active stations (Title, Clock, QR, Custom Image) into a single monolithic vertical movable pillar that can be dragged as a single unit or uncoupled into separate floating cards.

## [5.2.1] - 2026-10-19
### Enhanced
- **WCAG Accessibility & Focus Trapping**: Added explicit `:focus-visible` high-contrast indicators, `role="dialog" aria-modal="true"` dialog semantics to the studio settings drawer, automatic keyboard focus cycling (`Tab`), and `Escape` key restoration.
- **Storage Resilience**: Implemented `safeStorageSet` wrapper preventing unhandled `QuotaExceededError` or corrupted data crashes.
- **Microphone & Button ARIA Labels**: Added accessible descriptions across all icon-only buttons.

## [5.2.0] - 2026-10-19
### Added
- **Mobile 1-Tap Scene Switcher Pill**: Floating bottom-left capsule featuring active channel badge (`01-05`), scene name, and touch arrows (`‹` and `›`) for instantaneous animation switching.
- **Background Tap & Swipe Gestures**: Direct canvas touch handler enabling single-tap animation advancement and horizontal swipe left/right (`engine.nextScene()` / `engine.prevScene()`) with subtle tactile haptic vibration (`navigator.vibrate(12)`).
- **Service Worker Cache-Busting**: Upgraded cache partition to `v520` with cache invalidation to prevent stale asset serving across mobile web browsers.

## [5.0.0] - 2026-10-19
### Added
- **Full English Interface**: Complete redesign removing all redundant text and adopting concise app-first UX.
- **Minimal vs. Turbo Motion Styles**: Studio control toggle for low-complexity versus maximum-intensity 3D visuals.
- **PWA Installation Flow**: Native `beforeinstallprompt` banner and in-drawer install button with offline asset caching.
- **Live Deployment & Hub Integration**: Published on `https://emanuelebdc.com/ideas/audio-visual-react/` and listed in Ideas Hub.
