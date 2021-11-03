const cache = ['', ''];

self.addEventListener('install', (event) => {
    console.log('Installing [Service Worker]', event);
    event.waitUntil(
        caches.open('static').then((cache) => {
            console.log('[Service Worker] Precaching App Shell');
            // cache.addAll(cache);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                return response;
            } else {
                return fetch(event.request);
            }
        })
    );
    console.log('fetch req');
});
