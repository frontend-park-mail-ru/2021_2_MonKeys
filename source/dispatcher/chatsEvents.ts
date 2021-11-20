import EventBus from './eventBus.js';
import router from '../route/router.js';

export const ChatsEventsRegister = () => {
  EventBus.register('chats:preview-chat', (fromID) => {
    router.go('/chat');
    // router.go('/chat/' + fromID);
  });

};
