import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import { Error, ErrorData } from './error.js';

export const PhotoLoadError = () => {
    const error: ErrorData = {
        title: 'Ошибка загрузки',
        text: 'У нас не получилось загрузить фотографию. Попробуйте выбрать другую.',
    };

    return Error(error);
};