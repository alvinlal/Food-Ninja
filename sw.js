const version = 3;
const staticCacheName = `food-ninja-${version}`;
const assets = ['/', '/index.html', '/js/app.js', '/js/ui.js', '/js/materialize.min.js', '/css/styles.css', '/css/materialize.min.css', '/img/dish.png', 'https://fonts.googleapis.com/icon?family=Material+Icons', 'https://fonts.gstatic.com/s/materialicons/v47/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2'];

self.addEventListener('install', evt => {
  console.log('service worker installed');
  evt.waitUntil(
    caches.open(staticCacheName).then(cache => {
      cache.addAll(assets);
    })
  );
});

// activate event
self.addEventListener('activate', evt => {
  //console.log('service worker activated');
  evt.waitUntil(
    caches.keys().then(keys => {
      //console.log(keys);
      return Promise.all(keys.filter(key => key !== staticCacheName).map(key => caches.delete(key)));
    })
  );
});

self.addEventListener('fetch', evt => {
  evt.respondWith(caches.match(evt.request).then(cacheRes => cacheRes || fetch(evt.request)));
});
