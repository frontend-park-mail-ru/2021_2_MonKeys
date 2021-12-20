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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const optionalValue = props.value ? `value=${props.value}` : '';
    return (
        <input
            class={props.class}
            oninput={props.oninput}
            onfocusout={props.onfocusout}
            name={props.name}
            type={props.type}
            placeholder={props.placeholder}
            optionalValue
            autocomplete='off'
        />
    );
};
