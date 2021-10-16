import { HTTPSuccess } from "../constants/HTTPStatus.js"

export default class RequestBase {
    _requestOptions

    constructor(body, headers, method, credentials = 'include') {
        this._requestOptions = {
            method: method,
            headers: headers,
            credentials: credentials,
            body: JSON.stringify(body)
        }
    }

    /**
     * 
     * @param {String} url - ссылка 
     * @param {Function} callback - callback(data)
     */
    send(url, resolve) {
        fetch(url, this._requestOptions).then((response) =>
            response.json().then((data) => ({
                data: data,
                status: response.status,
            })).then((result) => {
                if (result.status === HTTPSuccess) {
                    resolve(result.data);
                } else {
                    console.error(result.status);
                }
            })).catch((error) => console.log(error));
    }
}