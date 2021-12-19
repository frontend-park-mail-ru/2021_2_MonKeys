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
    return (
        <div class={props.class}>
            <input
                class='field__input'
                oninput={props.oninput}
                onfocusout={props.onfocusout}
                name={props.name}
                type={props.type}
                placeholder={props.placeholder}
                value={props.value}
                autocomplete='off'
            />
        </div>
    );
};
