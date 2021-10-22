import { profileURL } from '../constants/urls.js';
import http from '../utils/http.js';

const createProfile = (email, password) => {
  return http.post(profileURL, {
    email: email,
    password: password,
  });
};

const getProfile = () => {
  return http.get(profileURL);
};

const editProfile = (name, date, description, /* imgSrc,*/ tags) => {
  return http.put(profileURL, {
    name: name,
    date: date,
    description: description,
    tags: tags,
  });
};

export { createProfile, getProfile, editProfile };
