import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import { ChatPreview } from './chatPreview.js';
import { Chat } from '../../store/chatsStore.js';

export const Chats = (chats: Chat[]) => {
    return (
        <div class=''>
            <span class='page-header-small'>Чаты</span>
            {chats.map((chat) => ChatPreview(chat))}
        </div>
    );
};
