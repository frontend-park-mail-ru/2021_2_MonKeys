import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import { Chat } from '../../store/chatsStore.js';
import EventBus from '../../dispatcher/eventBus.js';

export const ChatPreview = (chat: Chat) => {
    // @ts-ignore
    const lastMessage = chat.messages.at(-1);

    const ChatID = chat.fromUserID;

    function onclick() {
        EventBus.dispatch<number>('chats:preview-chat', ChatID);
    }

    return (
        <div onclick={onclick}>
            <span>{chat.name}</span>
            <div>{lastMessage.text}</div>
        </div>
    );
};
