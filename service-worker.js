self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('qr-handler-v1').then((cache) => {
      return cache.addAll(['/index.html', '/app.js', '/styles.css']);
    })
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.url.startsWith('https://test.eventmagic.co')) {
    event.respondWith(fetch(event.request));
  } else {
    event.respondWith(
      caches.match(event.request).then((response) => response || fetch(event.request))
    );
  }
});
