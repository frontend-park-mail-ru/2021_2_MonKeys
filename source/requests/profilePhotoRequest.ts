import { profilePhotoURL } from '../constants/urls.js';
import http from '../utils/http.js';

const addPhotoToProfile = (photo) => {
  const body = new FormData();
  body.append('photo', photo[0]);

  return http.post(profilePhotoURL, body);
};

const deleteProfilePhoto = (photo) => {
  const body = JSON.stringify({
    photo: photo,
  });

  return http.delete(profilePhotoURL, body);
};

export { addPhotoToProfile, deleteProfilePhoto };
