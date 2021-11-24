import EventBus from './eventBus.js';

import { HTTPSuccess } from '../constants/HTTPStatus.js';

import ReportsStore from '../store/reportsStore.js';
import { reportsRequest, newReportRequest } from '../requests/reportsRequest.js';

export const ReportsEventsRegister = () => {
    EventBus.register('reports:report-button', () => {
        // const likesData = LikesStore.get();
        // likesData.reported = true;
        // LikesStore.set(likesData);
        const reportsData = ReportsStore.get();
        reportsData.active = true;
        ReportsStore.set(reportsData);
        if (reportsData.reportsCount === 0) {
            reportsRequest().then((reportsResponse) => {
                if (reportsResponse.status === HTTPSuccess) {
                    if (reportsResponse.data.status === HTTPSuccess) {
                        reportsData.reports = reportsResponse.data.body.allReports;
                        reportsData.reportsCount = reportsResponse.data.body.reportsCount;
                        for (let i = 0; i < reportsData.reportsCount; i++) {
                            reportsData.reports[i].isActive = false;
                        }
                        ReportsStore.set(reportsData);
                    } else {
                        throw '400';
                    }
                } else {
                    // 500
                }
            });
        }
    });
    EventBus.register('reports:back-button', () => {
        const reportsData = ReportsStore.get();
        reportsData.active = false;
        ReportsStore.set(reportsData);
        for (let i = 0; i < reportsData.reportsCount; i++) {
            reportsData.reports[i].isActive = false;
        }
        reportsData.choosedReport = '';
        ReportsStore.set(reportsData);
    });
    EventBus.register('reports:declare-button', (userID) => {
        if (ReportsStore.get().choosedReport !== '') {
            newReportRequest(userID, ReportsStore.get().choosedReport).then((reportResponse) => {
                if (reportResponse.status === HTTPSuccess) {
                    if (reportResponse.data.status === HTTPSuccess) {
                        const reportsData = ReportsStore.get();
                        reportsData.active = false;
                        ReportsStore.set(reportsData);
                        EventBus.dispatch<string>('user:cookie-requests');
                    } else {
                        throw '400';
                    }
                } else {
                    // 500
                }
            });
        }
    });
    EventBus.register('reports:choose-report-type', (problemName: string) => {
        const reportsData = ReportsStore.get();
        reportsData.choosedReport = problemName;
        for (let i = 0; i < reportsData.reportsCount; i++) {
            if (reportsData.reports[i].isActive) {
                reportsData.reports[i].isActive = false;
            }
            if (reportsData.reports[i].reportDesc === problemName) {
                reportsData.reports[i].isActive = true;
            }
        }
        ReportsStore.set(reportsData);
    });
};
