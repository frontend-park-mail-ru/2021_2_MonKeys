import { MonkeysVirtualDOM } from 'virtualDOM/virtualDOM';
import LoginView from './views/loginView.js';
import SignupView from "./views/signupView.js";
import EditView from "./views/editView.js";
import ProfileView from "./views/profileView.js";
import LikesView from "./views/likesView.js";
import FeedView from "./views/feedView.js";
import http from './utils/http.js';
import { serverAddress } from './constants/urls.js';
import EventBus from './dispatcher/eventBus.js';
import router from './route/router.js';



const $root = document.getElementById('app');

window.onload = () => {
    router.go(window.location.pathname, $root);
}


// const event = EventBus.register('check-event', (name: string) => {
//     if(name)
//         console.log(`Hello ${name}`);
//     else
//         console.log('Hello, world!');
// })

// EventBus.dispatch<string>('check-event', 'Ilyagu');
// EventBus.dispatch<string>('check-event');

// event.unregister();
// EventBus.dispatch<string>('check-event');



// const Login = new LoginView($root);
// Login.render();

// const Signup = new SignupView($root);
// Signup.render();

// const Edit = new EditView($root);
// Edit.render();

// const Profile = new ProfileView($root);
// Profile.render();

// const Likes = new LikesView($root);
// Likes.render();

// const Feed = new FeedView($root);
// Feed.render();

// TODO Необходимо при инициализации приложения. Чтобы все запросы с API шли на нужный сервак
// http.baseURL(serverAddress);
