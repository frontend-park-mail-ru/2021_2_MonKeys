import { matchURL } from '../constants/urls';
import http from '../utils/http';

const matchRequest = () => {
    return http.get(matchURL);
};

export { matchRequest };
