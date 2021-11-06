import { serverAddress } from '../constants/urls.js';

/** Class representing a http request. */
class Http {
    /** Базовый URL. */
    private _baseURL = serverAddress;

    public set baseURL(baseURL) {
        this._baseURL = baseURL;
    }

    /**
     * Делает запрос
     * @param {string} url - Запрос по url.
     * @param {string} method - Метод запроса
     * @param {Headers} headers - Заголовки запроса
     * @param {string} body - Тело запроса
     * @return {Promise<{status: number, data: any}>} - Возвращает Promise со статусом ответа и данными.
     */
    private async _request({ url = '/', method = 'GET', headers = new Headers(), body = null }) {
        const csrfToken = window.csrfToken;
        if (csrfToken) {
            console.log(csrfToken, 'check');
            const csrfHeader = new Headers();
            csrfHeader.set('x-csrf-Token', csrfToken);
            headers = csrfHeader;
        }

        const response = await fetch(this._baseURL + url, {
            method: method,
            headers: headers,
            body: body,
            credentials: 'include',
        });

        const responseData = await response.json();

        window.csrfToken = response.headers.get('csrf');
        console.log(window.csrfToken, 'set');

        return {
            status: response.status,
            data: responseData,
            csrf: response.headers.get('csrf'),
        };
    }

    /**
     * Делает GET запрос
     * @param {string} url - Запрос по url.
     * @return {Promise<{status: number, data: any}>} - Возвращает Promise со статусом ответа и данными.
     */
    public get(url) {
        return this._request({ url: url });
    }

    /**
     * Делает POST запрос
     * @param {string} url - Запрос по url.
     * @param {Object} body - Данные для отправки.
     * @return {Promise<{status: number, data: any}>} - Возвращает Promise со статусом ответа и данными.
     */
    public post(url, body) {
        return this._request({
            url: url,
            method: 'POST',
            body: body,
        });
    }

    /**
     * Делает DELETE запрос
     * @param {string} url - Запрос по url.
     * @param {Object} body - Данные для отправки.
     * @return {Promise<{status: number, data: any}>} - Возвращает Promise со статусом ответа и данными.
     */
    public delete(url, body = null) {
        return this._request({
            url: url,
            method: 'DELETE',
            body: body,
        });
    }

    /**
     * Делает PUT запрос
     * @param {string} url - Запрос по url.
     * @param {Object} body - Данные для отправки.
     * @return {Promise<{status: number, body: any}>} - Возвращает Promise со статусом ответа и данными.
     */
    public put(url, body) {
        return this._request({
            url: url,
            method: 'PUT',
            body: body,
        });
    }
}

export default new Http();
