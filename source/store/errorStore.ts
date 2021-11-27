import BaseStore from './storeBase.js';

export namespace errorType {
    export const apiErrorLoadCondition = 0;
}

export class ErrorType {
    type: number;
    constructor(type: number) {
        this.type = type;
    }
}

interface ErrorsData {
    errors: ErrorType[];
}

const ErrorStore = new BaseStore<ErrorsData>();

ErrorStore.set({
    errors: [],
});

class ErrorManager {
    get error() {
        if (ErrorStore.get().errors.length === 0) {
            return null;
        }

        return ErrorStore.get().errors.at(-1);
    }

    pushAPIError() {
        console.log('pushAPIError');
        this.pushError(errorType.apiErrorLoadCondition);
    }
    deleteAPIError() {
        console.log('deleteAPIError');
        this.deleteError(errorType.apiErrorLoadCondition);
    }

    private pushError(error: number) {
        const errorsStore = ErrorStore.get();

        errorsStore.errors.push(new ErrorType(error));
        ErrorStore.set(errorsStore);
    }
    private deleteError(error: number) {
        const errorsStore = ErrorStore.get();
        const errors: ErrorType[] = [];

        errorsStore.errors.forEach((err: ErrorType) => {
            if (err.type !== error) {
                errors.push(err);
            }
        });

        errorsStore.errors = errors;
        ErrorStore.set(errorsStore);
    }
}

const errorManager = new ErrorManager();

export { ErrorStore, errorManager };
