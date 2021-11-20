import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';
import ViewBase from '../views/viewBase.js';

export interface ButtonProps {
    type: string;
    text: string;
    class: string;
    onclick: { (data, view?: ViewBase): void };
}

export const Button = (props: ButtonProps) => {
    const button = (
        <button onclick={props.onclick} type={props.type} class={props.class}>
            <span class='button__text'>{props.text}</span>
        </button>
    );
    return button;
};
