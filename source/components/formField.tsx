import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';

export interface formFieldProps {
    tag: string;
    type?: string;
    placeholder?: string;
    value?: string;
    name: string;
    iconSrc?: string;
    class?: string;
    oninput?: Function;
    onfocusout?: Function;
    onchange?: Function;
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
                        class={props.class}
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
                        class={props.class}
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

    let fieldTmpl: any;
    if (props.iconSrc !== undefined) {
        fieldTmpl = (
            <div class='input-with-icon'>
                {field}
                <img src={props.iconSrc} class='input-icon' />
            </div>
        );
    } else {
        fieldTmpl = <div class='input-with-icon'>{field}</div>;
    }

    return fieldTmpl;
};
