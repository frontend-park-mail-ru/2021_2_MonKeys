import { profileURL } from '../constants/urls.js';
import http from '../utils/http.js';

const createProfile = (email, password) => {
    const body = JSON.stringify({
        email: email,
        password: password,
    });

    return http.post(profileURL, body);
};

const getProfile = () => {
    return http.get(profileURL);
};

const editProfile = (name, date, description, /*photoPaths,*/ tags) => {
    const body = JSON.stringify({
        name: name,
        date: date,
        description: description,
        /*  photoPaths: photoPaths,*/
        tags: tags,
    });

    return http.put(profileURL, body);
};

export { createProfile, getProfile, editProfile };
