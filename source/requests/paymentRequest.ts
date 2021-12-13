import { paymentURL } from '../constants/urls.js';
import http from '../utils/http.js';
import { HTTPSuccess } from '../utils/constants/HTTPStatus.js';
import { errorManager } from '../store/errorStore.js';

const paymentRequest = (amount: string, period: number) => {
    const body = JSON.stringify({
        amount: amount,
        period: period,
    });

    return http
        .post(paymentURL, body)
        .then((response) => {
            if (response.status !== HTTPSuccess) {
                throw 'server internal error';
            }

            return response.data;
        })
        .catch((err) => {
            errorManager.pushAPIError();
            throw err;
        });
};

export { paymentRequest };
