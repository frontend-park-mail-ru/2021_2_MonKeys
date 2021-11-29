import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import { chatsPreview } from './chatsPreview.js';
import { Chat } from '../../store/chatsStore.js';

export const Chats = (chats: Chat[]) => {
    return (
        <div class='view-content__chats'>
            <span class='view-content__chats-header'>Чаты</span>
            <div class='view-content__chats-list'>{chats.map((chat) => chatsPreview(chat))}</div>
        </div>
    );
};
