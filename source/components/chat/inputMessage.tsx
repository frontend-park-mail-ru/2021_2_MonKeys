import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import { FormField } from '../formField.js';
import { Button } from '../button.js';
import EventBus from '../../dispatcher/eventBus.js';

export const InputMessage = () => {
    const props = {
        'fields': {
            'inputText': {
                tag: 'textarea',
                type: 'text',
                name: 'messageText',
                class: '',
                oninput: () => {
                    EventBus.dispatch<string>('');
                },
                onfocusout: () => {
                    EventBus.dispatch<string>('');
                },
            },
        },
        sendMessage: {
            type: 'button',
            text: '->',
            class: '',
            onclick: () => {
                EventBus.dispatch<string>('chat:send-button');
            },
        },
    };

    return (
        <div class=''>
            <form class={''}>
                <div>{FormField(props.fields.inputText)}</div>
                <div>{Button(props.sendMessage)}</div>
            </form>
        </div>
    );
};
