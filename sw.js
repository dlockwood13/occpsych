/* OccPsych service worker. Caches only its own files, under its own cache names. */
const VERSION = '1.0.0+20261004.33af3c29';
const CACHE = 'occpsych-' + VERSION;
const PRECACHE = [
 "./",
 "./index.html",
 "./manifest.webmanifest",
 "./apple-touch-icon.png",
 "./favicon-32.png",
 "./icon-192.png",
 "./icon-512.png",
 "./maskable-512.png",
 "./shortcut-96.png",
 "./atkinson-hyperlegible-latin-400-italic.woff2",
 "./atkinson-hyperlegible-latin-400-normal.woff2",
 "./atkinson-hyperlegible-latin-700-normal.woff2",
 "./bricolage-grotesque-latin-wght-normal.woff2",
 "./ibm-plex-mono-latin-400-normal.woff2",
 "./ibm-plex-mono-latin-500-normal.woff2"
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(PRECACHE)));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k.indexOf('occpsych-') === 0 && k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('message', e => { if (e.data === 'skipWaiting') self.skipWaiting(); });
const timeout = (ms, p) => Promise.race([p, new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), ms))]);
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const scope = new URL(self.registration.scope);
  if (url.origin !== scope.origin || url.pathname.indexOf(scope.pathname) !== 0) return;
  if (req.mode === 'navigate') {
    e.respondWith((async () => {
      try {
        const r = await timeout(5000, fetch(req));
        if (r && r.ok) { const c = await caches.open(CACHE); await c.put('./index.html', r.clone()); }
        return r;
      } catch (err) {
        const c = await caches.open(CACHE);
        return (await c.match('./index.html')) || (await c.match('./')) || Response.error();
      }
    })());
    return;
  }
  e.respondWith(caches.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req).then(r => {
    if (r && r.ok && r.type === 'basic') { const copy = r.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
    return r;
  })));
});
