import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import { Chat } from '../../store/ChatsStore.js';
import EventBus from '../../dispatcher/eventBus.js';

export const ChatPreview = (chat: Chat) => {
    const lastMessage = chat.messages.at(-1);

    const fromID = chat.fromID;

    function onclick() {
        EventBus.dispatch<string>('chats:preview-chat', fromID);
    }

    return (
        <div class='' onclick={onclick}>
            <span>{chat.name}</span>
            <div class=''>{lastMessage.text}</div>
        </div>
    );
};
