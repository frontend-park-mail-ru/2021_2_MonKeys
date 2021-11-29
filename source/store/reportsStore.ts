import BaseStore from './storeBase.js';

export interface Reports {
    reportDesc: string;
    isActive: boolean;
}

export interface ReportsData {
    active: boolean;

    reports: Reports[];
    reportsCount: number;
    choosedReport: string;
}

const ReportsStore = new BaseStore<ReportsData>();

ReportsStore.set({
    active: false,
    reports: [],
    reportsCount: 0,
    choosedReport: '',
});

export default ReportsStore;
