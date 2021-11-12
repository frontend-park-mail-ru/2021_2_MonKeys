import EventBus from './eventBus';
import { ErrorStore } from '../store/errorStore';

export const ErrorEventsRegister = () => {
    EventBus.register('error:ok-button', () => {
        const storeData = ErrorStore.get();
        storeData.apiErrorLoadCondition = false;
        ErrorStore.set(storeData);
        return;
    });
};
