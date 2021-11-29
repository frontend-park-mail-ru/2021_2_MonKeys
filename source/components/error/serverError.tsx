import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import { Error, ErrorData } from './error.js';

export const ServerError = () => {
    const error: ErrorData = {
        title: 'Ошибка подключения',
        text: 'Не удаётся подключиться к серверу. Проверь подключение к Интернету и попробуй снова.',
    };

    return Error(error);
};
