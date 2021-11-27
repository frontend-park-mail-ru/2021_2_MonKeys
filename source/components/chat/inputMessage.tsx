import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import { FormField } from '../formField.js';
import { Button } from '../button.js';
import { Chat as ChatData } from '../../store/chatsStore.js';
import EventBus from '../../dispatcher/eventBus.js';

export const InputMessage = (chat: ChatData) => {
    const props = {
        'fields': {
            'inputText': {
                type: 'text',
                tag: 'textarea',
                placeholder: 'Сообщение',
                value: '',
                name: 'inputText',
                class: 'form__field-valid',
            },
            // 'inputText': {
            //     tag: 'textarea',
            //     type: 'text',
            //     name: 'messageText',
            //     class: '',
            //     oninput: () => {
            //         EventBus.dispatch<string>('');
            //     },
            //     onfocusout: () => {
            //         EventBus.dispatch<string>('');
            //     },
            // },
        },
        sendMessage: {
            type: 'button',
            text: '->',
            class: '',
            onclick: () => {
                EventBus.dispatch<string>('chat:send-button');
            },
            onkeypress: (event) => {
                alert(1);
                const enterKeyCode = 13;
                console.log('dsdsd');
                if (event.keyCode === enterKeyCode) {
                    EventBus.dispatch<string>('chat:send-button');
                }
            },
        },
    };

    const inputEvent = () => {
        EventBus.dispatch<number>('chat:input-message', chat.fromUserID);
    }
    const enterSendEvent = (event) => {
        const enterKeyCode = 13;
        if (event.keyCode === enterKeyCode) {
            event.preventDefault();
            EventBus.dispatch<number>('chat:send-button', chat.fromUserID);
        }
    };
    const buttonSendEvent = () => {
        EventBus.dispatch<number>('chat:send-button', chat.fromUserID);
    };
    const formEvent = () => {
        EventBus.dispatch('chat:load-form')
    }

    const inputValue = (chat.draftMessage === undefined || chat.draftMessage === '')
        ? ''
        : chat.draftMessage;
    return (
        // <div class='input-message'>
            <form class='input-message' onload={formEvent}>
                <input type='text'
                       class='input-message__field'
                       placeholder='Сообщение'
                       oninput={inputEvent}
                       onkeypress={enterSendEvent}
                       value={inputValue}/>
                <button class='input-message__button-send' type='reset' onclick={buttonSendEvent}>
                    <img class='input-message__icon-send' src='icons/send.svg'/>
                </button>
            </form>
        // </div>
    );
    // return (
    //     <div
    //         class=''
    //         onkeypress={(event) => {
    //             const enterKeyCode = 13;
    //             console.log('dsdsd');
    //             if (event.keyCode === enterKeyCode) {
    //                 event.preventDefault();
    //                 EventBus.dispatch<string>('chat:send-button');
    //             }
    //         }}
    //     >
    //         <form class={''}>
    //             <div>{FormField(props.fields.inputText)}</div>
    //             <div>{Button(props.sendMessage)}</div>
    //         </form>
    //     </div>
    // );
};
