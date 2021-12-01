import LoginView from '../views/loginView.js';
import SignupView from '../views/signupView.js';
import EditView from '../views/editView.js';
import SignupEditView from '../views/signupEditView.js';
import ProfileView from '../views/profileView.js';
import LikesView from '../views/likesView.js';
import FeedView from '../views/feedView.js';
import ChatView from '../views/chatView.js';
import PageNotFoundView from '../views/pageNotFoundView.js';
import ChatsWideView from '../views/chatsWideView.js';
import FeedWideView from '../views/feedWideView.js';
import LikesWideView from '../views/likesWideView.js';
import ProfileWideView from '../views/profileWideView.js';
import { userStatus } from '../constants/userStatus.js';
import ChatsView from '../views/chatsView.js';

export interface route {
    readonly name: string;
    readonly path: string;
    readonly view?;
    readonly auth: number;
}

export const Routes = {
    '/': {
        name: 'Drip',
        auth: userStatus.notLoggedIn,
        view: LoginView,
        wideView: LoginView,
        tapbarHidden: true,
    },
    '/login': {
        name: 'Вход',
        path: '/login',
        auth: userStatus.notLoggedIn,
        view: LoginView,
        tapbarHidden: true,
    },
    '/signup': {
        name: 'Регистрация',
        path: '/signup',
        auth: userStatus.notLoggedIn,
        view: SignupView,
        tapbarHidden: true,
    },
    '/edit': {
        name: 'Настройки',
        path: '/edit',
        auth: userStatus.loggedIn,
        view: EditView,
        tapbar: 'profile',
        tapbarHidden: true,
    },
    '/signup-edit': {
        name: 'Настройки',
        path: '/signup-edit',
        auth: userStatus.Signup,
        view: SignupEditView,
        tapbarHidden: true,
    },
    '/feed': {
        name: 'Лента',
        path: '/feed',
        auth: userStatus.loggedIn,
        view: FeedView,
        tapbar: 'feed',
        wideView: FeedWideView,
        tapbarHidden: false,
    },
    '/likes': {
        name: 'Лайки',
        path: '/likes',
        auth: userStatus.loggedIn,
        view: LikesView,
        wideView: LikesWideView,
        tapbar: 'likes',
        tapbarHidden: false,
    },
    '/profile': {
        name: 'Профиль',
        path: '/profile',
        auth: userStatus.loggedIn,
        view: ProfileView,
        tapbar: 'profile',
        wideView: ProfileWideView,
        tapbarHidden: false,
    },
    '/chats': {
        name: 'Чаты',
        path: '/chats',
        auth: userStatus.loggedIn,
        view: ChatsView,
        tapbar: 'chats',
        wideView: ChatsWideView,
        tapbarHidden: false,
    },
    '/chat': {
        name: 'Чат',
        path: '/chat',
        auth: userStatus.loggedIn,
        view: ChatView,
        tapbar: 'chats',
        wideView: ChatsWideView,
        tapbarHidden: true,
    },
    '/404': {
        name: 'Страница не найдена',
        path: '/404',
        view: PageNotFoundView,
    },
};
