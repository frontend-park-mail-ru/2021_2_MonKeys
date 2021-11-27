import { authProfileURL, profileURL } from '../constants/urls.js';
import http from '../utils/http.js';
import { HTTPSuccess } from '../utils/constants/HTTPStatus.js';
import { errorManager } from '../store/errorStore.js';

const createProfileRequest = (email, password) => {
    const body = JSON.stringify({
        email: email,
        password: password,
    });

    return http
        .post(authProfileURL, body)
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

const getProfileRequest = () => {
    return http
        .get(authProfileURL)
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

const editProfileRequest = (name, gender, prefer, date, description, photoPaths, tags) => {
    const body = JSON.stringify({
        name: name,
        gender: gender,
        prefer: prefer,
        date: date,
        description: description,
        imgs: photoPaths,
        tags: tags,
    });

    return http
        .put(profileURL, body)
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

export { createProfileRequest, getProfileRequest, editProfileRequest };
