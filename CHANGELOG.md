# Changelog

All notable changes to **Audio Visual React** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
