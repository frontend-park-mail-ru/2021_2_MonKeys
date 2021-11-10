import { route, Routes } from './routes.js';
import AuthStore from '../store/authStore.js';
import { userStatus } from '../constants/userStatus.js';
import TapbarStore from '../store/tapbarStore.js';

const userLoggedIn = () => {
    return AuthStore.get().loggedIn === userStatus.loggedIn;
};

const drawLocation = (route, parent) => {
    TapbarStore.set({
        activeItem: route.tapbar,
    });
    const currentView = new route.view(parent);
    window.document.title = route.name;
    currentView.render();
};

class Router {
    private routes: route[];

    constructor(routes) {
        this.routes = routes;
    }
    move(route: string) {
        const $root = document.getElementById('app');
        const location = route;
        if (this.routes[location]) {
            let currentView;

            const user = AuthStore.get().loggedIn;

            if (this.routes[location].auth === user) {
                drawLocation(this.routes[location], $root);
            } else {
                switch (user) {
                    case userStatus.loggedIn: {
                        drawLocation(this.routes['/feed'], $root);
                        break;
                    }
                    case userStatus.Signup: {
                        drawLocation(this.routes['/signup-edit'], $root);
                        break;
                    }
                    case userStatus.notlLoggedIn: {
                        drawLocation(this.routes['/login'], $root);
                        break;
                    }
                }
            }
        } else {
            this.move('/404');
        }
    }
    go(route: string) {
        window.history.pushState('', '', route);

        this.move(route);
    }
}

export default new Router(Routes);
