import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import { errorType, ErrorType } from '../../store/errorStore.js';
import { ServerError } from './ServerError.js';

export const Errors = (error: ErrorType) => {
  switch (error.type) {
    case errorType.apiErrorLoadCondition:
      return ServerError();
    default:
      break;
  }
  return;
}
