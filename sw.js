const APP_PREFIX = 'co-caro-den-trang-cache-';
const CACHE_NAME = APP_PREFIX + 'v1'; // nâng v1 -> v2 khi phát hành bản mới

const APP_SHELL = [
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-512-maskable.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names
          .filter((n) => n.startsWith(APP_PREFIX) && n !== CACHE_NAME) // chỉ cache của app này
          .map((n) => caches.delete(n))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  // Chỉ can thiệp tài nguyên tĩnh của app và request điều hướng.
  // Mọi request khác (kể cả kết nối chơi online tới máy chủ trung gian) để trình duyệt tự xử lý.
  const url = new URL(req.url);
  const isShell = APP_SHELL.some((p) => new URL(p, self.location).href === url.href);
  if (!isShell && req.mode !== 'navigate') return;

  event.respondWith(
    caches.open(CACHE_NAME).then((cache) =>
      cache.match(req, { ignoreSearch: true }).then((cached) => {
        if (cached) return cached;
        return fetch(req).catch(() => {
          if (req.mode === 'navigate') return cache.match('./index.html');
          return Response.error();
        });
      })
    )
  );
});
