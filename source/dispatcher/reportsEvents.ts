import EventBus from './eventBus.js';

import { HTTPSuccess } from '../utils/constants/HTTPStatus.js';

import ReportsStore from '../store/reportsStore.js';
import { reportsRequest, newReportRequest } from '../requests/reportsRequest.js';
import { deleteChatRequest } from '../requests/chatRequest.js';
import { EVENTS } from './events.js';

export const ReportsEventsRegister = () => {
    EventBus.register(EVENTS.REPORTS_REPORT_BUTTON, () => {
        const reportsData = ReportsStore.get();
        reportsData.active = true;
        ReportsStore.set(reportsData);
        if (reportsData.reportsCount === 0) {
            reportsRequest().then((data) => {
                if (data.status !== HTTPSuccess) {
                    throw 'bad response';
                }
                reportsData.reports = data.body.allReports;
                reportsData.reportsCount = data.body.reportsCount;
                for (let i = 0; i < reportsData.reportsCount; i++) {
                    reportsData.reports[i].isActive = false;
                }
                ReportsStore.set(reportsData);
            });
        }
    });
    EventBus.register(EVENTS.REPORTS_BACK_BUTTON, () => {
        const reportsData = ReportsStore.get();
        reportsData.active = false;
        ReportsStore.set(reportsData);
        for (let i = 0; i < reportsData.reportsCount; i++) {
            reportsData.reports[i].isActive = false;
        }
        reportsData.choosedReport = '';
        ReportsStore.set(reportsData);
    });
    EventBus.register(EVENTS.REPORTS_DECLARE_BUTTON, (userID) => {
        if (ReportsStore.get().choosedReport !== '') {
            newReportRequest(userID, ReportsStore.get().choosedReport).then((data) => {
                if (data.status !== HTTPSuccess) {
                    throw 'bad response';
                }

                deleteChatRequest(userID).then((data) => {
                    if (data.status !== HTTPSuccess) {
                        throw 'bad response';
                    }
                });

                const reportsData = ReportsStore.get();
                reportsData.active = false;
                ReportsStore.set(reportsData);
                for (let i = 0; i < reportsData.reportsCount; i++) {
                    reportsData.reports[i].isActive = false;
                }
                reportsData.choosedReport = '';
                ReportsStore.set(reportsData);
                EventBus.dispatch<string>(EVENTS.USER_COOKIE_REQUESTS);
            });
        }
    });
    EventBus.register(EVENTS.REPORTS_CHOOSE_REPORT_TYPE, (problemName: string) => {
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
