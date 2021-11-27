import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import { errorType, ErrorType } from '../../store/errorStore.js';
import { ServerError } from './serverError.js';

export const Errors = (error: ErrorType) => {
    let tmpl = <div style={'visibility: hidden;'} />;

    console.log(error);
    if (error) {
        switch (error.type) {
            case errorType.apiErrorLoadCondition:
                tmpl = ServerError();
                break;
            default:
                break;
        }
    }

    return tmpl;
};
