/**
 * BROADCAST LIVE — Studio Visualizer (v5.0.0)
 * Minimalist 5-Engine Audio-Reactive System, Non-Black Palettes,
 * Title & Profile Card, QR Station with CTA/URL, & Bottom Spectrogram.
 * Author: Emanuele BDC (EmaF205)
 */

// Analytical Damped Spring Solver (emaf205-web-motion-ui)
class Spring {
  constructor({ stiffness = 220, damping = 15, mass = 1 } = {}) {
    this.stiffness = stiffness;
    this.damping = damping;
    this.mass = mass;
    this.current = 0;
    this.target = 0;
    this.velocity = 0;
    this.animating = false;
    this.rafId = null;
    this.onUpdate = null;
  }
  set(targetVal, startVal = null) {
    if (startVal !== null) this.current = startVal;
    this.target = targetVal;
    if (!this.animating) {
      this.animating = true;
      this._tick(performance.now());
    }
  }
  _tick(lastTime) {
    this.rafId = requestAnimationFrame((now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.032);
      const displacement = this.current - this.target;
      const springForce = -this.stiffness * displacement;
      const dampingForce = -this.damping * this.velocity;
      const acceleration = (springForce + dampingForce) / this.mass;
      this.velocity += acceleration * dt;
      this.current += this.velocity * dt;
      if (typeof this.onUpdate === 'function') this.onUpdate(this.current, this.velocity);
      const isSettled = Math.abs(displacement) < 0.001 && Math.abs(this.velocity) < 0.001;
      if (isSettled) {
        this.current = this.target;
        this.velocity = 0;
        this.animating = false;
        if (typeof this.onUpdate === 'function') this.onUpdate(this.current, 0);
      } else {
        this._tick(now);
      }
    });
  }
  stop() {
    this.animating = false;
    if (this.rafId) cancelAnimationFrame(this.rafId);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('visual-canvas');
  const engine = new VisualEngine(canvas);
  window.engine = engine;

  // DOM Elements — HUD
  const hudContainer = document.getElementById('hud');
  const micPrompt = document.getElementById('mic-prompt');
  const statusToast = document.getElementById('status-toast');
  const statusToastText = document.getElementById('status-toast-text');
  const menuFab = document.getElementById('menu-fab');

  // DOM Elements — STATION 1: Title Card with Optional Profile Photo
  const textBanner = document.getElementById('text-banner');
  const textContent = document.getElementById('text-content');
  const textProfileBadge = document.getElementById('text-profile-badge');
  const profileImgElement = document.getElementById('profile-img-element');
  const toggleTextBanner = document.getElementById('toggle-text-banner');
  const groupTextBody = document.getElementById('group-text-body');
  const inputBannerText = document.getElementById('input-banner-text');
  const textSizeBtns = document.querySelectorAll('.text-size-chip-btn[data-text-size]');
  const toggleProfilePhoto = document.getElementById('toggle-profile-photo');
  const profileUploadRow = document.getElementById('profile-upload-row');
  const profileUrlRow = document.getElementById('profile-url-row');
  const inputProfileFile = document.getElementById('input-profile-file');
  const inputProfileUrl = document.getElementById('input-profile-url');
  const profilePreviewThumb = document.getElementById('profile-preview-thumb');

  // DOM Elements — STATION 2: QR & Media
  const mediaCard = document.getElementById('media-card');
  const mediaCta = document.getElementById('media-cta');
  const mediaQrContainer = document.getElementById('media-qr-container');
  const mediaImgElement = document.getElementById('media-img-element');
  const mediaUrl = document.getElementById('media-url');
  const mediaResizeHandle = document.getElementById('media-resize-handle');
  const toggleMediaCard = document.getElementById('toggle-media-card');
  const groupMediaBody = document.getElementById('group-media-body');
  const btnModeQr = document.getElementById('btn-mode-qr');
  const btnModeImg = document.getElementById('btn-mode-img');
  const mediaSizeBtns = document.querySelectorAll('.size-chip-btn[data-media-size]');
  const mediaQrFields = document.getElementById('media-qr-fields');
  const mediaImgFields = document.getElementById('media-img-fields');
  const inputQrLink = document.getElementById('input-qr-link');
  const toggleQrCta = document.getElementById('toggle-qr-cta');
  const qrCtaInputRow = document.getElementById('qr-cta-input-row');
  const inputQrCta = document.getElementById('input-qr-cta');
  const toggleQrUrl = document.getElementById('toggle-qr-url');
  const qrUrlInputRow = document.getElementById('qr-url-input-row');
  const inputQrDisplayUrl = document.getElementById('input-qr-display-url');
  const inputImgFile = document.getElementById('input-img-file');
  const inputImgUrl = document.getElementById('input-img-url');
  const imgPreviewThumb = document.getElementById('img-preview-thumb');

  // DOM Elements — Bottom Spectrogram (1/4 Screen Height)
  const bottomSpectrogram = document.getElementById('bottom-spectrogram');
  const spectrogramCanvas = document.getElementById('spectrogram-canvas');
  const toggleSpectrogram = document.getElementById('toggle-spectrogram');
  let spectroCtx = spectrogramCanvas ? spectrogramCanvas.getContext('2d') : null;

  // DOM Elements — iOS Settings Drawer
  const settingsDrawer = document.getElementById('settings-drawer');
  const settingsCloseBtn = document.getElementById('settings-close-btn');

  // Scene & Atmosphere Elements
  const activeSceneName = document.getElementById('active-scene-name');
  const activeThemeName = document.getElementById('active-theme-name');
  const sceneSelectBtns = document.querySelectorAll('.scene-select-btn[data-scene]');
  const themeChipBtns = document.querySelectorAll('.theme-chip-btn[data-theme]');
  const btnToggleAutorotate = document.getElementById('btn-toggle-autorotate');
  const sceneModeIndicator = document.getElementById('scene-mode-indicator');
  const autorotateBtnLabel = document.getElementById('autorotate-btn-label');
  const btnStyleMinimal = document.getElementById('btn-style-minimal');
  const btnStyleTurbo = document.getElementById('btn-style-turbo');

  // Studio Controls & PWA Elements
  const toggleAutohide = document.getElementById('toggle-autohide');
  const btnToggleMic = document.getElementById('btn-toggle-mic');
  const btnQuickFullscreen = document.getElementById('btn-quick-fullscreen');
  const btnQuickReset = document.getElementById('btn-quick-reset');
  const btnInstallPwaDrawer = document.getElementById('btn-install-pwa-drawer');
  const pwaInstallBanner = document.getElementById('pwa-install-banner');
  const btnPwaInstall = document.getElementById('btn-pwa-install');
  const btnPwaDismiss = document.getElementById('btn-pwa-dismiss');
  let deferredPrompt = null;

  // Mobile Quick-Tap Scene Pill Elements
  const mobileScenePill = document.getElementById('mobile-scene-pill');
  const btnMobilePrevScene = document.getElementById('btn-mobile-prev-scene');
  const btnMobileCurrScene = document.getElementById('btn-mobile-curr-scene');
  const btnMobileNextScene = document.getElementById('btn-mobile-next-scene');
  const pillChBadge = document.querySelector('.pill-ch-badge');
  const pillSceneTitle = document.querySelector('.pill-scene-title');

  // Defaults
  const DEFAULT_TEXT = "EMANUELE BDC // ARTIFICIAL INTELLIGENCE DIALOGUES";
  const DEFAULT_QR_URL = "https://emanuelebdc.com";
  const DEFAULT_AVATAR = "assets/ema-portrait.jpg";

  // App State
  let isTextVisible = true;
  let currentTextSize = localStorage.getItem('broadcast_text_size') || 'm';
  let isProfileVisible = localStorage.getItem('broadcast_show_profile') === 'true';
  let profileAvatarSrc = localStorage.getItem('broadcast_profile_img') || DEFAULT_AVATAR;

  let isMediaVisible = true;
  let currentMediaMode = localStorage.getItem('broadcast_media_mode') || 'qr';
  let currentMediaSize = localStorage.getItem('broadcast_media_size') || 'm';
  let customImgData = localStorage.getItem('broadcast_custom_img') || DEFAULT_AVATAR;
  let isQrCtaVisible = localStorage.getItem('broadcast_show_qr_cta') === 'true';
  let isQrUrlVisible = localStorage.getItem('broadcast_show_qr_url') === 'true';

  let isSpectrogramVisible = localStorage.getItem('broadcast_show_spectrogram') === 'true';

  let isAutoRotating = true;
  let autoRotateTimer = null;
  let isDrawerOpen = false;
  let isAutohideEnabled = true;
  let idleTimer = null;
  let toastTimeout = null;

  // Audio State
  let audioCtx = null;
  let analyser = null;
  let micStream = null;
  let isMicActive = false;

  const audioData = {
    volume: 0,
    bass: 0,
    mid: 0,
    high: 0,
    rawFreq: null,
    rawWave: null,
    isSpeaking: false
  };

  // --- Resilient Storage Setter (prevents QuotaExceededError crashes) ---
  function safeStorageSet(key, val) {
    try {
      localStorage.setItem(key, String(val));
    } catch (err) {
      if (err.name === 'QuotaExceededError' || err.code === 22) {
        console.warn(`[Storage Quota Exceeded] Unable to persist key: ${key}`);
      }
    }
  }
  window.safeStorageSet = safeStorageSet;

  // --- 1. TOAST NOTIFICATION ---
  function showToast(text, durationMs = 2000) {
    if (statusToast && statusToastText) {
      statusToastText.textContent = text;
      statusToast.classList.add('visible');
      clearTimeout(toastTimeout);
      toastTimeout = setTimeout(() => {
        statusToast.classList.remove('visible');
      }, durationMs);
    }
  }

  // --- 2. TITLE CARD & PROFILE PHOTO ---
  function setTextSize(size, updateStorage = true) {
    size = (size || 'm').toLowerCase();
    if (!['s', 'm', 'l'].includes(size)) size = 'm';
    currentTextSize = size;
    if (updateStorage) safeStorageSet('broadcast_text_size', size);

    if (textBanner) {
      textBanner.classList.remove('size-s', 'size-m', 'size-l');
      textBanner.classList.add(`size-${size}`);
    }

    if (textSizeBtns) {
      textSizeBtns.forEach((btn) => {
        btn.classList.toggle('active', btn.dataset.textSize === size);
      });
    }
  }

  function renderTitleCard() {
    if (!textBanner || !textContent) return;

    const text = inputBannerText ? inputBannerText.value.trim() : '';
    const displayText = text || DEFAULT_TEXT;
    textContent.textContent = displayText;
    safeStorageSet('broadcast_banner_text', displayText);

    if (textProfileBadge) {
      textProfileBadge.classList.toggle('hidden', !isProfileVisible);
    }
    if (profileImgElement) {
      profileImgElement.src = profileAvatarSrc;
    }
    if (profilePreviewThumb) {
      profilePreviewThumb.src = profileAvatarSrc;
    }

    textBanner.classList.toggle('hidden', !isTextVisible || !displayText);
  }

  if (textSizeBtns) {
    textSizeBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        setTextSize(btn.dataset.textSize);
        showToast(`TITLE SIZE: ${btn.dataset.textSize.toUpperCase()}`);
      });
    });
  }

  if (inputBannerText) {
    inputBannerText.addEventListener('input', renderTitleCard);
  }

  if (toggleTextBanner) {
    toggleTextBanner.addEventListener('change', (e) => {
      isTextVisible = e.target.checked;
      safeStorageSet('broadcast_show_text', isTextVisible.toString());
      if (textBanner) textBanner.classList.toggle('hidden', !isTextVisible);
      if (groupTextBody) groupTextBody.style.display = isTextVisible ? 'flex' : 'none';
      showToast(isTextVisible ? 'TITLE: ON' : 'TITLE: OFF');
    });
  }

  // Profile Photo Toggle & Upload
  if (toggleProfilePhoto) {
    toggleProfilePhoto.addEventListener('change', (e) => {
      isProfileVisible = e.target.checked;
      safeStorageSet('broadcast_show_profile', isProfileVisible.toString());
      if (profileUploadRow) profileUploadRow.classList.toggle('hidden', !isProfileVisible);
      if (profileUrlRow) profileUrlRow.classList.toggle('hidden', !isProfileVisible);
      renderTitleCard();
      showToast(isProfileVisible ? 'PROFILE PHOTO: ON' : 'PROFILE PHOTO: OFF');
    });
  }

  if (inputProfileFile) {
    inputProfileFile.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (loadEvt) => {
        profileAvatarSrc = loadEvt.target.result;
        try {
          safeStorageSet('broadcast_profile_img', profileAvatarSrc);
        } catch (_) {}
        renderTitleCard();
        showToast('PHOTO UPDATED');
      };
      reader.readAsDataURL(file);
    });
  }

  if (inputProfileUrl) {
    inputProfileUrl.addEventListener('change', (e) => {
      const val = e.target.value.trim();
      if (val) {
        profileAvatarSrc = val;
        safeStorageSet('broadcast_profile_img', val);
        renderTitleCard();
        showToast('PHOTO UPDATED');
      }
    });
  }

  // --- 3. QR & MEDIA CARD ---
  function setMediaSize(size, updateStorage = true) {
    size = (size || 'm').toLowerCase();
    if (!['s', 'm', 'l'].includes(size)) size = 'm';
    currentMediaSize = size;
    if (updateStorage) safeStorageSet('broadcast_media_size', size);

    if (mediaCard) {
      mediaCard.classList.remove('size-s', 'size-m', 'size-l');
      mediaCard.classList.add(`size-${size}`);
    }

    if (mediaSizeBtns) {
      mediaSizeBtns.forEach((btn) => {
        btn.classList.toggle('active', btn.dataset.mediaSize === size);
      });
    }

    renderMediaContent();
  }

  function setMediaMode(mode) {
    currentMediaMode = mode === 'img' ? 'img' : 'qr';
    safeStorageSet('broadcast_media_mode', currentMediaMode);

    if (btnModeQr) btnModeQr.classList.toggle('active', currentMediaMode === 'qr');
    if (btnModeImg) btnModeImg.classList.toggle('active', currentMediaMode === 'img');

    if (mediaQrFields) mediaQrFields.classList.toggle('hidden', currentMediaMode !== 'qr');
    if (mediaImgFields) mediaImgFields.classList.toggle('hidden', currentMediaMode !== 'img');

    renderMediaContent();
    showToast(currentMediaMode === 'qr' ? 'QR CODE' : 'CUSTOM IMAGE');
  }

  function renderMediaContent() {
    if (!mediaCard) return;

    if (currentMediaMode === 'qr') {
      if (mediaImgElement) mediaImgElement.classList.add('hidden');
      if (mediaQrContainer) {
        mediaQrContainer.classList.remove('hidden');
        mediaQrContainer.innerHTML = '';
        const link = (inputQrLink ? inputQrLink.value.trim() : '') || DEFAULT_QR_URL;
        safeStorageSet('broadcast_qr_url', link);

        if (window.QRCode) {
          try {
            const qrSizes = { s: 76, m: 120, l: 176 };
            const qrPixel = qrSizes[currentMediaSize] || 120;
            new window.QRCode(mediaQrContainer, {
              text: link,
              width: qrPixel,
              height: qrPixel,
              colorDark: '#000000',
              colorLight: '#ffffff',
              correctLevel: window.QRCode.CorrectLevel.M
            });
          } catch (_) {}
        }
      }

      // Optional CTA Label
      if (mediaCta) {
        mediaCta.classList.toggle('hidden', !isQrCtaVisible);
        const ctaText = inputQrCta ? inputQrCta.value.trim() : '';
        mediaCta.textContent = ctaText || 'SCAN TO CONNECT';
      }

      // Optional URL Label
      if (mediaUrl) {
        mediaUrl.classList.toggle('hidden', !isQrUrlVisible);
        const urlText = inputQrDisplayUrl ? inputQrDisplayUrl.value.trim() : '';
        mediaUrl.textContent = urlText || 'emanuelebdc.com';
      }
    } else {
      // Image Mode
      if (mediaQrContainer) mediaQrContainer.classList.add('hidden');
      if (mediaCta) mediaCta.classList.add('hidden');
      if (mediaUrl) mediaUrl.classList.add('hidden');
      if (mediaImgElement) {
        mediaImgElement.classList.remove('hidden');
        mediaImgElement.src = customImgData;
        if (imgPreviewThumb) imgPreviewThumb.src = customImgData;
      }
    }

    mediaCard.classList.toggle('hidden', !isMediaVisible);
  }

  if (mediaSizeBtns) {
    mediaSizeBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        setMediaSize(btn.dataset.mediaSize);
        showToast(`MEDIA SIZE: ${btn.dataset.mediaSize.toUpperCase()}`);
      });
    });
  }

  if (btnModeQr) btnModeQr.addEventListener('click', () => setMediaMode('qr'));
  if (btnModeImg) btnModeImg.addEventListener('click', () => setMediaMode('img'));

  if (inputQrLink) inputQrLink.addEventListener('input', () => { if (currentMediaMode === 'qr') renderMediaContent(); });

  // CTA & URL Toggles
  if (toggleQrCta) {
    toggleQrCta.addEventListener('change', (e) => {
      isQrCtaVisible = e.target.checked;
      safeStorageSet('broadcast_show_qr_cta', isQrCtaVisible.toString());
      if (qrCtaInputRow) qrCtaInputRow.classList.toggle('hidden', !isQrCtaVisible);
      renderMediaContent();
    });
  }
  if (inputQrCta) inputQrCta.addEventListener('input', renderMediaContent);

  if (toggleQrUrl) {
    toggleQrUrl.addEventListener('change', (e) => {
      isQrUrlVisible = e.target.checked;
      safeStorageSet('broadcast_show_qr_url', isQrUrlVisible.toString());
      if (qrUrlInputRow) qrUrlInputRow.classList.toggle('hidden', !isQrUrlVisible);
      renderMediaContent();
    });
  }
  if (inputQrDisplayUrl) inputQrDisplayUrl.addEventListener('input', renderMediaContent);

  if (toggleMediaCard) {
    toggleMediaCard.addEventListener('change', (e) => {
      isMediaVisible = e.target.checked;
      safeStorageSet('broadcast_show_media', isMediaVisible.toString());
      if (mediaCard) mediaCard.classList.toggle('hidden', !isMediaVisible);
      if (groupMediaBody) groupMediaBody.style.display = isMediaVisible ? 'flex' : 'none';
      showToast(isMediaVisible ? 'MEDIA: ON' : 'MEDIA: OFF');
    });
  }

  // Tap corner handle to cycle media size S -> M -> L
  if (mediaResizeHandle) {
    mediaResizeHandle.addEventListener('click', (e) => {
      e.stopPropagation();
      const nextMap = { s: 'm', m: 'l', l: 's' };
      const nextSize = nextMap[currentMediaSize] || 'm';
      setMediaSize(nextSize);
      showToast(`SIZE: ${nextSize.toUpperCase()}`);
    });
  }

  // Upload custom image
  if (inputImgFile) {
    inputImgFile.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (loadEvt) => {
        customImgData = loadEvt.target.result;
        try { safeStorageSet('broadcast_custom_img', customImgData); } catch (_) {}
        renderMediaContent();
        showToast('IMAGE LOADED');
      };
      reader.readAsDataURL(file);
    });
  }

  if (inputImgUrl) {
    inputImgUrl.addEventListener('change', (e) => {
      const url = e.target.value.trim();
      if (url) {
        customImgData = url;
        safeStorageSet('broadcast_custom_img', url);
        renderMediaContent();
        showToast('IMAGE UPDATED');
      }
    });
  }

  // --- 4. BOTTOM SPECTROGRAM DOCK (1/4 Viewport Height) ---
  function updateSpectrogram() {
    if (!spectrogramCanvas || !bottomSpectrogram) return;

    if (isSpectrogramVisible) {
      bottomSpectrogram.classList.remove('hidden');
      const rect = bottomSpectrogram.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.floor(rect.width);
      const h = Math.floor(rect.height - 22);

      if (spectrogramCanvas.width !== w * dpr || spectrogramCanvas.height !== h * dpr) {
        spectrogramCanvas.width = w * dpr;
        spectrogramCanvas.height = h * dpr;
        spectroCtx.setTransform(1, 0, 0, 1, 0, 0);
        spectroCtx.scale(dpr, dpr);
      }

      spectroCtx.clearRect(0, 0, w, h);

      const theme = engine.theme;
      const barCount = 72;
      const barWidth = Math.max(2, (w / barCount) - 2.5);
      const freq = audioData.rawFreq;

      for (let i = 0; i < barCount; i++) {
        let val = 0;
        if (freq && isMicActive) {
          const bin = Math.floor((i / barCount) * Math.min(freq.length, 128));
          val = (freq[bin] / 255.0);
        } else {
          // Synthetic ambient breath when mic idle
          const t = performance.now() * 0.002;
          val = (Math.sin(t * 3 + i * 0.18) * 0.5 + 0.5) * (0.15 + audioData.volume * 0.4);
        }

        const barHeight = Math.max(3, val * (h - 8));
        const x = i * (barWidth + 2.5) + 4;
        const y = h - barHeight;

        // Gradient Bar
        const grad = spectroCtx.createLinearGradient(0, y, 0, h);
        grad.addColorStop(0, theme.isLight ? '#000000' : theme.primary);
        grad.addColorStop(1, theme.isLight ? 'rgba(0,0,0,0.2)' : `${theme.secondary}33`);

        spectroCtx.fillStyle = grad;
        spectroCtx.fillRect(x, y, barWidth, barHeight);

        // Peak Pip
        spectroCtx.fillStyle = theme.secondary;
        spectroCtx.fillRect(x, Math.max(0, y - 2), barWidth, 2);
      }
    } else {
      bottomSpectrogram.classList.add('hidden');
    }
  }

  if (toggleSpectrogram) {
    toggleSpectrogram.addEventListener('change', (e) => {
      isSpectrogramVisible = e.target.checked;
      safeStorageSet('broadcast_show_spectrogram', isSpectrogramVisible.toString());
      updateSpectrogram();
      showToast(isSpectrogramVisible ? 'SPECTROGRAM: ON' : 'SPECTROGRAM: OFF');
    });
  }

  // --- 5. DRAG & DROP WITH SPRING SETTLING ---
  function makeDraggable(element, storageKey) {
    if (!element) return;

    let isDragging = false;
    let startX = 0, startY = 0;
    let initialLeft = 0, initialTop = 0;

    const savedLeft = localStorage.getItem(`${storageKey}_left`);
    const savedTop = localStorage.getItem(`${storageKey}_top`);

    if (savedLeft !== null && savedTop !== null) {
      element.style.left = `${Math.min(window.innerWidth - 80, Math.max(10, parseFloat(savedLeft)))}px`;
      element.style.top = `${Math.min(window.innerHeight - 60, Math.max(10, parseFloat(savedTop)))}px`;
      element.style.right = 'auto';
      element.style.bottom = 'auto';
    }

    function onPointerDown(e) {
      if (e.target.closest('.resize-handle') || e.target.tagName === 'A' || e.target.tagName === 'BUTTON') return;

      isDragging = true;
      element.classList.add('is-dragging');

      const clientX = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0].clientX);
      const clientY = e.clientY !== undefined ? e.clientY : (e.touches && e.touches[0].clientY);

      startX = clientX;
      startY = clientY;

      const rect = element.getBoundingClientRect();
      initialLeft = rect.left;
      initialTop = rect.top;

      element.style.left = `${initialLeft}px`;
      element.style.top = `${initialTop}px`;
      element.style.right = 'auto';
      element.style.bottom = 'auto';

      window.addEventListener('mousemove', onPointerMove);
      window.addEventListener('mouseup', onPointerUp);
      window.addEventListener('touchmove', onPointerMove, { passive: false });
      window.addEventListener('touchend', onPointerUp);
    }

    function onPointerMove(e) {
      if (!isDragging) return;
      if (e.cancelable) e.preventDefault();

      const clientX = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0].clientX);
      const clientY = e.clientY !== undefined ? e.clientY : (e.touches && e.touches[0].clientY);

      const dx = clientX - startX;
      const dy = clientY - startY;

      const rect = element.getBoundingClientRect();
      const maxLeft = window.innerWidth - rect.width - 10;
      const maxTop = window.innerHeight - rect.height - 10;

      const newLeft = Math.max(10, Math.min(maxLeft, initialLeft + dx));
      const newTop = Math.max(10, Math.min(maxTop, initialTop + dy));

      element.style.left = `${newLeft}px`;
      element.style.top = `${newTop}px`;
    }

    function onPointerUp() {
      if (!isDragging) return;
      isDragging = false;
      element.classList.remove('is-dragging');

      const rect = element.getBoundingClientRect();
      safeStorageSet(`${storageKey}_left`, rect.left);
      safeStorageSet(`${storageKey}_top`, rect.top);

      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
    }

    element.addEventListener('mousedown', onPointerDown);
    element.addEventListener('touchstart', onPointerDown, { passive: true });
  }

  makeDraggable(textBanner, 'text');
  makeDraggable(mediaCard, 'media');

  // --- 6. 3D SCENE CONTROLS (5 Channels) ---
  const SHORT_SCENE_NAMES = ['GEODESIC', 'TESSERACT', 'WARP', 'SYNCHRO', 'MONOLITH'];

  function updateSceneUI(scene, notify = true) {
    const rawName = scene.name.replace(/^CH \d+ \/\/ /, '');
    if (activeSceneName) activeSceneName.textContent = rawName;
    if (sceneSelectBtns) {
      sceneSelectBtns.forEach((btn, idx) => {
        btn.classList.toggle('active', idx === engine.currentScene);
      });
    }

    if (pillChBadge) {
      pillChBadge.textContent = String(engine.currentScene + 1).padStart(2, '0');
    }
    if (pillSceneTitle) {
      pillSceneTitle.textContent = SHORT_SCENE_NAMES[engine.currentScene] || rawName;
    }

    if (notify) showToast(`SCENE: ${rawName}`);
  }

  function triggerNextScene() {
    if (navigator.vibrate) navigator.vibrate(12);
    const sc = engine.nextScene();
    updateSceneUI(sc, true);
  }

  function triggerPrevScene() {
    if (navigator.vibrate) navigator.vibrate(12);
    const sc = engine.prevScene();
    updateSceneUI(sc, true);
  }

  // Mobile Pill Quick-Tap Listeners
  if (btnMobileCurrScene) {
    btnMobileCurrScene.addEventListener('click', (e) => {
      e.preventDefault();
      triggerNextScene();
    });
  }

  if (btnMobileNextScene) {
    btnMobileNextScene.addEventListener('click', (e) => {
      e.preventDefault();
      triggerNextScene();
    });
  }

  if (btnMobilePrevScene) {
    btnMobilePrevScene.addEventListener('click', (e) => {
      e.preventDefault();
      triggerPrevScene();
    });
  }

  // Direct Mobile Tap & Swipe on Canvas (1-Tap Animation Switching)
  let touchStartX = 0;
  let touchStartY = 0;
  let touchStartTime = 0;

  canvas.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchStartTime = performance.now();
    }
  }, { passive: true });

  canvas.addEventListener('touchend', (e) => {
    if (isDrawerOpen) return;
    if (e.changedTouches.length === 1) {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const dx = touchEndX - touchStartX;
      const dy = touchEndY - touchStartY;
      const dt = performance.now() - touchStartTime;
      const dist = Math.hypot(dx, dy);

      // Clean Quick Tap on background (< 15px movement, < 350ms duration)
      if (dist < 15 && dt < 350) {
        triggerNextScene();
      }
      // Horizontal swipe to cycle forward (swipe left)
      else if (dx < -50 && Math.abs(dy) < 60 && dt < 450) {
        triggerNextScene();
      }
      // Horizontal swipe to cycle backward (swipe right)
      else if (dx > 50 && Math.abs(dy) < 60 && dt < 450) {
        triggerPrevScene();
      }
    }
  }, { passive: true });

  function startAutoRotation() {
    clearInterval(autoRotateTimer);
    isAutoRotating = true;
    autoRotateTimer = setInterval(() => {
      if (isAutoRotating) {
        const sc = engine.nextScene();
        updateSceneUI(sc, true);
      }
    }, 20000);

    if (sceneModeIndicator) {
      sceneModeIndicator.className = 'scene-mode-pill rotating';
      sceneModeIndicator.textContent = '● ON';
    }
    if (autorotateBtnLabel) autorotateBtnLabel.textContent = 'AUTO-ROTATE SCENES';
  }

  function stopAutoRotation() {
    clearInterval(autoRotateTimer);
    isAutoRotating = false;
    if (sceneModeIndicator) {
      sceneModeIndicator.className = 'scene-mode-pill fixed';
      sceneModeIndicator.textContent = 'LOCKED';
    }
    if (autorotateBtnLabel) autorotateBtnLabel.textContent = 'LOCKED (TAP FOR AUTO)';
  }

  if (sceneSelectBtns) {
    sceneSelectBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-scene'), 10);
        const sc = engine.setScene(idx);
        stopAutoRotation();
        updateSceneUI(sc, false);
        showToast(`LOCKED: ${sc.name.replace(/^CH \d+ \/\/ /, '')}`);
      });
    });
  }

  if (btnToggleAutorotate) {
    btnToggleAutorotate.addEventListener('click', () => {
      if (isAutoRotating) {
        stopAutoRotation();
        showToast(`LOCKED: ${engine.currentSceneInfo.name.replace(/^CH \d+ \/\/ /, '')}`);
      } else {
        startAutoRotation();
        const sc = engine.nextScene();
        updateSceneUI(sc, false);
        showToast('AUTO-ROTATE: ON');
      }
    });
  }

  // Motion Style Controls (Minimal vs Turbo)
  function setMotionStyle(style) {
    const activeStyle = engine.setMotionStyle(style);
    safeStorageSet('broadcast_motion_style', activeStyle);
    if (btnStyleMinimal) btnStyleMinimal.classList.toggle('active', activeStyle === 'minimal');
    if (btnStyleTurbo) btnStyleTurbo.classList.toggle('active', activeStyle === 'turbo');
    showToast(`MOTION STYLE: ${activeStyle.toUpperCase()}`);
  }

  if (btnStyleMinimal) btnStyleMinimal.addEventListener('click', () => setMotionStyle('minimal'));
  if (btnStyleTurbo) btnStyleTurbo.addEventListener('click', () => setMotionStyle('turbo'));

  // --- 7. ATMOSPHERE & COLOR PALETTE CONTROLS ---
  function applyTheme(theme) {
    document.body.classList.toggle('theme-light', !!theme.isLight);
    if (activeThemeName) activeThemeName.textContent = theme.name.split(' ')[0];
    if (themeChipBtns) {
      themeChipBtns.forEach((btn, idx) => {
        btn.classList.toggle('active', idx === engine.themeIndex);
      });
    }
    showToast(`THEME: ${theme.name}`);
  }

  if (themeChipBtns) {
    themeChipBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-theme'), 10);
        engine.themeIndex = idx;
        applyTheme(engine.theme);
      });
    });
  }

  // --- 8. RESET LAYOUT ---
  if (btnQuickReset) {
    btnQuickReset.addEventListener('click', () => {
      localStorage.removeItem('media_left');
      localStorage.removeItem('media_top');
      localStorage.removeItem('broadcast_media_size');
      localStorage.removeItem('text_left');
      localStorage.removeItem('text_top');
      localStorage.removeItem('broadcast_text_size');

      if (mediaCard) {
        mediaCard.style.left = '';
        mediaCard.style.top = '';
        mediaCard.style.right = '';
        mediaCard.style.bottom = '';
      }
      setMediaSize('m');

      if (textBanner) {
        textBanner.style.left = '';
        textBanner.style.top = '';
        textBanner.style.right = '';
        textBanner.style.bottom = '';
      }
      setTextSize('m');

      showToast('LAYOUT RESET');
    });
  }

  // --- 9. DRAWER & IDLE CONTROLS ---
  let lastFocusedElement = null;

  function resetIdle() {
    document.body.classList.remove('is-idle');
    if (idleTimer) clearTimeout(idleTimer);
    if (!isDrawerOpen && isAutohideEnabled) {
      idleTimer = setTimeout(() => {
        document.body.classList.add('is-idle');
      }, 3000);
    }
  }

  ['mousemove', 'pointerdown', 'keydown', 'touchstart'].forEach((evt) => {
    window.addEventListener(evt, resetIdle, { passive: true });
  });

  function openDrawer() {
    isDrawerOpen = true;
    lastFocusedElement = document.activeElement;
    document.body.classList.remove('is-idle');
    if (idleTimer) clearTimeout(idleTimer);
    settingsDrawer.classList.remove('hidden');
    if (menuFab) menuFab.setAttribute('aria-expanded', 'true');
    if (settingsCloseBtn) {
      setTimeout(() => settingsCloseBtn.focus(), 60);
    }
  }

  function closeDrawer() {
    isDrawerOpen = false;
    settingsDrawer.classList.add('hidden');
    if (menuFab) menuFab.setAttribute('aria-expanded', 'false');
    resetIdle();
    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  }

  if (settingsDrawer) {
    settingsDrawer.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        const focusable = settingsDrawer.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const focusableArr = Array.from(focusable).filter(el => !el.disabled && el.offsetParent !== null);
        if (focusableArr.length === 0) return;

        const first = focusableArr[0];
        const last = focusableArr[focusableArr.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    });
  }

  if (menuFab) menuFab.addEventListener('click', () => isDrawerOpen ? closeDrawer() : openDrawer());
  if (settingsCloseBtn) settingsCloseBtn.addEventListener('click', closeDrawer);
  if (settingsDrawer) {
    const backdrop = settingsDrawer.querySelector('.settings-backdrop');
    if (backdrop) backdrop.addEventListener('click', closeDrawer);
  }

  if (toggleAutohide) {
    toggleAutohide.addEventListener('change', (e) => {
      isAutohideEnabled = e.target.checked;
      safeStorageSet('broadcast_autohide_menu', isAutohideEnabled.toString());
      resetIdle();
      showToast(isAutohideEnabled ? 'AUTO-HIDE: ON' : 'AUTO-HIDE: OFF');
    });
  }

  // Fullscreen
  if (btnQuickFullscreen) {
    btnQuickFullscreen.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
        showToast('FULLSCREEN');
      } else {
        document.exitFullscreen().catch(() => {});
        showToast('EXIT FULLSCREEN');
      }
    });
  }

  // --- 10. MICROPHONE & AUDIO ---
  async function initAudio() {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!audioCtx) audioCtx = new AudioContextClass();
      if (audioCtx.state === 'suspended') await audioCtx.resume();

      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        micStream = await navigator.mediaDevices.getUserMedia({
          audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false }
        });

        const source = audioCtx.createMediaStreamSource(micStream);
        analyser = audioCtx.createAnalyser();
        analyser.fftSize = 512;
        analyser.smoothingTimeConstant = 0.8;
        source.connect(analyser);

        isMicActive = true;
        updateMicUI(true);
        if (micPrompt) micPrompt.classList.add('hidden');
        showToast('MICROPHONE ACTIVE');
        return true;
      }
    } catch (_) {
      isMicActive = false;
      updateMicUI(false);
      if (micPrompt) micPrompt.classList.add('hidden');
      return false;
    }
  }

  function updateMicUI(active) {
    if (btnToggleMic) {
      btnToggleMic.classList.toggle('muted', !active);
      btnToggleMic.innerHTML = `<span class="mic-dot">●</span><span>MICROPHONE: ${active ? 'ACTIVE' : 'MUTED'}</span>`;
    }
  }

  function toggleMic() {
    if (!micStream) {
      initAudio();
      return;
    }
    const audioTracks = micStream.getAudioTracks();
    if (audioTracks.length > 0) {
      audioTracks[0].enabled = !audioTracks[0].enabled;
      isMicActive = audioTracks[0].enabled;
      updateMicUI(isMicActive);
      showToast(isMicActive ? 'MIC: ACTIVE' : 'MIC: MUTED');
    }
  }

  if (btnToggleMic) btnToggleMic.addEventListener('click', toggleMic);
  if (micPrompt) micPrompt.addEventListener('click', (e) => { e.stopPropagation(); initAudio(); });
  window.addEventListener('click', () => { if (!isMicActive && !audioCtx) initAudio(); }, { once: true });

  // PWA Installation Handlers
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (pwaInstallBanner && localStorage.getItem('broadcast_pwa_dismissed') !== 'true') {
      pwaInstallBanner.classList.remove('hidden');
    }
  });

  async function triggerPwaInstall() {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        showToast('INSTALLING APP...');
      }
      deferredPrompt = null;
      if (pwaInstallBanner) pwaInstallBanner.classList.add('hidden');
    } else {
      const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      if (isIos) {
        showToast('TAP SHARE ⎋ → ADD TO HOME SCREEN ⊞', 4000);
      } else {
        showToast('PWA READY / USE BROWSER MENU ⊞', 3000);
      }
    }
  }

  if (btnPwaInstall) btnPwaInstall.addEventListener('click', triggerPwaInstall);
  if (btnInstallPwaDrawer) btnInstallPwaDrawer.addEventListener('click', triggerPwaInstall);
  if (btnPwaDismiss) {
    btnPwaDismiss.addEventListener('click', () => {
      if (pwaInstallBanner) pwaInstallBanner.classList.add('hidden');
      safeStorageSet('broadcast_pwa_dismissed', 'true');
    });
  }

  function sampleAudio() {
    if (!analyser || !isMicActive) {
      const t = performance.now() * 0.001;
      const synthVol = 0.08 + Math.sin(t * 1.6) * 0.04;
      audioData.volume = synthVol;
      audioData.bass = synthVol * 1.3;
      audioData.mid = synthVol * 0.8;
      audioData.high = synthVol * 0.5;
      audioData.isSpeaking = false;
      return;
    }

    const bufferLength = analyser.frequencyBinCount;
    const freqData = new Uint8Array(bufferLength);
    const timeData = new Uint8Array(bufferLength);

    analyser.getByteFrequencyData(freqData);
    analyser.getByteTimeDomainData(timeData);

    audioData.rawFreq = freqData;
    audioData.rawWave = timeData;

    let sumSquares = 0;
    for (let i = 0; i < timeData.length; i++) {
      const norm = (timeData[i] - 128) / 128;
      sumSquares += norm * norm;
    }
    const rms = Math.sqrt(sumSquares / timeData.length);
    audioData.volume = Math.min(1.0, rms * 4.2);

    let bassSum = 0; for (let i = 0; i < 8; i++) bassSum += freqData[i];
    let midSum = 0; for (let i = 8; i < 32; i++) midSum += freqData[i];
    let highSum = 0; for (let i = 32; i < 90; i++) highSum += freqData[i];

    audioData.bass = Math.min(1.0, (bassSum / (8 * 255)) * 2.4);
    audioData.mid = Math.min(1.0, (midSum / (24 * 255)) * 2.2);
    audioData.high = Math.min(1.0, (highSum / (58 * 255)) * 2.5);
    audioData.isSpeaking = audioData.volume > 0.06;
  }

  // --- 11. KEYBOARD SHORTCUTS ---
  window.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

    const upperKey = e.key.toUpperCase();

    if (upperKey === 'R') {
      startAutoRotation();
      const info = engine.randomize();
      updateSceneUI(engine.currentSceneInfo, false);
      showToast(`RANDOM: ${info.scene.replace(/^CH \d+ \/\/ /, '')}`);
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const sc = engine.nextScene();
      updateSceneUI(sc);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const sc = engine.prevScene();
      updateSceneUI(sc);
    } else if (['1', '2', '3', '4', '5'].includes(e.key)) {
      const idx = parseInt(e.key, 10) - 1;
      const sc = engine.setScene(idx);
      stopAutoRotation();
      updateSceneUI(sc, false);
      showToast(`LOCKED: ${sc.name.replace(/^CH \d+ \/\/ /, '')}`);
    } else if (e.code === 'Space') {
      e.preventDefault();
      const theme = engine.nextTheme();
      applyTheme(theme);
    } else if (upperKey === 'S') {
      isSpectrogramVisible = !isSpectrogramVisible;
      safeStorageSet('broadcast_show_spectrogram', isSpectrogramVisible.toString());
      if (toggleSpectrogram) toggleSpectrogram.checked = isSpectrogramVisible;
      updateSpectrogram();
      showToast(isSpectrogramVisible ? 'SPECTROGRAM: ON' : 'SPECTROGRAM: OFF');
    } else if (upperKey === 'F') {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
        showToast('FULLSCREEN');
      } else {
        document.exitFullscreen().catch(() => {});
        showToast('EXIT FULLSCREEN');
      }
    } else if (upperKey === 'H') {
      const isHidden = hudContainer.classList.toggle('hud-hidden');
      showToast(isHidden ? 'ZERO-HUD (PRESS H)' : 'HUD VISIBLE');
    } else if (upperKey === 'M') {
      toggleMic();
    } else if (e.key === 'Escape') {
      if (isDrawerOpen) closeDrawer();
      else if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    }
  });

  // --- 12. INITIALIZATION ---
  try {
    const savedShowMedia = localStorage.getItem('broadcast_show_media');
    if (savedShowMedia !== null) isMediaVisible = savedShowMedia === 'true';
    if (toggleMediaCard) toggleMediaCard.checked = isMediaVisible;

    const savedShowText = localStorage.getItem('broadcast_show_text');
    if (savedShowText !== null) isTextVisible = savedShowText === 'true';
    if (toggleTextBanner) toggleTextBanner.checked = isTextVisible;

    if (toggleProfilePhoto) toggleProfilePhoto.checked = isProfileVisible;
    if (profileUploadRow) profileUploadRow.classList.toggle('hidden', !isProfileVisible);
    if (profileUrlRow) profileUrlRow.classList.toggle('hidden', !isProfileVisible);

    const savedQrUrl = localStorage.getItem('broadcast_qr_url');
    if (savedQrUrl && inputQrLink) inputQrLink.value = savedQrUrl;

    const savedBannerText = localStorage.getItem('broadcast_banner_text');
    if (savedBannerText && inputBannerText) inputBannerText.value = savedBannerText;

    if (toggleQrCta) toggleQrCta.checked = isQrCtaVisible;
    if (qrCtaInputRow) qrCtaInputRow.classList.toggle('hidden', !isQrCtaVisible);

    if (toggleQrUrl) toggleQrUrl.checked = isQrUrlVisible;
    if (qrUrlInputRow) qrUrlInputRow.classList.toggle('hidden', !isQrUrlVisible);

    if (toggleSpectrogram) toggleSpectrogram.checked = isSpectrogramVisible;

    const savedAutohide = localStorage.getItem('broadcast_autohide_menu');
    if (savedAutohide !== null) {
      isAutohideEnabled = savedAutohide === 'true';
      if (toggleAutohide) toggleAutohide.checked = isAutohideEnabled;
    }
  } catch (_) {}

  const savedMotionStyle = localStorage.getItem('broadcast_motion_style');
  if (savedMotionStyle) {
    setMotionStyle(savedMotionStyle);
  } else {
    setMotionStyle('turbo');
  }

  setMediaSize(currentMediaSize, false);
  setMediaMode(currentMediaMode);
  setTextSize(currentTextSize, false);
  renderTitleCard();
  updateSpectrogram();
  resetIdle();

  // Initial random atmosphere and scene
  engine.randomize();
  applyTheme(engine.theme);
  updateSceneUI(engine.currentSceneInfo, false);
  startAutoRotation();

  // --- 13. MAIN 60 FPS LOOP ---
  let lastTime = performance.now();
  function loop(now) {
    const dt = Math.min((now - lastTime) * 0.001, 0.1);
    lastTime = now;

    sampleAudio();
    engine.render(audioData, dt);
    if (isSpectrogramVisible) updateSpectrogram();

    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  // Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js').catch(() => {});
  }
});
