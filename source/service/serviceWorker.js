const config = {
    staticCacheItemsRegExp: /^[^.]+.(min.js|js|css|svg|jpg|png|gif|woff|ico)$/,
    mediaCacheItemsRegExp: /media/,
    numbersRegExp: /\d+/,
    versionStaticRegExp: /static\d+/,
    apiUrlRegExp: /http:\/\/localhost\/api\/v*/,
    //     offlineImage: '<svg role="img" aria-labelledby="offline-title"'
    //   + 'viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">'
    //   + '<title id="offline-title">Offline</title>'
    //   + '<g fill="none" fill-rule="evenodd"><path fill=>"#D8D8D8" d="M0 0h400v300H0z"/>'
    //   + '<text fill="#9B9B9B" font-family="Times New Roman,Times,serif" font-size="72" font-weight="bold">'
    //   + '<tspan x="93" y="172">offline</tspan></text></g></svg>',
};

// install offline
self.addEventListener('install', (event) => {
    console.log('Installing [Service Worker]', event);
    event.waitUntil(
        caches.open('offline').then((cache) => {
            return cache.addAll(['/offline/offline.html', '/offline/offline.js']);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(
                keyList.map((key) => {
                    if (key !== 'offline') {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
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
                if (config.apiUrlRegExp.test(event.request.url)) {
                    const requsetForCache = event.request.clone();
                    fetch(requsetForCache)
                        .then((networkResponse) => {
                            if (
                                config.staticCacheItemsRegExp.test(networkResponse.url) &&
                                !config.mediaCacheItemsRegExp.test(networkResponse.url)
                            ) {
                                // cached version content
                                if (
                                    networkResponse.url.indexOf('main') != -1 ||
                                    networkResponse.url.indexOf('app') != -1
                                ) {
                                    const versionNumber = networkResponse.url.match(config.numbersRegExp)[0];
                                    // delete old version in cache
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
                            return caches.match('/offline/offline.html');
                            // const respPromise = caches.match('/offline/offline.html');
                            // console.log(respPromise);
                            // respPromise.then((resp) => {
                            //     if (resp !== undefined) {
                            //         console.log(respPromise);
                            //         const ofResp = caches.match('/offline/offline.html');
                            //         console.log(ofResp);
                            //         return ofResp;
                            //     }
                            //     return Promise.resolve(
                            //         new Response(FALLBACK, {
                            //             headers: {
                            //                 'Content-Type': 'text/html; charset=utf-8',
                            //             },
                            //         })
                            //     );
                            // })
                        });
                }

                return fetch(event.request).catch(() => {
                    return caches.match('/offline/offline.html');
                    // const respPromise = caches.match('/offline/offline.html')
                    // respPromise.then((resp) => {
                    //     if (resp !== undefined) {
                    //         console.log(respPromise);
                    //         const ofResp = caches.match('/offline/offline.html');
                    //         console.log(ofResp);
                    //         return ofResp;
                    //     }
                    //     return Promise.resolve(
                    //         new Response(FALLBACK, {
                    //             headers: {
                    //                 'Content-Type': 'text/html; charset=utf-8',
                    //             },
                    //         })
                    //     );
                    // })
                });
            }
        })
    );
});
