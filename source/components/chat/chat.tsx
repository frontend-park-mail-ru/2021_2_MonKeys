import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import { InputMessage } from './inputMessage.js';
import { ChatHeader } from './chatHeader.js';
import { Message } from './message.js';
import { Chat as ChatData } from '../../store/chatsStore.js';
import router from '../../route/router.js';

export const Chat = (chat: ChatData) => {
    if (!chat) {
        router.go('/chats');
        return;
    }
    return (
        <div class=''>
            {ChatHeader(chat.name)}
            {chat.messages.map((msg) => Message(msg))}
            {InputMessage()}
        </div>
    );
};
