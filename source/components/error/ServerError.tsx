import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import { Error, ErrorData } from './Error.js';

export interface ServerErrorData {
  show: boolean;
}

export const ServerError = (serverError: ServerErrorData) => {
  const error: ErrorData = {
    title: 'Ошибка подключения',
    text: 'Не удаётся подключиться к серверу. Проверь подключение к Интернету и попробуй снова.',
    show: serverError.show,
  }

  return Error(error);
};
