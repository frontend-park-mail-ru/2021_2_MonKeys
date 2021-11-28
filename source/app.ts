import EventBus from './dispatcher/eventBus.js';
import router from './route/router.js';
import { InitBus } from './dispatcher/events.js';
import ViewBase from './views/viewBase.js';
import { resetDefaults } from './modules/resets.js';
import { isWidescreen } from './utils/client.js';

resetDefaults(document.getElementById('app'));
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

EventBus.dispatch<string>('user:cookie-requests');
window.history.pushState('', '', window.location.pathname);
// router.go(window.location.pathname);
// registerServiceWorker();
