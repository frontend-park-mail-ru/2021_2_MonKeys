/** Class representing a http request. */
class Http {
  /**
   * Делает запрос
   * @param {string} url - Запрос по url.
   * @param {string} method - Метод запроса
   * @param {Headers} headers - Заголовки запроса
   * @param {string} body - Тело запроса
   * @return {Promise<{status: number, data: any}>} - Возвращает Promise со статусом ответа и данными.
   */
  async _request({ url = '/', method = 'GET', headers = new Headers(), body = '' }) {
    const response = await fetch(url, {
      method: method,
      headers: headers,
      body: body,
      mode: 'cors',
      credentials: 'include',
    });

    const responseData = await response.json();

    return {
      status: response.status,
      data: responseData,
    };
  }

  /**
   * Делает GET запрос
   * @param {string} url - Запрос по url.
   * @return {Promise<{status: number, data: any}>} - Возвращает Promise со статусом ответа и данными.
   */
  get(url) {
    return this._request({ url: url });
  }

  /**
   * Делает POST запрос
   * @param {string} url - Запрос по url.
   * @param {Object} data - Данные для отправки.
   * @return {Promise<{status: number, data: any}>} - Возвращает Promise со статусом ответа и данными.
   */
  post(url, data) {
    return this._request({
      url: url,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  /**
   * Делает DELETE запрос
   * @param {string} url - Запрос по url.
   * @return {Promise<{status: number, data: any}>} - Возвращает Promise со статусом ответа и данными.
   */
  delete(url) {
    return this._request({
      url: url,
      method: 'DELETE',
    });
  }

  /**
   * Делает PUT запрос
   * @param {string} url - Запрос по url.
   * @param {Object} data - Данные для отправки.
   * @return {Promise<{status: number, data: any}>} - Возвращает Promise со статусом ответа и данными.
   */
  put(url, data) {
    return this._request({
      url: url,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }
}

export const http = new Http();
