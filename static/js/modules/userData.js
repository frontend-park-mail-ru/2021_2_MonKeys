import { HTTPNotFound, HTTPSuccess } from '../constants/HTTPStatus.js';
import { hundredMS } from '../constants/time.js';


/**
 * Иницализирует синглтон User для пользователя
 */
export default function initUser() {
  const noop = () => {};

  /**
   * Класс для работы с данными пользователя
   */
  class User {
        // eslint-disable-next-line
        _userData = {};

        /**
         * Устанавливает данные пользователя
         * @param {Object} data - данные пользователя
         */
        _setUserProfile(data) {
          this._userData = Object();
          this._userData.id = data.id;
          this._userData.firstName = data.name;
          this._userData.age = data.age;
          this._userData.date = data.date;
          this._userData.text = data.description;
          this._userData.photoSrc = data.imgSrc;
          this._userData.tags = data.tags;
        }

        /**
         * Геттер для данных пользователя
         * @return {Object} - данные пользователя
         */
        getUserData() {
          return this._userData;
        }

        /**
         * Функция логина с помощью куки
         * @param {function} callback - функция, которая вызовется в случае успеха
         */
        loginWithCookie(callback = noop) {
          const requestOptions = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          };


          fetch(`${serverAddress}${profileURL}`, requestOptions)
              .then((response) =>
                response.json().then((data) => ({
                  data: data,
                  status: response.status,
                })).then((res) => {
                  if (res.status === HTTPSuccess && res.data.status === HTTPSuccess) {
                    this._setUserProfile(res.data.body);

                    window.Feed.getNextUser(this._userData.id);


                    // !!! cring


                    setTimeout(callback, hundredMS);
                    // swipeUser(user.id)
                    // userProfileRender();
                  } else if (res.data.status === HTTPNotFound) {
                    // w
                  }
                  // if (res.data.status === 'ok') {
                  //     profilePage();
                  // }
                  // console.log(res.data.status)
                })).catch((error) => console.log(error));
        }

        /**
         * Функция логина с помощью логина и пароля
         * @param {string} email - EMail пользователя
         * @param {string} password - Пароль пользователя
         * @param {function} callback - функция, которая вызовется в случае успеха
         */
        loginWithCredentials(email, password, callback = noop) {
          console.log(email, password, callback);
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              'email': email,
              'password': password,
            }),
            credentials: 'include',
          };
          fetch(`${serverAddress}${authURL}`, requestOptions)
              .then((response) =>
                response.json().then((data) => ({
                  data: data,
                  status: response.status,
                })).then((res) => {
                  if (res.status === HTTPSuccess && res.data.status === HTTPSuccess) {
                    this.loginWithCookie(callback);
                  } else if (res.data.status === HTTPNotFound) {


                  }
                })).catch((error) => console.log(error));
        }

        /**
         * Функция с запросов на редактирование профиля
         * @param {String} name - Имя пользователя
         * @param {String} date - Дата рождения
         * @param {String} description - Описание
         * @param {String[]} tags - Выбранные тэги
         * @param {function} callback - функция, которая вызовется в случае успеха
         */
        editProfile(name, date, description, tags, callback) {
          const requestOptions = {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              'name': name,
              'date': date,
              'description': description,
              'tags': tags,
            }),
            credentials: 'include',
          };
          fetch(`${serverAddress}${profileURL}`, requestOptions)
              .then((response) =>
                response.json().then((data) => ({
                  data: data,
                  status: response.status,
                })).then((res) => {
                  if (res.status === HTTPSuccess && res.data.status === HTTPSuccess) {
                    this._setUserProfile(res.data.body);
                    window.Feed.getNextUser(this._userData.id);
                    callback();
                  } else if (res.data.status === HTTPNotFound) {}
                  console.log(res.data.status);
                })).catch((error) => console.log(error));
        }

        /**
         * посылает запрос на завершение сессии (logout)
         * @param {function} callback - функция, которая вызовется в случае успеха
         */
        logoutCookie(callback = noop) {
          const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
          };
          fetch(`${serverAddress}${authURL}`, requestOptions).then((response) => {
            callback();
          } );
        }
  }
  window.User = new User();
};
