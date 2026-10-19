const CACHE_NAME = 'audio-visual-react-v521';
const ASSETS_TO_CACHE = [
  './',
  './index.html?v=521',
  './style.css?v=521',
  './app.js?v=521',
  './visuals.js?v=521',
  './qrcode.min.js?v=521',
  './manifest.webmanifest',
  './assets/ema-portrait.jpg',
  './assets/icon-192.png',
  './assets/icon-512.png',
  './assets/apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) {
        // Fetch background update
        fetch(event.request).then((fresh) => {
          if (fresh && fresh.status === 200) {
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, fresh));
          }
        }).catch(() => {});
        return cached;
      }
      return fetch(event.request).then((fresh) => {
        if (fresh && fresh.status === 200) {
          const clone = fresh.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return fresh;
      }).catch(() => caches.match('./index.html?v=510'));
    })
  );
});
