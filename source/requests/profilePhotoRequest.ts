import { profilePhotoURL } from '../constants/urls.js';
import http from '../utils/http.js';

const addPhotoToProfile = (photo) => {
  return http.post(profilePhotoURL, photo);
};

const getProfilePhoto = () => {
  return http.get(profilePhotoURL);
};

const deleteProfilePhoto = () => {
  return http.delete(profilePhotoURL);
};

export { addPhotoToProfile, getProfilePhoto, deleteProfilePhoto };
