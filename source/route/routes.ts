/**
 * Здесь прописаны все возможные пути для роутера
 */


import LoginView from '../views/loginView.js';
import SignupView from "../views/signupView.js";
import ProfileView from "../views/profileView.js";
import LikesView from "../views/likesView.js";
import FeedView from "../views/feedView.js";
import ChatView from "../views/chatView.js"
import PageNotFoundView from "../views/pageNotFoundView.js";

export interface route {
    readonly name: string,
    readonly path: string,
    readonly view?,
    readonly auth: boolean,
};

export const Routes = {
    '/': {
        name: 'Drip',
        auth: false,
        view: SignupView,
    },
    '/login': {
        name: 'Вход',
        path: '/login',
        auth: false,
        view: LoginView,
    },
    '/signup': {
        name: 'Регистрация',
        path: '/signup',
        auth: false,
        view: SignupView,
    },
    '/feed': {
        name: 'Лента',
        path: '/feed',
        auth: true,
        view: FeedView,
    },
    '/matches': {
        name: 'Мэтчи',
        path: '/matches',
        auth: true,
        view: LikesView,
    },
    '/profile': {
        name: 'Профиль',
        path: '/profile',
        auth: true,
        view: ProfileView,
    },
    '/chat': {
        name: 'Чаты',
        path: '/chat',
        auth: true,
        view: ChatView,
    },
    '/404': {
        name: 'Страница не найдена',
        path: '/404',
        auth: false,
        view: PageNotFoundView,
    },
}