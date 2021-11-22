import { likesURL, userLikesURL } from '../constants/urls.js';
import http from '../utils/http.js';

const userLikesRequset = () => {
    return http.get(userLikesURL);
};

const likesRequest = (id, reaction) => {
    const body = JSON.stringify({
        id: id,
        reaction: reaction,
    });

    return http.post(likesURL, body);
};

export { userLikesRequset, likesRequest };
