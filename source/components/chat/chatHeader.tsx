import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import { Button } from '../button.js';
import EventBus from '../../dispatcher/eventBus.js';

export const ChatHeader = (name: string, img: string) => {
    const props = {
        backButton: {
            type: 'button',
            text: 'Назад',
            class: '',
            onclick: () => {
                EventBus.dispatch<string>('chat:back-button');
            },
        },
    };

    return (
        <div>
            {Button(props.backButton)}
            <div class=''>
                <h2>{name}</h2>
            </div>
        </div>
    );
};
