import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import { chatsPreview } from './chatsPreview.js';
import { Chat } from '../../store/chatsStore.js';

export const Chats = (chats: Chat[]) => {
    return <div class='chats'>{chats.map((chat) => chatsPreview(chat))}</div>;
};
