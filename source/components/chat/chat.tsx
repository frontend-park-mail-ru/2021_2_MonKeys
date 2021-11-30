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
        <div class='chat'>
            {ChatHeader({ chatID: chat.fromUserID, userName: chat.name, userImg: chat.img })}
            <div class='chat__messages'>{chat.messages.map((msg) => Message(msg))}</div>
            {InputMessage(chat)}
        </div>
    );
};
