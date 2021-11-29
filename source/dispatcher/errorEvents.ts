import EventBus from './eventBus.js';
import { errorManager } from '../store/errorStore.js';

export const ErrorEventsRegister = () => {
    EventBus.register('error:ok-button', () => {
        errorManager.deleteAPIError();
        return;
    });
};
