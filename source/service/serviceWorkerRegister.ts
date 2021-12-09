export function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('js/service/serviceWorker.js', { scope: '/' })
            .then((registration) => {
                // if (registration.installing) {
                //     console.log('installing');
                //     registration.installing.addEventListener('updatefound', () => {
                //         if (registration.waiting) {
                //             console.log('waiting');
                //             if (navigator.serviceWorker.controller) {
                //                 console.log('c');

                //             }
                //         }
                //     });
                // }
                // registration.update();
                console.log(`Service Worker registration complete, scope: '${registration.scope}'`);
            })
            .catch((error) => console.log(`Service Worker registration failed with error: '${error}'`));
    }
}
