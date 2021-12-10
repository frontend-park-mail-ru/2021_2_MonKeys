export function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('js/service/serviceWorker.js', { scope: '/' })
            .then((registration) => {
                console.log(`Service Worker registration complete, scope: '${registration.scope}'`);
            })
            .catch((error) => console.log(`Service Worker registration failed with error: '${error}'`));
    }
}
