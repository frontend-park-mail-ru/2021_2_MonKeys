import RequestBase from "../utils/httpRequest";
import { serverAddress, sessionURL } from "../constants/urls";

/**
 * login
 * logout
 */
export default class SessionRequest {
    _email
    _password
    _requestLogin
    _requestLogout

    constructor(email, password) {
        this._requestLogin = new RequestBase({
            'email': email,
            'password': password,
        }, {
            'Content-Type': 'application/json',
        }, {
            'Method': 'POST',
        })

        this._requestLogout = new RequestBase({}, {
            'Content-Type': 'application/json',
        }, {
            'Method': 'DELETE',
        })
    }

    login(resolve) {
        this._requestLogin.send(`${serverAddress}${sessionURL}`,
            resolve
        )
    }
    logout(resolve) {
        this._requestLogout.send(`${serverAddress}${sessionURL}`,
            resolve
        )
    }
}