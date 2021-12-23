import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';

export interface FormFieldInputProps {
    class: string;
    name: string;
    type?: string;
    value?: string;
    oninput?;
    onfocusout?;
    placeholder?: string;
    maxlength?: number;
    pattern?: string;
}

export const FormFieldInput = (props: FormFieldInputProps) => {
    let tmpl;
    const defaultMaxLength = 20;
    const maxLength = props.maxlength ? props.maxlength : defaultMaxLength;

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
                maxlength={maxLength}
                pattern={props.pattern}
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
                maxlength={maxLength}
                pattern={props.pattern}
            />
        );
    }

    return tmpl;
};
