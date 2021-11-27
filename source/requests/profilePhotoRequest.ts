import { profilePhotoURL } from '../constants/urls.js';
import http from '../utils/http.js';
import { HTTPSuccess } from '../constants/HTTPStatus.js';
import { errorManager } from '../store/errorStore.js';

const addPhotoToProfileRequest = (photo) => {
    const body = new FormData();
    body.append('photo', photo);

    return http
        .post(profilePhotoURL, body)
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

const deleteProfilePhotoRequest = (photo) => {
    const body = JSON.stringify({
        photo: photo,
    });

    return http
        .delete(profilePhotoURL, body)
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

export { addPhotoToProfileRequest, deleteProfilePhotoRequest };
