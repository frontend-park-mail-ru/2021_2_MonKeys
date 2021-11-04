const config = {
    staticCacheItemsRegExp: /^[^.]+.(js|css|svg|jpg|png|gif|woof|ico|html)$/,
    mediaCacheItemsRegExp: /media/,
};

self.addEventListener('install', (event) => {
    // console.log('Installing [Service Worker]', event);
    // event.waitUntil(
    //     caches.open('static').then((cache) => {
    //         // console.log('[Service Worker] Precaching App Shell');
    //         cache.addAll(config.staticCacheItems);
    //     }).catch((error) => console.log(error))
    // );
});

self.addEventListener('fetch', (event) => {
    console.log('fetch');
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                // cached
                return response;
            } else {
                // network
                const requsetForCache = event.request.clone();
                fetch(requsetForCache)
                    .then((networkResponse) => {
                        if (
                            config.staticCacheItemsRegExp.test(networkResponse.url) &&
                            !config.mediaCacheItemsRegExp.test(networkResponse.url)
                        ) {
                            caches.open('static').then((staticCache) => {
                                staticCache.add(networkResponse.url);
                            });
                        } else if (config.mediaCacheItemsRegExp.test(networkResponse.url)) {
                            caches.open('media').then((mediaCache) => {
                                mediaCache.add(networkResponse.url);
                            });
                        }
                    })
                    // for offline
                    .catch(() => {
                        console.log('offline work');
                        // return
                        // caches.match('/offline.html').then((match) => {
                        //     console.log(match);
                        // });
                    });
                return fetch(event.request).catch(() => {
                    console.log('offline work');
                    // caches.match('/offline.html').then((match) => {
                    //     console.log(match);
                    // });
                });
            }
        })
    );
    // console.log('fetch req');
});
