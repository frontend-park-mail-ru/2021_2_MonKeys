import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import { errorType, ErrorType } from '../../store/errorStore.js';
import { ServerError } from './serverError.js';
import { PhotoLoadError } from './photoLoadError.js';

export const Errors = (error: ErrorType) => {
    let tmpl = <div style={'visibility: hidden;'} />;

    if (error) {
        switch (error.type) {
            case errorType.apiErrorLoadCondition:
                tmpl = ServerError();
                break;
            case errorType.apiErrorPhotoLoad:
                tmpl = PhotoLoadError();
                break;
            default:
                break;
        }
    }

    return tmpl;
};
