import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import { chatsPreview } from './chatsPreview.js';
import { Chat } from '../../store/chatsStore.js';

export const Chats = (chats: Chat[]) => {
    return (
        <div class='chats__chats'>
            <span class='chats__chats-header'>Чаты</span>
            <div class='chats__chats-list'>{chats.map((chat) => chatsPreview(chat))}</div>
        </div>
    );
};
