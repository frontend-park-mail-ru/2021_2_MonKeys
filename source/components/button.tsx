import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';
import ViewBase from '../views/viewBase.js';

export interface ButtonProps {
    type: string;
    text: string;
    class: string;
    onclick: { (data, view?: ViewBase): void };
}

export const Button = (props: ButtonProps) => {
    let className: string;
    switch (props.class) {
        case 'login':
            className = 'login-button';
            break;
        case 'signup':
            className = 'signup-button';
            break;
        case 'add':
            className = 'add';
            break;
        case 'edit':
            className = 'edit-button';
            break;
        case 'link':
            break;
    }

    const textClassName = className + '-text';
    const button = (
        <button onclick={props.onclick} type={props.type} class={className}>
            <span class={textClassName}>{props.text}</span>
        </button>
    );
    return button;
};
