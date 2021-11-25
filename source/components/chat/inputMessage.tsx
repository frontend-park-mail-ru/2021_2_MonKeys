import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import { FormField } from '../formField.js';
import { Button } from '../button.js';
import EventBus from '../../dispatcher/eventBus.js';

export const InputMessage = () => {
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

    return (
        <div
            class=''
            onkeypress={(event) => {
                const enterKeyCode = 13;
                console.log('dsdsd');
                if (event.keyCode === enterKeyCode) {
                    event.preventDefault();
                    EventBus.dispatch<string>('chat:send-button');
                }
            }}
        >
            <form class={''}>
                <div>{FormField(props.fields.inputText)}</div>
                <div>{Button(props.sendMessage)}</div>
            </form>
        </div>
    );
};
