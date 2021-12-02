import EventBus from './eventBus.js';
import { errorManager } from '../store/errorStore.js';
import { EVENTS } from './events.js';

export const ErrorEventsRegister = () => {
    EventBus.register(EVENTS.ERROR_OK_BUTTON, () => {
        errorManager.deleteAPIError();
        return;
    });
};
