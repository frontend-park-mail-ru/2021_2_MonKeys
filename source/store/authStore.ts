
import BaseStore from "./storeBase.js";


export interface AuthData {
    loggedIn: boolean;
}

let AuthStore = new BaseStore<AuthData>()

AuthStore.set( 
    { 
        loggedIn: true
    }
);

export default AuthStore;