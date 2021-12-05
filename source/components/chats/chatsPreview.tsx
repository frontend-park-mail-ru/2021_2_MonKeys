import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import { Chat } from '../../store/chatsStore.js';
import EventBus from '../../dispatcher/eventBus.js';
import { EVENTS } from '../../dispatcher/events.js';

export const chatsPreview = (chat: Chat) => {
    const lastMsgIdx = chat.messages.length - 1;
    const lastMessage = chat.messages[lastMsgIdx];

    const ChatID = chat.fromUserID;

    function onclick() {
        EventBus.dispatch<number>(EVENTS.CHATS_PREVIEW_CHAT, ChatID);
    }

    return (
        <div class='chats-preview' onclick={onclick}>
            <img class='chats-preview__user-img' src={chat.img} />
            <div class='chats-preview__user-info'>
                <span class='chats-preview__user-name'>{chat.name}</span>
                <div class='chats-preview__last-message'>{lastMessage.text}</div>
            </div>
        </div>
    );
};
