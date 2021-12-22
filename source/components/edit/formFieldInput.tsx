import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';

export interface FormFieldInputProps {
    class: string;
    name: string;
    type?: string;
    value?: string;
    oninput?;
    onfocusout?;
    placeholder?: string;
}

export const FormFieldInput = (props: FormFieldInputProps) => {
    let tmpl;
    if (props.value !== '') {
        tmpl = (
            <input
                class={props.class}
                oninput={props.oninput}
                onfocusout={props.onfocusout}
                name={props.name}
                type={props.type}
                placeholder={props.placeholder}
                value={props.value}
                autocomplete='off'
            />
        );
    } else {
        tmpl = (
            <input
                class={props.class}
                oninput={props.oninput}
                onfocusout={props.onfocusout}
                name={props.name}
                type={props.type}
                placeholder={props.placeholder}
                autocomplete='off'
            />
        );
    }

    return tmpl;
};
