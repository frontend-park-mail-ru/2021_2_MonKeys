import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';

export interface errorMsgProps {
    text: string;
    class: string;
}

export const ErrorMsg = (props: errorMsgProps) => {
    if (!props || !props.text || !props.class || props.text === '') {
        return <div class={props.class}></div>;
    }
    return (
        <div name='error' class={props.class}>
            {props.text}
        </div>
    );
};
