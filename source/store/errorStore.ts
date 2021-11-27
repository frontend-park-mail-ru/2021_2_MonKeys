import BaseStore from './storeBase.js';

export interface CritErrorData {
    apiErrorLoadCondition: boolean;
}

const ErrorStore = new BaseStore<CritErrorData>();

ErrorStore.set({
    apiErrorLoadCondition: false,
});

class ErrorManager {
    get error() {
        return ErrorStore.get().apiErrorLoadCondition;
    }
}

const errorManager = new ErrorManager();

export { ErrorStore, errorManager };
