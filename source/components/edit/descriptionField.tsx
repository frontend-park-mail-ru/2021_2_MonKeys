import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';

export const DescriptionField = (props) => {
    if (props.value) {
        return (
            <textarea
                oninput={props.oninput}
                onfocusout={props.onfocusout}
                name={props.name}
                placeholder={props.placeholder}
                class={props.class}
                autocomplete='chrome-off'
                maxlength='1000'
            >
                {props.value}
            </textarea>
        );
    } else {
        return (
            <textarea
                oninput={props.oninput}
                onfocusout={props.onfocusout}
                name={props.name}
                placeholder={props.placeholder}
                class={props.class}
                autocomplete='chrome-off'
                maxlength='1000'
            ></textarea>
        );
    }
};
