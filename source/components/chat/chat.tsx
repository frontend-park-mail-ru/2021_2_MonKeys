import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import { InputMessage } from './inputMessage.js';
import { ChatHeader } from './chatHeader.js';
import { Message } from './message.js';
import { Chat as ChatData } from '../../store/ChatsStore.js';

export const Chat = (chat: ChatData) => {
    return (
        <div class=''>
            {ChatHeader(chat.name, chat.img)}
            {chat.messages.map((msg) => Message(msg))}
            {InputMessage()}
        </div>
    );
};
