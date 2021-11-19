import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';
import ViewBase from '../views/viewBase.js';
import { conditionalRendering } from '../tools/jsxTools.js';

export interface formFieldProps {
    tag: string;
    type?: string;
    placeholder?: string;
    value?: string;
    name: string;
    iconSrc?: string;
    class?: string;
    pass?: boolean;
    oninput?: { (data, view?: ViewBase): void };
    onfocusout?: { (data, view?: ViewBase): void };
    onchange?: { (data, view?: ViewBase): void };
}

export const FormField = (props: formFieldProps) => {
    let field: HTMLElement;

    switch (props.tag) {
        case 'input':
            if (props.value !== undefined) {
                field = (
                    <input
                        oninput={props.oninput}
                        onfocusout={props.onfocusout}
                        type={props.type}
                        name={props.name}
                        placeholder={props.placeholder}
                        class='form__field__input'
                        value={props.value}
                        autocomplete='off'
                    />
                );
            } else {
                field = (
                    <input
                        oninput={props.oninput}
                        onfocusout={props.onfocusout}
                        type={props.type}
                        name={props.name}
                        placeholder={props.placeholder}
                        class='form__field__input'
                        autocomplete='off'
                    />
                );
            }
            break;
        case 'textarea':
            if (props.value !== undefined) {
                field = (
                    <textarea
                        oninput={props.oninput}
                        onfocusout={props.onfocusout}
                        name={props.name}
                        placeholder={props.placeholder}
                        class={props.class}
                        autocomplete='chrome-off'
                    >
                        {props.value}
                    </textarea>
                );
            } else {
                field = (
                    <textarea
                        oninput={props.oninput}
                        onfocusout={props.onfocusout}
                        name={props.name}
                        placeholder={props.placeholder}
                        autocomplete='off'
                        class={props.class}
                    />
                );
            }
            break;
    }

    let fieldTmpl;
    if (props.iconSrc !== undefined) {
        fieldTmpl = (
            <form class={props.class}>
                <img src={props.iconSrc} class='form__field__icon' />
                {field}
                {conditionalRendering(<img src='icons/pass_green.svg'/>,props.pass)}
            </form>
        );
    } else {
        fieldTmpl = ( 
        <div>
            {field}
        </div>
        );
    }

    return fieldTmpl;
};
