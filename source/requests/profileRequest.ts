import { serverAddress, profileURL } from '../constants/urls';
import { http } from '../utils/http';

const createProfile = ({ email, password }) => {
  return http.post(`${serverAddress}${profileURL}`, {
    email: email,
    password: password,
  });
};

const getProfile = (login, password) => {
  return http.get(`${serverAddress}${profileURL}`);
};

const editProfile = ({ name, date, description, /* imgSrc,*/ tags }) => {
  return http.put(`${serverAddress}${profileURL}`, {
    name: name,
    date: date,
    description: description,
    tags: tags,
  });
};

export { createProfile, getProfile, editProfile };
