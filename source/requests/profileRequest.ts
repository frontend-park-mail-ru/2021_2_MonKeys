import { authProfileURL, profileURL } from '../constants/urls.js';
import http from '../utils/http.js';
import { HTTPSuccess } from '../constants/HTTPStatus.js';
import { errorManager } from '../store/errorStore.js';

const createProfile = (email, password) => {
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

const getProfile = () => {
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

const editProfile = (name, gender, prefer, date, description, photoPaths, tags) => {
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

export { createProfile, getProfile, editProfile };
