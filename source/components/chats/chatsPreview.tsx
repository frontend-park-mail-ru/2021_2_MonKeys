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
<<<<<<< HEAD:source/components/chats/chatsPreview.tsx
        <div class='chats-preview' onclick={onclick}>
            <img class='chats-preview__user-img' src={chat.img}/>
            <div class='chats-preview__user-info'>
                <span class='chats-preview__user-name'>{chat.name}</span>
                <div class='chats-preview__last-message'>{lastMessage.text}</div>
            </div>
=======
        <div onclick={onclick}>
            <span>{chat.name}</span>
            <div>{lastMessage.text}</div>
>>>>>>> 811430b9191fd57fd3ea0eab606ca3460a7995f9:source/components/chats/chatPreview.tsx
        </div>
    );
};
