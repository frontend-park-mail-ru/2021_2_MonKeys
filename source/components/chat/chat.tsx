import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import { InputMessage } from './inputMessage.js';
import { ChatHeader } from './chatHeader.js';
import { Message } from './message.js';
import { Chat as ChatData } from '../../store/chatsStore.js';
import router from '../../route/router.js';
import EventBus from '../../dispatcher/eventBus.js';
import { EVENTS } from '../../dispatcher/events.js';

export const Chat = (chat: ChatData, side: boolean) => {
    if (!chat) {
        router.go('/chats');
        return;
    }

    const ChatID = chat.fromUserID;

    function onscroll(event) {
        const scrollPos = event.target.scrollTop;

        if (scrollPos === 0) {
            console.log('Запрос на сообщения!!!');
            EventBus.dispatch<number>(EVENTS.CHAT_GET_MESSAGES, ChatID);
        }
    }

    if (side) {
        return (
            <div class='chat'>
                {ChatHeader({ chatID: chat.fromUserID, userName: chat.name, userImg: chat.img })}
                <div class='chat__messages chat__messages-side' onscroll={onscroll}>
                    {chat.messages.map((msg) => Message(msg))}
                </div>
                {InputMessage(chat)}
            </div>
        );
    }
    return (
        <div class='chat'>
            {ChatHeader({ chatID: chat.fromUserID, userName: chat.name, userImg: chat.img })}
            <div class='chat__messages' onscroll={onscroll}>
                {chat.messages.map((msg) => Message(msg))}
            </div>
            {InputMessage(chat)}
        </div>
    );
};
