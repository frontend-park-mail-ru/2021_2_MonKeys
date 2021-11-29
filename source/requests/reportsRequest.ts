import { reportsURL } from '../constants/urls.js';
import http from '../utils/http.js';
import { HTTPSuccess } from '../utils/constants/HTTPStatus.js';
import { errorManager } from '../store/errorStore.js';

const reportsRequest = () => {
    return http
        .get(reportsURL)
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

const newReportRequest = (id: number, reportDesc: string) => {
    const body = JSON.stringify({
        toId: id,
        reportDesc: reportDesc,
    });

    return http
        .post(reportsURL, body)
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

export { reportsRequest, newReportRequest };
