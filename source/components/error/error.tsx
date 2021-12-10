import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import { Button } from '../common/button.js';
import EventBus from '../../dispatcher/eventBus.js';
import { EVENTS } from '../../dispatcher/events.js';
export interface ErrorData {
    title: string;
    text: string;
}

export const Error = (error: ErrorData) => {
    const okButton = {
        type: 'button',
        text: 'OK',
        class: 'error-window__button-ok',
        onclick: () => {
            EventBus.dispatch<string>(EVENTS.ERROR_OK_BUTTON);
        },
    };

    return (
        <div class='error-window'>
            <div class='error-window__header'>
                <img src='icons/error.svg' class='error-window__icon' />
                <h1 class='error-window__title'>{error.title}</h1>
            </div>
            <div class='error-window__text'>{error.text}</div>
            {Button(okButton)}
        </div>
    );
};
