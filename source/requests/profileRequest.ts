import { profileURL } from '../constants/urls.js';
import http, { parseJSON } from '../utils/http.js';

const createProfile = (email, password) => {
  const body = JSON.stringify({
    email: email,
    password: password,
  });

  return http.post(profileURL, body)
      .then(parseJSON);
};

const getProfile = () => {
  return http.get(profileURL)
      .then(parseJSON);
};

const editProfile = (name, date, description, photoPaths, tags) => {
  const body = JSON.stringify({
    name: name,
    date: date,
    description: description,
    photoPaths: photoPaths,
    tags: tags,
  });

  return http.put(profileURL, body)
      .then(parseJSON);
};

export { createProfile, getProfile, editProfile };
