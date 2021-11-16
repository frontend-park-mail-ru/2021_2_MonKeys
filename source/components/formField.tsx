import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';
import ViewBase from '../views/viewBase.js';

export interface formFieldProps {
    tag: string;
    type?: string;
    placeholder?: string;
    value?: string;
    name: string;
    iconSrc?: string;
    class?: string;
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
                        class="form__field__input"
                        value={props.value}
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
                        class="form__field__input"
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
                        class={props.class}
                    />
                );
            }
            break;
    }

    let fieldTmpl;
    if (props.iconSrc !== undefined) {
        fieldTmpl = (
            <div class={props.class}>
                <img src={props.iconSrc} class="form__field__icon"/>
                {field}
            </div>
        );
    } else {
        fieldTmpl = <div class='input-with-icon'>{field}</div>;
    }

    return fieldTmpl;
};
