import { loginRequest, logoutRequest } from './sessionRequest';
import Observer from '../utils/Observer';

/**
 * login
 * logout
 */
export default class SessionService extends Observer {
/*  constructor(email, password) {
    this._requestLogin = new RequestBase({
      'email': email,
      'password': password,
    }, {
      'Content-Type': 'application/json',
    }, {
      'Method': 'POST',
    });

    this._requestLogout = new RequestBase({}, {
      'Content-Type': 'application/json',
    }, {
      'Method': 'DELETE',
    });
  }*/
  login(login, password) {
    return loginRequest(login, password)
        .then(() => {
          this.emit('login', '');
        });
  }
  logout() {
    return logoutRequest();
  }
}

// переделать на миксин
// Object.assign(SessionService.prototype, Observer);

// пример использования
const sessionService = new SessionService();

const noop = () => {};
sessionService.on('login', noop);

sessionService.login('abc', '123')
    .then()
    .catch();

sessionService.logout();
