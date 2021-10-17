import { likesURL } from '../constants/urls';
import http from '../utils/http';

const likesRequest = (id, reaction) => {
  return http.post(likesURL, {
    id: id,
    reaction: reaction,
  });
};

export { likesRequest };
