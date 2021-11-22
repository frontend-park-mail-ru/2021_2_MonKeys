import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import { Chat } from '../../store/ChatsStore.js';
import EventBus from '../../dispatcher/eventBus.js';

export const ChatPreview = (chat: Chat) => {
    const lastMessage = chat.messages.at(-1);

    const ChatID = chat.fromUserID;

    function onclick() {
        EventBus.dispatch<number>('chats:preview-chat', ChatID);
    }

    return (
        <div class='' onclick={onclick}>
            <span>{chat.name}</span>
            <div class=''>{lastMessage.text}</div>
        </div>
    );
};
