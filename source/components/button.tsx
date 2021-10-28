import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';

export interface ButtonProps {
    type: string;
    text: string;
    class: string;
    onclick: Function;
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
            <div class='center-container'>
                <span class={textClassName}>{props.text}</span>
            </div>
        </button>
    );
    return button;
};
