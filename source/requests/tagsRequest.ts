import { tagsURL } from '../constants/urls.js';
import http from '../utils/http.js';
import { HTTPSuccess } from '../utils/constants/HTTPStatus.js';
import { errorManager } from '../store/errorStore.js';

const tagsRequest = () => {
    return http
        .get(tagsURL)
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

export { tagsRequest };
