import BaseStore from './storeBase.js';

export interface CritErrorData {
    apiErrorLoadCondition: boolean;
}

const ErrorStore = new BaseStore<CritErrorData>();

const initData = {
    apiErrorLoadCondition: false,
};

ErrorStore.set(initData);

export { ErrorStore };
