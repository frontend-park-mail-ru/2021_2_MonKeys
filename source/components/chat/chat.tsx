import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import { InputMessage } from './inputMessage.js';
import { ChatHeader } from './chatHeader.js';
import { Message } from './message.js';

export const Chat = (data) => {
    return (
        <div class=''>
            {ChatHeader(data.header)}
            {data.messages.map((msg, index) => Message(msg))}
            {InputMessage()}
        </div>
    );
};
