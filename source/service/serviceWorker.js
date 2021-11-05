const config = {
    staticCacheItemsRegExp: /^[^.]+.(min.js|js|css|svg|jpg|png|gif|woff|ico)$/,
    mediaCacheItemsRegExp: /media/,
    numbersRegExp: /\d+/,
    versionStaticRegExp: /static\d+/,
};

// install offline
self.addEventListener('install', (event) => {
    // console.log('Installing [Service Worker]', event);
    // event.waitUntil(
    //     caches.open('static').then((cache) => {
    //         // console.log('[Service Worker] Precaching App Shell');
    //         cache.addAll(config.staticCacheItems);
    //     }).catch((error) => console.log(error))
    // );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(
                keyList.map((key) => {
                    return caches.delete(key);
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
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
                            // cached version content
                            if (networkResponse.url.indexOf('main') != -1 || networkResponse.url.indexOf('app') != -1) {
                                const versionNumber = networkResponse.url.match(config.numbersRegExp)[0];
                                // delete old version in cache
                                caches.keys().then((keyList) => {
                                    return Promise.all(
                                        keyList.map((key) => {
                                            if (
                                                key.match(config.versionStaticRegExp) &&
                                                !key.match(`static${versionNumber}`)
                                            ) {
                                                console.log(key);
                                                return caches.delete(key);
                                            }
                                        })
                                    );
                                });
                                caches.open(`static${versionNumber}`).then((staticVersionCache) => {
                                    staticVersionCache.add(networkResponse.url);
                                });
                            } else {
                                // cached other static like svg, fonts etc.
                                caches.open('static').then((staticCache) => {
                                    staticCache.add(networkResponse.url);
                                });
                            }
                            // cached user photos
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
});
