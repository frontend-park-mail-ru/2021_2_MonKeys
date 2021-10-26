import EventBus from './dispatcher/eventBus.js';
import router from './route/router.js';
import { InitBus } from './dispatcher/events.js';

InitBus();

declare global {
    interface Window {
        currentDOM:any;
        currentView: any;
    }
}

window.onpopstate = () => {
    router.go(window.location.pathname); 
}

EventBus.dispatch<string>('user:cookie-requests');
router.go(window.location.pathname); 

