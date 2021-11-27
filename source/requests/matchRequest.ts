import { matchURL } from '../constants/urls.js';
import http from '../utils/http.js';
import { HTTPSuccess } from '../constants/HTTPStatus.js';
import { errorManager } from '../store/errorStore.js';

const searchMathesRequest = (searchTmpl: string) => {
    const body = JSON.stringify({
        searchTmpl: searchTmpl,
    });

    return http
        .post(matchURL, body)
        .then((response) => {
            if (response.status !== HTTPSuccess) {
                throw 'server internal error';
            }

            return response.data;
        })
        .catch((err) => {
            errorManager.pushAPIError();
            throw err;
        });
};

const matchRequest = () => {
    return http
        .get(matchURL)
        .then((response) => {
            if (response.status !== HTTPSuccess) {
                throw 'server internal error';
            }

            return response.data;
        })
        .catch((err) => {
            errorManager.pushAPIError();
            throw err;
        });
};

export { matchRequest, searchMathesRequest };
