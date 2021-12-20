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
    const optionalValue = props.value ? props.value : '';
    return (
        <input
            class={props.class}
            oninput={props.oninput}
            onfocusout={props.onfocusout}
            name={props.name}
            type={props.type}
            placeholder={props.placeholder}
            value={optionalValue}
            autocomplete='off'
        />
    );
};
