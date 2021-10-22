import { route, Routes } from './routes.js'

class Router {
    private routes: route[]

    constructor(routes) {
        this.routes = routes;
    }

    go(route: string){
        const $root = document.getElementById('app');
        const location = route;
        if(this.routes[location]){
            // console.log(this.routes[location]);
            const currentView = new this.routes[location].view($root);
            
            currentView.render()
        } else {
            // console.log(this.routes['/404'])
            window.location.pathname = '/404'; 
        }
    }
}

export default new Router(Routes);