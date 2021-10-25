import router from "../route/router.js"
import EventBus from "./eventBus.js"
import { logoutRequest } from "../requests/sessionRequest.js"
import { HTTPNotFound, HTTPSuccess } from "../constants/HTTPStatus.js";

export const ProfileEventsRegister = () =>{
    EventBus.register('profile:edit-button',()=>{
        router.go('/edit');
    })
    EventBus.register('profile:logout-button',()=>{
        logoutRequest()
            .then(
                (response) => {
                    if (response.status === HTTPSuccess) {
                        if (response.data.status === HTTPSuccess) {
                            router.go('/login');
                        } else if (response.data.status === HTTPNotFound) {
                            /// ????
                            console.log('xz');
                        } else {
                            console.log('error');
                        }
                    } else {
                        // server internal error
                        console.log('server internal error');
                    }
                }
            );
    });
}
