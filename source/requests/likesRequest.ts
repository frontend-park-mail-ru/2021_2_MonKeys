import { likesURL } from '../constants/urls';
import http from '../utils/http';

const likesRequest = (id, reaction) => {
    const body = JSON.stringify({
        id: id,
        reaction: reaction,
    });

    return http.post(likesURL, body);
};

export { likesRequest };
