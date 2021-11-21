import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import { Message as MessageData } from '../../store/ChatsStore.js';
import { ProfileStore } from '../../store/profileStore.js';

export const Message = (msg: MessageData) => {
    const textClass = msg.fromID === ProfileStore.get().id ? 'my-message' : 'not-my-message';

    return <div class={textClass}>{msg.text}</div>;
};
