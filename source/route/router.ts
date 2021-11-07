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
            const pageAuth = this.routes[location].auth;
            console.log(this.routes[location].auth);
            console.log(user);
            console.log('________________________');

            if (this.routes[location].auth === user) {
                console.log('auth matches route, drawing it:');
                drawLocation(this.routes[location], $root);
            } else {
                switch (user) {
                    case userStatus.loggedIn: {
                        console.log('auth doesnt match route, moving to feed page:');
                        drawLocation(this.routes['/feed'], $root);
                        break;
                    }
                    case userStatus.Signup: {
                        console.log('auth doesnt match route, moving to signup-edit page:');
                        drawLocation(this.routes['/signup-edit'], $root);
                        break;
                    }
                    case userStatus.notlLoggedIn: {
                        console.log('auth doesnt match route, moving to login page:');
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
