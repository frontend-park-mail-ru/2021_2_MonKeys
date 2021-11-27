import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import { Chat } from '../../store/chatsStore.js';
import EventBus from '../../dispatcher/eventBus.js';

export const chatsPreview = (chat: Chat) => {
    // @ts-ignore
    const lastMessage = chat.messages.at(-1);

    const ChatID = chat.fromUserID;

    function onclick() {
        EventBus.dispatch<number>('chats:preview-chat', ChatID);
    }

    return (
        <div class='chats-preview' onclick={onclick}>
            <img class='chats-preview__user-img' src={chat.img}/>
            <div class='chats-preview__user-info'>
                <span class='chats-preview__user-name'>{chat.name}</span>
                <div class='chats-preview__last-message'>{lastMessage.text}</div>
            </div>
        </div>
    );
};
