import { reportsURL } from '../constants/urls.js';
import http from '../utils/http.js';

const reportsRequest = () => {
    return http.get(reportsURL);
};

const newReportRequest = (id: number, reportDesc: string) => {
    const body = JSON.stringify({
        toId: id,
        reportDesc: reportDesc,
    });

    return http.post(reportsURL, body);
};

export { reportsRequest, newReportRequest };
