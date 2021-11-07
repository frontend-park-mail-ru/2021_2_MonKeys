import { route, Routes } from './routes.js';
import AuthStore from '../store/authStore.js';
import { userStatus } from '../constants/userStatus.js';
import TapbarStore from '../store/tapbarStore.js';

class Router {
    private routes: route[];

    constructor(routes) {
        this.routes = routes;
    }
    move(route: string) {
        const $root = document.getElementById('app');
        const location = route;
        if (this.routes[location]) {
            if (this.routes[location].auth === AuthStore.get().loggedIn) {
                TapbarStore.set({
                    activeItem: this.routes[location].tapbar,
                });
                const currentView = new this.routes[location].view($root);
                window.document.title = this.routes[location].name;
                currentView.render();
            } else if (AuthStore.get().loggedIn === userStatus.Signup) {
                const currentView = new this.routes['/signup-edit'].view($root);
                window.document.title = this.routes['/signup-edit'].name;
                window.history.pushState({}, '', '/signup-edit');
                currentView.render();
            } else if (
                (AuthStore.get().loggedIn === userStatus.notlLoggedIn &&
                    this.routes[location].auth === userStatus.loggedIn) ||
                this.routes[location].auth === userStatus.Signup
            ) {
                const currentView = new this.routes['/login'].view($root);
                window.document.title = this.routes['/login'].name;
                window.history.pushState({}, '', '/login');
                currentView.render();
            } else if (this.routes[location].auth !== userStatus.Signup) {
                const currentView = new this.routes[route].view($root);
                window.document.title = this.routes[location].name;
                window.history.pushState({}, '', route);
                currentView.render();
            }
        } else {
            window.location.pathname = '/404';
        }
    }
    go(route: string) {
        window.history.pushState('', '', route);

        this.move(route);
    }
}

export default new Router(Routes);
