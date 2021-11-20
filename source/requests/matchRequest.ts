import { matchURL } from '../constants/urls.js';
import http from '../utils/http.js';

const searchMathesRequest = (searchTmpl: string) => {
    const body = JSON.stringify({
        searchTmpl: searchTmpl,
    });

    return http.post(matchURL, body);
};

const matchRequest = () => {
    return http.get(matchURL);
};

export { matchRequest, searchMathesRequest };
