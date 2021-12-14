import EventBus from './dispatcher/eventBus.js';
import router from './route/router.js';
import { InitBus } from './dispatcher/events.js';
import ViewBase from './views/viewBase.js';
import { isWidescreen, startClientAspectRatio } from './utils/client.js';
// import { registerServiceWorker } from './service/serviceWorkerRegister.js';
import { EVENTS } from './dispatcher/events.js';
import '../scss/main.scss';

startClientAspectRatio();
window.addEventListener('resize', isWidescreen);

InitBus();

declare global {
    interface Window {
        currentDOM;
        currentView: ViewBase;
    }
}

window.onpopstate = () => {
    router.move(window.location.pathname);
};

EventBus.dispatch<string>(EVENTS.USER_COOKIE_REQUESTS);
window.history.pushState('', '', window.location.pathname);

// registerServiceWorker();

const percent = 0.01;
const vh = window.innerHeight * percent;
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {
    const vh = window.innerHeight * percent;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});
