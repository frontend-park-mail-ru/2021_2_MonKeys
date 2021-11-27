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
        <div class='view-contant view-contant_align_center view-contant_scroll-y_banned'>
            {ChatHeader({userName: chat.name, userImg: chat.img})}
            <div class='view-contant__message-space'>
                {chat.messages.map((msg) => Message(msg))}
            </div>
            {InputMessage(chat)}
        </div>
    );
};
