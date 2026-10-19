# Changelog

All notable changes to **Audio Visual React** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
