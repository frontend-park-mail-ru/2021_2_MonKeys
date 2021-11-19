import EventBus from './eventBus.js';
import { ErrorStore } from '../store/errorStore.js';

export const ErrorEventsRegister = () => {
    EventBus.register('error:ok-button', () => {
        const storeData = ErrorStore.get();
        storeData.apiErrorLoadCondition = false;
        ErrorStore.set(storeData);
        return;
    });
};
