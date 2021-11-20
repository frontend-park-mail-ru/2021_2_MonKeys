import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import { Message as MessageData } from '../../store/ChatsStore.js';

export const Message = (msg: MessageData) => {
    const textClass = msg.fromID === '1' ? 'my-message' : 'not-my-message';

    return <div class={textClass}>{msg.text}</div>;
};
