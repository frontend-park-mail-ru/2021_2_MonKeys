import { likesURL, userLikesURL } from '../constants/urls.js';
import http from '../utils/http.js';
import { HTTPSuccess } from '../constants/HTTPStatus.js';
import { errorManager } from '../store/errorStore.js';

const userLikesRequset = () => {
    return http
        .get(userLikesURL)
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

const likesRequest = (id, reaction) => {
    const body = JSON.stringify({
        id: id,
        reaction: reaction,
    });

    return http
        .post(likesURL, body)
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

export { userLikesRequset, likesRequest };
