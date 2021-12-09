const config = {
    staticCacheItemsRegExp: /^[^]+.(min.js|js|css|svg|jpg|png|gif|woff|ico)$/,
    numbersRegExp: /\d+/,
    versionStaticRegExp: /static\d+/,
    mediaUrlRegExp: /http:\/\/localhost\/media*/,
    apiUrlRegExp: /http:\/\/localhost\/api*/,
};

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('offline').then((cache) => {
            return cache.addAll(['/offline/offline.html', '/offline/offline.js']);
        })
    );
    event.waitUntil(
        caches.open('static').then((cache) => {
            return cache.add('/icons/error.svg');
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(() => {
        caches.keys().then((keyList) => {
            return Promise.all(
                keyList.map((key) => {
                    if (key !== 'offline') {
                        return caches.delete(key);
                    }
                })
            );
        });
    });
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                return response;
            } else {
                if (!config.apiUrlRegExp.test(event.request.url) && !config.mediaUrlRegExp.test(event.request.url)) {
                    console.log(
                        event.request.url,
                        !config.apiUrlRegExp.test(event.request.url),
                        !config.mediaUrlRegExp.test(event.request.url)
                    );
                    const requsetForCache = event.request.clone();
                    fetch(requsetForCache)
                        .then((networkResponse) => {
                            if (config.staticCacheItemsRegExp.test(networkResponse.url)) {
                                if (
                                    networkResponse.url.indexOf('main') != -1 ||
                                    networkResponse.url.indexOf('app') != -1
                                ) {
                                    const versionNumber = networkResponse.url.match(config.numbersRegExp)[0];
                                    caches.keys().then((keyList) => {
                                        return Promise.all(
                                            keyList.map((key) => {
                                                if (
                                                    key.match(config.versionStaticRegExp) &&
                                                    !key.match(`static${versionNumber}`)
                                                ) {
                                                    return caches.delete(key);
                                                }
                                            })
                                        );
                                    });
                                    caches.open(`static${versionNumber}`).then((staticVersionCache) => {
                                        staticVersionCache.add(networkResponse.url);
                                    });
                                } else {
                                    caches.open('static').then((staticCache) => {
                                        staticCache.add(networkResponse.url);
                                    });
                                }
                            }
                        })
                        .catch(() => {
                            return caches.match('/offline/offline.html');
                        });
                }
                return fetch(event.request).catch(() => {
                    return caches.match('/offline/offline.html');
                });
            }
        })
    );
});
