
import { userStatus } from "../constants/userStatus.js";
import BaseStore from "./storeBase.js";


export interface AuthData {
    loggedIn: number;
}

let AuthStore = new BaseStore<AuthData>()

AuthStore.set( 
    { 
        loggedIn: userStatus.notlLoggedIn
    }
);
// console.log(AuthStore)
export default AuthStore;