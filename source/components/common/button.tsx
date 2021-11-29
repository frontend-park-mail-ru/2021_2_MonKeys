import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import ViewBase from '../../views/viewBase.jsx';

export interface ButtonProps {
    type: string;
    text: string;
    class: string;
    onkeypress?: { (data, view?: ViewBase): void };
    onclick: { (data, view?: ViewBase): void };
}

export const Button = (props: ButtonProps) => {
    const button = (
        <button onclick={props.onclick} type={props.type} onkeypress={props.onkeypress} class={props.class}>
            <span class='button__text'>{props.text}</span>
        </button>
    );
    return button;
};
