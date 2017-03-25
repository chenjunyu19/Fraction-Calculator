var cacheName = 'CFC';

self.addEventListener('install', function (e) {
  console.info('[ServiceWorker] Install');
});

self.addEventListener('activate', function (e) {
  console.info('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (key !== cacheName) {
          console.info('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('fetch', function (e) {
  e.respondWith(
    caches.open(cacheName).then(function (cache) {
      return cache.match(e.request).then(function (response) {
        var fetchPromise = fetch(e.request).then(function (networkResponse) {
          cache.put(e.request, networkResponse.clone());
          return networkResponse;
        })
        return response || fetchPromise;
      })
    })
  );
});