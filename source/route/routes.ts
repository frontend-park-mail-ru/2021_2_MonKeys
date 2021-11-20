import LoginView from '../views/loginView.js';
import SignupView from '../views/signupView.js';
import EditView from '../views/editView.js';
import SignupEditView from '../views/signupEditView.js';
import ProfileView from '../views/profileView.js';
import LikesView from '../views/likesView.js';
import FeedView from '../views/feedView.js';
import ChatView from '../views/chatView.js';
import PageNotFoundView from '../views/pageNotFoundView.js';
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
        auth: userStatus.notlLoggedIn,
        view: LoginView,
    },
    '/login': {
        name: 'Вход',
        path: '/login',
        auth: userStatus.notlLoggedIn,
        view: LoginView,
    },
    '/signup': {
        name: 'Регистрация',
        path: '/signup',
        auth: userStatus.notlLoggedIn,
        view: SignupView,
    },
    '/edit': {
        name: 'Редактирование',
        path: '/edit',
        auth: userStatus.loggedIn,
        view: EditView,
        tapbar: 'profile',
    },
    '/signup-edit': {
        name: 'Редактирование',
        path: '/signup-edit',
        auth: userStatus.Signup,
        view: SignupEditView,
    },
    '/feed': {
        name: 'Лента',
        path: '/feed',
        auth: userStatus.loggedIn,
        view: FeedView,
        tapbar: 'feed',
    },
    '/matches': {
        name: 'Мэтчи',
        path: '/matches',
        auth: userStatus.loggedIn,
        view: LikesView,
        tapbar: 'matches',
    },
    '/profile': {
        name: 'Профиль',
        path: '/profile',
        auth: userStatus.loggedIn,
        view: ProfileView,
        tapbar: 'profile',
    },
    '/chats': {
        name: 'Чаты',
        path: '/chats',
        auth: userStatus.loggedIn,
        view: ChatsView,
        tapbar: 'chats',
    },
    '/chat': {
        name: 'Чат',
        path: '/chat',
        auth: userStatus.loggedIn,
        view: ChatView,
        tapbar: 'chats',
    },
    '/404': {
        name: 'Страница не найдена',
        path: '/404',
        view: PageNotFoundView,
    },
};
