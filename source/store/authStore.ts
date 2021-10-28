import { userStatus } from '../constants/userStatus.js';
import BaseStore from './storeBase.js';

export interface AuthData {
    loggedIn: number;
}

const AuthStore = new BaseStore<AuthData>();

AuthStore.set({
    loggedIn: userStatus.loggedIn,
});
// console.log(AuthStore)
export default AuthStore;
