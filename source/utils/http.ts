import { HTTPSuccess } from '../constants/HTTPStatus';

/*export default class RequestBase {
    _requestOptions

    constructor(body, headers, method, credentials = 'include') {
      this._requestOptions = {
        method: method,
        headers: headers,
        credentials: credentials,
        body: JSON.stringify(body),
      };
    }

    /!**
     *
     * @param {String} url - ссылка
     * @param {Function} resolve - callback(data)
     *!/
    send(url, resolve) {
      fetch(url, this._requestOptions)
          .then((response) => response.json()
          .then((data) => ({
            data: data,
            status: response.status,
        })
          )
        .then((result) => {
          if (result.status === HTTPSuccess) {
            resolve(result.data);
          } else {
            console.error(result.status);
          }
        })).catch((error) => console.log(error));
    }
}*/


class Http {
  __ajax(url, method, data) {
    const options = {
      method: method,
      mode: 'cors',
      credentials: 'include'
    };

    const csrf = customSessionStorage.get('csrf');
    if (csrf) {
      options['headers'] = {'X-CSRF-Token': csrf};
    }

    if (data) {
      options['body'] = data;
    }

    return new Request(url, options);
  }

  async get(url) {
    const response = await fetch(this.__ajax(url, 'GET', null));

    const csrf = response.headers.get('X-CSRF-Token');
    if (csrf) {
      customSessionStorage.set('csrf', csrf);
    }

    const responseData = await response.json();

    return {
      status: response.status,
      data: responseData
    };
  }

  async post(url, {
    login: login,
    password: password,
  }) {
    const response = await fetch(this.__ajax(url, 'POST', JSON.stringify(data)));

    const csrf = response.headers.get('X-CSRF-Token');
    if (csrf) {
      customSessionStorage.set('csrf', csrf);
    }

    const responseData = await response.json();

    return {
      status: response.status,
      data: responseData,
    };
  }

  async delete(url) {
    const response = await fetch(this.__ajax(url, 'POST', ''));
    return {
      status: response.status,
      data: '',
    };
  }
}

export const http = new Http();
