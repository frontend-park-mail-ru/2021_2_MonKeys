import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import { ChatPreview } from './chatPreview.js';
import { Chat } from '../../store/ChatsStore.js';

export const Chats = (chats: Map<string, Chat>) => {
    const items: Chat[] = [];
    chats.forEach((chat) => items.push(chat));

    return (
        <div class=''>
            <span class='page-header-small'>Чаты</span>
            {items.map((chat) => ChatPreview(chat))}
        </div>
    );
};
