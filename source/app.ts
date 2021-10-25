import { MonkeysVirtualDOM } from 'virtualDOM/virtualDOM';
// import LoginView from './views/loginView.js';
// import SignupView from "./views/signupView.js";
// import EditView from "./views/editView.js";
// import ProfileView from "./views/profileView.js";
// import LikesView from "./views/likesView.js";
// import FeedView from "./views/feedView.js";
import http from './utils/http.js';
import { serverAddress } from './constants/urls.js';
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

