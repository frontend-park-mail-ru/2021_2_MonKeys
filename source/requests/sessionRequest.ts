import { authSessionURL } from '../constants/urls.js';
import http from '../utils/http.js';

const loginRequest = (email: string, password: string) => {
    const body = JSON.stringify({
        email: email,
        password: password,
    });

    return http.post(authSessionURL, body);
};

const logoutRequest = () => {
    return http.delete(authSessionURL);
};

export { loginRequest, logoutRequest };
