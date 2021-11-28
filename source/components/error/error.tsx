import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import { Button } from '../button.js';
import EventBus from '../../dispatcher/eventBus.js';

export interface ErrorData {
    title: string;
    text: string;
}

export const Error = (error: ErrorData) => {
    const okButton = {
        type: 'button',
        text: 'OK',
        class: 'crit-error-button',
        onclick: () => {
            EventBus.dispatch<string>('error:ok-button');
        },
    };

    return (
        <div class={'crit-error-container-active'}>
            <div class={'crit-error-header'}>
                <img src='icons/icon_error_red.svg' class='menu-icon crit-error-icon' />
                <h1 class='crit-error-title'>{error.title}</h1>
            </div>
            <div class='crit-error-message'>{error.text}</div>
            {Button(okButton)}
        </div>
    );
};